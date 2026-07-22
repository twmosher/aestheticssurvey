import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    ...devices["iPhone 13"],
    baseURL: "http://127.0.0.1:3005",
  },
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3005",
    port: 3005,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
