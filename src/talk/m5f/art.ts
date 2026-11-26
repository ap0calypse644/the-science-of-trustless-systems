import { bitRow } from '../m5d/art';
import { connection, text } from '../m5e/art';
import { transaction } from '../m5e/fixtures';
import { character, type Expression } from '../../illustration/character';
import { svgText } from '../../illustration/svg';
import { bits, meetsTarget, type MiningBlock } from './fixtures';
import './staging.css';

export { text };

export function sheet(title: string, description: string, art: string, variant = ''): string {
  return `<div class="talk-sheet history-sheet hash-sheet mining-sheet ${variant}">
    ${title ? `<h1>${svgText(title)}</h1>` : ''}
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">${art}</svg>
  </div>`;
}

export function box(width: number, height: number, depth: number): string {
  return `<path class="block-face" d="M0 0H${width}V${height}H0Z"/>
    <path class="block-top" d="M0 0l${depth} ${-depth}h${width}l${-depth} ${depth}Z"/>
    <path class="block-side" d="M${width} 0l${depth} ${-depth}v${height}l${-depth} ${depth}Z"/>`;
}

export function block(block: MiningBlock, x: number, y: number, scale: number, nonce = true): string {
  const status = block.nonce === undefined ? '' : meetsTarget(block.digest) ? ' ✓' : ' ×';
  return `<g data-block="${block.number}" transform="translate(${x} ${y}) scale(${scale})">
    ${box(274, 264, 27)}
    <rect class="previous-field" x="12" y="10" width="250" height="38" rx="5"/>
    ${text(137, 36, block.previous ? `Prev ${block.previous}` : block.number === 1 ? 'No predecessor' : 'Prev —', 'code previous')}
    ${text(137, 83, `Block ${block.number}`, 'strong')}
    <path class="block-rule" d="M22 94H252"/>
    ${block.reward ? `<rect class="reward-row" x="9" y="100" width="256" height="32" rx="6"/>
      ${text(137, 124, `Create ${block.reward.amount} units → ${block.reward.to}`, 'tx subsidy')}` : ''}
    ${block.rows.map((row, index) => text(137, block.reward ? 151 + index * 24 : 123 + index * 27,
      transaction(row), row.signed ? 'tx' : 'tx changed-row')).join('')}
    ${nonce ? text(137, 224, `Nonce ${block.nonce ?? '—'}`, 'code nonce') : ''}
    ${text(137, 251, `Hash ${block.digest ?? '—'}${status}`, `code own-hash${status.endsWith('×') ? ' correction' : ''}`)}
  </g>`;
}

export function chain(blocks: readonly MiningBlock[], y: number, scale: number, nonce = true): string {
  const stride = scale * 362;
  const start = (1600 - stride * 3 - 301 * scale) / 2;
  return blocks.map((entry, index) => {
    const x = start + index * stride;
    if (index === 0) return block(entry, x, y, scale, nonce);
    const parent = blocks[index - 1];
    const from = x - stride + 301 * scale;
    const level = y + 85 * scale;
    const link = entry.previous === parent.digest ? 'match' : entry.previous ? 'mismatch' : 'unchecked';
    return connection(`M${from} ${level}H${x - 8}`, x - 8, level, link,
      link === 'mismatch' ? { x: (from + x - 8) / 2, y: level } : undefined) + block(entry, x, y, scale, nonce);
  }).join('');
}

export function target(x: number, y: number): string {
  return text(x, y, 'Target · first four bits must be zero', 'body')
    + bitRow(x - 90, y + 16, '0000', [0, 1, 2, 3], true);
}

export function attempts(x: number, y: number, values: readonly MiningBlock[]): string {
  const width = 245;
  const start = x - values.length * width / 2;
  return `<g data-attempts>${values.map(({ nonce, digest }, index) => {
    const left = start + index * width;
    const pass = meetsTarget(digest);
    return text(left + 114, y, `Nonce ${nonce}  ${pass ? '✓' : '×'}`, `code ${pass ? 'pass' : 'correction'}`) +
      bitRow(left + 2, y + 12, bits(digest!), [0, 1, 2, 3], pass, 28);
  }).join('')}</g>`;
}

function smallBox(x: number, y: number, scale: number, tilt = 0): string {
  return `<g data-box transform="translate(${x} ${y}) rotate(${tilt} 31 23) scale(${scale})">${box(66, 45, 13)}</g>`;
}

function scatter(count: number, layer: number, placement: (u: number, v: number) => [number, number, number]): string {
  let seed = layer;
  const random = () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  const boxes = Array.from({ length: count }, () => {
    const [x, y, size] = placement(random(), random());
    return { x, y, size, tilt: random() * 42 - 21 };
  });
  return boxes.sort((a, b) => a.y - b.y).map(({ x, y, size, tilt }) => smallBox(x, y, size, tilt)).join('');
}

export function workstation(expression: Expression, standing = false): string {
  return `<g data-workstation>
    <ellipse class="ground" cx="809" cy="736" rx="470" ry="29"/>
    ${standing ? character('alice', { x: 684, y: 432, pose: 'point', expression, scale: 1.65 })
      : `<path class="furniture" d="M509 481h85v144h118v18H587v-15h-62Zm78 162-26 89m111-89 20 89"/>
        <path class="actor-line" d="M630 588q26 32 81 40l-3 87h31"/>
        <g class="seated custom-arms">${character('alice', { x: 622, y: 447, expression, scale: 1.55 })}</g>
        <path class="actor-line" d="M641 548q24 31 75 30l44-36m-130 14q25 36 61 33l62-39"/>`}
    <path class="furniture" d="M685 579h505v23H685zm45 23-13 125h19l22-125m365 0 17 125h19l-6-125"/>
    <path class="desk-top" d="M685 579l31-28h502l-28 28Z"/>
    <path class="monitor" d="M764 425h158l-12 106H750Z"/>
    <path class="screen" d="M779 441h126l-8 74H767Z"/>
    <path class="screen-line" d="m800 477 15 12 28-28m14 27h18"/>
    <path class="furniture" d="M822 531h18l-3 25h39v10h-94v-10h31zm-68 29-25 14h77l17-14Z"/>
  </g>`;
}

function flag(): string {
  return `<g data-flag>
    <path class="actor-line" d="M780 328 802 154"/>
    <path class="flag-cloth" d="M801 161q44-22 116 13-41 21-124 39Z"/>
    <path class="actor-line" d="M753 391q-4-69 26-113"/>
    <path class="flag-hand" d="M768 290q-17-13-9-31 4-7 10-3l6 9 13 1q13 4 10 11l-5 4q6 5-1 12l-9 4q-9 2-15-7Z"/>
  </g>`;
}

export function pile(stage: 0 | 1 | 2 | 3 | 4): string {
  if (stage === 3 || stage === 4) {
    // Dense, staggered rows grow wider toward the floor. The silhouette
    // deliberately covers the whole workstation; no furniture peeks out.
    const layers = Array.from({ length: 15 }, (_, row) => {
      const width = 175 + row * 62;
      return scatter(9 + row, 220 + row, (u, v) =>
        [790 - width / 2 + u * width, 320 + row * 30 + v * 31, .85 + v * .35]);
    }).join('');
    return `<g data-mountain>
      <ellipse class="ground" cx="817" cy="792" rx="560" ry="34"/>
      ${stage === 4 ? flag() : ''}${layers}
    </g>`;
  }
  const desk = stage === 0 ? smallBox(990, 505, 1) + smallBox(1062, 505, 1) + smallBox(1023, 448, 1)
    : scatter(stage === 1 ? 17 : 24, 193, (u, v) => [946 + u * 204, 450 + v * 101, .72 + v * .28]);
  const floor = stage === 0 ? '' : scatter(stage === 1 ? 3 : 26, 771, (u, v) =>
    [335 + u * 940, 665 + v * 115, .69 + v * .35]);
  const moods = ['excited', 'stand', 'frustrated'] as const;
  return workstation(moods[stage]) + `<g data-boxes>${desk}${floor}</g>`;
}

export function goldUnits(x: number, y: number, count: number): string {
  return `<g data-gold="${count}">${Array.from({ length: count }, (_, index) => {
    const column = index % 5;
    const row = Math.floor(index / 5);
    return `<ellipse class="coin" cx="${x + column * 54 + (row % 2) * 12}" cy="${y - row * 20}" rx="23" ry="12"/>`;
  }).join('')}</g>`;
}
