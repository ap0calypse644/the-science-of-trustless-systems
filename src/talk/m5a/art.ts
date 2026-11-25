import { svgText } from '../../illustration/svg';

export function stagingSheet(title: string, description: string, art: string): string {
  return `<div class="talk-sheet m5a-sheet">
    <h1>${svgText(title)}</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">
      ${art}
    </svg>
  </div>`;
}

export function rack(x: number, y: number, scale: number, status: 'up' | 'down' | 'plain'): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})" data-server="${status}">
    <path class="lavender ink" d="M-80-96 l27-20 132 4 10 25 -22 189 -145-7Z"/>
    <path class="head" d="M-53-115 Q17-119 83-111 L81 102 Q14 110-54 100Z"/>
    <path class="screen" d="M-42-100 L71-97 L70 86 L-42 87Z"/>
    <path class="screen-line" d="M-42-58 h113 m-113 50 h113 m-113 50 h113
      M-31-82 h36 m-36 12 h21 m-21 33 h40 m-40 49 h30 m-30 47 h41"/>
    <path class="${status === 'down' ? 'muted-lamps' : 'lamps'}" d="M55-77 h4 m-4 49 h4 m-4 50 h4 m-4 49 h4"/>
    ${status === 'plain' ? '' : `<circle class="head" cx="19" cy="2" r="38"/>
      <path class="${status === 'down' ? 'alarm' : 'signal'} state-mark" d="${status === 'down' ? 'M2-15 36 19 M36-15 2 19' : 'm-2 3 15 15 28-36'}"/>`}
    <path class="fine" d="m-70-68 8-11 m-8 25 8-12 m-8 25 8-13"/>
  </g>`;
}

export function plug(x: number, y: number, angle: number): string {
  return `<g transform="translate(${x} ${y}) rotate(${angle})">
    <path class="head fine" d="M-10-27 v-15 h6 v15 m9 0 v-15 h6 v15"/>
    <path class="plug-fill" d="M-18-27 Q0-31 18-27 L16-3 Q0 5-16-3Z"/>
    <path class="screen-line" d="M-12-22 h23"/>
  </g>`;
}

export function outlet(x: number, y: number): string {
  return `<g transform="translate(${x} ${y})">
    <rect class="head" x="-27" y="-35" width="54" height="70" rx="8"/>
    <path class="fine" d="M-9-13 v12 m16-13 v12 m-8 13 h4"/>
  </g>`;
}

export function client(x: number, y: number): string {
  return `<g transform="translate(${x} ${y})">
    <path class="head" d="M-41-26 Q1-31 42-27 L39 24 Q-3 26-42 23Z"/>
    <path class="blue-wash ink fine" d="M-33-19 L34-20 L33 15 H-33Z"/>
    <path class="fine" d="M-5 25 v10 m-17 1 h42"/>
  </g>`;
}
