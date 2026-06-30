import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 4321);
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    video: "off",
    screenshot: "only-on-failure",
    colorScheme: "light",
    reducedMotion: "reduce",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
      grep: /@mobile/,
    },
  ],
  webServer: {
    command: `pnpm --filter @workspace/morsegrid exec sh -c "vite build --config vite.config.ts && vite preview --config vite.config.ts --host 127.0.0.1 --port ${PORT} --strictPort"`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    env: {
      PORT: String(PORT),
      BASE_PATH: "/",
      NODE_ENV: "production",
    },
    stdout: "ignore",
    stderr: "pipe",
  },
});
