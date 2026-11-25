import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

const path = '/talk/m5b/';
const screenshots = 'test-results/visual-review/m5b-staging';
const ids = [
  '08-byzantine-generals', '08-orders-alice', '08-orders-bob', '08-forwarded-reports',
  '08-four-generals', '08-loyal-commander', '08-protocol-layout',
];

test('M5b shows one local view before forwarding and keeps the protocol mock inert', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(path);
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  const current = page.locator('section.present');
  await expect(page.locator('.presenter')).toHaveCount(0);
  let castle: string | undefined;

  for (const [index, id] of ids.entries()) {
    await expect(current).toHaveAttribute('id', id);
    if (index < 6) {
      const stonework = await current.locator('.castle').innerHTML();
      castle ??= stonework;
      expect(stonework).toBe(castle);
      await expect(current.locator('[data-actor="mallory"]')).toHaveCount(1);
    }
    if (index === 1 || index === 2) {
      await expect(current.locator('[data-view]')).toHaveCount(1);
      const recipient = index === 1 ? 'alice' : 'bob';
      await expect(current.locator(`[data-view="${recipient}"]`)).toContainText(index === 1 ? 'Attack' : 'Retreat');
      await expect(current.locator('.byz-reports')).toHaveCount(0);
    }
    if (index === 3) await expect(current.locator('.byz-bound')).toContainText('Outside guarantee');
    if (index === 4) {
      await expect(current.locator('.byz-reports dt')).toHaveText([
        'Direct · Mallory → Alice',
        'Forwarded · Mallory → Bob → Alice',
        'Forwarded · Mallory → Charlie → Alice',
      ]);
      await expect(current.locator('[data-actor="charlie"]')).toHaveCount(1);
    }
    if (index === 5) {
      await expect(current.locator('.byz-bound')).toHaveText([
        'Tie → Retreat · Validity fails', 'Majority → Attack · Validity holds',
      ]);
    }
    if (index === 6) {
      await expect(current.getByRole('button', { name: 'Next round' })).toBeDisabled();
      await expect(current.getByRole('combobox', { name: 'Local view' })).toBeDisabled();
    }
    if (browserName === 'firefox') {
      const directory = `${screenshots}/1920x1080`;
      await mkdir(directory, { recursive: true });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${directory}/${id}.png` });
    }
    if (index < ids.length - 1) await page.keyboard.press('ArrowRight');
  }
  await expect(page).toHaveURL(/#\/08-protocol-layout$/);
  await page.reload();
  await expect(current).toHaveAttribute('id', '08-protocol-layout');
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`M5b reports and proposed controls fit at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    const current = page.locator('section.present');
    for (const id of ['08-four-generals', '08-loyal-commander', '08-protocol-layout']) {
      await page.goto(`${path}#/${id}`);
      await expect(current).toHaveAttribute('id', id);
      await page.evaluate(() => document.fonts.ready);
      const content = (await current.locator('.byz-panel, .protocol-columns').boundingBox())!;
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
