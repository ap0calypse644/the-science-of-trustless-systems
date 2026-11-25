export const checkpoints = [
  { time: 0, label: 'Two hilltops' },
  { time: 3, label: 'Send the plan' },
  { time: 7, label: 'No arrival' },
  { time: 11, label: 'Retry delivered' },
  { time: 14, label: 'Acknowledgment sent' },
  { time: 18, label: 'Acknowledgment lost' },
  { time: 23, label: 'One more acknowledgment' },
  { time: 32, label: 'The final message' },
] as const;

type General = 'alice' | 'bob';
type Delivery = 'in-flight' | 'lost' | 'delivered';
type Message = 'plan' | 'retry' | 'ack' | 'confirm' | 'receipt' | 'final';
type Thought = readonly [string, string];

interface Event {
  message: Message;
  from: General;
  delivery: Delivery;
}

interface Run {
  events: readonly Event[];
  segment: 'original' | 'alternate';
  caption: string;
  picture?: 'opening' | 'retry-arrives' | 'ack-arrives' | 'couriers';
  trip?: { from: General; start: number; end: number; words: string; lost?: boolean };
}

interface LocalEvidence {
  sent: readonly Message[];
  received: readonly Message[];
}

const original = 'original';
const alternate = 'alternate';
const plan = { message: 'plan', from: 'alice', delivery: 'lost' } as const;
const retry = { message: 'retry', from: 'alice', delivery: 'delivered' } as const;
const ack = { message: 'ack', from: 'bob', delivery: 'delivered' } as const;
const confirm = { message: 'confirm', from: 'alice', delivery: 'delivered' } as const;
const receipt = { message: 'receipt', from: 'bob', delivery: 'delivered' } as const;
const final = { message: 'final', from: 'alice', delivery: 'delivered' } as const;

const secondRun = [plan, retry, ack] as const;
const commonPrefix = [...secondRun, confirm, receipt] as const;

export const finalRuns = {
  delivered: [...commonPrefix, final],
  lost: [...commonPrefix, { ...final, delivery: 'lost' }],
} as const;

export function localEvidence(events: readonly Event[], general: General): LocalEvidence {
  return {
    sent: events.filter(({ from }) => from === general).map(({ message }) => message),
    received: events.filter(({ from, delivery }) => from !== general && delivery === 'delivered').map(({ message }) => message),
  };
}

function thought(evidence: LocalEvidence, general: General): Thought {
  const { sent, received } = evidence;
  if (general === 'alice') {
    if (sent.includes('final')) return ['I sent my reply.', 'Did Bob get it?'];
    if (received.includes('receipt')) return ['Bob knew I got it.', 'Should I reply again?'];
    if (sent.includes('confirm')) return ['I sent confirmation.', 'Did Bob get it?'];
    if (received.includes('ack')) return ['Bob received', 'my plan.'];
    if (sent.includes('retry')) return ['I sent the plan again.', 'Did Bob get it?'];
    if (sent.includes('plan')) return ['I sent the plan.', 'Did Bob get it?'];
  } else {
    if (received.includes('final')) return ['Alice got my reply.', 'She just confirmed it.'];
    if (sent.includes('receipt')) return ['Did Alice get', 'my latest reply?'];
    if (received.includes('confirm')) return ['Alice got my reply.', 'Should I confirm?'];
    if (sent.includes('ack')) return ['Did Alice get', 'my reply?'];
    if (received.includes('retry')) return ['Alice’s plan arrived.', 'Sunrise it is.'];
    return ['We must act together.', 'When should we move?'];
  }
  return ['We have to move', 'at the same time.'];
}

const frames: readonly (Run & { at: number })[] = [
  { at: 0, segment: original, events: [], picture: 'opening', caption: 'Both together, or neither.' },
  { at: 3, segment: original, events: [{ ...plan, delivery: 'in-flight' }],
    caption: 'Will Charlie make it?', trip: { from: 'alice', start: 3, end: 7, lost: true, words: 'Attack at sunrise!' } },
  { at: 7, segment: original, events: [plan], caption: 'The first plan is lost.',
    trip: { from: 'alice', start: 8.2, end: 11, words: 'Attack at sunrise!' } },
  { at: 11, segment: original, events: [plan, retry], picture: 'retry-arrives', caption: 'The retry reaches Bob.' },
  { at: 14, segment: original, events: [plan, retry, { ...ack, delivery: 'in-flight' }],
    caption: 'Will Alice hear back?', trip: { from: 'bob', start: 14, end: 18, lost: true, words: 'Agreed!' } },
  { at: 18, segment: original, events: [plan, retry, { ...ack, delivery: 'lost' }],
    caption: 'Bob’s acknowledgment is lost.' },
  { at: 23, segment: alternate, events: secondRun, picture: 'ack-arrives', caption: 'This time, Bob’s reply reaches Alice.' },
  { at: 24.4, segment: alternate, events: [...secondRun, { ...confirm, delivery: 'in-flight' }],
    caption: 'Alice confirms that she heard back.',
    trip: { from: 'alice', start: 24.4, end: 26.1, words: 'I got your reply!' } },
  { at: 26.1, segment: alternate, events: [...secondRun, confirm, { ...receipt, delivery: 'in-flight' }],
    caption: 'Bob acknowledges her confirmation.',
    trip: { from: 'bob', start: 26.1, end: 28, words: 'I got yours too!' } },
  { at: 28, segment: alternate, events: commonPrefix, picture: 'couriers',
    caption: 'An acknowledgment of the acknowledgment?' },
  { at: 29.7, segment: alternate, events: [...commonPrefix, { ...final, delivery: 'in-flight' }],
    caption: 'Alice sends one final reply.', trip: { from: 'alice', start: 29.7, end: 32, words: 'One last reply…' } },
  { at: 32, segment: alternate, events: finalRuns.lost, caption: 'Knowing isn’t enough…' },
];

export function frameAt(time: number) {
  const next = frames.findIndex(({ at }) => at > time + 0.000001);
  const index = next < 0 ? frames.length - 1 : Math.max(0, next - 1);
  const frame = frames[index];
  const retrying = index === 2 && time >= 8.2;
  const events: readonly Event[] = retrying ? [plan, { ...retry, delivery: 'in-flight' }] : frame.events;
  const ending = index === frames.length - 1;
  return {
    ...frame,
    index,
    retrying,
    ending,
    caption: retrying ? 'Alice tries again.' : frame.caption,
    alice: thought(localEvidence(events, 'alice'), 'alice'),
    bob: thought(localEvidence(events, 'bob'), 'bob'),
    comparison: ending ? {
      delivered: thought(localEvidence(finalRuns.delivered, 'bob'), 'bob'),
      lost: thought(localEvidence(finalRuns.lost, 'bob'), 'bob'),
    } : undefined,
  };
}

export type BattlefieldFrame = ReturnType<typeof frameAt>;
