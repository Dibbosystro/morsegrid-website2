import { test, expect } from "@playwright/test";

const MENUS = ["Product", "Industries", "Customers", "Resources", "Company"];

test.describe("Floating nav dropdowns", () => {
  for (const label of MENUS) {
    test(`hover opens ${label} mega-menu and Esc closes it`, async ({ page }) => {
      await page.goto("/");
      const trigger = page.getByRole("link", { name: new RegExp(`^${label}$`, "i") }).first();
      const exists = await trigger.count();
      test.skip(exists === 0, `${label} nav link not present`);
      await trigger.hover();
      const expanded = page.locator(`[aria-haspopup="menu"][aria-expanded="true"]`).first();
      await expect(expanded).toBeVisible({ timeout: 3_000 });
      await page.keyboard.press("Escape");
      await expect(expanded).toHaveCount(0, { timeout: 3_000 });
    });
  }

  test("clicking a sub-item navigates to the right URL", async ({ page }) => {
    await page.goto("/");
    const customers = page.getByRole("link", { name: /^Customers$/i }).first();
    await customers.hover();
    const expanded = page.locator(`[aria-haspopup="menu"][aria-expanded="true"]`).first();
    await expect(expanded).toBeVisible({ timeout: 3_000 });
    const subItem = page.locator('[role="menuitem"][href="/case-studies"]').first();
    await expect(subItem).toBeVisible({ timeout: 3_000 });
    await subItem.click();
    await page.waitForURL(/\/case-studies/);
    await expect(page).toHaveURL(/\/case-studies/);
  });
});

test("@mobile mobile menu opens, expands, navigates, closes", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /toggle menu/i });
  await toggle.click();
  const customers = page.getByRole("button", { name: /^Customers$/i }).first();
  await expect(customers).toBeVisible();
  await customers.click();
  const link = page.getByRole("link", { name: /case studies/i }).first();
  await expect(link).toBeVisible();
  await link.click();
  await page.waitForURL(/\/case-studies/);
  await expect(page).toHaveURL(/\/case-studies/);
});
