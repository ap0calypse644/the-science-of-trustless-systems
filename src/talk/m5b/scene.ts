import type { AnimatedScene } from '../../engine/playback';
import { envelope } from '../../illustration/props';
import { thought } from '../two-generals/art';
import { arrival, battlefield, lie, opening, orders, routes } from './battlefield';
import { four, localReports, three } from './model';
import { sheet } from './sheet';
import { fourTable, printComparison, threeTable } from './tables';

export const checkpoints = [
  { time: 0, label: 'Opening' },
  { time: 3, label: 'Direct orders' },
  { time: 6, label: 'Mallory’s report' },
  { time: 9, label: 'Three generals · Direct evidence' },
  { time: 12, label: 'Three generals · Forwarded evidence' },
  { time: 15, label: 'Three generals · Tie' },
  { time: 18, label: 'New run · Charlie joins' },
  { time: 21, label: 'Honest forwarding' },
  { time: 24, label: 'Conflicting forwarding' },
  { time: 27, label: 'Four generals · Direct evidence' },
  { time: 30, label: 'Four generals · Honest reports' },
  { time: 33, label: 'Four generals · Mallory’s reports' },
  { time: 36, label: 'Four generals · Majority' },
] as const;

type Route = keyof typeof routes;

interface Frame {
  time: number;
  subtitle: string;
  body: string;
  motionEnd?: number;
  entrance?: boolean;
}

function sending(time: number, end: number, subtitle: string, route: Route, joined = false, dishonest = false): Frame {
  return {
    time, subtitle, motionEnd: end,
    body: battlefield(dishonest, joined, `<g class="byz-message${dishonest ? ' forwarded' : ''}">
      <path class="script-route" data-message-path d="${routes[route]}"/>
      <g data-moving-report>${envelope(0, 0, .26)}</g>
    </g>`),
  };
}

const directOrder = localReports(three, 'Bob')[0].order;
const [,, bobLie] = localReports(four, 'Bob');
const [,, charlieLie] = localReports(four, 'Charlie');
const openingSubtitle = 'Sent messages arrive. Can you trust the report?';
const threeSubtitle = 'Three generals · one faulty report';
const fourSubtitle = 'Four generals · one faulty general';

const frames: readonly Frame[] = [
  { time: 0, subtitle: openingSubtitle, body: opening },
  sending(.25, 1.55, `Alice sends ${directOrder} to Bob`, 'aliceBob'),
  sending(1.55, 3, `Alice sends ${directOrder} to Mallory`, 'aliceMallory'),
  { time: 3, subtitle: 'Bob sees his direct order', body: orders },
  sending(3.3, 6, 'Mallory forwards a report to Bob', 'malloryBob', false, true),
  { time: 6, subtitle: 'Mallory forwards a different report', body: lie },
  { time: 9, subtitle: threeSubtitle, body: threeTable(1, false) },
  { time: 12, subtitle: threeSubtitle, body: threeTable(2, false) },
  { time: 15, subtitle: threeSubtitle, body: threeTable(2, true) },
  { time: 16.8, subtitle: 'Charlie joins a fresh run', body: battlefield(false, true), entrance: true },
  { time: 18, subtitle: 'Charlie joins the next run', body: arrival },
  sending(18.2, 19.1, 'New run · Alice sends Attack to Bob', 'aliceBob', true),
  sending(19.1, 20, 'New run · Alice sends Attack to Mallory', 'aliceMallory', true),
  sending(20, 21, 'New run · Alice sends Attack to Charlie', 'aliceCharlie', true),
  { time: 21, subtitle: 'Bob and Charlie each received Attack', body: battlefield(false, true) },
  sending(21.3, 22.65, 'Bob forwards Attack to Charlie', 'bobCharlie', true),
  sending(22.65, 24, 'Charlie forwards Attack to Bob', 'charlieBob', true),
  { time: 24, subtitle: 'Mallory sends different reports', body: battlefield(true, true) },
  sending(24.2, 25.3, 'Mallory sends a report to Bob', 'malloryBob', true, true),
  sending(25.3, 26.4, 'Mallory sends a report to Charlie', 'malloryCharlie', true, true),
  { time: 26.4, subtitle: `Mallory reports ${bobLie.order} to Bob and ${charlieLie.order} to Charlie`,
    body: battlefield(true, true, '', thought(1290, 'bob', ['Mallory reports', bobLie.order])) },
  { time: 27, subtitle: fourSubtitle, body: fourTable(1, false) },
  { time: 30, subtitle: fourSubtitle, body: fourTable(2, false) },
  { time: 33, subtitle: fourSubtitle, body: fourTable(3, false) },
  { time: 36, subtitle: fourSubtitle, body: fourTable(3, true) },
];

export const baseline = sheet(openingSubtitle, opening);
export const print = sheet('Three and four generals · one faulty general', printComparison);

export const byzantine: AnimatedScene = {
  duration: 36,
  checkpoints,
  pauseAtCheckpoints: true,
  mount(root) {
    let previous: Frame | undefined;
    let traveler: SVGGElement | null = null;
    let route: SVGPathElement | null = null;
    let charlie: SVGGElement | null = null;
    let length = 0;

    return {
      render(time) {
        const next = frames.findIndex(({ time: start }) => start > time + 0.000001);
        const frame = frames[next === -1 ? frames.length - 1 : Math.max(0, next - 1)];
        if (frame !== previous) {
          root.innerHTML = sheet(frame.subtitle, frame.body);
          traveler = root.querySelector('[data-moving-report]');
          route = root.querySelector('[data-message-path]');
          length = route?.getTotalLength() ?? 0;
          charlie = frame.entrance ? root.querySelector('[data-actor="charlie"]') : null;
          previous = frame;
        }
        if (traveler && route && frame.motionEnd !== undefined) {
          const progress = Math.max(0, Math.min(1, (time - frame.time) / (frame.motionEnd - frame.time)));
          const point = route.getPointAtLength(progress * length);
          traveler.setAttribute('transform', `translate(${point.x.toFixed(2)} ${point.y.toFixed(2)})`);
        }
        if (charlie) {
          const offset = Math.max(0, (18 - time) / (18 - frame.time)) * 130;
          charlie.setAttribute('transform', `translate(0 ${offset.toFixed(2)})`);
          charlie.setAttribute('opacity', String(Math.max(0, 1 - offset / 130)));
        }
      },
    };
  },
};
