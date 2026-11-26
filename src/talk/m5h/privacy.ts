import { character } from '../../illustration/character';
import { cafeRoom, cafeTable, speech } from '../m5c/art';
import { notebook } from '../m5c/notebook';
import { card, still, text } from './art';

const title = "But There's a Catch...";
const notes = 'Tell the audience the transcript and examples are authored. The full transcript is a choice in this fictional exchange, not a requirement for verifying graduation. The café reuses the two authored IOUs from slide 9; they are amounts owed, not balances. Charlie’s line jokes about the visible coffee record without assigning a new amount. The same two records are visible to all three in this transparent toy ledger. Other ledgers can disclose different information. The glass house is a metaphor for oversharing. It does not suggest these records are actually on-chain. Ask aloud: Can we verify information without revealing it? W3C privacy discussion: https://www.w3.org/TR/vc-data-model-2.0/#privacy-considerations.';

const rows = [
  ['Name', 'Alice'], ['Degree', 'B.Tech'], ['Graduated', 'Yes'], ['Algorithms', 'A'],
  ['Databases', 'B'], ['Mathematics', 'C'], ['Failed attempts', '2'],
] as const;

function transcript(highlight: boolean): string {
  return `<g data-transcript>
    ${card(941, 222, 552, 567, 'cream')}
    ${text(1217, 292, 'Academic transcript', 'diagram-heading')}
    ${rows.map(([field, value], index) => {
      const y = 363 + index * 55;
      const emphasis = highlight ? index === 2 ? 'needed' : 'extra' : '';
      return `<g data-field="${field}" class="${emphasis}">
        ${emphasis ? `<rect class="field-band" x="965" y="${y - 32}" width="502" height="47" rx="6"/>` : ''}
        ${text(984, y, field, 'label panel-label')}
        ${text(1390, y, value, 'application')}
      </g>`;
    }).join('')}
    ${highlight ? text(1217, 767, 'Needed: graduation · Extra: the rest of the transcript', 'small-label') : ''}
  </g>`;
}

function interview(beat: number): string {
  return `<g data-interview${beat === 0 ? ' transform="translate(340 0)"' : ''}>
    ${character('alice', { x: 242, y: 469, scale: 1.54, pose: beat === 3 ? 'confused' : 'hold', expression: beat >= 2 ? 'confused' : 'excited' })}
    ${character('bob', { x: 670, y: 469, scale: 1.5, pose: beat >= 2 ? 'point' : 'stand', expression: beat >= 2 ? 'confused' : 'stand', facing: 'left' })}
    <path class="desk" d="M100 595l48-31h621l48 31v24H100Zm61 24-16 130m607-130 17 130"/>
    ${beat === 0 ? speech(619, 276, 398, 'Can you prove you graduated?') : ''}
    ${beat === 1 ? `<path class="actor-line" d="M263 542q42 21 99-2m287 3q-62 22-153-18"/>
      <g data-handoff transform="translate(429 530) rotate(-8)">
      ${card(-64, -55, 128, 105, 'cream')}
      <path class="paper-lines" d="M-42-25h83m-83 18h83m-83 18h66"/>
      <path class="hand" d="m-66 4q15-8 18 0t-16 9m130-20q-10-8-16-2t12 12"/>
      </g>${speech(260, 315, 236, 'Here you go!')}` : ''}
    ${beat === 2 ? speech(627, 300, 454, 'Two failed attempts in maths?') : ''}
    ${beat === 3 ? speech(330, 247, 530, 'Can’t I just prove that I graduated?')
      + speech(312, 324, 234, 'Nothing else?') : ''}
    ${beat > 0 ? transcript(beat >= 2) : ''}
  </g>`;
}

const ious = [{ text: 'Charlie owes Alice 4' }, { text: 'Bob owes Charlie 3' }];

function cafe(): string {
  return `<g data-cafe-callback>${cafeRoom}
    ${character('alice', { x: 292, y: 419, scale: 1.22, pose: 'confused', expression: 'confused' })}
    ${character('bob', { x: 802, y: 419, scale: 1.22, pose: 'hold', expression: 'stand' })}
    ${character('charlie', { x: 1291, y: 419, scale: 1.22, pose: 'point', expression: 'excited', facing: 'left' })}
    ${cafeTable}
    ${[305, 800, 1295].map((x) => `<g data-cafe-copy>${notebook(x, 697, .68, 'Café IOUs', ious, 'Amounts owed · units')}</g>`).join('')}
    ${speech(1243, 297, 468, 'You spent HOW MUCH on coffee?!')}
  </g>`;
}

function glassHouse(): string {
  return `<g data-glass-house>
    <path class="house-ground" d="M134 769Q800 788 1466 769"/>
    <path class="glass-side" d="M1086 429 1220 342V653L1086 744Z"/>
    <path class="glass-roof" d="M512 429 797 221 1086 429 1220 342 918 160 797 221Z"/>
    ${character('alice', { x: 810, y: 507, scale: 1.33, pose: 'confused', expression: 'confused' })}
    <path class="glass-front" d="M512 429 797 221 1086 429V744H512Z"/>
    <path class="glass-seam" d="M512 429h574m-383 0v315m198-315v315m-362-289 109-83m-104 123 87-65
      M1118 473l70-52m-70 94 70-52"/>
    ${text(606, 527, 'Salary', 'glass-label')}
    ${text(1001, 514, 'Medical', 'glass-label')}
    ${text(1001, 548, 'records', 'glass-label')}
    ${text(607, 660, 'Purchases', 'glass-label')}
    ${text(995, 665, 'Personal data', 'glass-label')}
    ${character('bob', { x: 313, y: 550, scale: 1.06, pose: 'hold', expression: 'stand' })}
    ${character('charlie', { x: 1371, y: 549, scale: 1.06, pose: 'stand', expression: 'suspicious', facing: 'left' })}
  </g>`;
}

export const privacyStills = [
  still('32-interview', title, 'At the interview Bob asks Alice to prove she graduated.', interview(0), notes),
  still('32-transcript-handoff', title, 'Alice gladly hands Bob her full transcript.', interview(1), notes),
  still('32-oversharing', title, 'The transcript reveals a degree and unnecessary details. Bob notices two failed mathematics attempts.', interview(2), notes),
  still('32-question', title, 'Alice asks whether she can prove she graduated without revealing the rest.', interview(3), notes),
  still('32-transparent-ledger', title, 'In the original café, Alice realizes Bob and Charlie can inspect the same IOUs.', cafe(), notes),
  still('32-glass-house', title, 'Alice stands inside a glass house while Bob and Charlie look in from outside.', glassHouse(), notes),
];
