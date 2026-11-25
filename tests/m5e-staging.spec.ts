import { expect, test } from '@playwright/test';
import { fresh, history } from '../src/talk/m5c/ledger-model';
import {
  blockInput, common, commonState, edited, fork, forkViews, linked, linkMatches, pages, repaired, unlinkedEdit,
  type Block,
} from '../src/talk/m5e/fixtures';

const route = '/talk/m5e/';
const ids = [
  '18-short-list', '18-growing-list', '18-concern', '18-overwhelmed',
  '19-first-page', '19-next-page', '19-four-pages', '19-detach-pages', '19-independent-blocks',
  '20-independent-blocks', '20-unlinked-edit', '20-restore', '20-first-link', '20-blockchain',
  '20-link-mismatch', '20-repaired-link', '20-next-mismatch',
  '21-common-history', '21-conflicting-payments', '21-competing-blocks', '21-disagreement', '21-fork',
];
const representative = ['18-overwhelmed', '19-independent-blocks', '20-next-mismatch', '21-fork'];

const matches = (blocks: readonly Block[]): boolean[] =>
  blocks.slice(1).map((block, index) => linkMatches(blocks[index], block));

test('unlinked pages preserve row identities and immediate link changes propagate one step', () => {
  expect(pages.map(({ rows }) => rows.map(({ id }) => id))).toEqual(linked.map(({ rows }) => rows.map(({ id }) => id)));
  expect(pages.every(({ previous, digest }) => previous === null && digest === undefined)).toBe(true);
  expect(unlinkedEdit[0].rows.map(({ id }) => id)).toEqual(['1-1', 'added', '1-3']);
  expect(unlinkedEdit[0].rows.slice(0, 2).every(({ signed }) => !signed)).toBe(true);
  expect(matches(linked)).toEqual([true, true, true]);
  expect(matches(edited)).toEqual([false, true, true]);
  expect(matches(repaired)).toEqual([true, false, true]);
  expect(blockInput(linked[0])).not.toBe(blockInput(edited[0]));
  expect(blockInput(linked[1])).toBe(blockInput(edited[1]));
  expect(edited[1].digest).toBe(linked[1].digest);
  expect(repaired[1].rows).toEqual(linked[1].rows);
  expect(blockInput(edited[1])).not.toBe(blockInput(repaired[1]));
  expect(repaired.slice(2)).toEqual(linked.slice(2));
  const variants = [...linked, edited[0], repaired[1], ...fork];
  expect(new Set(variants.map(({ digest }) => digest)).size).toBe(variants.length);
  expect(new Set(variants.map(blockInput)).size).toBe(variants.length);
  expect(variants.every(({ digest }) => /^[0-9a-f]{6}$/.test(digest ?? ''))).toBe(true);
});

test('the common prefix returns to the café opening and either spend fits alone', () => {
  const prior = history(fresh, common.flatMap(({ rows }) => rows));
  expect(prior.rejected).toEqual([]);
  expect(commonState).toEqual({ Alice: 0, Bob: 0, Charlie: 20 });
  expect(fork.map((candidate) => linkMatches(common[2], candidate))).toEqual([true, true]);
  expect(forkViews.map(({ accepted, rejected }) => [accepted.length, rejected.length])).toEqual([[1, 0], [1, 0]]);
  expect(forkViews.map(({ balances }) => balances)).toEqual([
    { Alice: 20, Bob: 0, Charlie: 0 }, { Alice: 0, Bob: 20, Charlie: 0 },
  ]);
  for (const order of [[fork[0], fork[1]], [fork[1], fork[0]]]) {
    const result = history(commonState, order.flatMap(({ rows }) => rows));
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected[0].reason).toBe('Insufficient balance');
    expect(Object.values(result.balances).every((balance) => balance >= 0)).toBe(true);
  }
});

for (const [width, height] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`22 stills navigate offline and fit at ${width} × ${height}`, async ({ page, context, baseURL, browserName }) => {
    const origin = new URL(baseURL!).origin;
    const failures: string[] = [];
    await context.route('**/*', (route) => {
      if (new URL(route.request().url()).origin === origin) return route.continue();
      failures.push(route.request().url());
      return route.abort();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      failures.push(socket.url());
      void socket.close();
    });
    context.on('weberror', (error) => failures.push(error.error().message));

    await page.setViewportSize({ width, height });
    await page.goto(route);
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    expect(await page.locator('.slides > section').evaluateAll((sections) => sections.map(({ id }) => id))).toEqual(ids);
    await expect(page.locator('.presenter, .slides button, .slides input')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    const current = page.locator('section.present');
    let lastPage: string | undefined;

    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(current).toHaveAttribute('id', id);
      await expect(current.locator('.notes')).toContainText('authored teaching examples');
      const slide = current.locator('.talk-sheet');
      await expect(slide).not.toContainText(/illustrative example|fixed data|nonce|mining|proof of work/i);
      const bounds = await current.evaluate((section) => {
        const box = (selector: string) => section.querySelector(selector)!.getBoundingClientRect();
        const svg = section.querySelector<SVGSVGElement>('svg.art')!.getBBox();
        const sheet = box('.talk-sheet');
        const heading = box('h1');
        return { x: sheet.x, y: sheet.y, right: sheet.right, bottom: sheet.bottom,
          titleLeft: heading.left - sheet.left, titleRight: sheet.right - heading.right,
          art: [svg.x, svg.y, svg.x + svg.width, svg.y + svg.height] };
      });
      expect(bounds.x, id).toBeGreaterThanOrEqual(-1);
      expect(bounds.y, id).toBeGreaterThanOrEqual(-1);
      expect(bounds.right, id).toBeLessThanOrEqual(width + 1);
      expect(bounds.bottom, id).toBeLessThanOrEqual(height + 1);
      expect(bounds.titleLeft, id).toBeGreaterThan(0);
      expect(bounds.titleRight, id).toBeGreaterThan(0);
      expect(bounds.art[0], id).toBeGreaterThan(28);
      expect(bounds.art[1], id).toBeGreaterThan(125);
      expect(bounds.art[2], id).toBeLessThan(1572);
      expect(bounds.art[3], id).toBeLessThan(890);

      if (id.startsWith('19')) {
        await expect(current.locator('[data-character], [data-link]')).toHaveCount(0);
        await expect(slide).not.toContainText(/hash|balance/i);
      }
      if (id === '19-independent-blocks') {
        lastPage = await current.locator('[data-independent-composition]').innerHTML();
        await expect(current.locator('[data-block]')).toHaveCount(4);
      }
      if (id === '20-independent-blocks') {
        expect(await current.locator('[data-independent-composition]').innerHTML()).toBe(lastPage);
      }
      if (id === '20-link-mismatch' || id === '20-next-mismatch') {
        const linkStates = await current.locator('[data-link]').evaluateAll((links) => links.map((link) => link.getAttribute('data-link')));
        expect(linkStates).toEqual(id === '20-link-mismatch'
          ? ['mismatch', 'match', 'match'] : ['match', 'mismatch', 'match']);
      }
      if (id === '20-repaired-link') await expect(current.locator('[data-link="unchecked"]')).toHaveCount(1);
      if (id === '21-fork') {
        await expect(current.locator('[data-block="4"] .previous')).toHaveText(['Prev b3427d', 'Prev b3427d']);
        await expect(current.locator('[data-block]')).toHaveCount(5);
        await expect(slide).toContainText('Which history do we believe?');
      }

      if (browserName === 'firefox' && (width === 1920 || representative.includes(id))) {
        await page.screenshot({ path: `test-results/visual-review/m5e-staging/${width}x${height}/${id}.png` });
      }
    }

    await page.keyboard.press('ArrowLeft');
    await expect(current).toHaveAttribute('id', '21-disagreement');
    await expect(page).toHaveURL(/#\/21-disagreement$/);
    await page.reload();
    await expect(current).toHaveAttribute('id', '21-disagreement');
    expect(failures).toEqual([]);
  });
}
