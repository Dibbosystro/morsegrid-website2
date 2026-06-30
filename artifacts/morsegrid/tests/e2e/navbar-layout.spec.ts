import { test, expect } from "@playwright/test";

const FORCE_LIGHT_PAGES = ["/proactive-agents", "/products/clickup"] as const;

test.describe("Navbar layout regressions", () => {
  for (const path of FORCE_LIGHT_PAGES) {
    test(`light mode active at page top on ${path}`, async ({ page }) => {
      await page.goto(path);
      const header = page.locator("header[data-light]").first();
      await expect(header).toHaveAttribute("data-light", "true");

      // Logo brand text must render white (solid, no opacity) in light mode
      const logoText = page.locator("header a[href='/'] span").first();
      await expect(logoText).toBeVisible();
      const color = await logoText.evaluate(
        (el) => window.getComputedStyle(el).color,
      );
      expect(color).toBe("rgb(255, 255, 255)");
    });

    test(`nav text switches to dark after scrolling past hero on ${path}`, async ({
      page,
    }) => {
      await page.goto(path);
      const header = page.locator("header[data-light]").first();
      await expect(header).toHaveAttribute("data-light", "true");

      // Scroll well past the 20 px threshold
      await page.evaluate(() =>
        window.scrollTo({ top: 300, behavior: "instant" }),
      );
      await expect(header).toHaveAttribute("data-light", "false", {
        timeout: 3_000,
      });

      // Wait for the 250 ms CSS color transition on the logo span to complete,
      // then assert the computed color is no longer white.
      await page.waitForFunction(
        () => {
          const span = document.querySelector("header a[href='/'] span");
          if (!span) return false;
          return window.getComputedStyle(span).color !== "rgb(255, 255, 255)";
        },
        { timeout: 3_000 },
      );
      const logoText = page.locator("header a[href='/'] span").first();
      const color = await logoText.evaluate(
        (el) => window.getComputedStyle(el).color,
      );
      expect(color).not.toBe("rgb(255, 255, 255)");
    });
  }

  test("scrolled pill is wide enough to contain all nav items without overflow", async ({
    page,
  }) => {
    await page.goto("/");

    // Trigger scrolled pill state
    await page.evaluate(() =>
      window.scrollTo({ top: 300, behavior: "instant" }),
    );

    // Wait for the scroll handler and any React state update to settle
    const header = page.locator("header[data-light]").first();
    await expect(header).toHaveAttribute("data-light", "false", {
      timeout: 3_000,
    });

    // The desktop nav must not overflow horizontally
    const hasOverflow = await page.evaluate(() => {
      const nav = document.querySelector("header nav");
      if (!nav) return false;
      return nav.scrollWidth > nav.clientWidth;
    });
    expect(hasOverflow).toBe(false);

    // Every visible desktop nav link / button must be visible (not clipped off-screen)
    const navItems = page.locator("header nav a, header nav button");
    const count = await navItems.count();
    for (let i = 0; i < count; i++) {
      await expect(navItems.nth(i)).toBeVisible();
    }
  });

  test("logo is always the leftmost element in the navbar", async ({ page }) => {
    const pagesToCheck = ["/", ...FORCE_LIGHT_PAGES];

    for (const path of pagesToCheck) {
      await page.goto(path);
      await page.waitForSelector("header a[href='/']");

      const logoBox = await page
        .locator("header a[href='/']")
        .first()
        .boundingBox();
      expect(logoBox, `logo should be visible on ${path}`).not.toBeNull();

      // Every desktop nav link should start to the right of the logo's left edge
      const navLinks = page.locator("header nav a");
      const count = await navLinks.count();
      for (let i = 0; i < count; i++) {
        const linkBox = await navLinks.nth(i).boundingBox();
        if (!linkBox || !logoBox) continue;
        expect(linkBox.x).toBeGreaterThan(logoBox.x);
      }
    }
  });
});
