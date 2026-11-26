import type { TalkSlide } from '../slides';
import { electricity, round, sheet, stake } from './art';
import { phases, precommits, prevotes } from './fixtures';

const billTitle = 'Do We Really Need to Do All This Work?';
const stakeTitle = 'What If We Put Something at Stake?';
const voteTitle = 'Let’s Vote on It';
const consensus = 'https://github.com/cometbft/cometbft/blob/main/spec/consensus/consensus.md';
const signing = 'https://github.com/cometbft/cometbft/blob/main/spec/consensus/signing.md';

function still(id: string, title: string, description: string, art: string, style: string, notes: string): TalkSlide {
  return { id, composition: sheet(title, description, art, style), notes: `${description}\n\n${notes}` };
}

const bill = still('27-electricity-bill', billTitle,
  'In front of stacked server racks, Alice holds an oversized electricity bill while Bob checks the numbers and Charlie mines another block.',
  electricity(), 'electricity-sheet',
  'Tell the audience the $ 4972 bill is fictional and chosen for the joke. The Sam Altman cameo and its “More RAM?” line are fictional satire. Photo head adapted from “Sam Altman” by Village Global, CC BY 2.0 (https://www.flickr.com/photos/villageglobal/52530764101/). Ask whether making participants expend computation is the only way to make attacks costly.');

const stakeNotes = `Disclose the authored amounts. These separate boxes are a metaphor for protocol bonding. Bonded funds need not be spent or handed to a custodian. In this example voting power is proportional to bonded stake. Proposer selection, vote weighting and the rules by which nodes agree are separate decisions. Some protocols put bonded funds at risk for provable faults. Leave that as a verbal aside. See CometBFT's description of proposer selection and voting power (${consensus}).`;

const stakeBeats = [
  ['coins', 'Alice and Bob each bring 35 gold coins. Charlie brings 30.'],
  ['bonded', 'Each participant bonds their own coins, pictured in a separate transparent lockbox.'],
  ['voting-power', 'Read the three weights aloud. Alice has 35%, Bob 35%, Charlie 30%.'],
  ['reveal', 'Reveal Proof of Stake after the weights are visible.'],
] as const;

const votingNotes = `Tell the audience this is one authored successful Tendermint/CometBFT-style round, with a fixed validator set. Other proof-of-stake systems can use different consensus rules. Alice is the designated proposer at height 13, round 0. Receiving the proposal does not itself produce a vote. An honest validator checks the candidate before signing. A vote is tied to a type, block, height, round and signer. Each honest validator observes a distinct local set with its own vote once and the other honest validator’s vote once. Charlie sends no vote of either type. His power remains in the 100% denominator. Silence differs from a signed nil vote.

Alice and Bob each lock when they see more than two-thirds of total voting power in matching prevotes for B in the same round, then send signed precommits. They each commit B locally after seeing matching precommits of more than two-thirds and having the block. Charlie's ledger is shown before any later catch-up.

Safety assumes less than one-third Byzantine voting power. Progress needs timely delivery among enough honest validators, as under eventual synchrony. Delays, nil votes or insufficient matching votes can lead to timeouts and later rounds. Rules for locks across rounds and proposal justifications are outside this one successful round. The arrows summarize peer broadcasts and gossip rather than network wiring.

Primary sources: ${consensus} and ${signing}.`;

const voteDescriptions = [
  'Alice proposes Block B and sends it to Bob and Charlie. Everyone retains a separate ledger.',
  'Alice and Bob each validate B and broadcast signed prevotes to their peers. Charlie withholds.',
  'Alice and Bob each observe 70% matching prevotes, lock on B for this round and broadcast signed precommits.',
  'Alice and Bob each observe 70% matching precommits and append B to their own ledger. Charlie is disappointed.',
] as const;

export const stills: readonly TalkSlide[] = [
  bill,
  ...stakeBeats.map(([id, description], index) =>
    still(`28-${id}`, stakeTitle, description, stake(index), 'bonding-sheet', stakeNotes)),
  ...phases.map((phase, index) => still(`29-${phase}`, voteTitle, voteDescriptions[index],
    round(phase, phase === 'prevote' ? prevotes : phase === 'precommit' ? precommits : []), 'voting-sheet', votingNotes)),
];
