import { expect, test, type Page } from '@playwright/test';

const ids = ['27-electricity-bill', '28-proof-of-stake', '29-stake-weighted-voting'];
const folder = 'test-results/visual-review/m5g-production';
const current = (page: Page) => page.locator('section.present');
const motion = (page: Page) => current(page).locator('.scene-root');
const status = (page: Page) => page.locator('.playback-state');

async function open(page: Page, index: number): Promise<void> {
  await page.goto(`/talk/#/${ids[index]}`);
  await expect(current(page)).toHaveAttribute('id', ids[index]);
}

async function seek(page: Page, time: number): Promise<void> {
  await page.getByRole('slider', { name: 'Seek' }).evaluate((slider: HTMLInputElement, value) => {
    slider.valueAsNumber = value;
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

for (const [index, id] of ids.entries()) {
  test(`${id} preserves the exact approved artwork at every hold`, async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/talk/m5g/');
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    const approved = await page.locator(`.slides > section[id^="${id.slice(0, 2)}-"]`).evaluateAll((nodes) =>
      nodes.map((node) => ({ id: node.id, markup: node.querySelector('.talk-sheet')!.outerHTML })));
    expect(approved).toHaveLength(index ? 4 : 1);
    await open(page, index);
    const sheet = current(page).locator('.talk-sheet:visible');
    for (const [beat, still] of approved.entries()) {
      if (beat) await page.keyboard.press('k');
      if (index) await expect(motion(page)).toHaveAttribute('data-m5g-frame', still.id);
      expect(await sheet.evaluate((node) => node.outerHTML)).toBe(still.markup);
      if (browserName === 'firefox') await capture(page, still.id);
    }
    if (!index) {
      await expect(current(page).locator('.scene-root')).toHaveCount(0);
      await expect(current(page).locator('.notes')).toContainText('Village Global, CC BY 2.0');
      return;
    }
    for (let beat = approved.length - 2; beat >= 0; beat--) {
      await page.keyboard.press('j');
      expect(await sheet.evaluate((node) => node.outerHTML)).toBe(approved[beat].markup);
    }
    await seek(page, index === 1 ? 8 : 15);
    await page.keyboard.press('r');
    expect(await sheet.evaluate((node) => node.outerHTML)).toBe(approved[0].markup);
  });
}

test('coins move before shackles settle and the label reveal follows the weights', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 1);
  await seek(page, 1.35);
  const scene = motion(page);
  const coin = scene.locator('.coin').first();
  await expect(coin).not.toHaveCSS('translate', /^0px( 0px)?$/);
  const intermediate = await scene.innerHTML();
  if (browserName === 'firefox') await capture(page, '28-coins-in-flight');
  await seek(page, 2.95);
  await expect(scene.locator('.lock > path:first-child').last()).not.toHaveCSS('translate', /^0px( 0px)?$/);
  if (browserName === 'firefox') await capture(page, '28-locks-closing');
  await seek(page, 1.35);
  expect(await scene.innerHTML()).toBe(intermediate);
  await seek(page, 6);
  await expect(scene.locator('.weight')).toHaveText(['35% voting power', '35% voting power', '30% voting power']);
  await expect(scene.locator('.stake-reveal')).toHaveCount(0);
});

test('proposal and votes travel between peers before local locking and independent commits', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 2);
  const scene = motion(page);
  await seek(page, .75);
  await expect(scene).toHaveAttribute('data-m5g-frame', 'motion-29-propose');
  const packet = scene.locator('[data-packet="alice-bob"]');
  const position = await packet.getAttribute('style');
  if (browserName === 'firefox') await capture(page, '29-proposal-in-flight');
  await seek(page, .95);
  expect(await packet.getAttribute('style')).not.toBe(position);
  await seek(page, 4);
  await expect(scene.locator('[data-vote="prevote"]')).toHaveCount(2);
  await expect(scene.locator('[data-packet^="charlie"]')).toHaveCount(0);
  await expect(scene.locator('[data-local-count]')).toHaveCount(0);
  if (browserName === 'firefox') await capture(page, '29-prevotes-in-flight');
  await seek(page, 6.7);
  const count = scene.locator('[data-local-count]');
  await expect(count).toHaveCount(2);
  await expect(count.first()).toHaveCSS('opacity', '1');
  await expect(scene.locator('[data-vote="precommit"]').first()).toHaveCSS('opacity', '0');
  await seek(page, 9.1);
  await expect(scene.locator('[data-vote="precommit"]').first()).toHaveCSS('opacity', '1');
  if (browserName === 'firefox') await capture(page, '29-precommits-in-flight');
  await seek(page, 11.8);
  const blocks = scene.locator('[data-committed-block="B"]');
  await expect(blocks.first()).toHaveCSS('opacity', '0');
  await expect(scene.locator('[data-count-type="precommit"]')).toHaveCount(2);
  await seek(page, 12.75);
  await expect(blocks.first()).not.toHaveCSS('opacity', '0');
  await expect(blocks.last()).toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '29-local-append');
  const append = await scene.innerHTML();
  await seek(page, 15);
  await seek(page, 12.75);
  expect(await scene.innerHTML()).toBe(append);
});

test('offline speaker baseline, presenter playback, rapid navigation and print', async ({ page, context, baseURL, browserName }) => {
  const origin = new URL(baseURL!).origin;
  const attempts: string[] = [];
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (new URL(url).origin === origin) return route.continue();
    attempts.push(url);
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    attempts.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => attempts.push(error.error().message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 1);
  await expect(status(page)).toContainText('Paused · Coins · 0.00');
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/Disclose the authored amounts/)).toBeVisible();
  const baseline = speaker.frameLocator('iframe').first().locator('section.present .scene-root');
  await expect(baseline).toHaveAttribute('data-m5g-frame', '28-coins');
  await page.bringToFront();
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).not.toHaveText('1×');
  await seek(page, 3.7);
  await page.keyboard.press('Space');
  await expect(status(page)).toContainText('Paused · Bonded · 4.00');
  await expect(baseline).toHaveAttribute('data-m5g-frame', '28-coins');
  await speaker.close();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowRight');
  await expect(status(page)).toContainText('Paused · Propose · 0.00');
  await expect(page.locator('[id="28-proof-of-stake"] .scene-root')).toBeEmpty();
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.print-deck .talk-sheet')).toHaveCount(32);
  for (const [index, id] of ids.entries()) {
    const sheet = page.locator(`[id="${id}"] .talk-sheet`);
    await expect(sheet).toContainText(['$ 4972', 'Proof of Stake', 'matching precommits'][index]);
    const bounds = (await sheet.boundingBox())!;
    expect(bounds.width / bounds.height).toBeCloseTo(16 / 9);
    if (browserName === 'firefox') {
      await page.evaluate(() => document.fonts.ready);
      await sheet.screenshot({ path: `${folder}/1920x1080/${id}-print.png` });
    }
  }
  expect(attempts).toEqual([]);
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`production holds fit at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    for (const [index, id] of ids.entries()) {
      await open(page, index);
      if (index) await seek(page, index === 1 ? 8 : 15);
      const bounds = (await current(page).locator('.talk-sheet:visible').boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width + 1);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(height + 1);
      if (browserName === 'firefox') await capture(page, `${id}-evidence`);
    }
  });
}
