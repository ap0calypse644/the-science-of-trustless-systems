import type { AnimatedScene } from '../../engine/playback';
import type { TalkSlide } from '../slides';
import { ease, fade, move } from '../m5f/motion';
import { stills } from './stills';

type Motion = (view: Frame, progress: number) => void;

interface Checkpoint {
  readonly time: number;
  readonly label: string;
  readonly still: TalkSlide;
  readonly motion?: Motion;
}

class Frame {
  private key = '';
  private readonly nodes = new Map<string, SVGElement[]>();

  constructor(private readonly root: HTMLElement) {}

  show(still: TalkSlide, motion = false): void {
    const key = motion ? `motion-${still.id}` : still.id;
    if (key === this.key) return;
    this.key = key;
    this.root.dataset.m5gFrame = key;
    const packets = motion && still.id.startsWith('29-') && still.id !== '29-commit'
      ? '<g data-packets aria-hidden="true">' + ['alice-bob', 'alice-charlie', 'bob-alice', 'bob-charlie']
        .map((edge) => `<g class="packet ${edge.split('-')[0]}" data-packet="${edge}"><rect x="-13" y="-10" width="26" height="20" rx="4"/>
          <path d="M-8 3l5-6 2 4 7-4"/></g>`).join('') + '</g>'
      : '';
    this.root.innerHTML = still.composition.replace('</svg>', packets + '</svg>');
    this.nodes.clear();
  }

  all(selector: string): readonly SVGElement[] {
    let found = this.nodes.get(selector);
    if (!found) {
      found = [...this.root.querySelectorAll<SVGElement>(selector)];
      this.nodes.set(selector, found);
    }
    return found;
  }

  dispose(): void {
    delete this.root.dataset.m5gFrame;
    this.nodes.clear();
  }
}

function scene(holds: readonly Checkpoint[]): AnimatedScene {
  const final = holds[holds.length - 1];
  return {
    duration: final.time,
    checkpoints: holds.map(({ time, label }) => ({ time, label })),
    pauseAtCheckpoints: true,
    mount(root) {
      const view = new Frame(root);
      return {
        render(time) {
          const nextIndex = holds.findIndex((hold) => hold.time > time + .000001);
          const next = holds[nextIndex];
          const current = next ? holds[nextIndex - 1] : final;
          const start = current.time + .14;
          if (!next?.motion || time <= start) view.show(current.still);
          else next.motion(view, (time - start) / (next.time - start));
        },
        dispose: () => view.dispose(),
      };
    },
  };
}

const [electricity, coins, bonded, weights, reveal, propose, prevote, precommit, commit] = stills;

const bond: Motion = (view, p) => {
  view.show(bonded, true);
  const opening = ease(p, .14, .4);
  view.all('[data-lockbox], .lockbox-face, .glass-line').forEach((node) => fade(node, opening));

  for (const [index, owner] of ['alice', 'bob', 'charlie'].entries()) {
    const delay = index * .045;
    view.all(`[data-stake="${owner}"] .coin`).forEach((coin, i) => {
      const travel = ease(p, .04 + delay + (i % 5) * .015, .66 + delay);
      const lift = Math.sin(Math.PI * travel);
      move(coin, (i % 5 - 2) * 17 * lift, -(56 + i % 6 * 4) * lift);
    });
    const closed = ease(p, .69 + delay, .91 + delay);
    const [lockBody] = view.all(`[data-stake="${owner}"] .lock`);
    fade(lockBody, ease(p, .57 + delay, .74 + delay));
    const [shackle] = view.all(`[data-stake="${owner}"] .lock > path:first-child`);
    move(shackle, 7 * (1 - closed), -18 * (1 - closed));
  }
};

function revealLabels(still: TalkSlide, selector: string): Motion {
  return (view, p) => {
    view.show(still, true);
    view.all(selector).forEach((node, index) => {
      const q = ease(p, .12 + index * .12, .58 + index * .12);
      move(node, 0, 21 * (1 - q), q);
    });
  };
}

function deliver(view: Frame, progress: number): void {
  view.all('[data-packet]').forEach((packet, index) => {
    const [route] = view.all(`[data-edge="${packet.dataset.packet}"] > path:first-child`);
    if (!route) {
      fade(packet, 0);
      return;
    }
    const path = route as SVGPathElement;
    const delay = index * .065;
    const travel = ease(progress, delay, .71 + delay);
    const position = path.getPointAtLength(travel * path.getTotalLength());
    const opacity = ease(progress, delay, .10 + delay) * (1 - ease(progress, .72 + delay, .80 + delay));
    move(packet, position.x, position.y, opacity);
  });
}

const honest = '[data-validator="alice"], [data-validator="bob"]';
const honestStatus = '[data-validator="alice"] .node-state, [data-validator="bob"] .node-state';

function pulseNodes(view: Frame, p: number): void {
  view.all(honest).forEach((node, index) => {
    const q = ease(p, index * .18, .72 + index * .18);
    const card = node.querySelector<SVGRectElement>('.node-card')!;
    card.style.strokeWidth = `${2.7 + 4 * Math.sin(Math.PI * q)}px`;
  });
}

const validateAndPrevote: Motion = (view, p) => {
  if (p < .36) {
    view.show(propose, true);
    deliver(view, p / .36);
    return;
  }
  view.show(prevote, true);
  const q = (p - .36) / .64;
  pulseNodes(view, ease(q, 0, .5));
  view.all(honestStatus).forEach((status, index) => fade(status, ease(q, index * .08, .26 + index * .08)));
  const sent = ease(q, .36, .64);
  view.all('[data-message], [data-edge]').forEach((node) => fade(node, sent));
  deliver(view, (q - .43) / .57);
};

const observeAndPrecommit: Motion = (view, p) => {
  view.show(precommit, true);
  view.all('[data-local-count]').forEach((count, index) => {
    const read = ease(p, .07 + index * .10, .26 + index * .10);
    move(count, 0, 10 * (1 - read), read);
  });
  view.all(honestStatus).forEach((status, index) => {
    const lock = ease(p, .26 + index * .11, .44 + index * .11);
    fade(status, lock);
    const [symbol] = view.all(`[data-validator="${index ? 'bob' : 'alice'}"] .lock`);
    move(symbol, 0, -12 * (1 - lock), lock);
  });
  pulseNodes(view, ease(p, .06, .45));
  view.all('[data-edge], [data-message]').forEach((node) => fade(node, ease(p, .52, .67)));
  deliver(view, (p - .58) / .42);
};

const observeAndCommit: Motion = (view, p) => {
  view.show(commit, true);
  view.all('[data-local-count]').forEach((count, index) => {
    const read = ease(p, .07 + index * .12, .29 + index * .12);
    move(count, 0, 10 * (1 - read), read);
  });
  view.all('.threshold').forEach((threshold) => fade(threshold, ease(p, .10, .31)));
  view.all('[data-committed-block]').forEach((block, index) => {
    const append = ease(p, .35 + index * .15, .64 + index * .15);
    move(block, -34 * (1 - append), -29 * (1 - append), append);
  });
  view.all(honestStatus).forEach((status, index) => fade(status, ease(p, .64 + index * .15, .78 + index * .15)));
  pulseNodes(view, ease(p, .28, .92));
};

const stakeHolds: readonly Checkpoint[] = [
  { time: 0, label: 'Coins', still: coins },
  { time: 4, label: 'Bonded', still: bonded, motion: bond },
  { time: 6, label: 'Voting power', still: weights, motion: revealLabels(weights, '.weight') },
  { time: 8, label: 'Proof of Stake', still: reveal, motion: revealLabels(reveal, '.stake-reveal') },
];

const voteHolds: readonly Checkpoint[] = [
  { time: 0, label: 'Propose', still: propose },
  { time: 5, label: 'Prevote', still: prevote, motion: validateAndPrevote },
  { time: 10.5, label: 'Precommit', still: precommit, motion: observeAndPrecommit },
  { time: 15, label: 'Commit', still: commit, motion: observeAndCommit },
];

function production(id: string, holds: readonly Checkpoint[]): TalkSlide {
  const first = holds[0].still;
  const notes = holds.map(({ label, still }) => `${label}. ${still.notes.split('\n\n')[0]}`);
  return { id, composition: first.composition, print: holds[holds.length - 1].still.composition,
    notes: [...notes, ...first.notes.split('\n\n').slice(1)].join('\n\n'), scene: scene(holds) };
}

export const m5gSlides: readonly TalkSlide[] = [
  { ...electricity, print: electricity.composition },
  production('28-proof-of-stake', stakeHolds),
  production('29-stake-weighted-voting', voteHolds),
];
