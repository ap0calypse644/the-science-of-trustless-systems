import { fresh, history, line, toAlice, toBob } from '../m5c/ledger-model';

type Payment = Parameters<typeof history>[1][number];
export interface Block {
  readonly number: number;
  readonly rows: readonly Payment[];
  readonly previous: string | null;
  readonly digest?: string;
}

function page(amount: number, number: number): Block {
  const rows: Payment[] = [
    { id: `${number}-1`, from: 'Charlie', to: 'Alice', amount, signed: true },
    { id: `${number}-2`, from: 'Alice', to: 'Bob', amount, signed: true },
    { id: `${number}-3`, from: 'Bob', to: 'Charlie', amount, signed: true },
  ];
  return { number, rows, previous: null };
}

export const pages = [page(4, 1), page(7, 2), page(3, 3), page(6, 4)];

const first = pages[0];
const changedPayment = { ...first.rows[0], amount: 9, signed: false } as const;
const addedPayment = { id: 'added', from: 'Charlie', to: 'Bob', amount: 2, signed: false } as const;

export const unlinkedEdit: readonly Block[] = [
  { ...first, rows: [changedPayment, addedPayment, first.rows[2]] }, ...pages.slice(1),
];

// Authored digest prefixes. Each row of this catalogue names one complete
// fixture input through its ordered transactions and predecessor reference.
const prefixes = ['81cf2a', '5e0ab3', 'b3427d', 'c6f91e'] as const;
export const linked = pages.map((block, index): Block => ({
  ...block, previous: prefixes[index - 1] ?? null, digest: prefixes[index],
}));
export const edited: readonly Block[] = [
  { ...linked[0], rows: [changedPayment, ...first.rows.slice(1)], digest: '9bf205' },
  ...linked.slice(1),
];
export const repaired: readonly Block[] = [
  edited[0], { ...edited[1], previous: edited[0].digest!, digest: '4dd807' }, ...edited.slice(2),
];

export function blockInput(block: Block): string {
  return JSON.stringify([block.previous, block.rows]);
}

export function linkMatches(parent: Block, child: Block): boolean {
  return parent.digest !== undefined && child.previous === parent.digest;
}

export const common = linked.slice(0, 3);
const previous = common[common.length - 1].digest!;
export const fork = [
  { number: 4, rows: [toAlice], previous, digest: 'ad78e2' },
  { number: 4, rows: [toBob], previous, digest: '32c4fd' },
] as const satisfies readonly Block[];

export const commonState = history(fresh, common.flatMap(({ rows }) => rows)).balances;
export const forkViews = fork.map(({ rows }) => history(commonState, rows));

export function transaction(payment: Payment): string {
  return line(payment).replace(' pays ', ' → ');
}
