import type { AnimatedScene } from '../../engine/playback';
import type { TalkSlide } from '../slides';
import { ease, fade, mix, move, pose } from '../m5f/motion';
import { applicationStills } from './applications';
import { beyondStills } from './beyond';
import { privacyStills } from './privacy';

type Motion = (view: Frame, progress: number) => void;

interface Hold {
  readonly time: number;
  readonly label: string;
  readonly still: TalkSlide;
  readonly motion?: Motion;
}

class Frame {
  private key = '';
  private readonly cache = new Map<string, SVGElement[]>();

  constructor(private readonly root: HTMLElement) {}

  show(still: TalkSlide, variant = 'hold', composition = still.composition): void {
    const key = variant === 'hold' ? still.id : `${variant}-${still.id}`;
    if (key === this.key) return;
    this.key = key;
    this.root.dataset.m5hFrame = key;
    this.root.innerHTML = composition;
    this.cache.clear();
  }

  all(selector: string): SVGElement[] {
    let nodes = this.cache.get(selector);
    if (!nodes) {
      nodes = [...this.root.querySelectorAll<SVGElement>(selector)];
      this.cache.set(selector, nodes);
    }
    return nodes;
  }

  one(selector: string): SVGElement {
    return this.all(selector)[0];
  }

  dispose(): void {
    this.cache.clear();
    delete this.root.dataset.m5hFrame;
  }
}

function scene(holds: readonly Hold[]): AnimatedScene {
  const final = holds[holds.length - 1];
  return {
    duration: final.time,
    checkpoints: holds.map(({ time, label }) => ({ time, label })),
    pauseAtCheckpoints: true,
    mount(root) {
      const view = new Frame(root);
      return {
        render(time) {
          const index = holds.findIndex((hold) => hold.time > time + .000001);
          const next = holds[index];
          const current = next ? holds[index - 1] : final;
          const start = current.time + .14;
          if (!next?.motion || time <= start) view.show(current.still);
          else next.motion(view, (time - start) / (next.time - start));
        },
        dispose: () => view.dispose(),
      };
    },
  };
}

function svgContents(still: TalkSlide): string {
  const markup = still.composition;
  return markup.slice(markup.indexOf('>', markup.indexOf('<svg')) + 1, markup.lastIndexOf('</svg>'));
}

// Keep both vector compositions mounted during a replacement so the outgoing
// props can move while the incoming groups reveal on their own schedule.
function paired(from: TalkSlide, to: TalkSlide): string {
  const markup = to.composition;
  const start = markup.indexOf('>', markup.indexOf('<svg')) + 1;
  return markup.slice(0, start) + `<g data-outgoing aria-hidden="true">${svgContents(from)}</g>
    <g data-incoming>${svgContents(to)}</g></svg></div>`;
}

function replace(from: TalkSlide, to: TalkSlide, animate: Motion): Motion {
  const composition = paired(from, to);
  return (view, p) => {
    view.show(to, 'transition', composition);
    const out = ease(p, .04, .48);
    const incoming = ease(p, .29, .65);
    move(view.one('[data-outgoing]'), -62 * out, 0, 1 - out);
    move(view.one('[data-incoming]'), 0, 23 * (1 - incoming), incoming);
    animate(view, p);
  };
}

function enter(node: SVGElement, p: number, offset = 24): void {
  move(node, 0, offset * (1 - p), p);
}

const [tip, iceberg, internet, parallel] = beyondStills;
const [credentials, provenance, timestamping, infrastructure, graduation, verification, question, answer] = applicationStills;
const [interview, handoff, oversharing, privacyQuestion, cafe, house] = privacyStills;

const pullbackArt = iceberg.composition.replace('<g data-submerged>',
  '<defs><clipPath id="m5h-water-reveal"><rect x="90" y="393" width="1420" height="0"/></clipPath></defs>'
  + '<g data-submerged clip-path="url(#m5h-water-reveal)">');

const pullback: Motion = (view, p) => {
  view.show(iceberg, 'motion', pullbackArt);
  const q = ease(p, .02, .80);
  pose(view.one('[data-iceberg-tip]'), 0, 0, mix(1.16, 1, q), 0, 858, 393);
  pose(view.one('[data-boat]'), mix(335, 320, q), 386, mix(.98, .78, q));
  view.one('#m5h-water-reveal rect').setAttribute('height', String(445 * ease(p, .16, .86)));
  const water = view.one('.water');
  water.setAttribute('d', `M90 393H1510V${mix(666, 814, q)}Q1428 ${mix(683, 833, q)} 1330 ${mix(665, 815, q)}H90Z`);
  view.all('.ice-label').forEach((node, i) => fade(node, ease(p, .37 + i * .11, .51 + i * .11)));
};

const internetAnalogy = replace(iceberg, internet, (view, p) => {
  view.all('[data-incoming] [data-application]').forEach((node, i) =>
    enter(node, ease(p, .42 + i * .10, .61 + i * .10)));
});

const addParallel: Motion = (view, p) => {
  view.show(parallel, 'motion');
  const q = ease(p, 0, .47);
  move(view.one('[data-infrastructure="Internet"]'), 0, 114 * (1 - q));
  view.all('svg.art > .diagram-heading').forEach((node) => move(node, 0, 110 * (1 - q)));
  const reveal = ease(p, .32, .61);
  enter(view.one('[data-infrastructure="Blockchain"]'), reveal, 66);
  view.all('[data-infrastructure="Blockchain"] [data-application]').forEach((node, i) =>
    enter(node, ease(p, .44 + i * .11, .61 + i * .11)));
};

function addPanel(still: TalkSlide): Motion {
  return (view, p) => {
    view.show(still, 'motion');
    const panel = view.all('[data-application-panel]').at(-1)!;
    const q = ease(p, .12, .76);
    enter(panel, q, 52);
    fade(panel.querySelector<SVGElement>('.app-icon')!, ease(p, .31, .80));
  };
}

const issueCredential = replace(infrastructure, graduation, (view, p) => {
  const issued = ease(p, .47, .91);
  move(view.one('[data-incoming] [data-credential]'), 120 * (1 - issued), -18 * (1 - issued), issued);
  fade(view.one('[data-graduation] .signature'), ease(p, .55, .82));
});

const verifyCredential = replace(graduation, verification, (view, p) => {
  const present = ease(p, .30, .65);
  move(view.one('[data-incoming] [data-credential]'), -91 * (1 - present), 24 * (1 - present), present);
  view.all('[data-incoming] .query-line').forEach((node) => {
    const q = ease(p, .57, .82);
    node.style.strokeDashoffset = String(26 * (1 - q));
    fade(node, q);
  });
  view.all('[data-verification] > .application').forEach((node, i) => enter(node, ease(p, .69 + .08 * i, .86 + .08 * i), 12));
  fade(view.one('[data-verification] > g:last-child'), ease(p, .59, .81));
});

const poseQuestion = replace(verification, question, (view, p) => {
  view.all('[data-choice]').forEach((node, i) => enter(node, ease(p, .29 + i * .15, .59 + i * .15), 50));
});

const revealDecision: Motion = (view, p) => {
  view.show(answer, 'motion');
  view.all('.mark').forEach((node, i) => enter(node, ease(p, .13 + .20 * i, .34 + .20 * i), 22));
  fade(view.one('svg.art > .label'), ease(p, .67, .94));
};

const passTranscript: Motion = (view, p) => {
  view.show(handoff, 'motion');
  const shift = ease(p, 0, .35);
  move(view.one('[data-interview]'), 340 * (1 - shift), 0);
  const passed = ease(p, .13, .56);
  move(view.one('[data-handoff]'), -105 * (1 - passed), 14 * Math.sin(Math.PI * passed), ease(p, .10, .24));
  const enlarged = ease(p, .47, .92);
  pose(view.one('[data-transcript]'), -430 * (1 - enlarged), 28 * (1 - enlarged),
    mix(.26, 1, enlarged), 0, 1217, 506);
  fade(view.one('[data-transcript]'), ease(p, .47, .67));
  const [arms, bubble] = view.all('[data-interview] > .actor-line, [data-handoff] + g');
  fade(arms, ease(p, .36, .56));
  fade(bubble, ease(p, .32, .54));
};

const emphasizeFields: Motion = (view, p) => {
  view.show(oversharing, 'motion');
  fade(view.one('.needed .field-band'), ease(p, .07, .28));
  view.all('.extra .field-band').forEach((node, i) => fade(node, ease(p, .24 + .064 * i, .46 + .064 * i)));
  fade(view.one('[data-transcript] > .small-label'), ease(p, .64, .92));
  fade(view.one('[data-interview] > .desk + g'), ease(p, .67, .89));
};

const askForLess: Motion = (view, p) => {
  view.show(privacyQuestion, 'motion');
  view.all('[data-interview] > .desk ~ g:not([data-transcript])').forEach((node, i) =>
    enter(node, ease(p, .14 + .32 * i, .45 + .32 * i), 14));
};

const revealLedgers = replace(privacyQuestion, cafe, (view, p) => {
  view.all('[data-cafe-copy]').forEach((node, i) => enter(node, ease(p, .37 + i * .10, .59 + i * .10), 42));
  const q = ease(p, .72, .94);
  view.one('[data-highlight-entry]').style.transformBox = 'fill-box';
  view.one('[data-highlight-entry]').style.transformOrigin = 'left';
  view.one('[data-highlight-entry]').style.scale = `${q} 1`;
  fade(view.one('[data-cafe-callback] > g:last-child'), ease(p, .79, .97));
});

const closeGlassHouse = replace(cafe, house, (view, p) => {
  const walls = ease(p, .35, .86);
  move(view.one('.glass-front'), -74 * (1 - walls), 0, walls);
  move(view.one('.glass-side'), 93 * (1 - walls), 0, walls);
  move(view.one('.glass-roof'), 0, -40 * (1 - walls), ease(p, .48, .89));
  fade(view.one('.glass-seam'), ease(p, .60, .95));
  view.all('.glass-label').forEach((node, i) => fade(node, ease(p, .62 + i * .034, .79 + i * .034)));
});

const beyondHolds: readonly Hold[] = [
  { time: 0, label: 'Iceberg tip', still: tip },
  { time: 4, label: 'Iceberg reveal', still: iceberg, motion: pullback },
  { time: 7.5, label: 'Internet analogy', still: internet, motion: internetAnalogy },
  { time: 11, label: 'Parallel comparison', still: parallel, motion: addParallel },
];

const applicationHolds: readonly Hold[] = [
  { time: 0, label: 'Credentials', still: credentials },
  { time: 2, label: 'Provenance', still: provenance, motion: addPanel(provenance) },
  { time: 4, label: 'Timestamping', still: timestamping, motion: addPanel(timestamping) },
  { time: 6, label: 'Shared infrastructure', still: infrastructure, motion: addPanel(infrastructure) },
  { time: 10, label: 'Graduation', still: graduation, motion: issueCredential },
  { time: 14, label: 'Employer verification', still: verification, motion: verifyCredential },
  { time: 17.5, label: 'Design question', still: question, motion: poseQuestion },
  { time: 20.5, label: 'Decision', still: answer, motion: revealDecision },
];

const privacyHolds: readonly Hold[] = [
  { time: 0, label: 'Interview', still: interview },
  { time: 3.5, label: 'Transcript handoff', still: handoff, motion: passTranscript },
  { time: 6.5, label: 'Oversharing', still: oversharing, motion: emphasizeFields },
  { time: 9, label: 'Alice’s question', still: privacyQuestion, motion: askForLess },
  { time: 13, label: 'Transparent café ledger', still: cafe, motion: revealLedgers },
  { time: 17.5, label: 'Glass house', still: house, motion: closeGlassHouse },
];

function production(id: string, holds: readonly Hold[]): TalkSlide {
  const first = holds[0].still;
  const notes = holds.map(({ label, still }) => `${label}. ${still.notes.split('\n\n')[0]}`);
  return {
    id, composition: first.composition, print: holds[holds.length - 1].still.composition,
    notes: [...notes, ...first.notes.split('\n\n').slice(1)].join('\n\n'),
    scene: scene(holds),
  };
}

export const m5hSlides: readonly TalkSlide[] = [
  production('30-blockchain-beyond-currency', beyondHolds),
  production('31-agree-on', applicationHolds),
  production('32-privacy-bridge', privacyHolds),
];
