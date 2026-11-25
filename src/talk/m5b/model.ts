export type Order = 'Attack' | 'Retreat';
export type General = 'Alice' | 'Bob' | 'Charlie' | 'Mallory';
export type Lieutenant = Exclude<General, 'Alice'>;
export type LoyalLieutenant = Exclude<Lieutenant, 'Mallory'>;

interface Message {
  path: readonly General[];
  order: Order | undefined;
}

interface Run {
  lieutenants: readonly Lieutenant[];
  messages: readonly Message[];
}

const defaultOrder: Order = 'Retreat';

// Two fixed OM(1) runs. Reports are attributed to the actual immediate sender.
function example(lieutenants: readonly Lieutenant[]): Run {
  const direct = lieutenants.map((to): Message => ({ path: ['Alice', to], order: 'Attack' }));
  const reports = lieutenants.flatMap((from) => lieutenants.filter((to) => to !== from)
    .map((to): Message => ({
      path: ['Alice', from, to],
      order: from === 'Mallory' && to === 'Bob' ? 'Retreat' : 'Attack',
    })));
  return { lieutenants, messages: [...direct, ...reports] };
}

export const three = example(['Bob', 'Mallory']);
export const four = example(['Bob', 'Charlie', 'Mallory']);

export function localReports(run: Run, recipient: LoyalLieutenant) {
  return run.messages.filter(({ path }) => path.at(-1) === recipient).map(({ path, order }) => ({
    path,
    from: path[path.length - 2],
    order: order ?? defaultOrder,
  }));
}

export function decide(reports: readonly { order: Order }[]) {
  const attack = reports.filter(({ order }) => order === 'Attack').length;
  const retreat = reports.length - attack;
  const order: Order = attack > retreat ? 'Attack' : defaultOrder;
  return { order, attack, retreat, votes: Math.max(attack, retreat), total: reports.length, tied: attack === retreat };
}
