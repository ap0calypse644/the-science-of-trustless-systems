import { mkdir } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { checkpoints, finalRuns, frameAt, localEvidence } from '../src/talk/two-generals/two-generals-model';

const path = '/talk/#/07-two-generals';
const prefix = 'test-results/visual-review/m4b-production';

async function openScene(page: Page): Promise<void> {
  await page.goto(path);
  await expect(page.locator('.playback-state')).toContainText('Paused · Two hilltops');
}

async function seek(page: Page, time: number): Promise<void> {
  await page.getByRole('slider', { name: 'Seek' }).evaluate((slider: HTMLInputElement, value) => {
    slider.value = String(value);
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }, time);
}

test('the final runs differ only in delivery and the sender cannot distinguish them', () => {
  expect(finalRuns.delivered.slice(0, -1)).toEqual(finalRuns.lost.slice(0, -1));
  expect(finalRuns.delivered.at(-1)).toEqual({ ...finalRuns.lost.at(-1), delivery: 'delivered' });
  expect(localEvidence(finalRuns.delivered, 'alice')).toEqual(localEvidence(finalRuns.lost, 'alice'));
  expect(localEvidence(finalRuns.delivered, 'bob').received).toContain('final');
  expect(localEvidence(finalRuns.lost, 'bob').received).not.toContain('final');
  expect(frameAt(18).bob).toEqual(['Did Alice get', 'my reply?']);
  expect(frameAt(23).segment).toBe('alternate');
  expect(frameAt(23).alice).toEqual(['Bob received', 'my plan.']);
});

test('all teaching beats restore identical rendered evidence on exact seek', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openScene(page);
  const scene = page.locator('.scene-root');
  const status = page.locator('.playback-state');
  const expected = [
    ['We have to move', 'When should we move?'],
    ['I sent the plan.', 'When should we move?'],
    ['I sent the plan.', 'When should we move?'],
    ['Did Bob get it?', 'Sunrise it is.'],
    ['Did Bob get it?', 'Did Alice get'],
    ['Did Bob get it?', 'Did Alice get'],
    ['Bob received', 'Did Alice get'],
    ['I sent my reply.', 'Arrives: She got my reply.'],
  ];
  const artwork: string[] = [];
  const directory = `${prefix}/1920x1080`;
  if (browserName === 'firefox') await mkdir(directory, { recursive: true });

  for (const [index, beat] of checkpoints.entries()) {
    if (index > 0) await page.keyboard.press('k');
    await expect(status).toContainText(beat.label);
    await expect(scene.locator('[data-view="alice"]')).toContainText(expected[index][0]);
    await expect(scene.locator('[data-view="bob"]')).toContainText(expected[index][1]);
    if (index === 1) await expect(scene).toContainText('Attack at sunrise!');
    if (index === 4) await expect(scene).toContainText('Agreed!');
    if (index === 5) await expect(scene).toContainText('acknowledgment is lost');
    if (index === 6) await expect(scene).toContainText('Alternate run');
    if (index === 7) {
      await expect(scene.locator('[data-outcome="delivered"]')).toContainText('She just confirmed it.');
      await expect(scene.locator('[data-outcome="lost"]')).toContainText('my latest reply?');
    }
    artwork.push(await scene.innerHTML());
    if (browserName === 'firefox') {
      await page.keyboard.press('h');
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${directory}/beat-${index + 1}.png`,
        style: '.presenter { visibility: hidden; }',
      });
      await page.keyboard.press('h');
    }
  }

  for (let index = checkpoints.length - 2; index >= 0; index--) {
    await page.keyboard.press('j');
    await expect(status).toContainText(checkpoints[index].label);
    expect(await scene.innerHTML()).toBe(artwork[index]);
  }

  await seek(page, 27);
  const motion = await scene.innerHTML();
  await expect(scene).toContainText('my latest reply?');
  await seek(page, 28.5);
  await expect(scene.locator('[data-character="charlie"]')).toHaveCount(4);
  if (browserName === 'firefox') {
    await page.keyboard.press('h');
    await page.screenshot({
      path: `${directory}/alternate-couriers.png`,
      style: '.presenter { visibility: hidden; }',
    });
    await page.keyboard.press('h');
  }
  await seek(page, 27);
  expect(await scene.innerHTML()).toBe(motion);
  await page.keyboard.press('r');
  expect(await scene.innerHTML()).toBe(artwork[0]);
});

test('play moves Charlie, pauses for predictions, and cleans up on navigation', async ({ page }) => {
  await openScene(page);
  const status = page.locator('.playback-state');
  const scene = page.locator('.scene-root');
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).toHaveText('1.25×');
  await page.keyboard.press('Space');
  await expect(status).toContainText('Paused · Send the plan · 3.00', { timeout: 7000 });
  const runner = scene.locator('[data-courier]');
  const start = await runner.getAttribute('transform');
  await page.keyboard.press('Space');
  await expect(runner).not.toHaveAttribute('transform', start!);
  await page.keyboard.press('Escape');
  await expect(status).toContainText('Paused');
  await expect(page.locator('.reveal')).toHaveClass(/overview/);
  await page.keyboard.press('Escape');

  const seekBar = page.getByRole('slider', { name: 'Seek' });
  await seekBar.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('section.present')).toHaveAttribute('id', '07-two-generals');
  await expect(seekBar).toBeFocused();
  await page.locator('.reveal').focus();
  await page.keyboard.press('ArrowLeft');
  await expect(scene).toBeEmpty();
  await expect(page.locator('.presenter')).toBeHidden();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowRight');
  await expect(status).toContainText('Paused · Two hilltops · 0.00');
  await expect(page.locator('.playback-speed')).toHaveText('1.25×');
  await seek(page, 31.7);
  await page.keyboard.press('Space');
  await expect(status).toContainText('Ended · The final message');
  await page.keyboard.press('Space');
  await expect(page.locator('section.present')).toHaveAttribute('id', '07-two-generals');
});

test('final comparison is readable at smaller sizes and available in print', async ({ page, browserName }) => {
  await openScene(page);
  await seek(page, 32);
  for (const [width, height] of [[1280, 720], [1024, 768]]) {
    await page.setViewportSize({ width, height });
    const caption = (await page.locator('.scene-root .scene-caption').boundingBox())!;
    const controls = (await page.locator('.presenter').boundingBox())!;
    expect(caption.y + caption.height).toBeLessThan(controls.y);
    await page.keyboard.press('h');
    const final = page.locator('.scene-root [data-outcome="lost"]');
    await expect(final).toBeVisible();
    const bounds = (await final.boundingBox())!;
    expect(bounds.x + bounds.width).toBeLessThan(width);
    expect(bounds.y + bounds.height).toBeLessThan(height);
    if (browserName === 'firefox') {
      const directory = `${prefix}/${width}x${height}`;
      await mkdir(directory, { recursive: true });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${directory}/final-comparison.png`,
        style: '.presenter { visibility: hidden; }',
      });
    }
    await page.keyboard.press('h');
  }

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  const sheet = page.locator('.print-deck [id="07-two-generals"]');
  await expect(sheet.locator('[data-outcome]')).toHaveCount(2);
  await expect(sheet.locator('[data-view="alice"]')).toContainText('Did Bob get it?');
  await expect(page.locator('.presenter')).toHaveCount(0);
  if (browserName === 'firefox') {
    await page.evaluate(() => document.fonts.ready);
    await mkdir(`${prefix}/1920x1080`, { recursive: true });
    await sheet.screenshot({ path: `${prefix}/1920x1080/print-comparison.png` });
  }
});
