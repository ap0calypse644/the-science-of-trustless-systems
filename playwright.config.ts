import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    serviceWorkers: 'block',
  },
  projects: [
    { name: 'firefox', use: devices['Desktop Firefox'] },
    { name: 'chromium', use: devices['Desktop Chrome'] },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: baseURL,
  },
});
