import { expect, test } from '@playwright/test';

const title = 'The Science of Trustless Systems';

test('the production deck loads with local assets and supports keyboard navigation', async ({
  context,
  page,
  baseURL,
}) => {
  const externalRequests: string[] = [];
  const webSockets: string[] = [];
  const loadedAssetTypes = new Set<string>();
  const runtimeErrors: string[] = [];
  const failedRequests: string[] = [];

  await context.route('**/*', async (route) => {
    const url = route.request().url();
    if (new URL(url).origin === baseURL) {
      await route.continue();
    } else {
      externalRequests.push(url);
      await route.abort();
    }
  });
  await context.routeWebSocket(/.*/, (socket) => {
    webSockets.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => runtimeErrors.push(error.error().message));
  context.on('requestfailed', (request) => failedRequests.push(request.url()));
  context.on('response', (response) => {
    const request = response.request();
    if (response.ok()) loadedAssetTypes.add(request.resourceType());
    if (response.status() >= 400) failedRequests.push(response.url());
  });

  const response = await page.goto('/');
  expect(response?.ok()).toBe(true);
  await expect(page).toHaveTitle(title);
  await expect(page.locator('.reveal.ready .slides > section')).toHaveCount(3);
  const currentSlide = page.locator('.slides > section.present');
  await expect(currentSlide.getByRole('heading')).toHaveText(title);
  await expect(page.locator('.slide-number')).toHaveText(/^\s*1\s*\/\s*3\s*$/);

  await page.keyboard.press('ArrowRight');
  await expect(currentSlide.getByRole('heading')).toHaveText('Framework verification');
  await page.keyboard.press('ArrowRight');
  await expect(currentSlide.getByRole('heading')).toHaveText('End of diagnostic deck');
  await page.keyboard.press('ArrowLeft');
  await expect(currentSlide.getByRole('heading')).toHaveText('Framework verification');
  await page.keyboard.press('ArrowLeft');
  await expect(currentSlide.getByRole('heading')).toHaveText(title);

  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).toHaveClass(/\boverview\b/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).not.toHaveClass(/\boverview\b/);

  const speakerViewPromise = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speakerView = await speakerViewPromise;
  await expect(speakerView.getByText('Diagnostic note for the presentation title.', { exact: true })).toBeVisible();
  await page.bringToFront();
  await page.keyboard.press('ArrowRight');
  await expect(speakerView.getByText('Diagnostic note for framework verification.', { exact: true })).toBeVisible();

  expect([...loadedAssetTypes]).toEqual(expect.arrayContaining(['script', 'stylesheet']));
  expect(externalRequests).toEqual([]);
  expect(webSockets).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});

test('the deck does not automatically advance', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  const currentHeading = page.locator('.reveal.ready .slides > section.present').getByRole('heading');
  await expect(currentHeading).toHaveText(title);
  await page.clock.runFor(60_000);
  await expect(currentHeading).toHaveText(title);
  await expect(page.locator('.slide-number')).toHaveText(/^\s*1\s*\/\s*3\s*$/);
});

test('the logical canvas scales with the viewport and enters fullscreen', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('.reveal.ready .slides');
  await expect(canvas).toHaveCSS('width', '1920px');
  await expect(canvas).toHaveCSS('height', '1080px');

  const initialWidth = (await canvas.boundingBox())?.width ?? 0;
  expect(initialWidth).toBeGreaterThan(0);
  await page.setViewportSize({ width: 960, height: 540 });
  await expect.poll(async () => (await canvas.boundingBox())?.width ?? Infinity)
    .toBeLessThan(initialWidth);

  await page.keyboard.press('f');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
});
