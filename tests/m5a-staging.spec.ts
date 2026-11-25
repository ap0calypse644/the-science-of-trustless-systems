import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const ids = [
  '03-why-distribute', '04-centralized-distributed-decentralized', '05-cap-theorem',
  '06-synced', '06-partition', '06-withdrawal', '06-balance-inquiry', '06-choose-response',
  '06-outcome-stale', '06-outcome-wait', '06-reconnect',
];
const screenshots = 'test-results/visual-review/m5a-staging';

test('M5a review deck preserves the visual evidence in each still', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/m5a/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  const current = page.locator('section.present');
  await expect(page.locator('.presenter')).toHaveCount(0);

  const directory = `${screenshots}/1920x1080`;
  if (browserName === 'firefox') await mkdir(directory, { recursive: true });
  for (const [index, id] of ids.entries()) {
    await expect(current).toHaveAttribute('id', id);
    if (id === ids[0]) {
      await expect(current.locator('[data-server="down"]')).toHaveCount(1);
      await expect(current.locator('[data-server="up"]')).toHaveCount(2);
      await expect(current.locator('[data-cluster] .power-cord')).toHaveCount(3);
    } else if (id === ids[1]) {
      const infrastructure = await current.locator('[data-infrastructure]').evaluateAll((nodes) =>
        nodes.map((node) => node.innerHTML));
      expect(infrastructure).toHaveLength(2);
      expect(infrastructure[0]).toBe(infrastructure[1]);
    } else if (id === ids[2]) {
      await expect(current.locator('.meme-placeholder')).toBeVisible();
      await expect(current.locator('.meme-labels span')).toHaveText(['Consistency', 'Availability', 'Partition Tolerance']);
    } else {
      const synchronized = id === '06-synced' || id === '06-partition';
      await expect(current.locator('[data-branch="A"] .amount')).toHaveText(synchronized ? '1,000' : '0');
      await expect(current.locator('[data-branch="B"] .amount')).toHaveText(id === '06-reconnect' ? '0' : '1,000');
      const connected = id === '06-synced' || id === '06-reconnect';
      await expect(current.locator('[data-link]')).toHaveAttribute('data-link', connected ? 'connected' : 'partitioned');
      await expect(current.getByRole('button')).toHaveCount(0);
      if (id === '06-outcome-stale') await expect(current.locator('[data-response]')).toContainText('Returned: 1,000 units');
      if (id === '06-outcome-wait') await expect(current.locator('[data-response]')).toContainText('Read pending');
      if (id === '06-reconnect') await expect(current.locator('[data-response]')).toContainText('Returned: 0 units');
    }
    if (browserName === 'firefox') {
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${directory}/${id}.png` });
    }
    if (index < ids.length - 1) await page.keyboard.press('ArrowRight');
  }
  await expect(page).toHaveURL(/#\/06-reconnect$/);
  await page.reload();
  await expect(current).toHaveAttribute('id', '06-reconnect');
});

test('the CAP staging slide accepts an owner file locally while the deck stays offline', async ({ page, context, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  const external: string[] = [];
  await context.route('**/*', (route) => {
    const url = new URL(route.request().url());
    if (url.origin === origin) return route.continue();
    external.push(url.href);
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    external.push(socket.url());
    void socket.close();
  });
  await page.goto('/talk/m5a/#/05-cap-theorem');
  const sheet = page.locator('section.present');
  await expect(sheet).toHaveAttribute('id', '05-cap-theorem');
  const input = sheet.locator('input[type="file"]');
  const data = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 60;
    canvas.height = 55;
    return canvas.toDataURL('image/png').split(',')[1];
  });
  await input.setInputFiles({ name: 'synthetic-fixture.png', mimeType: 'image/png', buffer: Buffer.from(data, 'base64') });
  await expect(sheet.locator('img')).toBeVisible();
  await expect(sheet.locator('img')).toHaveAttribute('src', /^blob:/);
  await expect(sheet.locator('.meme-placeholder')).toBeHidden();
  await input.setInputFiles([]);
  await expect(sheet.locator('.meme-placeholder')).toBeVisible();
  expect(external).toEqual([]);
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`M5a choice and labels fit at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    const current = page.locator('section.present');
    for (const id of ['03-why-distribute', '04-centralized-distributed-decentralized', '05-cap-theorem', '06-choose-response']) {
      await page.goto(`/talk/m5a/#/${id}`);
      await expect(current).toHaveAttribute('id', id);
      const sheet = (await current.locator('.talk-sheet').boundingBox())!;
      expect(sheet.x).toBeGreaterThanOrEqual(0);
      expect(sheet.y).toBeGreaterThanOrEqual(0);
      expect(sheet.x + sheet.width).toBeLessThanOrEqual(width);
      expect(sheet.y + sheet.height).toBeLessThanOrEqual(height);
      if (browserName === 'firefox') {
        const dir = `${screenshots}/${width}x${height}`;
        await mkdir(dir, { recursive: true });
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({ path: `${dir}/${id}.png` });
      }
    }
  });
}
