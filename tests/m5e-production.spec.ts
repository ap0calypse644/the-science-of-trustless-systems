import { expect, test, type Page } from '@playwright/test';
import { linked, pages, repaired, transaction } from '../src/talk/m5e/fixtures';
import { m5eCheckpoints } from '../src/talk/m5e/production';

const ids = ['18-growing-ledger', '19-pages-to-blocks', '20-changing-history', '21-conflicting-histories'];
const folder = 'test-results/visual-review/m5e-production';
const content = (page: Page) => page.locator('section.present .scene-root');
const status = (page: Page) => page.locator('.playback-state');

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
  await page.screenshot({
    path: `${folder}/${width}x${height}/${name}.png`,
    style: '.presenter { visibility: hidden; } .scene-root .talk-sheet { transform: none !important; }',
  });
}

const absent = /illustrative example|fixed data|Each candidate fits the common tip|Which history do we believe\?/i;

for (const [index, checkpoints] of m5eCheckpoints.entries()) {
  test(`${ids[index]} repeats each hold on forward steps, backward steps and exact seek`, async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await open(page, index);
    const frames: string[] = [];
    for (const [i, checkpoint] of checkpoints.entries()) {
      if (i) await page.keyboard.press('k');
      await expect(status(page)).toContainText(`· ${checkpoint.label} ·`);
      await expect(content(page)).toHaveAttribute('data-m5e-frame', `hold-${checkpoint.still.id}`);
      await expect(content(page)).not.toContainText(absent);
      await expect(content(page).locator('button, input, select')).toHaveCount(0);
      await expect(page.locator('section.present .notes')).toContainText('authored teaching examples');
      frames.push(await content(page).innerHTML());
      if (browserName === 'firefox') await capture(page, checkpoint.still.id);
    }
    await page.keyboard.press('Space');
    await expect(page.locator('section.present')).toHaveAttribute('id', ids[index]);
    for (let i = checkpoints.length - 2; i >= 0; i--) {
      await page.keyboard.press('j');
      expect(await content(page).innerHTML()).toBe(frames[i]);
    }
    await seek(page, checkpoints[checkpoints.length - 1].time);
    expect(await content(page).innerHTML()).toBe(frames[frames.length - 1]);
    await page.keyboard.press('r');
    expect(await content(page).innerHTML()).toBe(frames[0]);
  });
}

test('the same paper lengthens while rows remain ordered and its end unfurls', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 0);
  const outline = content(page).locator('[data-ledger-list] > .paper');
  const initial = await outline.getAttribute('d');
  await seek(page, 1.25);
  await expect(outline).not.toHaveAttribute('d', initial!);
  const mid = await content(page).innerHTML();
  await seek(page, 3);
  await seek(page, 1.25);
  expect(await content(page).innerHTML()).toBe(mid);
  await seek(page, 9.65);
  await expect(outline).toHaveAttribute('d', /L\d{4}/);
  await expect(content(page).locator('.paper-grip')).toBeVisible();
  if (browserName === 'firefox') await capture(page, '18-paper-in-motion');
  await seek(page, 10);
  await expect(content(page).locator('[data-ledger-list] .tx')).toHaveText(
    pages.flatMap(({ rows }) => rows).slice(0, 8).map(transaction),
  );
});

test('pages turn and fold before the title changes, and the block handoff is exact', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 1);
  const heading = content(page).locator('h1');
  await seek(page, 4.9);
  await expect(content(page).locator('[data-page="3"]')).toBeVisible();
  await seek(page, 6.2);
  await expect(content(page).locator('[data-page="4"]')).toBeVisible();
  for (const time of [3, 9, 12, 14.25, 16.99]) {
    await seek(page, time);
    await expect(heading).toHaveText('The Growing Ledger');
  }
  await seek(page, 14.25);
  const paper = content(page).locator('[data-fold-page] .paper').first();
  const fold = await paper.getAttribute('d');
  if (browserName === 'firefox') await capture(page, '19-pages-folding');
  await seek(page, 14.85);
  await expect(paper).not.toHaveAttribute('d', fold!);
  await seek(page, 14.25);
  await expect(paper).toHaveAttribute('d', fold!);
  await seek(page, 17);
  await expect(heading).toHaveText('From Pages to Blocks');
  await expect(content(page).locator('[data-block] .tx')).toHaveText(pages.flatMap(({ rows }) => rows.map(transaction)));
  const composition = await content(page).locator('[data-independent-composition]').innerHTML();
  await page.keyboard.press('ArrowRight');
  await expect(status(page)).toContainText('Paused · Independent blocks · 0.00');
  expect(await content(page).locator('[data-independent-composition]').innerHTML()).toBe(composition);
});

test('predecessor references arrive in order and the immediate mismatch moves after repair', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 2);
  await seek(page, 9.2);
  const reference = content(page).locator('[data-block="2"] .previous');
  await expect(reference).toHaveText(linked[0].digest!);
  const inFlight = await reference.getAttribute('style');
  await seek(page, 9.6);
  await expect(reference).not.toHaveAttribute('style', inFlight!);
  if (browserName === 'firefox') await capture(page, '20-reference-in-flight');
  await seek(page, 11);
  await expect(reference).toHaveText(`Prev ${linked[0].digest}`);
  await expect(content(page).locator('[data-link]')).toHaveCount(1);
  await seek(page, 14.3);
  await expect(content(page).locator('[data-block="3"] .previous')).toHaveText(`Prev ${linked[1].digest}`);
  await expect(content(page).locator('[data-block="4"] .previous')).toHaveCSS('opacity', '0');
  await expect(content(page).locator('.question')).toHaveCSS('opacity', '0');
  await seek(page, 17);
  await expect(content(page).getByText('Blockchain', { exact: true })).toBeVisible();
  for (const [time, states] of [
    [21, ['mismatch', 'match', 'match']], [25, ['match', 'unchecked', 'match']], [29, ['match', 'mismatch', 'match']],
  ] as const) {
    await seek(page, time);
    expect(await content(page).locator('[data-link]').evaluateAll((links) =>
      links.map((link) => link.getAttribute('data-link')))).toEqual(states);
    if (time >= 25) await expect(content(page).locator('[data-block="2"] .own-hash')).toHaveText(`Hash ${repaired[1].digest}`);
  }
});

test('separate payments and bubbles lead into one common prefix without choosing a winner', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 3);
  await seek(page, 2.2);
  const payment = content(page).locator('[data-payment-card]').first();
  const first = await payment.getAttribute('style');
  await seek(page, 2.55);
  await expect(payment).not.toHaveAttribute('style', first!);
  await seek(page, 12);
  await expect(content(page).locator('[data-speech="alice"]')).toHaveText('I saw mine first.');
  await expect(content(page).locator('[data-speech="bob"]')).toHaveText('So did I.');
  await seek(page, 14.3);
  const duplicate = content(page).locator('[data-second-prefix] [data-block]');
  await expect(duplicate).toHaveCount(3);
  const transform = await duplicate.first().getAttribute('style');
  if (browserName === 'firefox') await capture(page, '21-common-prefix-merging');
  await seek(page, 14.8);
  await expect(duplicate.first()).not.toHaveAttribute('style', transform!);
  await seek(page, 17);
  await expect(content(page).locator('[data-block]')).toHaveCount(5);
  await expect(content(page).locator('[data-block="4"] .previous')).toHaveText(['Prev b3427d', 'Prev b3427d']);
  await expect(content(page)).not.toContainText(absent);
  await expect(page.locator('section.present .notes')).toContainText('Which history do we believe?');
});

test('ordinary offline controls pause, keep a baseline preview and clean up on rapid navigation', async ({ page, context, baseURL }) => {
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
  context.on('weberror', (error) => external.push(error.error().message));
  await open(page, 0);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/authored teaching examples/)).toBeVisible();
  const preview = speaker.frameLocator('iframe').first().locator('section.present .scene-root');
  await expect(preview.locator('.tx')).toHaveCount(2);
  await page.bringToFront();
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).not.toHaveText('1×');
  await page.keyboard.press('h');
  await expect(page.locator('#playback-panel')).toBeHidden();
  await page.keyboard.press('h');
  await seek(page, 2.8);
  await page.keyboard.press('Space');
  await expect(status(page)).toContainText('Paused · Growing list · 3.00');
  await expect(preview.locator('.tx')).toHaveCount(2);
  await speaker.close();

  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator(`[id="${ids[0]}"] .scene-root`)).toBeEmpty();
  await expect(status(page)).toContainText('Paused · Independent blocks · 0.00');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(status(page)).toContainText('Paused · Short list · 0.00');
  expect(external).toEqual([]);
});

test('four print sheets contain the evidence without explanatory boilerplate', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  const evidence = ['The same ledger keeps growing', 'Page 4', 'Block 3 still points to its old hash', 'Alice’s candidate'];
  for (const [index, id] of ids.entries()) {
    const sheet = page.locator(`section[id="${id}"] .history-sheet`);
    await expect(sheet).toContainText(evidence[index]);
    await expect(sheet).not.toContainText(absent);
    const bounds = (await sheet.boundingBox())!;
    expect(bounds.width / bounds.height).toBeCloseTo(16 / 9);
    if (browserName === 'firefox') {
      await page.evaluate(() => document.fonts.ready);
      await sheet.screenshot({ path: `${folder}/1920x1080/${id}-print.png` });
    }
  }
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`production evidence clears presenter controls at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    for (const [index, time] of [10, 17, 29, 17].entries()) {
      await open(page, index);
      await seek(page, time);
      const art = content(page).locator('.art');
      const { left, top, right, bottom } = await art.evaluate((svg: SVGSVGElement) => {
        const box = svg.getBBox();
        const matrix = svg.getScreenCTM()!;
        const first = new DOMPoint(box.x, box.y).matrixTransform(matrix);
        const last = new DOMPoint(box.x + box.width, box.y + box.height).matrixTransform(matrix);
        return { left: first.x, top: first.y, right: last.x, bottom: last.y };
      });
      const controls = (await page.locator('.presenter').boundingBox())!;
      expect(left).toBeGreaterThanOrEqual(0);
      expect(top).toBeGreaterThanOrEqual(0);
      expect(right).toBeLessThanOrEqual(width);
      expect(bottom).toBeLessThan(controls.y);
      if (browserName === 'firefox') await capture(page, `${ids[index]}-evidence`);
    }
  });
}
