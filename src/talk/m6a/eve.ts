import { expressions, poses } from '../../illustration/geometry';
import type { Expression } from '../../illustration/character';

type EveExpression = Extract<Expression, 'suspicious' | 'confused' | 'excited'>;

/** The hood and triangular clasp identify Eve independently of color and pose. */
export function eve(x: number, y: number, scale: number, expression: EveExpression, facing: 'left' | 'right' = 'right'): string {
  const face = expressions[expression];
  const pose = expression === 'excited' ? poses.hold : poses[expression];
  return `<g class="person" data-character="eve" transform="translate(${x} ${y}) scale(${facing === 'left' ? -scale : scale} ${scale})">
    <path d="${pose.torso} ${pose.leftArm} ${pose.rightArm} ${pose.leftLeg} ${pose.rightLeg}"/>
    <path class="eve-hood" d="M-42 45 Q-63 32-52-17 Q-40-43-6-59 Q30-53 43-18
      Q47 0 37 28 L22 45 Q3 58-42 45Z"/>
    <path class="head" d="M-31 7 Q-39-13-20-29 Q-6-39 11-34 Q34-30 38-10 Q39 16 23 32 Q6 46-13 34 Q-25 25-31 7Z"/>
    <path class="fine" d="M-47 24 Q-48-18-25-35 M-32 43 Q-21 50-6 49"/>
    <path d="${face.brows} ${face.eyes}"/>
    <path class="pupil" d="${face.dots}"/>
    <path${face.filled ? ' class="pupil"' : ''} d="${face.mouth}"/>
    <path class="eve-clasp" d="M-10 48 L10 48 0 62Z"/>
  </g>`;
}
