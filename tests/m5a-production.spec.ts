import { mkdir } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { checkpoints, choiceTime, duration, frameAt } from '../src/talk/m5a/bank-model';

const bankId = '06-consistency-or-availability';
const directory = 'test-results/visual-review/m5a-production';

async function openBank(page: Page): Promise<void> {
  await page.goto(`/talk/#/${bankId}`);
  await expect(page.locator('.playback-state')).toContainText('Paused · Synced');
}

async function seek(page: Page, time: number): Promise<void> {
  await page.getByRole('slider', { name: 'Seek' }).evaluate((slider: HTMLInputElement, target) => {
    slider.value = String(target);
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }, time);
}

async function capture(page: Page, width: number, height: number, name: string): Promise<void> {
  const dir = `${directory}/${width}x${height}`;
  await mkdir(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${dir}/${name}.png`, style: '.presenter { visibility: hidden; }' });
}

test('CAP model has no default outcome and completes only the waiting read on reconnection', () => {
  expect(frameAt(duration, null)).toEqual(frameAt(choiceTime, null));
  expect(frameAt(6, null)).toMatchObject({ a: 0, b: 1000, cash: true, read: 'none' });
  expect(frameAt(17, 'wait')).toMatchObject({ a: 0, b: 1000, read: 'pending', returned: undefined });
  expect(frameAt(17, 'stale')).toMatchObject({ a: 0, b: 1000, read: 'complete', returned: 1000 });
  expect(frameAt(duration, 'wait')).toMatchObject({ a: 0, b: 0, read: 'complete', returned: 0 });
  expect(frameAt(duration, 'stale')).toMatchObject({ a: 0, b: 0, read: 'complete', returned: 1000 });
});

test('production choice blocks play and seek, supports native focus, and replays both histories', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openBank(page);
  const scene = page.locator(`[id="${bankId}"] .scene-root`);
  const status = page.locator('.playback-state');

  await seek(page, 12.9);
  await page.keyboard.press('Space');
  await expect(status).toContainText('Blocked · Choose response');
  const options = scene.getByRole('group', { name: 'Choose the response at branch B' });
  await expect(options.getByRole('button', { pressed: false })).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Choose a response to play' })).toBeDisabled();
  await seek(page, duration);
  await page.keyboard.press('k');
  await page.keyboard.press('Space');
  await expect(status).toContainText('Blocked · Choose response · 14.00');
  await expect(scene).toHaveAttribute('data-read', 'requested');
  const stale = options.getByRole('button', { name: 'Return 1,000' });
  const wait = options.getByRole('button', { name: 'Wait for sync' });
  const deck = page.locator('.reveal');
  await deck.focus();
  await page.keyboard.press('Tab');
  await expect(stale).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('section.present')).toHaveAttribute('id', bankId);
  await page.keyboard.press('Enter');
  await expect(stale).toHaveAttribute('aria-pressed', 'true');
  await expect(status).toContainText('Paused · Choose response');
  await expect(stale).toBeFocused();
  await deck.focus();
  await page.keyboard.press('k');
  await expect(scene).toHaveAttribute('data-returned', '1000');
  await expect(scene.locator('svg')).toContainText('Stale answer');
  const staleArt = await scene.innerHTML();
  await seek(page, duration);
  await expect(scene.locator('[data-branch="B"] .amount')).toHaveText('0');
  await expect(scene.locator('[data-response]')).toContainText('Earlier answer: 1,000 units');
  await seek(page, 17);
  expect(await scene.innerHTML()).toBe(staleArt);
  await page.keyboard.press('j');
  await expect(stale).toHaveAttribute('aria-pressed', 'true');
  await wait.click();
  await expect(wait).toHaveAttribute('aria-pressed', 'true');
  await deck.focus();
  await page.keyboard.press('k');
  await expect(scene).toHaveAttribute('data-read', 'pending');
  await expect(scene.locator('[data-response]')).toContainText('No answer while the link is down');
  const waitingArt = await scene.innerHTML();
  await page.keyboard.press('k');
  await expect(scene).toHaveAttribute('data-returned', '0');
  await expect(scene.locator('[data-response]')).toContainText('Waiting read completes');
  await seek(page, 17);
  expect(await scene.innerHTML()).toBe(waitingArt);
  await page.keyboard.press('r');
  await expect(scene).toHaveAttribute('data-read', 'none');
  await expect(scene.locator('[data-branch="A"] .amount')).toHaveText('1,000');
  await seek(page, duration);
  await expect(options.getByRole('button', { pressed: false })).toHaveCount(2);
  await wait.click();
  await seek(page, 17);
  await expect(scene).toHaveAttribute('data-read', 'pending');
  await deck.focus();
  await page.keyboard.press('ArrowRight');
  await expect(scene).toBeEmpty();
  await expect(scene).not.toHaveAttribute('data-read');
  await page.keyboard.press('ArrowLeft');
  await expect(status).toContainText('Paused · Synced');
  await seek(page, duration);
  await expect(options.getByRole('button', { pressed: false })).toHaveCount(2);

  if (browserName !== 'firefox') return;
  await page.keyboard.press('h');
  for (const beat of checkpoints.slice(0, 5)) {
    // Hidden controls expose the unchanged artwork; use J/K after moving to the baseline.
    if (beat.time === 0) await page.keyboard.press('r');
    else await page.keyboard.press('k');
    await capture(page, 1920, 1080, `06-${beat.id}`);
  }
  for (const [name, outcome] of [['Return 1,000', 'stale'], ['Wait for sync', 'wait']]) {
    await options.getByRole('button', { name, exact: true }).click();
    await deck.focus();
    await page.keyboard.press('k');
    await capture(page, 1920, 1080, `06-outcome-${outcome}`);
    await page.keyboard.press('k');
    await capture(page, 1920, 1080, `06-reconnect-${outcome}`);
    await page.keyboard.press('j');
    await page.keyboard.press('j');
  }
});

test('bank travel is seekable and the notes receiver stays at the baseline', async ({ page }) => {
  await openBank(page);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/Both branches run throughout/)).toBeVisible();
  const preview = speaker.frameLocator('iframe').first().locator('section.present .scene-root');
  await expect(preview.locator('[data-branch="A"] .amount')).toHaveText('1,000');
  await page.bringToFront();

  const travel = page.locator(`[id="${bankId}"] .scene-root [data-walk]`);
  await seek(page, 8.5);
  const initial = await travel.getAttribute('transform');
  await seek(page, 10);
  await expect(travel).not.toHaveAttribute('transform', initial!);
  await seek(page, 8.5);
  await expect(travel).toHaveAttribute('transform', initial!);
  await expect(preview.locator('[data-branch="A"] .amount')).toHaveText('1,000');
  await expect(preview.getByRole('button')).toHaveCount(0);
  await speaker.close();
});

test('bundled meme and print comparison render at the production routes', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  for (const id of ['03-why-distribute', '04-centralized-distributed-decentralized', '05-cap-theorem']) {
    await page.goto(`/talk/#/${id}`);
    await expect(page.locator('section.present')).toHaveAttribute('id', id);
    if (id === '05-cap-theorem') {
      const img = page.locator('section.present img');
      await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(600);
      await expect(img).toHaveAttribute('src', /\/assets\/3enly7-.*\.jpg$/);
      await expect(page.locator('section.present input')).toHaveCount(0);
    }
    if (browserName === 'firefox') await capture(page, 1920, 1080, id);
  }

  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  const sheet = page.locator(`.print-deck [id="${bankId}"]`);
  await expect(sheet.locator('[data-branch="A"] .amount')).toHaveText('0');
  await expect(sheet.locator('[data-branch="B"] .amount')).toHaveText('1,000');
  await expect(sheet.locator('[data-response="print"]')).toContainText('Wait for synchronization');
  await expect(sheet.locator('button')).toHaveCount(0);
  if (browserName === 'firefox') {
    await mkdir(`${directory}/1920x1080`, { recursive: true });
    await page.evaluate(() => document.fonts.ready);
    await sheet.screenshot({ path: `${directory}/1920x1080/06-print.png` });
  }
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`bank choices are clear of the panel at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    await openBank(page);
    await seek(page, choiceTime);
    const choices = page.locator('.bank-choices');
    await expect.poll(async () => {
      const choice = (await choices.boundingBox())!;
      const controls = (await page.locator('.presenter').boundingBox())!;
      return controls.y - choice.y - choice.height;
    }).toBeGreaterThan(0);
    if (browserName === 'firefox') {
      await page.keyboard.press('h');
      await capture(page, width, height, '06-choose-response');
    }
  });
}
