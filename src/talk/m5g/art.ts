import { character } from '../../illustration/character';
import { svgText } from '../../illustration/svg';
import { cafeRoom, cafeTable, signature, speech } from '../m5c/art';
import { box, goldUnits } from '../m5f/art';
import { candidate, matchingPower, observations, proposal, totalPower, validators, type Phase, type Validator,
  type ValidatorId, type Vote } from './fixtures';
import './staging.css';

export function sheet(title: string, description: string, art: string, kind: string): string {
  return `<div class="talk-sheet stake-sheet cafe-sheet history-sheet mining-sheet ${kind}">
    <h1>${svgText(title)}</h1>
    <svg class="art" viewBox="0 0 1600 900" role="img" aria-label="${svgText(description)}">${art}</svg>
  </div>`;
}

function label(x: number, y: number, words: string, style = ''): string {
  return `<text x="${x}" y="${y}" class="${style}">${svgText(words)}</text>`;
}

function cameo(): string {
  return `<g data-satire="sam-altman" transform="translate(1442 346) scale(.77)">
    <g class="person">
      <path d="M-3 41q-6 42 7 79m-7-56-29 24m29-23 28 21m-22 34-19 34m19-34 21 33"/>
      <path class="head" d="M-31-13q3-30 33-30 29 2 34 28 3 29-13 49-18 19-39 5-18-13-15-52Z"/>
      <path class="cameo-hair" d="M-31-9q-4-27 13-35 19-10 37-4l18 12-7 5 6 13Q18-15 4-32q-12 19-35 23Z"/>
      <path d="m-17 4 7-2m20 0 9 1m-6 15q-10 9-18 5"/>
      <circle class="pupil" cx="-12" cy="12" r="1.6"/><circle class="pupil" cx="15" cy="10" r="1.6"/>
    </g>
    ${speech(-42, -97, 205, 'More RAM?')}
    ${label(0, 184, 'Sam Altman', 'cameo-caption')}
    ${label(0, 214, 'Fictional cameo', 'cameo-caption')}
  </g>`;
}

export function electricity(): string {
  return `<g opacity=".50" transform="translate(30 43) scale(.93)">${cafeRoom}</g>
    ${cameo()}
    ${character('alice', { x: 304, y: 482, pose: 'hold', expression: 'frustrated', scale: 1.54 })}
    ${character('bob', { x: 780, y: 468, pose: 'hold', expression: 'confused', scale: 1.38 })}
    ${character('charlie', { x: 1127, y: 478, pose: 'point', expression: 'excited', scale: 1.45 })}
    <g transform="translate(30 73) scale(.96 1)">${cafeTable}</g>
    <g data-electricity-bill transform="translate(487 516) rotate(-8)">
      <path class="bill" d="M-114-137H115V132l-16-8-14 8-16-8-14 8-17-8-14 8-17-8-16 8-13-8-15 8-16-8-15 8-16-8-15 8-15-8-15 8Z"/>
      ${label(0, -87, 'Electricity bill', 'bill-title')}
      <path class="bill-rule" d="M-87-62H87M-64 61H64M-64 78H41"/>
      ${label(0, 12, '99,999', 'bill-total')}
      ${label(0, 43, 'units due', 'bill-units')}
    </g>
    <path class="actor-line" d="M318 557q30 13 63-31m-70 27q10 35 67 22"/>
    <path data-prop="calculator" class="calculator" d="m713 600 106-6 21 38-111 8Zm21 5 69-4 6 8-72 5Zm6 16 12-1m12-1 12-1m12-1 12-1"/>
    <path class="actor-line" d="M772 533q-32 27-24 60m42-57q32 13 45 57"/>
    <g data-mining-system>
      <path class="monitor" d="m1224 502 148-3-9 99h-151Z"/>
      <path class="screen" d="m1236 516 120-3-7 68h-121Z"/>
      <path class="screen-line" d="m1253 551 13 12 24-25m11 15h24"/>
      <path class="monitor" d="m1279 599 16-1 1 16 31 3v8h-83v-8l31-3Z"/>
      <path class="heat" d="M1244 477q-13-12 1-24t-1-22m41 46q-13-13 1-25t-1-23m40 45q-13-13 1-25t-1-21"/>
    </g>
    <g data-discarded-flag transform="translate(1224 742) rotate(-67) scale(1.09)">
      <path class="actor-line" d="M0 0v-100"/><path class="flag-cloth" d="M0-95q31-9 66 7-29 14-66 21Z"/>
    </g>
    ${speech(290, 338, 238, 'HOW MUCH?!')}
    ${speech(770, 333, 204, 'Oh. Oh no.')}
    ${speech(1108, 335, 278, 'I mined another one!')}`;
}

const stakeXs = [346, 800, 1254] as const;

function lock(x: number, y: number): string {
  return `<g class="lock" transform="translate(${x} ${y})">
    <path d="M-11-3v-9a11 11 0 0 1 22 0v9"/>
    <rect x="-18" y="-3" width="36" height="25" rx="5"/>
    <path d="M0 6v6"/>
  </g>`;
}

export function stake(beat: number): string {
  const bonded = beat >= 1;
  return validators.map(({ id, name, power }, index) => {
    const x = stakeXs[index];
    const uneasy = bonded && id === 'charlie';
    return `<g data-stake="${id}" data-amount="${power}">
      ${character(id, { x, y: 254, scale: 1.42, pose: uneasy ? 'stand' : 'hold',
        expression: uneasy ? 'confused' : 'stand', facing: id === 'charlie' ? 'left' : 'right' })}
      ${label(x, 170, name, 'owner')}
      ${bonded ? `<path data-lockbox class="lockbox-back" d="M${x - 147} 534l26-24h268l-26 24Z
        M${x + 121} 534l26-24v149l-26 24Z"/>` : ''}
      <g transform="translate(${x - 112} 638) scale(.72)">${goldUnits(0, 0, power)}</g>
      ${bonded ? `<rect class="lockbox-face" x="${x - 147}" y="534" width="268" height="149" rx="9"/>
        <path class="glass-line" d="M${x - 130} 554l43-13m-40 31 66-21"/>
        ${lock(x + 107, 652)}` : ''}
      ${label(x, 727, `${power} coins`, 'amount')}
      ${beat >= 2 ? label(x, 774, `${power}% voting power`, 'weight') : ''}
    </g>`;
  }).join('') + (beat === 3 ? label(800, 842, 'Proof of Stake', 'stake-reveal') : '');
}

const nodePositions = {
  alice: [602, 190],
  bob: [92, 568],
  charlie: [1108, 568],
} as const;
const blockLabel = `Block ${candidate.block}`;

function miniLedger(x: number, y: number, committed: boolean): string {
  return `<g class="mini-ledger" transform="translate(${x} ${y}) scale(.79)">
    <path class="ledger-cover" d="M0 7h106v69H0Z"/>
    <path class="ledger-paper" d="M6 0h95v69H6Z"/>
    <path class="ledger-lines" d="M18 17h70m-70 13h70m-70 13h70m-70 13h70"/>
    ${committed ? `<g data-committed-block="${candidate.block}"><rect class="ledger-entry" x="8" y="37" width="91" height="30" rx="4"/>${label(53, 60, blockLabel, 'ledger-label')}</g>` : ''}
  </g>`;
}

function node(validator: Validator, phase: Phase): string {
  const { id, name, power } = validator;
  const honest = id !== 'charlie';
  const [x, y] = nodePositions[id];
  const voteSeen = phase === 'precommit' || phase === 'commit';
  const committed = honest && phase === 'commit';
  const states = phase === 'propose' ? id === 'alice' ? 'Selected proposer' : 'Proposal received'
    : !honest ? 'Withholds votes' : phase === 'prevote' ? 'Validates independently'
      : committed ? `Commits ${blockLabel}` : `Locks on ${blockLabel}`;
  const localSources = honest ? observations[id].map((voter) => {
    const signer = validators.find(({ id }) => id === voter)!;
    return `${voter === id ? 'Own' : signer.name} ${signer.power}`;
  }).join(' + ') : '';
  return `<g data-validator="${id}" transform="translate(${x} ${y})">
    <rect class="node-card ${honest ? id : 'charlie'}" width="396" height="214" rx="20"/>
    <g class="${!honest && phase !== 'propose' ? 'custom-arms' : ''}">
      ${character(id, { x: 50, y: 103, scale: .56, pose: 'stand',
        expression: !honest && phase === 'commit' ? 'frustrated' : committed ? 'excited' : 'stand' })}
      ${!honest && phase !== 'propose' ? '<path class="folded-arms" d="M42 141l-8 13 30-7m-6-6 9 13-31-6"/>' : ''}
    </g>
    ${label(197, 46, `${name} · ${power}%`, 'node-name')}
    ${label(106, 83, states, 'node-state local-label')}
    ${miniLedger(303, 114, committed)}
    ${honest && voteSeen ? `<g data-local-count="${id}" data-count-type="${committed ? 'precommit' : 'prevote'}">
        ${label(106, 125, localSources, 'count-sources local-label')}
        ${label(106, 154, `${matchingPower}% of ${totalPower}%`, 'count-total local-label')}
        ${label(106, 181, committed ? 'matching precommits' : 'matching prevotes', 'count-kind local-label')}
      </g>` : label(106, 146, 'Own ledger', 'node-state local-label')}
    ${honest && phase === 'precommit' ? `<g transform="translate(352 78) scale(.68)">${lock(0, 0)}</g>` : ''}
  </g>`;
}

function edge(from: ValidatorId, to: ValidatorId, d: string, tip: string): string {
  return `<g data-edge="${from}-${to}" class="edge ${from}">
    <path d="${d}"/><path class="edge-tip" d="${tip}"/>
  </g>`;
}

function message(x: number, y: number, from: ValidatorId, kind: string, to: string, vote?: Vote): string {
  const w = kind === 'Precommit' ? 322 : 298;
  return `<g data-message="${from}" transform="translate(${x} ${y})"${vote ? ` data-vote="${vote.kind.toLowerCase()}" data-signed="${vote.signed}"` : ''}>
    <rect class="message-card ${from} ${kind.toLowerCase()}" x="${-w / 2}" y="-51" width="${w}" height="103" rx="${kind === 'Precommit' ? 24 : 8}"/>
    ${kind === 'Proposal' ? `<g transform="translate(-137 -39) scale(.46)">${box(56, 38, 9)}</g>` : ''}
    ${label(0, -17, `${kind} · Block ${candidate.block}`, 'message-title')}
    ${label(0, 17, to, 'message-route')}
    ${vote ? `<g transform="translate(0 32) scale(.4)">${signature(0, 0)}</g>
      ${label(-60, 41, 'Signed', 'signed-label')}` : ''}
  </g>`;
}

export function round(phase: Phase, votes: readonly Vote[]): string {
  const proposing = phase === 'propose';
  const committing = phase === 'commit';
  const voteKind = votes[0]?.kind;
  const title = { propose: 'Propose', prevote: 'Prevote', precommit: 'Precommit', commit: 'Commit' }[phase];
  const edges = committing ? '' : [
    edge(proposal.from, proposal.recipients[0], 'M638 404 Q540 466 428 568', 'M428 568l7-23 15 17Z'),
    edge(proposal.from, proposal.recipients[1], 'M962 404 Q1064 466 1172 568', 'M1172 568l-22-6 15-17Z'),
    ...(voteKind ? [
      edge('bob', 'alice', 'M483 570 Q565 490 683 404', 'M683 404l-10 22-13-19Z'),
      edge('bob', 'charlie', 'M488 677H1108', 'M1108 677l-19 12v-24Z'),
    ] : []),
  ].join('');
  const messages = committing ? '' : message(800, 494, 'alice', voteKind ?? 'Proposal', 'Alice → Bob, Charlie', votes[0])
    + (voteKind ? message(800, 677, 'bob', voteKind, 'Bob → Alice, Charlie', votes[1]) : '');
  return `<g data-phase="${phase}" data-height="${candidate.height}" data-round="${candidate.round}">
    ${label(800, 157, `${title}  ·  Block ${candidate.block}  ·  Height ${candidate.height}  ·  Round ${candidate.round}`, 'phase')}
    ${edges}${messages}
    ${validators.map((entry) => node(entry, phase)).join('')}
    ${committing ? label(800, 537, 'Commit threshold: > 2/3', 'threshold') : ''}
    ${label(800, 830, committing || phase === 'precommit'
      ? 'Total power: 100%  ·  Own vote counted once  ·  Silence is no vote'
      : proposing ? 'Tendermint-style consensus · One round'
        : 'Total power: 100%  ·  Silence is no vote', 'round-note')}
  </g>`;
}
