import { character } from '../../illustration/character';
import { speech } from '../m5c/art';
import bitcoinLogo from '../m5f/bitcoin.svg?url';
import { arrow, card, still, text } from './art';

const title = 'Blockchain ≠ Cryptocurrency';
const notes = 'Disclose that the scenarios and records are authored examples. The iceberg shows conceptual breadth. Its areas do not represent relative adoption. The analogy separates infrastructure from applications. These applications can also use other systems. Ask aloud how the two infrastructure rows are alike.';

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
      <path class="ice-top" d="M603 393 710 369 800 357 893 308 962 289 1074 327 1130 358 1245 375 1290 393Z"/>
      <path class="ice-facets" d="m800 357 138-11 24-57m-24 57 80 21 112-9m-192-12-62 47m142-26 83 26"/>
      <image data-bitcoin-mark href="${bitcoinLogo}" x="931" y="314" width="68" height="68"/>
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

export const beyondStills = [
  still('30-iceberg-tip', title, 'Charlie spots Bitcoin from his boat.', iceberg(false), notes),
  still('30-iceberg-reveal', title, 'Below the waterline are credentials, provenance, timestamping and coordination.', iceberg(true), notes),
  still('30-internet', title, 'The Internet supports email, games, websites and video calls.', applications(false), notes),
  still('30-parallel', title, 'Compare infrastructure and applications across the two rows.', applications(true), notes),
];
