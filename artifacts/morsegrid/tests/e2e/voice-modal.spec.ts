import { test, expect } from "@playwright/test";

test("voice modal happy path with stubbed mic + fetch", async ({ page, context }) => {
  await context.grantPermissions(["microphone"]);

  await page.addInitScript(() => {
    class FakeStream {
      getTracks() {
        return [{ stop: () => {} }];
      }
    }
    Object.defineProperty(navigator, "mediaDevices", {
      configurable: true,
      value: {
        getUserMedia: async () => new FakeStream() as unknown as MediaStream,
      },
    });
    class FakeRecorder {
      static isTypeSupported() {
        return true;
      }
      state = "inactive";
      mimeType = "audio/webm";
      ondataavailable: ((e: { data: Blob }) => void) | null = null;
      onstop: (() => void) | null = null;
      onerror: (() => void) | null = null;
      constructor(_s: unknown, _o?: unknown) {}
      start() {
        this.state = "recording";
        setTimeout(() => {
          this.ondataavailable?.({ data: new Blob([new Uint8Array([1, 2, 3, 4])], { type: "audio/webm" }) });
        }, 10);
      }
      stop() {
        this.state = "inactive";
        setTimeout(() => this.onstop?.(), 10);
      }
    }
    (window as unknown as { MediaRecorder: typeof FakeRecorder }).MediaRecorder = FakeRecorder;
  });

  await page.route("**/api/voice/ask", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        transcript: "How do you handle order routing?",
        answer: "We start by mapping the rules you already have.",
      }),
    });
  });

  await page.goto("/");
  await page.getByTestId("button-ask-anything").click();
  await page.getByTestId("button-start-speaking").click();
  // Wait long enough to clear MIN_RECORDING_MS guard.
  await page.waitForTimeout(600);
  await page.getByTestId("button-stop-listening").click();

  const answer = page.getByTestId("text-answer");
  await expect(answer).toBeVisible({ timeout: 10_000 });
  await expect(answer).toContainText(/mapping the rules/i);
});
