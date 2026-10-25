"""Browser regression checks: pip install playwright; python tests/check-site.py.

Uses installed Chrome, a temporary local server, and mocked form responses.
No messages are sent. The two demo projects are outside this suite's scope.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import parse_qs, urlparse
import unittest

from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("index", "services", "portfolio", "about", "contact")


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class WebsiteChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
        Thread(target=cls.server.serve_forever, daemon=True).start()
        cls.base = f"http://127.0.0.1:{cls.server.server_port}"
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(channel="chrome", headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()

    def setUp(self):
        self.context = self.browser.new_context(viewport={"width": 390, "height": 844}, color_scheme="light")
        self.context.add_init_script("localStorage.setItem('theme', 'light')")
        self.page = self.context.new_page()
        self.errors = []
        self.page.on("pageerror", lambda error: self.errors.append(str(error)))

    def tearDown(self):
        self.context.close()
        self.assertEqual(self.errors, [], "Unexpected browser JavaScript errors")

    def visit(self, name, query=""):
        self.page.goto(f"{self.base}/{name}.html{query}", wait_until="networkidle")
        self.page.evaluate("document.fonts.ready")

    def test_responsive_layouts_and_navigation(self):
        for width in (320, 360, 390, 430, 768, 820, 960, 1024, 1280, 1440):
            for name in PAGES:
                with self.subTest(width=width, page=name):
                    self.page.set_viewport_size({"width": width, "height": 900})
                    self.visit(name)
                    overflow = self.page.evaluate("""() => [...document.querySelectorAll('header *, main *, footer *')]
                      .filter(e => {const r=e.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth+1)})
                      .map(e => e.getAttribute('class') || e.tagName)""")
                    self.assertEqual(overflow, [], "Content extends beyond viewport")
                    self.assertEqual(self.page.locator(".theme-toggle").count(), 0)
                    self.assertEqual(self.page.evaluate("getComputedStyle(document.documentElement).colorScheme"), "dark")
                    if width <= 1024:
                        toggle = self.page.get_by_role("button", name="Open navigation")
                        toggle.click()
                        expect(self.page.locator("#site-nav")).to_be_visible()
                        bounds = self.page.locator("#site-nav").bounding_box()
                        self.assertLessEqual(bounds["x"] + bounds["width"], width)
                        self.page.keyboard.press("Escape")
                        expect(self.page.locator("#site-nav")).to_be_hidden()
                        expect(toggle).to_be_focused()
                    else:
                        expect(self.page.locator("#site-nav")).to_be_visible()

    def test_assets_load_without_third_party_requests(self):
        requests = []
        failed = []
        self.page.on("request", lambda request: requests.append(request.url))
        self.page.on("response", lambda response: failed.append(response.url) if response.status >= 400 else None)
        for name in PAGES:
            self.visit(name)
            self.page.locator("footer").scroll_into_view_if_needed()
            self.page.wait_for_load_state("networkidle")
            for image in self.page.locator("img").all():
                image.scroll_into_view_if_needed()
                expect(image).to_have_js_property("complete", True)
                self.assertGreater(image.evaluate("e => e.naturalWidth"), 0)
        self.assertEqual(failed, [])
        self.assertTrue(all(url.startswith(self.base) for url in requests), "Initial rendering should be self-contained")

    def test_contact_validation_success_and_whatsapp(self):
        payloads = []
        def submit(route):
            payloads.append(route.request.post_data_json)
            route.fulfill(status=200, json={"ok": True})
        self.page.route("**/api/contact", submit)
        self.visit("contact", "?type=package&selected=Business%20Website%20Package")
        self.page.get_by_role("button", name="Send via Email").click()
        self.assertEqual(payloads, [])
        expect(self.page.locator('[name="name"]')).to_be_focused()
        self.page.get_by_label("Name", exact=True).fill("Mobile Visitor")
        self.page.get_by_label("Email", exact=True).fill("visitor@example.com")
        self.page.get_by_label("Message", exact=True).fill("I need a responsive business website.")
        whatsapp = self.page.get_by_role("link", name="Send via WhatsApp")
        message = parse_qs(urlparse(whatsapp.get_attribute("href")).query)["text"][0]
        self.assertIn("visitor@example.com", message)
        self.assertIn("responsive business website", message)
        self.assertIn("Business Website", message)
        self.page.get_by_role("button", name="Send via Email").click()
        expect(self.page.locator("[data-form-status]")).to_contain_text("sent successfully")
        self.assertEqual(payloads[0]["selectedItem"], "Business Website Package")
        self.assertEqual(payloads[0]["selectedType"], "package")
        expect(self.page.get_by_label("Name", exact=True)).to_have_value("")
        expect(self.page.locator("[data-selected-item]")).to_have_value("Business Website Package")
        expect(self.page.get_by_role("button", name="Send via Email")).to_be_enabled()

    def test_contact_error_keeps_message(self):
        self.page.route("**/api/contact", lambda route: route.fulfill(status=503, json={"error": "Please try again shortly."}))
        self.visit("contact")
        self.page.get_by_label("Name", exact=True).fill("Mobile Visitor")
        self.page.get_by_label("Email", exact=True).fill("visitor@example.com")
        self.page.get_by_label("Message", exact=True).fill("Keep these details for retry.")
        self.page.get_by_role("button", name="Send via Email").click()
        expect(self.page.locator("[data-form-status]")).to_have_text("Please try again shortly.")
        expect(self.page.get_by_label("Message", exact=True)).to_have_value("Keep these details for retry.")
        expect(self.page.get_by_role("button", name="Send via Email")).to_be_enabled()

    def test_currency_and_long_selected_package(self):
        self.visit("services")
        select = self.page.locator("[data-currency-select]")
        select.select_option("USD")
        expect(self.page.locator("[data-price-min]").first).to_contain_text("US$")
        self.page.reload(wait_until="networkidle")
        expect(select).to_have_value("USD")
        self.visit("contact", "?type=project&selected=" + "LongProjectName" * 20)
        self.assertLessEqual(self.page.locator(".contact-showcase-layout").evaluate("e => e.scrollWidth"), 358)


if __name__ == "__main__":
    unittest.main(verbosity=2)
