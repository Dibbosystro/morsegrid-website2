import { test, expect, type ConsoleMessage } from "@playwright/test";
import { ROUTES } from "./routes";

const IGNORED_CONSOLE = [
  /favicon/i,
  /\bdev\b.*plugin/i,
  /vite/i,
  /\[HMR\]/i,
  /Download the React DevTools/i,
];

for (const route of ROUTES) {
  test(`smoke ${route.path}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (IGNORED_CONSOLE.some((re) => re.test(text))) return;
      errors.push(text);
    });

    const res = await page.goto(route.path, { waitUntil: "domcontentloaded" });

    if (route.optional && (!res || res.status() >= 400)) {
      testInfo.skip(true, `Optional route not yet implemented: ${route.path}`);
      return;
    }

    expect(res, `expected response for ${route.path}`).toBeTruthy();

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible({ timeout: 8_000 });

    if (route.expectedH1) {
      const text = (await h1.textContent()) ?? "";
      if (route.expectedH1 instanceof RegExp) {
        expect(text).toMatch(route.expectedH1);
      } else {
        expect(text).toContain(route.expectedH1);
      }
    }

    expect(errors, `console errors on ${route.path}: ${errors.join(" | ")}`).toEqual([]);
  });
}
