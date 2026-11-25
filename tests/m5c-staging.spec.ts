import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { aliceView, bobView, cafe, fresh, overspend } from '../src/talk/m5c/ledger-model';

const route = '/talk/m5c/';
const root = 'test-results/visual-review/m5c-staging';
const ids = [
  '09-cafe', '09-receipt-chaos', '09-alice-idea', '09-notebook',
  '10-unsigned-entry', '10-bob-objects', '10-bob-signs', '10-authorization',
  '11-infinite-money-glitch', '12-missing-ledger', '12-access-monopoly', '12-replicated-copies',
  '13-fresh-balance', '13-two-signatures', '13-local-acceptance', '13-conflicting-histories',
  '13-morph-keyframe', '13-battlefield',
];

test('toy accounting rejects unsigned and unaffordable entries and keeps both local histories independent', () => {
  expect(cafe.balances).toEqual({ Alice: 10, Bob: 20, Charlie: 5 });
  expect(cafe.rejected[0].reason).toBe('No signature');
  expect(overspend.balances).toEqual(cafe.balances);
  expect(overspend.rejected[0].reason).toBe('Insufficient balance');
  expect(fresh).toEqual({ Alice: 0, Bob: 0, Charlie: 20 });
  expect(aliceView.balances).toEqual({ Alice: 20, Bob: 0, Charlie: 0 });
  expect(bobView.balances).toEqual({ Alice: 0, Bob: 20, Charlie: 0 });
  expect(aliceView.rejected[0].payment.to).toBe('Bob');
  expect(bobView.rejected[0].payment.to).toBe('Alice');
});

test('all eighteen café and transformation stills use the approved narrative and shared props', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(route);
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  const current = page.locator('section.present');
  await expect(page.locator('.presenter')).toHaveCount(0);
  let cafe: string | undefined;
  let castle: string | undefined;

  for (const [index, id] of ids.entries()) {
    await expect(current).toHaveAttribute('id', id);
    if (index < 17) {
      const set = await current.locator('[data-set="cafe"]').innerHTML();
      cafe ??= set;
      expect(set).toBe(cafe);
    }
    if (id === '09-notebook') await expect(current.locator('[data-prop="blue-notebook"]')).toContainText('Café IOUs');
    if (id === '12-replicated-copies') await expect(current.locator('[data-prop="blue-notebook"]')).toHaveCount(3);
    if (id === '13-fresh-balance') await expect(current.locator('svg')).toContainText('Fresh toy run');
    if (id === '13-conflicting-histories') {
      await expect(current.locator('[data-prop="blue-notebook"] .outside-entry')).toHaveCount(0);
      await expect(current.locator('.outside-entry')).toHaveText([
        'Rejected: Charlie pays Bob 20', 'Rejected: Charlie pays Alice 20',
      ]);
    }
    if (index >= 16) {
      const masonry = await current.locator('.castle').innerHTML();
      castle ??= masonry;
      expect(masonry).toBe(castle);
      await expect(current.locator('[data-prop="messenger-note"] .prop.yellow')).toHaveCount(2);
    }
    if (index === 17) {
      await expect(current.locator('[data-set="cafe"]')).toHaveCount(0);
      await expect(current.locator('svg text')).toHaveText(['Charlie pays Alice 20', 'Charlie pays Bob 20']);
    }
    if (browserName === 'firefox') {
      const directory = `${root}/1920x1080`;
      await mkdir(directory, { recursive: true });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${directory}/${id}.png` });
    }
    if (index < ids.length - 1) await page.keyboard.press('ArrowRight');
  }
  await expect(page).toHaveURL(/#\/13-battlefield$/);
  await page.reload();
  await expect(current).toHaveAttribute('id', '13-battlefield');
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`notebook and transformation stills fit at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    const current = page.locator('section.present');
    for (const id of ['09-notebook', '10-authorization', '11-infinite-money-glitch', '12-replicated-copies',
      '13-conflicting-histories', '13-morph-keyframe', '13-battlefield']) {
      await page.goto(`${route}#/${id}`);
      await expect(current).toHaveAttribute('id', id);
      await page.evaluate(() => document.fonts.ready);
      const art = (await current.locator('svg').boundingBox())!;
      expect(art.x).toBeGreaterThanOrEqual(0);
      expect(art.y).toBeGreaterThanOrEqual(0);
      expect(art.x + art.width).toBeLessThanOrEqual(width);
      expect(art.y + art.height).toBeLessThanOrEqual(height);
      if (browserName === 'firefox') {
        const directory = `${root}/${width}x${height}`;
        await mkdir(directory, { recursive: true });
        await page.screenshot({ path: `${directory}/${id}.png` });
      }
    }
  });
}
