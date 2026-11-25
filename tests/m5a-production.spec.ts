import { mkdir } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { checkpoints, inquiryTime, duration, frameAt } from '../src/talk/m5a/bank-model';

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

test('the scripted counterfactual restarts at the identical pre-response state', () => {
  const [, , withdrawal, inquiry, stale, alternative, wait, reconnect] = checkpoints;
  expect(frameAt(withdrawal.time)).toMatchObject({ a: 0, b: 1000, cash: true, read: 'none' });
  const opening = frameAt(inquiry.time);
  expect(frameAt(alternative.time)).toEqual({
    ...opening, id: 'alternative', label: 'Alternative run', response: 'alternative',
  });
  expect(frameAt(stale.time)).toMatchObject({ a: 0, b: 1000, read: 'complete', returned: 1000 });
  const waiting = frameAt(wait.time);
  expect(waiting).toMatchObject({ a: 0, b: 1000, read: 'pending' });
  expect(waiting.returned).toBeUndefined();
  expect(frameAt(reconnect.time)).toMatchObject({ a: 0, b: 0, read: 'complete', returned: 0 });
});

test('playback pauses for prediction and runs both outcomes in order without a choice gate', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openBank(page);
  const scene = page.locator(`[id="${bankId}"] .scene-root`);
  const status = page.locator('.playback-state');
  const balances = scene.locator('[data-branch] .amount');
  const response = scene.locator('[data-response]');
  const frames: string[] = [];

  for (const [index, beat] of checkpoints.entries()) {
    if (beat.time === inquiryTime) {
      await seek(page, inquiryTime - .15);
      await page.keyboard.press('Space');
    } else if (index) {
      await page.keyboard.press('k');
    }
    await expect(status).toContainText(`· ${beat.label} · ${beat.time.toFixed(2)}`);
    await expect(scene.locator('button, input, select')).toHaveCount(0);
    if (beat.id === 'balance-inquiry') {
      await expect(status).toContainText('Paused');
      await expect(scene).toHaveAttribute('data-read', 'requested');
      await expect(response).toHaveCount(0);
    } else if (beat.id === 'outcome-stale') {
      await expect(scene).toHaveAttribute('data-returned', '1000');
      await expect(response).toContainText('Returned: 1,000 units');
      await expect(balances).toHaveText(['0', '1,000']);
    } else if (beat.id === 'alternative') {
      await expect(response).toContainText('Alternative run');
      await expect(scene.locator('svg')).toContainText('What’s my balance?');
      await expect(scene).toHaveAttribute('data-read', 'requested');
      await expect(scene).not.toHaveAttribute('data-returned');
      await expect(scene.locator('[data-link="partitioned"]')).toHaveCount(1);
      await expect(balances).toHaveText(['0', '1,000']);
    } else if (beat.id === 'outcome-wait') {
      await expect(scene).toHaveAttribute('data-read', 'pending');
      await expect(scene).not.toHaveAttribute('data-returned');
      await expect(response).toContainText('Read pending');
      await expect(balances).toHaveText(['0', '1,000']);
    } else if (beat.id === 'reconnect') {
      await expect(scene).toHaveAttribute('data-returned', '0');
      await expect(response).toContainText('Waiting read completes');
      await expect(balances).toHaveText(['0', '0']);
    }
    frames.push(await scene.innerHTML());
    if (browserName === 'firefox') await capture(page, 1920, 1080, `06-${beat.id}`);
  }

  for (let index = checkpoints.length - 2; index >= 0; index--) {
    await page.keyboard.press('j');
    expect(await scene.innerHTML()).toBe(frames[index]);
  }
  await seek(page, duration);
  expect(await scene.innerHTML()).toBe(frames[frames.length - 1]);
  await page.keyboard.press('Space');
  await expect(page.locator('section.present')).toHaveAttribute('id', bankId);
  await page.keyboard.press('r');
  expect(await scene.innerHTML()).toBe(frames[0]);

  const seekSlider = page.getByRole('slider', { name: 'Seek' });
  await seekSlider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(seekSlider).toBeFocused();
  await expect(page.locator('section.present')).toHaveAttribute('id', bankId);
  await page.locator('.reveal').focus();
  await seek(page, 19.9);
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await expect(scene).toBeEmpty();
  await expect(scene).not.toHaveAttribute('data-read');
  await page.keyboard.press('ArrowLeft');
  await expect(status).toContainText('Paused · Synced · 0.00');
  expect(await scene.innerHTML()).toBe(frames[0]);
});

test('bank travel is seekable and the notes receiver stays at the baseline', async ({ page, context, baseURL }) => {
  const external: string[] = [];
  const origin = new URL(baseURL!).origin;
  await context.route('**/*', (route) => {
    if (new URL(route.request().url()).origin === origin) return route.continue();
    external.push(route.request().url());
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    external.push(socket.url());
    void socket.close();
  });
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
  await seek(page, duration);
  await expect(preview.locator('[data-link="connected"]')).toHaveCount(1);
  await expect(preview.locator('[data-response]')).toHaveCount(0);
  await speaker.close();
  expect(external).toEqual([]);
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
  test(`scripted CAP cards clear the presenter panel at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    await openBank(page);
    for (const beat of checkpoints.slice(4)) {
      await seek(page, beat.time);
      const card = page.locator('section.present .scene-root [data-response]');
      await expect.poll(async () => {
        const box = (await card.boundingBox())!;
        const controls = (await page.locator('.presenter').boundingBox())!;
        return controls.y - box.y - box.height;
      }).toBeGreaterThan(0);
      if (browserName === 'firefox') await capture(page, width, height, `06-${beat.id}`);
    }
  });
}
