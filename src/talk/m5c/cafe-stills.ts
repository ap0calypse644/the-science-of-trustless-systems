import { crown } from '../../illustration/props';
import { actor, cafeRoom, cafeTable, coffee, receipt, sandwich, sheet, speech } from './art';
import { cafe, cafeOpening, fake, genuine, largeOrder, line, overspend } from './ledger-model';
import { closedNotebook, notebook } from './notebook';

function still(id: string, title: string, description: string, art: string, notes: string) {
  return { id, composition: sheet(title, description, art), notes };
}

const shared = 'A Shared Ledger';
const unauthorized = 'Unauthorized transactions';
const control = 'Who Controls the Ledger?';
const genuineRow = { text: line(genuine), signed: true };
const ordinary = actor('alice', 'stand', 'stand') + actor('bob', 'hold', 'stand') + actor('charlie', 'hold', 'suspicious');

function balances({ Alice, Bob, Charlie }: typeof cafeOpening): string {
  return `Alice ${Alice} · Bob ${Bob} · Charlie ${Charlie}`;
}

const nine = [
  still('09-cafe', shared, 'Alice, Bob and Charlie meet for coffee and sandwiches.',
    cafeRoom + ordinary + cafeTable + coffee(1215, 549, .9) + sandwich(784, 543, .8) + receipt(862, 602, 13),
    'Opening café. Explain that the group has agreed to keep track of small IOUs over several visits.'),
  still('09-receipt-chaos', shared, 'Alice asks who paid, Bob says he paid yesterday, and receipts pile up.',
    cafeRoom + actor('alice', 'confused', 'confused') + actor('bob', 'frustrated', 'frustrated') + actor('charlie', 'confused', 'confused')
    + cafeTable + speech(307, 260, 340, 'Who paid for coffee?')
    + speech(802, 267, 300, 'I paid yesterday') + speech(1300, 279, 330, 'I kept the receipt!')
    + [[575, 581, -15], [646, 646, 18], [773, 629, -8], [904, 660, 21], [1016, 604, -15], [723, 732, 29]]
      .map(([x, y, angle]) => receipt(x, y, angle)).join(''),
    'Ask who still remembers the earliest IOU. Receipts are scattered and nobody can reconstruct the sequence from memory.'),
  still('09-alice-idea', shared, 'Alice brings the group one blue notebook.',
    cafeRoom + actor('alice', 'hold', 'excited') + actor('bob', 'point', 'confused') + actor('charlie', 'hold', 'stand')
    + cafeTable + speech(320, 267, 347, 'Let’s write it down.') + closedNotebook(339, 462, .48) + receipt(748, 609, -12),
    'Alice proposes a shared record. Keep this beat long enough to recognize the blue cover before the book opens.'),
  still('09-notebook', shared, 'The shared notebook shows two clearly recorded debts.',
    cafeRoom + ordinary + cafeTable
    + notebook(800, 708, 1.08, 'Café IOUs', [{ text: 'Charlie owes Alice 4' }, { text: 'Bob owes Charlie 3' }], 'Amounts owed · units'),
    'These are debts, not transfers or balances. Charlie owes Alice 4 for coffee; Bob owes Charlie 3 for a sandwich. The common record gives them a memory. It does not establish who authorized a later entry.'),
];

const ten = [
  still('10-unsigned-entry', unauthorized, 'Charlie writes an unsigned payment from Bob into the notebook.',
    cafeRoom + actor('alice', 'stand', 'confused') + actor('bob', 'hold', 'stand') + actor('charlie', 'point', 'suspicious', 1168, 453)
    + cafeTable + notebook(800, 708, 1.08, 'Toy balance ledger', [{ text: line(fake) }], balances(cafeOpening))
    + '<path class="pencil" d="m1090 477 12 6 -36 62 -11 8 2-13Z"/>',
    'New convention: the notebook now stores balances in neutral units and transfers debit one account and credit another. Start Alice 0, Bob 30, Charlie 5. Charlie writes an unsigned Bob-to-Charlie entry; it has not changed balances.'),
  still('10-bob-objects', unauthorized, 'Bob angrily objects to the unsigned entry.',
    cafeRoom + actor('alice', 'confused', 'confused') + actor('bob', 'frustrated', 'frustrated') + actor('charlie', 'hold', 'suspicious')
    + cafeTable + speech(802, 267, 383, 'I never approved that!')
    + notebook(800, 708, 1.08, 'Toy balance ledger', [{ text: line(fake), rejected: true }], 'Unsigned · rejected'),
    'The entry is rejected for lack of authorization even though Bob has the funds.'),
  still('10-bob-signs', unauthorized, 'Bob writes and signs a different payment to Alice.',
    cafeRoom + actor('alice', 'point', 'stand') + actor('bob', 'point', 'stand') + actor('charlie', 'hold', 'confused')
    + cafeTable + speech(800, 269, 408, 'I’ll sign my own payment.')
    + notebook(800, 708, 1.08, 'Toy balance ledger', [genuineRow], 'Bob’s signature authorizes this entry'),
    'Bob signs a different transfer for 10 to Alice. The scribble illustrates authorization only. Real signatures bind a message to a key. The verifier needs the correct public key and an association with Bob. Copying handwriting is insecure. See NIST FIPS 186-5, https://csrc.nist.gov/pubs/fips/186-5/final.'),
  still('10-authorization', unauthorized, 'The fake payment is rejected; the different signed payment is recorded.',
    cafeRoom + ordinary + cafeTable + speech(311, 268, 380, 'Now we can check who signed.')
    + notebook(800, 708, 1.12, 'Toy balance ledger', [{ text: line(fake), rejected: true }, genuineRow],
      balances(cafe.balances)),
    'The unsigned fake does not post. The distinct signed Bob-to-Alice payment passes the toy balance rule: Bob 30 − 10 = 20, Alice 0 + 10 = 10, Charlie stays 5. A real valid signature can be replayed and does not imply sufficient funds.'),
];

const feast = [
  [1154, 565, 1.35], [1261, 561, 1.48], [1344, 555, 1.23], [1117, 504, 1.1],
  [1224, 493, 1.27], [1338, 486, 1.26], [1194, 444, 1.15], [1304, 421, 1.16],
  [1253, 372, 1.03], [1375, 403, .9], [1178, 378, .84],
].map(([x, y, scale]) => sandwich(x, y, scale)).join('');

const eleven = still('11-infinite-money-glitch', 'The Infinite Money Glitch',
  'Charlie grins behind a towering food order. Bob objects because Charlie has only five units.',
  cafeRoom + actor('alice', 'suspicious', 'confused') + actor('bob', 'frustrated', 'frustrated')
  + actor('charlie', 'excited', 'excited', 1440, 351) + cafeTable + feast
  + coffee(1076, 541, 1.08) + coffee(1392, 535, .9) + speech(802, 263, 414, 'You only have 5 units, Charlie.')
  + notebook(684, 716, 1.15, 'Toy payment · 500 units', [{ text: line(largeOrder), signed: true }],
    `Signed · rejected · balance ${overspend.balances.Charlie}`),
  'No overdraft. Charlie starts with 5 and requests a signed payment of 500 to Bob. Insufficient balance rejects it before any posting; Charlie stays at 5 and Bob stays at 20. The mountain of food is the joke. Signing is authorization, not validity.');

const twelve = [
  still('12-missing-ledger', control, 'Alice walks away carrying the only blue notebook.',
    cafeRoom + actor('alice', 'run', 'stand', 186, 439, 'left') + actor('bob', 'confused', 'confused') + actor('charlie', 'confused', 'confused')
    + cafeTable + closedNotebook(243, 470, .47) + speech(801, 266, 388, 'Where’s the notebook?')
    + '<path class="empty-ledger" d="M598 668 Q797 651 1000 669 L992 777 Q797 800 599 782Z"/>',
    'Alice takes the only notebook. Bob and Charlie cannot inspect the record. Access is a separate problem from signature checking.'),
  still('12-access-monopoly', control, 'Crowned Charlie offers access to the replacement notebook for a fee.',
    cafeRoom + actor('alice', 'suspicious', 'suspicious') + actor('bob', 'confused', 'confused') + actor('charlie', 'excited', 'excited')
    + cafeTable + `<g transform="translate(1295 315) scale(1.3)">${crown(0, 0)}</g>`
    + speech(1281, 245, 350, 'Access costs 2 units.')
    + notebook(1085, 707, .93, 'Charlie’s copy', [genuineRow], 'Access fee proposed'),
    'Charlie uses the same crown artwork as slide 4. The 2-unit access fee is a proposal. No payment is posted. One steward can control who sees the ledger.'),
  still('12-replicated-copies', control, 'Each café guest has a blue notebook copy and checks the signed entry locally.',
    cafeRoom + actor('alice', 'point', 'stand') + actor('bob', 'point', 'suspicious') + actor('charlie', 'hold', 'stand') + cafeTable
    + notebook(292, 702, .68, 'Alice’s copy', [genuineRow], 'Signature checked')
    + notebook(802, 702, .68, 'Bob’s copy', [genuineRow], 'Signature checked')
    + notebook(1302, 702, .68, 'Charlie’s copy', [genuineRow], 'Signature checked'),
    'Each independently checks the signature and available balance against their own copy. Copies improve access. They do not establish the same ordering when conflicting payments are received in a different order.'),
];

export const cafeStills = [...nine, ...ten, eleven, ...twelve];
