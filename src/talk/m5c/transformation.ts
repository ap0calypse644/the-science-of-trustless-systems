import { character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { svgText } from '../../illustration/svg';
import { castle, landscape } from '../two-generals/art';
import { actor, cafeRoom, cafeTable, sheet } from './art';
import { aliceView, bobView, fresh, line, toAlice, toBob } from './ledger-model';
import { notebook } from './notebook';

const title = 'The Double-Spend Problem';
const revealTitle = 'We Are Back to the Generals';
const cafeCast = actor('alice', 'point', 'stand') + actor('bob', 'point', 'suspicious', 1295)
  + actor('charlie', 'hold', 'suspicious', 800, 359);
const cafe = cafeRoom + cafeCast + cafeTable;

// Use the same sealed messenger note as slides 7 and 8, with the payment on its paper slip.
function message(x: number, y: number, angle: number, words: string): string {
  return `<g data-prop="messenger-note" transform="translate(${x} ${y}) rotate(${angle})">
    ${envelope(0, 0, 1)}
    <path class="paper" d="M-150 21 Q1 13 151 19 L149 65 Q8 74-148 66Z"/>
    <text class="small-label" y="51">${svgText(words)}</text>
  </g>`;
}

const positions = { alice: 406, bob: 1194 };

function splitHistories(): string {
  return notebook(positions.alice, 691, .94, 'Alice’s local history', [{ text: line(aliceView.accepted[0]), signed: true }],
    `Alice ${aliceView.balances.Alice} · Charlie ${aliceView.balances.Charlie}`)
    + notebook(positions.bob, 691, .94, 'Bob’s local history', [{ text: line(bobView.accepted[0]), signed: true }],
      `Bob ${bobView.balances.Bob} · Charlie ${bobView.balances.Charlie}`);
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

const generals = `
  ${character('alice', { x: 371, y: 391, scale: .89, pose: 'point', expression: 'suspicious' })}
  ${character('bob', { x: 1229, y: 388, scale: .89, pose: 'suspicious', facing: 'left' })}
  ${character('charlie', { x: 800, y: 693, scale: .76, pose: 'hold', expression: 'excited' })}`;

const battlefield = `<g data-transform="battlefield" class="generals-sheet"><g class="art">
  ${landscape}${castle}${generals}
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
    art: cafe + splitHistories(),
    notes: 'Alice receives the Alice payment first and tentatively records it: Alice 20, Bob 0, Charlie 0. Bob receives the Bob payment first: Alice 0, Bob 20, Charlie 0. Each receives the other payment later and rejects it because Charlie has 0 units left in that local history. Neither rejection changes a balance. The two histories remain locally valid and globally unsettled.' },
  { id: '13-morph-keyframe', description: 'The café fades while the notebooks fold into messenger notes and the landscape rises.',
    art: rising,
    notes: 'Proposed midpoint. Fade the room and café tabletop, keep both notebook anchors aligned by side, fold their page silhouettes into the sealed messenger notes, and raise the shared hills and fortress from near the floor line. This is a still for staging review.' },
  { id: '13-battlefield', title: revealTitle, description: 'Alice and Bob return as generals with contradictory payment notes while Charlie grins.',
    art: battlefield,
    notes: 'Visual callback only. The two contradictory messages are diegetic props. Do not imply that the earlier arbitrary-loss fault model is identical to the current history-selection problem. Leave the discussion to the presenter.' },
];

export const transformationStills = stages.map(({ id, title: heading = title, description, art, notes }) => ({
  id, notes, composition: sheet(heading, description, art),
}));

// Animate two paper surfaces around a shared spine; the final outline matches
// the body of the shared messenger note. Keep the same anchors throughout.
const openPage = [-310, -111, -139, -131, -2, -108, 146, -128, 313, -108,
  311, 91, 140, 93, 2, 114, -139, 95, -310, 103];
const foldedPage = [-86, -52, -43, -55, 0, -53, 43, -54, 85, -48,
  82, 49, 41, 51, 0, 51, -43, 50, -86, 47];

function foldingPages(x: number, words: string): string {
  return `<g data-morph-book transform="translate(${x} 691) scale(.94)">
    <path data-fold="cover" class="notebook-cover"/>
    <path data-fold="left" class="paper"/>
    <path data-fold="right" class="paper"/>
    <g data-fold="note">${message(0, 0, 0, words)}</g>
  </g>`;
}

export const morphComposition = sheet(title, 'The café fades and the notebooks fold into sealed messenger notes.', `
  <g data-morph-cafe>${cafeRoom}<g data-morph-cafe-cast>${cafeCast}</g>${cafeTable}</g>
  <g class="generals-sheet"><g class="art">
    <g data-rise="hills">${landscape}</g>
    <g data-rise="castle">${castle}</g>
    <g data-morph-generals>${generals}</g>
  </g></g>
  ${foldingPages(positions.alice, line(toAlice))}${foldingPages(positions.bob, line(toBob))}
  <g data-morph-histories>${splitHistories()}</g>`);

function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function mountMorph(root: HTMLElement): (progress: number) => void {
  const cafeLayer = root.querySelector('[data-morph-cafe]')!;
  const cafeCastLayer = root.querySelector('[data-morph-cafe-cast]')!;
  const hills = root.querySelector('[data-rise="hills"]')!;
  const fortress = root.querySelector('[data-rise="castle"]')!;
  const cast = root.querySelector('[data-morph-generals]')!;
  const histories = root.querySelector('[data-morph-histories]')!;
  const books = [...root.querySelectorAll('[data-morph-book]')].map((book) => ({
    book,
    cover: book.querySelector('[data-fold="cover"]')!,
    left: book.querySelector('[data-fold="left"]')!,
    right: book.querySelector('[data-fold="right"]')!,
    note: book.querySelector('[data-fold="note"]')!,
  }));

  return (progress) => {
    const close = Math.min(1, progress / .84);
    const bend = Math.sin(close * Math.PI);
    const [ax, ay, bx, by, cx, cy, dx, dy, ex, ey, fx, fy, gx, gy, hx, hy, ix, iy, jx, jy] =
      openPage.map((value, i) => lerp(value, foldedPage[i], close));
    const top = `M${ax} ${ay} Q${bx} ${by} ${cx} ${cy} Q${dx} ${dy} ${ex} ${ey}`;
    const bottom = `L${fx} ${fy} Q${gx} ${gy} ${hx} ${hy} Q${ix} ${iy} ${jx} ${jy}Z`;
    const revealed = Math.max(0, (progress - .72) / .28);
    const paperOpacity = (1 - revealed) * Math.min(1, progress * 12);
    books.forEach(({ book, cover, left, right, note }, index) => {
      const x = index === 0 ? positions.alice : positions.bob;
      const angle = index === 0 ? -8 : 8;
      book.setAttribute('transform', `translate(${x} ${lerp(691, 596, progress)}) rotate(${angle * progress}) scale(${lerp(.94, 1, progress)})`);
      cover.setAttribute('transform', `scale(${1 + .04 * (1 - close)} ${1 + .09 * (1 - close)})`);
      cover.setAttribute('d', top + bottom);
      left.setAttribute('d', `M${ax} ${ay} Q${bx} ${by - 64 * bend} ${cx} ${cy}
        Q${cx + 34 * bend} ${(cy + hy) / 2} ${hx} ${hy}
        Q${ix} ${iy + 24 * bend} ${jx} ${jy}Z`);
      right.setAttribute('d', `M${cx} ${cy} Q${dx} ${dy + 45 * bend} ${ex} ${ey} L${fx} ${fy}
        Q${gx} ${gy - 22 * bend} ${hx} ${hy} Q${cx + 34 * bend} ${(cy + hy) / 2} ${cx} ${cy}Z`);
      for (const surface of [cover, left, right]) surface.setAttribute('opacity', String(paperOpacity));
      note.setAttribute('opacity', String(revealed));
    });
    cafeLayer.setAttribute('opacity', String(1 - progress));
    cafeCastLayer.setAttribute('opacity', String(Math.max(0, 1 - progress / .55)));
    histories.setAttribute('opacity', String(Math.max(0, 1 - progress * 12)));
    hills.setAttribute('transform', `translate(0 ${(1 - progress) * 810}) scale(1 ${lerp(.1, 1, progress)})`);
    fortress.setAttribute('transform', `translate(0 ${(1 - progress) * 760}) scale(1 ${lerp(.15, 1, progress)})`);
    for (const layer of [hills, fortress]) layer.setAttribute('opacity', String(Math.min(1, progress * 3)));
    cast.setAttribute('opacity', String(Math.max(0, (progress - .55) / .45)));
    cast.setAttribute('transform', `translate(0 ${(1 - progress) * 82})`);
  };
}
