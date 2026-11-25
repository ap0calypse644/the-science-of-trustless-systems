import { svgText } from '../../illustration/svg';
import { signature } from './art';

export interface Entry {
  text: string;
  signed?: boolean;
  rejected?: boolean;
}

export function notebook(x: number, y: number, scale: number, heading: string, entries: readonly Entry[], footer = ''): string {
  return `<g data-prop="blue-notebook" transform="translate(${x} ${y}) scale(${scale})">
    <path class="cafe-shadow" d="M-309 103 Q-45 143 313 105 Q315 132 234 141 Q-96 161-305 126Z"/>
    <path class="notebook-cover" d="M-322-103 Q-145-125 0-101 Q161-123 325-103 L324 103
      Q149 108 4 127 Q-122 111-322 115Z"/>
    <path class="paper" d="M-310-111 Q-139-131-2-108 Q146-128 313-108 L311 91
      Q140 93 2 114 Q-139 95-310 103Z"/>
    <path class="spine" d="M-3-108 Q5-41 0 115"/>
    <path class="notebook-lines" d="M-294-48 Q-145-54-12-42 M12-42 Q159-56 299-48
      M-294 4 Q-145-2-12 10 M12 10 Q159-4 299 4
      M-294 54 Q-145 47-12 60 M12 60 Q159 46 299 54"/>
    <text class="notebook-heading" y="-64">${svgText(heading)}</text>
    ${entries.map(({ text, signed, rejected }, index) => `
      <g transform="translate(0 ${-11 + index * 52})">
        <text class="entry ${rejected ? 'entry-rejected' : ''}" x="${signed ? -42 : 0}" y="0">${svgText(text)}</text>
        ${signed ? signature(229, -5) : ''}
      </g>`).join('')}
    ${footer ? `<text class="notebook-footer" y="87">${svgText(footer)}</text>` : ''}
  </g>`;
}

export function closedNotebook(x: number, y: number, scale: number): string {
  return `<g data-prop="closed-notebook" transform="translate(${x} ${y}) scale(${scale})">
    <path class="notebook-cover" d="M-96-108 Q-9-120 91-104 L89 100 Q3 104-97 115Z"/>
    <path class="paper" d="M-94 104 Q3 88 82 93 L82 103 Q4 109-94 113Z"/>
    <path class="spine" d="M-82-105 L-84 102"/>
    <path class="paper" d="M-60-49 Q7-55 63-45 L62 4 Q-9-1-61 10Z"/>
    <text class="notebook-heading" y="-10">Ledger</text>
  </g>`;
}
