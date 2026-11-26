import { character, type Character, type Expression, type Pose } from '../../illustration/character';
import { svgText } from '../../illustration/svg';
import { transaction, type Block } from './fixtures';
import './staging.css';

export function text(x: number, y: number, words: string, style = ''): string {
  return `<text x="${x}" y="${y}" class="${style}">${svgText(words)}</text>`;
}

export function panel(x: number, y: number, w: number, h: number, style = ''): string {
  return `<rect class="card ${style}" x="${x}" y="${y}" width="${w}" height="${h}" rx="13"/>`;
}

export function person(who: Character, x: number, y: number, pose: Pose, expression: Expression,
  facing: 'left' | 'right' = 'right', scale = 1): string {
  return character(who, { x, y, pose, expression, facing, scale });
}

function rows(block: Block, y: number, step: number): string {
  return block.rows.map((payment, i) =>
    text(137, y + i * step, transaction(payment), payment.signed ? 'tx' : 'tx changed-row')).join('');
}

export function blockArt(x: number, y: number, block: Block, scale = 1, mode: 'plain' | 'link' = 'plain'): string {
  const link = mode === 'link';
  return `<g data-block="${block.number}" transform="translate(${x} ${y}) scale(${scale})">
    <path class="block-top" d="M0 0 30-27H302L274 0Z"/>
    <path class="block-side" d="M274 0 302-27V218L274 247Z"/>
    <path class="block-face" d="M0 0H274V247H0Z"/>
    ${link ? `<rect class="previous-field" x="12" y="10" width="250" height="40" rx="5"/>
      ${text(137, 37, block.previous ? `Prev ${block.previous}` : block.number === 1 ? 'No predecessor' : 'Prev —', 'code previous')}` : ''}
    ${text(137, link ? 83 : 53, `Block ${block.number}`, 'strong')}
    <path class="block-rule" d="M27 ${link ? 93 : 68}H247"/>
    ${rows(block, link ? 127 : 116, 37)}
    ${link && block.digest ? text(137, 233, `Hash ${block.digest}`, 'code own-hash') : ''}
  </g>`;
}

export function pageArt(x: number, y: number, block: Block, scale = 1, loose = false): string {
  return `<g data-page="${block.number}" transform="translate(${x} ${y}) scale(${scale})">
    ${loose ? '<path class="paper" d="M0 0H274V332L253 325 234 333 215 326 193 333 173 326 150 333 124 326 101 333 77 326 54 333 27 327 0 333Z"/>'
      : '<path class="paper" d="M0 0Q120-16 274 0V330Q132 315 0 330Z"/>'}
    <path class="paper-rule" d="M21 40V307M29 135H251M29 181H251M29 227H251"/>
    ${text(137, 66, `Page ${block.number}`, 'strong')}
    ${rows(block, 120, 46)}
  </g>`;
}

export function connection(path: string, endX: number, endY: number,
  state: 'match' | 'mismatch' | 'unchecked' = 'match', marker?: { x: number; y: number }): string {
  return `<g data-link="${state}">
    <path class="link ${state}" d="${path} M${endX - 14} ${endY - 10}l14 10-14 10"/>
    ${marker ? `<circle class="link-marker ${state}" cx="${marker.x}" cy="${marker.y}" r="17"/>
      ${text(marker.x, marker.y + 8, state === 'match' ? '✓' : state === 'mismatch' ? '×' : '?', `state-mark ${state}`)}` : ''}
  </g>`;
}

export function sheet(title: string, description: string, art: string): string {
  return `<div class="talk-sheet history-sheet">
    <h1>${svgText(title)}</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">${art}</svg>
  </div>`;
}
