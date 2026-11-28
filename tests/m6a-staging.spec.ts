import { expect, test } from '@playwright/test';

const route = '/talk/m6a/';
const ids = [
  '33-charlies-copy', '33-records', '33-evidence-board', '33-reaction',
  '34-names', '34-reused-address', '34-coffee-clue', '34-linked-records',
  '35-first-message', '35-eve-reads', '35-second-message', '35-caesar-reveal',
  '36-wheel-aligned', '36-wheel-shifted', '36-alphabet-strips', '36-encryption',
  '36-decryption', '36-eve-tries', '36-brute-force',
];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const plaintext = 'MEET AT DAWN';
const ciphertext = 'PHHW DW GDZQ';

for (const [width, height] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`all 19 stills fit and navigate offline at ${width} × ${height}`, async ({ page, context, baseURL }) => {
    const origin = new URL(baseURL!).origin;
    const failures: string[] = [];
    await context.route('**/*', (request) => {
      if (new URL(request.request().url()).origin === origin) return request.continue();
      failures.push(request.request().url());
      return request.abort();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      failures.push(socket.url());
      void socket.close();
    });
    context.on('weberror', (error) => failures.push(error.error().message));
    context.on('requestfailed', (request) => failures.push(request.url()));
    context.on('response', (response) => {
      if (!response.ok() && response.status() !== 304) failures.push(`${response.status()} ${response.url()}`);
    });

    await page.setViewportSize({ width, height });
    await page.goto(route);
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    await expect(page.locator('.presenter, .scene-root, .slides button, .slides input')).toHaveCount(0);
    expect(await page.locator('.slides > section').evaluateAll((nodes) => nodes.map((node) => node.id))).toEqual(ids);
    await page.evaluate(() => document.fonts.ready);
    const current = page.locator('section.present');

    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(current).toHaveAttribute('id', id);
      const bounds = await current.locator('.m6a-sheet').evaluate((sheet) => {
        const canvas = sheet.getBoundingClientRect();
        const heading = sheet.querySelector('h1')!.getBoundingClientRect();
        const art = sheet.querySelector<SVGSVGElement>('svg')!.getBBox();
        return {
          canvas: [canvas.x, canvas.y, canvas.right, canvas.bottom],
          heading: [heading.x - canvas.x, canvas.right - heading.right],
          art: [art.x, art.y, art.x + art.width, art.y + art.height],
          background: getComputedStyle(sheet).backgroundColor,
        };
      });
      expect(Math.min(...bounds.canvas.slice(0, 2)), id).toBeGreaterThanOrEqual(-1);
      expect(bounds.canvas[2], id).toBeLessThanOrEqual(width + 1);
      expect(bounds.canvas[3], id).toBeLessThanOrEqual(height + 1);
      expect(Math.min(...bounds.heading), id).toBeGreaterThan(8);
      expect(bounds.art[0], id).toBeGreaterThan(34);
      expect(bounds.art[1], id).toBeGreaterThan(108);
      expect(bounds.art[2], id).toBeLessThan(1571);
      expect(bounds.art[3], id).toBeLessThan(880);
      expect(bounds.background).toBe('rgb(255, 255, 255)');
      await expect(current.locator('aside.notes')).toContainText('Disclose aloud');
    }

    await page.keyboard.press('ArrowLeft');
    await expect(current).toHaveAttribute('id', '36-eve-tries');
    await expect(page).toHaveURL(/#\/36-eve-tries$/);
    for (const id of ids) {
      await page.goto(`${route}#/${id}`);
      await expect(current).toHaveAttribute('id', id);
    }
    await page.reload();
    await expect(current).toHaveAttribute('id', '36-brute-force');
    expect(failures).toEqual([]);
  });
}

test('reuses the café records and separates inference, address reuse and outside evidence', async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('[id="33-charlies-copy"] [data-copy="charlie"] .entry')).toHaveText([
    'Bob spent $2 on donuts', 'Alice spent $345 on coffee',
  ]);
  await expect(page.locator('[id="33-records"] [data-record] .record-name')).toHaveText([
    'Coffee', 'Transport', 'Lunch', 'Pharmacy', 'Salary',
  ]);
  await expect(page.locator('[id="33-evidence-board"] .red-string')).toHaveCount(5);
  await expect(page.locator('[id="33-reaction"] .dialogue').last()).toHaveText('What? It’s all public information!');
  for (const id of ['34-reused-address', '34-coffee-clue', '34-linked-records']) {
    const matched = page.locator(`[id="${id}"] [data-match="alice"]`);
    await expect(matched.locator('.record-address')).toHaveText(['0x7F3A…', '0x7F3A…', '0x7F3A…']);
    await expect(matched.locator('.record-amount')).toHaveText(['$345', '$12', '+$3000']);
    await expect(page.locator(`[id="${id}"] [data-record="donuts"] .record-amount`)).toHaveText('$2');
  }
  await expect(page.locator('[id="34-coffee-clue"] .annotation')).toHaveText('Alice paid $345 for coffee.');
  await expect(page.locator('[id="34-linked-records"] .red-string')).toHaveCount(3);
  await expect(page.locator('[id="34-linked-records"] .takeaway')).toHaveText('Pseudonymity ≠ Anonymity');
});

test('messenger and authored cipher examples agree with the wheel and strips', async ({ page }) => {
  const shift = (message: string, key: number) => Array.from(message, (letter) => (
    letter === ' ' ? letter : alphabet[(alphabet.indexOf(letter) + key + alphabet.length) % alphabet.length]
  )).join('');
  await page.goto(route);
  await expect(page.locator('[id="35-first-message"] .lettering')).toHaveText(plaintext);
  await expect(page.locator('[id="35-eve-reads"] .lettering')).toHaveText([plaintext, plaintext]);
  await expect(page.locator('[id="35-second-message"] .lettering')).toHaveText(ciphertext);
  await expect(page.locator('[id="35-caesar-reveal"] .lettering')).toHaveText([ciphertext, plaintext]);
  expect(shift(plaintext, 3)).toBe(ciphertext);

  for (const key of [0, 3]) {
    const wheel = page.locator(key === 0 ? '[id="36-wheel-aligned"]' : '[id="36-wheel-shifted"]');
    await expect(wheel.locator('[data-wheel-ring="outer"] .wheel-letter')).toHaveText([...alphabet]);
    await expect(wheel.locator('[data-wheel-ring="inner"] .wheel-letter')).toHaveText([...alphabet]);
    const angles = await wheel.locator('[data-letter-index]').evaluateAll((letters) => letters.map((letter) => {
      const { e, f } = (letter as SVGGElement).transform.baseVal.getItem(0).matrix;
      return Math.atan2(e, -f);
    }));
    for (let i = 0; i < alphabet.length; i++) {
      const inner = alphabet.length + (i + key) % alphabet.length;
      expect(angles[inner]).toBeCloseTo(angles[i], 3);
    }
  }

  const columns = page.locator('[id="36-encryption"] [data-column]');
  await expect(columns.locator('text:first-of-type')).toHaveText([...alphabet]);
  await expect(columns.locator('text:last-of-type')).toHaveText([...shift(alphabet, 3)]);
  await expect(page.locator('[id="36-encryption"] .message')).toHaveText([plaintext, ciphertext]);
  await expect(page.locator('[id="36-decryption"] .message')).toHaveText([ciphertext, plaintext]);
  await expect(page.locator('[id="36-brute-force"] [data-trial] .message')).toHaveText(
    [-1, -2, -3].map((key) => shift(ciphertext, key)),
  );
});

test('Part I production, print, diagnostics and all archived staging routes are available', async ({ page }) => {
  await page.goto('/talk/');
  await expect(page.locator('.reveal')).toHaveClass(/ready/);
  await expect(page.locator('.slides > section')).toHaveCount(32);
  await expect(page.locator('.slides > section').last()).toHaveAttribute('id', /^32-/);
  await page.goto('/talk/?print');
  await expect(page.locator('.print-deck .talk-sheet')).toHaveCount(32);
  for (const diagnostic of ['/', '/review/', '/library/', '/engine/']) {
    const response = await page.goto(diagnostic);
    expect(response?.ok(), diagnostic).toBe(true);
    await expect(page.locator('main'), diagnostic).toBeVisible();
  }
  for (const archive of ['staging', 'm5a', 'm5b', 'm5c', 'm5d', 'm5e', 'm5f', 'm5g', 'm5h']) {
    await page.goto(`/talk/${archive}/`);
    await expect(page.locator('.reveal'), archive).toHaveClass(/ready/);
    await expect(page.locator('.slides > section.present .talk-sheet'), archive).toBeVisible();
  }
});
