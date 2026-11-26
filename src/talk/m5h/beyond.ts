import { character } from '../../illustration/character';
import { speech } from '../m5c/art';
import { notebook } from '../m5c/notebook';
import bitcoinLogo from '../m5f/bitcoin.svg?url';
import { arrow, card, still, text } from './art';

const title = 'Blockchain ≠ Cryptocurrency';
const notes = 'Disclose that the scenarios and records are authored examples. The iceberg shows conceptual breadth. Its areas do not represent relative adoption. The analogy separates infrastructure from applications. These applications can also use other systems. Agreement on recorded certificates, handoffs and ownership claims does not establish that an external claim is true. Ask aloud what all three ledgers now have in common.';

function boat(x: number, y: number, scale: number): string {
  return `<g transform="translate(${x} ${y}) scale(${scale})" data-boat>
    ${character('charlie', { x: -10, y: -131, pose: 'point', expression: 'excited', scale: .92 })}
    <path class="boat" d="M-112-9q88 20 234-2l-51 52H-68Z"/>
    <path class="boat-rim" d="M-99 1q92 18 203-2"/>
    ${speech(15, -231, 234, 'Look! Bitcoin!')}
  </g>`;
}

function iceberg(revealed: boolean): string {
  const depth = revealed ? `<g data-submerged>
    <path class="ice-below" d="M603 393L527 507 609 663 754 759 979 821 1191 756 1384 636 1432 516 1290 393Z"/>
    <path class="ice-facets" d="M603 393l142 142-136 128m136-128 90 169-81 55m81-55 144 117m-52-428 94 151-186 160m186-160 170 212m-170-212 269-151m-99 363 193-120"/>
    ${text(798, 510, 'Identity & credentials', 'ice-label')}
    ${text(1198, 550, 'Provenance', 'ice-label')}
    ${text(808, 642, 'Timestamping', 'ice-label')}
    ${text(1067, 724, 'Shared rules & coordination', 'ice-label')}
  </g>` : '';
  return `<path class="water" d="M90 393H1510V${revealed ? 814 : 666}Q1428 ${revealed ? 833 : 683} 1330 ${revealed ? 815 : 665}H90Z"/>
    ${depth}
    <g data-iceberg-tip${revealed ? '' : ' transform="translate(858 393) scale(1.16) translate(-858 -393)"'}>
      <path class="ice-top" d="M603 393 710 344 800 320 893 219 962 180 1074 259 1130 322 1245 356 1290 393Z"/>
      <path class="ice-facets" d="m800 320 138-22 24-118m-24 118 80 43 112-19m-192-24-62 95m142-52 83 52"/>
      <image data-bitcoin-mark href="${bitcoinLogo}" x="931" y="245" width="91" height="91"/>
    </g>
    <path class="water-line" d="M90 393q88 12 188 1t190 0t189 0t189 0t189 0t190 0t189 0l96 0"/>
    ${boat(revealed ? 320 : 335, 386, revealed ? .78 : .98)}`;
}

const internet = ['Email', 'Games', 'Websites', 'Video calls'];
const chains = ['Cryptocurrency', 'Identity', 'Provenance', 'Coordination'];

function applications(parallel: boolean): string {
  const rows = parallel ? [['Internet', internet], ['Blockchain', chains]] as const : [['Internet', internet]] as const;
  return text(256, parallel ? 230 : 340, 'Infrastructure', 'diagram-heading')
    + text(1022, parallel ? 230 : 340, 'Applications', 'diagram-heading')
    + rows.map(([name, apps], index) => {
      const y = parallel ? 313 + index * 228 : 427;
      return `<g data-infrastructure="${name}">
        ${card(113, y, 286, 128, index ? 'lavender' : 'blue')}
        ${text(256, y + 77, name, 'diagram-heading')}
        ${arrow(420, y + 64, 520)}
        ${apps.map((app, i) => `<g data-application>${card(544 + i * 240, y, 221, 128, 'paper')}
          ${text(654 + i * 240, y + 75, app, 'application')}` + '</g>').join('')}
      </g>`;
    }).join('');
}

function records(): string {
  const entries = [{ text: 'Certificate C-17' }, { text: 'Parcel P-42 · Joint ownership' }, { text: 'Handoff H-08 · Received' }];
  return (['alice', 'bob', 'charlie'] as const).map((person, i) => {
    const x = 307 + i * 493;
    const name = person[0].toUpperCase() + person.slice(1);
    return `<g data-replica="${person}">
      ${text(x, 228, name, 'diagram-heading')}
      ${character(person, { x, y: 322, scale: 1.32, pose: 'hold', expression: 'stand' })}
      ${notebook(x, 630, .71, 'Ledger', entries)}
    </g>`;
  }).join('');
}

export const beyondStills = [
  still('30-iceberg-tip', title, 'Charlie spots Bitcoin from his boat.', iceberg(false), notes),
  still('30-iceberg-reveal', title, 'Below the waterline are credentials, provenance, timestamping and coordination.', iceberg(true), notes),
  still('30-internet', title, 'The Internet supports email, games, websites and video calls.', applications(false), notes),
  still('30-parallel', title, 'Compare infrastructure and applications across the two rows.', applications(true), notes),
  still('30-shared-records', title, 'Alice, Bob and Charlie each open their own ledger to matching records.', records(), notes),
];
