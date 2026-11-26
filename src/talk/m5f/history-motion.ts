import { sheet, text } from './art';
import { initialTrials, original, restored, rewrite, rewritten, type MiningBlock } from './fixtures';
import { ease, mix, move, fade, pose, type Motion, type View } from './motion';
import { aliceMining, compareRewrite, pending, race, raceTitle, slide22, slide23, workTitle } from './stills';

const pendingBlock = (block: MiningBlock, previous: string | null): MiningBlock =>
  ({ ...block, previous, digest: undefined, nonce: undefined });

function showWork(view: View, id: string, art: () => string): void {
  view.show(id, () => sheet(workTitle, 'Nonce attempts and linked predecessor digests.', art()));
}

function pulse(view: View, selector: string, p: number): void {
  const beat = Math.sin(Math.PI * ease(p));
  for (const node of view.all(selector)) move(node, 0, -12 * beat, 1 - .22 * beat);
}

export const introduceNonce: Motion = (view, p) => {
  const trial = initialTrials[0][0];
  if (p < .43) {
    view.show('22-clearing-unmined-inputs', sheet(workTitle, 'Alice clears the old hashes before mining.',
      aliceMining(restored, [])));
    const reposition = ease(p, 0, .41);
    pose(view.one('[data-work-chain]'), 0, 74 * (1 - reposition), mix(1.05 / 1.02, 1, reposition), 0, 800, 276);
    fade(view.one('[data-character="alice"]'), ease(p, .13, .43));
    view.all('.previous, .own-hash').forEach((node) => fade(node, 1 - ease(p, .05, .43)));
    view.all('.nonce, [data-bit-row], svg.art > .body').forEach((node) => fade(node, ease(p, .2, .43)));
    return;
  }
  view.animateStill(slide22[1]);
  const q = ease(p, .46, .88);
  view.all('[data-attempts], [data-block="1"] .nonce, [data-block="1"] .own-hash')
    .forEach((node) => move(node, 0, 26 * (1 - q), q));
  view.one('[data-block="1"] .own-hash').textContent = q === 0 ? 'Hash —' : `Hash ${trial.digest} ×`;
  view.one('[data-block="1"] .nonce').textContent = q === 0 ? 'Nonce —' : `Nonce ${trial.nonce}`;
};

function flyDigest(view: View, number: number, digest: string, p: number, rewriteCopy: boolean): void {
  const stride = rewriteCopy ? 362 * .88 : 362 * 1.02;
  const scale = rewriteCopy ? .88 : 1.02;
  const y = rewriteCopy ? 524 : 276;
  const receiver = (1600 - 3 * stride - 301 * scale) / 2 + number * stride + 137 * scale;
  const source = receiver - stride;
  const nearEdge = receiver - 165 * scale;
  const q = ease(p);
  const x = q < .45 ? mix(source, nearEdge, ease(q, 0, .45))
    : mix(nearEdge, receiver, ease(q, .71, 1));
  const vertical = mix(y + 251 * scale, y + 36 * scale, ease(q, .45, .76));
  const chip = view.one('[data-digest-flight]');
  move(chip, x, vertical, ease(p, 0, .14) * (1 - ease(p, .86, 1)));
}

function chip(digest: string): string {
  return `<g data-digest-flight><rect class="digest-chip" x="-61" y="-23" width="122" height="30" rx="5"/>
    ${text(0, 0, digest, 'code')}</g>`;
}

function originalRun(view: View, number: number, p: number): void {
  const index = number - 1;
  const trials = initialTrials[index];
  const transfer = number > 1 && p < .38;
  const phase = transfer ? 0 : p < .68 && number > 1 ? 1 : 2;
  const candidate = transfer ? pendingBlock(original[index], number === 2 ? original[0].digest! : null) : trials[phase - 1];
  const blocks = [...original.slice(0, index), candidate, ...pending.slice(number)];
  if (number === 1) blocks[1] = pendingBlock(original[1], p < .48 ? null : original[0].digest!);
  const flight = number === 1 ? p >= .48 : transfer && number > 2;
  const digest = original[number === 1 ? 0 : index - 1].digest!;
  showWork(view, `22-original-${number}-${phase}-${flight}`, () => aliceMining(blocks, trials.slice(0, phase))
    + (flight ? chip(digest) : ''));
  if (flight) {
    const q = number === 1 ? ease(p, .48, .96) : ease(p, 0, .38);
    if (number === 1) {
      view.one('[data-block="2"] .previous').textContent = q < .95 ? 'Prev —' : `Prev ${digest}`;
      fade(view.all('[data-link]')[0], ease(q, .8, 1));
    }
    flyDigest(view, number === 1 ? 1 : index, digest, q, false);
  }
  pulse(view, `[data-block="${number}"] .own-hash, [data-attempts]`, ease(p, .39, .86));
}

export const solveFirst: Motion = (view, p) => originalRun(view, 1, p);
export const solveRest: Motion = (view, p) => {
  const step = Math.min(2, Math.floor(p * 3));
  originalRun(view, step + 2, p * 3 - step);
};

export const editFirst: Motion = (view, p) => {
  const edited = p >= .5;
  showWork(view, `22-edit-${edited}`, () =>
    compareRewrite(0, false, edited ? [rewrite[0][0]] : [], edited ? rewritten(0, false) : original));
  const duplicate = ease(p, 0, .39);
  pose(view.one('[data-original-chain]'), 0, 74 * (1 - duplicate), mix(1.02 / .88, 1, duplicate), 0, 800, 202);
  move(view.one('[data-edited-chain]'), 0, -84 * (1 - duplicate), duplicate);
  view.all('svg.art > .body').forEach((label) => fade(label, ease(p, .15, .39)));
  move(view.one('[data-character="charlie"]'), -88 * (1 - ease(p, 0, .38)), 0, ease(p, 0, .38));
  const editedRow = view.all('[data-block="1"] .tx')[3];
  move(editedRow, 0, -15 * Math.sin(Math.PI * ease(p, .29, .72)), .35 + .65 * Math.abs(2 * ease(p, .29, .72) - 1));
};

function retry(view: View, index: number, attemptIndex: number, p: number): void {
  const trials = rewrite[index];
  const values = trials.slice(0, attemptIndex + 1);
  const blocks = rewritten(index, false).map((entry, i) => i === index ? trials[attemptIndex] : entry);
  const solved = attemptIndex === trials.length - 1;
  showWork(view, `22-repair-${index + 1}-try-${attemptIndex + 1}`, () => compareRewrite(index, solved, values, blocks));
  const digest = view.all(`[data-block="${index + 1}"] .own-hash`)[1];
  move(digest, 0, -9 * Math.sin(Math.PI * ease(p)));
  move(view.one('[data-attempts]'), 0, 15 * (1 - ease(p, 0, .58)), ease(p, 0, .58));
}

function transferRepair(view: View, index: number, p: number): void {
  const previous = rewrite[index - 1].at(-1)!;
  const opening = rewritten(index - 1, true);
  const landed = p >= .88;
  const blocks = landed ? rewritten(index, false) : opening;
  showWork(view, `22-repair-${index + 1}-reference-${landed}`,
    () => compareRewrite(index - 1, true, [], blocks) + chip(previous.digest!));
  flyDigest(view, index, previous.digest!, p, true);
}

export const solveEditedFirst: Motion = (view, p) => {
  const index = Math.min(2, Math.floor(p * 3));
  retry(view, 0, index, p * 3 - index);
};

export const startSecondRepair: Motion = (view, p) => {
  if (p < .54) transferRepair(view, 1, p / .54);
  else retry(view, 1, p < .77 ? 0 : 1, (p - .54) / .46);
};

export const finishRepair: Motion = (view, p) => {
  if (p < .17) {
    retry(view, 1, p < .053 ? 1 : 2, p / .17);
    return;
  }
  if (p >= .92) {
    view.animateStill(slide22[7]);
    fade(view.one('.warning-label'), ease(p, .92, 1));
    return;
  }
  const step = p < .55 ? 2 : 3;
  const q = step === 2 ? (p - .17) / .38 : (p - .55) / .37;
  if (q < .38) transferRepair(view, step, q / .38);
  else retry(view, step, q < .71 ? 0 : 1, (q - .38) / .62);
};

const signedRace = slide23[1].composition.replace('</svg>',
  `<g data-race-signature="honest" transform="translate(54 0)"><path class="race-ink" pathLength="1" d="M623 280q16-20 21-10-4 9-13 12 24-16 25-10l-5 12 13-8 11 3"/></g>
   <g data-race-signature="alternate" transform="translate(54 0)"><path class="race-ink" pathLength="1" d="M623 563q16-20 21-10-4 9-13 12 24-16 25-10l-5 12 13-8 11 3"/></g></svg>`);

export function focusRace(index: number): Motion {
  return (view, p) => {
    if (index === 1) {
      view.show('23-sign-and-confirm', signedRace);
      view.all('[data-race-signature] path').forEach((stroke, i) => {
        stroke.style.strokeDasharray = '1';
        stroke.style.strokeDashoffset = (1 - ease(p, .03 + i * .10, .22 + i * .10)).toFixed(4);
        fade(stroke, 1 - ease(p, .46, .76));
      });
    } else view.animateStill(slide23[index]);
    const q = ease(p, index === 1 ? .37 : .12, .85);
    const bracket = view.one('.confirmation-bracket');
    bracket.setAttribute('pathLength', '1');
    bracket.style.strokeDasharray = '1';
    bracket.style.strokeDashoffset = (1 - q).toFixed(4);
    fade(view.one('.focus-ring'), q);
    view.all('svg.art > .lane-label').slice(-2)
      .forEach((node) => move(node, 12 * (1 - q), 0, q));
    move(view.one('[data-character="alice"]'), 0, -9 * Math.sin(Math.PI * q));
  };
}

type Count = readonly [number, number];

export function growRace(from: Count, steps: readonly Count[], raceIndex: number, finalHold: number): Motion {
  return (view, p) => {
    const index = Math.min(steps.length - 1, Math.floor(p * steps.length));
    const counts = steps[index];
    const previous = index ? steps[index - 1] : from;
    const q = ease(p * steps.length - index, .04, .94);
    if (index === steps.length - 1) view.animateStill(slide23[finalHold]);
    else view.show(`23-growing-${counts.join('-')}`, () => sheet(raceTitle, 'Blocks extend both branches in order.',
      race(raceIndex, undefined, counts)));
    const honest = counts[0] > previous[0];
    const added = view.all('[data-race-block]')[honest ? 2 + counts[0] : 2 + counts[0] + counts[1]];
    move(added, 24 * (1 - q), -36 * (1 - q), q);
    const link = view.one(`[data-race-link="${added.dataset.raceBlock}"]`);
    if (link) fade(link, ease(q, .8, 1));
    if (view.one('.confirmation-bracket')) {
      const focus = ease(q, .65, 1);
      fade(view.one('.focus-ring'), focus);
      fade(view.one('.confirmation-bracket'), focus);
      view.all('svg.art > .lane-label').slice(-2).forEach((node) => fade(node, focus));
    }
    const actor = view.one(`[data-character="${honest ? 'alice' : 'charlie'}"]`);
    move(actor, 0, -13 * Math.sin(Math.PI * q));
  };
}
