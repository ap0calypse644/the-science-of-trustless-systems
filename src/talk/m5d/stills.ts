import { arrow, bitRow, grid, label, ledgerPage, machine, panel, person, sheet } from './art';
import {
  attempts, bits, changedBits, changedCount, digests, digitBytes, editedBits, editedRow,
  expectedWork, initialPrefix, originalBits, originalRow, signedRows, successfulAttempt, target, verification,
} from './fixtures';

const fingerprint = 'Giving Data a Fingerprint';
const oneBit = 'What If We Change Just One Bit?';
const work = 'Prove That You Have Done Some Work';
const verify = 'Hard to Solve, Easy to Verify';
const secureHash = 'Source: NIST FIPS 180-4, Secure Hash Standard, §6.2. https://csrc.nist.gov/pubs/fips/180-4/upd1/final';
const proofOfWork = 'Source: Bitcoin whitepaper, §4, for the proof-of-work search and single-hash check. https://bitcoin.org/bitcoin.pdf';
const inspiration = 'Pedagogical reference: 3Blue1Brown, But how does bitcoin actually work? The layout and artwork here are original. https://www.3blue1brown.com/lessons/bitcoin';

function still(id: string, title: string, description: string, art: string, notes: string) {
  const disclosure = 'The examples in this sequence use fixed, authored data. The digest and nonce outputs are not computed SHA-256 results.';
  return { id, composition: sheet(title, description, art), notes: `${notes}\n\n${disclosure}` };
}

function inputFlow(input: string, caption?: { kind: string; encoding: string }): string {
  return input + (caption ? label(305, 632, caption.kind, 'strong') + label(305, 678, caption.encoding, 'small') : '')
    + arrow(501, 465, 643) + label(572, 428, 'bytes', 'small')
    + machine(799, 466) + arrow(957, 465, 1053);
}

function output(pattern?: string): string {
  return pattern
    ? grid(1114, 277, bits(pattern), [], 22) + label(1290, 705, '256-bit output', 'strong')
    : panel(1110, 390, 357, 150, 'blue-paper') + label(1289, 480, '256-bit output', 'strong');
}

const greeting = panel(155, 396, 300, 130, 'yellow-paper')
  + label(305, 480, '“Hello!”', 'large');

function shelfBook(x: number, base: number, width: number, height: number, color: string, tilt = 0): string {
  return `<g data-prop="shelf-book" transform="translate(${x} ${base}) rotate(${tilt})">
    <path class="book-spine ${color}" d="M0 0V${-height + 5}Q0 ${-height} 5 ${-height}H${width}V0Z"/>
    <path class="book-pages" d="M${width - 7} ${-height + 3}H${width}V-3H${width - 7}Z"/>
    <path class="book-detail" d="M4 ${-height + 10}H${width - 10}M4 ${-height + 16}H${width - 10}
      M4 -9H${width - 10}M${(width - 7) / 2} ${-height / 2 - 8}v16"/>
  </g>`;
}

const shelves = `<g transform="translate(122 260)">
  ${panel(0, 0, 367, 280, 'yellow-paper')}
  ${[89, 176, 263].map((base, row) => {
    const colors = ['blue-paper', 'green-paper', 'pink-paper', 'plain'];
    return [26, 64, 96, 138, 178, 215, 255, 299].map((x, index) => {
      const width = [32, 26, 35, 34, 31, 30, 34, 30][index];
      const height = 45 + (row * 11 + index * 13) % 27;
      return shelfBook(x, base, width, height, colors[(row + index) % colors.length], index === 7 ? 15 : 0);
    }).join('') + `<path class="book-shelf" d="M14 ${base + 2}h339"/>`;
  }).join('')}
</g>`;

const copyLane = (y: number, who: 'alice' | 'bob', name: string): string =>
  person(who, 199, y + 25, 'point', 'stand', 'right', .72)
  + label(199, y + 180, name, 'body')
  + `<g transform="translate(185 ${y * .43}) scale(.57)">${ledgerPage(388, y, [originalRow])}</g>`
  + arrow(515, y, 632) + machine(742, y, .68) + arrow(845, y, 967)
  + panel(982, y - 46, 410, 92, 'blue-paper')
  + label(1187, y - 4, originalBits.slice(0, 16) + '…', 'monospace')
  + label(1187, y + 30, '256 bits · first 16 shown', 'small');

const slide14 = [
  still('14-machine', fingerprint, 'Bytes enter a hash machine that produces a fixed 256-bit output.',
    inputFlow(panel(155, 396, 300, 130) + label(305, 474, 'Input data', 'strong')) + output(),
    'Introduce the hash as a function on data. Ask whether the output will get larger with the input. SHA-256 produces a 256-bit digest for permitted message lengths. The drawing omits padding and compression. ' + secureHash),
  still('14-greeting', fingerprint, 'A greeting encoded as bytes yields a 256-bit digest.',
    inputFlow(greeting, { kind: 'A greeting', encoding: '6 bytes in UTF-8' }) + output(digests.greeting),
    'Use the six ASCII characters in Hello! as bytes in UTF-8. The displayed pattern is authored to illustrate the fixed size. ' + secureHash),
  still('14-ledger', fingerprint, 'A ledger encoded as bytes yields a different digest of the same size.',
    inputFlow(ledgerPage(305, 443, [originalRow]), { kind: 'A ledger', encoding: 'An agreed byte encoding' }) + output(digests.ledger),
    'Both sides must agree on the serialized ledger bytes. A differently encoded record can hash differently even when it reads the same to a person. The pattern is illustrative. ' + secureHash),
  still('14-library', fingerprint, 'A huge library encoded as bytes still yields a 256-bit digest.',
    inputFlow(shelves, { kind: 'An entire library', encoding: 'A large byte stream' }) + output(digests.library),
    'Think of the books serialized as a single byte stream within the algorithm’s allowed message length. The output remains 256 bits. Fixed length does not imply distinct inputs always yield distinct outputs. ' + secureHash),
  still('14-identical-copies', fingerprint, 'Alice and Bob hash byte-identical ledger copies and get matching digests.',
    copyLane(320, 'alice', 'Alice') + copyLane(620, 'bob', 'Bob') + label(1187, 770, 'Matching digests', 'strong passed'),
    'These are byte-for-byte copies using the same algorithm, so the full digests are identical. The slide shows matching prefixes of the same authored digest. A short prefix alone is not evidence of equal full digests. Ask what would happen if one bit of the input changed. ' + secureHash),
];

const record = (when: 'original' | 'edited'): string => when === 'original'
  ? person('alice', 240, 391, 'hold', 'stand', 'right', 1.08)
    + ledgerPage(550, 425, [originalRow]) + arrow(751, 425, 920)
    + grid(1030, 260, originalBits, [], 21)
    + label(1198, 655, 'Alice’s separately saved digest', 'strong')
  : person('charlie', 1065, 390, 'point', 'suspicious', 'left', 1.12)
    + ledgerPage(720, 429, [editedRow]) + label(720, 638, '10 → 11', 'large')
    + label(720, 700, 'Same encoding · one digit replaced', 'body');

function comparison(): string {
  return label(485, 221, 'Saved original digest', 'strong') + label(1115, 221, 'Edited ledger digest', 'strong')
    + grid(285, 264, originalBits, changedBits, 25) + grid(915, 264, editedBits, changedBits, 25)
    + label(800, 734, `${changedCount} of 256 bits changed`, 'large')
    + label(800, 779, 'Outlined cells mark the positions that differ', 'small');
}

function digestCard(x: number, y: number, caption: string, prefix: string, color: string): string {
  return panel(x, y, 550, 105, color)
    + label(x + 275, y + 39, caption, 'body')
    + label(x + 275, y + 79, prefix + '…', 'monospace');
}

const slide15 = [
  still('15-original', oneBit, 'Alice saves a trusted copy of the original ledger digest separately.',
    record('original'), 'Assume Alice can trust this separately stored reference digest. She saves it before Charlie touches the ledger. ' + secureHash),
  still('15-edit', oneBit, 'Charlie changes the amount in the first row from 10 to 11.',
    record('edited'), 'Treat these as otherwise identical bytes in a fixed ASCII-compatible UTF-8 encoding. Charlie replaces the final digit of the amount.'),
  still('15-one-bit', oneBit, 'The ASCII encodings for the digits zero and one differ only in their final bit.',
    label(382, 351, 'Original digit 0', 'strong') + label(382, 512, 'Edited digit 1', 'strong')
    + bitRow(580, 296, digitBytes[0], [7], false, 65) + bitRow(580, 457, digitBytes[1], [7], false, 65)
    + label(840, 655, '1 bit changed', 'large') + label(840, 713, 'ASCII bytes · same in UTF-8', 'body'),
    'The two eight-bit code units are 00110000 and 00110001. Leading zeroes are shown to give the full byte. The other digit in 10 and 11 stays unchanged.'),
  still('15-avalanche', oneBit, 'Aligned 256-bit grids differ in 132 positions, identified with outlines.',
    comparison(),
    `Both bit grids use the same row-major order. The count comes from the fixed patterns. An avalanche effect is a design goal, and this example illustrates the idea. It gives no exact flip-count guarantee for a particular input pair. ${secureHash}`),
  still('15-detected', oneBit, 'Alice detects the edit by comparing against her separately trusted original digest.',
    person('alice', 306, 440, 'point', 'suspicious', 'right', 1.1)
    + person('charlie', 1283, 440, 'confused', 'confused', 'left', 1.1)
    + digestCard(530, 253, 'Trusted saved original', originalBits.slice(0, 16), 'green-paper')
    + digestCard(530, 417, 'Edited ledger digest', editedBits.slice(0, 16), 'pink-paper')
    + label(805, 629, 'Digests differ · Edit detected', 'strong rejected')
    + label(805, 680, 'First 16 bits shown', 'small'),
    'Alice compares the full digest of the presented ledger to the trusted reference. This scene illustrates the comparison with fixed data. Charlie could replace a digest stored beside the edited record, which is why the separate trust assumption matters. A mismatch detects a change and does not identify who made it. ' + secureHash),
];

const targetLabel = () => label(800, 190, `Target · First four bits are ${target}`, 'strong');

function attemptCard(x: number, y: number, prefix: string, success = false): string {
  return panel(x, y, 477, 146, success ? 'green-paper' : 'plain')
    + bitRow(x + 33, y + 17, prefix, success ? [0, 1, 2, 3] : [], success, 47)
    + label(x + 424, y + 53, '…', 'strong')
    + label(x + 237, y + 111, success ? '✓ Meets target' : '× Misses target', `strong ${success ? 'passed' : 'rejected'}`);
}

function ledgerAndNonce(nonce?: number): string {
  return ledgerPage(315, 412, signedRows, 'signed')
    + (nonce === undefined ? '' : panel(168, 587, 294, 72, 'yellow-paper') + label(315, 634, `Nonce ${nonce}`, 'strong'));
}

function pipeline(nonce: number | undefined, prefix: string, success = false): string {
  return targetLabel() + ledgerAndNonce(nonce) + arrow(525, 412, 634) + machine(790, 412)
    + arrow(942, 412, 1016) + attemptCard(1038, 339, prefix, success);
}

function attemptStrip(from: number, through: number, y: number): string {
  const selected = attempts.slice(from, through + 1);
  return selected.map(({ nonce, prefix }, index) => {
    const x = 800 + (index - (selected.length - 1) / 2) * 177;
    return panel(x - 82, y, 164, 76, 'pink-paper')
      + label(x, y + 29, `Nonce ${nonce} ×`, 'small')
      + label(x, y + 60, prefix + '…', 'monospace');
  }).join('');
}

const slide16 = [
  still('16-target', work, 'The unchanged signed ledger produces a prefix that misses four leading zero bits.',
    pipeline(undefined, initialPrefix),
    'Use a self-contained illustrative batch of signed transfers, independent of the balances in slide 13. This classroom puzzle checks four leading zero bits. Read the first four binary digits and ask what could vary. The actual Bitcoin protocol compares a block-header hash against a numeric target. ' + proofOfWork + '\n\n' + inspiration),
  still('16-signature-failure', work, 'Changing a signed amount makes that row fail signature verification.',
    targetLabel() + ledgerPage(500, 437, [editedRow, ...signedRows.slice(1)], 'edited')
    + panel(822, 356, 498, 173, 'pink-paper')
    + label(1071, 429, '× Signature fails', 'large rejected') + label(1071, 478, 'Undo the edit', 'strong'),
    'A real signature binds the signed bytes. Changing a signed amount without a new valid signature breaks verification under the scheme assumptions. The scribbles model only that relationship. Undo the edit before trying a nonce. Source: NIST FIPS 186-5, Digital Signature Standard. https://csrc.nist.gov/pubs/fips/186-5/final'),
  still('16-nonce', work, 'The ledger is restored and an unsigned search field starts at nonce zero.',
    pipeline(attempts[0].nonce, attempts[0].prefix),
    'Treat the nonce as a separate input to the hash alongside the unchanged signed batch. The signature still covers the original payment. The displayed fixture for nonce 0 misses.'),
  still('16-failed-attempt', work, 'Several fixed nonce attempts fail while the signed ledger stays unchanged.',
    pipeline(attempts[3].nonce, attempts[3].prefix) + attemptStrip(0, 2, 724),
    'Advance through authored nonce attempts 0 to 3. Even a prefix beginning 0001 fails. Only the nonce changes. These outputs are examples, with no runtime search.'),
  still('16-success', work, 'The unchanged ledger with nonce seven has a prefix that meets the four-zero-bit target.',
    pipeline(successfulAttempt.nonce, successfulAttempt.prefix, true) + attemptStrip(4, 6, 724),
    'Attempts 4 through 6 fail. The authored nonce 7 succeeds with 00001011… . Hold on the four leading zeros and ask what a verifier would need. The script has no implication about how many attempts a real run takes. ' + proofOfWork),
];

const discards = [
  [135, 375, -10, 0], [113, 715, 8, 2], [325, 761, -5, 3], [372, 278, 10, 5], [72, 555, -9, 6],
].map(([x, y, angle, index]) => `<g transform="rotate(${angle} ${x} ${y})">
  ${panel(x, y, 176, 53, 'pink-paper')}${label(x + 87, y + 35, attempts[index].prefix + '… ×', 'monospace discard')}
</g>`).join('');

const slide17 = [
  still('17-handoff', verify, 'Charlie hands Alice both the unchanged signed ledger and successful nonce, with failed digests around him.',
    discards + person('charlie', 377, 475, 'hold', 'excited', 'right', 1.18)
    + person('alice', 1216, 475, 'hold', 'stand', 'left', 1.18)
    + label(377, 720, 'Charlie', 'strong') + label(1216, 720, 'Alice', 'strong')
    + ledgerPage(790, 411, verification.rows, 'signed')
    + panel(654, 571, 272, 72, 'yellow-paper') + label(790, 620, `Nonce ${verification.nonce}`, 'strong')
    + arrow(984, 467, 1120),
    'Charlie sends the entire candidate: the exact signed ledger bytes and the successful nonce. Alice needs the same encoding, hash function and target. She need not replay the failed attempts. ' + proofOfWork),
  still('17-verify', verify, 'Alice hashes the same ledger and nonce once and checks the leading four zero bits.',
    pipeline(verification.nonce, verification.prefix, true) + person('alice', 628, 645, 'point', 'stand', 'right', .76)
    + label(984, 726, 'Alice · One hash and a target check', 'strong'),
    'With the candidate fixed, recompute its hash once and check the target. The matching output is an authored fixture reused from slide 16. This comparison isolates the proof-of-work check. Checking signatures and every other validity rule is additional work. ' + proofOfWork),
  still('17-work-comparison', verify, 'Expected search attempts grow with the number of leading zeros, while checking one fixed candidate takes one hash and a target check.',
    panel(170, 233, 737, 490, 'blue-paper') + panel(985, 233, 444, 490, 'green-paper')
    + label(538, 300, 'Find a candidate', 'large') + label(1207, 300, 'Check a candidate', 'strong')
    + label(352, 383, 'Leading zeros', 'body') + label(723, 383, 'Expected attempts', 'body')
    + expectedWork.map(({ zeroBits, attempts: count }, index) => {
      const y = 449 + index * 70;
      return label(352, y, String(zeroBits), 'monospace')
        + label(723, y, count.toLocaleString('en-US'), 'monospace');
    }).join('')
    + label(1207, 472, '1 hash', 'large passed') + label(1207, 536, '+ target check', 'strong')
    + label(1207, 622, 'Same for each row', 'small')
    + label(800, 786, 'Expected values assume independent, uniformly distributed outputs', 'small'),
    'With ideal independent uniform hash outputs, a candidate meets a k-leading-zero-bit target with probability 2⁻ᵏ. The expected attempts are 2ᵏ. A lucky search can succeed quickly and an unlucky one can take much longer. The table compares expected search with testing one fixed candidate, rather than with verifying an entire block. ' + proofOfWork + '\n\n' + inspiration),
];

export const stills = [...slide14, ...slide15, ...slide16, ...slide17];
