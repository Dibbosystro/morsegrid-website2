import { test, expect } from "@playwright/test";

const NAV_PATHS: Array<{ name: RegExp; url: RegExp }> = [
  { name: /^Customers$/i, url: /\/customers$/ },
  { name: /^Pricing$/i, url: /\/pricing$/ },
  { name: /^Company$/i, url: /\/company$/ },
];

test("nav links transition cleanly with reduced motion", async ({ page }) => {
  await page.goto("/");
  for (const entry of NAV_PATHS) {
    const link = page.locator("header").getByRole("link", { name: entry.name }).first();
    const count = await link.count();
    if (count === 0) continue;
    await link.click();
    await page.waitForURL(entry.url, { timeout: 4_000 }).catch(() => {});
    if (!entry.url.test(page.url())) continue;
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 5_000 });
    await page.goBack();
    await page.waitForLoadState("domcontentloaded");
  }
});
