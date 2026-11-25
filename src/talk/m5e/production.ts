import type { AnimatedScene } from '../../engine/playback';
import { expressions } from '../../illustration/geometry';
import type { TalkSlide } from '../slides';
import { blockArt, pageArt, person, sheet, text } from './art';
import { common, edited, fork, linked, pages, repaired, transaction, unlinkedEdit } from './fixtures';
import { disclosure, notebook, pageTilts, slide18, slide19, slide20, slide21, xs } from './stills';

type Still = (typeof slide18)[number];
type Motion = (view: View, progress: number) => void;

interface Stop {
  time: number;
  label: string;
  still: Still;
  motion?: Motion;
}

class View {
  private key = '';
  private elements = new Map<string, SVGElement[]>();

  constructor(private readonly root: HTMLElement) {}

  show(key: string, composition: string): void {
    if (key === this.key) return;
    this.key = key;
    this.root.innerHTML = composition;
    this.root.dataset.m5eFrame = key;
    this.elements.clear();
  }

  showStill(still: Still): void {
    this.show(still.id, still.composition);
  }

  nodes(selector: string): SVGElement[] {
    let elements = this.elements.get(selector);
    if (!elements) {
      elements = [...this.root.querySelectorAll<SVGElement>(selector)];
      this.elements.set(selector, elements);
    }
    return elements;
  }

  dispose(): void {
    delete this.root.dataset.m5eFrame;
  }
}

function phase(progress: number, start = 0, end = 1): number {
  const p = Math.min(1, Math.max(0, (progress - start) / (end - start)));
  return p * p * (3 - 2 * p);
}

function mix(from: number, to: number, p: number): number {
  return Number((from + (to - from) * p).toFixed(3));
}

function move(el: SVGElement, x = 0, y = 0, opacity = 1): void {
  el.style.translate = `${x.toFixed(3)}px ${y.toFixed(3)}px`;
  el.style.opacity = opacity.toFixed(4);
}

function fade(el: SVGElement, opacity: number): void {
  el.style.opacity = opacity.toFixed(4);
}

const paperBody = 'M718 317Q855 307 986 320';
const unfolded = [693, 725, 1046, 738, 1507, 802, 1531, 805, 1534, 830, 1266, 851, 846, 793, 719, 774, 719, 725];

function expression(view: View, mood: keyof typeof expressions): void {
  const face = expressions[mood];
  const [brows] = view.nodes('[data-part="brows"]');
  const [eyes, dots] = view.nodes('[data-part="eyes"] path');
  const [mouth] = view.nodes('[data-part="mouth"]');
  brows.setAttribute('d', face.brows);
  eyes.setAttribute('d', face.eyes);
  dots.setAttribute('d', face.dots);
  mouth.setAttribute('d', face.mouth);
  mouth.classList.toggle('pupil', face.filled);
}

const moods = ['excited', 'stand', 'confused', 'frustrated'] as const;

function lengthening(previousCount: number, overflow = false): Motion {
  return (view, p) => {
    const q = phase(p, 0, .74);
    expression(view, moods[previousCount / 2 - (p < .63 ? 1 : 0)]);
    const bottom = 425 + (previousCount + 2 * q) * 45;
    const paper = view.nodes('[data-ledger-list] > .paper')[0];
    let outline = `${paperBody}V${bottom}Q846 ${bottom - 11} 719 ${bottom + 4}Z`;
    const fold = overflow ? phase(p, .53, 1) : 0;
    if (fold > 0) {
      // The top and grip stay fixed while the lower edge follows the floor.
      const start = [bottom, bottom, 986, bottom, 986, bottom, 986, bottom, 986, bottom,
        925, bottom, 846, bottom, 719, bottom, 719, bottom + 4];
      const a = start.map((value, i) => mix(value, unfolded[i], fold));
      outline = `${paperBody}V${a[0]}Q986 ${a[1]} ${a[2]} ${a[3]}L${a[4]} ${a[5]}`
        + `Q${a[6]} ${a[7]} ${a[8]} ${a[9]}L${a[10]} ${a[11]}L${a[12]} ${a[13]}`
        + `Q${a[14]} ${a[15]} ${a[16]} ${a[17]}Z`;
    }
    paper.setAttribute('d', outline);
    view.nodes('[data-ledger-list] .tx').slice(previousCount).forEach((row, i) => {
      const ink = phase(p, .19 + i * .30, .40 + i * .30);
      move(row, 20 * (1 - ink), 0, ink);
    });
    if (overflow) move(view.nodes('[data-ledger-overflow]')[0],
      mix(986, 1534, fold) - 1534, mix(bottom, 830, fold) - 830, phase(p, .94, 1));
  };
}

function turnSecondPage(view: View, p: number): void {
  const leaf = view.nodes('[data-page="2"]')[0];
  const turn = phase(p, .10, .62);
  leaf.setAttribute('transform', `translate(818 281) scale(${mix(.055, 1.2, turn)} 1.2)`);
  fade(leaf, phase(p, 0, .19));
  fade(view.nodes('[data-page="2"] .tx')[0], phase(p, .65, .98));
}

const title19 = slide19[0].heading;
const thirdPage = sheet(title19, 'The second page turns over and the third fills.',
  notebook(pages[1], pages[2]));
const fourthPage = sheet(title19, 'The third page turns over and the fourth fills.',
  notebook(pages[2], pages[3]));
const completeSecond = sheet(title19, 'The second page is completed.', notebook(pages[0], pages[1]));

function fillFourPages(view: View, p: number): void {
  if (p < .20) {
    view.show('19-write-page-2', completeSecond);
    view.nodes('[data-page="2"] .tx').slice(1).forEach((node, i) => fade(node, phase(p, i * .085, i * .085 + .075)));
    return;
  }
  if (p < .68) {
    const third = p < .44;
    const q = (p - (third ? .20 : .44)) / .24;
    const number = third ? 3 : 4;
    view.show(`19-write-page-${number}`, third ? thirdPage : fourthPage);
    view.nodes(`[data-page="${number}"]`)[0].setAttribute('transform',
      `translate(818 281) scale(${mix(.06, 1.2, phase(q, 0, .35))} 1.2)`);
    view.nodes(`[data-page="${number}"] .tx`).forEach((row, i) => fade(row, phase(q, .35 + i * .18, .50 + i * .18)));
    return;
  }
  view.showStill(slide19[2]);
  view.nodes('[data-page]').forEach((leaf, i) => {
    const spread = phase(p, .68 + i * .035, .89 + i * .035);
    move(leaf, (800 - xs[i] - 145) * (1 - spread), (i % 2 ? 24 : -22) * (1 - spread), spread);
  });
}

function detach(view: View, p: number): void {
  view.nodes('[data-page]').forEach((page, i) => {
    const lift = phase(p, i * .12, .55 + i * .12);
    move(page, 0, (64 + i * 9) * (1 - lift), .55 + .45 * lift);
  });
  view.nodes('.motion-mark').forEach((mark) => fade(mark, phase(p, .4, .84)));
}

const foldComposition = sheet(title19, 'The four torn faces are folding into blue blocks.',
  pages.map((page, i) => `<g data-folding="${i}">
    <g data-fold-page>${pageArt(xs[i] + 8, 303 - i % 2 * 33, page, 1, true)}</g>
    <g data-fold-block>${blockArt(xs[i], 362, page)}</g>
  </g>`).join(''));

function foldBlocks(view: View, p: number): void {
  view.show('19-folding', foldComposition);
  view.nodes('[data-folding]').forEach((_, i) => {
    const q = phase(p, i * .08, .69 + i * .085);
    const [paper] = view.nodes(`[data-folding="${i}"] [data-fold-page]`);
    const [block] = view.nodes(`[data-folding="${i}"] [data-fold-block]`);
    const y = 303 - i % 2 * 33;
    paper.setAttribute('transform', `translate(${mix(0, -8, q)} ${mix(0, 362 - y, q)})
      rotate(${mix(pageTilts[i], 0, q)} ${xs[i] + 145} 474)`);
    const [face, pageRule] = [...paper.querySelectorAll<SVGPathElement>('path')];
    face.setAttribute('d', `M0 0H274V${mix(332, 247, q)}L253 ${mix(325, 247, q)}
      234 ${mix(333, 247, q)} 193 ${mix(333, 247, q)} 150 ${mix(333, 247, q)} 0 ${mix(333, 247, q)}Z`);
    fade(pageRule, 1 - q);
    paper.querySelectorAll<SVGTextElement>('text').forEach((row) => fade(row, 1 - phase(q, .45, .69)));
    fade(paper, 1 - phase(q, .53, .89));
    move(block, 0, (y - 362) * (1 - q), phase(q, .46, .94));
    block.querySelectorAll<SVGTextElement>('text').forEach((row) => fade(row, phase(q, .72, .93)));
  });
}

function rewriteUnlinked(view: View, p: number, restoring = false): void {
  const old = restoring ? unlinkedEdit[0] : pages[0];
  const next = restoring ? pages[0] : unlinkedEdit[0];
  view.nodes('[data-block="1"] .tx').slice(0, 2).forEach((row, i) => {
    const q = phase(p, .14 + i * .27, .68 + i * .25);
    const changed = q >= .5;
    const payment = (changed ? next : old).rows[i];
    row.textContent = transaction(payment);
    row.classList.toggle('changed-row', !payment.signed);
    move(row, (changed ? 45 : -45) * (1 - Math.abs(2 * q - 1)), 0, Math.abs(2 * q - 1));
  });
  const [charlie] = view.nodes('[data-character="charlie"]');
  if (charlie) move(charlie, -82 * (1 - phase(p, 0, .42)), 0, phase(p, 0, .39));
  const [caption] = view.nodes('svg.art > .body');
  if (caption) fade(caption, phase(p, .65, 1));
}

function copyLink(view: View, p: number, index: number): void {
  const parent = view.nodes(`[data-block="${index + 1}"] .own-hash`)[0];
  const target = view.nodes(`[data-block="${index + 2}"] .previous`)[0];
  // Move a copy of the digest toward the receiving field using that field’s text.
  const travel = phase(p, .18, .81);
  fade(parent, phase(p, 0, .28));
  target.textContent = travel < .92 ? linked[index].digest! : `Prev ${linked[index].digest}`;
  const laneX = xs[index + 1] - 34;
  const sourceX = xs[index] + 137;
  const targetX = xs[index + 1] + 137;
  const x = travel < .27 ? mix(sourceX, laneX, phase(travel, 0, .27))
    : mix(laneX, targetX, phase(travel, .68, 1));
  const y = 196 * (1 - phase(travel, .27, .68));
  target.style.fontSize = travel < .92 ? '18px' : '';
  move(target, x - targetX, y, travel > 0 ? 1 : 0);
  fade(view.nodes('[data-link]')[index], phase(p, .65, .94));
}

function firstLink(view: View, p: number): void {
  copyLink(view, p, 0);
  move(view.nodes('[data-character="alice"]')[0], -115 * (1 - phase(p, 0, .48)), 0, phase(p, 0, .48));
}

const linkingComposition = sheet(slide20[4].heading, 'Alice inserts each predecessor reference in order.',
  slide20[4].art + person('alice', 324, 652, 'point', 'stand', 'right', 1.07));

function finishLinks(view: View, p: number): void {
  view.show('20-copying-links', linkingComposition);
  copyLink(view, phase(p, 0, .47), 1);
  copyLink(view, phase(p, .43, .91), 2);
  fade(view.nodes('[data-character="alice"]')[0], 1 - phase(p, .87, .98));
  fade(view.nodes('[data-block="4"] .own-hash')[0], phase(p, .88, .97));
  fade(view.nodes('svg.art > .question')[0], phase(p, .95, 1));
}

function revealMismatch(view: View, p: number): void {
  const changed = p >= .41;
  const [row] = view.nodes('[data-block="1"] .tx');
  row.textContent = transaction((changed ? edited : linked)[0].rows[0]);
  row.classList.toggle('changed-row', changed);
  view.nodes('[data-block="1"] .own-hash')[0].textContent = `Hash ${(changed ? edited : linked)[0].digest}`;
  fade(view.nodes('[data-link="mismatch"]')[0], phase(p, .44, .83));
  move(view.nodes('[data-character="charlie"]')[0], -90 * (1 - phase(p, .10, .57)), 0, phase(p, .10, .57));
}

function repairLink(view: View, p: number): void {
  const [reference] = view.nodes('[data-block="2"] .previous');
  const [digest] = view.nodes('[data-block="2"] .own-hash');
  reference.textContent = `Prev ${(p < .27 ? linked[1] : repaired[1]).previous}`;
  digest.textContent = `Hash ${(p < .55 ? linked[1] : repaired[1]).digest}`;
  move(reference, 0, -19 * Math.sin(Math.PI * phase(p, .10, .54)));
  fade(digest, .25 + .75 * Math.abs(2 * phase(p, .37, .72) - 1));
  fade(view.nodes('[data-link]')[0], phase(p, .43, .72));
  fade(view.nodes('[data-character="charlie"]')[0], phase(p, .55, .86));
}

function checkedNext(view: View, p: number): void {
  if (p < .34) {
    view.showStill(slide20[6]);
    return;
  }
  view.showStill(slide20[7]);
  fade(view.nodes('[data-link="mismatch"]')[0], phase(p, .34, .72));
  move(view.nodes('[data-character="charlie"]')[0], 0, -26 * Math.sin(Math.PI * phase(p, .35, 1)));
}

function sendPayments(view: View, p: number): void {
  view.nodes('[data-payment-card]').forEach((card, i) => {
    const q = phase(p, i * .28, .69 + i * .28);
    move(card, (i ? -296 : 296) * (1 - q), -65 * (1 - q), q);
  });
}

function extendHistories(view: View, p: number): void {
  view.nodes('[data-block="4"]').forEach((block, i) => {
    const q = phase(p, .2 + i * .29, .65 + i * .29);
    move(block, 140 * (1 - q), 0, q);
  });
  [2, 5].forEach((index, i) => fade(view.nodes('[data-link]')[index], phase(p, .52 + i * .26, .70 + i * .26)));
}

function argue(view: View, p: number): void {
  const q = phase(p, 0, .56);
  view.nodes('[data-character="alice"], [data-character="bob"]').forEach((person, i) => {
    move(person, (i ? 108 : -108) * (1 - q), 0, q);
  });
  fade(view.nodes('[data-speech="alice"]')[0], phase(p, .30, .58));
  fade(view.nodes('[data-speech="bob"]')[0], phase(p, .59, .91));
}

const laneXs = [183, 495, 807];
const forkXs = [91, 425, 759];
const collapse = sheet(slide21[0].heading, 'The repeated block prefix collapses into one shared chain.',
  slide21[4].art
  + `<g data-second-prefix>${common.map((block, i) => blockArt(forkXs[i], 385, block, .88, 'link')).join('')}</g>`);

function mergePrefix(view: View, p: number): void {
  view.show('21-merging', collapse);
  const q = phase(p, .06, .78);
  view.nodes('svg.art > [data-block]').forEach((block, i) => {
    if (i < 3) move(block, (laneXs[i] - forkXs[i]) * (1 - q), -164 * (1 - q));
    else move(block, -105 * (1 - q), (i === 3 ? -9 : 49) * (1 - q));
  });
  view.nodes('[data-second-prefix] [data-block]').forEach((block, i) =>
    move(block, (laneXs[i] - forkXs[i]) * (1 - q), 200 * (1 - q), 1 - phase(p, .55, .79)));
  view.nodes('[data-link], .fork-junction, svg.art > path.link, svg.art > text').forEach((node) =>
    fade(node, phase(p, .69, .99)));
}

function stop(time: number, label: string, still: Still, motion?: Motion): Stop {
  return { time, label, still, motion };
}

function scene(stops: readonly Stop[]): AnimatedScene {
  const last = stops[stops.length - 1];
  return {
    duration: last.time,
    checkpoints: stops.map(({ time, label }) => ({ time, label })),
    pauseAtCheckpoints: true,
    mount(root) {
      const view = new View(root);
      let transition = -1;
      return {
        render(time) {
          const index = stops.findIndex(({ time: end }) => time < end - .000001);
          const current = index < 0 ? last : stops[index - 1];
          const next = stops[index];
          const start = current.time + .20;
          if (!next?.motion || time <= start) {
            transition = -1;
            view.show(`hold-${current.still.id}`, current.still.composition);
            return;
          }
          if (transition !== index) {
            view.showStill(next.still);
            transition = index;
          }
          next.motion(view, (time - start) / (next.time - start));
        },
        dispose: () => view.dispose(),
      };
    },
  };
}

export const m5eCheckpoints = [
  [
    stop(0, 'Short list', slide18[0]),
    stop(3, 'Growing list', slide18[1], lengthening(2)),
    stop(6, 'Concern', slide18[2], lengthening(4)),
    stop(10, 'Overwhelmed', slide18[3], lengthening(6, true)),
  ],
  [
    stop(0, 'First page', slide19[0]),
    stop(3, 'Next page', slide19[1], turnSecondPage),
    stop(9, 'Four pages', slide19[2], fillFourPages),
    stop(12, 'Detach pages', slide19[3], detach),
    stop(17, 'Independent blocks', slide19[4], foldBlocks),
  ],
  [
    stop(0, 'Independent blocks', slide20[0]),
    stop(4, 'Unlinked edit', slide20[1], (view, p) => rewriteUnlinked(view, p)),
    stop(7, 'Restore', slide20[2], (view, p) => rewriteUnlinked(view, p, true)),
    stop(11, 'First link', slide20[3], firstLink),
    stop(17, 'Blockchain', slide20[4], finishLinks),
    stop(21, 'Link mismatch', slide20[5], revealMismatch),
    stop(25, 'Repaired link', slide20[6], repairLink),
    stop(29, 'Next mismatch', slide20[7], checkedNext),
  ],
  [
    stop(0, 'Common history', slide21[0]),
    stop(4, 'Conflicting payments', slide21[1], sendPayments),
    stop(8, 'Competing blocks', slide21[2], extendHistories),
    stop(12, 'Disagreement', slide21[3], argue),
    stop(17, 'Fork', slide21[4], mergePrefix),
  ],
] as const;

const ledgerPrint = sheet(slide18[0].heading, 'The short list and the same ledger after it overflows.',
  `<g transform="translate(-265 25) scale(.93)">${slide18[0].art}</g>
  <g transform="translate(475 -45) scale(.72)">${slide18[3].art}</g>`
  + text(455, 774, 'The first entries', 'body') + text(1190, 774, 'The same ledger keeps growing', 'body'));
const pagesPrint = sheet(slide19[4].heading, 'The four pages become four matching independent blocks.',
  `<g transform="translate(144 32) scale(.82)">${pages.map((page, i) => pageArt(xs[i] + 8, 297, page)).join('')}</g>
  <g transform="translate(144 325) scale(.82)">${slide19[4].art}</g>`);
const linksPrint = sheet(slide20[0].heading, 'The first mismatch and the next mismatch after repair.',
  `<g transform="translate(285 -18) scale(.64)">${slide20[5].art}</g>
   <g transform="translate(285 346) scale(.64)">${slide20[7].art}</g>`);

function production(id: string, stops: readonly Stop[], print: string): TalkSlide {
  const notes = stops.map(({ label, still }) => `${label}. ${still.teachingNotes}`).join('\n\n');
  return { id, composition: stops[0].still.composition, print, scene: scene(stops), notes: `${disclosure}\n\n${notes}` };
}

export const m5eSlides: readonly TalkSlide[] = [
  production('18-growing-ledger', m5eCheckpoints[0], ledgerPrint),
  production('19-pages-to-blocks', m5eCheckpoints[1], pagesPrint),
  production('20-changing-history', m5eCheckpoints[2], linksPrint),
  production('21-conflicting-histories', m5eCheckpoints[3], slide21[4].composition),
];
