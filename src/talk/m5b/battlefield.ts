import { character, type Character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { castle, thought } from '../two-generals/art';

type General = Extract<Character, 'alice' | 'bob' | 'charlie'>;

function mallory(x: number, y: number, scale: number, dispatching: boolean): string {
  return `<g data-actor="mallory" transform="translate(${x} ${y}) scale(${scale})">
    <path class="cape" d="M-29 31 Q-56 79-76 124 Q-45 120-25 134 L25 118
      Q32 70 17 34Z"/>
    <path class="cape-fold" d="M-28 57 Q-38 90-54 113 m36-53 q-11 35-18 50"/>
    <path class="mallory-limbs" d="M-2 37 Q11 71 1 97 Q-7 121-25 143 l-10 1 M1 97 Q17 117 24 143 l13 1"/>
    <path class="mallory-limbs" d="${dispatching
      ? 'M2 54 Q-24 69-48 57 l-17-16 M2 54 Q30 72 51 60 l15-17'
      : 'M2 55 Q-18 70-31 93 M2 55 Q28 65 47 48'}"/>
    <path class="head" d="M-34 5 Q-40-21-18-33 Q9-44 31-24 Q41-3 25 18
      Q13 40-8 35 Q-28 27-34 5Z"/>
    <path class="visor" d="M-42-6 Q-47-35-25-48 L-31-65 Q-10-62 4-49
      Q30-48 38-29 L46-23 L26-8 Q0-20-31 2Z"/>
    <path class="cape-fold" d="M-22-43 Q-3-42 8-32 M14-40 l9 7 M-30 19 l3 4"/>
    <path class="mallory-face" d="M-21 2 l12 6 m11 0 15-6 M-14 11 v3 m18-1 1 3 M-9 23 Q7 30 18 18"/>
    <path class="cape" d="M-20 35 Q-5 45 12 32 L26 43 Q1 55-18 47Z"/>
    <circle class="prop yellow" cx="9" cy="43" r="5"/>
    ${dispatching ? envelope(-69, 36, .24, -14) + envelope(69, 36, .24, 12) : ''}
  </g>`;
}

function general(person: General, x: number, y: number, scale = .9): string {
  const name = person[0].toUpperCase() + person.slice(1);
  return `<g data-actor="${person}">
    ${character(person, { x, y, scale, facing: person === 'bob' ? 'left' : 'right',
      pose: person === 'charlie' ? 'hold' : 'point', expression: 'stand',
      angles: { rightArm: person === 'alice' ? 18 : 6 } })}
    <text class="actor-name ${person}" x="${x}" y="${y + 158 * scale + 46}">${name}</text>
    ${person === 'alice' ? `<text class="role-label" x="${x}" y="${y + 158 * scale + 83}">Commander</text>` : ''}
  </g>`;
}

const alice = general('alice', 286, 408);
const bob = general('bob', 1314, 413);
const charlie = general('charlie', 799, 638, .79);

function peer(dispatching = false): string {
  return `${mallory(807, 238, .68, dispatching)}
    <text class="actor-name mallory" x="909" y="265">Mallory</text>`;
}

const valleyFloor = `<g data-terrain="valley-floor">
  <path class="floor-trace" d="M596 385 Q800 382 1006 386 M571 402 Q638 399 702 403 m209 0 q73-5 130 3
    M518 527 Q600 525 670 527 M953 528 Q1020 524 1092 526
    M530 559 Q671 553 783 559 Q910 565 1075 555
    M570 581 Q688 577 751 581 m105 0 q98 2 172-4"/>
  <path class="floor-trace" d="M791 548 Q778 630 724 668 Q676 701 614 717
    M824 548 Q811 632 768 678 Q725 716 656 739"/>
  <path class="floor-trace" d="m559 605 45-2 m-19 13 37-3 m356-17 36 1 m-14 18 42-1
    M608 689 l20-3 m272-16 38 2 m-16 17 26 1"/>
</g>`;

const nearHills = `
  <g data-hill="left">
    <path class="hill blue-wash" d="M-10 506 C92 481 176 492 237 491 C310 483 374 489 407 523
      C445 560 457 613 504 647 Q538 669 565 684 C508 690 477 726 414 747 Q198 806-10 758Z"/>
    <path class="terrain" d="M13 533 Q89 510 153 514 m-86 99 q48-22 110-15
      m-49 70 q118-8 195-43 m-104 87 q111-18 188-74 m-11 57 q54-20 94-49"/>
    <path class="hatch" d="m74 536-11-10 m23 8-5-14 m307 46 21 15 m-22-5 16 12"/>
  </g>
  <g data-hill="right">
    <path class="hill green-wash" d="M1610 504 C1524 478 1459 495 1386 488 C1312 481 1240 483 1196 519
      C1157 553 1153 611 1111 643 Q1084 665 1034 685 C1116 694 1143 741 1210 757 Q1397 806 1610 757Z"/>
    <path class="terrain" d="M1590 541 Q1517 516 1457 522 m124 62 q-72-35-153-33
      m127 96 q-62-20-139-10 m25 62 q-101-13-188-59 m-75 55 q-49-18-81-48"/>
    <path class="hatch" d="m1489 539 11-16 m0 17 15-12 m-314 54-16 11 m14-4-22 14"/>
  </g>`;

const rearHill = `<g data-hill="rear">
  <path class="rear-hill" d="M556 349 C601 325 671 313 727 319 Q776 324 800 318
    C865 309 944 322 982 341 Q1006 352 1024 365 C945 374 884 370 811 366
    C733 364 674 374 612 366 Q576 362 556 349Z"/>
  <path class="byz-ground" d="M589 347 Q652 326 715 337 M855 333 Q920 335 976 355
    M627 356 q44-9 83-7 m167 1 q41-1 69 8"/>
  <path class="hatch" d="m612 345 13-8 m-6 13 15-9 m311 15 10 6 m1-7 12 7"/>
</g>`;

const frontHill = `<g data-hill="front">
  <path class="front-hill" d="M517 845 C557 801 613 761 668 750 C731 737 770 750 817 743
    C888 733 974 750 1032 796 Q1060 818 1085 860 C987 878 897 880 798 874 Q647 883 517 845Z"/>
  <path class="byz-ground" d="M556 842 Q609 800 676 780 M611 849 Q665 827 720 817
    M880 774 Q989 795 1032 841 M838 839 Q905 828 953 845"/>
  <path class="hatch" d="m678 781 16-13 m-6 17 17-13 m253 35 15 13 m-5-16 16 13"/>
</g>`;

// Paths take the open ground beside the fortress and across the near side of the valley.
const direct = `<g class="byz-message" data-message="direct">
  <path d="M349 465 C532 458 636 573 814 580 C1000 589 1161 567 1255 469
    m-27 8 27-8-9 28
    M351 453 C514 448 567 390 606 353 C649 313 711 306 768 285 m-26-1 26 1-15 21"/>
  ${envelope(630, 548, .26, 20)}${envelope(647, 329, .26, -26)}
</g>`;

const forwarded = `<g class="byz-message forwarded" data-message="forwarded">
  <path d="M856 269 C970 269 1019 336 1048 423 C1086 538 1182 549 1274 483
    m-25 7 25-7-11 24"/>
  ${envelope(1069, 479, .26, 45)}
</g>`;

function battlefield(dispatching = false, joined = false, messages = '', privateView = ''): string {
  return `<svg class="art" viewBox="0 0 1600 900" role="img"
      aria-label="An elevated view of the valley. Alice and Bob are on the near side, Mallory is on a rear hill, and the upright fortress is between them.${joined ? ' Charlie stands on his own front hill.' : ''}">
    ${valleyFloor}
    ${nearHills}
    <g data-depth="rear">${rearHill}${peer(dispatching)}</g>
    <g data-depth="middle-ground" transform="translate(208 90) scale(.74 .72)">${castle}</g>
    ${frontHill}
    <g data-depth="foreground-messages">${messages}</g>
    <g data-depth="foreground-actors">${alice}${bob}${joined ? charlie : ''}</g>
    ${privateView}
  </svg>`;
}

export const opening = battlefield();
export const orders = battlefield(false, false, direct, thought(1300, 'bob', ['From Alice', 'Attack']));
export const lie = battlefield(true, false, direct + forwarded, thought(1300, 'bob', ['Mallory reports', '“I received Retreat.”']));
export const arrival = battlefield(false, true, direct);
