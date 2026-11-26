import type { TalkSlide } from '../slides';
import { character } from '../../illustration/character';
import { transaction } from '../m5e/fixtures';
import { attempts, block, box, chain, goldUnits, pile, sheet, target, text, workstation } from './art';
import {
  alternate, common, firstMiss, honest, original, raceCounts, restored, rewardBeforeRow,
  rewardCandidate, rewardMined, rewardMisses, rewrite, rewritten, type MiningBlock,
} from './fixtures';
import bitcoinLogo from './bitcoin.svg?url';

const disclosure = 'Tell the audience that the nonce attempts, digest prefixes and race outcomes are authored teaching examples.';
const paper = 'https://bitcoin.org/bitcoin.pdf';
const hashStandard = 'https://csrc.nist.gov/pubs/fips/180-4/upd1/final';
export const workTitle = 'Making History Expensive to Rewrite';
export const raceTitle = 'Which History Do We Believe?';
const pileTitle = 'Why Would Anybody Do All This Work?';
export const rewardTitle = 'Rewarding the Miner';

function still(id: string, title: string, description: string, art: string, notes: string, variant = ''): TalkSlide {
  return { id, composition: sheet(title, description, art, variant), notes };
}

const workNotes = `${disclosure}

Four leading zero bits correspond to a leading hexadecimal 0 in these prefixes. Changing committed content changes the input. The old nonce could pass by chance. A passing nonce never authorizes edited signed data. Charlie's changed row here has no valid signature. Slide 23 instead uses Charlie's own authorized conflicting payments.

Sources — Bitcoin whitepaper §§4–5 (${paper}) and NIST FIPS 180-4 (${hashStandard}).`;

function work(id: string, desc: string, art: string): TalkSlide {
  return still(`22-${id}`, workTitle, desc, art, `${desc}\n\n${workNotes}`);
}

export function aliceMining(blocks: readonly MiningBlock[], trials: readonly MiningBlock[]): string {
  return `<g data-work-chain>${chain(blocks, 276, 1.02)}</g>`
    + character('alice', { x: 262, y: 674, pose: 'point', expression: trials.length > 1 ? 'excited' : 'stand', scale: .95 })
    + target(985, 170) + (trials.length ? attempts(910, 650, trials) : '');
}

export const pending = restored.map((entry, index) => ({ ...entry, digest: undefined,
  previous: index === 0 ? null : index === 1 ? original[0].digest! : null,
}));
const firstOnly = [original[0], ...pending.slice(1)];

export function compareRewrite(step: number, solved: boolean, trials: readonly MiningBlock[], blocks = rewritten(step, solved)): string {
  const expression = step >= 2 ? 'frustrated' : solved ? 'excited' : 'suspicious';
  return text(800, 163, 'Original history', 'body')
    + `<g data-original-chain>${chain(original, 202, .88)}</g>`
    + text(800, 489, 'Charlie’s edited copy', 'body')
    + `<g data-edited-chain>${chain(blocks, 524, .88)}</g>`
    + character('charlie', { x: 135, y: 660, pose: step >= 3 ? 'facepalm' : 'point', expression, scale: 1.03 })
    + attempts(800, 802, trials)
    + text(1350, 822, 'Target 0000', 'code');
}

export const slide22 = [
  work('linked-history', 'Restore the original linked history from slide 20. This is a fresh example after the unresolved fork.',
    chain(restored, 350, 1.05, false)),
  work('nonce-target', 'Alice adds a nonce field. The first attempt misses. The later blocks await their mined predecessors.',
    aliceMining([firstMiss, ...pending.slice(1).map((entry) => ({ ...entry, previous: null }))], [firstMiss])),
  work('first-mined', 'Alice mines block 1, then puts its final mined digest into block 2 before attempting to mine block 2.',
    aliceMining(firstOnly, [firstMiss, original[0]])),
  work('mined-chain', 'Alice repeats the sequence through all four blocks. Each successor uses the final mined digest of its parent.',
    aliceMining(original, [original[3]])),
  work('tampered', 'Charlie edits the first payment. This time the old nonce misses, and only block 2 stores a stale predecessor.',
    compareRewrite(0, false, rewrite[0].slice(0, 2))),
  work('first-remined', 'Charlie finds nonce 9 after two misses and briefly smiles. The immediate successor still points to the original hash.',
    compareRewrite(0, true, rewrite[0])),
  work('next-remine', 'Charlie updates block 2 with the new hash of block 1 and starts re-mining. Block 3 now points to a stale hash.',
    compareRewrite(1, false, rewrite[1].slice(0, 2))),
  work('exhausted', 'Charlie solves blocks 2, 3 and 4 in order. The links now match, but the unauthorized edit still makes this copy invalid.',
    compareRewrite(3, true, rewrite[3]) + text(800, 876, '× Edited payment lacks authorization', 'warning-label')),
];

function tile(entry: MiningBlock, x: number, y: number, focus = false): string {
  return `<g data-race-block="${entry.digest}" data-parent="${entry.previous ?? ''}" transform="translate(${x} ${y})">
    ${focus ? '<rect class="focus-ring" x="-7" y="-8" width="108" height="70" rx="7"/>' : ''}
    ${box(91, 49, 9)}
    ${text(45, 32, entry.digest!, 'mini-hash')}
  </g>`;
}

export function race(countIndex: number, confirmations?: number, counts: readonly [number, number] = raceCounts[countIndex]): string {
  // Both lanes begin at the same tip. The annotated payment is in the first
  // block after the shared prefix at every count.
  const [raceHonestCount, otherCount] = counts;
  const honestCount = confirmations ?? raceHonestCount;
  const prefix = common.map((entry, i) => tile(entry, 55 + i * 110, 448)).join('');
  const lanes = [
    { blocks: honest.slice(0, honestCount), y: 316 },
    { blocks: alternate.slice(0, otherCount), y: 603 },
  ].map(({ blocks, y }, lane) => blocks.map((entry, i) =>
    tile(entry, 425 + i * 111, y, lane === 0 && i === 0 && confirmations !== undefined)).join('')).join('');
  const connectors = [316, 603].map((y, i) => {
    const count = i === 0 ? honestCount : otherCount;
    const level = y + 24;
    const lane = i === 0 ? honest : alternate;
    return `<path class="fork-line" data-race-link="${lane[0].digest}" d="M375 472H391Q403 472 403 460V${level}H425"/>
      ${Array.from({ length: count - 1 }, (_, j) => `<path class="fork-line" data-race-link="${lane[j + 1].digest}" d="M${525 + j * 111} ${level}h11"/>`).join('')}`;
  }).join('');
  const rule = countIndex >= 3 ? text(800, 822, 'Choose the valid chain with the greatest cumulative work', 'rule-label') : '';
  const confirmation = confirmations === undefined ? '' :
    `<path class="confirmation-bracket" d="M425 388v14H${425 + (confirmations - 1) * 111 + 91}v-14"/>
    ${text(457, 444, `${confirmations} confirmation${confirmations === 1 ? '' : 's'} · including the payment block`, 'rule-label lane-label')}
    ${text(457, 480, 'Reversal risk falls with depth and remains possible', 'body lane-label')}`;
  return text(800, 169, 'Honest majority of hash power · equal work per block', 'body')
    + text(206, 419, 'Shared history', 'body')
    + text(425, 248, `Honest branch · ${honestCount} ${honestCount === 1 ? 'block' : 'blocks'} beyond the fork`, 'rule-label lane-label')
    + text(425, 286, transaction(honest[0].rows[0]), 'body lane-label')
    + text(425, 535, `Charlie’s branch · ${otherCount} ${otherCount === 1 ? 'block' : 'blocks'} beyond the fork`, 'rule-label lane-label')
    + text(425, 570, transaction(alternate[0].rows[0]), 'body lane-label')
    + '<path class="fork-line" d="M155 472h10m100 0h10"/>'
    + connectors + prefix + lanes + rule + confirmation
    + character('charlie', { x: 1050, y: 601, pose: countIndex === 5 ? 'facepalm' : 'stand',
      expression: countIndex === 2 ? 'excited' : countIndex >= 4 ? 'frustrated' : 'suspicious',
      angles: { head: countIndex === 4 ? 12 : 0 }, scale: .92 })
    + character('alice', { x: 1490, y: 341, pose: 'stand',
      expression: honestCount >= 6 ? 'excited' : honestCount >= 3 ? 'stand' : 'confused',
      angles: { head: honestCount >= 6 ? -8 : honestCount >= 3 ? 0 : 9 }, facing: 'left', scale: .88 });
}

const raceNotes = `${disclosure}

Charlie signs both of his own conflicting payments. Each fits the common prefix independently. They cannot both be recorded. Nodes independently validate transactions and blocks before comparing chainwork. Equal difficulty lets the class compare block counts here. A tie does not settle the fork. Honest majority means a majority of hash power. Assuming ordinary propagation and continued honest majority, lucky catch-ups and reorganizations remain possible. A majority attacker could reorganize, censor or double-spend their own funds. They cannot forge signatures or make an invalid block acceptable to validating nodes.

Count the inclusion block as the first confirmation. Reversal risk falls with depth under these assumptions. Six has no universal safety guarantee. See Bitcoin whitepaper §§4–5, 11 (${paper}).`;

function raceStill(id: string, index: number, desc: string, confirmations?: number): TalkSlide {
  return still(`23-${id}`, raceTitle, desc, race(index, confirmations), `${desc}\n\n${raceNotes}`);
}

export const slide23 = [
  raceStill('race-start', 0, 'Both valid branches start one block beyond a common three-block prefix.'),
  raceStill('one-confirmation', 0, 'Alice sees the honest payment in its containing block. It has one confirmation on that branch, which is still tied.', 1),
  raceStill('honest-lead', 1, 'The honest branch takes a two-to-one lead.'),
  raceStill('charlie-catches-up', 2, 'Charlie gets lucky and catches up at two blocks each.'),
  raceStill('three-confirmations', 3, 'The honest branch reaches three blocks while Charlie has two.', 3),
  raceStill('gap-opens', 3, 'The honest branch pulls ahead four to two.'),
  raceStill('gap-widens', 4, 'The honest branch has six blocks to Charlie’s three.'),
  raceStill('six-confirmations', 4, 'The payment has six confirmations on the honest branch. Discuss reversal probability without promising finality.', 6),
  raceStill('honest-lead-final', 5, 'The honest branch ends this race nine to four. Compare work among valid chains.'),
];

const pileBeats = [
  ['neat-stack', 'Alice mines happily at her computer with three neatly stacked blue boxes.'],
  ['messy-stack', 'Twenty boxes crowd the computer and floor while Alice keeps working.'],
  ['overwhelmed', 'Fifty boxes cover the table and spill across the floor. Alice looks dismayed.'],
  ['buried', 'Hundreds of small blue boxes bury Alice, desk and computer. Leave a short silence.'],
  ['surrender', 'A hand emerges with a white surrender flag. Once it is visible, reveal the question.'],
] as const;
const mountain = pile(4);

export const slide24 = pileBeats.map(([id, desc], index) => still(`24-${id}`, index === 4 ? pileTitle : '', desc,
  index === 4 ? mountain : pile(index as 0 | 1 | 2 | 3), `${desc}

Keep the viewpoint fixed. Over roughly 15–20 seconds, accelerate arrivals, let boxes tumble and settle, then pause before the hand rises and waves gently. Fade in the title only after the flag. The pile represents repeated mining work. Actual mining does not require retaining a pile of physical boxes.`));

const rewardNotes = `${disclosure}

The first row creates the rule-defined 10-unit subsidy. The record has no sender and debits no account. Add it before mining so the candidate commits to it. Independent validators check the parent, target, authorization, balance and subsidy limit before adoption. The coins are earned subsidy, with spendability subject to maturity rules. Explain aloud that fees transfer existing currency to the miner and are distinct from issuance.

Sources — Bitcoin whitepaper §§5–6 (${paper}), Bitcoin Core validation (https://github.com/bitcoin/bitcoin/blob/v29.0/src/validation.cpp), and coinbase maturity (https://github.com/bitcoin/bitcoin/blob/v29.0/src/consensus/tx_verify.cpp).`;

function rewardStill(id: string, desc: string, art: string, title = rewardTitle): TalkSlide {
  return still(`25-${id}`, title, desc, art, `${desc}\n\n${rewardNotes}`);
}

export function candidate(entry: MiningBlock, mined = false): string {
  return block(entry, 180, 255, 1.76) + target(1070, 285)
    + (mined ? attempts(1100, 490, [...rewardMisses, rewardMined]) : '');
}

function earned(count: number, standing = false): string {
  return workstation('excited', standing)
    + (standing ? '<g transform="translate(407 697) rotate(-69)"><path class="actor-line" d="M0 0v-100"/><path class="flag-cloth" d="M0-95q31-9 66 7-29 14-66 21Z"/></g>' : '')
    + goldUnits(991, 536, count) + text(1109, 331, `${count} units earned`, 'rule-label');
}

export const slide25 = [
  rewardStill('mountain', 'Open on the same flag and mountain from the previous slide.', mountain, ''),
  rewardStill('candidate', 'Zoom into the next candidate, linked to the tip of the honest branch.', candidate(rewardBeforeRow)),
  rewardStill('reward-row', 'Add the permitted reward as the first row, before hashing with a nonce.', candidate(rewardCandidate)),
  rewardStill('mined', 'Two nonces miss. The third passes with the reward and predecessor already committed.', candidate(rewardMined, true)),
  rewardStill('accepted', 'Independent nodes check the candidate and adopt it. Alice earns ten units.',
    `<g transform="translate(-20 216) scale(.72)">${mountain}</g>`
      + text(800, 213, '✓ Block accepted after independent validation', 'rule-label')
      + text(800, 263, 'Parent link · proof of work · payments · reward limit', 'body')
      + goldUnits(1135, 574, 10) + text(1243, 486, '10 units earned', 'rule-label')),
  rewardStill('back-to-work', 'Alice emerges, discards the flag and goes eagerly back to mining.', earned(10, true)),
  rewardStill('growing-rewards', 'Two further linked blocks pass independent checks and add ten units each.',
    earned(30) + text(800, 213, '✓ Three accepted blocks', 'rule-label')),
];

function reveal(beat: number): string {
  return `<g class="reveal-watermark" aria-hidden="true">
    ${chain(restored, 340, 1.03, false)}
    <path class="block-rule" d="M160 705h380m520 0h380M160 739h328m624 0h328"/>
  </g>
  <image data-bitcoin-logo href="${bitcoinLogo}" x="617" y="195" width="366" height="366"/>
  ${beat > 0 ? text(800, 663, 'Congratulations.', 'reveal-first') : ''}
  ${beat > 1 ? text(800, 758, 'You’ve invented Bitcoin.', 'reveal-last') : ''}`;
}

export const slide26 = ['logo', 'congratulations', 'bitcoin'].map((id, index) => still(`26-${id}`, '',
  ['Orange Bitcoin symbol over a faint linked ledger.', 'Congratulations.', 'Congratulations. You’ve invented Bitcoin.'][index],
  reveal(index), `Plan a subtle scale and rotation settle, then fade in each line separately over about 3–4 seconds. Hold the final composition.

Qualify verbally that the café exercise reconstructs the ideas with a simplified account-based ledger. Bitcoin spends unspent transaction outputs under script rules, commits to transactions via a Merkle root and hashes a block header. See whitepaper §§2–6 (${paper}).`, 'bitcoin-reveal'));

export const stills = [...slide22, ...slide23, ...slide24, ...slide25, ...slide26];
