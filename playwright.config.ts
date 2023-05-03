import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('../playwright-typescript/src/pages/FirstTimeLogin.page.ts'),
  timeout: 2400 * 1000,
  use: {
    browserName: "chromium",
    locale: "en-GB",
    headless: false,
    screenshot: "on",
    video: "retain-on-failure",
    //storageState: 'storageState.json',
    trace: 'on',
    viewport: null,
    acceptDownloads: true,
    actionTimeout: 120000,
    navigationTimeout: 120000
  },
  retries: 0,
  //reporter : [["list"], ["json", {outputFile : "test-result.json"}]  /** Generate json report */
  //reporter: [["list"], ['junit', { outputFile: 'results.xml' }]  /** Generate .xml report */
  reporter: [["list"], ['html', { open: 'never', outputFile: 'my-report' }]  ],  /** Generate HTML report */
});
