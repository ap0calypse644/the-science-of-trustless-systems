export const checkpoints = [
  { id: 'synced', time: 0, label: 'Synced' },
  { id: 'partition', time: 3, label: 'Partition' },
  { id: 'withdrawal', time: 6, label: 'Withdrawal' },
  { id: 'balance-inquiry', time: 11, label: 'Balance inquiry' },
  { id: 'choose-response', time: 14, label: 'Choose response' },
  { id: 'outcome', time: 17, label: 'Outcome' },
  { id: 'reconnect', time: 21, label: 'Reconnect' },
] as const;

export const choiceTime = checkpoints[4].time;
export const duration = checkpoints[6].time;
export type Choice = 'stale' | 'wait';
type Beat = typeof checkpoints[number]['id'];
export type Response = 'choice' | 'stale' | 'wait' | 'reconnected' | 'reconnected-stale' | 'print';

export interface BankFrame {
  id: Beat;
  label: string;
  partition: boolean;
  a: 0 | 1000;
  b: 0 | 1000;
  charlie: 'a' | 'b';
  dialogue?: string;
  cash?: boolean;
  response?: Response;
  read: 'none' | 'requested' | 'pending' | 'complete';
  returned?: 0 | 1000;
}

export function frameAt(time: number, choice: Choice | null): BankFrame {
  const elapsed = Math.min(time, choice === null ? choiceTime : duration);
  const next = checkpoints.findIndex((checkpoint) => checkpoint.time > elapsed + 0.000001);
  const { id, label } = checkpoints[next === -1 ? checkpoints.length - 1 : Math.max(0, next - 1)];
  const withdrawn = elapsed >= checkpoints[2].time - 0.000001;
  const requested = elapsed >= checkpoints[3].time - 0.000001;
  const outcome = id === 'outcome' || id === 'reconnect';
  const reconnected = id === 'reconnect';
  const returned = outcome && choice === 'stale' ? 1000
    : reconnected && choice === 'wait' ? 0 : undefined;

  return {
    id,
    label,
    partition: id !== 'synced' && !reconnected,
    a: withdrawn ? 0 : 1000,
    b: reconnected ? 0 : 1000,
    charlie: requested ? 'b' : 'a',
    dialogue: id === 'balance-inquiry' || id === 'choose-response' ? 'What’s my balance?' : undefined,
    cash: id === 'withdrawal',
    response: id === 'choose-response' ? 'choice'
      : reconnected ? (choice === 'wait' ? 'reconnected' : 'reconnected-stale')
        : outcome ? choice ?? undefined : undefined,
    read: returned !== undefined ? 'complete' : outcome ? 'pending' : requested ? 'requested' : 'none',
    returned,
  };
}
