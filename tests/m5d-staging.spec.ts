import { expect, test } from '@playwright/test';
import {
  attempts, bits, changedBits, changedCount, digests, digitBytes, editedBits, expectedWork,
  initialPrefix, originalBits, signedRows, target, verification,
} from '../src/talk/m5d/fixtures';

const route = '/talk/m5d/';
const ids = [
  '14-machine', '14-greeting', '14-ledger', '14-library', '14-identical-copies',
  '15-original', '15-edit', '15-one-bit', '15-avalanche', '15-detected',
  '16-target', '16-signature-failure', '16-nonce', '16-failed-attempt', '16-success',
  '17-handoff', '17-verify', '17-work-comparison',
];

test('authored digests, digit bytes and highlighted avalanche positions agree', () => {
  for (const digest of Object.values(digests)) {
    expect(digest).toMatch(/^[0-9a-f]{64}$/);
    expect(bits(digest)).toMatch(/^[01]{256}$/);
  }
  expect(digitBytes.map((byte) => Number.parseInt(byte, 2))).toEqual([48, 49]);
  expect([...digitBytes[0]].filter((bit, i) => bit !== digitBytes[1][i])).toHaveLength(1);
  expect([...originalBits].filter((bit, i) => bit !== editedBits[i])).toHaveLength(132);
  expect(changedCount).toBe(132);
  expect(changedBits).toHaveLength(256);
});

test('only nonce 7 meets the authored target and the verifier repeats that fixture', () => {
  expect(initialPrefix.startsWith(target)).toBe(false);
  expect(attempts.map(({ nonce }) => nonce)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  expect(attempts.every(({ prefix }) => /^[01]{8}$/.test(prefix))).toBe(true);
  expect(attempts.filter(({ prefix }) => prefix.startsWith(target))).toEqual([
    { nonce: 7, prefix: '00001011' },
  ]);
  expect(verification).toEqual({ rows: signedRows, nonce: 7, prefix: '00001011' });
  expect(expectedWork.map(({ attempts: count }) => count)).toEqual([16, 256, 65_536, 16_777_216]);
  expect(expectedWork.every(({ zeroBits, attempts: count }) => 2 ** zeroBits === count)).toBe(true);
});

for (const [width, height] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`all 18 stills navigate offline and fit at ${width} × ${height}`, async ({ page, context, baseURL, browserName }) => {
    const origin = new URL(baseURL!).origin;
    const unexpected: string[] = [];
    await context.route('**/*', (route) => {
      if (new URL(route.request().url()).origin === origin) return route.continue();
      unexpected.push(route.request().url());
      return route.abort();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      unexpected.push(socket.url());
      void socket.close();
    });
    context.on('weberror', (error) => unexpected.push(error.error().message));
    await page.setViewportSize({ width, height });
    await page.goto(route);
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    await expect(page.locator('.presenter, .slides input, .slides button')).toHaveCount(0);
    expect(await page.locator('.slides > section').evaluateAll((slides) => slides.map(({ id }) => id))).toEqual(ids);
    await page.evaluate(() => document.fonts.ready);
    const current = page.locator('section.present');
    let success: string | undefined;

    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(current).toHaveAttribute('id', id);
      await expect(current.locator('.fixture-caption')).toHaveText('Illustrative example · Fixed data');
      const { sheet, heading, drawing } = await current.evaluate((slide) => {
        const bounds = (selector: string) => {
          const box = slide.querySelector(selector)!.getBoundingClientRect();
          return { x: box.x, y: box.y, right: box.right, bottom: box.bottom };
        };
        const box = slide.querySelector<SVGSVGElement>('.art')!.getBBox();
        return { sheet: bounds('.talk-sheet'), heading: bounds('h1'),
          drawing: { x: box.x, y: box.y, right: box.x + box.width, bottom: box.y + box.height } };
      });
      expect(sheet.x, id).toBeGreaterThanOrEqual(-1);
      expect(sheet.y, id).toBeGreaterThanOrEqual(-1);
      expect(sheet.right, id).toBeLessThanOrEqual(width + 1);
      expect(sheet.bottom, id).toBeLessThanOrEqual(height + 1);
      expect(heading.x, id).toBeGreaterThan(sheet.x);
      expect(heading.right, id).toBeLessThan(sheet.right);
      expect(drawing.x, id).toBeGreaterThan(30);
      expect(drawing.y, id).toBeGreaterThan(130);
      expect(drawing.right, id).toBeLessThan(1570);
      expect(drawing.bottom, id).toBeLessThan(890);

      if (['14-greeting', '14-ledger', '14-library'].includes(id)) {
        await expect(current.locator('[data-grid] .bit')).toHaveCount(256);
      }
      if (id === '14-identical-copies') {
        const outputs = await current.locator('.monospace').allTextContents();
        expect(outputs).toEqual([originalBits.slice(0, 16) + '…', originalBits.slice(0, 16) + '…']);
      }
      if (id === '15-avalanche') {
        for (const pattern of await current.locator('[data-grid]').all()) {
          await expect(pattern.locator('.bit')).toHaveCount(256);
          await expect(pattern.locator('.changed-bit')).toHaveCount(changedCount);
        }
        await expect(current.locator('svg')).toContainText('132 of 256 bits changed');
      }
      if (id === '16-success' || id === '17-verify') {
        const digits = (await current.locator('[data-bit-row] .digit').allTextContents()).join('');
        await expect(current.locator('.target-bit')).toHaveCount(4);
        await expect(current.locator('svg')).toContainText('Nonce 7');
        if (id === '16-success') success = digits;
        else expect(digits).toBe(success);
      }
      if (id === '17-work-comparison') {
        const values = await current.locator('.monospace').allTextContents();
        expect(values).toEqual(['4', '16', '8', '256', '16', '65,536', '24', '16,777,216']);
      }
      if (browserName === 'firefox' && (width === 1920 || ['14-library', '15-avalanche', '16-success', '17-work-comparison'].includes(id))) {
        await page.screenshot({ path: `test-results/visual-review/m5d-staging/${width}x${height}/${id}.png` });
      }
    }
    await page.keyboard.press('ArrowLeft');
    await expect(current).toHaveAttribute('id', '17-verify');
    await expect(page).toHaveURL(/#\/17-verify$/);
    await page.reload();
    await expect(current).toHaveAttribute('id', '17-verify');
    await expect(current.locator('.notes')).toContainText('validity rule');
    expect(unexpected).toEqual([]);
  });
}
