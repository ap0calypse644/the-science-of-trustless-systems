import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const path = '/talk/m5b/';
const screenshots = 'test-results/visual-review/m5b-scripted-staging';
const ids = [
  '08-byzantine-generals', '08-orders-alice', '08-orders-bob', '08-forwarded-reports',
  '08-charlie-joins', '08-four-generals',
];

test('M5b shows one local view before forwarding and uses scripted receipts and tables', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(path);
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  const current = page.locator('section.present');
  await expect(page.locator('.presenter')).toHaveCount(0);
  let castle: string | undefined;

  for (const [index, id] of ids.entries()) {
    await expect(current).toHaveAttribute('id', id);
    if (index === 0 || index === 1 || index === 2 || index === 4) {
      const stonework = await current.locator('.castle').innerHTML();
      castle ??= stonework;
      expect(stonework).toBe(castle);
      const rear = current.locator('[data-depth="rear"] [data-actor="mallory"]');
      const fortress = current.locator('[data-depth="middle-ground"]');
      await expect(rear).toHaveCount(1);
      await expect(fortress).toHaveAttribute('transform', 'translate(208 90) scale(.74 .72)');
      await expect(current.locator('[data-hill]')).toHaveCount(4);
      await expect(current.locator('[data-terrain="valley-floor"]')).toHaveCount(1);
      await expect(current.locator('.crag')).toHaveCount(0);
      const rearHillBounds = (await current.locator('[data-hill="rear"]').boundingBox())!;
      const malloryBounds = (await rear.boundingBox())!;
      const fortressBounds = (await fortress.boundingBox())!;
      expect(malloryBounds.y + malloryBounds.height).toBeLessThan(fortressBounds.y);
      expect(rearHillBounds.y + rearHillBounds.height).toBeLessThan(fortressBounds.y);
      await expect(current.locator('[data-actor="alice"] .role-label')).toHaveText('Commander');
    }
    if (index === 1 || index === 2) {
      await expect(current.locator('[data-view]')).toHaveCount(1);
      await expect(current.locator('[data-view="bob"]')).toContainText(index === 1 ? 'Attack' : 'Retreat');
      await expect(current.locator('[data-depth="middle-ground"] ~ [data-depth="foreground-messages"] [data-message]')).not.toHaveCount(0);
      await expect(current.locator('table')).toHaveCount(0);
    }
    if (index === 3) await expect(current.locator('.byz-majority')).toContainText('tie defaults to Retreat');
    if (index === 4) {
      const charlie = current.locator('[data-depth="foreground-actors"] [data-actor="charlie"]');
      const fortress = current.locator('[data-depth="middle-ground"]');
      await expect(current.locator('[data-hill="front"]')).toBeVisible();
      const charlieBounds = (await charlie.boundingBox())!;
      const fortressBounds = (await fortress.boundingBox())!;
      expect(fortressBounds.y + fortressBounds.height).toBeLessThan(charlieBounds.y);
    }
    if (index === 5) {
      await expect(current.locator('tfoot td')).toHaveText(['Attack · 2 of 3', 'Attack · 3 of 3']);
      await expect(current.locator('tbody tr').last().locator('td')).toHaveText(['Retreat', 'Attack']);
    }
    await expect(current.locator('button, select, input')).toHaveCount(0);
    if (browserName === 'firefox') {
      const directory = `${screenshots}/1920x1080`;
      await mkdir(directory, { recursive: true });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${directory}/${id}.png` });
    }
    if (index < ids.length - 1) await page.keyboard.press('ArrowRight');
  }
  await expect(page).toHaveURL(/#\/08-four-generals$/);
  await page.reload();
  await expect(current).toHaveAttribute('id', '08-four-generals');
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`M5b report tables fit at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    const current = page.locator('section.present');
    for (const id of ['08-forwarded-reports', '08-four-generals']) {
      await page.goto(`${path}#/${id}`);
      await expect(current).toHaveAttribute('id', id);
      await page.evaluate(() => document.fonts.ready);
      const content = (await current.locator('.byz-table').boundingBox())!;
      const sheet = (await current.locator('.talk-sheet').boundingBox())!;
      expect(content.y + content.height).toBeLessThan(sheet.y + sheet.height);
      expect(content.x + content.width).toBeLessThan(width);
      if (browserName === 'firefox') {
        const directory = `${screenshots}/${width}x${height}`;
        await mkdir(directory, { recursive: true });
        await page.screenshot({ path: `${directory}/${id}.png` });
      }
    }
  });
}
