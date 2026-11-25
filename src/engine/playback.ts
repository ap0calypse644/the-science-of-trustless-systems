import { gsap } from 'gsap';
import { SPEEDS, TIME_EPSILON, currentBeat, stepBeat, validateTiming, type Timing } from './checkpoints';

export interface SceneView {
  render(time: number): void;
  dispose?(): void;
}

export interface AnimatedScene extends Timing {
  readonly pauseAtCheckpoints?: boolean;
  mount(root: HTMLElement, signal: AbortSignal): SceneView;
}

export interface PlaybackState {
  readonly speed: number;
  readonly scene: {
    readonly time: number;
    readonly duration: number;
    readonly beat: string;
    readonly status: 'paused' | 'playing' | 'ended';
  } | null;
}

interface ActiveScene {
  definition: AnimatedScene;
  root: HTMLElement;
  lifetime: AbortController;
  view: SceneView;
  timeline: gsap.core.Timeline;
  stopAt?: number;
}

export class Playback {
  private active: ActiveScene | null = null;
  private speedIndex: number = SPEEDS.indexOf(1);
  private overview = false;

  constructor(private readonly publish: (state: PlaybackState) => void) {}

  enter(root: HTMLElement, definition?: AnimatedScene): void {
    this.dispose();
    if (!definition) return;
    validateTiming(definition);
    const lifetime = new AbortController();
    const view = definition.mount(root, lifetime.signal);
    const timeline = gsap.timeline({ paused: true });
    const active: ActiveScene = { definition, root, lifetime, view, timeline };
    timeline.to({ elapsed: 0 }, { elapsed: definition.duration, duration: definition.duration, ease: 'none' });
    timeline.timeScale(SPEEDS[this.speedIndex]);
    timeline.eventCallback('onUpdate', () => {
      if (this.active !== active) return;
      const stop = active.stopAt;
      if (stop !== undefined && timeline.time() >= stop - TIME_EPSILON) {
        active.stopAt = undefined;
        timeline.pause().time(stop, true);
      }
      this.render();
    });
    timeline.eventCallback('onComplete', () => {
      if (this.active !== active) return;
      timeline.pause();
      this.render();
    });
    this.active = active;
    this.render();
  }

  private report(): void {
    const active = this.active;
    const speed = SPEEDS[this.speedIndex];
    if (!active) {
      this.publish({ speed, scene: null });
      return;
    }
    const { timeline, definition } = active;
    const time = timeline.time();
    this.publish({ speed, scene: {
      time, duration: definition.duration, beat: currentBeat(definition, time).label,
      status: time >= definition.duration - TIME_EPSILON ? 'ended' : timeline.paused() ? 'paused' : 'playing',
    } });
  }

  private render(): void {
    this.active?.view.render(this.active.timeline.time());
    this.report();
  }

  play(): void {
    const active = this.active;
    if (!active || this.overview || active.timeline.time() >= active.definition.duration - TIME_EPSILON) return;
    if (active.definition.pauseAtCheckpoints) {
      active.stopAt = stepBeat(active.definition, active.timeline.time(), 1).time;
    }
    active.timeline.play();
    this.report();
  }

  pause(): void {
    this.active?.timeline.pause();
    this.report();
  }

  toggle(): void {
    if (this.active?.timeline.paused()) this.play();
    else this.pause();
  }

  seek(time: number): void {
    const active = this.active;
    if (!active || !Number.isFinite(time)) return;
    active.stopAt = undefined;
    active.timeline.pause().time(Math.max(0, Math.min(active.definition.duration, time)), true);
    this.render();
  }

  reset(): void { this.seek(0); }

  checkpoint(direction: -1 | 1): void {
    const active = this.active;
    if (active) this.seek(stepBeat(active.definition, active.timeline.time(), direction).time);
  }

  setSpeed(speed: number): void {
    const index = SPEEDS.findIndex((step) => step === speed);
    if (index < 0) return;
    this.speedIndex = index;
    this.active?.timeline.timeScale(speed);
    this.report();
  }

  adjustSpeed(direction: -1 | 1): void {
    const index = Math.max(0, Math.min(SPEEDS.length - 1, this.speedIndex + direction));
    this.setSpeed(SPEEDS[index]);
  }

  setOverview(open: boolean): void {
    this.overview = open;
    if (open) this.pause();
  }

  dispose(): void {
    const active = this.active;
    this.active = null;
    if (active) {
      active.timeline.kill();
      active.lifetime.abort();
      active.view.dispose?.();
      active.root.replaceChildren();
    }
    this.report();
  }
}
