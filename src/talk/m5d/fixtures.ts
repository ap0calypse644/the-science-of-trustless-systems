// Authored examples. Hex is expanded into bits only for display.
export const digests = {
  greeting: '5858ecffebde67a35de504dca4a9f23d2d5dc0df6a8a0d609c45d1d7458a5e3e',
  ledger: 'cfec44f64dc9b3943a39ef91301824e46621782ce52c6d66538cbbb4d2e5081b',
  library: '977e7800f5ae534400ddff8a29a8917a1c17622a5a8f512dfe42aaa932291203',
  edited: '48d088354d301b7346379063b4864e651b57e08f404c5256f198c1cb1b0271c3',
} as const;

export function bits(hex: string): string {
  return [...hex].map((digit) => Number.parseInt(digit, 16).toString(2).padStart(4, '0')).join('');
}

export const originalRow = 'Alice → Bob · 10';
export const editedRow = 'Alice → Bob · 11';
export const digitBytes = ['00110000', '00110001'] as const;
export const originalBits = bits(digests.ledger);
export const editedBits = bits(digests.edited);
export const changedBits = [...originalBits].map((bit, index) => bit !== editedBits[index]);
export const changedCount = changedBits.filter(Boolean).length;

export const signedRows = [originalRow, 'Bob → Charlie · 5', 'Charlie → Alice · 2'] as const;
export const target = '0000';
export const initialPrefix = originalBits.slice(0, 8);
export const attempts = [
  { nonce: 0, prefix: '10110100' },
  { nonce: 1, prefix: '01100010' },
  { nonce: 2, prefix: '11010011' },
  { nonce: 3, prefix: '00011010' },
  { nonce: 4, prefix: '10001100' },
  { nonce: 5, prefix: '00100001' },
  { nonce: 6, prefix: '01010011' },
  { nonce: 7, prefix: '00001011' },
] as const;
export const successfulAttempt = attempts[7];
export const verification = { ...successfulAttempt, rows: signedRows };
export const expectedWork = [
  { zeroBits: 4, attempts: 16 },
  { zeroBits: 8, attempts: 256 },
  { zeroBits: 16, attempts: 65_536 },
  { zeroBits: 24, attempts: 16_777_216 },
] as const;
