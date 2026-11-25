import { mkdir } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';

const ids = [
  '01-title', '02-single-point-of-failure', '03-why-distribute',
  '04-centralized-distributed-decentralized', '05-cap-theorem',
  '06-consistency-or-availability', '07-two-generals', '08-byzantine-generals',
  '09-shared-ledger', '10-unauthorized-transactions', '11-infinite-money-glitch',
  '12-who-controls-the-ledger', '13-double-spend-problem',
  '14-data-fingerprint', '15-one-bit', '16-proof-of-work', '17-easy-verification',
];

async function openTalk(page: Page): Promise<void> {
  await page.goto('/talk/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
}

test('static talk navigates, revisits and preserves native focus', async ({ page }) => {
  await openTalk(page);
  expect(await page.locator('.slides > section').evaluateAll((sections) => sections.map(({ id }) => id))).toEqual(ids);
  const current = page.locator('section.present');
  await expect(current).toHaveAttribute('id', ids[0]);
  const baseline = await current.locator('.talk-sheet').innerHTML();
  for (const key of ['Space', 'r', 'j', 'k', '=', '+', '-', 'h']) await page.keyboard.press(key);
  await expect(current).toHaveAttribute('id', ids[0]);
  await expect(page.locator('.presenter')).toBeHidden();
  await expect(page.locator('#playback-panel')).toBeHidden();
  await page.keyboard.press('ArrowRight');
  await expect(current).toHaveAttribute('id', ids[1]);
  await page.keyboard.press('Space');
  await expect(current).toHaveAttribute('id', ids[1]);
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).toHaveClass(/overview/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).not.toHaveClass(/overview/);
  await page.keyboard.press('ArrowLeft');
  await expect(current).toHaveAttribute('id', ids[0]);
  expect(await current.locator('.talk-sheet').innerHTML()).toBe(baseline);

  await page.evaluate(() => {
    const control = document.createElement('input');
    control.value = 'text';
    document.body.append(control);
    control.focus();
    control.setSelectionRange(0, 0);
  });
  await page.keyboard.press('ArrowRight');
  await expect(current).toHaveAttribute('id', ids[0]);
  expect(await page.getByRole('textbox').evaluate((input: HTMLInputElement) => input.selectionStart)).toBe(1);
  await page.locator('.reveal').focus();
  await page.keyboard.press('f');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await page.keyboard.press('f');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
});

test('local fonts, assets and synchronized speaker notes work with external traffic blocked', async ({ context, page, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const failures: string[] = [];
  const fonts: string[] = [];
  await context.route('**/*', (route) => {
    if (new URL(route.request().url()).origin === origin) return route.continue();
    failures.push(route.request().url());
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    failures.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => failures.push(error.error().message));
  context.on('requestfailed', (request) => failures.push(request.url()));
  context.on('response', (response) => {
    if (response.status() >= 400) failures.push(response.url());
    if (response.ok() && response.request().resourceType() === 'font') fonts.push(response.url());
  });

  await openTalk(page);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/How do we agree\? What information must we reveal\?/)).toBeVisible();
  await page.bringToFront();
  await page.keyboard.press('ArrowRight');
  await expect(speaker.getByText(/why the devices stopped together/)).toBeVisible();
  await expect(speaker.frameLocator('iframe').first().locator('section.present')).toHaveAttribute('id', ids[1]);
  const preview = speaker.frameLocator('iframe').first();
  for (const id of ids.slice(2, 7)) {
    await page.keyboard.press('ArrowRight');
    await expect(preview.locator('section.present')).toHaveAttribute('id', id);
  }
  await expect(speaker.getByText(/Final-message argument/)).toBeVisible();
  await page.keyboard.press('k');
  await expect(page.locator('.playback-state')).toContainText('Send the plan');
  await expect(preview.locator('section.present .scene-root .scene-caption')).toHaveText('Both together, or neither.');
  await expect(preview.locator('.presenter')).toBeHidden();
  await page.evaluate(() => document.fonts.ready);
  expect(fonts).toEqual(expect.arrayContaining([
    expect.stringContaining('Kalam-Regular'), expect.stringContaining('PatrickHand-Regular'),
  ]));
  expect(failures).toEqual([]);
});

test('print view shows all representative 16:9 compositions', async ({ page }) => {
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  const sheets = page.locator('.print-deck .talk-sheet');
  await expect(sheets).toHaveCount(ids.length);
  await expect(page.locator('.notes, .slide-number')).toHaveCount(0);
  for (const [index, id] of ids.entries()) {
    const sheet = sheets.nth(index);
    await expect(page.locator('[id="' + id + '"]')).toBeVisible();
    const bounds = (await sheet.boundingBox())!;
    expect(bounds.width).toBeLessThanOrEqual(page.viewportSize()!.width);
    expect(bounds.width / bounds.height).toBeCloseTo(16 / 9);
    await expect(sheet.locator(id === '08-byzantine-generals' ? '.byz-print' : 'svg.art, img')).toBeVisible();
  }
});

for (const size of [{ width: 1920, height: 1080 }, { width: 1280, height: 720 }, { width: 1024, height: 768 }]) {
  test(`talk art fits at ${size.width} × ${size.height}`, async ({ page, browserName }) => {
    await page.setViewportSize(size);
    await openTalk(page);
    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      const current = page.locator('section.present');
      await expect(current).toHaveAttribute('id', id);
      await page.evaluate(() => document.fonts.ready);
      const sheet = (await current.locator('.talk-sheet:visible').boundingBox())!;
      const heading = (await current.locator('h1:visible').boundingBox())!;
      expect(sheet.x).toBeGreaterThanOrEqual(0);
      expect(sheet.y).toBeGreaterThanOrEqual(0);
      expect(sheet.x + sheet.width).toBeLessThanOrEqual(size.width);
      expect(sheet.y + sheet.height).toBeLessThanOrEqual(size.height);
      expect(sheet.width / sheet.height).toBeCloseTo(16 / 9);
      expect(heading.x + heading.width).toBeLessThan(sheet.x + sheet.width);
      expect(heading.y + heading.height).toBeLessThan(sheet.y + sheet.height);
      if (browserName === 'firefox' && index < 2) {
        const dir = `test-results/visual-review/m4a-reference-pass/${size.width}x${size.height}`;
        await mkdir(dir, { recursive: true });
        await page.screenshot({ path: `${dir}/${id}.png` });
      }
    }
  });
}
