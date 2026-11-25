import { svgText } from './svg';

export function envelope(x: number, y: number, scale = 1, tilt = 0): string {
  return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${scale})">
    <path class="prop yellow" d="M-86-52 Q2-56 85-48 L82 49 Q1 53-86 47Z"/>
    <path class="detail" d="M-85-51 Q-33-8 0 8 Q36-15 85-48 M-81 45 l55-52 M78 45 L27-9"/>
    <path class="prop red" d="M-9 4 Q-1-6 9 2 Q16 12 7 19 Q-7 21-13 12Z"/>
  </g>`;
}

export function bubble(x: number, y: number, width: number, words: string, align: -1 | 1): string {
  const half = width / 2;
  return `<g transform="translate(${x} ${y})">
    <path class="head outline" d="M${-half}-17 Q${-half}-40 ${-half + 27}-42 Q-5-47 ${half - 20}-40 Q${half}-38 ${half}-12 L${half - 1} 17 Q${half - 1} 42 ${half - 27} 42 H${align * 49} l${align * 8} 21 l${align * -34}-21 H${-half + 23} Q${-half} 41 ${-half} 16Z"/>
    <text class="bubble-text" y="13">${svgText(words)}</text>
  </g>`;
}

export function ledger(x: number, y: number, angle: number, entries: string): string {
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path class="prop blue" d="M-70-81 Q-7-89 70-79 L68 81 Q7 75-69 83Z"/>
    <path class="head" d="M-59-71 Q13-80 59-70 L57 67 Q12 62-59 72Z"/>
    <path class="detail" d="M-46-59 L-44 64 M-33-41 h52 m-52 29 h37 m-36 29 h44 M-33-57 h66"/>
    <text class="ledger-number" x="15" y="58">${svgText(entries)}</text>
  </g>`;
}

export function laptop(x: number, y: number, working: boolean): string {
  return `<g transform="translate(${x} ${y})">
    <path class="head" d="M-69-32 L51-35 Q58-34 61-27 L50 28 L-54 30Z M-54 30 L50 28 L79 55 Q0 61-79 54Z"/>
    <path class="${working ? 'signal' : 'alarm'} detail" d="${working ? 'M-19 1 l13 12 l24-26' : 'M-14-14 l30 29 m-4-30-30 29'}"/>
  </g>`;
}

export function server(x: number, y: number, working: boolean, hatching = false): string {
  return `<g transform="translate(${x} ${y})">
    <path class="prop neutral" d="M-63-110 Q-18-118 58-108 L60 109 Q-2 118-62 107Z"/>
    <path class="detail" d="M-49-40 Q1-42 48-41 M-48 25 Q-7 22 48 25 M-38-74 h34 M-38-12 h34 M-38 59 h32"/>
    <path class="${working ? 'signal' : 'alarm'} outline" d="${working ? 'M17 58 l12 10 18-24' : 'M17 49 l24 25 m0-25-24 25'}"/>
    ${working ? '' : '<path class="smoke" d="M-35-119 q-45-16-23-44 q-38-34-9-52 q35-13 40 16 q31-1 22 26 q36 14 7 39 M24-132 q34-20 16-43 q16-17 5-33"/>'}
    ${hatching ? '<path class="hatch" d="M-56-98 l9 17 m-10 1 10 18 m93 88-9 18 m19-17-7 18"/>' : ''}
  </g>`;
}

export function handFan(x: number, y: number, angle = 0): string {
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
      <path class="prop blue" d="M-8 27 Q-16-2-65-53 Q-41-84-2-81 Q36-84 65-55 Q16-12 8 26Z"/>
      <path class="detail" d="M-42-62 l39 75 M-13-75 l13 89 M19-73 l-16 87 M48-60 l-44 75"/>
    </g>`;
}

const hats = {
  plume: '<path class="prop blue" d="M-58-16 Q-57-50-22-52 Q24-60 41-22 Q47-10 38 0 L-57-3Z"/><path class="prop red" d="M-9-52 Q-2-93 46-77 Q18-70 9-51Z"/><path class="detail" d="M-64-3 L47-4"/>',
  kettle: '<path class="prop green" d="M-41-21 Q-39-59 3-64 Q34-61 44-27 L59-20 L53-13 Q-5-5-66-16Z"/><path class="detail" d="M-34-28 Q0-37 35-31"/>',
  courier: '<path class="prop purple" d="M-49-11 Q-62-54-22-57 Q11-62 27-29 L51-26 L40-12Z"/>',
};

export type Headwear = keyof typeof hats;

export function headwear(kind: Headwear): string {
  return `<g data-prop="${kind}">${hats[kind]}</g>`;
}

export function flag(x: number, y: number, facing: 'left' | 'right' = 'right'): string {
  return `<path class="detail" data-prop="flag" transform="translate(${x} ${y}) scale(${facing === 'left' ? -1 : 1} 1)"
    d="M0 0 V-178 Q49-195 64-177 L50-144 Q26-161 0-148"/>`;
}

export function crown(x: number, y: number): string {
  return `<path class="prop yellow" d="M${x - 25} ${y} l-9-34 20 11 13-22 17 20 17-12-5 35Z"/>
    <path class="fine" d="M${x - 21} ${y - 10} q23-6 45-2"/>`;
}
