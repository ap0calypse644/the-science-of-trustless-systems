import { character } from '../../illustration/character';
import { svgText } from '../../illustration/svg';
import { stagingSheet } from './art';
import type { Response } from './bank-model';

interface BankArt {
  label: string;
  partition: boolean;
  a: '1,000' | '0';
  b: '1,000' | '0';
  charlie: 'a' | 'b';
  dialogue?: string;
  cash?: boolean;
  response?: Response;
  walking?: boolean;
}

interface BankStill extends BankArt {
  id: string;
  notes: string;
}

function branch(x: number, identity: 'alice' | 'bob', balance: string): string {
  const a = identity === 'alice';
  return `<g transform="translate(${x} 0)" data-branch="${a ? 'A' : 'B'}">
    <path class="cluster-shadow" d="M-268 538 Q-37 504 270 537 Q180 565-231 562Z"/>
    <path class="${a ? 'blue-wash' : 'green-wash'} ink" d="M-246 292 Q1 279 245 291
      L241 538 Q-17 545-245 535Z"/>
    <path class="head" d="M-266 275 L-224 245 Q-12 232 227 242 L265 275
      Q263 286 245 291 Q-32 281-248 296 Q-270 294-266 275Z"/>
    <path class="fine" d="M-227 258 Q-29 247 218 255 M-250 278 Q-198 271-154 273 m300-2 q50-1 91 5"/>
    <path class="fine brick-detail" d="M-239 378 h11 m-15 8 h15 m380-76 h46 m-14-6 v6 m-15 213 h38 m-24 0 v7"/>
    <path class="head" d="M-109 217 Q-10 210 108 216 L105 270 Q-5 265-108 275Z"/>
    <text class="branch-letter" y="253">Branch ${a ? 'A' : 'B'}</text>
    <path class="head" d="M-226 318 Q-165 313-79 319 L-78 508 L-224 510Z"/>
    <path class="fine" d="M-212 335 Q-164 331-94 337 L-94 497 L-210 499Z"/>
    ${character(identity, { x: -149, y: 387, scale: .71, facing: 'right',
      pose: a ? 'hold' : 'point', angles: a ? {} : { rightArm: 14 } })}
    <path class="head" d="M-232 476 Q-155 470-72 476 L-67 494 L-235 497Z"/>
    <path class="fine" d="M-200 523 h24 m-16-8 h17 m366-117 h29 m-25 10 21-1 m-15 108 18-1"/>
    <g transform="translate(78 414)">
      <path class="head" d="M-126-70 Q-1-77 126-69 L122 94 Q-2 101-127 94Z"/>
      <path class="screen-edge fine" d="M-117-60 Q-3-66 116-59 L113 84 Q-1 89-117 84Z"/>
      <text class="minor-label" y="-25">Stored balance</text>
      <text class="amount" y="42">${balance}</text>
      <text class="minor-label" y="74">units</text>
    </g>
  </g>`;
}

function connection(partition: boolean): string {
  return partition ? `<g data-link="partitioned">
    <path class="failed-service" d="M565 361 H738 m124 0 h173"/>
    <path class="alarm state-mark" d="m786 345 29 32 m-28 0 28-33"/>
    <path class="gesture alarm" d="m779 331-11-12 m62 11 11-12 m-17 67 13 13"/>
    <text class="callout negative-text" x="801" y="421">Link down</text>
  </g>` : `<g data-link="connected">
    <path class="service-path" d="M565 361 Q804 349 1035 361 m-472 0 18-13 m-18 13 18 12 m433-24 22 12-22 10"/>
    <text class="callout positive-text" x="800" y="419">Link up</text>
  </g>`;
}

function inquiry(words: string): string {
  return `<g transform="translate(1035 627)">
    <path class="head" d="M-181-24 Q-179-38-151-38 L149-40 Q181-39 182-15 L181-7 L229 5 L181 14 Q177 29 152 29
      L-150 31 Q-179 31-182 9Z"/>
    <text class="callout" y="9">${svgText(words)}</text>
  </g>`;
}

function money(x: number): string {
  return `<g transform="translate(${x} 677) rotate(-12)">
    <path class="green-wash ink" d="M-39-19 Q2-25 46-20 L44 18 L-40 23Z"/>
    <path class="fine" d="M-30-11 L37-13 L36 11 L-31 15Z"/>
    <path class="fine" d="M-7 2 q6-17 16-3 q3 8-8 10 q-11 1-8-7"/>
    <path class="gesture signal" d="m54-19 14-10 m-12 18 18-2"/>
  </g>`;
}

function response(kind: BankStill['response']): string {
  if (!kind) return '';
  if (kind === 'print') return `<g data-response="print">
    <path class="proposal gold-wash" d="M158 761 Q398 750 771 759 L770 855 Q408 861 160 853Z"/>
    <path class="proposal blue-wash" d="M835 759 Q1130 752 1441 759 L1442 855 Q1121 861 835 853Z"/>
    <text class="callout" x="463" y="801">Return 1,000 units</text>
    <text class="minor-label" x="463" y="835">Stale answer after the withdrawal</text>
    <text class="callout" x="1136" y="801">Wait for synchronization</text>
    <text class="minor-label" x="1136" y="835">Read stays pending while partitioned</text>
  </g>`;
  if (kind === 'choice') return `<g data-response="choice">
    <path class="proposal blue-wash" d="M415 784 Q570 776 759 783 L761 841 Q598 846 415 841Z"/>
    <path class="proposal green-wash" d="M839 784 Q1030 775 1185 784 L1183 841 Q1013 845 838 841Z"/>
    <text class="callout" x="588" y="824">Return 1,000</text>
    <text class="callout" x="1013" y="824">Wait for sync</text>
  </g>`;
  const copy = {
    stale: ['Returned: 1,000 units', 'Stale answer'],
    wait: ['Read pending', 'No answer while the link is down'],
    reconnected: ['Returned: 0 units', 'Waiting read completes'],
    'reconnected-stale': ['Earlier answer: 1,000 units', 'Both stored balances now synced'],
  }[kind];
  return `<g data-response="${kind}">
    <path class="proposal ${kind === 'stale' ? 'gold-wash' : 'blue-wash'}" d="M494 743 Q771 731 1111 742
      L1110 849 Q813 857 492 847Z"/>
    <text class="callout" x="800" y="786">${copy[0]}</text>
    <text class="minor-label" x="800" y="826">${copy[1]}</text>
  </g>`;
}

const beats: readonly BankStill[] = [
  { id: 'synced', label: 'Synced', partition: false, a: '1,000', b: '1,000', charlie: 'a',
    notes: 'Both branches are running, connected, and store the same account balance of 1,000 units.' },
  { id: 'partition', label: 'Partition', partition: true, a: '1,000', b: '1,000', charlie: 'a',
    notes: 'The network link fails. Both branches are still running and can serve local customers.' },
  { id: 'withdrawal', label: 'Withdrawal', partition: true, a: '0', b: '1,000', charlie: 'a',
    cash: true,
    notes: 'A has completed the write and handed Charlie the cash. B still stores 1,000 units. A consistency-first design could instead have refused to complete this earlier withdrawal during the partition.' },
  { id: 'balance-inquiry', label: 'Balance inquiry', partition: true, a: '0', b: '1,000', charlie: 'b',
    dialogue: 'What’s my balance?',
    notes: 'The inquiry at B begins after the withdrawal has completed. B has no way to learn the latest balance from A while the partition persists.' },
  { id: 'choose-response', label: 'Choose response', partition: true, a: '0', b: '1,000', charlie: 'b',
    dialogue: 'What’s my balance?', response: 'choice',
    notes: 'Pause for a prediction. These are illustrations of the two responses for staging, with the interactive choice deferred to the implementation phase.' },
  { id: 'outcome-stale', label: 'Outcome — stale response', partition: true, a: '0', b: '1,000', charlie: 'b',
    response: 'stale',
    notes: 'B responds using its locally stored 1,000 units. Returning this stale balance for a read after the completed withdrawal violates linearizability in this history.' },
  { id: 'outcome-wait', label: 'Outcome — waiting', partition: true, a: '0', b: '1,000', charlie: 'b',
    response: 'wait',
    notes: 'B holds the read for authoritative data. Waiting indefinitely if the partition persists sacrifices CAP availability for this request, even though the branch is running.' },
  { id: 'reconnect', label: 'Reconnect the waiting branch', partition: false, a: '0', b: '0', charlie: 'b',
    response: 'reconnected',
    notes: 'Following the waiting outcome, the link comes back, both replicas synchronize to 0, and B completes the pending read. Eventual convergence does not retroactively make a stale read linearizable. These stills illustrate a history, not a complete protocol or full guarantees.' },
];

export function bankComposition({
  label, partition, a, b, charlie, dialogue, cash, response: answer, walking,
}: BankArt): string {
  const x = charlie === 'a' ? 431 : 1275;
  return stagingSheet('Consistency or Availability?',
    `${label}. Branch A stores ${a} units and branch B stores ${b} units.`, `
    <path class="ground-line" d="M83 553 Q327 560 602 548 M996 551 Q1256 540 1522 552"/>
    <path class="fine walkway" d="M180 714 Q417 736 607 724 M982 725 Q1229 734 1451 713"/>
    ${connection(partition)}
    ${branch(333, 'alice', a)}${branch(1267, 'bob', b)}
    <g data-walk>
      ${character('charlie', { x, y: 627, scale: .72, pose: walking ? 'run' : cash ? 'point' : 'hold',
        facing: cash ? 'right' : 'left', expression: cash ? 'excited' : 'stand',
        angles: cash && !walking ? { rightArm: 12 } : {} })}
      ${cash ? money(walking ? 468 : 492) : ''}
    </g>
    ${dialogue ? inquiry(dialogue) : ''}
    ${cash && !walking ? '<text class="callout" x="800" y="678">Withdrawal complete</text>' : ''}
    ${response(answer)}
  `);
}

export const bankStills = beats.map(({ id, label, notes, ...art }) => ({
  id: `06-${id}`,
  notes: `${label}. ${notes}`,
  composition: bankComposition({ ...art, label }),
}));
