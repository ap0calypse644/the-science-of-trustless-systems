import { fresh, history, toAlice, toBob } from '../m5c/ledger-model';
import { linked, pages, type Block } from '../m5e/fixtures';

type Payment = Block['rows'][number];
interface Reward {
  readonly to: 'Alice';
  readonly amount: number;
}
export interface MiningBlock extends Block {
  readonly nonce?: number;
  readonly reward?: Reward;
}

export function meetsTarget(digest?: string): boolean {
  return digest?.startsWith('0') ?? false;
}

export function bits(digest: string): string {
  return Number.parseInt(digest.slice(0, 2), 16).toString(2).padStart(8, '0');
}

export function input(block: MiningBlock): string {
  return JSON.stringify([block.previous, block.nonce, block.reward, block.rows]);
}

// These are authored prefixes associated with complete inputs. The first
// hex digit represents the four target bits on the slide.
function attempt(block: MiningBlock, nonce: number, digest: string): MiningBlock {
  return { ...block, nonce, digest };
}

function extend(block: MiningBlock, previous: MiningBlock): MiningBlock {
  return { ...block, previous: previous.digest!, nonce: undefined, digest: undefined };
}

export const restored = linked;
export const firstMiss = attempt(pages[0], 6, 'a6b18e');
const first = attempt(pages[0], 7, '0a31be');
const second = attempt(extend(pages[1], first), 18, '02f5c1');
const third = attempt(extend(pages[2], second), 31, '0b672d');
const fourth = attempt(extend(pages[3], third), 42, '07e39a');
export const original = [first, second, third, fourth];

const changed = { ...first, rows: [{ ...first.rows[0], amount: 9, signed: false }, ...first.rows.slice(1)] };
const firstRepair = [attempt(changed, 7, '9e72ac'), attempt(changed, 8, 'c378d5'), attempt(changed, 9, '0d91ab')];
const secondInput = extend(second, firstRepair[2]);
const secondRepair = [attempt(secondInput, 18, 'e32f9d'), attempt(secondInput, 19, '41ba76'), attempt(secondInput, 20, '03cb78')];
const thirdInput = extend(third, secondRepair[2]);
const thirdRepair = [attempt(thirdInput, 31, 'd47563'), attempt(thirdInput, 32, '0184ef')];
const fourthInput = extend(fourth, thirdRepair[1]);
const fourthRepair = [attempt(fourthInput, 42, '6a321f'), attempt(fourthInput, 45, '05d2c8')];
export const rewrite = [firstRepair, secondRepair, thirdRepair, fourthRepair];

export function rewritten(step: number, solved: boolean): readonly MiningBlock[] {
  return original.map((block, index) => {
    const attempts = rewrite[index];
    const last = attempts.length - 1;
    if (index < step || (index === step && solved)) return attempts[last];
    return index === step ? attempts[0] : block;
  });
}

export const common = original.slice(0, 3);
export const commonBalances = history(fresh, common.flatMap(({ rows }) => rows)).balances;

function branch(payment: Payment, prefixes: readonly string[], nonce: number, close: readonly Payment[] = []): readonly MiningBlock[] {
  return prefixes.map((digest, index) => ({
    number: index + 4, previous: prefixes[index - 1] ?? common[2].digest!,
    rows: index === 0 ? [payment] : index === prefixes.length - 1 ? close : [], nonce: nonce + index, digest,
  }));
}

export const honest = branch(toAlice, ['0ef102', '01d7ab', '029518', '06afc3', '0ce513',
  '0f81d6', '00a59c', '0b34c0', '0ae68b'], 50, [
  { id: 'bob-earns', from: 'Alice', to: 'Bob', amount: 10, signed: true },
]);
export const alternate = branch(toBob, ['0ab6c0', '04e1a8', '02cd47', '0b713a'], 70);
export const raceCounts = [[1, 1], [2, 1], [2, 2], [4, 2], [6, 3], [9, 4]] as const;

const candidate: MiningBlock = {
  number: 13, previous: honest[8].digest!, rows: [
    { id: 'reward-1', from: 'Bob', to: 'Charlie', amount: 5, signed: true },
    { id: 'reward-2', from: 'Alice', to: 'Bob', amount: 3, signed: true },
    { id: 'reward-3', from: 'Charlie', to: 'Alice', amount: 2, signed: true },
  ],
};
export const rewardOpening = history(commonBalances, honest.flatMap(({ rows }) => rows)).balances;
export const reward = { to: 'Alice', amount: 10 } as const;
export const rewardCandidate = { ...candidate, reward };
export const rewardMisses = [attempt(rewardCandidate, 81, '72cf4a'), attempt(rewardCandidate, 82, 'b5a30e')];
export const rewardMined = attempt(rewardCandidate, 83, '0c86a1');
export const laterRewards = [
  attempt(extend({ number: 14, previous: null, rows: [], reward }, rewardMined), 92, '0dbe82'),
  attempt({ number: 15, previous: '0dbe82', rows: [], reward }, 98, '034ed8'),
];
export const rewardBeforeRow = candidate;
