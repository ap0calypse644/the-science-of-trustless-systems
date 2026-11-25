export type Account = 'Alice' | 'Bob' | 'Charlie';
export type Balances = Readonly<Record<Account, number>>;

interface Payment {
  readonly id: string;
  readonly from: Account;
  readonly to: Account;
  readonly amount: number;
  // Toy authorization flag corresponding to the handwriting in the illustration.
  readonly signed: boolean;
}

export const cafeOpening: Balances = { Alice: 0, Bob: 30, Charlie: 5 };
export const fake: Payment = { id: 'fake', from: 'Bob', to: 'Charlie', amount: 20, signed: false };
export const genuine: Payment = { id: 'coffee', from: 'Bob', to: 'Alice', amount: 10, signed: true };
export const largeOrder: Payment = { id: 'large-order', from: 'Charlie', to: 'Bob', amount: 500, signed: true };
export const fresh: Balances = { Alice: 0, Bob: 0, Charlie: 20 };
export const toAlice: Payment = { id: 'alice-first', from: 'Charlie', to: 'Alice', amount: 20, signed: true };
export const toBob: Payment = { id: 'bob-first', from: 'Charlie', to: 'Bob', amount: 20, signed: true };

export function history(opening: Balances, arrival: readonly Payment[]) {
  let balances = opening;
  const accepted: Payment[] = [];
  const rejected: { payment: Payment; reason: string }[] = [];

  for (const payment of arrival) {
    const { id, from, to, amount, signed } = payment;
    const reason = !signed ? 'No signature'
      : accepted.some((entry) => entry.id === id) ? 'Already recorded'
        : balances[from] < amount ? 'Insufficient balance' : '';
    if (reason) {
      rejected.push({ payment, reason });
      continue;
    }
    balances = { ...balances, [from]: balances[from] - amount, [to]: balances[to] + amount };
    accepted.push(payment);
  }
  return { balances, accepted, rejected };
}

export const cafe = history(cafeOpening, [fake, genuine]);
export const overspend = history(cafe.balances, [largeOrder]);
export const aliceView = history(fresh, [toAlice, toBob]);
export const bobView = history(fresh, [toBob, toAlice]);

export function line({ from, to, amount }: Payment): string {
  return `${from} pays ${to} ${amount}`;
}
