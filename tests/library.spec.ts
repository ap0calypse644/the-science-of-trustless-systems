import { expect, test } from '@playwright/test';
import { character, poses } from '../src/illustration/character';
import { bubble, ledger } from '../src/illustration/props';

const views = ['cast', 'poses', 'props', 'ledger', 'failure', 'articulation'] as const;
const sizes = [{ width: 1920, height: 1080 }, { width: 1280, height: 720 }, { width: 1024, height: 768 }];

test('authored SVG is deterministic, scoped, and escapes labels', async ({ page }) => {
  const plain = character('bob', { instance: 'first' });
  expect(plain).toBe(character('bob', { instance: 'first' }));
  const copy = character('bob', {
    instance: 'second', pose: 'point', x: 270, y: 110, facing: 'left', scale: 2,
    hands: { right: { kind: 'ledger', label: '<Proof & “24”>' } },
    angles: { rightArm: 20 },
  });
  const safe = '<Note & "receipt">';
  await page.setContent(`<svg>${plain}${copy}${bubble(100, 100, 230, safe, 1)}${ledger(100, 200, 0, safe)}</svg>`);
  const first = page.locator('[data-instance="first"]');
  const second = page.locator('[data-instance="second"]');
  await expect(page.locator('[data-character="bob"]')).toHaveCount(2);
  await expect(page.locator('svg [id]')).toHaveCount(0);
  for (const part of ['torso', 'head', 'hair', 'head-accessory', 'eyes', 'brows', 'mouth', 'costume', 'left-arm', 'right-arm', 'left-leg', 'right-leg', 'left-hand', 'right-hand']) {
    await expect(first.locator(`[data-part="${part}"]`)).toHaveCount(1);
    await expect(second.locator(`[data-part="${part}"]`)).toHaveCount(1);
  }
  expect(new Set(Object.values(poses).map((pose) => pose.leftArm)).size).toBe(9);
  await expect(first.locator('[data-part="torso"]')).toHaveAttribute('d', 'M1 43 Q8 77-1 115');
  await expect(second.locator('[data-part="torso"]')).not.toHaveAttribute('d', poses.stand.torso);
  await expect(second).toHaveAttribute('transform', 'translate(270 110) scale(-2 2)');
  const arm = second.locator('[data-part="right-arm"]');
  await expect(arm).toHaveAttribute('transform', 'rotate(20 3 54)');
  const hand = arm.locator('[data-anchor="right-hand"]');
  await expect(hand).toHaveAttribute('transform', 'translate(75 30)');
  await expect(hand.locator('text')).toHaveText('<Proof & “24”>');
  expect(await hand.locator('text').evaluate((node) => (node as SVGTextElement).getCTM()!.a)).toBeGreaterThan(0);
  await expect(page.getByText(safe, { exact: true })).toHaveCount(2);
  await expect(page.locator('svg note, svg proof')).toHaveCount(0);
});

test('the raised forearm crosses the face and meets the palm under articulation', async ({ page }) => {
  const figures = (['alice', 'bob', 'charlie'] as const).map((identity) =>
    character(identity, { pose: 'facepalm', facing: 'left', angles: { leftArm: 12 } }),
  ).join('');
  await page.setContent(`<svg>${figures}</svg>`);

  const connections = await page.locator('[data-character]').evaluateAll((characters) => characters.map((figure) => {
    const arm = figure.querySelector<SVGGElement>('[data-part="left-arm"]')!;
    const head = figure.querySelector('[data-part="head"]')!;
    const forearm = figure.querySelector<SVGPathElement>('[data-part="facepalm-forearm"]')!;
    const palm = figure.querySelector<SVGPathElement>('[data-part="facepalm-hand"] .hand')!;
    const length = forearm.getTotalLength();
    const wrist = forearm.getPointAtLength(length);
    const handAnchor = arm.querySelector<SVGGElement>('[data-anchor="left-hand"]')!;
    const wristOnScreen = wrist.matrixTransform(forearm.getCTM()!);
    const anchorOnScreen = new DOMPoint().matrixTransform(handAnchor.getCTM()!);
    return {
      forearmAboveHead: Boolean(head.compareDocumentPosition(forearm) & Node.DOCUMENT_POSITION_FOLLOWING),
      forearmBelowPalm: Boolean(forearm.compareDocumentPosition(palm) & Node.DOCUMENT_POSITION_FOLLOWING),
      contactsPalm: palm.isPointInFill(forearm.getPointAtLength(length - 6)),
      wristError: Math.hypot(wristOnScreen.x - anchorOnScreen.x, wristOnScreen.y - anchorOnScreen.y),
    };
  }));
  for (const connection of connections) {
    expect(connection).toMatchObject({ forearmAboveHead: true, forearmBelowPalm: true, contactsPalm: true });
    expect(connection.wristError).toBeLessThan(0.01);
  }
});

test('the gallery works offline and the articulation reset restores its SVG', async ({ page, context, baseURL }) => {
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

  expect((await page.goto('/library/'))?.ok()).toBe(true);
  await expect(page.getByRole('heading')).toHaveText('The cast');
  const loaded = await page.evaluate(async () => {
    const faces = await Promise.all([document.fonts.load('48px Kalam'), document.fonts.load('40px "Patrick Hand"')]);
    return faces.map((matches) => matches.some((font) => font.status === 'loaded'));
  });
  expect(loaded).toEqual([true, true]);
  expect([...fonts].map((url) => new URL(url).pathname)).toEqual(expect.arrayContaining([
    expect.stringContaining('Kalam-Regular'), expect.stringContaining('PatrickHand-Regular'),
  ]));
  await page.getByRole('link', { name: 'Poses', exact: true }).click();
  await expect(page.locator('.art [data-character]')).toHaveCount(21);
  await page.getByRole('link', { name: 'Props & variants' }).click();
  await expect(page.locator('[data-prop="courier"]')).toBeVisible();
  await expect(page.locator('[data-prop="plume"]')).toBeVisible();
  await expect(page.locator('[data-prop="kettle"]')).toBeVisible();
  await page.getByRole('link', { name: 'Ledger scene' }).click();
  await expect(page.locator('.art [data-character]')).toHaveCount(3);
  await page.getByRole('link', { name: 'Server scene' }).click();
  await expect(page.locator('.art [data-character]')).toHaveCount(5);

  await page.getByRole('link', { name: 'Articulation' }).click();
  const art = page.locator('[data-view="articulation"] .art');
  await expect(art.locator('[data-instance="articulation"]')).toBeVisible();
  const initial = await art.innerHTML();
  await page.getByLabel('Pose', { exact: true }).selectOption('point');
  const arm = art.locator('[data-part="right-arm"]');
  const torso = art.locator('[data-part="torso"]');
  const mouth = art.locator('[data-part="mouth"]');
  const torsoBefore = await torso.getAttribute('d');
  const mouthBefore = await mouth.getAttribute('d');
  await page.getByLabel('Expression').selectOption('confused');
  await expect(mouth).not.toHaveAttribute('d', mouthBefore!);
  await expect(torso).toHaveAttribute('d', torsoBefore!);
  await page.getByRole('slider', { name: 'Right arm' }).press('ArrowRight');
  await expect(arm).toHaveAttribute('transform', 'rotate(1 3 54)');
  await page.getByRole('slider', { name: 'Head' }).press('ArrowRight');
  await expect(art.locator('[data-part="head"]')).toHaveAttribute('transform', 'rotate(1 1 43)');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect.poll(() => art.innerHTML()).toBe(initial);
  expect(unexpected).toEqual([]);
});

for (const size of sizes) {
  test(`M2 gallery fits at ${size.width} × ${size.height}`, async ({ page, browserName }) => {
    await page.setViewportSize(size);
    await page.goto('/library/');
    for (const name of views) {
      if (name !== 'cast') await page.locator(`nav a[href="#${name}"]`).click();
      const plate = page.locator(`[data-view="${name}"]`);
      await expect(plate).toBeVisible();
      await expect(page.locator(`nav a[href="#${name}"]`)).toHaveAttribute('aria-current', 'page');
      await page.evaluate(() => document.fonts.ready);
      const dimensions = await plate.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        const art = element.querySelector<SVGSVGElement>('svg')!;
        const content = art.getBBox();
        const viewBox = art.viewBox.baseVal;
        const controls = element.querySelector('form')?.getBoundingClientRect();
        return {
          viewport: [innerWidth, innerHeight],
          plate: [bounds.right, bounds.bottom],
          art: [content.x, content.y, content.width, content.height],
          viewBox: [viewBox.width, viewBox.height],
          controlsBottom: controls?.bottom,
        };
      });
      expect(dimensions.plate[0], name).toBeLessThanOrEqual(dimensions.viewport[0] + 1);
      expect(dimensions.plate[1], name).toBeLessThanOrEqual(dimensions.viewport[1] + 1);
      const [x, y, width, height] = dimensions.art;
      expect(x, name).toBeGreaterThanOrEqual(0);
      expect(y, name).toBeGreaterThanOrEqual(0);
      expect(width, name).toBeGreaterThan(0);
      expect(x + width, name).toBeLessThanOrEqual(dimensions.viewBox[0]);
      expect(y + height, name).toBeLessThanOrEqual(dimensions.viewBox[1]);
      expect(dimensions.controlsBottom ?? 0, name).toBeLessThanOrEqual(dimensions.viewport[1] + 1);
      if (browserName === 'firefox') {
        await page.screenshot({
          path: `test-results/visual-review/m2/${size.width}x${size.height}/${name}.png`,
          animations: 'disabled',
        });
      }
    }
  });
}
