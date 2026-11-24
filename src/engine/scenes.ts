import { character } from '../illustration/character';
import { bubble, envelope, ledger } from '../illustration/props';
import type { AnimatedScene } from './playback';

interface Frame {
  x: number;
  y: number;
  angle: number;
  pose: number;
  prop: number | null;
  dialogue: string;
}

interface DiagnosticScene {
  duration: number;
  checkpoints: AnimatedScene['checkpoints'];
  poses: readonly string[];
  prop: string;
  propY: number;
  backdrop: string;
  frameAt(time: number): Frame;
}

const unit = (value: number) => Math.max(0, Math.min(1, value));

function diagnostic(definition: DiagnosticScene): AnimatedScene {
  return {
    duration: definition.duration,
    checkpoints: definition.checkpoints,
    mount(root) {
      root.innerHTML = `<svg class="art" viewBox="0 0 1600 600" role="img" aria-label="Illustration playback diagnostic">
        ${definition.backdrop}
        <g data-actor>${definition.poses.map((art, index) => `<g data-pose="${index}">${art}</g>`).join('')}</g>
        <g data-scene-prop>${definition.prop}</g>
        <g data-dialogue>${bubble(1320, 120, 370, '', 1)}</g>
      </svg>`;
      const actor = root.querySelector<SVGGElement>('[data-actor]')!;
      const poses = [...actor.querySelectorAll<SVGGElement>('[data-pose]')];
      const prop = root.querySelector<SVGGElement>('[data-scene-prop]')!;
      const dialogue = root.querySelector<SVGGElement>('[data-dialogue]')!;
      const text = dialogue.querySelector<SVGTextElement>('text')!;
      let previous: Frame | undefined;
      return {
        render(time) {
          const frame = definition.frameAt(time);
          actor.setAttribute('transform', `translate(${frame.x} ${frame.y}) rotate(${frame.angle})`);
          prop.setAttribute('visibility', frame.prop === null ? 'hidden' : 'visible');
          prop.setAttribute('transform', `translate(${frame.prop ?? 0} ${definition.propY})`);
          if (frame.pose !== previous?.pose) poses.forEach((node, index) => {
            node.setAttribute('visibility', frame.pose === index ? 'visible' : 'hidden');
          });
          if (frame.dialogue !== previous?.dialogue) {
            text.textContent = frame.dialogue;
            dialogue.setAttribute('visibility', frame.dialogue ? 'visible' : 'hidden');
          }
          previous = frame;
        },
      };
    },
  };
}

export const delivery = diagnostic({
  duration: 6,
  checkpoints: [
    { time: 0, label: 'Ready at the mark' },
    { time: 2, label: 'Carry the envelope' },
    { time: 4, label: 'Set it down' },
    { time: 6, label: 'Delivery confirmed' },
  ],
  poses: [
    character('generic', { pose: 'hold', headwear: 'courier', scale: 1.7, hands: { right: { kind: 'envelope' } } }),
    character('generic', { pose: 'run', headwear: 'courier', scale: 1.7, hands: { right: { kind: 'envelope' } } }),
    character('generic', { pose: 'excited', headwear: 'courier', scale: 1.7 }),
  ],
  prop: envelope(0, 0, .62, -8),
  propY: 440,
  backdrop: '<path class="ground" d="M85 497 Q812 500 1515 495"/><path class="outline" d="M1080 478 h190 m-165 0 -9 44 m152 -44 9 44"/>',
  frameAt(time) {
    return {
      x: 310 + 690 * unit((time - 1) / 3),
      y: 175 - (time >= 2 && time < 4 ? 14 * Math.sin((time - 2) * Math.PI * 2) : 0),
      angle: 0, pose: time < 2 ? 0 : time < 4 ? 1 : 2,
      prop: time < 4 ? null : 1180,
      dialogue: time < 4 ? '' : time < 6 ? 'Envelope down.' : 'Delivered!',
    };
  },
});

export const inspection = diagnostic({
  duration: 5,
  checkpoints: [
    { time: 0, label: 'Ledger on the desk' },
    { time: 1, label: 'Take a closer look' },
    { time: 3, label: 'Spot the mismatch' },
    { time: 5, label: 'Mark for review' },
  ],
  poses: [
    character('bob', { pose: 'stand', scale: 1.8 }),
    character('bob', { pose: 'point', scale: 1.8 }),
    character('bob', { pose: 'facepalm', scale: 1.8, angles: { leftArm: 5 } }),
  ],
  prop: ledger(0, 0, 10, '24'),
  propY: 418,
  backdrop: '<path class="ground" d="M100 505 Q700 509 1490 507"/><path class="detail broken" d="M450 477 Q665 468 908 477"/>',
  frameAt(time) {
    const approach = unit((time - 1) / 2);
    return {
      x: 365 + approach * 225, y: 175, angle: 8 * approach,
      pose: time < 1 ? 0 : time < 3 ? 1 : 2,
      prop: 800 - 110 * approach,
      dialogue: time < 3 ? '' : time < 5 ? 'That number changed.' : 'Flag it for review.',
    };
  },
});
