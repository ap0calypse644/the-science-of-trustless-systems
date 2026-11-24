import { expect, test, type Page } from '@playwright/test';

const candidates = ['whiteboard', 'notebook', 'comic'];
const samples = ['title', 'failure', 'message'];
const sizes = [
  { width: 1920, height: 1080 },
  { width: 1280, height: 720 },
  { width: 1024, height: 768 },
];
const fontFaces = [
  '400 44px "Patrick Hand"',
  '400 43px Kalam',
  '400 42px "Balsamiq Sans"',
  '700 105px "Balsamiq Sans"',
];

function currentSlide(page: Page) {
  return page.locator('.reveal.ready .slides > section.present');
}

test('the review deck and local fonts work with external network blocked', async ({ context, page, baseURL, browserName }) => {
  const unexpected: string[] = [];
  const fontResponses = new Set<string>();
  await context.route('**/*', async (route) => {
    const request = route.request();
    if (new URL(request.url()).origin !== baseURL) {
      unexpected.push(request.url());
      await route.abort();
      return;
    }
    await route.continue();
  });
  await context.routeWebSocket(/.*/, (socket) => {
    unexpected.push(socket.url());
    void socket.close();
  });
  context.on('weberror', (error) => unexpected.push(error.error().message));
  context.on('requestfailed', (request) => unexpected.push(request.url()));
  context.on('response', (response) => {
    if (response.status() >= 400) unexpected.push(response.url());
    if (response.ok() && response.request().resourceType() === 'font') fontResponses.add(response.url());
  });

  await page.setViewportSize({ width: 1024, height: 768 });
  expect((await page.goto('/review/?type=1'))?.ok()).toBe(true);
  await expect(page).toHaveTitle('The Science of Trustless Systems — Visual Review');
  await expect(page.locator('.reveal.ready .slides > section')).toHaveCount(9);
  await expect(currentSlide(page).getByRole('heading')).toHaveText('The Science of Trustless Systems');
  await expect(currentSlide(page).locator('.type-sample')).toContainText('n ≥ 3f + 1 · A ≠ B');

  const loaded = await page.evaluate(async (faces) => {
    const results = await Promise.all(faces.map((face) => document.fonts.load(face, 'Ag 0123456789 “Yes?”')));
    return results.map((matches) => matches.some((font) => font.status === 'loaded'));
  }, fontFaces);
  expect(loaded).toEqual([true, true, true, true]);
  expect(fontResponses.size).toBe(4);

  for (const candidate of ['notebook', 'comic', 'whiteboard']) {
    await page.locator(`.style-picker [data-candidate="${candidate}"]`).click();
    await expect(currentSlide(page)).toHaveAttribute('data-sample', 'title');
    await expect(currentSlide(page).locator('.type-sample')).toBeVisible();
    await page.screenshot({
      path: `test-results/visual-review/${browserName}/typography/${candidate}.png`,
    });
  }

  await page.keyboard.press('ArrowRight');
  const notebook = page.getByRole('button', { name: 'Scientist’s Notebook' });
  await notebook.click();
  await expect(notebook).toHaveAttribute('aria-pressed', 'true');
  await expect(currentSlide(page)).toHaveAttribute('data-sample', 'failure');
  await expect(currentSlide(page)).toHaveAttribute('data-candidate', 'notebook');
  await page.keyboard.press('ArrowRight');
  await expect(currentSlide(page)).toHaveAttribute('data-sample', 'message');
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).toHaveClass(/\boverview\b/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.reveal')).not.toHaveClass(/\boverview\b/);

  const popup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const speaker = await popup;
  await expect(speaker.getByText('Ask what each general knows about delivery.', { exact: false })).toBeVisible();
  await speaker.close();
  await page.goto('/review/?set=refined');
  await expect(page.locator('.reveal.ready .slides > section')).toHaveCount(12);
  await expect(currentSlide(page)).toHaveAttribute('data-candidate', 'expressive');
  await expect(currentSlide(page)).toHaveAttribute('data-sample', 'title');
  await expect(page.getByRole('button', { name: 'D · Expressive', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(currentSlide(page).locator('.sheet')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await page.getByRole('button', { name: 'Character poses' }).click();
  await expect(currentSlide(page)).toHaveAttribute('data-sample', 'characters');
  await expect(currentSlide(page).locator('[data-pose]')).toHaveCount(7);
  await page.getByRole('button', { name: 'E · Cartoon (archive)' }).click();
  await expect(currentSlide(page)).toHaveAttribute('data-candidate', 'cartoon');
  await expect(currentSlide(page)).toHaveAttribute('data-sample', 'characters');
  await page.getByRole('button', { name: 'F · Sketchbook (archive)' }).click();
  await expect(currentSlide(page)).toHaveAttribute('data-candidate', 'sketch');
  await expect(currentSlide(page).locator('.sheet')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(currentSlide(page).getByRole('heading')).toHaveCSS('font-family', /^Kalam/);
  await expect(currentSlide(page).locator('.sheet')).toHaveCSS('font-family', /^"?Patrick Hand"?[, ]/);

  const refinedPopup = page.waitForEvent('popup');
  await page.keyboard.press('s');
  const refinedSpeaker = await refinedPopup;
  await expect(refinedSpeaker.getByText('Compare Alice’s body language and silhouette across the seven poses.')).toBeVisible();
  await refinedSpeaker.close();
  await page.bringToFront();
  await page.keyboard.press('f');
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  expect(unexpected).toEqual([]);
});

test('archive strokes and title spacing match M1 without shifting refined slides', async ({ page }) => {
  const contours = [['whiteboard', 5.5], ['notebook', 5.5], ['comic', 7]] as const;
  await page.goto('/review/');
  for (const [candidate, mainWidth] of contours) {
    for (const sample of samples) {
      const slide = currentSlide(page);
      await expect(slide).toHaveAttribute('data-candidate', candidate);
      await expect(slide).toHaveAttribute('data-sample', sample);
      const art = slide.locator('.art');
      await expect(art).toHaveCSS('margin-top', sample === 'title' && candidate !== 'whiteboard' ? '-40px' : '0px');
      const widths = await art.evaluate((svg) => ({
        contour: parseFloat(getComputedStyle(svg.querySelector('g path.paper')!).strokeWidth),
        fine: [...svg.querySelectorAll('path.fine')].map((path) => parseFloat(getComputedStyle(path).strokeWidth)),
      }));
      expect(widths.contour).toBeCloseTo(mainWidth, 2);
      expect(widths.fine.length).toBeGreaterThan(0);
      for (const width of widths.fine) expect(width).toBeCloseTo(mainWidth * .55, 2);
      await page.keyboard.press('ArrowRight');
    }
  }

  await page.goto('/review/?set=refined');
  for (const candidate of ['expressive', 'cartoon', 'sketch']) {
    for (const sample of [...samples, 'characters']) {
      const slide = currentSlide(page);
      await expect(slide).toHaveAttribute('data-candidate', candidate);
      await expect(slide).toHaveAttribute('data-sample', sample);
      await expect(slide.locator('.art')).toHaveCSS('margin-top', '0px');
      await page.keyboard.press('ArrowRight');
    }
  }
});

async function checkGeometry(slide: ReturnType<typeof currentSlide>, size: { width: number; height: number }): Promise<void> {
  const geometry = await slide.evaluate((element) => {
    const sheet = element.querySelector('.sheet')!.getBoundingClientRect();
    const art = element.querySelector<SVGSVGElement>('.art')!;
    const painted = art.getBBox();
    const labels = [...element.querySelectorAll('h1, h2, svg text')];
    const textFits = labels.every((label) => {
      const bounds = label.getBoundingClientRect();
      const margin = sheet.width / 1920 * 100;
      return bounds.left >= sheet.left + margin && bounds.right <= sheet.right - margin
        && bounds.top >= sheet.top + margin / 2 && bounds.bottom <= sheet.bottom - margin / 2;
    });
    return {
      width: sheet.width,
      height: sheet.height,
      x: sheet.x,
      y: sheet.y,
      textFits,
      artFits: painted.width > 0 && painted.height > 0
        && painted.x > 0 && painted.y > 0
        && painted.x + painted.width < 1600 && painted.y + painted.height < 650,
    };
  });
  const fitScale = Math.min(size.width / 1920, size.height / 1080, 1);
  // Allow Reveal’s scale rounding and a small layout margin while checking for a near-full fit.
  expect(geometry.width).toBeLessThanOrEqual(size.width + 1);
  expect(geometry.height).toBeLessThanOrEqual(size.height + 1);
  expect(geometry.width / 1920).toBeGreaterThan(fitScale * 0.98);
  expect(geometry.width / geometry.height).toBeCloseTo(16 / 9, 3);
  expect(Math.abs(geometry.x - (size.width - geometry.width) / 2)).toBeLessThan(2);
  expect(Math.abs(geometry.y - (size.height - geometry.height) / 2)).toBeLessThan(2);
  expect(geometry.textFits).toBe(true);
  expect(geometry.artFits).toBe(true);
}

for (const size of sizes) {
  test(`all nine samples fit at ${size.width} × ${size.height}`, async ({ page, browserName }) => {
    await page.setViewportSize(size);
    await page.goto('/review/');
    for (const [candidateIndex, candidate] of candidates.entries()) {
      for (const [sampleIndex, sample] of samples.entries()) {
        const slide = currentSlide(page);
        await expect(slide).toHaveAttribute('data-candidate', candidate);
        await expect(slide).toHaveAttribute('data-sample', sample);
        await expect(slide.getByRole('img')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);

        await checkGeometry(slide, size);

        await page.screenshot({
          path: `test-results/visual-review/${browserName}/${size.width}x${size.height}/${candidate}-${sample}.png`,
          animations: 'disabled',
        });
        if (candidateIndex * samples.length + sampleIndex < candidates.length * samples.length - 1) {
          await page.keyboard.press('ArrowRight');
        }
      }
    }
  });
}

const refinements = [
  ['expressive', 'D · Expressive Minimalism'],
  ['cartoon', 'E · Cartoon Minimalism'],
  ['sketch', 'F · Sketchbook Cartoons'],
] as const;
const refinedSamples = [...samples, 'characters'];

for (const size of sizes) {
  test(`the 12 refined samples fit at ${size.width} × ${size.height}`, async ({ page, browserName, context }) => {
    await page.setViewportSize(size);
    await page.goto('/review/?set=refined');
    await expect(page.locator('.reveal.ready .slides > section')).toHaveCount(12);
    const makeComparisons = browserName === 'firefox' && size.width === 1920;
    const captures = new Map<string, string[]>();

    for (const [candidate, label] of refinements) {
      for (const sample of refinedSamples) {
        const slide = currentSlide(page);
        await expect(slide).toHaveAttribute('data-candidate', candidate);
        await expect(slide).toHaveAttribute('data-sample', sample);
        await expect(slide.getByRole('img')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);
        await checkGeometry(slide, size);
        const shot = await slide.locator('.sheet').screenshot({
          path: `test-results/visual-review/${browserName}/${size.width}x${size.height}/${candidate}-${sample}.png`,
          animations: 'disabled',
          style: '.style-picker { visibility: hidden }',
        });
        if (makeComparisons) {
          const row = `<section><h1>${label}</h1><img alt="" src="data:image/png;base64,${shot.toString('base64')}"></section>`;
          captures.set(sample, [...(captures.get(sample) ?? []), row]);
        }
        await page.keyboard.press('ArrowRight');
      }
    }

    if (makeComparisons) {
      const sheet = await context.newPage();
      await sheet.setViewportSize(size);
      for (const [sample, rows] of captures) {
        await sheet.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
          * { box-sizing: border-box; }
          body { margin: 0; background: #fff; color: #222; font-family: system-ui, sans-serif; }
          h1 { margin: 0; padding: 16px 32px; background: #e5e7eb; font-size: 28px; }
          img { display: block; width: 1920px; height: 1080px; }
          </style></head><body>${rows.join('')}</body></html>`);
        await sheet.screenshot({
          path: `test-results/visual-review/m1.1-comparisons/${sample === 'characters' ? 'character' : sample}-comparison.png`,
          fullPage: true,
        });
      }
    }
  });
}
