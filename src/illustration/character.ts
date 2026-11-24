import { expressions, hairAndGlasses, headLean, headShapes, poses, type Character, type Expression, type Point, type Pose } from './geometry';
import { envelope, handFan, headwear, ledger, type Headwear } from './props';
import { svgText } from './svg';

export type { Character, Expression, Point, Pose } from './geometry';
export { poses } from './geometry';

type HandProp = { kind: 'envelope' | 'fan' } | { kind: 'ledger'; label: string };

export interface CharacterOptions {
  x?: number;
  y?: number;
  scale?: number;
  facing?: 'left' | 'right';
  pose?: Pose;
  expression?: Expression;
  headwear?: Headwear;
  instance?: string;
  hands?: { left?: HandProp; right?: HandProp };
  angles?: { head?: number; leftArm?: number; rightArm?: number };
}

export function costume(person: Character): string {
  if (person === 'alice') return '<path class="prop blue" d="M-13 43 q17 6 34-4 l2 10 q-17 9-36 3 l-15 18 l1-14Z"/>';
  if (person === 'bob') return '<path class="prop green" d="M-17 45 q9 4 18 12 q7-9 21-15 l-3 12 l-17 12 l-19-9Z"/>';
  return '<path class="prop purple" d="M-15 43 q22 5 35-2 l0 10 l-13 7 l-17-4Z"/>';
}

function around(angle: number, [x, y]: Point): string {
  return angle ? ` transform="rotate(${angle} ${x} ${y})"` : '';
}

function grip(prop: HandProp | undefined, mirrored: boolean): string {
  if (!prop) return '';
  switch (prop.kind) {
    case 'envelope': return envelope(0, 0, .4);
    case 'fan': return '<g transform="scale(.52) translate(0 -23)">' + handFan(0, 0) + '</g>';
    case 'ledger':
      return `<g transform="scale(${mirrored ? -.45 : .45} .45)">${ledger(0, 0, 0, prop.label)}</g>`;
  }
}

/** Render a self-contained fragment in the approved Expressive Minimalism theme. */
export function character(identity: Character | 'generic', options: CharacterOptions = {}): string {
  const {
    x = 0, y = 0, scale = 1, facing = 'right', pose = 'stand',
    expression = pose === 'point' || pose === 'hold' ? 'stand' : pose,
    headwear: hat, instance, angles = {}, hands = {},
  } = options;
  const anatomy = poses[pose];
  const face = expressions[expression];
  const features = identity === 'generic' ? null : hairAndGlasses[identity];
  const mirrored = facing === 'left';
  const facepalm = pose === 'facepalm'
    ? '<path class="hand" d="M-24 11 Q-11 6-10-5 l11-7 q4 1 0 6 l-6 7 l12-6 q4 2 1 6 l-11 8 l8-3 q4 3 0 6 l-16 9 q-8 2-13-7Z"/>'
    : '';
  return `<g class="person ${identity}" data-character="${identity}"${instance === undefined ? '' : ` data-instance="${svgText(instance)}"`}
    transform="translate(${x} ${y}) scale(${mirrored ? -scale : scale} ${scale})">
    <path data-part="torso" d="${anatomy.torso}"/>
    <g data-part="left-arm" data-pivot="${anatomy.leftShoulder.join(' ')}"${around(angles.leftArm ?? 0, anatomy.leftShoulder)}>
      <path d="${anatomy.leftArm}"/>
      <g data-part="left-hand" data-anchor="left-hand" transform="translate(${anatomy.leftHand.join(' ')})">${grip(hands.left, mirrored)}</g>
    </g>
    <g data-part="right-arm" data-pivot="${anatomy.rightShoulder.join(' ')}"${around(angles.rightArm ?? 0, anatomy.rightShoulder)}>
      <path d="${anatomy.rightArm}"/>
      <g data-part="right-hand" data-anchor="right-hand" transform="translate(${anatomy.rightHand.join(' ')})">${grip(hands.right, mirrored)}</g>
    </g>
    <path data-part="left-leg" data-pivot="${anatomy.hip.join(' ')}" d="${anatomy.leftLeg}"/>
    <path data-part="right-leg" data-pivot="${anatomy.hip.join(' ')}" d="${anatomy.rightLeg}"/>
    <g data-part="head" data-pivot="${anatomy.neck.join(' ')}"${around(angles.head ?? 0, anatomy.neck)}>
      <g transform="rotate(${headLean[pose]})">
        <path class="head" d="${headShapes[identity === 'generic' ? 'alice' : identity]}"/>
        <g data-part="hair">${!hat && features ? `<path d="${features.hair}"/>` : ''}</g>
        <g data-part="head-accessory">${hat ? headwear(hat) : features?.glasses ? `<path d="${features.glasses}"/>` : ''}</g>
        <path data-part="brows" d="${face.brows}"/>
        <g data-part="eyes"><path d="${face.eyes}"/><path class="pupil" d="${face.dots}"/></g>
        <path data-part="mouth"${face.filled ? ' class="pupil"' : ''} d="${face.mouth}"/>
      </g>
    </g>
    <g data-part="costume">${identity === 'generic' ? '' : costume(identity)}</g>
    <g data-part="facepalm-hand"${around(angles.leftArm ?? 0, anatomy.leftShoulder)}>${facepalm}</g>
  </g>`;
}
