import type { TalkSlide } from '../slides';
import type { AnimatedScene } from '../../engine/playback';

export type Motion = (view: View, progress: number) => void;
export interface Hold {
  readonly time: number;
  readonly label: string;
  readonly still: TalkSlide;
  readonly motion?: Motion;
}

export class View {
  private key = '';
  private readonly cache = new Map<string, SVGElement[]>();

  constructor(private readonly root: HTMLElement) {}

  show(key: string, composition: string | (() => string)): void {
    if (key === this.key) return;
    this.key = key;
    this.root.dataset.m5fFrame = key;
    this.root.innerHTML = typeof composition === 'string' ? composition : composition();
    this.cache.clear();
  }

  showStill(still: TalkSlide): void {
    this.show(still.id, still.composition);
  }

  animateStill(still: TalkSlide): void {
    this.show(`motion-${still.id}`, still.composition);
  }

  all(selector: string): readonly SVGElement[] {
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
    delete this.root.dataset.m5fFrame;
  }
}

export function scene(holds: readonly Hold[]): AnimatedScene {
  const final = holds[holds.length - 1];
  return {
    duration: final.time,
    checkpoints: holds.map(({ time, label }) => ({ time, label })),
    pauseAtCheckpoints: true,
    mount(root) {
      const view = new View(root);
      return {
        render(time) {
          const index = holds.findIndex((hold) => hold.time > time + .000001);
          const current = index === -1 ? final : holds[index - 1];
          const next = holds[index];
          const lead = next ? Math.min(.14, (next.time - current.time) / 8) : 0;
          const start = current.time + lead;
          if (!next?.motion || time <= start) {
            view.showStill(current.still);
            return;
          }
          next.motion(view, (time - start) / (next.time - start));
        },
        dispose: () => view.dispose(),
      };
    },
  };
}

export function ease(p: number, start = 0, end = 1): number {
  const q = Math.max(0, Math.min(1, (p - start) / (end - start)));
  return q * q * (3 - 2 * q);
}

export function mix(a: number, b: number, p: number): number {
  return a + (b - a) * p;
}

export function fade(node: SVGElement, p: number): void {
  node.style.opacity = p.toFixed(4);
}

export function move(node: SVGElement, x: number, y: number, opacity = 1): void {
  node.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
  fade(node, opacity);
}

export function pose(node: SVGElement, x: number, y: number, scale: number, rotate = 0, cx = 0, cy = 0): void {
  node.setAttribute('transform', `translate(${cx + x} ${cy + y}) rotate(${rotate}) scale(${scale}) translate(${-cx} ${-cy})`);
}
