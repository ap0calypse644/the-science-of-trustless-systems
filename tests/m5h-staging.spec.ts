import { expect, test } from '@playwright/test';

const route = '/talk/m5h/';
const folder = 'test-results/visual-review/m5h-staging';
const ids = [
  '30-iceberg-tip', '30-iceberg-reveal', '30-internet', '30-parallel', '30-shared-records',
  '31-credentials', '31-provenance', '31-timestamping', '31-infrastructure', '31-graduation',
  '31-verification', '31-question', '31-answer', '32-interview', '32-transcript-handoff',
  '32-oversharing', '32-question', '32-transparent-ledger', '32-glass-house',
];
const representative = ['30-iceberg-reveal', '30-parallel', '31-infrastructure', '31-verification',
  '31-answer', '32-oversharing', '32-glass-house'];

for (const [width, height] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`all 19 holds navigate offline and fit at ${width} × ${height}`, async ({ page, context, baseURL, browserName }) => {
    const origin = new URL(baseURL!).origin;
    const failures: string[] = [];
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (new URL(url).origin === origin) return route.continue();
      failures.push(url);
      return route.abort();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      failures.push(socket.url());
      void socket.close();
    });
    context.on('weberror', (error) => failures.push(error.error().message));
    context.on('requestfailed', (request) => failures.push(request.url()));
    await page.setViewportSize({ width, height });
    await page.goto(route);
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    await expect(page.locator('.presenter, .slides button, .slides input')).toHaveCount(0);
    expect(await page.locator('.slides > section').evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual(ids);
    await page.evaluate(() => document.fonts.ready);
    const current = page.locator('section.present');
    const sheet = current.locator('.beyond-sheet');
    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(current).toHaveAttribute('id', id);
      const bounds = await sheet.evaluate((element) => {
        const canvas = element.getBoundingClientRect();
        const heading = element.querySelector('h1')!.getBoundingClientRect();
        const art = element.querySelector<SVGSVGElement>('svg')!.getBBox();
        return { canvas: [canvas.x, canvas.y, canvas.right, canvas.bottom],
          heading: [heading.x - canvas.x, canvas.right - heading.right],
          art: [art.x, art.y, art.x + art.width, art.y + art.height],
          background: getComputedStyle(element).backgroundColor };
      });
      expect(bounds.canvas[0], id).toBeGreaterThanOrEqual(-1);
      expect(bounds.canvas[1], id).toBeGreaterThanOrEqual(-1);
      expect(bounds.canvas[2], id).toBeLessThanOrEqual(width + 1);
      expect(bounds.canvas[3], id).toBeLessThanOrEqual(height + 1);
      expect(Math.min(...bounds.heading), id).toBeGreaterThan(8);
      expect(bounds.art[0], id).toBeGreaterThan(34);
      expect(bounds.art[1], id).toBeGreaterThan(108);
      expect(bounds.art[2], id).toBeLessThan(1571);
      expect(bounds.art[3], id).toBeLessThan(880);
      expect(bounds.background).toBe('rgb(255, 255, 255)');

      if (id === '30-iceberg-tip') {
        await expect(sheet.locator('[data-submerged]')).toHaveCount(0);
        await expect(sheet.locator('[data-bitcoin-mark]')).toHaveCount(1);
      }
      if (id === '30-iceberg-reveal') await expect(sheet.locator('.ice-label')).toHaveCount(4);
      if (id === '30-parallel') await expect(sheet.locator('[data-application]')).toHaveCount(8);
      if (id === '30-shared-records') {
        await expect(sheet.locator('[data-replica]')).toHaveCount(3);
        await expect(sheet.locator('.entry')).toHaveText(
          Array(3).fill(['Certificate C-17', 'Parcel P-42 · Joint ownership', 'Handoff H-08 · Received']).flat());
      }
      if (index >= 5 && index <= 8) await expect(sheet.locator('[data-application-panel]')).toHaveCount(index - 4);
      if (id === '31-verification') {
        await expect(sheet).toContainText('Job application abroad');
        await expect(sheet).toContainText('Signature valid');
        await expect(sheet).toContainText('Recognized issuer');
        await expect(sheet).toContainText('Credential status');
      }
      if (id === '31-question') await expect(sheet.locator('.mark')).toHaveCount(0);
      if (id === '31-answer') await expect(sheet.locator('.mark')).toHaveText(['✕', '✕', '✓']);
      if (id === '32-transcript-handoff') await expect(sheet.locator('[data-handoff]')).toHaveCount(1);
      if (id === '32-oversharing' || id === '32-question') {
        const fields = sheet.locator('[data-field]');
        await expect(fields.locator('.application')).toHaveText(['Alice', 'B.Tech', 'Yes', 'A', 'B', 'C', '2']);
        await expect(sheet.locator('[data-field="Graduated"].needed')).toHaveCount(1);
        await expect(sheet.locator('[data-field].extra')).toHaveCount(6);
      }
      if (id === '32-transparent-ledger') {
        await expect(sheet.locator('[data-cafe-callback] [data-set="cafe"]')).toHaveCount(1);
        await expect(sheet.locator('[data-cafe-copy] .entry')).toHaveText(
          Array(3).fill(['Charlie owes Alice 4', 'Bob owes Charlie 3']).flat());
      }
      if (id === '32-glass-house') {
        await expect(sheet.locator('[data-glass-house]')).toHaveCount(1);
        await expect(sheet.locator('.glass-label')).toHaveText(['Salary', 'Medical', 'records', 'Purchases', 'Personal data']);
      }
      if (browserName === 'firefox' && (width === 1920 || representative.includes(id))) {
        await page.screenshot({ path: `${folder}/${width}x${height}/${id}.png` });
      }
    }
    await page.keyboard.press('ArrowLeft');
    await expect(current).toHaveAttribute('id', '32-transparent-ledger');
    await expect(page).toHaveURL(/#\/32-transparent-ledger$/);
    await page.reload();
    await expect(current).toHaveAttribute('id', '32-transparent-ledger');
    await page.goto(`${route}#/31-verification`);
    await expect(current).toHaveAttribute('id', '31-verification');
    expect(failures).toEqual([]);
  });
}

test('production and print remain 29 slides and prior staging still loads', async ({ page }) => {
  await page.goto('/talk/?print');
  await expect(page.locator('.print-deck .talk-sheet')).toHaveCount(29);
  await expect(page.locator('.print-deck section').last()).toHaveAttribute('id', '29-stake-weighted-voting');
  await page.goto('/talk/#/29-stake-weighted-voting');
  await expect(page.locator('section.present')).toHaveAttribute('id', '29-stake-weighted-voting');
  await expect(page.locator('.slides > section')).toHaveCount(29);
  await page.goto('/talk/m5g/#/29-commit');
  await expect(page.locator('section.present')).toHaveAttribute('id', '29-commit');
});
