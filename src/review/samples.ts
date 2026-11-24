// Geometry is intentionally fixed for repeatable comparisons of the three treatments.
export type Candidate = 'whiteboard' | 'notebook' | 'comic';
type Sample = 'title' | 'failure' | 'message';
type Mood = 'calm' | 'puzzled' | 'alarmed';
type Pose = 'point' | 'shrug' | 'hold' | 'run';

const arms: Record<Pose, string> = {
  point: 'M0 83 Q-24 116 -59 118 M1 82 Q32 104 74 69',
  shrug: 'M0 85 Q-39 120 -71 74 M1 86 Q38 117 70 74',
  hold: 'M0 84 Q-34 132 5 132 M0 85 Q48 92 40 126',
  run: 'M0 86 Q29 88 57 53 M0 88 Q-30 112 -53 90',
};

const mouths: Record<Mood, string> = {
  calm: '<path d="M-14 12 Q-4 29 13 13"/>',
  puzzled: '<path d="M-12 21 Q-2 12 13 19"/>',
  alarmed: '<path class="ink" d="M-14 24 Q-1 -1 15 23 Q1 33 -14 24Z"/>',
};

function figure(x: number, y: number, size: number, mood: Mood, pose: Pose, costume = ''): string {
  const legs = pose === 'run'
    ? 'M0 151 Q39 163 58 204 M0 151 Q-15 198 -67 188'
    : 'M0 151 Q-19 176 -38 211 M0 151 Q18 173 38 211';
  return `<g transform="translate(${x} ${y}) scale(${size})">
    <path class="paper" d="M-39 8 C-48 -14 -37 -42 -9 -47 C21 -53 43 -32 46 -3 C48 24 24 47 -3 47 C-24 48 -38 31 -39 8Z"/>
    <path class="fine" d="M-20 -14 l12 -2 M10 -16 l12 4"/>
    <path class="ink" d="M-15 -5 v2 M16 -4 v2"/>
    ${mouths[mood]}
    <path d="M-1 48 Q4 96 0 151 ${arms[pose]} ${legs}"/>
    ${costume}
  </g>`;
}

const scarf = '<path class="accent" d="M-15 48 Q4 56 22 47 L22 59 Q1 67 -14 61 L-41 82 L-39 64Z"/>';
const glasses = '<path class="fine" d="M-29 -13 H-5 V8 H-27Z M7 -13 H30 L28 8 H7Z M-5 -8 H7"/>';
const cap = '<path class="accent-alt" d="M-43 -26 Q-38 -61 1 -62 Q33 -58 40 -25Z M-48 -23 Q-8 -27 52 -22"/>';
const helmet = '<path class="accent" d="M-44 -15 Q-44 -57 -6 -61 Q30 -62 42 -19Z M-51 -16 L49 -18 M-8 -62 L-1 -77 L8 -62"/>';

function envelope(x: number, y: number, size = 1): string {
  return `<g transform="translate(${x} ${y}) scale(${size})">
    <path class="accent" d="M-70 -43 Q0 -46 70 -43 L68 42 Q0 46 -68 42Z"/>
    <path d="M-69 -41 L0 8 L69 -41 M-65 39 L-17 -5 M66 40 L18 -5"/>
    <circle class="paper" cx="0" cy="8" r="11"/>
  </g>`;
}

function bubble(x: number, y: number, width: number, text: string, tail: 'left' | 'right' = 'left'): string {
  const left = -width / 2;
  const right = width / 2;
  const bottom = tail === 'left' ? 'L-20 42 L-61 65 L-51 42' : 'L53 42 L66 65 L25 42';
  return `<g transform="translate(${x} ${y})">
    <path class="bubble" d="M${left} -15 Q${left} -39 ${left + 26} -41 Q0 -49 ${right - 25} -41
      Q${right} -38 ${right} -12 V16 Q${right} 42 ${right - 26} 42 ${bottom}
      H${left + 22} Q${left} 43 ${left} 20Z"/>
    <text class="bubble-text" y="13">${text}</text>
  </g>`;
}

function titleArt(candidate: Candidate): string {
  const treatments: Record<Candidate, string> = {
    whiteboard: '<path class="fine muted" d="M150 553 Q444 557 1000 553 M1119 553 Q1248 556 1446 551"/>',
    notebook: `<path class="accent" stroke="none" d="M125 520 Q62 383 210 293 Q372 212 556 255 Q924 206 1014 360 Q1058 493 876 549 Q390 599 125 520Z"/>
      <path class="fine muted" stroke-dasharray="12 13" d="M1085 253 Q1039 333 1049 440 Q1060 518 1116 544"/>
      <path class="fine muted" d="M1360 242 q-12 59 -75 105 m0 0 2-24 m-2 24 26-4 M154 481 l-28 32 m40-22-27 29"/>`,
    comic: `<path class="accent-alt" stroke="none" d="M71 291 L1010 236 L1020 552 L74 582Z"/>
      <path class="accent" stroke="none" d="M1073 254 L1517 279 L1494 559 L1077 549Z"/>
      <path class="heavy" d="M1037 246 Q1036 381 1046 551"/>
      <path d="M1425 342 l29 -30 M1448 369 l33 -6 M1144 364 l-32 -10"/>
      <path class="fine" d="M105 579 l915 -28 M1094 555 l395 13"/>`,
  };
  return `${treatments[candidate]}
    <g transform="translate(0 25)">
      ${figure(268, 320, 1.0, 'puzzled', 'point', glasses)}
      ${figure(809, 310, 1.04, 'calm', 'hold', scarf)}
      <path class="paper" d="M362 430 Q567 416 830 425 L890 470 Q601 484 335 468Z"/>
      <path d="M367 470 l-7 80 M849 471 l9 81"/>
      <g transform="translate(589 429)">
        <path class="accent-alt" d="M-117 -31 Q-54 -50 0 -21 Q55 -51 120 -33 L143 18 Q57 13 0 36 Q-60 15 -142 19Z"/>
        <path d="M0 -21 V36 M-103 -15 q47-8 81 4 M-111 0 q54-8 89 5 M21 -12 q37-17 86-8 M22 3 q42-14 91-7"/>
      </g>
      ${figure(1280, 313, 1.07, candidate === 'comic' ? 'alarmed' : 'puzzled', 'hold', cap)}
      ${envelope(1294, 431, .86)}
    </g>`;
}

function server(x: number, y: number, working: boolean): string {
  return `<g transform="translate(${x} ${y})">
    <path class="${working ? 'accent-alt' : 'paper'}" d="M-73 -114 Q0 -117 73 -113 L76 111 Q-1 119 -75 111Z"/>
    <path d="M-62 -45 H63 M-62 30 H63 M-52 -79 h38 M-49 -6 h35 M-49 67 h35"/>
    <path class="${working ? 'success' : 'failure'} heavy" d="${working ? 'M21 70 l9 11 l23 -26' : 'M19 53 l30 31 M49 53 l-30 31'}"/>
    ${working ? '' : '<path class="failure" d="M-38 -127 l-23 -25 M-1 -132 l2 -36 M37 -130 l21 -22"/>'}
  </g>`;
}

function serverScene(down: boolean, candidate: Candidate): string {
  const mood = down ? 'alarmed' : 'calm';
  const studentPose = down ? 'shrug' : 'point';
  return `
    <path class="${down ? 'muted' : 'honest'} fine" ${down ? 'stroke-dasharray="12 14"' : ''}
      d="M212 351 Q278 397 343 438 L454 438 M212 475 Q274 453 343 438"/>
    ${figure(153, 292, .68, mood, studentPose, glasses)}
    ${figure(155, 438, .59, down ? 'puzzled' : mood, studentPose, scarf)}
    ${server(513, 404, !down)}
    ${down
      ? figure(644, 397, .66, 'alarmed', 'shrug', cap) + bubble(544, 183, 209, 'Uh-oh.', 'right')
      : bubble(163, 181, 218, 'I’m in!')}
    ${candidate === 'notebook' ? '<path class="fine muted" d="M53 589 q205 10 302 0 m21 0 q112 7 175 0"/>' : ''}
  `;
}

function failureArt(candidate: Candidate): string {
  const frames: Record<Candidate, string> = {
    whiteboard: '<path class="fine muted" d="M796 125 Q800 342 794 568"/><path class="heavy" d="M770 344 h53 m-16-16 16 16-16 15"/>',
    notebook: '<path class="accent" stroke="none" d="M38 112 L747 91 L751 590 L49 607Z"/><path class="accent-alt" stroke="none" d="M856 103 L1556 110 L1550 612 L840 591Z"/><path class="fine muted" d="M764 153 q33-23 72 5 m-17 -17 17 17-22 8"/>',
    comic: '<path class="accent-alt heavy" d="M35 98 L758 92 L754 610 L40 607Z"/><path class="accent heavy" d="M832 94 L1564 103 L1558 611 L839 604Z"/>',
  };
  return `${frames[candidate]}
    <text x="398" y="81">Before</text>
    <text x="1207" y="81">After</text>
    <g transform="translate(25 0)">${serverScene(false, candidate)}</g>
    <g transform="translate(825 0)">${serverScene(true, candidate)}</g>`;
}

function messageArt(candidate: Candidate): string {
  const scenery: Record<Candidate, string> = {
    whiteboard: '<path class="accent-alt" stroke="none" d="M27 486 Q188 419 326 450 Q475 470 553 587 L33 587Z M1064 582 Q1183 438 1289 445 Q1460 419 1569 496 L1572 587Z"/>',
    notebook: '<path class="accent-alt" stroke="none" d="M27 486 Q188 419 326 450 Q475 470 553 587 L33 587Z M1064 582 Q1183 438 1289 445 Q1460 419 1569 496 L1572 587Z"/><path class="fine muted" d="M65 511 l-26 32 m54-39-35 47 m66-55-37 54 m1328-50-35 46 m67-47-32 48 m56-39-27 41 M496 416 q52 19 78 60 m-24-12 24 12-1-23"/>',
    comic: '<path class="accent-alt heavy" d="M36 89 L1568 94 L1562 613 L39 610Z"/><path class="accent" d="M41 487 Q188 419 326 450 Q475 470 553 610 H40Z M1064 610 Q1183 438 1289 445 Q1460 419 1565 496 L1563 610Z"/><path d="M702 306 l-41-24 m23 59-55-4 m344-32 47-25 m-28 63 56-6"/>',
  };
  return `${scenery[candidate]}
    <path d="M42 486 Q188 422 326 452 Q451 469 548 585 M1068 585 Q1180 449 1289 447 Q1459 423 1558 493"/>
    <path class="muted" stroke-dasharray="12 18" d="M350 454 Q520 500 589 521 Q657 547 761 529 M881 532 Q1090 556 1230 463"/>
    <path class="failure heavy" d="M795 511 l43 48 m0-48-43 48"/>
    ${figure(230, 294, .75, 'puzzled', 'point', helmet)}
    ${figure(1326, 290, .76, 'alarmed', 'shrug', helmet)}
    ${figure(769, 413, .51, 'alarmed', 'run', cap)}
    ${envelope(802, 444, .46)}
    ${bubble(244, 151, 278, 'Did it arrive?')}
    ${bubble(1331, 151, 244, 'Still waiting.', 'right')}`;
}

export function drawSample(sample: Sample, candidate: Candidate): string {
  switch (sample) {
    case 'title': return titleArt(candidate);
    case 'failure': return failureArt(candidate);
    case 'message': return messageArt(candidate);
  }
}
