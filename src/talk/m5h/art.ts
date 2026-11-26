import { svgText } from '../../illustration/svg';
import type { TalkSlide } from '../slides';
import './staging.css';

export function text(x: number, y: number, words: string, style = 'label'): string {
  return `<text x="${x}" y="${y}" class="${style}">${svgText(words)}</text>`;
}

export function card(x: number, y: number, width: number, height: number, style = ''): string {
  return `<rect class="record-card ${style}" x="${x}" y="${y}" width="${width}" height="${height}" rx="14"/>`;
}

export function still(id: string, title: string, description: string, art: string, notes: string): TalkSlide {
  return { id, notes: `${description}\n\n${notes}`, composition: `<div class="talk-sheet cafe-sheet beyond-sheet">
    <h1>${svgText(title)}</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">${art}</svg>
  </div>` };
}

export function arrow(x: number, y: number, end: number): string {
  return `<path class="flow-arrow" d="M${x} ${y}H${end}m-16-11 16 11-16 11"/>`;
}
