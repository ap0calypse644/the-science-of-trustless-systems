import { character, type Character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { castle, landscape, thought } from '../two-generals/art';

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
const charlie = general('charlie', 799, 579, .79);

function peer(dispatching = false): string {
  return `${mallory(1089, 510, .81, dispatching)}
    <text class="actor-name mallory" x="1089" y="665">Mallory</text>`;
}

// These paths are painted after the middle-ground fortress and before the foreground cast.
const direct = `<g class="byz-message" data-message="direct">
  <path d="M349 465 C545 450 676 605 826 613 C1016 623 1159 565 1255 469
    m-27 8 27-8-9 28
    M347 480 C520 606 869 707 1038 578 m-27 5 27-5-12 25"/>
  ${envelope(634, 548, .26, 19)}${envelope(903, 643, .26, -15)}
</g>`;

const forwarded = `<g class="byz-message forwarded" data-message="forwarded">
  <path d="M1145 551 Q1208 536 1274 483 m-25 9 25-9-11 24"/>
  ${envelope(1212, 522, .26, -13)}
</g>`;

const foreground = `<path class="byz-ground" d="M603 753 Q788 721 950 744 M1008 695 Q1088 676 1172 688"/>
  <path class="byz-ground detail" d="m627 766 52-13 m224 0 46 7 m89-59 43-10 m58 5 29 4"/>`;

export function battlefield(actors: string, messages = '', privateView = ''): string {
  return `<svg class="art" viewBox="0 0 1600 900" role="img" aria-label="Alice and Bob face each other across the valley. The fortress sits in the middle ground.">
    ${landscape}
    <g data-depth="middle-ground" transform="matrix(.78 0 -.12 .81 247 22)">${castle}</g>
    ${foreground}
    <g data-depth="foreground-messages">${messages}</g>
    <g data-depth="foreground-actors">${actors}</g>
    ${privateView}
  </svg>`;
}

const three = alice + bob;
export const opening = battlefield(three + peer());
export const orders = battlefield(three + peer(), direct, thought(1300, 'bob', ['From Alice', 'Attack']));
export const lie = battlefield(three + peer(true), direct + forwarded, thought(1300, 'bob', ['Mallory reports', '“I received Retreat.”']));
export const arrival = battlefield(three + peer() + charlie, direct);
