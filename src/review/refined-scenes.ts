import { personAt, type RefinedStyle } from './refined-characters';

import { bubble, envelope, handFan, laptop, ledger, server } from '../illustration/props';

export type RefinedSample = 'title' | 'failure' | 'message' | 'characters';

function title(style: RefinedStyle): string {
  return `
    <path class="ground" d="M92 567 Q206 556 345 567 M667 574 Q827 564 1014 569 M1134 571 Q1317 561 1496 571"/>
    ${personAt(style, 'alice', 'frustrated', 276, 278, 1.63)}
    ${personAt(style, 'bob', 'suspicious', 800, 290, 1.55)}
    ${personAt(style, 'charlie', 'suspicious', 1278, 299, 1.48)}
    ${ledger(407, 285, -13, '2')}
    ${ledger(656, 437, 13, '3')}
    ${envelope(1236, 418, 1.13, -13)}
    <path class="detail" d="M476 234 q91-61 167 4 m-26-8 26 8-13-24"/>
    <text class="question" x="558" y="360">≠</text>
    <path class="detail signal" d="M1089 322 q-24 10-43 2 m45 19 q-19 13-37 16 M1401 334 l32-17 m-27 34 35 0"/>
    ${style === 'sketch' ? '<path class="hatch" d="M213 573 l-17 18 m39-18-19 18 m560-12-19 15 m39-19-20 19 m410-14-16 16 m41-18-16 18"/>' : ''}
  `;
}

function failure(style: RefinedStyle): string {
  return `
    <path class="panel-rule" d="M790 75 Q800 290 790 594"/>
    <text x="390" y="66">Before</text><text x="1183" y="66">After</text>
    <path class="detail signal" d="M178 420 Q211 475 357 476 Q470 477 535 397 M405 427 Q431 457 475 441 Q513 430 535 397"/>
    <path class="detail broken" d="M946 426 Q996 477 1117 474 Q1192 473 1222 420 M1163 428 Q1179 449 1222 420"/>
    ${personAt(style, 'bob', 'excited', 141, 250, 1.05)}
    ${personAt(style, 'charlie', 'suspicious', 382, 263, 1.05)}
    ${personAt(style, 'bob', 'confused', 909, 249, 1.07)}
    ${personAt(style, 'charlie', 'facepalm', 1146, 260, 1.05)}
    ${personAt(style, 'alice', 'frustrated', 1481, 306, .99)}
    ${laptop(177, 374, true)}${laptop(407, 377, true)}
    ${laptop(946, 378, false)}${laptop(1160, 381, false)}
    ${server(590, 342, true, style === 'sketch')}${server(1298, 365, false, style === 'sketch')}
    <path class="ground" d="M62 474 Q168 470 213 480 M838 480 Q890 474 988 479 M1248 484 Q1382 489 1542 490"/>
    ${bubble(1386, 145, 325, 'I brought a fan.', 1)}
    ${handFan(1425, 325, -26)}
    <path class="detail alarm" d="M1373 205 l-12-17 m24 12 1-23"/>
  `;
}


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
    ${personAt(style, 'alice', 'frustrated', 253, 215, 1.17, 'plume')}
    ${personAt(style, 'bob', 'confused', 1344, 223, 1.16, 'kettle')}
    ${personAt(style, 'charlie', 'run', 773, 453, .86, 'courier')}
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
      ${personAt(style, 'alice', pose, x, y + 3, .92)}
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
