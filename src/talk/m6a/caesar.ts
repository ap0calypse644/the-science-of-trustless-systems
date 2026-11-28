import { character } from '../../illustration/character';
import { speech } from '../m5c/art';
import { arrow, magnifier, still, text } from './art';
import { eve } from './eve';
import { ciphertext, historicalNote, plaintext } from './messenger';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const shiftedAlphabet = 'DEFGHIJKLMNOPQRSTUVWXYZABC';
const trials = ['OGGV CV FCYP', 'NFFU BU EBXO', plaintext] as const;
const title = 'The Caesar Cipher';
const notes = `Disclose aloud that all strings, wheel endpoints and trials are pre-authored. Only the 26 uppercase English letters are shifted in this toy cipher, with spaces preserved. Encryption uses +3 and decryption reverses it with −3 using the same key. Shifts wrap after Z. Each distinct shift has one representative among 0–25, so there are 25 nontrivial keys, or 26 including identity. A short message can admit ambiguous guesses, but the readable classroom answer is deliberately recognizable. This cipher provides no modern confidentiality.\n\n${historicalNote}`;

const step = 360 / alphabet.length;

function wheelRing(radius: number, turns: number, kind: 'outer' | 'inner', marked: readonly number[]): string {
  return `<g class="wheel-ring ${kind}" data-wheel-ring="${kind}">
    ${Array.from(alphabet, (letter, index) => {
      const radians = (index - turns) * step * Math.PI / 180;
      const x = (radius * Math.sin(radians)).toFixed(2);
      const y = (-radius * Math.cos(radians)).toFixed(2);
      return `<g transform="translate(${x} ${y})" data-letter-index="${index}">
        <circle class="${marked.includes(index) ? 'marked-sector' : 'wheel-sector'}" r="22"/>
        ${text(0, 1, letter, 'wheel-letter')}
      </g>`;
    }).join('')}
  </g>`;
}

function wheel(shifted: boolean): string {
  return `<g data-wheel transform="translate(533 490)">
    <circle class="outer-rim" r="328"/><circle class="inner-rim" r="257"/><circle class="hub-ring" r="181"/>
    ${wheelRing(295, 0, 'outer', shifted ? [0, 1, 2, 23] : [0, 1, 2])}
    ${wheelRing(219, shifted ? 3 : 0, 'inner', shifted ? [0, 3, 4, 5] : [0, 1, 2])}
    <path class="wheel-index" d="M-8-334 0-322 8-334Z"/>
    ${text(0, 18, shifted ? 'Key = 3' : 'Key = 0', 'wheel-key')}
  </g>
  <path class="legend-out" d="M865 339h72"/>${text(967, 353, 'Outer ring · plaintext', 'legend start')}
  <path class="legend-in" d="M865 414h72"/>${text(967, 428, 'Inner ring · ciphertext', 'legend start')}
  ${text(985, 551, shifted ? 'A → D' : 'A → A', 'mapping')}
  ${text(1152, 551, shifted ? 'B → E' : 'B → B', 'mapping')}
  ${text(1319, 551, shifted ? 'C → F' : 'C → C', 'mapping')}
  ${text(1152, 630, shifted ? 'Shift three letters forward' : 'Both alphabets aligned', 'annotation')}
  ${shifted ? text(1152, 717, 'Wraparound: X → A', 'mapping') : ''}`;
}

function strips(shifted: boolean, direction: 'forward' | 'reverse' = 'forward'): string {
  const columns = shifted ? [0, 4, 12, 23] : [0, 1, 2];
  return `<g data-strips>
    ${text(141, 294, 'Plaintext', 'table-heading start')}
    ${text(141, 425, 'Ciphertext', 'table-heading start')}
    ${Array.from(alphabet, (letter, index) => {
      const x = 332 + index * 45;
      const active = columns.includes(index);
      const guide = direction === 'forward' ? 'M0 311v64m-6-8 6 8 6-8' : 'M0 378v-64m-6 8 6-8 6 8';
      return `<g data-column="${letter}" transform="translate(${x} 0)">
        ${active ? `<path class="strip-guide" d="${guide}"/>` : '<path class="strip-rule" d="M0 313v63"/>'}
        <rect class="strip-top${active ? ' strip-selected' : ''}" x="-21" y="255" width="42" height="55" rx="5"/>
        <rect class="strip-bottom${active ? ' strip-selected' : ''}" x="-21" y="385" width="42" height="55" rx="5"/>
        ${text(0, 295, letter, 'strip-letter')}
        ${text(0, 425, shifted ? shiftedAlphabet[index] : letter, 'strip-letter')}
      </g>`;
    }).join('')}
  </g>`;
}

function conversion(decrypt: boolean): string {
  return `<g data-conversion="${decrypt ? 'decryption' : 'encryption'}">
    ${text(361, 610, decrypt ? 'Ciphertext' : 'Plaintext', 'table-heading')}
    ${text(1240, 610, decrypt ? 'Plaintext' : 'Ciphertext', 'table-heading')}
    ${text(361, 691, decrypt ? ciphertext : plaintext, 'message')}
    ${text(1240, 691, decrypt ? plaintext : ciphertext, 'message')}
    ${arrow(619, 668, 978)}
    ${text(800, 626, decrypt ? 'Decryption · −3' : 'Encryption · +3', 'direction')}
    ${text(800, 765, decrypt ? 'Bob reverses the shift using Key = 3' : 'Alice shifts each letter using Key = 3', 'annotation')}
  </g>`;
}

function guesses(solved: boolean): string {
  return `
    ${text(597, 235, ciphertext, 'message')}
    ${text(597, 304, 'Eve tries the inverse shifts', 'annotation')}
    ${(solved ? trials : trials.slice(0, 2)).map((words, index) => {
      const y = 361 + index * 108;
      const found = index === 2;
      return `<g data-trial="${index + 1}">
        <path class="${found ? 'solved-slip' : 'ledger-slip'}" d="M145 ${y} Q534 ${y - 8} 1042 ${y}
          L1041 ${y + 82} Q534 ${y + 86} 145 ${y + 82}Z"/>
        ${text(196, y + 54, '−' + String(index + 1), 'mapping')}
        ${arrow(268, y + 42, 345)}
        ${text(595, y + 54, words, 'message')}
        ${text(985, y + 54, found ? '✓' : '×', found ? 'trial-pass' : 'trial-fail')}
      </g>`;
    }).join('')}
    ${eve(1250, solved ? 349 : 390, 1.5, solved ? 'excited' : 'confused')}
    ${solved
      ? `${speech(1300, 229, 240, 'Got it!')}
        ${character('alice', { x: 1381, y: 552, scale: 1.27, pose: 'facepalm', facing: 'left' })}
        ${text(695, 766, 'Brute force: try the keys one by one', 'takeaway')}
        ${text(695, 830, 'Keyspace: 25 nontrivial shifts · 26 including no shift', 'caveat')}`
      : `${speech(1321, 288, 314, 'Still gibberish…')}
        ${text(597, 710, 'What happens on the third try?', 'annotation')}`}`;
}

export const caesarStills = [
  still('36-wheel-aligned', title, 'The full 26-letter wheels are aligned at Key = 0. The outer ring is plaintext and the inner ring is ciphertext.',
    wheel(false), notes),
  still('36-wheel-shifted', title, 'The inner alphabet has moved counterclockwise by three marks, placing D under A, E under B, and F under C. X maps to A.',
    wheel(true), `${notes}\n\nRead from outer to inner. The alphabet increases clockwise, so the inner ring turns counterclockwise to bring the letter three places later into the original position.`),
  still('36-alphabet-strips', title, 'The aligned wheel unrolls to two complete alphabet strips showing the no-shift baseline.',
    `${strips(false)}${text(800, 541, 'Same alphabet, opened into two strips', 'annotation')}
      ${text(800, 693, 'Key = 0', 'wheel-key')}`, notes),
  still('36-encryption', title, 'The lower strip moves three places. The mapping encrypts MEET AT DAWN to PHHW DW GDZQ.',
    strips(true) + conversion(false), notes),
  still('36-decryption', title, 'Bob reads the same mapping in reverse, recovering MEET AT DAWN from PHHW DW GDZQ.',
    strips(true, 'reverse') + conversion(true), notes),
  still('36-eve-tries', title, 'Eve tries inverse shifts one and two. Neither result makes sense.',
    guesses(false), `${notes}\n\nPause and ask aloud which shift the audience would try next.`),
  still('36-brute-force', title, 'Shift back three succeeds. Eve celebrates and Alice facepalms. The keyspace is 25 nontrivial shifts.',
    guesses(true), `${notes}\n\nAsk aloud: What if we rearrange the entire alphabet instead of shifting it?`),
];
