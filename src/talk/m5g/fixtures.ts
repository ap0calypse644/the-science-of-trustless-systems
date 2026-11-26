export const validators = [
  { id: 'alice', name: 'Alice', power: 35 },
  { id: 'bob', name: 'Bob', power: 35 },
  { id: 'charlie', name: 'Charlie', power: 30 },
] as const;

export type Validator = (typeof validators)[number];
export type ValidatorId = Validator['id'];

export const candidate = { block: 'B', height: 13, round: 0 } as const;
export const proposal = { from: 'alice', recipients: ['bob', 'charlie'], ...candidate } as const;
export const voters = ['alice', 'bob'] as const;

export const prevotes = voters.map((from) => ({ from, kind: 'Prevote', signed: true, ...candidate }) as const);
export const precommits = voters.map((from) => ({ from, kind: 'Precommit', signed: true, ...candidate }) as const);
export type Vote = (typeof prevotes)[number] | (typeof precommits)[number];

// Authored observations, one own vote and one peer vote at each honest node.
export const observations = { alice: ['alice', 'bob'], bob: ['bob', 'alice'] } as const;
export const totalPower = 100;
export const matchingPower = 70;

export const phases = ['propose', 'prevote', 'precommit', 'commit'] as const;
export type Phase = (typeof phases)[number];
