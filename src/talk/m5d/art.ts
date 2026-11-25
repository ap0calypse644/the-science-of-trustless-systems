import { character, type Character, type Expression, type Pose } from '../../illustration/character';
import { svgText } from '../../illustration/svg';
import './staging.css';

export function label(x: number, y: number, words: string, style = ''): string {
  return `<text x="${x}" y="${y}" class="${style}">${svgText(words)}</text>`;
}

export function panel(x: number, y: number, width: number, height: number, color = 'plain'): string {
  return `<rect class="paper-panel ${color}" x="${x}" y="${y}" width="${width}" height="${height}" rx="15"/>`;
}

export function arrow(x: number, y: number, to: number): string {
  return `<path class="flow" d="M${x} ${y}H${to}m-16-12 16 12-16 12"/>`;
}

export function machine(x: number, y: number, scale = 1): string {
  return `<g data-prop="hash-machine" transform="translate(${x} ${y}) scale(${scale})">
    <path class="machine-box" d="M-119-91 Q0-100 119-90 L125 79 Q18 93-122 81Z"/>
    <path class="machine-slot" d="M-138-23 L-101-25 L-101 24 L-138 20Z M102-25 L138-24 L138 20 L102 23Z"/>
    <circle class="machine-dial" r="43" cy="-12"/>
    <path class="flow" d="M-16-36l-8 47m47-47-8 47m-49-34h64m-66 18h65"/>
    ${label(0, 64, 'Hash machine', 'small')}
  </g>`;
}

export function ledgerPage(x: number, y: number, rows: readonly string[], mode: 'plain' | 'signed' | 'edited' = 'plain'): string {
  return `<g transform="translate(${x} ${y})" data-prop="ledger-page">
    <path class="ledger-cover" d="M-184-93 Q0-99 188-93 L186 114 Q3 123-183 115Z"/>
    <path class="ledger-paper" d="M-173-102 Q0-109 174-100 L172 103 Q0 111-173 105Z"/>
    ${label(0, -59, mode === 'plain' ? 'Ledger' : 'Signed ledger', 'strong')}
    ${rows.map((row, index) => {
      const line = -11 + 42 * index;
      const bad = mode === 'edited' && index === 0;
      return `<path class="rule" d="M-151 ${line + 13}h301"/>
        ${label(mode === 'plain' ? 0 : -18, line, row, bad ? 'body rejected' : 'body')}
        ${mode === 'plain' ? '' : `<path class="${bad ? 'cross' : 'ink-mark'}" d="${bad
          ? `M128 ${line - 18}l17 17m0-17-17 17`
          : `M118 ${line - 3}q8-21 13-14l-5 17q12-16 10-6l12-7`}"/>`}`;
    }).join('')}
  </g>`;
}

export function person(identity: Character, x: number, y: number, pose: Pose, expression: Expression,
  facing: 'left' | 'right' = 'right', scale = 1): string {
  return character(identity, { x, y, pose, expression, facing, scale });
}

export function grid(x: number, y: number, pattern: string, marks: readonly boolean[] = [], cell = 20): string {
  return `<g data-grid transform="translate(${x} ${y})">
    ${panel(-12, -12, 16 * cell + 24, 16 * cell + 24, 'grid-paper')}
    ${[...pattern].map((bit, index) => {
      const bx = index % 16 * cell;
      const by = Math.floor(index / 16) * cell;
      return `${marks[index] ? `<rect class="changed-bit" x="${bx + 1}" y="${by + 1}" width="${cell - 2}" height="${cell - 2}" rx="3"/>` : ''}
        <text class="bit" x="${bx + cell / 2}" y="${by + cell * .73}">${bit}</text>`;
    }).join('')}
  </g>`;
}

export function bitRow(x: number, y: number, pattern: string, highlighted: readonly number[], success = false, cell = 45): string {
  return `<g data-bit-row transform="translate(${x} ${y})">
    ${[...pattern].map((bit, index) => `<rect class="bit-cell${highlighted.includes(index) ? success ? ' target-bit' : ' changed-bit' : ''}"
      x="${index * cell + 2}" y="0" width="${cell - 4}" height="${cell}" rx="6"/>
      ${label(index * cell + cell / 2, cell * .73, bit, 'digit')}`).join('')}
  </g>`;
}

export function sheet(title: string, description: string, art: string): string {
  return `<div class="talk-sheet hash-sheet">
    <h1>${svgText(title)}</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">
      ${art}
    </svg>
  </div>`;
}
