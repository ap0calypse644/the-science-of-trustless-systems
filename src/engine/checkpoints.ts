export interface Checkpoint {
  readonly time: number;
  readonly label: string;
}

export interface Timing {
  readonly duration: number;
  readonly checkpoints: readonly Checkpoint[];
}

// Ignore floating-point noise near exact beats and duration boundaries.
export const TIME_EPSILON = 0.000001;
export const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

export function validateTiming({ duration, checkpoints }: Timing): void {
  if (!Number.isFinite(duration) || duration <= TIME_EPSILON ||
      checkpoints[0]?.time !== 0 || checkpoints.at(-1)?.time !== duration ||
      checkpoints.some(({ time, label }, index) => !Number.isFinite(time) || time < 0 ||
        time > duration || !label.trim() || (index > 0 && time - checkpoints[index - 1].time <= TIME_EPSILON))) {
    throw new RangeError('A scene needs ordered named checkpoints from zero to its finite duration.');
  }
}

export function currentBeat({ checkpoints }: Timing, time: number): Checkpoint {
  const next = checkpoints.findIndex((beat) => beat.time > time + TIME_EPSILON);
  return checkpoints[next < 0 ? checkpoints.length - 1 : Math.max(0, next - 1)];
}

export function stepBeat({ checkpoints }: Timing, time: number, direction: -1 | 1): Checkpoint {
  if (direction > 0) return checkpoints.find((beat) => beat.time > time + TIME_EPSILON) ?? checkpoints[checkpoints.length - 1];
  const firstAtOrAfter = checkpoints.findIndex((beat) => beat.time >= time - TIME_EPSILON);
  return checkpoints[firstAtOrAfter < 0 ? checkpoints.length - 1 : Math.max(0, firstAtOrAfter - 1)];
}
