import { character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { svgText } from '../../illustration/svg';
import './art.css';

export type Thought = readonly [string, string];

export function thought(x: number, person: 'alice' | 'bob', [first, second]: Thought): string {
  const alice = person === 'alice';
  const fill = alice ? 'blue-wash' : 'green-wash';
  return `<g data-view="${person}" transform="translate(${x} 169)">
    <path class="thought ${fill}" d="M-246 67 C-264 61-262 36-241 27 C-243 6-218-4-192 5
      C-178-9-142-11-119 1 C-100-12-60-11-40 0 C-18-11 17-11 37-1
      C65-11 103-10 122 1 C147-9 179-7 194 6 C227-4 249 10 246 28
      C268 39 263 67 246 72 C257 92 234 112 208 107 C191 125 162 125 139 118
      C116 129 82 130 61 120 C44 131 10 131-12 121 C-42 131-72 131-94 120
      C-119 128-155 127-171 116 C-192 122-228 120-233 103 C-251 103-258 82-246 67Z"/>
    <circle class="thought ${fill}" cx="${alice ? 122 : -122}" cy="147" r="12"/>
    <circle class="thought ${fill}" cx="${alice ? 106 : -106}" cy="175" r="6"/>
    <text class="thought-line" y="47">${svgText(first)}</text>
    <text class="thought-line" y="92">${svgText(second)}</text>
  </g>`;
}

function pennant(x: number, y: number, color: 'blue' | 'green', facing: number): string {
  return `<g transform="translate(${x} ${y}) scale(${facing} 1)">
    <path class="fine" d="M0 0 Q-3-84 0-151"/>
    <path class="prop ${color}" d="M0-147 Q31-139 69-150 L58-125 L72-102 Q32-91 0-101Z"/>
    <path class="mark" d="m15-133 25-3 m-25 12 17-3"/>
    <circle class="head fine" cy="-155" r="5"/>
  </g>`;
}

function soldier(x: number, y: number, side: 'blue' | 'green', facing: number, stripe: boolean): string {
  return `<g transform="translate(${x} ${y}) scale(${facing} 1)" class="rank">
    <path class="fine" d="M0 0 l8 32 -8 26 -10 14 m10-14 15 11 M3 8 Q16 13 22 27 M-1 9 l-12 18"/>
    <path class="head" d="M-12-1 Q-20-17-10-26 Q2-33 12-23 Q19-12 10-3 Q2 4-12-1Z"/>
    <path class="prop neutral" d="M-16-13 Q-19-38-2-40 Q14-40 15-19 L20-14Z"/>
    <path class="prop ${side}" d="M12 22 Q27 17 39 22 L36 47 Q32 59 23 61 Q12 51 12 22Z"/>
    <path class="mark" d="${stripe ? 'm20 34 10 1 m-11 8 10 1' : 'm19 37 12 1'}"/>
  </g>`;
}

const landscape = `
  <path class="crag" d="M468 552 Q539 477 586 462 L613 424 L641 410 L669 372 L695 362
    L725 388 L763 402 L794 440 L836 446 L875 478 L922 554Z"/>
  <path class="crag" d="M735 552 L804 470 L832 454 L860 419 L894 408 L924 371 L959 403 L986 413
    L1013 455 L1050 478 L1107 556Z"/>
  <path class="ridge" d="m557 485 29-12 20-19 m46-39 16-22 27-15 m6 22 14 16 m249-5 21 31 17 9
    m-59-48 16 14 m59 65 36 19"/>
  <path class="hill blue-wash" d="M-10 508 C86 487 141 494 211 493 C296 480 363 478 409 507
    C478 555 483 603 539 644 C595 683 642 685 674 711 C591 705 521 740 452 756
    Q228 813 -10 765Z"/>
  <path class="hill green-wash" d="M1610 502 C1522 476 1465 497 1382 486 C1303 477 1240 482 1195 516
    C1142 555 1123 620 1072 649 C1035 670 992 688 944 708 C1055 712 1104 748 1173 762
    Q1382 807 1610 756Z"/>
  <path class="terrain" d="M5 532 Q89 510 137 514 M28 593 q77-52 152-42 m-113 71 q52-20 104-17
    m-44 66 q99 0 181-40 m-96 75 q100-13 190-71 m-21 69 q56-16 114-47
    M1588 538 q-76-24-134-16 m130 58 q-71-35-151-33 m130 97 q-61-22-137-10
    m27 67 q-106-5-196-55 m40 45 q-64-10-139-48"/>
  <path class="hatch" d="m75 536-11-9 m20 8-4-13 m107 39 12-12 m-6 18 20-14 m195-10 19 12
    m-22-5 15 12 m79 94 18 11 m-32-10 23 17 m-256 64 28-11
    M1486 538 l8-13 m-1 16 16-13 m-320 28-15 9 m14-2-22 14 m-71 75-29 15
    m38-9-33 17 m226 65-30-12"/>
  <path class="road" d="M474 752 C559 736 598 706 693 696 Q794 684 914 697 C1012 704 1074 727 1131 752"/>
  <path class="terrain" d="m533 772 45-9 m21 17 25-7 m425 2 26 8 m-50-15 10 3"/>
`;

const castle = `
  <g transform="translate(800 503)" class="castle">
    <ellipse class="castle-shadow" cy="130" rx="214" ry="20"/>
    <path class="castle-side" d="m-132-6 34-16 221 4 42 23 1 105-37 20-263-5Z"/>
    <path class="castle-front" d="M-139 18 l37-2 1-21 34-2 1 21 30-1 1-19 32-1 1 19 30-1 2-17
      32-2 1 20 30-1 1-20 33 1 2 124-267 4Z"/>
    <path class="castle-front" d="M-181 117 l3-147-10-10 1-36 23-1 1 17 20-1 1-17 22 1 1 15 19 1
      1-17 25 2-1 35-11 10 2 150Z"/>
    <path class="castle-front" d="M102 121 l1-151-12-11 2-37 24 1 1 17 18-1 1-17 23-1 1 18 19 1
      2-17 24 1-1 38-11 9 2 147Z"/>
    <path class="castle-side" d="M-77-78 l17 13 1 32-12 14-1 128-13 11-2-151 11-10Z
      M205-76 l15 11-1 34-11 10 1 128-13 12-2-148 11-9Z"/>
    <path class="gate" d="M-42 124 v-66 q2-21 43-41 q34 13 39 40 v66Z"/>
    <path class="brick" d="M-29 121 V59 Q-23 42 0 34 Q23 44 27 59 V121 M-17 121 V55 M-4 121 V41
      M10 121 V47 M1 72 h5 M-165 12 h65 m-53 40 h41 m-54 30 71-1 m-53-28 v20
      m17 10 1 17 m-27-83 1 18 m261-23 68 1 m-74 35 65-1 m-72 41 h79 m-41-87 1 19
      m-21 30 v19 m32 20 v21 M-65 43 h14 m-18 49 h18 m105-18 34-3 m-23 28 h22"/>
    <path class="slit" d="M-138-30 q7-13 13 0 v28 h-13Z M141-29 q6-12 13 0 v27 h-13Z"/>
    <path class="hatch" d="m-174 109 13-13 m-6 14 13-12 m-6 13 15-15 m302 13 15-14
      m-6 14 12-11 m-1 12 13-13 m-148 6 9-9 m-8 17 15-13"/>
  </g>`;

const camps = `
  ${pennant(102, 492, 'blue', 1)}
  ${pennant(1498, 493, 'green', -1)}
  ${soldier(165, 473, 'blue', 1, false)}
  ${soldier(221, 479, 'blue', 1, true)}
  ${soldier(273, 464, 'blue', 1, false)}
  ${soldier(1430, 470, 'green', -1, false)}
  ${soldier(1375, 471, 'green', -1, true)}
  ${soldier(1324, 457, 'green', -1, false)}
  <g class="general">${character('alice', {
    x: 371, y: 391, scale: .89, pose: 'point', expression: 'suspicious',
    angles: { rightArm: 24 },
  })}</g>
  <g class="general">${character('bob', {
    x: 1229, y: 388, scale: .89, pose: 'suspicious', facing: 'left',
    angles: { rightArm: -9 },
  })}</g>
  <text class="camp-name alice-name" x="362" y="602">Alice</text>
  <text class="camp-name bob-name" x="1237" y="600">Bob</text>
`;

export const opening = `
  <g transform="translate(557 633)">
    ${character('charlie', { scale: .62, pose: 'hold', hands: { right: { kind: 'envelope' } } })}
    <text class="courier-name" y="140">Charlie</text>
  </g>
  <text class="scene-caption" x="800" y="848">Both together, or neither.</text>
`;

export const late = `
  <g transform="translate(535 635) rotate(-8)">
    ${character('charlie', { scale: .6, facing: 'left', pose: 'run', expression: 'suspicious',
      hands: { right: { kind: 'envelope' } } })}
    <path class="gesture" d="M57 29 h30 m-34 12 h55 m-57 14 h25"/>
  </g>
  <g transform="translate(712 705) rotate(14)">
    ${character('charlie', { scale: .61, pose: 'run', expression: 'run',
      hands: { right: { kind: 'envelope' } } })}
    <path class="gesture" d="M21-36 q12-15 16-8 q-2 9-11 13 m17 8 q10-7 14-3 q-3 7-11 8"/>
  </g>
  <g transform="translate(870 711) rotate(-18)">
    ${character('charlie', { scale: .63, pose: 'confused', expression: 'facepalm', facing: 'left',
      hands: { right: { kind: 'envelope' } } })}
    <path class="gesture" d="M-51-28 q-13-9-17 1 q5 7 14 5 m71-10 q14-9 17-1 q-4 8-15 7"/>
  </g>
  <g transform="translate(1020 708) rotate(48)">
    ${character('charlie', { scale: .6, pose: 'facepalm', expression: 'facepalm' })}
  </g>
  ${envelope(994, 805, .25, -14)}
  <text class="scene-caption" x="800" y="856">An acknowledgment of the acknowledgment?</text>
`;

export function outcome(arrived: boolean): string {
  return `
    ${character('charlie', { x: arrived ? 1162 : 879, y: 639, scale: .6,
      pose: arrived ? 'hold' : 'facepalm', expression: arrived ? 'stand' : 'facepalm',
      hands: arrived ? { right: { kind: 'envelope' } } : {},
    })}
    ${arrived ? '' : `${envelope(907, 749, .27, -16)}
      <g class="messenger-speech">
        <path class="head" d="M950 611 Q1028 601 1114 608 Q1132 608 1134 622 L1132 650
          Q1131 667 1113 668 L963 667 L925 680 L942 653 Q926 634 938 620Z"/>
        <text x="1036" y="652">I give up…</text>
      </g>`}
    <g class="${arrived ? 'signal' : 'alarm'}" transform="translate(581 824)">
      <circle class="head" r="19"/>
      <path d="${arrived ? 'm-9 1 6 6 13-15' : 'm-7-7 14 14 m-14 0 14-14'}"/>
    </g>
    <text class="scene-caption" x="841" y="838">Final reply ${arrived ? 'arrives' : 'is lost'}</text>
  `;
}

export function battlefield(label: string, alice: Thought, bob: Thought, valley: string): string {
  return `<div class="talk-sheet generals-sheet">
    <h1>Two Generals Problem</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${label}">
      ${landscape}
      ${castle}
      ${camps}
      <g data-layer="alice">${thought(287, 'alice', alice)}</g>
      <g data-layer="bob">${thought(1313, 'bob', bob)}</g>
      <g data-layer="valley">${valley}</g>
    </svg>
  </div>`;
}
