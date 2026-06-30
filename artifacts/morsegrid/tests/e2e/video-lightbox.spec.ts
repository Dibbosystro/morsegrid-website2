import { test, expect } from "@playwright/test";

test("video lightbox opens with correct src and closes via Radix", async ({ page }) => {
  await page.goto("/case-studies");
  const playBtn = page.locator('[data-testid^="button-play-video-"]').first();
  await expect(playBtn).toBeVisible();
  await playBtn.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const video = dialog.locator("video");
  await expect(video).toBeVisible();
  const src = await video.getAttribute("src");
  expect(src && src.length > 0, "video src should be present").toBeTruthy();

  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0, { timeout: 3_000 });
});
