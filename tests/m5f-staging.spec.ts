import { expect, test } from '@playwright/test';
import { fresh, history } from '../src/talk/m5c/ledger-model';
import {
  alternate, bits, common, commonBalances, firstMiss, honest, input, laterRewards, meetsTarget,
  original, raceCounts, restored, rewardBeforeRow, rewardCandidate, rewardMined, rewardMisses, rewardOpening,
  rewrite, rewritten, type MiningBlock,
} from '../src/talk/m5f/fixtures';

const ids = [
  '22-linked-history', '22-nonce-target', '22-first-mined', '22-mined-chain',
  '22-tampered', '22-first-remined', '22-next-remine', '22-exhausted',
  '23-race-start', '23-one-confirmation', '23-honest-lead', '23-charlie-catches-up',
  '23-three-confirmations', '23-gap-opens', '23-gap-widens', '23-six-confirmations', '23-honest-lead-final',
  '24-neat-stack', '24-messy-stack', '24-overwhelmed', '24-buried', '24-surrender',
  '25-mountain', '25-candidate', '25-reward-row', '25-mined', '25-accepted', '25-back-to-work', '25-growing-rewards',
  '26-logo', '26-congratulations', '26-bitcoin',
];
const representative = ['22-next-remine', '23-honest-lead-final', '24-surrender', '25-mined', '26-bitcoin'];
const mismatches = (chain: readonly MiningBlock[]) => chain.slice(1)
  .flatMap((child, index) => child.previous === chain[index].digest ? [] : [child.number]);

test('the authored catalogue binds unique digests to complete inputs and repairs immediate links only', () => {
  const catalogue = [...restored, firstMiss, ...original, ...rewrite.flat(), ...honest, ...alternate,
    ...rewardMisses, rewardMined, ...laterRewards];
  expect(new Set(catalogue.map(input)).size).toBe(catalogue.length);
  expect(new Set(catalogue.map(({ digest }) => digest)).size).toBe(catalogue.length);
  for (const { digest } of catalogue) {
    expect(digest).toMatch(/^[0-9a-f]{6}$/);
    expect(meetsTarget(digest)).toBe(bits(digest!).startsWith('0000'));
  }
  expect(mismatches(original)).toEqual([]);
  expect(original.every(({ digest }) => meetsTarget(digest))).toBe(true);
  expect(meetsTarget(firstMiss.digest)).toBe(false);
  expect(rewrite[0][0].nonce).toBe(original[0].nonce);
  for (const [index, trials] of rewrite.entries()) {
    expect(trials.map(({ digest }) => meetsTarget(digest))).toEqual([...trials.slice(1).map(() => false), true]);
    expect(mismatches(rewritten(index, false))).toEqual(index < 3 ? [index + 2] : []);
    expect(mismatches(rewritten(index, true))).toEqual(index < 3 ? [index + 2] : []);
  }
  expect(history(fresh, original.flatMap(({ rows }) => rows)).rejected).toEqual([]);
  expect(history(fresh, rewritten(3, true).flatMap(({ rows }) => rows)).rejected[0].reason).toBe('No signature');
});

test('valid branches share a parent and the first post-fork payment counts toward confirmation depth', () => {
  for (const branch of [honest, alternate]) {
    expect(mismatches([...common, ...branch])).toEqual([]);
    expect(branch.every(({ digest }) => meetsTarget(digest))).toBe(true);
    expect(history(commonBalances, branch.flatMap(({ rows }) => rows)).rejected).toEqual([]);
  }
  expect(history(commonBalances, [...honest[0].rows, ...alternate[0].rows]).rejected[0].reason).toBe('Insufficient balance');
  expect(raceCounts.map(([left, right]) => Math.sign(left - right))).toEqual([0, 1, 0, 1, 1, 1]);
  expect([1, 3, 6].map((count) => honest[count - 1].number - honest[0].number + 1)).toEqual([1, 3, 6]);
});

test('mined reward includes the successor reference and a subsidy that debits no account', () => {
  expect(rewardCandidate.previous).toBe(honest.at(-1)?.digest);
  expect(rewardCandidate.rows).toEqual(rewardBeforeRow.rows);
  expect(input(rewardCandidate)).not.toBe(input(rewardBeforeRow));
  expect(rewardBeforeRow.reward).toBeUndefined();
  expect(rewardCandidate.nonce).toBeUndefined();
  expect(rewardMined.reward).toEqual({ to: 'Alice', amount: 10 });
  expect(rewardMisses.every(({ digest }) => !meetsTarget(digest))).toBe(true);
  expect(meetsTarget(rewardMined.digest)).toBe(true);
  expect(laterRewards.every(({ digest }) => meetsTarget(digest))).toBe(true);
  expect(mismatches([...honest.slice(-1), rewardMined, ...laterRewards])).toEqual([]);
  const payments = history(rewardOpening, rewardMined.rows);
  expect(payments.rejected).toEqual([]);
  expect(payments.balances).toEqual({ Alice: 9, Bob: 8, Charlie: 3 });
  expect([rewardMined, ...laterRewards].reduce((sum, block) => sum + block.reward!.amount, 0)).toBe(30);
});

for (const [width, height] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`32 stills navigate offline and fit at ${width} × ${height}`, async ({ page, context, baseURL, browserName }) => {
    const origin = new URL(baseURL!).origin;
    const failures: string[] = [];
    await context.route('**/*', (route) => {
      const url = route.request().url();
      if (new URL(url).origin === origin) return route.continue();
      failures.push(url);
      return route.abort();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      failures.push(socket.url());
      void socket.close();
    });
    context.on('weberror', (error) => failures.push(error.error().message));
    await page.setViewportSize({ width, height });
    await page.goto('/talk/m5f/');
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    expect(await page.locator('.slides > section').evaluateAll((sections) => sections.map(({ id }) => id))).toEqual(ids);
    await expect(page.locator('.presenter, .slides button, .slides input')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);

    const current = page.locator('section.present');
    let mountain: string | undefined;
    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(current).toHaveAttribute('id', id);
      const sheet = current.locator('.talk-sheet');
      const bounds = await sheet.evaluate((element) => {
        const { x, y, right, bottom } = element.getBoundingClientRect();
        const heading = element.querySelector('h1')?.getBoundingClientRect();
        const { x: artX, y: artY, width: artWidth, height: artHeight } =
          element.querySelector<SVGSVGElement>('svg.art')!.getBBox();
        return { x, y, right, bottom, headingLeft: heading?.left ?? x,
          headingRight: heading?.right ?? right, art: [artX, artY, artX + artWidth, artY + artHeight] };
      });
      expect(bounds.x, id).toBeGreaterThanOrEqual(-1);
      expect(bounds.y, id).toBeGreaterThanOrEqual(-1);
      expect(bounds.right, id).toBeLessThanOrEqual(width + 1);
      expect(bounds.bottom, id).toBeLessThanOrEqual(height + 1);
      expect(bounds.headingLeft, id).toBeGreaterThanOrEqual(bounds.x);
      expect(bounds.headingRight, id).toBeLessThanOrEqual(bounds.right);
      expect(bounds.art[0], id).toBeGreaterThan(25);
      expect(bounds.art[1], id).toBeGreaterThan(120);
      expect(bounds.art[2], id).toBeLessThan(1575);
      expect(bounds.art[3], id).toBeLessThan(890);
      await expect(sheet).not.toContainText(/illustrative example|fixed data/i);
      if (!id.startsWith('26')) {
        await expect(sheet).not.toContainText(/Bitcoin/i);
        await expect(sheet.locator('[data-bitcoin-logo]')).toHaveCount(0);
      }
      if (id.startsWith('24')) {
        const counts = [3, 20, 50, 240, 240];
        const beat = ids.indexOf(id) - ids.indexOf('24-neat-stack');
        await expect(sheet.locator('[data-box]')).toHaveCount(counts[beat]);
        await expect(sheet.locator('h1')).toHaveCount(beat === 4 ? 1 : 0);
        await expect(sheet.locator('[data-workstation]')).toHaveCount(beat < 3 ? 1 : 0);
        await expect(sheet.locator('[data-flag]')).toHaveCount(beat === 4 ? 1 : 0);
      }
      if (id === '24-surrender') mountain = await sheet.locator('[data-mountain]').innerHTML();
      if (id === '25-mountain') expect(await sheet.locator('[data-mountain]').innerHTML()).toBe(mountain);
      if (id.startsWith('26')) {
        await expect(sheet.locator('[data-bitcoin-logo]')).toHaveCount(1);
        await expect(sheet.locator('h1')).toHaveCount(0);
        await expect(sheet.locator('.reveal-first')).toHaveCount(id === '26-logo' ? 0 : 1);
        await expect(sheet.locator('.reveal-last')).toHaveCount(id === '26-bitcoin' ? 1 : 0);
      }
      if (browserName === 'firefox' && (width === 1920 || representative.includes(id))) {
        await page.screenshot({ path: `test-results/visual-review/m5f-staging/${width}x${height}/${id}.png` });
      }
    }
    await page.keyboard.press('ArrowLeft');
    await expect(current).toHaveAttribute('id', '26-congratulations');
    await expect(page).toHaveURL(/#\/26-congratulations$/);
    await page.reload();
    await expect(current).toHaveAttribute('id', '26-congratulations');
    expect(failures).toEqual([]);
  });
}
