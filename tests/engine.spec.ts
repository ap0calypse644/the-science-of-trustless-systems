import { expect, test, type Page } from '@playwright/test';
import { stepBeat, validateTiming } from '../src/engine/checkpoints';
import { Playback, type PlaybackState } from '../src/engine/playback';

const state = (page: Page) => page.locator('.playback-state');
const scene = (page: Page) => page.locator('section.present .scene-root');
const seek = (page: Page) => page.getByRole('slider', { name: 'Seek' });

async function openEngine(page: Page, path = '/engine/'): Promise<void> {
  await page.clock.install();
  await page.goto(path);
  await expect(page.locator('body')).toHaveAttribute('data-playback-owner', 'presenter');
}

async function at(page: Page, seconds: number): Promise<void> {
  await seek(page).fill(String(seconds));
  await expect(seek(page)).toHaveValue(String(seconds));
  await page.locator('.reveal').focus();
}

async function painted(page: Page): Promise<unknown> {
  return await scene(page).evaluate((root) => {
    const actor = root.querySelector('[data-actor]')!;
    const prop = root.querySelector('[data-scene-prop]')!;
    const dialogue = root.querySelector('[data-dialogue]')!;
    return {
      actor: actor.getAttribute('transform'),
      pose: actor.querySelector('[data-pose][visibility="visible"]')?.getAttribute('data-pose'),
      prop: prop.getAttribute('transform'),
      propVisible: getComputedStyle(prop).visibility,
      dialogue: dialogue.querySelector('text')?.textContent,
      dialogueVisible: getComputedStyle(dialogue).visibility,
    };
  });
}

test('checkpoint validation, tolerance, invalid inputs and scene disposal', () => {
  const checkpoints = [{ time: 0, label: 'Start' }, { time: 2, label: 'Middle' }, { time: 5, label: 'End' }];
  const timing = { duration: 5, checkpoints };
  validateTiming(timing);
  expect(() => validateTiming({ ...timing, duration: Infinity })).toThrow();
  expect(() => validateTiming({ ...timing, checkpoints: [checkpoints[0], checkpoints[0], checkpoints[2]] })).toThrow();
  expect(() => validateTiming({ ...timing, checkpoints: checkpoints.slice(1) })).toThrow();
  expect(() => validateTiming({ ...timing, checkpoints: [checkpoints[0], { time: 2, label: ' ' }, checkpoints[2]] })).toThrow();
  expect(stepBeat(timing, 2 + 1e-8, -1).time).toBe(0);
  expect(stepBeat(timing, 2 - 1e-8, 1).time).toBe(5);
  expect(stepBeat(timing, 1, -1).time).toBe(0);
  expect(stepBeat(timing, 1, 1).time).toBe(2);
  expect(stepBeat(timing, 5, 1).time).toBe(5);

  let current!: PlaybackState;
  let disposed = 0;
  let removed = 0;
  let aborted = 0;
  const renders: number[] = [];
  const root = { replaceChildren: () => removed++ } as unknown as HTMLElement;
  const definition = {
    ...timing,
    mount: (_root: HTMLElement, signal: AbortSignal) => {
      signal.addEventListener('abort', () => aborted++);
      return { render: (time: number) => renders.push(time), dispose: () => { disposed++; } };
    },
  };
  const playback = new Playback((snapshot) => { current = snapshot; });
  try {
    playback.enter(root, definition);
    playback.seek(3);
    for (const invalid of [NaN, Infinity, -Infinity]) playback.seek(invalid);
    for (const invalid of [NaN, Infinity, -1, 9, .9]) playback.setSpeed(invalid);
    expect(current).toMatchObject({ speed: 1, scene: { time: 3, status: 'paused' } });
    playback.seek(-5);
    expect(renders.at(-1)).toBe(0);
    playback.seek(15);
    expect(renders.at(-1)).toBe(5);
    playback.setSpeed(.75);
    playback.enter(root, definition);
    expect(current).toMatchObject({ speed: .75, scene: { time: 0, status: 'paused' } });
    expect({ disposed, removed, aborted }).toEqual({ disposed: 1, removed: 1, aborted: 1 });
    playback.enter(root);
    expect(current.scene).toBeNull();
    playback.play();
    playback.seek(4);
    expect(renders).toEqual([0, 3, 0, 5, 0]);
    expect({ disposed, removed, aborted }).toEqual({ disposed: 2, removed: 2, aborted: 2 });
  } finally {
    playback.dispose();
  }
});

test('plays, pauses, resumes, ends in place and resets from every state', async ({ page }) => {
  await openEngine(page);
  const baseline = await painted(page);
  await expect(state(page)).toHaveText('Paused · Ready at the mark · 0.00 / 6.00 s');
  expect(baseline).toEqual({
    actor: 'translate(310 175) rotate(0)', pose: '0', prop: 'translate(0 440)', propVisible: 'hidden',
    dialogue: '', dialogueVisible: 'hidden',
  });
  await page.keyboard.press('Space');
  await expect(state(page)).toContainText('Playing');
  await page.clock.runFor(2400);
  await page.keyboard.press('Space');
  await expect(state(page)).toContainText('Paused · Carry the envelope');
  const paused = await painted(page);
  expect(paused).toMatchObject({ pose: '1', propVisible: 'hidden' });
  expect(paused).not.toEqual(baseline);
  await page.clock.runFor(1200);
  expect(await painted(page)).toEqual(paused);
  await page.keyboard.press('Space');
  await page.clock.runFor(800);
  expect(await painted(page)).not.toEqual(paused);
  await page.keyboard.press('r');
  expect(await painted(page)).toEqual(baseline);
  await expect(state(page)).toContainText('Paused');
  await at(page, 2);
  await page.keyboard.press('r');
  expect(await painted(page)).toEqual(baseline);
  await at(page, 5.5);
  await page.keyboard.press('Space');
  await page.clock.runFor(1000);
  await expect(state(page)).toHaveText('Ended · Delivery confirmed · 6.00 / 6.00 s');
  expect(await painted(page)).toMatchObject({ pose: '2', propVisible: 'visible', dialogue: 'Delivered!' });
  await page.keyboard.press('Space');
  await page.clock.fastForward(60_000);
  await expect(page.locator('section.present')).toHaveAttribute('id', 'envelope');
  await expect(state(page)).toContainText('Ended');
  await page.keyboard.press('r');
  expect(await painted(page)).toEqual(baseline);
});

test('seeks backward and steps strictly relative to named beats while paused or playing', async ({ page }) => {
  await openEngine(page);
  const baseline = await painted(page);
  await page.keyboard.press('j');
  await expect(seek(page)).toHaveValue('0');
  await page.keyboard.press('k');
  await expect(seek(page)).toHaveValue('2');
  await page.keyboard.press('k');
  await expect(state(page)).toHaveText('Paused · Set it down · 4.00 / 6.00 s');
  expect(await painted(page)).toMatchObject({ pose: '2', dialogue: 'Envelope down.', prop: 'translate(1180 440)' });

  await at(page, 3.25);
  await page.keyboard.press('j');
  await expect(seek(page)).toHaveValue('2');
  await at(page, 2.5);
  await page.keyboard.press('Space');
  await page.clock.runFor(260);
  await page.keyboard.press('k');
  await expect(state(page)).toHaveText('Paused · Set it down · 4.00 / 6.00 s');
  await at(page, 4.2);
  await page.keyboard.press('Space');
  await page.clock.runFor(160);
  await page.keyboard.press('j');
  await expect(seek(page)).toHaveValue('4');
  await expect(state(page)).toContainText('Paused');
  await page.keyboard.press('k');
  await page.keyboard.press('k');
  await expect(seek(page)).toHaveValue('6');
  await at(page, 0);
  expect(await painted(page)).toEqual(baseline);
  await page.keyboard.press('Space');
  await at(page, 0.5);
  await expect(state(page)).toContainText('Paused · Ready at the mark');
});

test('speed persists and rapid navigation disposes stale scene views', async ({ page }) => {
  await openEngine(page);
  const baseline = await painted(page);
  await page.keyboard.press('Shift+Equal');
  await page.keyboard.press('Shift+Equal');
  await page.keyboard.press('Shift+Equal');
  await expect(page.locator('.playback-speed')).toHaveText('2×');
  await page.keyboard.press('Space');
  await page.clock.runFor(1250);
  const elapsed = Number(await seek(page).inputValue());
  expect(elapsed).toBeGreaterThan(2.2);
  expect(elapsed).toBeLessThan(3);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('section.present')).toHaveAttribute('id', 'static');
  await expect(page.locator('.presenter')).toBeHidden();
  await expect(page.locator('#envelope .scene-root')).toBeEmpty();
  await page.keyboard.press('Space');
  await expect(page.locator('section.present')).toHaveAttribute('id', 'static');
  await page.keyboard.press('ArrowRight');
  await expect(state(page)).toHaveText('Paused · Ledger on the desk · 0.00 / 5.00 s');
  await expect(page.locator('.playback-speed')).toHaveText('2×');
  const ledgerBaseline = await painted(page);
  await at(page, 3);
  expect(await painted(page)).toMatchObject({ pose: '2', prop: 'translate(690 418)', dialogue: 'That number changed.' });
  await expect(scene(page).locator('[data-pose="2"] [data-part="facepalm-forearm"]')).toBeVisible();
  await at(page, 0);
  expect(await painted(page)).toEqual(ledgerBaseline);
  await page.keyboard.press('Space');
  for (const key of ['ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft']) {
    await page.keyboard.press(key);
  }
  await page.clock.runFor(1000);
  await expect(page.locator('section.present')).toHaveAttribute('id', 'envelope');
  expect(await painted(page)).toEqual(baseline);
  await expect(page.locator('#ledger .scene-root')).toBeEmpty();
  await expect(page.locator('.playback-speed')).toHaveText('2×');
  await page.keyboard.press('Minus');
  await expect(page.locator('.playback-speed')).toHaveText('1.5×');
});

test('page teardown clears artwork and reconnects one fresh presenter', async ({ page }) => {
  await openEngine(page);
  const baseline = await painted(page);
  await page.keyboard.press('Space');
  await page.clock.runFor(1350);
  expect(await painted(page)).not.toEqual(baseline);
  await page.evaluate(() => window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
  await expect(scene(page)).toBeEmpty();
  await expect(page.locator('.presenter')).toBeHidden();
  await page.clock.runFor(800);
  await expect(scene(page)).toBeEmpty();

  await page.evaluate(() => {
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
  });
  expect(await painted(page)).toEqual(baseline);
  await page.keyboard.press('k');
  await expect(seek(page)).toHaveValue('2');
  await expect(state(page)).toContainText('Paused · Carry the envelope');
});

test('overview and hiding controls preserve pause, focus and native widget commands', async ({ page }) => {
  await openEngine(page);
  await page.keyboard.press('Space');
  await page.clock.runFor(180);
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).toHaveClass(/\boverview\b/);
  const oldTime = await seek(page).inputValue();
  await page.keyboard.press('Space');
  await page.clock.runFor(400);
  expect(await seek(page).inputValue()).toBe(oldTime);
  await page.keyboard.press('Escape');
  await expect(state(page)).toContainText('Paused');
  await page.keyboard.press('h');
  await expect(seek(page)).toBeHidden();
  await page.keyboard.press('h');
  await expect(seek(page)).toBeVisible();
  const toggle = page.getByRole('button', { name: 'Hide controls' });
  await toggle.focus();
  await toggle.press('Space');
  await expect(seek(page)).toBeHidden();
  await expect(page.getByRole('button', { name: 'Show controls' })).toBeFocused();
  await page.getByRole('button', { name: 'Show controls' }).press('Enter');
  await seek(page).focus();
  await seek(page).press('Home');
  await seek(page).press('ArrowRight');
  await expect(seek(page)).toHaveValue('0.01');
  await seek(page).press('Space');
  await expect(state(page)).toContainText('Paused');
  await expect(page.locator('section.present')).toHaveAttribute('id', 'envelope');
  await page.evaluate(() => {
    const editor = document.createElement('div');
    editor.contentEditable = 'true';
    editor.setAttribute('role', 'textbox');
    document.body.append(editor);
    editor.focus();
  });
  await page.keyboard.type('h r +');
  await expect(page.getByRole('textbox')).toHaveText('h r +');
  await expect(seek(page)).toHaveValue('0.01');
  await page.locator('.reveal').focus();
  await page.keyboard.press('Control+r');
  await expect(seek(page)).toHaveValue('0.01');
  await page.keyboard.down('k');
  await page.keyboard.down('k');
  await page.keyboard.up('k');
  await expect(seek(page)).toHaveValue('2');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.reveal')).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(state(page)).toContainText('Ledger on the desk');
  await page.keyboard.press('f');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await expect(seek(page)).toBeVisible();
  await page.keyboard.press('f');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('section.present')).toHaveAttribute('id', 'static');
});

test('production runs offline with local fonts and synchronized speaker previews', async ({ context, page, baseURL }) => {
  const unexpected: string[] = [];
  const fonts = new Set<string>();
  await context.route('**/*', async (route) => {
    const url = route.request().url();
    if (new URL(url).origin === baseURL) await route.continue();
    else {
      unexpected.push(url);
      await route.abort();
    }
  });
  await context.routeWebSocket(/.*/, (socket) => {
    unexpected.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => unexpected.push(error.error().message));
  context.on('requestfailed', (request) => unexpected.push(request.url()));
  context.on('response', (response) => {
    if (response.status() >= 400) unexpected.push(response.url());
    if (response.ok() && response.request().resourceType() === 'font') fonts.add(response.url());
  });

  await openEngine(page);
  await page.evaluate(() => document.fonts.ready);
  expect([...fonts]).toEqual(expect.arrayContaining([
    expect.stringContaining('Kalam-Regular'), expect.stringContaining('PatrickHand-Regular'),
  ]));
  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText(/Delivery diagnostic: use the named beats/)).toBeVisible();
  const preview = speaker.frameLocator('iframe').first();
  await expect(preview.locator('body')).toHaveAttribute('data-playback-owner', 'preview');
  await expect(preview.locator('.presenter')).toBeHidden();
  await page.bringToFront();
  await at(page, 4);
  await expect(preview.locator('section.present [data-pose="0"]')).toHaveAttribute('visibility', 'visible');
  await page.locator('.reveal').focus();
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(speaker.getByText(/Inspection diagnostic: seek backwards/)).toBeVisible();
  await expect(preview.locator('section.present')).toHaveAttribute('id', 'ledger');
  await expect(preview.locator('.presenter')).toBeHidden();
  await speaker.close();
  expect(unexpected).toEqual([]);
});

for (const size of [{ width: 1920, height: 1080 }, { width: 1280, height: 720 }, { width: 1024, height: 768 }]) {
  test(`engine controls and SVG fit at ${size.width} × ${size.height}`, async ({ page, browserName }) => {
    await page.setViewportSize(size);
    await openEngine(page);
    const bar = page.locator('.presenter');
    const art = scene(page).locator('.art');
    await at(page, 4);
    await page.evaluate(() => document.fonts.ready);
    const bounds = await bar.boundingBox();
    const artBounds = await art.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(size.width);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(size.height);
    expect(artBounds!.y + artBounds!.height).toBeLessThan(bounds!.y);
    const folder = `test-results/visual-review/m3/${size.width}x${size.height}`;
    if (browserName === 'firefox') await page.screenshot({ path: `${folder}/envelope-beat.png` });
    await page.keyboard.press('h');
    await expect(seek(page)).toBeHidden();
    await page.keyboard.press('h');
    await expect(seek(page)).toBeVisible();
    if (browserName === 'firefox') {
      await page.keyboard.press('ArrowRight');
      await page.screenshot({ path: `${folder}/static.png` });
      await page.keyboard.press('ArrowRight');
      await at(page, 3);
      await page.screenshot({ path: `${folder}/ledger-beat.png` });
    }
  });
}
