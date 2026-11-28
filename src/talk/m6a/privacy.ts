import { character } from '../../illustration/character';
import { coffee } from '../m5c/art';
import { arrow, magnifier, still, text } from './art';

const privacySource = 'Source: Satoshi Nakamoto, Bitcoin whitepaper §10, https://bitcoin.org/bitcoin.pdf#page=6';
const transparencyNotes = `Disclose aloud that the café ledger, times and profile are authored. The example continues from slide 32. The entries on the left show only times and amounts from the fictional public ledger. The cards on the right are Charlie’s tentative guesses based on records and outside context. Real ledgers expose different fields. Merchant categories and exact transaction times are not universally available on-chain, and public records do not automatically identify a person or disclose their location.\n\nAsk aloud: What if we remove the names?\n\n${privacySource}`;
const addressNotes = `Disclose aloud that the records and shortened addresses are authored; the addresses are schematic labels, not literal Bitcoin address formats. The example assumes reuse of one address and sufficiently distinctive external information about the coffee purchase. Linking transactions to a shared address and identifying its owner are distinct steps. Neither identification nor address reuse is universal.\n\n${privacySource}`;

const aliceAddress = '0x7F3A…';
const purchases = [
  { id: 'coffee', who: 'Alice', address: aliceAddress, time: '08:10', detail: 'Coffee', amount: '$345', inference: 'A morning stop?' },
  { id: 'transport', who: 'Alice', address: aliceAddress, time: '08:32', detail: 'Transport', amount: '$12', inference: 'A commute?' },
  { id: 'lunch', who: 'Alice', address: aliceAddress, time: '12:05', detail: 'Lunch', amount: '$18', inference: 'Lunch break?' },
  { id: 'pharmacy', who: 'Alice', address: aliceAddress, time: '18:09', detail: 'Pharmacy', amount: '$24', inference: 'Evening errand?' },
  { id: 'salary', who: 'Alice', address: aliceAddress, time: '09:00', detail: 'Salary', amount: '+$3000', inference: 'Payday?' },
] as const;
const addressRows = [
  { id: 'donuts', who: 'Bob', address: '0xB19C…', time: '08:02', detail: 'Donuts', amount: '$2' },
  purchases[0], purchases[1],
  { id: 'unrelated', who: 'Other', address: '0xD42E…', time: '08:55', detail: 'Groceries', amount: '$27' },
  purchases[4],
];

function detective(x: number, y: number, scale: number, facing: 'left' | 'right' = 'right'): string {
  const direction = facing === 'left' ? -1 : 1;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    ${character('charlie', { pose: 'point', expression: 'suspicious', facing })}
    <g data-prop="detective-hat" transform="scale(${direction} 1) rotate(-7)">
      <path class="detective-hat" d="M-43-32 Q-53-51-30-58 Q-16-77 13-66 Q35-66 41-42
        Q62-42 67-33 Q56-20 22-27 Q-6-19-49-23 Q-64-26-43-32Z"/>
      <path class="fine" d="M-38-34 Q-5-45 34-41 M-3-66 Q17-54 14-42"/>
    </g>
    ${magnifier(direction * 75, 30, .76, facing === 'left' ? 189 : 9)}
  </g>`;
}

function investigation(): string {
  return `<g data-investigation transform="translate(438 187) scale(.75)">
    <path class="board" d="M-27-27 Q576-37 1373-25 L1370 648 Q745 657-27 646Z"/>
    ${text(266, 54, 'Alice’s records', 'column-title')}
    ${text(1050, 54, 'Charlie’s theory', 'column-title')}
    ${purchases.map(({ id, time, amount, inference }, index) => {
      const row = 116 + index * 111;
      const target = [126, 208, 326, 453, 556][index];
      return `<g data-record="${id}">
        <path class="ledger-slip" d="M12 ${row - 33} Q230 ${row - 38} 570 ${row - 33} L570 ${row + 37} Q298 ${row + 41} 12 ${row + 35}Z"/>
        ${text(85, row + 13, time, 'record-time')}
        ${text(497, row + 13, amount, 'record-amount end')}
        <path class="red-string" d="M570 ${row} L817 ${target}"/>
        <g transform="translate(1040 ${target}) rotate(${[2, -4, 3, -3, 2][index]})">
          <path class="inference-slip" d="M-223-32 L222-34 224 33 -222 35Z"/>
          ${text(0, 13, inference, 'inference')}
        </g>
        <circle class="pin" cx="570" cy="${row}" r="7"/><circle class="pin" cx="817" cy="${target}" r="7"/>
      </g>`;
    }).join('')}
  </g>`;
}

function addressLedger(mode: 'names' | 'matches' | 'clue' | 'linked'): string {
  const linked = mode === 'linked';
  const clue = mode === 'clue';
  const left = linked || clue ? 79 : 291;
  return `<g data-address-ledger transform="translate(${left} 213)">
    <path class="ledger-backing" d="M4 18 Q424-1 975 16 L984 465 Q532 481 0 465Z"/>
    <path class="ledger-slip" d="M17 3 Q480-8 962 4 L967 443 Q550 461 17 444Z"/>
    ${text(58, 69, mode === 'names' ? 'Name' : 'Address', 'table-heading start')}
    ${text(351, 69, 'Time', 'table-heading start')}
    ${text(546, 69, 'Entry', 'table-heading start')}
    ${text(915, 69, 'Amount', 'table-heading end')}
    ${addressRows.map((row, index) => {
      const y = 133 + index * 71;
      const matched = mode !== 'names' && row.address === aliceAddress;
      return `<g data-record="${row.id}"${matched ? ' data-match="alice"' : ''}>
        ${matched ? `<rect class="match-band" x="43" y="${y - 37}" width="908" height="56" rx="7"/>` : ''}
        <path class="table-rule" d="M43 ${y + 26} H941"/>
        ${text(58, y, mode === 'names' ? row.who : row.address, 'record-address start')}
        ${text(351, y, row.time, 'record-time start')}
        ${text(546, y, row.detail, 'record-name start')}
        ${text(915, y, row.amount, 'record-amount end')}
        ${linked && matched ? `<path class="red-string" d="M942 ${y - 9} Q1090 ${y - 9} 1206 207"/>
          <circle class="pin" cx="942" cy="${y - 9}" r="7"/>` : ''}
      </g>`;
    }).join('')}
  </g>`;
}

const title34 = "What's in a Name?";

export const privacyStills = [
  still('33-evidence-board', 'Nothing to Hide?', 'Charlie admires his detective board, with red string from each record to a possible part of Alice’s routine.',
    `${investigation()}${detective(248, 482, 1.48)}
      ${text(922, 750, 'A routine inferred from records and context', 'annotation')}`,
    transparencyNotes),
  still('34-names', title34, 'Alice is delighted by the idea of replacing the names in the café ledger with addresses.',
    `${addressLedger('names')}
      ${character('alice', { x: 157, y: 494, scale: 1.13, pose: 'excited' })}
      ${text(595, 780, 'Name', 'record-address')}${arrow(661, 768, 778)}
      ${text(893, 780, 'Address', 'record-address')}`,
    addressNotes),
  still('34-reused-address', title34, 'Replacing names with addresses leaves a repeated address on the coffee, transport and salary rows. Charlie highlights all three.',
    `${addressLedger('matches')}${detective(1383, 507, 1.21, 'left')}
      ${text(777, 787, 'One address, three records', 'annotation')}`,
    addressNotes),
  still('34-coffee-clue', title34, 'The known $345 coffee purchase supplies an outside clue that links the repeated address to Alice.',
    `${addressLedger('clue')}
      <path class="red-string" d="M1020 410 Q1101 399 1155 337"/>
      <circle class="pin" cx="1020" cy="410" r="7"/>
      <path class="inference-slip" d="M1133 229 L1517 221 1522 455 1139 462Z"/>
      ${text(1327, 289, 'Outside clue', 'column-title')}
      ${coffee(1327, 348, .72)}${text(1327, 434, 'Alice paid $345 for coffee.', 'annotation')}
      ${detective(1294, 589, 1.13, 'left')}`,
    addressNotes),
  still('34-linked-records', title34, 'Red strings link the three matching records to Alice, who facepalms while Charlie smiles.',
    `${addressLedger('linked')}
      ${character('alice', { x: 1331, y: 374, scale: 1.35, pose: 'facepalm', facing: 'left' })}
      ${text(1332, 642, 'Alice', 'column-title')}
      ${character('charlie', { x: 1485, y: 542, scale: .78, pose: 'stand', expression: 'excited', facing: 'left' })}
      ${text(800, 772, 'Pseudonymity ≠ Anonymity', 'takeaway')}
      ${text(800, 829, 'Reused address + $345 coffee clue', 'caveat')}`,
    `${addressNotes}\n\nAsk aloud: What if we hide the contents of a message instead?`),
];
