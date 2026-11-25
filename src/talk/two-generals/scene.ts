import type { AnimatedScene } from '../../engine/playback';
import { character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { svgText } from '../../illustration/svg';
import { battlefield, late, opening, thought } from './art';
import { checkpoints, frameAt, type BattlefieldFrame } from './two-generals-model';

const duration = checkpoints[checkpoints.length - 1].time;

function caption(words: string): string {
  return `<text class="scene-caption" x="800" y="851">${svgText(words)}</text>`;
}

function note(words: string): string {
  return `<g transform="translate(800 335)">
    <path class="message-note" d="M-191-24 Q-31-31 183-25 L193 27 Q-12 34-194 27Z"/>
    <text class="message-text" y="14">${svgText(words)}</text>
  </g>`;
}

function alternateLabel(final = false): string {
  return `<text class="run-label" x="800" y="181">${final ? 'Two possible endings' : 'Alternate run'}</text>`;
}

function finalPanel(frame: BattlefieldFrame): string {
  const outcomes = frame.comparison!;
  return `${alternateLabel(true)}
    ${(['delivered', 'lost'] as const).map((result, index) => `
      <g data-outcome="${result}" transform="translate(${480 + 640 * index} 690)">
        <path class="outcome-panel" d="M-282-45 Q-102-49 277-43 Q291-42 292-27 L289 112
          Q12 121-289 112 L-291-24 Q-292-42-282-45Z"/>
        <g transform="translate(-228 -10)" class="${index ? 'alarm' : 'signal'}">
          <circle class="head" r="16"/>
          <path d="${index ? 'm-7-7 14 14 m-14 0 14-14' : 'm-8 1 6 6 12-14'}"/>
        </g>
        <text class="outcome-heading" y="4">Final reply ${index ? 'is lost' : 'arrives'}</text>
        <text class="outcome-evidence" y="50">Bob thinks “${svgText(outcomes[result][0])}</text>
        <text class="outcome-evidence" y="88">${svgText(outcomes[result][1])}”</text>
      </g>`).join('')}
    ${caption(frame.caption)}`;
}

function movingCourier(from: 'alice' | 'bob', alternate: boolean): string {
  return `<g data-courier>
    ${character('charlie', { scale: .66, pose: 'run', expression: alternate ? 'run' : 'stand',
      facing: from === 'alice' ? 'right' : 'left', hands: { right: { kind: 'envelope' } } })}
  </g>`;
}

function delivered(x: number): string {
  return character('charlie', { x, y: 622, scale: .62, pose: 'hold', hands: { right: { kind: 'envelope' } } });
}

function valley(frame: BattlefieldFrame, moving: boolean): string {
  if (frame.ending) return finalPanel(frame);
  if (frame.picture === 'opening') return opening;
  const label = frame.segment === 'alternate' ? alternateLabel() : '';
  if (moving && frame.trip) return `${label}${note(frame.trip.words)}
    ${movingCourier(frame.trip.from, frame.segment === 'alternate')}${caption(frame.caption)}`;
  if (frame.picture === 'couriers') return `${label}${late}`;
  if (frame.picture === 'retry-arrives' || frame.picture === 'ack-arrives') {
    return `${label}${note(frame.picture === 'retry-arrives' ? 'Attack at sunrise!' : 'Agreed!')}
      ${delivered(frame.picture === 'retry-arrives' ? 1132 : 468)}${caption(frame.caption)}`;
  }
  return `${envelope(802, 712, .39, -12)}
    <path class="alarm" d="M766 680 l72 61 m-74 0 76-66"/>${caption(frame.caption)}`;
}

const initial = frameAt(0);
const ending = frameAt(duration);
const finalBob = ['Arrives: She got my reply.', 'Lost: Did she get it?'] as const;

export const baselineComposition = battlefield('Two hilltops', initial.alice, initial.bob, opening);
export const comparisonComposition = battlefield('Final reply comparison', ending.alice, finalBob, finalPanel(ending));

export const twoGenerals: AnimatedScene = {
  duration,
  checkpoints,
  pauseAtCheckpoints: true,
  mount(root) {
    root.innerHTML = baselineComposition;
    const art = root.querySelector('svg')!;
    const alice = art.querySelector('[data-layer="alice"]')!;
    const bob = art.querySelector('[data-layer="bob"]')!;
    const floor = art.querySelector('[data-layer="valley"]')!;
    let last = '';
    let courier: SVGGElement | null = null;

    return {
      render(time) {
        const frame = frameAt(time);
        const moving = frame.trip !== undefined && time >= frame.trip.start;
        const key = `${frame.index}:${moving}`;
        if (key !== last) {
          art.dataset.run = frame.segment;
          art.setAttribute('aria-label', frame.caption);
          alice.innerHTML = thought(287, 'alice', frame.alice);
          bob.innerHTML = thought(1313, 'bob', frame.ending ? finalBob : frame.bob);
          floor.innerHTML = valley(frame, moving);
          courier = floor.querySelector('[data-courier]');
          last = key;
        }
        if (courier && frame.trip) {
          const { from, start, end } = frame.trip;
          const progress = Math.max(0, Math.min(1, (time - start) / (end - start)));
          const distance = frame.trip.lost ? 338 : 672;
          const x = from === 'alice' ? 464 + distance * progress : 1136 - distance * progress;
          const y = 623 + 70 * Math.sin((x - 464) * Math.PI / 672) - 10 * Math.abs(Math.sin(progress * Math.PI * 6));
          courier.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        }
      },
    };
  },
};
