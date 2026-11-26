import { expect, test } from '@playwright/test';
import { candidate, matchingPower, observations, precommits, prevotes, proposal,
  totalPower, validators } from '../src/talk/m5g/fixtures';

const route = '/talk/m5g/';
const folder = 'test-results/visual-review/m5g-staging';
const ids = ['27-electricity-bill', '28-coins', '28-bonded', '28-voting-power', '28-reveal',
  '29-propose', '29-prevote', '29-precommit', '29-commit'];
const representative = ['27-electricity-bill', '28-reveal', '29-precommit', '29-commit'];

test('the same authored round counts distinct signed votes against all bonded power', () => {
  expect(validators.map(({ power }) => power)).toEqual([35, 35, 30]);
  expect(validators.reduce((sum, { power }) => sum + power, 0)).toBe(totalPower);
  expect(proposal).toEqual({ from: 'alice', recipients: ['bob', 'charlie'], ...candidate });
  for (const [kind, votes] of [['Prevote', prevotes], ['Precommit', precommits]] as const) {
    expect(votes.map(({ from }) => from)).toEqual(['alice', 'bob']);
    expect(votes.every((vote) => vote.kind === kind && vote.signed &&
      vote.block === candidate.block && vote.height === candidate.height && vote.round === candidate.round)).toBe(true);
    for (const [owner, seen] of Object.entries(observations)) {
      expect(seen.filter((id) => id === owner)).toHaveLength(1);
      expect(new Set(seen).size).toBe(seen.length);
      expect(seen.every((id) => votes.some(({ from }) => from === id))).toBe(true);
      const local = validators.filter(({ id }) => seen.some((signer) => signer === id))
        .reduce((sum, { power }) => sum + power, 0);
      expect(local).toBe(matchingPower);
      expect(local * 3).toBeGreaterThan(totalPower * 2);
    }
  }
});

for (const [width, height] of [[1920, 1080], [1280, 720], [1024, 768]]) {
  test(`all nine holds work offline and fit at ${width} × ${height}`, async ({ page, context, baseURL, browserName }) => {
    const origin = new URL(baseURL!).origin;
    const failures: string[] = [];
    await context.route('**/*', (request) => {
      const url = request.request().url();
      if (new URL(url).origin === origin) return request.continue();
      failures.push(url);
      return request.abort();
    });
    await context.routeWebSocket(/.*/, (socket) => {
      failures.push(socket.url());
      void socket.close();
    });
    context.on('weberror', (error) => failures.push(error.error().message));
    await page.setViewportSize({ width, height });
    await page.goto(route);
    await expect(page.locator('.reveal')).toHaveClass(/ready/);
    const current = page.locator('section.present');
    expect(await page.locator('.slides > section').evaluateAll((nodes) => nodes.map(({ id }) => id))).toEqual(ids);
    await expect(page.locator('.presenter, .slides button, .slides input')).toHaveCount(0);
    await page.evaluate(() => document.fonts.ready);
    const sheet = current.locator('.stake-sheet');
    for (const [index, id] of ids.entries()) {
      if (index) await page.keyboard.press('ArrowRight');
      await expect(current).toHaveAttribute('id', id);
      const bounds = await sheet.evaluate((element) => {
        const canvas = element.getBoundingClientRect();
        const heading = element.querySelector('h1')!.getBoundingClientRect();
        const art = element.querySelector<SVGSVGElement>('svg')!.getBBox();
        return { canvas: [canvas.x, canvas.y, canvas.right, canvas.bottom],
          margins: [heading.x - canvas.x, canvas.right - heading.right],
          art: [art.x, art.y, art.x + art.width, art.y + art.height],
          background: getComputedStyle(element).backgroundColor };
      });
      expect(bounds.canvas[0]).toBeGreaterThanOrEqual(-1);
      expect(bounds.canvas[1]).toBeGreaterThanOrEqual(-1);
      expect(bounds.canvas[2]).toBeLessThanOrEqual(width + 1);
      expect(bounds.canvas[3]).toBeLessThanOrEqual(height + 1);
      expect(Math.min(...bounds.margins), id).toBeGreaterThan(8);
      expect(bounds.art[0], id).toBeGreaterThan(35);
      expect(bounds.art[1], id).toBeGreaterThan(111);
      expect(bounds.art[2], id).toBeLessThan(1565);
      expect(bounds.art[3], id).toBeLessThan(885);
      expect(bounds.background).toBe('rgb(255, 255, 255)');
      if (id.startsWith('27')) {
        await expect(sheet.locator('[data-electricity-bill]')).toContainText('99,999');
        await expect(sheet.locator('[data-satire]')).toContainText('Fictional cameo');
        await expect(sheet.locator('image')).toHaveCount(0);
      }
      if (id.startsWith('28')) {
        const stake = sheet.locator('[data-stake]');
        await expect(stake).toHaveCount(3);
        for (const { id: owner, power } of validators) {
          const group = sheet.locator(`[data-stake="${owner}"]`);
          await expect(group.locator('.coin')).toHaveCount(power);
          await expect(group.locator('.amount')).toHaveText(`${power} coins`);
          await expect(group.locator('[data-lockbox]')).toHaveCount(id === '28-coins' ? 0 : 1);
        }
        await expect(sheet.locator('.weight')).toHaveCount(index >= 3 ? 3 : 0);
        await expect(sheet.locator('.stake-reveal')).toHaveCount(id === '28-reveal' ? 1 : 0);
      }
      if (id.startsWith('29')) {
        const phase = id.slice(3);
        await expect(sheet.locator('[data-phase]')).toHaveAttribute('data-height', String(candidate.height));
        await expect(sheet.locator('[data-phase]')).toHaveAttribute('data-round', String(candidate.round));
        await expect(sheet.locator('.mini-ledger')).toHaveCount(3);
        await expect(sheet.locator('[data-validator="charlie"] .node-name')).toHaveText('Charlie · 30%');
        const disjoint = await sheet.locator('[data-validator]').evaluateAll((nodes) => nodes.every((node) => {
          const actor = node.querySelector('.person')!.getBoundingClientRect();
          const ledger = node.querySelector('.mini-ledger')!.getBoundingClientRect();
          return [...node.querySelectorAll('.local-label')].every((label) => {
            const text = label.getBoundingClientRect();
            const clearsLedger = text.right < ledger.left || text.bottom < ledger.top || text.top > ledger.bottom;
            return actor.right < text.left && clearsLedger;
          });
        }));
        expect(disjoint, id).toBe(true);
        const outgoing = await sheet.locator('[data-edge]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-edge')));
        const proposalEdges = ['alice-bob', 'alice-charlie'];
        expect(outgoing).toEqual(phase === 'propose' ? proposalEdges : phase === 'commit' ? []
          : [...proposalEdges, 'bob-alice', 'bob-charlie']);
        await expect(sheet.locator('[data-vote][data-signed="true"]')).toHaveCount(
          phase === 'prevote' || phase === 'precommit' ? 2 : 0);
        const local = sheet.locator('[data-local-count]');
        await expect(local).toHaveCount(phase === 'precommit' || phase === 'commit' ? 2 : 0);
        if (phase === 'precommit' || phase === 'commit') {
          await expect(local.locator('.count-total')).toHaveText(['70% of 100%', '70% of 100%']);
          await expect(local.first()).toHaveAttribute('data-count-type', phase === 'precommit' ? 'prevote' : 'precommit');
        }
        await expect(sheet.locator('[data-committed-block="B"]')).toHaveCount(phase === 'commit' ? 2 : 0);
      }
      if (browserName === 'firefox' && (width === 1920 || representative.includes(id))) {
        await page.screenshot({ path: `${folder}/${width}x${height}/${id}.png` });
      }
    }
    await page.keyboard.press('ArrowLeft');
    await expect(current).toHaveAttribute('id', '29-precommit');
    await expect(page).toHaveURL(/#\/29-precommit$/);
    await page.reload();
    await expect(current).toHaveAttribute('id', '29-precommit');
    await page.goto(`${route}#/28-bonded`);
    await expect(current).toHaveAttribute('id', '28-bonded');
    expect(failures).toEqual([]);
  });
}

test('production remains 26 sheets and the prior staging route is available', async ({ page }) => {
  await page.goto('/talk/?print');
  await expect(page.locator('.print-deck .talk-sheet')).toHaveCount(26);
  await expect(page.locator('.print-deck section').last()).toHaveAttribute('id', '26-bitcoin-reveal');
  await page.goto('/talk/#/26-bitcoin-reveal');
  await expect(page.locator('section.present')).toHaveAttribute('id', '26-bitcoin-reveal');
  await expect(page.locator('.slides > section')).toHaveCount(26);
  await page.goto('/talk/m5f/#/26-bitcoin');
  await expect(page.locator('section.present')).toHaveAttribute('id', '26-bitcoin');
});
