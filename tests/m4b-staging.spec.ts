import { mkdir } from 'node:fs/promises';
import { expect, test } from '@playwright/test';

test('staging stills preserve the battlefield and separate local views', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/staging/');
  const deck = page.locator('.reveal');
  await expect(deck).toHaveClass(/ready/);
  const current = deck.locator('section.present');
  const ids = ['opening', 'couriers', 'reply-arrives', 'reply-lost'];
  const views: string[] = [];
  let castle: string | null = null;

  for (const [index, id] of ids.entries()) {
    await expect(current).toHaveAttribute('id', id);
    const text = await current.locator('[data-view="alice"] text').allTextContents();
    views.push(text.join(' '));
    const stonework = await current.locator('.castle').innerHTML();
    if (castle === null) castle = stonework;
    expect(stonework).toBe(castle);
    if (index === 1) {
      await expect(current.locator('[data-character="charlie"]')).toHaveCount(4);
    }
    if (index > 1) {
      const evidence = index === 2 ? 'She just confirmed it.' : 'Did Alice get';
      if (index === 3) await expect(current.locator(".messenger-speech")).toContainText("I give up…");
      await expect(current.locator('[data-view="bob"]')).toContainText(evidence);
    }
    if (browserName === 'firefox') {
      const directory = 'test-results/visual-review/m4b-staging/1920x1080';
      await mkdir(directory, { recursive: true });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${directory}/${id}.png` });
    }
    if (index < ids.length - 1) await page.keyboard.press('ArrowRight');
  }

  expect(views[2]).toBe(views[3]);
  await expect(page).toHaveURL(/#\/reply-lost$/);
  await page.reload();
  await expect(current).toHaveAttribute('id', 'reply-lost');
  await page.keyboard.press('ArrowLeft');
  await expect(current).toHaveAttribute('id', 'reply-arrives');
});
