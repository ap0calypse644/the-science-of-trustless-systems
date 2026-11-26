import { expect, test, type Page } from '@playwright/test';

const ids = ['30-blockchain-beyond-currency', '31-agree-on', '32-privacy-bridge'];
const folder = 'test-results/visual-review/m5h-production';
const current = (page: Page) => page.locator('section.present');
const scene = (page: Page) => current(page).locator('.scene-root');
const status = (page: Page) => page.locator('.playback-state');

async function open(page: Page, index: number): Promise<void> {
  await page.goto(`/talk/#/${ids[index]}`);
  await expect(current(page)).toHaveAttribute('id', ids[index]);
  await expect(status(page)).toContainText('Paused');
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
    style: '.presenter { visibility:hidden; } .scene-root .talk-sheet { transform:none !important; }' });
}

for (const [index, id] of ids.entries()) {
  test(`${id} matches approved stills on forward and backward steps and reset`, async ({ page, browserName }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/talk/m5h/');
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    const approved = await page.locator(`.slides > section[id^="${id.slice(0, 2)}-"]`).evaluateAll((sections) =>
      sections.map((section) => ({ id: section.id, markup: section.querySelector('.talk-sheet')!.outerHTML })));
    expect(approved).toHaveLength([4, 8, 6][index]);
    await open(page, index);
    const sheet = scene(page).locator('.talk-sheet');
    for (const [beat, still] of approved.entries()) {
      if (beat) await page.keyboard.press('k');
      await expect(scene(page)).toHaveAttribute('data-m5h-frame', still.id);
      expect(await sheet.evaluate((node) => node.outerHTML)).toBe(still.markup);
      if (browserName === 'firefox') await capture(page, still.id);
    }
    for (let beat = approved.length - 2; beat >= 0; beat--) {
      await page.keyboard.press('j');
      expect(await sheet.evaluate((node) => node.outerHTML)).toBe(approved[beat].markup);
    }
    await seek(page, [11, 20.5, 17.5][index]);
    await page.keyboard.press('r');
    expect(await sheet.evaluate((node) => node.outerHTML)).toBe(approved[0].markup);
  });
}

test('pullback reveals depth before the analogy builds its parallel row', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 0);
  await seek(page, 1.55);
  const clip = scene(page).locator('#m5h-water-reveal rect');
  const height = await clip.getAttribute('height');
  const closer = await scene(page).locator('[data-boat]').getAttribute('transform');
  if (browserName === 'firefox') await capture(page, '30-pullback');
  await seek(page, 2.55);
  expect(+(await clip.getAttribute('height'))!).toBeGreaterThan(+height!);
  await expect(scene(page).locator('[data-boat]')).not.toHaveAttribute('transform', closer!);
  await seek(page, 8.95);
  await expect(scene(page).locator('[data-infrastructure="Blockchain"]')).not.toHaveCSS('opacity', '1');
  if (browserName === 'firefox') await capture(page, '30-parallel-in-flight');
  await seek(page, 11);
  await expect(scene(page).locator('[data-application]')).toHaveCount(8);
  await expect(scene(page)).not.toContainText(/Certificate C-17|Joint ownership/);
});

test('application panels, issuing and checking the credential, and conditional decision move in sequence', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 1);
  await seek(page, 5.15);
  const panel = scene(page).locator('[data-application-panel]').last();
  await expect(panel).not.toHaveCSS('translate', /^0px( 0px)?$/);
  if (browserName === 'firefox') await capture(page, '31-panel-entering');
  await seek(page, 8.8);
  const issued = scene(page).locator('[data-graduation] [data-credential]');
  await expect(issued).not.toHaveCSS('translate', /^0px( 0px)?$/);
  if (browserName === 'firefox') await capture(page, '31-credential-issued');
  await seek(page, 12.8);
  await expect(scene(page).locator('.query-line')).not.toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '31-registry-query');
  await seek(page, 17.5);
  await expect(scene(page).locator('.mark')).toHaveCount(0);
  await seek(page, 18.45);
  await expect(scene(page).locator('.mark').first()).not.toHaveCSS('opacity', '0');
  await expect(scene(page).locator('.mark').last()).toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '31-decision-revealing');
});

test('paper handoff, surplus fields, the single café highlight and enclosing walls animate deterministically', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 2);
  await seek(page, 1.8);
  const transcript = scene(page).locator('[data-transcript]');
  const zoomed = await transcript.getAttribute('transform');
  if (browserName === 'firefox') await capture(page, '32-transcript-moving');
  await seek(page, 2.55);
  await expect(transcript).not.toHaveAttribute('transform', zoomed!);
  await seek(page, 4.55);
  await expect(scene(page).locator('.needed .field-band')).not.toHaveCSS('opacity', '0');
  await expect(scene(page).locator('.extra .field-band').last()).toHaveCSS('opacity', '0');
  if (browserName === 'firefox') await capture(page, '32-fields-revealing');
  await seek(page, 12.4);
  const highlight = scene(page).locator('[data-highlight-entry]');
  await expect(highlight).toHaveCount(1);
  await expect(highlight).not.toHaveCSS('scale', '1');
  await expect(scene(page).locator('[data-cafe-copy="charlie"] .entry')).toHaveText([
    'Bob spent $2 on donuts', 'Alice spent $345 on coffee',
  ]);
  if (browserName === 'firefox') await capture(page, '32-coffee-highlight');
  await seek(page, 15.9);
  await expect(scene(page).locator('.glass-front')).not.toHaveCSS('translate', /^0px( 0px)?$/);
  if (browserName === 'firefox') await capture(page, '32-glass-walls-moving');
  const mid = await scene(page).innerHTML();
  await seek(page, 17.5);
  await seek(page, 15.9);
  expect(await scene(page).innerHTML()).toBe(mid);
});

test('offline presenter controls and baseline preview survive rapid navigation; print has 32 sheets', async ({ page, context, baseURL, browserName }) => {
  const origin = new URL(baseURL!).origin;
  const blocked: string[] = [];
  await context.route('**/*', (route) => {
    const url = route.request().url();
    if (new URL(url).origin === origin) return route.continue();
    blocked.push(url);
    return route.abort();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    blocked.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => blocked.push(error.error().message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await open(page, 0);
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/conceptual breadth/)).toBeVisible();
  const baseline = speaker.frameLocator('iframe').first().locator('section.present .scene-root');
  await expect(baseline).toHaveAttribute('data-m5h-frame', '30-iceberg-tip');
  await page.bringToFront();
  await page.keyboard.press('+');
  await expect(page.locator('.playback-speed')).not.toHaveText('1×');
  await seek(page, 3.75);
  await page.keyboard.press('Space');
  await expect(status(page)).toContainText('Paused · Iceberg reveal · 4.00');
  await expect(baseline).toHaveAttribute('data-m5h-frame', '30-iceberg-tip');
  await speaker.close();
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowRight');
  await expect(status(page)).toContainText('Paused · Interview · 0.00');
  await expect(page.locator('[id="30-blockchain-beyond-currency"] .scene-root')).toBeEmpty();
  await page.goto('/talk/?print');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.print-deck .talk-sheet')).toHaveCount(32);
  for (const [index, id] of ids.entries()) {
    const sheet = page.locator(`[id="${id}"] .talk-sheet`);
    await expect(sheet).toContainText(['Coordination', 'no mutually trusted administrator', 'Personal data'][index]);
    const bounds = (await sheet.boundingBox())!;
    expect(bounds.width / bounds.height).toBeCloseTo(16 / 9);
    if (browserName === 'firefox') {
      await page.evaluate(() => document.fonts.ready);
      await sheet.screenshot({ path: `${folder}/1920x1080/${id}-print.png` });
    }
  }
  expect(blocked).toEqual([]);
});

for (const [width, height] of [[1280, 720], [1024, 768]]) {
  test(`final production holds fit at ${width} × ${height}`, async ({ page, browserName }) => {
    await page.setViewportSize({ width, height });
    for (const [index, id] of ids.entries()) {
      await open(page, index);
      await seek(page, [11, 20.5, 17.5][index]);
      const bounds = (await scene(page).locator('.talk-sheet').boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width + 1);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(height + 1);
      if (browserName === 'firefox') await capture(page, `${id}-evidence`);
    }
  });
}
