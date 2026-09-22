import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const baseURL = process.env.SHOWCASE_URL || "http://127.0.0.1:5173";
await fs.mkdir("showcase", { recursive: true });
async function ready() {
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (const img of document.images) img.loading = "eager";
    await Promise.all(
      [...document.images].map((img) => img.decode().catch(() => {})),
    );
  });
}
await page.goto(baseURL);
await ready();
await page.screenshot({ path: "showcase/01-homepage-hero.png" });
await page
  .locator("#featured")
  .screenshot({ path: "showcase/02-featured-tours.png" });
await page
  .locator(".story-section")
  .screenshot({ path: "showcase/06-island-story.png" });
await page.goto(`${baseURL}/tours/blue-mountains-escape`);
await ready();
await page.screenshot({ path: "showcase/03-tour-details.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseURL);
await ready();
await page.screenshot({ path: "showcase/04-mobile-home.png" });
await page.screenshot({
  path: "showcase/04-mobile-full-page.png",
  fullPage: true,
});
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${baseURL}/contact?tour=blue-mountains-escape`);
await ready();
await page.screenshot({
  path: "showcase/05-booking-inquiry.png",
  fullPage: true,
});
await page.goto(`${baseURL}/gallery`);
await ready();
await page.screenshot({ path: "showcase/07-gallery.png", fullPage: true });
await page.goto(`${baseURL}/about`);
await ready();
await page.screenshot({ path: "showcase/08-about.png", fullPage: true });
await browser.close();
console.log("Showcase screenshots saved to showcase/.");
