const {defineConfig, devices} = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  expect: {timeout: 5000},
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"], ["html", {outputFolder: "playwright-report", open: "never"}]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },
  projects: [{name: "chromium", use: {...devices["Desktop Chrome"]}}],
  webServer: [
    {
      command: "npm run build && npm run serve:e2e",
      cwd: __dirname,
      url: "http://127.0.0.1:3000",
      name: "Frontend",
      reuseExistingServer: !process.env.CI,
      timeout: 120000
    },
    {
      command: "npm run db:e2e",
      cwd: __dirname,
      url: "http://127.0.0.1:4000/patient",
      name: "E2E API",
      reuseExistingServer: !process.env.CI,
      timeout: 120000
    }
  ]
});
