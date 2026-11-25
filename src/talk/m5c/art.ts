import { character, type Character, type Expression, type Pose } from '../../illustration/character';
import { svgText } from '../../illustration/svg';
import './staging.css';

const seats = { alice: 309, bob: 802, charlie: 1295 } as const;

export function actor(person: Character, pose: Pose, expression: Expression, x: number = seats[person], y = 378, facing: 'left' | 'right' = person === 'charlie' ? 'left' : 'right'): string {
  return character(person, { x, y, scale: .96, pose, expression, facing });
}

export function coffee(x: number, y: number, scale = 1): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <ellipse class="cafe-shadow" cy="21" rx="43" ry="11"/>
    <path class="head" d="M24-20 Q54-27 49-4 Q46 10 24 7Z"/>
    <path class="cup" d="M-28-29 Q-3-43 26-30 L23 9 Q17 27-17 20 Q-29 15-28-29Z"/>
    <ellipse class="coffee" cx="-1" cy="-27" rx="26" ry="8"/>
    <path class="cafe-detail" d="M-14-46 q-10-11 1-22 m14 22 q-11-11 0-23"/>
  </g>`;
}

export function sandwich(x: number, y: number, scale = 1): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <ellipse class="head" cy="19" rx="61" ry="15"/>
    <path class="bread" d="M-47 4 l89-1 10 10 Q5 23-49 14Z"/>
    <path class="leaf" d="M-47 2 Q-26-6-12 4 Q-1 9 14 2 Q33-2 50 3 L49 9 Q1 11-46 9Z"/>
    <path class="bread" d="M-49 2 Q-31-34-6-37 Q23-33 49 2 Q3 11-49 2Z"/>
    <path class="cafe-detail" d="m-25-12 6-5 m9 3 7-8 m13 8 7-5"/>
  </g>`;
}

export const cafeRoom = `<g data-set="cafe">
  <path class="room-line" d="M106 356 Q774 348 1497 356 M71 510 Q786 521 1530 509"/>
  <g class="window">
    <path class="head" d="M100 159 Q331 153 490 163 L489 331 Q312 343 104 334Z"/>
    <path class="window-glass" d="M113 173 Q300 168 477 174 L475 319 Q297 326 117 321Z"/>
    <path class="cafe-detail" d="M295 170 l1 153 M114 248 Q306 246 477 250
      M132 296 l82-111 m-54 129 91-124 M315 293 l69-103"/>
    <path class="room-line" d="M85 335 Q289 343 508 332"/>
  </g>
  <g class="shelf">
    <path class="room-line" d="M1154 241 Q1301 235 1485 243 M1191 241 v31 m255-31 v30"/>
    <path class="head" d="M1174 235 v-59 q26-4 48 0 v59 m-42-33 h36
      M1373 236 v-44 q25-9 50 0 v44 m-43-25 h35"/>
    <path class="head" d="M1251 235 V183 Q1250 165 1284 167 H1331 Q1344 169 1345 184 V234Z"/>
    <path class="cafe-detail" d="M1264 188 h68 m-25 0 v22 h-25 m-29 16 h87"/>
    <path class="room-line" d="M1060 328 Q1306 322 1510 329"/>
  </g>
  <path class="cafe-detail" d="M733 155 v30 m135-30 v30"/>
  <path class="lamp" d="M704 197 q6-20 28-21 q25 0 33 20Z M837 198 q7-21 30-22 q25 0 32 21Z"/>
</g>`;

export const cafeTable = `<g data-prop="cafe-table">
  <path class="cafe-shadow" d="M116 586 Q790 612 1500 582 Q1301 630 288 625Z"/>
  <path class="table-edge" d="M117 559 Q891 568 1486 558 L1484 578 Q812 601 116 579Z"/>
  <path class="table-top" d="M117 560 L184 529 Q760 515 1411 527 L1486 558 Q831 580 117 560Z"/>
  <path class="cafe-detail" d="M209 540 Q515 534 669 536 m450 2 q143-1 265 2 M171 579 l-5 20 m1270-20 l8 20"/>
  ${coffee(466, 543, .72)}${sandwich(1050, 541, .68)}
</g>`;

export function speech(x: number, y: number, width: number, text: string): string {
  const half = width / 2;
  return `<g transform="translate(${x} ${y})">
    <path class="head" d="M${-half} 4 Q${-half - 3} -30 ${-half + 24} -31 H${half - 22}
      Q${half + 2} -31 ${half} -6 L${half - 1} 12 Q${half - 2} 31 ${half - 23} 31 H38 L17 47 L20 31
      H${-half + 21} Q${-half} 30 ${-half} 4Z"/>
    <text class="dialogue" y="11">${svgText(text)}</text>
  </g>`;
}

export function receipt(x: number, y: number, angle: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path class="paper" d="M-34-46 H32 V48 l-12-8-10 7-11-6-12 7-11-8-10 5Z"/>
    <path class="cafe-detail" d="M-22-29 h42 m-42 17 h26 m-26 19 h31 m-31 18 h16"/>
  </g>`;
}

export function signature(x: number, y: number): string {
  return `<path class="signature" transform="translate(${x} ${y})"
    d="M-45 3 Q-13-32-4-21 Q1-8-29 15 Q-36 21-23 16 Q2 0 15-5 L9 8 Q22-7 34-4 L28 8 L48 1 M-23 23 q28-9 71-9"/>`;
}

export function sheet(title: string, description: string, art: string): string {
  return `<div class="talk-sheet cafe-sheet">
    <h1>${svgText(title)}</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">${art}</svg>
  </div>`;
}
