import { expect, test, type Page } from '@playwright/test';
import { cafeOpening, genuine, history } from '../src/talk/m5c/ledger-model';

const prefix = 'test-results/visual-review/m5c-production';
const scenes = [
  { id: '09-shared-ledger', labels: ['Café setup', 'Receipt chaos', 'Alice’s idea', 'Notebook reveal'] },
  { id: '10-unauthorized-transactions', labels: ['Notebook open', 'Unsigned entry', 'Bob objects', 'Bob writes and signs', 'Authorization contrast'] },
  { id: '12-who-controls-the-ledger', labels: ['One shared notebook', 'Missing notebook', 'Access monopoly', 'Replicated copies'] },
  { id: '13-double-spend-problem', labels: ['Fresh balance', 'Two signatures', 'Local acceptance', 'Battlefield reveal'] },
];
const still = '11-infinite-money-glitch';
const current = (page: Page) => page.locator('section.present');
const art = (page: Page) => current(page).locator('.scene-root');
const status = (page: Page) => page.locator('.playback-state');
const link = (id: string) => `/talk/#/${id}`;

async function open(page: Page, id: string): Promise<void> {
  await page.goto(link(id));
  await expect(current(page)).toHaveAttribute('id', id);
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
}

async function seek(page: Page, time: number): Promise<void> {
  await page.getByRole('slider', { name: 'Seek' }).evaluate((slider: HTMLInputElement, target) => {
    slider.value = String(target);
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  }, time);
  await expect(status(page)).toContainText(`· ${time.toFixed(2)} /`);
}

async function capture(page: Page, name: string): Promise<void> {
  const { width, height } = page.viewportSize()!;
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${prefix}/${width}x${height}/${name}.png`,
    style: '.presenter { visibility: hidden; } .scene-root .talk-sheet { transform: none !important; }',
  });
}

test('the toy ledger rejects a replay without debiting Bob again', () => {
  const result = history(cafeOpening, [genuine, genuine]);
  expect(result.accepted).toEqual([genuine]);
  expect(result.rejected).toEqual([{ payment: genuine, reason: 'Already recorded' }]);
  expect(result.balances).toEqual({ Alice: 10, Bob: 20, Charlie: 5 });
});

for (const { id, labels } of scenes) {
  test(`${id} checkpoints are repeatable when stepping and replaying`, async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await open(page, id);
    await expect(status(page)).toContainText(`Paused · ${labels[0]} · 0.00`);
    const frames: string[] = [];
    for (const [index, label] of labels.entries()) {
      if (index) await page.keyboard.press('k');
      await expect(status(page)).toContainText(`· ${label} ·`);
      frames.push(await art(page).innerHTML());
      if (browserName === 'firefox') await capture(page, `${id.slice(0, 2)}-beat-${index + 1}`);
    }
    await page.keyboard.press('Space');
    await expect(current(page)).toHaveAttribute('id', id);
    for (let index = labels.length - 2; index >= 0; index--) {
      await page.keyboard.press('j');
      await expect(status(page)).toContainText(`· ${labels[index]} ·`);
      expect(await art(page).innerHTML()).toBe(frames[index]);
    }
    await page.keyboard.press('k');
    await page.keyboard.press('r');
    expect(await art(page).innerHTML()).toBe(frames[0]);
  });
}

test('receipts, writing, carried notebook and copies move at intermediate times', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  const cases = [
    { index: 0, time: 1.2, next: 2.5, selector: '[data-prop="receipt"]', attr: 'transform', name: '09-receipts-in-motion' },
    { index: 1, time: .95, next: 1.8, selector: '.entry', attr: 'style', name: '10-writing-fake' },
    { index: 1, time: 7.65, next: 8, selector: '.signature', attr: 'style', name: '10-signing' },
    { index: 2, time: 1, next: 2, selector: '[data-prop="closed-notebook"]', attr: 'transform', name: '12-carrying-notebook' },
    { index: 2, time: 7, next: 8, selector: '[data-prop="blue-notebook"]', attr: 'transform', name: '12-copying' },
    { index: 3, time: 4, next: 5, selector: '[data-payment-in-flight]', attr: 'transform', name: '13-payment-flight' },
  ];
  for (const { index, time, next, selector, attr, name } of cases) {
    await open(page, scenes[index].id);
    await seek(page, time);
    const node = art(page).locator(selector).first();
    const before = await node.getAttribute(attr);
    expect(before).toBeTruthy();
    await seek(page, next);
    await expect(node).not.toHaveAttribute(attr, before!);
    await seek(page, time);
    await expect(node).toHaveAttribute(attr, before!);
    if (browserName === 'firefox') await capture(page, name);
  }
});

test('folding pages change geometry continuously at fixed anchors and reveal the title only at the battlefield', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, scenes[3].id);
  await seek(page, 6);
  await expect(art(page).locator('[data-prop="blue-notebook"] .entry')).toHaveText([
    'Charlie pays Alice 20', 'Charlie pays Bob 20',
  ]);
  const root = art(page);
  const anchors = root.locator('[data-morph-book]');
  const pageShape = root.locator('[data-fold="left"]').first();
  const heading = root.locator('h1');
  await seek(page, 8.2);
  const shape = await pageShape.getAttribute('d');
  const terrain = await root.locator('[data-rise="castle"]').getAttribute('transform');
  await expect(anchors.nth(0)).toHaveAttribute('transform', /^translate\(406 /);
  await expect(anchors.nth(1)).toHaveAttribute('transform', /^translate\(1194 /);
  await seek(page, 9.45);
  await expect(pageShape).not.toHaveAttribute('d', shape!);
  await expect(root.locator('[data-rise="castle"]')).not.toHaveAttribute('transform', terrain!);
  await expect(heading).toHaveText('The Double-Spend Problem');
  if (browserName === 'firefox') await capture(page, '13-folding-pages');
  await seek(page, 10.99);
  await expect(heading).toHaveText('The Double-Spend Problem');
  await seek(page, 11);
  await expect(heading).toHaveText('We Are Back to the Generals');
  await expect(root.locator('[data-morph-book] .prop.yellow')).toHaveCount(2);
  await expect(root.locator('[data-morph-cafe]')).toHaveAttribute('opacity', '0');
  await seek(page, 8.2);
  await expect(pageShape).toHaveAttribute('d', shape!);
  await expect(heading).toHaveText('The Double-Spend Problem');
});

test('offline playback pauses on the next beat and notes retain the baseline while navigation disposes scenes', async ({ page, context, baseURL }) => {
  const blocked: string[] = [];
  const origin = new URL(baseURL!).origin;
  await context.route('**/*', (route) => {
    if (new URL(route.request().url()).origin === origin) return route.continue();
    blocked.push(route.request().url());
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    blocked.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => blocked.push(error.error().message));
  context.on('requestfailed', (request) => blocked.push(request.url()));
  const id = scenes[3].id;
  await open(page, id);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/globally unsettled/)).toBeVisible();
  const preview = speaker.frameLocator('iframe').first().locator('section.present');
  await expect(preview).toHaveAttribute('id', id);
  await page.bringToFront();
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).not.toHaveText('1×');
  await page.keyboard.press('h');
  await expect(page.locator('#playback-panel')).toBeHidden();
  await page.keyboard.press('h');
  await seek(page, 2.8);
  await page.keyboard.press('Space');
  await expect(status(page)).toContainText('Paused · Two signatures · 3.00');
  await seek(page, 11);
  await expect(art(page).locator('h1')).toHaveText('We Are Back to the Generals');
  await expect(preview.locator('h1:visible')).toHaveText('The Double-Spend Problem');
  await expect(preview.locator('.scene-root')).toContainText('Fresh toy run');
  await speaker.close();

  const oldScene = page.locator(`section[id="${id}"] .scene-root`);
  await seek(page, 8);
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(current(page)).toHaveAttribute('id', still);
  await expect(oldScene).toBeEmpty();
  await expect(page.locator('.presenter')).toBeHidden();
  await page.keyboard.press('Space');
  await expect(current(page)).toHaveAttribute('id', still);
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(status(page)).toContainText('Paused · Fresh balance · 0.00');
  await expect(art(page).locator('[data-morph-book]')).toHaveCount(0);
  expect(blocked).toEqual([]);
});

test('static slide, print evidence and representative smaller layouts are readable', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, still);
  await expect(current(page).locator('.art')).toContainText('Toy payment · 500 units');
  await expect(current(page).locator('.art')).toContainText('Signed · rejected · balance 5');
  await expect(page.locator('.presenter')).toBeHidden();
  if (browserName === 'firefox') await capture(page, '11-static');

  await page.goto('/talk/?print');
  const print = page.locator('.print-deck');
  await expect(print.locator('section')).toHaveCount(21);
  const evidence = ['Café IOUs', 'Bob pays Alice 10', 'Signed · rejected · balance 5', 'Signature checked', 'Bob’s local history'];
  for (const [index, id] of [scenes[0].id, scenes[1].id, still, scenes[2].id, scenes[3].id].entries()) {
    await expect(print.locator(`section[id="${id}"]`)).toContainText(evidence[index]);
  }
  for (const [width, height] of [[1280, 720], [1024, 768]]) {
    await page.setViewportSize({ width, height });
    await open(page, scenes[3].id);
    for (const [time, name] of [[6, 'local-acceptance'], [9.45, 'folding-pages'], [11, 'battlefield']] as const) {
      await seek(page, time);
      const evidence = time === 6
        ? art(page).locator('[data-prop="blue-notebook"]')
        : art(page).locator('[data-morph-generals] [data-character="charlie"], [data-morph-book]');
      const heading = (await art(page).locator('h1').boundingBox())!;
      const controls = (await page.locator('.presenter').boundingBox())!;
      expect(heading.x).toBeGreaterThanOrEqual(0);
      expect(heading.x + heading.width).toBeLessThanOrEqual(width);
      for (const item of await evidence.all()) {
        const box = (await item.boundingBox())!;
        expect(box.y + box.height).toBeLessThanOrEqual(controls.y);
      }
      if (browserName === 'firefox') await capture(page, `13-${name}`);
    }
  }
});
