import { character, type Character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { castle, landscape, thought } from '../two-generals/art';

type Order = 'Attack' | 'Retreat';
type Loyal = Extract<Character, 'alice' | 'bob' | 'charlie'>;

interface StagingFrame {
  id: string;
  label: string;
  subtitle: string;
  notes: string;
  actors: string;
  messages?: string;
  overlay?: string;
}

function mallory(x: number, y: number, scale: number, dispatching: boolean): string {
  return `<g data-actor="mallory" transform="translate(${x} ${y}) scale(${scale})">
    <path class="cape" d="M-29 31 Q-56 79-76 124 Q-45 120-25 134 L25 118
      Q32 70 17 34Z"/>
    <path class="cape-fold" d="M-28 57 Q-38 90-54 113 m36-53 q-11 35-18 50"/>
    <path class="mallory-limbs" d="M-2 37 Q11 71 1 97 Q-7 121-25 143 l-10 1 M1 97 Q17 117 24 143 l13 1"/>
    <path class="mallory-limbs" d="${dispatching
      ? 'M2 54 Q-24 69-48 57 l-17-16 M2 54 Q30 72 51 60 l15-17'
      : 'M2 55 Q-18 70-31 93 M2 55 Q28 65 47 48'}"/>
    <path class="head" d="M-34 5 Q-40-21-18-33 Q9-44 31-24 Q41-3 25 18
      Q13 40-8 35 Q-28 27-34 5Z"/>
    <path class="visor" d="M-42-6 Q-47-35-25-48 L-31-65 Q-10-62 4-49
      Q30-48 38-29 L46-23 L26-8 Q0-20-31 2Z"/>
    <path class="cape-fold" d="M-22-43 Q-3-42 8-32 M14-40 l9 7 M-30 19 l3 4"/>
    <path class="mallory-face" d="M-21 2 l12 6 m11 0 15-6 M-14 11 v3 m18-1 1 3 M-9 23 Q7 30 18 18"/>
    <path class="cape" d="M-20 35 Q-5 45 12 32 L26 43 Q1 55-18 47Z"/>
    <circle class="prop yellow" cx="9" cy="43" r="5"/>
    ${dispatching ? envelope(-69, 36, .24, -14) + envelope(69, 36, .24, 12) : ''}
  </g>`;
}

function lieutenant(person: Loyal, x: number, y: number): string {
  const names: Record<Loyal, string> = { alice: 'Alice', bob: 'Bob', charlie: 'Charlie' };
  return `<g data-actor="${person}">
    ${character(person, { x, y, scale: .77, facing: person === 'alice' ? 'right' : 'left',
      pose: person === 'charlie' ? 'hold' : 'suspicious', expression: 'stand' })}
    <text class="actor-name ${person}" x="${x}" y="${y + 168}">${names[person]}</text>
  </g>`;
}

function commander(person: 'mallory' | 'alice', dispatching = false): string {
  return `
    <path class="command-ledge" d="M722 421 Q799 414 880 421 l-7 13-149 3Z"/>
    ${person === 'mallory' ? mallory(798, 311, .79, dispatching)
      : character('alice', { x: 800, y: 303, scale: .72, pose: 'point' })}
    <text class="commander-label ${person}" x="936" y="249">${person === 'mallory' ? 'Mallory' : 'Alice'}</text>
    <text class="role-label" x="936" y="284">Commander</text>
  `;
}

const alice = lieutenant('alice', 300, 398);
const bob = lieutenant('bob', 1295, 394);
const charlie = lieutenant('charlie', 1450, 416);

const deliveries = `<g class="byz-message">
    <path d="M742 355 Q580 308 365 416 m13-19-15 20 24-2 M859 354 Q1005 305 1231 412 m-24-5 24 6-12-20"/>
    ${envelope(549, 353, .28, -14)}${envelope(1050, 350, .28, 13)}
  </g>`;

const forwarding = `<g class="byz-message forwarded">
    <path d="M362 539 C570 614 1021 602 1232 534 m-26 5 26-6-14 23
      M1232 572 C1009 645 591 655 368 575 m25 1-26-3 13 22"/>
    ${envelope(600, 586, .24, 8)}${envelope(1082, 615, .24, -10)}
  </g>`;

interface Report {
  path: string;
  order: Order;
}

function reports(rows: readonly Report[]): string {
  return `<dl class="byz-reports">${rows.map(({ path, order }) => `
    <div><dt>${path}</dt><dd class="${order.toLowerCase()}">${order}</dd></div>`).join('')}
  </dl>`;
}

const aliceReports = [
  { path: 'Direct · Mallory → Alice', order: 'Attack' },
  { path: 'Forwarded · Mallory → Bob → Alice', order: 'Retreat' },
] as const;

const openingActors = commander('mallory') + alice + bob;

export const frames: readonly StagingFrame[] = [
  {
    id: '08-byzantine-generals', label: 'Opening battlefield',
    subtitle: 'Sent messages arrive. Can you trust the order?',
    actors: openingActors,
    notes: 'Direct sequel to slide 7. Mallory is the faulty commander. Alice and Bob are loyal lieutenants. In the classical oral-message model a sent message arrives, the immediate sender is known, and an omitted message is detectable after its round. No transferable signatures. Ask what changes when the sender can lie. Lamport, Shostak and Pease, The Byzantine Generals Problem, §§2–3, https://lamport.azurewebsites.net/pubs/byz.pdf.',
  },
  {
    id: '08-orders-alice', label: 'Direct orders, Alice’s local view',
    subtitle: 'Round 1 · Alice’s view',
    actors: commander('mallory', true) + alice + bob,
    messages: deliveries + thought(300, 'alice', ['From Mallory', 'Attack']),
    notes: 'Both of Mallory’s orders were delivered. Only Alice’s content is visible in this frame. Alice has a direct order to Attack and cannot see what Bob received.',
  },
  {
    id: '08-orders-bob', label: 'Direct orders, Bob’s local view',
    subtitle: 'Round 1 · Bob’s view',
    actors: commander('mallory', true) + alice + bob,
    messages: deliveries + thought(1295, 'bob', ['From Mallory', 'Retreat']),
    notes: 'This is Bob’s private view of the same round. Bob has a direct order to Retreat and does not see what Alice received. The presenter can inspect each view before forwarding; the comparison belongs to the next round.',
  },
  {
    id: '08-forwarded-reports', label: 'Forwarding with three generals',
    subtitle: 'Round 2 · Alice and Bob forward their orders',
    actors: openingActors,
    messages: forwarding,
    overlay: `<div class="byz-panel forwarding-panel">
      <div>
        <h2>Alice’s local reports</h2>
        ${reports(aliceReports)}
      </div>
      <div class="byz-summary">
        <p class="byz-decision">Tie → Retreat</p>
        <p>Both decide Retreat in this run.</p>
        <p class="byz-bound">3 generals · OM(1) · Outside guarantee</p>
      </div>
    </div>`,
    notes: 'Bob has the mirror view: his own direct Retreat and the forwarded Attack. Both loyal lieutenants have one of each and default to Retreat. Agreement in this run does not establish the guarantee. The impossibility argument for one fault uses indistinguishable executions, not the tie alone. See the three-general argument in §2 of Lamport, Shostak and Pease.',
  },
  {
    id: '08-four-generals', label: 'Four-general forwarding and outcome',
    subtitle: 'Round 2 · Charlie joins the loyal lieutenants',
    actors: openingActors + charlie,
    messages: `${forwarding}<g class="byz-message forwarded">
      <path d="M1414 535 Q1038 477 391 552 m23-12-24 12 24 6"/>
      ${envelope(1146, 523, .22, 3)}
    </g>`,
    overlay: `<div class="byz-panel forwarding-panel">
      <div>
        <h2>Alice’s local reports</h2>
        ${reports([...aliceReports, { path: 'Forwarded · Mallory → Charlie → Alice', order: 'Attack' }])}
      </div>
      <div class="byz-summary">
        <p class="byz-decision">Majority → Attack</p>
        <p>Alice, Bob and Charlie agree in this run.</p>
        <p class="byz-bound">4 generals · OM(1) · Within guarantee</p>
      </div>
    </div>`,
    notes: 'Mallory sends Attack to Alice and Charlie, and Retreat to Bob. Each loyal lieutenant includes their direct order and receives the other two lieutenant-origin reports. Each sees the same multiset {Attack, Retreat, Attack}. The agreement condition applies, but there is no requirement to follow a faulty commander or choose Attack specifically. With n = 4, m = 1 and one actual fault, the OM(1) bound holds.',
  },
  {
    id: '08-loyal-commander', label: 'Loyal commander, faulty lieutenant',
    subtitle: 'Alice orders Attack · Mallory forwards Retreat',
    actors: commander('alice') + bob + charlie
      + mallory(302, 400, .76, false)
      + '<text class="actor-name mallory" x="303" y="567">Mallory</text>',
    overlay: `<div class="byz-panel loyal-panel">
      <div>
        <h2>3 generals · Bob’s reports</h2>
        ${reports([{ path: 'Direct · Alice → Bob', order: 'Attack' }, { path: 'Alice → Mallory → Bob', order: 'Retreat' }])}
        <p class="byz-bound">Tie → Retreat · Validity fails</p>
      </div>
      <div>
        <h2>4 generals · Bob’s reports</h2>
        ${reports([{ path: 'Direct · Alice → Bob', order: 'Attack' }, { path: 'Alice → Mallory → Bob', order: 'Retreat' },
          { path: 'Alice → Charlie → Bob', order: 'Attack' }])}
        <p class="byz-bound">Majority → Attack · Validity holds</p>
      </div>
    </div>`,
    notes: 'Compare the two configurations, not a change within one execution. Alice is the loyal commander in both. In the three-participant case, Bob is the only loyal lieutenant and defaults to Retreat after a tie, failing loyal-commander validity. With Charlie added, Bob has two Attack values and decides Attack; Charlie has the corresponding loyal majority. Mallory lies about her own report, without forging Alice’s immediate sender identity.',
  },
];

export const battlefieldStills = frames.map(({ id, label, subtitle, notes, actors, messages, overlay }) => ({
  id,
  notes,
  composition: `<div class="talk-sheet byz-sheet">
    <h1>There's a traitor among us</h1>
    <p class="byz-subtitle">${subtitle}</p>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${label}">
      ${landscape}
      ${messages ?? ''}
      ${castle}
      ${actors}
    </svg>
    ${overlay ?? ''}
  </div>`,
}));
