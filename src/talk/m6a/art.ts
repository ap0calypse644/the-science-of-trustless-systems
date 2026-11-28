import { svgText } from '../../illustration/svg';
import type { TalkSlide } from '../slides';
import './staging.css';

export function still(id: string, title: string, description: string, art: string, notes: string): TalkSlide {
  return {
    id,
    notes: `${description}\n\n${notes}`,
    composition: `<div class="talk-sheet m6a-sheet cafe-sheet">
      <h1>${svgText(title)}</h1>
      <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">${art}</svg>
    </div>`,
  };
}

export function text(x: number, y: number, words: string, style = ''): string {
  return `<text x="${x}" y="${y}" class="${style}">${svgText(words)}</text>`;
}

export function magnifier(x: number, y: number, scale = 1, angle = 0): string {
  return `<g data-prop="magnifier" transform="translate(${x} ${y}) scale(${scale}) rotate(${angle})">
    <path class="lens-handle" d="M0 0 L13-35 26-31 12 5Z"/>
    <circle class="lens" cx="31" cy="-59" r="34"/>
    <path class="lens-glint" d="M7-62 Q10-76 24-80"/>
  </g>`;
}

export function arrow(x: number, y: number, end: number): string {
  return `<path class="m6-arrow" d="M${x} ${y}H${end}m-15-10 15 10-15 10"/>`;
}
