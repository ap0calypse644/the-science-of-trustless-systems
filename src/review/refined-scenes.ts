import { personAt, type RefinedStyle } from './refined-characters';

export type RefinedSample = 'title' | 'failure' | 'message' | 'characters';

function envelope(x: number, y: number, scale: number, tilt: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${scale})">
    <path class="prop yellow" d="M-86-52 Q2-56 85-48 L82 49 Q1 53-86 47Z"/>
    <path class="detail" d="M-85-51 Q-33-8 0 8 Q36-15 85-48 M-81 45 l55-52 M78 45 L27-9"/>
    <path class="prop red" d="M-9 4 Q-1-6 9 2 Q16 12 7 19 Q-7 21-13 12Z"/>
  </g>`;
}

function bubble(x: number, y: number, width: number, words: string, align: -1 | 1): string {
  const half = width / 2;
  return `<g transform="translate(${x} ${y})">
    <path class="head outline" d="M${-half}-17 Q${-half}-40 ${-half + 27}-42 Q-5-47 ${half - 20}-40 Q${half}-38 ${half}-12 L${half - 1} 17 Q${half - 1} 42 ${half - 27} 42 H${align * 49} l${align * 8} 21 l${align * -34}-21 H${-half + 23} Q${-half} 41 ${-half} 16Z"/>
    <text class="bubble-text" y="13">${words}</text>
  </g>`;
}

function ledger(x: number, y: number, angle: number, entries: string): string {
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path class="prop blue" d="M-70-81 Q-7-89 70-79 L68 81 Q7 75-69 83Z"/>
    <path class="head" d="M-59-71 Q13-80 59-70 L57 67 Q12 62-59 72Z"/>
    <path class="detail" d="M-46-59 L-44 64 M-33-41 h52 m-52 29 h37 m-36 29 h44 M-33-57 h66"/>
    <text class="ledger-number" x="15" y="58">${entries}</text>
  </g>`;
}

function title(style: RefinedStyle): string {
  return `
    <path class="ground" d="M92 567 Q206 556 345 567 M667 574 Q827 564 1014 569 M1134 571 Q1317 561 1496 571"/>
    ${personAt(style, 'isha', 'frustrated', 276, 278, 1.63)}
    ${personAt(style, 'noor', 'suspicious', 800, 290, 1.55)}
    ${personAt(style, 'dev', 'suspicious', 1278, 299, 1.48)}
    ${ledger(407, 285, -13, '2')}
    ${ledger(656, 437, 13, '3')}
    ${envelope(1236, 418, 1.13, -13)}
    <path class="detail" d="M476 234 q91-61 167 4 m-26-8 26 8-13-24"/>
    <text class="question" x="558" y="360">≠</text>
    <path class="detail signal" d="M1089 322 q-24 10-43 2 m45 19 q-19 13-37 16 M1401 334 l32-17 m-27 34 35 0"/>
    ${style === 'sketch' ? '<path class="hatch" d="M213 573 l-17 18 m39-18-19 18 m560-12-19 15 m39-19-20 19 m410-14-16 16 m41-18-16 18"/>' : ''}
  `;
}

function terminal(x: number, y: number, working: boolean): string {
  return `<g transform="translate(${x} ${y})">
    <path class="head" d="M-69-32 L51-35 Q58-34 61-27 L50 28 L-54 30Z M-54 30 L50 28 L79 55 Q0 61-79 54Z"/>
    <path class="${working ? 'signal' : 'alarm'} detail" d="${working ? 'M-19 1 l13 12 l24-26' : 'M-14-14 l30 29 m-4-30-30 29'}"/>
  </g>`;
}

function server(x: number, y: number, working: boolean, style: RefinedStyle): string {
  return `<g transform="translate(${x} ${y})">
    <path class="prop neutral" d="M-63-110 Q-18-118 58-108 L60 109 Q-2 118-62 107Z"/>
    <path class="detail" d="M-49-40 Q1-42 48-41 M-48 25 Q-7 22 48 25 M-38-74 h34 M-38-12 h34 M-38 59 h32"/>
    <path class="${working ? 'signal' : 'alarm'} outline" d="${working ? 'M17 58 l12 10 18-24' : 'M17 49 l24 25 m0-25-24 25'}"/>
    ${working ? '' : '<path class="smoke" d="M-35-119 q-45-16-23-44 q-38-34-9-52 q35-13 40 16 q31-1 22 26 q36 14 7 39 M24-132 q34-20 16-43 q16-17 5-33"/>'}
    ${style === 'sketch' ? '<path class="hatch" d="M-56-98 l9 17 m-10 1 10 18 m93 88-9 18 m19-17-7 18"/>' : ''}
  </g>`;
}

function failure(style: RefinedStyle): string {
  return `
    <path class="panel-rule" d="M790 75 Q800 290 790 594"/>
    <text x="390" y="66">Before</text><text x="1183" y="66">After</text>
    <path class="detail signal" d="M178 420 Q211 475 357 476 Q470 477 535 397 M405 427 Q431 457 475 441 Q513 430 535 397"/>
    <path class="detail broken" d="M946 426 Q996 477 1117 474 Q1192 473 1222 420 M1163 428 Q1179 449 1222 420"/>
    ${personAt(style, 'noor', 'excited', 141, 250, 1.05)}
    ${personAt(style, 'dev', 'suspicious', 382, 263, 1.05)}
    ${personAt(style, 'noor', 'confused', 909, 249, 1.07)}
    ${personAt(style, 'dev', 'facepalm', 1146, 260, 1.05)}
    ${personAt(style, 'isha', 'frustrated', 1481, 306, .99)}
    ${terminal(177, 374, true)}${terminal(407, 377, true)}
    ${terminal(946, 378, false)}${terminal(1160, 381, false)}
    ${server(590, 342, true, style)}${server(1298, 365, false, style)}
    <path class="ground" d="M62 474 Q168 470 213 480 M838 480 Q890 474 988 479 M1248 484 Q1382 489 1542 490"/>
    ${bubble(1386, 145, 325, 'I brought a fan.', 1)}
    <g transform="translate(1425 325) rotate(-26)">
      <path class="prop blue" d="M-8 27 Q-16-2-65-53 Q-41-84-2-81 Q36-84 65-55 Q16-12 8 26Z"/>
      <path class="detail" d="M-42-62 l39 75 M-13-75 l13 89 M19-73 l-16 87 M48-60 l-44 75"/>
    </g>
    <path class="detail alarm" d="M1373 205 l-12-17 m24 12 1-23"/>
  `;
}

const plumeHelmet = '<path class="prop blue" d="M-58-16 Q-57-50-22-52 Q24-60 41-22 Q47-10 38 0 L-57-3Z"/><path class="prop red" d="M-9-52 Q-2-93 46-77 Q18-70 9-51Z"/><path class="detail" d="M-64-3 L47-4"/>';
const kettleHelmet = '<path class="prop green" d="M-41-21 Q-39-59 3-64 Q34-61 44-27 L59-20 L53-13 Q-5-5-66-16Z"/><path class="detail" d="M-34-28 Q0-37 35-31"/>';
const courierCap = '<path class="prop purple" d="M-49-11 Q-62-54-22-57 Q11-62 27-29 L51-26 L40-12Z"/>';

function message(style: RefinedStyle): string {
  return `
    <path class="outline" d="M39 420 Q192 359 337 431 Q400 465 457 546 M1134 546 Q1183 456 1264 417 Q1390 384 1560 421"/>
    <path class="ground" d="M66 449 q120-48 274 25 M1226 478 q149-75 302-32 M450 571 q299 31 671 9"/>
    <path class="detail broken" d="M398 496 Q615 598 733 537 M902 539 Q1045 585 1248 462"/>
    <g class="fort">
      <path d="M666 382 L666 300 l24-1 l0 18 l20 0 l1-18 l21 1 l0 20 l27 0 l0-42 l20 0 l1 16 l26 0 l0-16 l20 0 l0 41 l37-1 l0-19 l23 2 l0 18 l20 0 l0-17 l22 1 l-1 79Z"/>
      <path d="M773 382 v-25 q21-36 41 0 v25 M696 344 v13 M886 344 v13"/>
    </g>
    <path class="detail" d="M105 403 V225 Q154 208 169 226 L155 259 Q131 242 105 255 M1502 407 V223 Q1455 204 1434 222 L1448 254 Q1476 245 1500 253"/>
    ${personAt(style, 'isha', 'frustrated', 253, 215, 1.17, plumeHelmet)}
    ${personAt(style, 'noor', 'confused', 1344, 223, 1.16, kettleHelmet)}
    ${personAt(style, 'dev', 'run', 773, 453, .86, courierCap)}
    <path class="head outline" d="M680 551 Q745 522 806 541 Q866 525 946 550 Q927 574 856 575 Q788 591 733 572 Q690 576 680 551Z"/>
    <path class="detail" d="M711 553 q29-7 47-1 M799 554 q21 7 50 0 M871 560 q30-11 52-7"/>
    ${envelope(872, 492, .93, -16)}
    <path class="prop blue" d="M926 526 q14-22 34-15 q-2 10-31 19Z M803 526 q-14-18-31-12 q2 9 27 15Z"/>
    ${bubble(270, 78, 313, 'Any minute now.', -1)}
    ${bubble(1340, 78, 310, 'Was that a goat?', 1)}
    <path class="prop blue" d="M722 440 q-20-5-10-22 q8 4 12 16Z M739 425 q-13-9 1-22 q5 7 4 18Z"/>
    <path class="detail" d="M652 492 l-34-6 m24 29-45-5 M1030 554 l30-15 m-11 29 37-10"/>
    ${style === 'sketch' ? '<path class="hatch" d="M87 427 l-19 25 m41-33-26 37 m51-42-26 42 m1351-37-14 26 m32-25-14 30 m34-30-9 24"/>' : ''}
  `;
}

function characters(style: RefinedStyle): string {
  const poses = [
    ['stand', 'Neutral', 224, 94],
    ['excited', 'Excited', 604, 94],
    ['confused', 'Confused', 987, 94],
    ['suspicious', 'Mischievous', 1370, 94],
    ['frustrated', 'Frustrated', 366, 390],
    ['facepalm', 'Facepalm', 790, 390],
    ['run', 'On the run', 1220, 390],
  ] as const;

  return poses.map(([pose, label, x, y]) => `
    <g data-pose="${pose}">
      ${personAt(style, 'isha', pose, x, y + 3, .92)}
      ${pose === 'run' ? envelope(x + 69, y + 72, .37, -12) : ''}
      <text x="${x}" y="${y + 218}">${label}</text>
    </g>`
  ).join('');
}

export function drawRefinedSample(sample: RefinedSample, style: RefinedStyle): string {
  switch (sample) {
    case 'title': return title(style);
    case 'failure': return failure(style);
    case 'message': return message(style);
    case 'characters': return characters(style);
  }
}
