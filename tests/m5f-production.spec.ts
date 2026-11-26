import { expect, test, type Page } from '@playwright/test';
import { initialTrials, input, meetsTarget, original, rewrite } from '../src/talk/m5f/fixtures';

const ids = ['22-expensive-history', '23-which-history', '24-mining-work', '25-rewarding-miner', '26-bitcoin-reveal'];
const folder = 'test-results/visual-review/m5f-production';
const content = (page: Page) => page.locator('section.present .scene-root');
const status = (page: Page) => page.locator('.playback-state');
const revealSelector = '[data-bitcoin-logo], .reveal-first, .reveal-last';

async function open(page: Page, index: number): Promise<void> {
  await page.goto(`/talk/#/${ids[index]}`);
  await expect(page.locator('section.present')).toHaveAttribute('id', ids[index]);
  await expect(status(page)).toContainText('Paused');
}

async function seek(page: Page, time: number): Promise<void> {
  await page.getByRole('slider', { name: 'Seek' }).evaluate((slider: HTMLInputElement, seconds) => {
    slider.valueAsNumber = seconds;
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }, time);
  await expect(status(page)).toContainText(`· ${time.toFixed(2)} /`);
}

async function capture(page: Page, name: string): Promise<void> {
  const { width, height } = page.viewportSize()!;
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${folder}/${width}x${height}/${name}.png`,
    style: '.presenter { visibility: hidden; } .scene-root .talk-sheet { transform: none !important; }' });
}

test('each authored initial mine and repair uses fixed distinct inputs and a successful predecessor', () => {
  const variants = [...initialTrials.flat(), ...rewrite.flat()];
  expect(new Set(variants.map(input)).size).toBe(variants.length);
  expect(new Set(variants.map(({ digest }) => digest)).size).toBe(variants.length);
  for (const chain of [initialTrials, rewrite]) {
    for (const [index, attempts] of chain.entries()) {
      const previous = index === 0 ? null : chain[index - 1].at(-1)!.digest!;
      expect(attempts.every((entry) => entry.previous === previous)).toBe(true);
      expect(attempts.map(({ digest }) => meetsTarget(digest))).toEqual([
        ...attempts.slice(1).map(() => false), true,
      ]);
    }
  }
});

for (const [index, id] of ids.entries()) {
  test(`${id} preserves its approved holds on forward step, backward step and reset`, async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/talk/m5f/');
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    const holds = await page.locator(`.slides > section[id^="${id.slice(0, 2)}-"]`).evaluateAll((sections) =>
      sections.map((section) => ({ id: section.id, composition: section.querySelector('.talk-sheet')!.outerHTML })));
    expect(holds).toHaveLength([8, 9, 5, 7, 3][index]);
    await open(page, index);
    const frames: string[] = [];
    for (const [i, hold] of holds.entries()) {
      if (i) await page.keyboard.press('k');
      await expect(content(page)).toHaveAttribute('data-m5f-frame', hold.id);
      const sheet = content(page).locator('.talk-sheet');
      expect(await sheet.evaluate((node) => node.outerHTML)).toBe(hold.composition);
      frames.push(await content(page).innerHTML());
      if (index < 4) {
        await expect(content(page)).not.toContainText(/Bitcoin|illustrative example|fixed data/i);
        await expect(content(page).locator(revealSelector)).toHaveCount(0);
      }
      if (browserName === 'firefox') await capture(page, hold.id);
    }
    await page.keyboard.press('Space');
    await expect(page.locator('section.present')).toHaveAttribute('id', ids[index]);
    for (let i = holds.length - 2; i >= 0; i--) {
      await page.keyboard.press('j');
      expect(await content(page).innerHTML()).toBe(frames[i]);
    }
    await seek(page, +(await page.getByRole('slider', { name: 'Seek' }).getAttribute('max'))!);
    expect(await content(page).innerHTML()).toBe(frames.at(-1));
    await page.keyboard.press('r');
    expect(await content(page).innerHTML()).toBe(frames[0]);
  });
}

test('initial mining and repair actually pass through every block and preserve digest order', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 0);
  const scene = content(page);
  await seek(page, 6.4);
  await expect(scene).toHaveAttribute('data-m5f-frame', '22-original-2-1-false');
  await expect(scene.locator('[data-block="2"] .previous')).toHaveText(`Prev ${original[0].digest}`);
  await expect(scene.locator('[data-block="2"] .own-hash')).toHaveText(/Hash bd382e ×/);
  await seek(page, 8.35);
  const flight = scene.locator('[data-digest-flight]');
  await expect(flight).toContainText(original[1].digest!);
  await expect(scene.locator('[data-block="3"] .nonce')).toHaveText('Nonce —');
  const moving = await flight.getAttribute('style');
  await seek(page, 8.55);
  await expect(flight).not.toHaveAttribute('style', moving!);
  if (browserName === 'firefox') await capture(page, '22-parent-digest-in-flight');
  await seek(page, 9.2);
  await expect(scene.locator('[data-block="3"] .previous')).toHaveText(`Prev ${original[1].digest}`);
  await expect(scene.locator('[data-block="3"] .own-hash')).toHaveText(/ae716d ×/);
  await seek(page, 12.15);
  await expect(scene.locator('[data-block="4"] .own-hash')).toHaveText(/39c8b4 ×/);
  for (const [time, frame, mismatch] of [
    [24.8, '22-repair-2-try-3', 1], [27.3, '22-repair-3-try-1', 1],
    [28.7, '22-repair-3-try-2', 1], [31, '22-repair-4-try-1', 0],
  ] as const) {
    await seek(page, time);
    await expect(scene).toHaveAttribute('data-m5f-frame', frame);
    await expect(scene.locator('[data-link="mismatch"]')).toHaveCount(mismatch);
    if (browserName === 'firefox') await capture(page, frame);
  }
  await seek(page, 33.5);
  await expect(scene.locator('.warning-label')).toContainText('lacks authorization');
});

test('race tiles arrive individually and the growing pile settles deterministically before the flag and title', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 1);
  await seek(page, .66);
  await expect(content(page).locator('[data-race-signature]')).toHaveCount(2);
  if (browserName === 'firefox') await capture(page, '23-separate-signatures');
  await seek(page, 11.7);
  await expect(content(page)).toHaveAttribute('data-m5f-frame', '23-growing-5-3');
  const arrival = content(page).locator('[data-race-block]').last();
  const first = await arrival.getAttribute('style');
  if (browserName === 'firefox') await capture(page, '23-block-arrival');
  await seek(page, 11.8);
  await expect(arrival).not.toHaveAttribute('style', first!);
  await seek(page, 14.8);
  await expect(content(page)).toContainText('6 confirmations');
  await open(page, 2);
  await seek(page, 11);
  const pile = content(page);
  await expect(pile.locator('[data-workstation]')).toHaveCount(1);
  await expect(pile.locator('[data-box]')).toHaveCount(240);
  const falling = await pile.innerHTML();
  if (browserName === 'firefox') await capture(page, '24-boxes-in-flight');
  await seek(page, 11.6);
  expect(await pile.innerHTML()).not.toBe(falling);
  await seek(page, 11);
  expect(await pile.innerHTML()).toBe(falling);
  await seek(page, 14.7);
  await expect(pile.locator('[data-flag]')).toHaveCSS('opacity', '0');
  await expect(pile.locator('h1')).toHaveCSS('opacity', '0');
  await seek(page, 17.2);
  await expect(pile.locator('[data-flag]')).toHaveCSS('opacity', '1');
  await expect(pile.locator('h1')).toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '24-flag-before-title');
  await seek(page, 19);
  await expect(pile.locator('[data-flag]')).not.toHaveAttribute('transform');
  const mountain = await pile.locator('[data-mountain]').innerHTML();
  await page.keyboard.press('ArrowRight');
  expect(await content(page).locator('[data-mountain]').innerHTML()).toBe(mountain);
});

test('reward checks precede coins and the logo settles before each separate line', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 3);
  const scene = content(page);
  await seek(page, 4.1);
  await expect(scene.locator('.tx:not(.subsidy)').first()).toHaveCSS('translate', /^0px( 0px)?$/);
  if (browserName === 'firefox') await capture(page, '25-reward-row-arrival');
  await seek(page, 5);
  await expect(scene.locator('.subsidy')).toHaveText('Create 10 units → Alice');
  await expect(scene.locator('.nonce')).toHaveText('Nonce —');
  await seek(page, 7.1);
  await expect(scene.locator('.own-hash')).toHaveText('Hash b5a30e ×');
  if (browserName === 'firefox') await capture(page, '25-reward-committed-miss');
  await seek(page, 11.7);
  await expect(scene.locator('[data-rule-check]').last()).toHaveCSS('opacity', '1');
  await expect(scene.locator('.coin')).toHaveCount(0);
  if (browserName === 'firefox') await capture(page, '25-independent-checks');
  await seek(page, 12.3);
  await expect(scene).toContainText(/Block accepted/);
  await expect(scene.locator('.coin').first()).toHaveCSS('opacity', '0');
  await seek(page, 15.9);
  if (browserName === 'firefox') await capture(page, '25-flag-toss');
  await seek(page, 20.7);
  await expect(scene).toContainText('20 units earned');
  await seek(page, 23.2);
  await expect(scene.locator('.coin')).toHaveCount(30);
  await open(page, 4);
  await seek(page, .65);
  await expect(scene.locator('[data-bitcoin-logo]')).toHaveAttribute('transform', /rotate\(-/);
  await expect(scene.locator('.reveal-first')).toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '26-mark-settling');
  await seek(page, 1.65);
  await expect(scene.locator('[data-bitcoin-logo]')).toHaveAttribute('transform', /rotate\(0\)/);
  await expect(scene.locator('.reveal-last')).toHaveCount(0);
  await seek(page, 2.3);
  await expect(scene.locator('.reveal-last')).toHaveCSS('opacity', '0');
  await seek(page, 3.8);
  await expect(scene.locator('.reveal-last')).toHaveText('You’ve invented Bitcoin.');
});

test('production works offline with baseline notes, speed, checkpoint pause and rapid teardown', async ({ page, context, baseURL }) => {
  const failures: string[] = [];
  const origin = new URL(baseURL!).origin;
  await context.route('**/*', (route) => {
    if (new URL(route.request().url()).origin === origin) return route.continue();
    failures.push(route.request().url());
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    failures.push(socket.url());
    void socket.close();
  });
  context.on('weberror', ({ error }) => failures.push(error().message));
  await open(page, 0);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/authored teaching examples/)).toBeVisible();
  const preview = speaker.frameLocator('iframe').first().locator('section.present .scene-root');
  await expect(preview).toHaveAttribute('data-m5f-frame', '22-linked-history');
  await page.bringToFront();
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).not.toHaveText('1×');
  await seek(page, 2.1);
  await page.keyboard.press('Space');
  await expect(status(page)).toContainText('Paused · Nonce target · 2.40');
  await expect(content(page)).toHaveAttribute('data-m5f-frame', '22-nonce-target');
  await expect(preview).toHaveAttribute('data-m5f-frame', '22-linked-history');
  await speaker.close();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[id="22-expensive-history"] .scene-root')).toBeEmpty();
  await expect(status(page)).toContainText('Neat stack · 0.00');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(status(page)).toContainText('Linked history · 0.00');
  await open(page, 4);
  await seek(page, 3.8);
  expect(failures).toEqual([]);
});

test('all 29 print sheets render and the five M5f compositions preserve the teaching evidence', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.print-deck .talk-sheet')).toHaveCount(29);
  const evidence = ['Edited payment lacks authorization', 'cumulative work', 'Why Would Anybody',
    'Independently validated', 'You’ve invented Bitcoin'];
  for (const [index, id] of ids.entries()) {
    const sheet = page.locator(`section[id="${id}"] .mining-sheet`);
    await expect(sheet).toContainText(evidence[index]);
    if (index < 4) {
      await expect(sheet).not.toContainText(/Bitcoin/i);
      await expect(sheet.locator(revealSelector)).toHaveCount(0);
    }
    const bounds = (await sheet.boundingBox())!;
    expect(bounds.width / bounds.height).toBeCloseTo(16 / 9);
    if (browserName === 'firefox') {
      await page.evaluate(() => document.fonts.ready);
      await sheet.screenshot({ path: `${folder}/1920x1080/${id}-print.png` });
    }
  }
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`production evidence fits at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    for (const [index, time] of [23.5, 14.8, 19, 12, 3.8].entries()) {
      await open(page, index);
      await seek(page, time);
      const art = content(page).locator('.art');
      const bounds = await art.evaluate((svg: SVGSVGElement) => {
        const box = svg.getBBox();
        const matrix = svg.getScreenCTM()!;
        return [new DOMPoint(box.x, box.y).matrixTransform(matrix),
          new DOMPoint(box.x + box.width, box.y + box.height).matrixTransform(matrix)].map(({ x, y }) => ({ x, y }));
      });
      const controls = (await page.locator('.presenter').boundingBox())!;
      expect(bounds[0].x).toBeGreaterThanOrEqual(0);
      expect(bounds[0].y).toBeGreaterThanOrEqual(0);
      expect(bounds[1].x).toBeLessThanOrEqual(width);
      expect(bounds[1].y).toBeLessThan(controls.y);
      if (browserName === 'firefox') await capture(page, `${ids[index]}-evidence`);
    }
  });
}
