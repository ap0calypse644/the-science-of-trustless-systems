import { character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { svgText } from '../../illustration/svg';
import { castle, landscape } from '../two-generals/art';
import { actor, cafeRoom, cafeTable, sheet } from './art';
import { aliceView, bobView, fresh, line, toAlice, toBob } from './ledger-model';
import { notebook } from './notebook';

const title = 'We Are Back to the Generals';
const cafe = cafeRoom + actor('alice', 'point', 'stand') + actor('bob', 'point', 'suspicious', 1295)
  + actor('charlie', 'hold', 'suspicious', 800, 359) + cafeTable;

// Use the same sealed messenger note as slides 7 and 8, with the payment on its paper slip.
function message(x: number, y: number, angle: number, words: string): string {
  return `<g data-prop="messenger-note" transform="translate(${x} ${y}) rotate(${angle})">
    ${envelope(0, 0, 1)}
    <path class="paper" d="M-150 21 Q1 13 151 19 L149 65 Q8 74-148 66Z"/>
    <text class="small-label" y="51">${svgText(words)}</text>
  </g>`;
}

const positions = { alice: 406, bob: 1194 };

function splitHistories(conflicts: boolean): string {
  return notebook(positions.alice, 691, .94, 'Alice’s local history', [{ text: line(aliceView.accepted[0]), signed: true }],
    `Alice ${aliceView.balances.Alice} · Charlie ${aliceView.balances.Charlie}`)
    + notebook(positions.bob, 691, .94, 'Bob’s local history', [{ text: line(bobView.accepted[0]), signed: true }],
      `Bob ${bobView.balances.Bob} · Charlie ${bobView.balances.Charlie}`)
    + (conflicts
      ? `<text class="outside-entry" x="${positions.alice}" y="845">Rejected: ${svgText(line(aliceView.rejected[0].payment))}</text>
         <text class="outside-entry" x="${positions.bob}" y="845">Rejected: ${svgText(line(bobView.rejected[0].payment))}</text>`
      : '');
}

// One authored midpoint, with stable left/right anchors for the later morph.
function foldingBook(x: number, words: string, angle: number): string {
  return `<g data-prop="folding-notebook" transform="translate(${x} 669)">
    <path class="notebook-cover" d="M-219-55 Q-103-83-26-49 Q83-90 209-58
      L199 64 Q93 48 12 80 Q-87 67-211 72Z"/>
    <path class="paper" d="M-205-59 Q-109-74-24-44 Q83-78 196-61 L168-20 Q77-41-9-15
      L-143-20Z"/>
    <path class="spine" d="M-27-46 Q-15-8 10 73"/>
    ${message(0, 2, angle, words)}
  </g>`;
}

const rising = `<g data-transform="midpoint">
  <g opacity=".27">${cafe}</g>
  <g class="generals-sheet"><g class="art">
    <g transform="translate(0 405) scale(1 .47)">${landscape}</g>
    <g transform="translate(0 350) scale(1 .54)">${castle}</g>
  </g></g>
  ${foldingBook(positions.alice, line(toAlice), -8)}
  ${foldingBook(positions.bob, line(toBob), 8)}
</g>`;

const battlefield = `<g data-transform="battlefield" class="generals-sheet"><g class="art">
  ${landscape}${castle}
  ${character('alice', { x: 371, y: 391, scale: .89, pose: 'point', expression: 'suspicious' })}
  ${character('bob', { x: 1229, y: 388, scale: .89, pose: 'suspicious', facing: 'left' })}
  ${character('charlie', { x: 800, y: 693, scale: .76, pose: 'hold', expression: 'excited' })}
  ${message(positions.alice, 596, -8, line(toAlice))}
  ${message(positions.bob, 596, 8, line(toBob))}
</g></g>`;

const stages = [
  { id: '13-fresh-balance', description: 'A fresh toy run starts with Charlie at twenty units.',
    art: cafe + notebook(800, 707, 1.08, 'Fresh toy run · units', [{ text: `Charlie starts with ${fresh.Charlie}` }],
      `Alice ${fresh.Alice} · Bob ${fresh.Bob}`),
    notes: 'Explicit reset for this example. Charlie starts with 20 units rather than the 5 in the café-order example. Alice and Bob each start at 0.' },
  { id: '13-two-signatures', description: 'Charlie signs two distinct payments of twenty units.',
    art: cafe + notebook(800, 707, 1.08, 'Two signed payments · in transit', [
      { text: line(toAlice), signed: true }, { text: line(toBob), signed: true },
    ], 'Charlie starts with 20'),
    notes: 'Two distinct, genuinely authorized payment messages, each for 20 units. Each is affordable against the initial balance. Together they request 40 from 20.' },
  { id: '13-local-acceptance', description: 'Alice and Bob accept different payments because they receive them in different orders.',
    art: cafe + splitHistories(false),
    notes: 'Alice receives the Alice payment first and tentatively records it: Alice 20, Bob 0, Charlie 0. Bob receives the Bob payment first: Alice 0, Bob 20, Charlie 0. These are two independent local histories, not a globally settled record.' },
  { id: '13-conflicting-histories', description: 'The later payment is rejected outside each accepted local ledger.',
    art: cafe + splitHistories(true),
    notes: 'Charlie has no balance left in either local view. Alice rejects the Bob payment, and Bob rejects the Alice payment. Neither rejected entry changes any balance. The presented notebook art keeps the rejected messages outside the accepted pages.' },
  { id: '13-morph-keyframe', description: 'The café fades while the notebooks fold into messenger notes and the landscape rises.',
    art: rising,
    notes: 'Proposed midpoint. Fade the room and café tabletop, keep both notebook anchors aligned by side, fold their page silhouettes into the sealed messenger notes, and raise the shared hills and fortress from near the floor line. This is a still for staging review.' },
  { id: '13-battlefield', description: 'Alice and Bob return as generals with contradictory payment notes while Charlie grins.',
    art: battlefield,
    notes: 'Visual callback only. The two contradictory messages are diegetic props. Do not imply that the earlier arbitrary-loss fault model is identical to the current history-selection problem. Leave the discussion to the presenter.' },
];

export const transformationStills = stages.map(({ id, description, art, notes }) => ({
  id, notes, composition: sheet(title, description, art),
}));
