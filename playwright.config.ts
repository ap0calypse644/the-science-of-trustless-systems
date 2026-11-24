import { defineConfig, devices } from '@playwright/test';

const port = process.env.PLAYWRIGHT_PORT ?? '4173';
const baseURL = `http://127.0.0.1:${port}`;

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
    command: `npm run preview -- --port ${port} --strictPort`,
    url: baseURL,
  },
});
