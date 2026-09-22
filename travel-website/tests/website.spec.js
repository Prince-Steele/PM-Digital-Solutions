import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const routes = [
  "/",
  "/tours",
  "/tours/blue-mountains-escape",
  "/about",
  "/gallery",
  "/contact",
];
for (const width of [1440, 1024, 768, 430, 390]) {
  test(`all pages render without overflow or console errors at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toBeVisible();
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.waitForFunction(() =>
        [...document.images].every((image) => image.complete),
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image.naturalWidth > 0 &&
                !image.currentSrc.includes("fallback"),
            ),
          ),
      ).toBe(true);
      await page.evaluate(() => scrollTo(0, 0));
      if (width === 390 || width === 1440) {
        fs.mkdirSync("showcase/qa", { recursive: true });
        await page.screenshot({
          path: `showcase/qa/${route === "/" ? "home" : route.replaceAll("/", "-")}-${width}.png`,
          fullPage: true,
        });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("filters, browser history, details, and inquiry prefill work", async ({
  page,
}) => {
  await page.goto("/tours");
  await expect(page.locator(".tour-card")).toHaveCount(6);
  for (const category of [
    "Adventure",
    "Culture",
    "Nature",
    "Food",
    "Beach",
    "Private Tours",
  ]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".tour-card")).toHaveCount(1);
  }
  await page.getByRole("button", { name: "Nature", exact: true }).click();
  await page
    .getByRole("link", { name: "View details: Blue Mountains Escape" })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Blue Mountains Escape",
  );
  await page.getByRole("link", { name: "Inquire About This Tour" }).click();
  await expect(page.getByLabel("Tour of interest")).toHaveValue(
    "blue-mountains-escape",
  );
  await page.goBack();
  await page.goBack();
  await expect(
    page.getByRole("button", { name: "Nature", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  for (const id of [
    "dunns-river-adventure",
    "kingston-culture",
    "south-coast-explorer",
    "taste-of-jamaica",
    "negril-beach-day",
  ]) {
    await page.goto(`/tours/${id}`);
    await expect(page.locator(".itinerary li")).toHaveCount(4);
  }
  await page.goto("/tours/missing-tour");
  await expect(page.getByText("Let’s find your way back.")).toBeVisible();
});

test("inquiry validates required values, dates, guests and demonstrates success without sending data", async ({
  page,
}) => {
  await page.goto("/contact?tour=negril-beach-day");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await expect(page.locator(".success-state")).toHaveCount(0);
  await page.getByLabel("Full name").fill("Demo Traveller");
  await page.getByLabel("Email", { exact: false }).fill("demo@example.com");
  await page.getByLabel("Phone / WhatsApp").fill("+1 (876) 555-0100");
  await page.getByLabel("Preferred date").fill("2020-01-01");
  await page.getByLabel("Number of guests").fill("0");
  await page.getByLabel("Pickup area").fill("Kingston");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  expect(
    await page.locator("form").evaluate((form) => form.checkValidity()),
  ).toBe(false);
  await page.getByLabel("Preferred date").fill("2099-01-01");
  await page.getByLabel("Number of guests").fill("2");
  await page.getByLabel("Full name").fill("   ");
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await expect(page.locator(".success-state")).toHaveCount(0);
  await page.getByLabel("Full name").fill("Demo Traveller");
  const sent = [];
  page.on("request", (request) => {
    if (request.method() === "POST") sent.push(request.url());
  });
  await page.getByRole("button", { name: "Send Inquiry" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Nothing was sent or saved",
  );
  await expect(page.getByRole("status")).toBeFocused();
  expect(sent).toEqual([]);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
  await page.getByRole("button", { name: "Try another inquiry" }).click();
  await expect(page.getByLabel("Full name")).toHaveValue("");
});

test("mobile navigation and gallery lightbox support keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Gallery", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.getByRole("button", { name: "Mountains", exact: true }).click();
  await expect(page.locator(".gallery-tile")).toHaveCount(1);
  await page.locator(".gallery-tile").click();
  await expect(page.locator("dialog")).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Close enlarged image" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog")).not.toBeVisible();
  await expect(page.locator(".gallery-tile")).toBeFocused();
});

test("main pages pass automated accessibility checks", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});
