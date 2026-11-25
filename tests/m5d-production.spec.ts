import { expect, test, type Page } from '@playwright/test';
import { attempts, editedRow, originalRow, verification } from '../src/talk/m5d/fixtures';
import { m5dCheckpoints } from '../src/talk/m5d/production';

const ids = ['14-data-fingerprint', '15-one-bit', '16-proof-of-work', '17-easy-verification'];
const path = 'test-results/visual-review/m5d-production';
const live = (page: Page) => page.locator('section.present .scene-root');
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

async function capture(page: Page, filename: string): Promise<void> {
  const { width, height } = page.viewportSize()!;
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: `${path}/${width}x${height}/${filename}.png`,
    style: '.presenter { visibility: hidden; } .scene-root .talk-sheet { transform: none !important; }',
  });
}

for (const [index, checkpoints] of m5dCheckpoints.entries()) {
  test(`${ids[index]} repeats every approved composition on forward and backward navigation`, async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await open(page, index);
    const compositions: string[] = [];
    for (const [i, checkpoint] of checkpoints.entries()) {
      if (i) await page.keyboard.press('k');
      await expect(status(page)).toContainText(`· ${checkpoint.label} ·`);
      await expect(live(page)).toHaveAttribute('data-m5d-frame', `hold-${checkpoint.still.id}`);
      await expect(live(page)).not.toContainText(/illustrative|fixed data/i);
      await expect(page.locator('section.present .notes')).toContainText('Tell the audience this');
      await expect(live(page).locator('button, input, select')).toHaveCount(0);
      compositions.push(await live(page).innerHTML());
      if (browserName === 'firefox') await capture(page, checkpoint.still.id);
    }
    await page.keyboard.press('Space');
    await expect(page.locator('section.present')).toHaveAttribute('id', ids[index]);
    for (let i = checkpoints.length - 2; i >= 0; i--) {
      await page.keyboard.press('j');
      expect(await live(page).innerHTML()).toBe(compositions[i]);
    }
    await seek(page, checkpoints[checkpoints.length - 1].time);
    expect(await live(page).innerHTML()).toBe(compositions[compositions.length - 1]);
    await page.keyboard.press('r');
    expect(await live(page).innerHTML()).toBe(compositions[0]);
  });
}

test('the input travels, equal-sized output appears, and avalanche marks reveal in order', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 0);
  await seek(page, 1.45);
  const pulse = live(page).locator('[data-motion="pulse"]');
  const from = await pulse.getAttribute('transform');
  await expect(pulse).toBeVisible();
  await seek(page, 2.15);
  await expect(pulse).not.toHaveAttribute('transform', from!);
  const frame = await live(page).innerHTML();
  if (browserName === 'firefox') await capture(page, '14-bytes-in-flight');
  await seek(page, 1.45);
  await seek(page, 2.15);
  expect(await live(page).innerHTML()).toBe(frame);
  for (const time of [3, 6, 9]) {
    await seek(page, time);
    await expect(live(page).locator('[data-grid] .bit')).toHaveCount(256);
  }

  await open(page, 1);
  await seek(page, 1.25);
  await expect(live(page).locator('[data-prop="ledger-page"]')).toContainText(originalRow);
  await seek(page, 2.55);
  await expect(live(page).locator('[data-prop="ledger-page"]')).toContainText(editedRow);
  await seek(page, 8);
  const marks = live(page).locator('.changed-bit');
  await expect(marks).toHaveCount(264);
  const visibleMarks = () => marks.evaluateAll((elements) =>
    elements.filter((element) => Number(getComputedStyle(element).opacity) > .5).length);
  const early = await visibleMarks();
  await seek(page, 9.5);
  expect(await visibleMarks()).toBeGreaterThan(early);
  if (browserName === 'firefox') await capture(page, '15-avalanche-in-progress');
  await seek(page, 8);
  expect(await visibleMarks()).toBe(early);
});

test('undo precedes nonce entry, and the same candidate reaches Alice', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 2);
  await seek(page, 3);
  await expect(live(page).locator('[data-prop="ledger-page"]')).toContainText(editedRow);
  await seek(page, 4.2);
  await expect(live(page).locator('[data-prop="ledger-page"]')).toContainText(originalRow);
  await expect(live(page).locator('[data-motion="nonce"]')).toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '16-undo-before-nonce');
  for (const [nonce, time] of [6, 7.9, 9, 10, 11.8, 13, 14.45, 15].entries()) {
    await seek(page, time);
    await expect(live(page).locator('[data-motion="nonce"]')).toHaveText(`Nonce ${nonce}`);
    const prefix = (await live(page).locator('[data-motion="attempt"] .digit').allTextContents()).join('');
    expect(prefix).toBe(attempts[nonce].prefix);
    await expect(live(page).locator('[data-prop="ledger-page"] .body')).toHaveText([...verification.rows]);
  }
  await expect(live(page).locator('.target-bit')).toHaveCount(4);

  await open(page, 3);
  const candidate = live(page).locator('[data-motion="candidate"]');
  await expect(candidate.locator('.body')).toHaveText([...verification.rows]);
  await expect(candidate).toContainText('Nonce 7');
  await seek(page, 1.5);
  const sent = await candidate.getAttribute('style');
  expect(sent).toContain('translate');
  if (browserName === 'firefox') await capture(page, '17-candidate-in-flight');
  await seek(page, 0);
  await seek(page, 1.5);
  await expect(candidate).toHaveAttribute('style', sent!);
  await seek(page, 5);
  await expect(live(page).locator('[data-prop="ledger-page"] .body')).toHaveText([...verification.rows]);
  const checked = (await live(page).locator('[data-motion="attempt"] .digit').allTextContents()).join('');
  expect(checked).toBe(verification.prefix);
  await seek(page, 9);
  await expect(live(page).locator('[data-motion="work-row"] text')).toHaveText([
    '4', '16', '8', '256', '16', '65,536', '24', '16,777,216',
  ]);
});

test('offline playback, speed, speaker baseline and rapid navigation share the presenter lifecycle', async ({ page, context, baseURL }) => {
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
  await open(page, 1);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/fixed, authored data/)).toBeVisible();
  const baseline = speaker.frameLocator('iframe').first().locator('section.present');
  await expect(baseline).toHaveAttribute('id', ids[1]);
  await page.bringToFront();
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).not.toHaveText('1×');
  await page.keyboard.press('h');
  await expect(page.locator('#playback-panel')).toBeHidden();
  await page.keyboard.press('h');
  await seek(page, 2.75);
  await page.keyboard.press('Space');
  await expect(status(page)).toContainText('Paused · Edit amount · 3.00');
  await expect(baseline.locator('.scene-root [data-grid]')).toHaveCount(1);
  await expect(baseline.locator('.scene-root .art')).toContainText('Alice’s separately saved digest');
  await speaker.close();

  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator(`[id="${ids[1]}"] .scene-root`)).toBeEmpty();
  await expect(status(page)).toContainText('Paused · Handoff · 0.00');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await expect(status(page)).toContainText('Paused · Save original · 0.00');
  expect(external).toEqual([]);
});

test('four print compositions preserve the teaching evidence', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  const evidence = ['Matching digests', '132 of 256 bits changed', 'Nonce 7', '16,777,216'];
  for (const [index, id] of ids.entries()) {
    const sheet = page.locator(`section[id="${id}"] .hash-sheet`);
    await expect(sheet).toContainText(evidence[index]);
    await expect(sheet).not.toContainText(/illustrative|fixed data/i);
    const box = (await sheet.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(16 / 9);
    if (browserName === 'firefox') {
      await page.evaluate(() => document.fonts.ready);
      await sheet.screenshot({ path: `${path}/1920x1080/${id}-print.png` });
    }
  }
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`production artwork fits at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    for (const [index, time] of [9, 10, 15, 9].entries()) {
      await open(page, index);
      await seek(page, time);
      const art = live(page).locator('.art');
      const { x, y, right, bottom } = await art.evaluate((svg: SVGSVGElement) => {
        const bounds = svg.getBBox();
        const matrix = svg.getScreenCTM()!;
        const start = new DOMPoint(bounds.x, bounds.y).matrixTransform(matrix);
        const end = new DOMPoint(bounds.x + bounds.width, bounds.y + bounds.height).matrixTransform(matrix);
        return { x: start.x, y: start.y, right: end.x, bottom: end.y };
      });
      const controls = (await page.locator('.presenter').boundingBox())!;
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(right).toBeLessThanOrEqual(width);
      expect(bottom).toBeLessThan(controls.y);
      if (browserName === 'firefox') await capture(page, `${ids[index]}-evidence`);
    }
  });
}
