import { block, sheet, text, workstation } from './art';
import { expressions } from '../../illustration/geometry';
import { laterRewards, rewardMined, rewardMisses } from './fixtures';
import { ease, fade, mix, move, pose, type Motion, type View } from './motion';
import { candidate, rewardTitle, slide24, slide25, slide26 } from './stills';

interface BoxPose {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}

function boxes(composition: string): readonly BoxPose[] {
  return [...composition.matchAll(/data-box transform="translate\(([^ ]+) ([^)]+)\) rotate\(([^ ]+) 31 23\) scale\(([^)]+)\)"/g)]
    .map(([, x, y, rotation, scale]) => ({ x: +x, y: +y, rotation: +rotation, scale: +scale }));
}

const pilePoses = slide24.slice(0, 4).map(({ composition }) => boxes(composition));

/** Match each existing prop to the closest remaining destination. */
function matchBoxes(from: readonly BoxPose[], to: readonly BoxPose[]): ReadonlyMap<number, BoxPose> {
  const assigned = new Map<number, BoxPose>();
  for (const source of from) {
    let best = -1;
    let distance = Infinity;
    to.forEach((target, index) => {
      const squared = (source.x - target.x) ** 2 + (source.y - target.y) ** 2;
      if (!assigned.has(index) && squared < distance) {
        best = index;
        distance = squared;
      }
    });
    assigned.set(best, source);
  }
  return assigned;
}

function setBox(node: SVGElement, x: number, y: number, rotation: number, scale: number): void {
  const transform = `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${rotation.toFixed(2)} 31 23) scale(${scale.toFixed(3)})`;
  if (node.getAttribute('transform') !== transform) node.setAttribute('transform', transform);
}

function face(view: View, mood: keyof typeof expressions): void {
  const expression = expressions[mood];
  view.one('[data-workstation] [data-part="brows"]').setAttribute('d', expression.brows);
  const [eyes, dots] = view.all('[data-workstation] [data-part="eyes"] path');
  eyes.setAttribute('d', expression.eyes);
  dots.setAttribute('d', expression.dots);
  const mouth = view.one('[data-workstation] [data-part="mouth"]');
  mouth.setAttribute('d', expression.mouth);
  mouth.classList.toggle('pupil', expression.filled);
}

export function fallingBoxes(stage: 1 | 2 | 3): Motion {
  const previous = pilePoses[stage - 1];
  const destination = pilePoses[stage];
  const matches = matchBoxes(previous, destination);
  const arrivals = destination.map((_, i) => i).filter((i) => !matches.has(i)).sort((a, b) =>
    destination[b].y - destination[a].y);
  const ranks = new Map(arrivals.map((index, rank) => [index, rank / arrivals.length]));
  const still = slide24[stage];
  const composition = stage === 3 ? still.composition.replace('<g data-mountain>',
    workstation('frustrated') + '<g data-mountain>') : still.composition;

  return (view, p) => {
    view.show(`24-boxes-falling-${stage}`, composition);
    // The fixed SVG order is the final paint order. Original boxes relocate
    // locally, while arrivals are scheduled floor-first, building upwards.
    view.all('[data-box]').forEach((node, index) => {
      const to = destination[index];
      const from = matches.get(index);
      if (from) {
        const q = ease(p, stage === 3 ? .14 : .05, stage === 3 ? .84 : .74);
        setBox(node, mix(from.x, to.x, q), mix(from.y, to.y, q) - 29 * Math.sin(q * Math.PI),
          mix(from.rotation, to.rotation, q), mix(from.scale, to.scale, q));
        fade(node, 1);
        return;
      }
      const rank = ranks.get(index)!;
      const start = stage === 3 ? .74 * (1 - (1 - rank) ** 1.7) : .70 * rank;
      const q = ease(p, start, start + (stage === 3 ? .24 : .28));
      const direction = index % 2 === 0 ? -1 : 1;
      const offset = 80 + (index % 7) * 25;
      const landing = Math.max(0, (q - .76) / .24);
      setBox(node, to.x + direction * offset * (1 - q),
        mix(105 + (index % 4) * 42, to.y, q) - 29 * Math.sin(Math.PI * landing),
        to.rotation + direction * (160 + 25 * (index % 5)) * (1 - q), to.scale);
      fade(node, ease(q, 0, .19));
    });
    if (stage === 3) {
      fade(view.one('[data-mountain] > .ground'), ease(p, .37, .89));
      fade(view.one('[data-workstation]'), 1 - ease(p, .84, .96));
    } else {
      face(view, p < .54 ? stage === 1 ? 'excited' : 'stand' : stage === 1 ? 'stand' : 'frustrated');
    }
  };
}

export const surrender: Motion = (view, p) => {
  view.animateStill(slide24[4]);
  const hand = view.one('[data-flag]');
  const rise = ease(p, .22, .55);
  const wave = ease(p, .55, .83);
  pose(hand, 0, 164 * (1 - rise), 1, 9 * Math.sin(wave * Math.PI * 4) * (1 - wave), 770, 330);
  fade(hand, ease(p, .23, .33));
  fade(view.one('h1'), ease(p, .84, .99));
};

function art(composition: string): string {
  return composition.slice(composition.indexOf('>', composition.indexOf('<svg')) + 1, composition.lastIndexOf('</svg>'));
}

const zoom = sheet('', 'The camera pushes from the mountain toward one blue candidate block.',
  `<g data-zoom-pile>${art(slide25[0].composition)}</g><g data-zoom-block>${art(slide25[1].composition)}</g>`);

export const zoomCandidate: Motion = (view, p) => {
  view.show('25-zooming', zoom);
  const q = ease(p, 0, .9);
  pose(view.one('[data-zoom-pile]'), -460 * q, -180 * q, mix(1, 4.3, q), 0, 830, 474);
  fade(view.one('[data-zoom-pile]'), 1 - ease(p, .48, .83));
  pose(view.one('[data-zoom-block]'), 530 * (1 - q), 170 * (1 - q), mix(.18, 1, q), 0, 405, 420);
  fade(view.one('[data-zoom-block]'), ease(p, .4, .86));
};

export const insertReward: Motion = (view, p) => {
  view.animateStill(slide25[2]);
  const gap = ease(p, .04, .43);
  const row = ease(p, .43, .91);
  view.all('.tx:not(.subsidy)').forEach((node, i) => move(node, 0, (-28 + i * 3) * (1 - gap)));
  view.all('.reward-row, .subsidy').forEach((node) => move(node, 73 * (1 - row), 0, row));
};

export const mineReward: Motion = (view, p) => {
  view.animateStill(slide25[3]);
  const trials = [...rewardMisses, rewardMined];
  const index = p < .32 ? 0 : p < .67 ? 1 : 2;
  const trial = trials[index];
  const digest = view.one('.own-hash');
  digest.textContent = `Hash ${trial.digest} ${index === 2 ? '✓' : '×'}`;
  digest.classList.toggle('correction', index < 2);
  view.one('.nonce').textContent = `Nonce ${trial.nonce}`;
  view.all('[data-attempts] > .code, [data-attempts] > [data-bit-row]').forEach((node, i) => {
    const step = Math.floor(i / 2);
    const q = ease(p, [0, .32, .67][step], [.16, .48, .86][step]);
    move(node, 0, 22 * (1 - q), q);
  });
};

const checks = ['Parent link', 'Proof of work', 'Payments', 'Reward limit'];
const checking = sheet(rewardTitle, 'Independent nodes validate the mined candidate.',
  candidate(rewardMined) + checks.map((check, index) =>
    `<g data-rule-check>${text(1090, 412 + index * 66, `✓ ${check}`, 'rule-label pass')}</g>`).join(''));

export const acceptReward: Motion = (view, p) => {
  if (p < .62) {
    view.show('25-independent-checks', checking);
    view.all('[data-rule-check]').forEach((node, i) => {
      const q = ease(p, i * .13, .11 + i * .13);
      move(node, 24 * (1 - q), 0, q);
    });
    return;
  }
  view.animateStill(slide25[4]);
  const q = ease(p, .73, .98);
  view.all('[data-gold] .coin').forEach((node, i) => {
    const coin = ease(q, i * .055, .5 + i * .055);
    move(node, 0, -65 * (1 - coin), coin);
  });
  const labels = view.all('svg.art > .rule-label');
  fade(labels[1], q);
};

const emerging = slide25[5].composition.replace('</svg>',

  `<g data-emerging-pile>${art(slide25[0].composition)}</g>
   <g data-emergence-validation>${text(800, 213, '✓ Block accepted after independent validation', 'rule-label')}
   ${text(800, 263, 'Parent link · proof of work · payments · reward limit', 'body')}</g></svg>`);

export const resumeMining: Motion = (view, p) => {
  view.show('25-emerging', emerging);
  const q = ease(p, 0, .71);
  const alice = view.one('[data-character="alice"]');
  move(alice, 52 * (1 - q), 185 * (1 - q), ease(p, .12, .43));
  const clearing = ease(p, .05, .63);
  const pile = view.one('[data-emerging-pile]');
  pose(pile, -20 * (1 - clearing), 216 * (1 - clearing), mix(.72, 1, clearing));
  fade(pile, 1 - clearing);
  fade(view.one('[data-workstation]'), ease(p, .08, .52));
  fade(view.one('[data-emergence-validation]'), 1 - ease(p, .05, .31));
  move(view.one('[data-gold]'), 144 * (1 - clearing), 38 * (1 - clearing));
  move(view.one('svg.art > .rule-label'), 134 * (1 - clearing), 155 * (1 - clearing));
  view.all('[data-emerging-pile] [data-box]').forEach((node, i) => {
    const t = ease(p, (i % 6) * .04, .69);
    move(node, (i % 2 ? 155 : -155) * t, 65 * t);
  });
  const flag = view.one('svg.art > g[transform^="translate(407"]');
  const throwProgress = ease(p, .36, .94);
  pose(flag, 407 + 353 * (1 - throwProgress),
    697 - 381 * (1 - throwProgress) - 90 * Math.sin(Math.PI * throwProgress), 1, mix(6, -69, throwProgress));
  fade(flag, ease(p, .29, .45));
};

const extraRewards = slide25[6].composition.replace('</svg>', laterRewards.map((reward) =>
  `<g data-validated-reward="${reward.number}">${block(reward, 263, 226, .70)}
    ${text(363, 445, '✓ Accepted', 'body pass')}</g>`).join('') + '</svg>');

export const growRewards: Motion = (view, p) => {
  view.show('25-more-rewards', extraRewards);
  view.all('[data-validated-reward]').forEach((node, index) => {
    const start = index * .48;
    const arrival = ease(p, start, start + .15);
    const leaving = ease(p, start + .23, start + .43);
    move(node, 104 * (1 - arrival) - 69 * leaving, -46 * (1 - arrival), arrival * (1 - leaving));
    fade(node.querySelector<SVGElement>('.pass')!, ease(p, start + .13, start + .22));
  });
  view.all('[data-gold] .coin').forEach((node, index) => {
    if (index < 10) return;
    const start = index < 20 ? .26 : .74;
    const drop = ease(p, start + (index % 10) * .008, start + .15 + (index % 10) * .008);
    move(node, 0, -86 * (1 - drop), drop);
  });
  const [earned, accepted] = view.all('svg.art > .rule-label');
  earned.textContent = `${p < .49 ? 10 : p < .96 ? 20 : 30} units earned`;
  accepted.textContent = `✓ ${p < .26 ? 'One accepted block' : p < .74 ? 'Two accepted blocks' : 'Three accepted blocks'}`;
};

export const settleLogo: Motion = (view, p) => {
  view.animateStill(slide26[1]);
  const q = ease(p, 0, .62);
  const settle = q === 1 ? 0 : Math.sin(Math.PI * q) * (1 - .4 * q);
  pose(view.one('[data-bitcoin-logo]'), 0, 0, 1 + .065 * settle, -6 * settle, 800, 378);
  fade(view.one('.reveal-first'), ease(p, .67, .99));
};

export const revealName: Motion = (view, p) => {
  view.animateStill(slide26[2]);
  fade(view.one('.reveal-last'), ease(p, .32, .87));
};
