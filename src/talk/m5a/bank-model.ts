export const checkpoints = [
  { id: 'synced', time: 0, label: 'Synced' },
  { id: 'partition', time: 3, label: 'Partition' },
  { id: 'withdrawal', time: 6, label: 'Withdrawal at A' },
  { id: 'balance-inquiry', time: 11, label: 'Balance inquiry · Predict' },
  { id: 'outcome-stale', time: 14, label: 'Stale reply' },
  { id: 'alternative', time: 17, label: 'Alternative run' },
  { id: 'outcome-wait', time: 20, label: 'Wait for sync' },
  { id: 'reconnect', time: 24, label: 'Reconnect' },
] as const;

export const inquiryTime = checkpoints[3].time;
export const duration = checkpoints[checkpoints.length - 1].time;
type Beat = typeof checkpoints[number]['id'];
export type BankResponse = 'stale' | 'alternative' | 'wait' | 'reconnected';

interface BankState {
  partition: boolean;
  a: 0 | 1000;
  b: 0 | 1000;
  charlie: 'a' | 'b';
  dialogue?: string;
  cash?: boolean;
  response?: BankResponse;
  read: 'none' | 'requested' | 'pending' | 'complete';
  returned?: 0 | 1000;
}

export interface BankFrame extends BankState {
  id: Beat;
  label: string;
}

const synced = { partition: false, a: 1000, b: 1000, charlie: 'a', read: 'none' } as const;
const partitioned = { ...synced, partition: true } as const;
const withdrawn = { ...partitioned, a: 0 } as const;
const inquiry = { ...withdrawn, charlie: 'b', read: 'requested', dialogue: 'What’s my balance?' } as const;

const states: Record<Beat, BankState> = {
  synced,
  partition: partitioned,
  withdrawal: { ...withdrawn, cash: true },
  'balance-inquiry': inquiry,
  'outcome-stale': { ...withdrawn, charlie: 'b', response: 'stale', read: 'complete', returned: 1000 },
  alternative: { ...inquiry, response: 'alternative' },
  'outcome-wait': { ...withdrawn, charlie: 'b', response: 'wait', read: 'pending' },
  reconnect: { partition: false, a: 0, b: 0, charlie: 'b', response: 'reconnected', read: 'complete', returned: 0 },
};

export function frameAt(time: number): BankFrame {
  const next = checkpoints.findIndex((checkpoint) => checkpoint.time > time + 0.000001);
  const { id, label } = checkpoints[next === -1 ? checkpoints.length - 1 : Math.max(0, next - 1)];
  return { id, label, ...states[id] };
}
