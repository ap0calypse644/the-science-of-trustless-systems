import { mkdir } from 'node:fs/promises';
import { expect, test, type Page } from '@playwright/test';
import { decide, four, localReports, three } from '../src/talk/m5b/model';
import { checkpoints } from '../src/talk/m5b/scene';

const id = '08-byzantine-generals';
const path = `/talk/#/${id}`;
const review = 'test-results/visual-review/m5b-production';

async function openSlide(page: Page): Promise<void> {
  await page.goto(path);
  await expect(page.locator('.playback-state')).toContainText('Paused · Opening');
}

async function seek(page: Page, time: number): Promise<void> {
  await page.getByRole('slider', { name: 'Seek' }).evaluate((slider: HTMLInputElement, target) => {
    slider.value = String(target);
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }, time);
}

async function capture(page: Page, dir: string, name: string): Promise<void> {
  await mkdir(dir, { recursive: true });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${dir}/${name}.png`,
    style: '.presenter { visibility: hidden; } .scene-root .talk-sheet { transform: none !important; }',
  });
}

test('fixed runs preserve sender paths and distinguish the tie from both four-general majorities', () => {
  const bob = localReports(three, 'Bob');
  expect(bob).toEqual([
    { path: ['Alice', 'Bob'], from: 'Alice', order: 'Attack' },
    { path: ['Alice', 'Mallory', 'Bob'], from: 'Mallory', order: 'Retreat' },
  ]);
  expect(decide(bob)).toMatchObject({ order: 'Retreat', tied: true, attack: 1, retreat: 1 });
  const fourBob = localReports(four, 'Bob');
  const fourCharlie = localReports(four, 'Charlie');
  expect(fourBob[1]).toMatchObject({ from: 'Charlie', order: 'Attack' });
  expect(fourCharlie[1]).toMatchObject({ from: 'Bob', order: 'Attack' });
  expect(fourCharlie[2]).toMatchObject({ from: 'Mallory', order: 'Attack' });
  expect(decide(fourBob)).toMatchObject({ order: 'Attack', votes: 2, total: 3 });
  expect(decide(fourCharlie)).toMatchObject({ order: 'Attack', votes: 3, total: 3 });
});

test('script progressively reveals both tables and restores every named beat on rewind', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openSlide(page);
  const scene = page.locator(`[id="${id}"] .scene-root`);
  const status = page.locator('.playback-state');
  await expect(scene.locator('.byz-subtitle')).toHaveCSS('text-align', 'center');
  const pictures = `${review}/1920x1080`;
  const art: string[] = [];

  for (const [index, beat] of checkpoints.entries()) {
    if (index) await page.keyboard.press('k');
    await expect(status).toContainText(beat.label);
    if (index === 1 || index === 2) {
      const local = scene.locator('[data-view="bob"]');
      await expect(scene.locator('[data-view]')).toHaveCount(1);
      await expect(local).toContainText(index === 1 ? 'Attack' : 'Retreat');
      await expect(scene.locator('table')).toHaveCount(0);
    }
    if (index >= 3 && index <= 5) {
      await expect(scene.locator('tbody tr')).toHaveCount(index === 3 ? 1 : 2);
      await expect(scene.locator('.byz-majority')).toHaveCount(index === 5 ? 1 : 0);
    }
    if (index === 6) {
      await expect(scene.locator('[data-actor="charlie"]')).toBeVisible();
      await expect(scene).toContainText('next run');
    }
    if (index >= 9) {
      await expect(scene.locator('tbody tr')).toHaveCount(Math.min(3, index - 8));
      await expect(scene.locator('tfoot')).toHaveCount(index === 12 ? 1 : 0);
    }
    art.push(await scene.innerHTML());
    if (browserName === 'firefox') await capture(page, pictures, `beat-${String(index + 1).padStart(2, '0')}`);
  }
  await expect(scene.locator('tfoot td')).toHaveText(['Attack · 2 of 3', 'Attack · 3 of 3']);
  await expect(scene.locator('button, select, input')).toHaveCount(0);
  for (let i = checkpoints.length - 2; i >= 0; i--) {
    await page.keyboard.press('j');
    expect(await scene.innerHTML()).toBe(art[i]);
  }

  for (const [time, name] of [[1, 'direct-in-flight'], [4.6, 'false-report-in-flight'],
    [17.5, 'charlie-in-motion'], [23.1, 'honest-forward-in-flight'],
    [25.8, 'conflicting-report-in-flight'], [26.6, 'different-reports-delivered']] as const) {
    await seek(page, time);
    const frame = await scene.innerHTML();
    await seek(page, 0);
    await seek(page, time);
    expect(await scene.innerHTML()).toBe(frame);
    if (browserName === 'firefox') await capture(page, pictures, name);
  }
  await page.keyboard.press('r');
  expect(await scene.innerHTML()).toBe(art[0]);
  await seek(page, 36);
  await page.keyboard.press('ArrowLeft');
  await expect(scene).toBeEmpty();
  await page.keyboard.press('ArrowRight');
  await expect(status).toContainText('Paused · Opening · 0.00');
  expect(await scene.innerHTML()).toBe(art[0]);
});

test('shared playback pauses at receipt and notes stay on the offline opening frame', async ({ page, context, baseURL }) => {
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
  context.on('requestfailed', (request) => external.push(request.url()));
  context.on('weberror', (error) => external.push(error.error().message));
  await openSlide(page);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/Mallory is a faulty general/)).toBeVisible();
  const preview = speaker.frameLocator('iframe').first().locator('section.present .scene-root');
  await expect(preview.locator('[data-depth="rear"]')).toBeVisible();
  await page.bringToFront();
  await seek(page, 1);
  const courier = page.locator('section.present .scene-root [data-moving-report]');
  const start = await courier.getAttribute('transform');
  await page.keyboard.press('Space');
  await expect(courier).not.toHaveAttribute('transform', start!);
  await expect(page.locator('.playback-state')).toContainText('Paused · Direct orders · 3.00');
  await expect(preview.locator('[data-view]')).toHaveCount(0);
  await expect(preview.locator('table')).toHaveCount(0);
  await speaker.close();
  expect(external).toEqual([]);
});

test('comparison fits smaller screens and prints both runs on one sheet', async ({ page, browserName }) => {
  await openSlide(page);
  await seek(page, 36);
  for (const [width, height] of [[1280, 720], [1024, 768]]) {
    await page.setViewportSize({ width, height });
    const comparison = page.locator('section.present .scene-root .four-reports');
    await expect.poll(async () => {
      const table = (await comparison.boundingBox())!;
      const bar = (await page.locator('.presenter').boundingBox())!;
      return bar.y - (table.y + table.height);
    }).toBeGreaterThan(0);
    if (browserName === 'firefox') await capture(page, `${review}/${width}x${height}`, 'four-general-comparison');
  }
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  const sheet = page.locator(`.print-deck [id="${id}"]`);
  await expect(sheet.locator('table')).toHaveCount(2);
  await expect(sheet.locator('.byz-majority')).toContainText('tie defaults to Retreat');
  await expect(sheet.locator('tfoot')).toContainText('Attack · 3 of 3');
  if (browserName === 'firefox') {
    await page.evaluate(() => document.fonts.ready);
    await mkdir(`${review}/1920x1080`, { recursive: true });
    await sheet.screenshot({ path: `${review}/1920x1080/print-comparison.png` });
  }
});
