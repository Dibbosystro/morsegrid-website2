import { test, expect } from "@playwright/test";

test("hero email capture submits to bookCall with utm + email", async ({ page }) => {
  let openedUrl: string | null = null;
  await page.exposeFunction("__captureOpen", (url: string) => {
    openedUrl = url;
  });
  await page.addInitScript(() => {
    window.open = ((url?: string | URL) => {
      const captured = window as unknown as { __captureOpen: (u: string) => void };
      captured.__captureOpen(String(url ?? ""));
      return null;
    }) as typeof window.open;
  });

  await page.goto("/");
  const email = page.getByTestId("input-hero-email");
  await email.fill("ops@example.com");
  await page.getByTestId("button-hero-cta").click();

  await expect.poll(() => openedUrl, { timeout: 4_000 }).not.toBeNull();
  expect(openedUrl!).toContain("utm_source=morsegrid_hero");
  expect(openedUrl!).toContain("email=ops%40example.com");
});
