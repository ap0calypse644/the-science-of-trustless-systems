import type { AnimatedScene } from '../../engine/playback';
import type { TalkSlide } from '../slides';
import { arrow, label, panel, person, sheet } from './art';
import { attempts, editedRow, originalRow } from './fixtures';
import { attemptStrip, fixtureDisclosure, part, pipeline, slide14, slide15, slide16, slide17 } from './stills';

type Motion = (view: SceneView, progress: number) => void;
type Still = (typeof slide14)[number];

interface Stop {
  time: number;
  label: string;
  still: Still;
  motion?: Motion;
}

class SceneView {
  private active = '';
  private elements = new Map<string, SVGElement[]>();

  constructor(private readonly root: HTMLElement) {}

  show(id: string, composition: string): void {
    if (id === this.active) return;
    this.active = id;
    this.root.innerHTML = composition;
    this.root.dataset.m5dFrame = id;
    this.elements.clear();
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    overlay.setAttribute('data-motion', 'pulse');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('display', 'none');
    overlay.innerHTML = '<circle class="machine-dial" cx="0" cy="0" r="17"/><text class="bit" y="6">01</text>';
    this.root.querySelector('svg.art')!.append(overlay);
  }

  erase(): void {
    delete this.root.dataset.m5dFrame;
  }

  nodes(selector: string): SVGElement[] {
    let nodes = this.elements.get(selector);
    if (!nodes) {
      nodes = [...this.root.querySelectorAll<SVGElement>(selector)];
      this.elements.set(selector, nodes);
    }
    return nodes;
  }

  showStill(frame: Still): void {
    this.show(frame.id, frame.composition);
  }
}

const motionPart = (name: string): string => `[data-motion="${name}"]`;
const ledger = '[data-prop="ledger-page"]';
const machine = '[data-prop="hash-machine"]';

function phase(progress: number, start = 0, end = 1): number {
  const value = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return value * value * (3 - 2 * value);
}

function pose(node: SVGElement, opacity: number, x = 0, y = 0, scale = 1, cx = 0, cy = 0): void {
  const value = [opacity, x, y, scale].map((number) => Number(number.toFixed(4)));
  node.style.opacity = String(value[0]);
  node.style.transformOrigin = `${cx}px ${cy}px`;
  node.style.transformBox = 'view-box';
  // CSS transform functions would replace a prop's authored SVG transform.
  // Individual transform properties compose with that original transform.
  node.style.translate = `${value[1]}px ${value[2]}px`;
  node.style.scale = String(value[3]);
}

function reveal(view: SceneView, selector: string, p: number, x = 0, y = 0, stagger = 0): void {
  const nodes = view.nodes(selector);
  nodes.forEach((node, index) => {
    const q = phase(p, index * stagger, 1 - (nodes.length - 1 - index) * stagger);
    pose(node, q, x * (1 - q), y * (1 - q));
  });
}

function passBytes(view: SceneView, p: number, x: number, y: number, to: number): void {
  const [pulse] = view.nodes(motionPart('pulse'));
  pulse.setAttribute('display', p > 0 && p < 1 ? 'inline' : 'none');
  pulse.setAttribute('transform', `translate(${(x + (to - x) * p).toFixed(2)} ${y})`);
}

function fingerprintInput(view: SceneView, p: number): void {
  const q = phase(p, 0, .45);
  pose(view.nodes(motionPart('input'))[0], q, -145 * (1 - q), 0, .72 + .28 * q, 305, 465);
  passBytes(view, phase(p, .28, .79), 510, 465, 1075);
  reveal(view, motionPart('output'), phase(p, .65, .97), -45);
  const pulse = Math.sin(Math.PI * phase(p, .38, .72));
  pose(view.nodes(machine)[0], 1, 0, 0, 1 + pulse * .06, 799, 466);
}

function matchingCopies(view: SceneView, p: number): void {
  reveal(view, motionPart('copy'), phase(p, 0, .63), -155, 0, .25);
  reveal(view, motionPart('match'), phase(p, .43, .92), -74, 0, .25);
  reveal(view, motionPart('result'), phase(p, .84, 1), 0, 14);
}

function editLedger(view: SceneView, progress: number): void {
  if (progress < .28) {
    view.showStill(slide15[0]);
    const q = phase(progress, 0, .28);
    pose(view.nodes('[data-grid]')[0], 1, 52 * q, -42 * q, 1 - .17 * q, 1198, 428);
    return;
  }
  view.showStill(slide15[1]);
  const p = (progress - .28) / .72;
  const [row] = view.nodes(`${ledger} text.body`);
  row.textContent = p < .53 ? originalRow : editedRow;
  const q = phase(p, 0, .58);
  pose(view.nodes('[data-character="charlie"]')[0], q, 120 * (1 - q));
  reveal(view, 'svg.art > text', phase(p, .53, 1), 0, 28, .22);
}

function exposeByte(view: SceneView, p: number): void {
  const q = phase(p, 0, .62);
  view.nodes(motionPart('byte')).forEach((node, index) => {
    pose(node, q, 55 * (1 - q), (index ? -70 : 75) * (1 - q), .44 + .56 * q, 840, index ? 490 : 328);
  });
  reveal(view, '.changed-bit', phase(p, .52, .83));
  reveal(view, motionPart('result'), phase(p, .72, 1), 0, 20);
}

function avalanche(view: SceneView, p: number): void {
  const q = phase(p, 0, .42);
  view.nodes('[data-grid]').forEach((node, index) => {
    pose(node, q, (index ? 130 : -130) * (1 - q), 54 * (1 - q), .46 + .54 * q, index ? 1115 : 485, 464);
  });
  view.nodes('[data-grid]').forEach((grid) => {
    [...grid.querySelectorAll<SVGElement>('.changed-bit')].forEach((node, index, marks) => {
      const start = .36 + .44 * (index / marks.length);
      node.style.opacity = String(phase(p, start, start + .16));
    });
  });
  reveal(view, motionPart('result'), phase(p, .84, 1), 0, 32);
}

const reaction = sheet(slide15[4].title, 'Alice compares the digests and Charlie reacts.',
  slide15[4].art + part('charlie-before', person('charlie', 1283, 440, 'confused', 'suspicious', 'left', 1.1)));

function react(view: SceneView, p: number): void {
  view.show('15-reaction', reaction);
  reveal(view, motionPart('digest-card'), phase(p, 0, .59), -125, 0, .28);
  reveal(view, '[data-character="alice"]', phase(p, .10, .59), -85);
  const entrance = phase(p, .32, .68);
  const [disappointed, mischievous] = view.nodes('[data-character="charlie"]');
  pose(mischievous, p < .72 ? entrance : 0, 80 * (1 - entrance));
  pose(disappointed, p >= .72 ? 1 : 0);
  reveal(view, motionPart('result'), phase(p, .70, 1), 0, 25);
}

function invalidate(view: SceneView, p: number): void {
  const q = phase(p, 0, .53);
  pose(view.nodes(ledger)[0], 1, -185 * (1 - q), -25 * (1 - q));
  const [row] = view.nodes(`${ledger} text.body`);
  row.textContent = p < .46 ? originalRow : editedRow;
  row.classList.toggle('rejected', p >= .46);
  reveal(view, `${ledger} .cross`, phase(p, .46, .66));
  reveal(view, motionPart('result'), phase(p, .53, 1), 70);
}

function restore(view: SceneView, p: number): void {
  const q = phase(p, 0, .47);
  pose(view.nodes(ledger)[0], 1, 185 * (1 - q), 25 * (1 - q));
  // First reestablish the signed row, then add the independent nonce input.
  const [row] = view.nodes(`${ledger} text.body`);
  row.textContent = p < .2 ? editedRow : originalRow;
  row.classList.toggle('rejected', p < .2);
  const [signature] = view.nodes(`${ledger} .ink-mark`);
  pose(signature, phase(p, .2, .38));
  reveal(view, motionPart('nonce'), phase(p, .39, .76), -140);
  reveal(view, motionPart('attempt'), phase(p, .68, 1), -65);
  passBytes(view, phase(p, .42, .87), 520, 412, 1019);
}

function authoredAttempt(index: number): string {
  const { nonce, prefix } = attempts[index];
  const discarded = index > 4 ? attemptStrip(4, index - 1, 724)
    : index > 0 && index <= 3 ? attemptStrip(0, index - 1, 724) : '';
  return sheet(slide16[0].title, `Signed ledger and nonce ${nonce}.`, pipeline(nonce, prefix) + discarded);
}

const attemptFrames = attempts.slice(0, 7).map(({ nonce }) => authoredAttempt(nonce));

function tryNonces(first: number, last: number): Motion {
  return (view, p) => {
    const clock = p * (last - first);
    const index = first + Math.floor(clock);
    const step = clock % 1;
    if (index === last && last === 7) view.showStill(slide16[4]);
    else view.show(`attempt-${index}`, attemptFrames[index]);
    passBytes(view, phase(step, .04, .8), 533, 412, 1020);
    const visible = phase(step, .12, .54);
    reveal(view, motionPart('attempt'), visible, -42);
    const discards = view.nodes(motionPart('discard'));
    if (discards.length) pose(discards[discards.length - 1], phase(step, 0, .5), 150 * (1 - phase(step, 0, .5)), -100 * (1 - phase(step, 0, .5)));
  };
}

function handoff(view: SceneView, p: number): void {
  if (p < .45) {
    view.showStill(slide17[0]);
    const q = phase(p, 0, .45);
    pose(view.nodes(motionPart('candidate'))[0], 1 - phase(p, .32, .45), 225 * q, -55 * Math.sin(q * Math.PI), 1 - .27 * q, 790, 474);
    return;
  }
  view.showStill(slide17[1]);
  const q = phase(p, .45, .67);
  for (const selector of [ledger, motionPart('nonce')]) {
    pose(view.nodes(selector)[0], q, 125 * (1 - q), 0, .85 + .15 * q, 315, 460);
  }
  reveal(view, '[data-character="alice"]', phase(p, .45, .70), -105);
  passBytes(view, phase(p, .63, .86), 533, 412, 1020);
  reveal(view, motionPart('attempt'), phase(p, .82, 1), -60);
  reveal(view, motionPart('result'), phase(p, .89, 1), 0, 25);
}

function compareWork(view: SceneView, p: number): void {
  reveal(view, motionPart('work-row'), phase(p, 0, .83), 0, -42, .20);
  reveal(view, motionPart('result'), phase(p, .30, .76), 80);
}

function stop(time: number, label: string, still: Still, motion?: Motion): Stop {
  return { time, label, still, motion };
}

function scene(stops: readonly Stop[]): AnimatedScene {
  return {
    duration: stops[stops.length - 1].time,
    checkpoints: stops.map(({ time, label }) => ({ time, label })),
    pauseAtCheckpoints: true,
    mount(root) {
      const view = new SceneView(root);
      let transition = -1;
      return {
        render(time) {
          const index = stops.findIndex(({ time: end }) => time < end - .000001);
          if (index === -1) {
            transition = -1;
            view.show(`hold-${stops[stops.length - 1].still.id}`, stops[stops.length - 1].still.composition);
            return;
          }
          const previous = stops[index - 1];
          const next = stops[index];
          const start = previous.time + .24;
          if (time <= start || !next.motion) {
            transition = -1;
            view.show(`hold-${previous.still.id}`, previous.still.composition);
            return;
          }
          if (transition !== index) {
            view.showStill(next.still);
            transition = index;
          }
          next.motion(view, (time - start) / (next.time - start));
        },
        dispose: () => view.erase(),
      };
    },
  };
}

export const m5dCheckpoints = [
  [
    stop(0, 'Machine', slide14[0]),
    stop(3, 'Greeting', slide14[1], fingerprintInput),
    stop(6, 'Ledger', slide14[2], fingerprintInput),
    stop(9, 'Library', slide14[3], fingerprintInput),
    stop(12, 'Identical copies', slide14[4], matchingCopies),
  ],
  [
    stop(0, 'Save original', slide15[0]),
    stop(3, 'Edit amount', slide15[1], editLedger),
    stop(6, 'One bit', slide15[2], exposeByte),
    stop(10, 'Avalanche', slide15[3], avalanche),
    stop(13, 'Edit detected', slide15[4], react),
  ],
  [
    stop(0, 'Target and first miss', slide16[0]),
    stop(3, 'Signature failure', slide16[1], invalidate),
    stop(6, 'Undo and nonce 0', slide16[2], restore),
    stop(10, 'Failed attempts', slide16[3], tryNonces(0, 3)),
    stop(15, 'Nonce 7 succeeds', slide16[4], tryNonces(3, 7)),
  ],
  [
    stop(0, 'Handoff', slide17[0]),
    stop(5, 'Verify once', slide17[1], handoff),
    stop(9, 'Expected work', slide17[2], compareWork),
  ],
] as const;

const fingerprintPrint = sheet(slide14[0].title, 'Different input sizes produce equal-width output, and identical copies match.',
  ['Greeting', 'Ledger', 'Entire library'].map((input, index) => {
    const x = 90 + index * 480;
    return panel(x, 191, 460, 135, 'blue-paper')
      + label(x + 110, 272, input, 'strong') + arrow(x + 212, 257, x + 269)
      + label(x + 362, 272, '256 bits', 'strong');
  }).join('') + `<g transform="translate(218 210) scale(.74)">${slide14[4].art}</g>`);
const avalanchePrint = sheet(slide15[0].title, 'Two digest grids with changed positions outlined.',
  slide15[3].art + label(800, 838, 'Alice checks against the original digest she saved separately.', 'small'));

function production(id: string, stops: readonly Stop[], print: string): TalkSlide {
  const notes = stops.map(({ label, still }) => `${label}. ${still.teachingNotes}`).join('\n\n');
  return {
    id, composition: stops[0].still.composition, print, scene: scene(stops),
    notes: `${fixtureDisclosure} Tell the audience this before showing the first output.\n\n${notes}`,
  };
}

export const m5dSlides: readonly TalkSlide[] = [
  production('14-data-fingerprint', m5dCheckpoints[0], fingerprintPrint),
  production('15-one-bit', m5dCheckpoints[1], avalanchePrint),
  production('16-proof-of-work', m5dCheckpoints[2], slide16[4].composition),
  production('17-easy-verification', m5dCheckpoints[3], slide17[2].composition),
];
