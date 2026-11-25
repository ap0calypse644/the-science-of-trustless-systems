import { decide, four, localReports, three, type Order } from './model';

const bobThree = localReports(three, 'Bob');
const bobFour = localReports(four, 'Bob');
const charlieFour = localReports(four, 'Charlie');
const decisionThree = decide(bobThree);
const decisionBob = decide(bobFour);
const decisionCharlie = decide(charlieFour);

function cell(order: Order): string {
  return `<td class="${order.toLowerCase()}">${order}</td>`;
}

function majority(decision: ReturnType<typeof decide>): string {
  return `${decision.order} · ${decision.votes} of ${decision.total}`;
}

export function threeTable(rows: number, result: boolean): string {
  return `<table class="byz-table three-reports">
    <caption>Bob’s reports</caption>
    <thead><tr><th scope="col">Source</th><th scope="col">Reported order</th></tr></thead>
    <tbody>${bobThree.slice(0, rows).map(({ from, order }, index) => `
      <tr><th scope="row">${from} · ${index === 0 ? 'direct' : 'forwarded'}</th>${cell(order)}</tr>`).join('')}
    </tbody>
  </table>
  ${result ? `<p class="byz-majority">${decisionThree.attack} Attack, ${decisionThree.retreat} Retreat → tie defaults to ${decisionThree.order}</p>
  <p class="byz-foot">Bob fails to follow the loyal commander in this run.</p>` : ''}`;
}

export function fourTable(rows: number, result: boolean): string {
  const sources = ['Alice · direct', 'Other loyal general · forwarded', 'Mallory · forwarded'];
  return `<table class="byz-table four-reports">
    <caption>What each loyal general receives</caption>
    <thead><tr><th scope="col">Report source</th><th scope="col">Bob’s view</th><th scope="col">Charlie’s view</th></tr></thead>
    <tbody>${sources.slice(0, rows).map((source, index) => `
      <tr><th scope="row">${source}</th>${cell(bobFour[index].order)}${cell(charlieFour[index].order)}</tr>`).join('')}
    </tbody>
    ${result ? `<tfoot><tr><th scope="row">Majority decision</th><td>${majority(decisionBob)}</td><td>${majority(decisionCharlie)}</td></tr></tfoot>` : ''}
  </table>
  ${result ? '<p class="byz-foot">Both follow Alice’s order despite Mallory’s conflicting reports.</p>' : ''}`;
}

export const printComparison = `<div class="byz-print">
  <div><h2>Three generals</h2>${threeTable(2, true)}</div>
  <div><h2>Four generals</h2>${fourTable(3, true)}</div>
  <p>OM(1) assumes synchronous rounds, known senders and detectable omissions. One fault requires at least four generals.</p>
</div>`;
