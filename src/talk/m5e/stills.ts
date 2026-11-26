import { bubble } from '../../illustration/props';
import { blockArt, connection, pageArt, panel, person, sheet, text } from './art';
import {
  common, commonState, edited, fork, forkViews, linked, linkMatches, pages, repaired, transaction, unlinkedEdit,
  type Block,
} from './fixtures';

const growing = 'The Growing Ledger';
const notebookTitle = 'From Pages to Blocks';
const historyTitle = 'What If Charlie Changes History?';
const histories = 'Conflicting Histories';
const source = 'Source: Bitcoin whitepaper, §§2–5. https://bitcoin.org/bitcoin.pdf';
const hashSource = 'Source: NIST FIPS 180-4, Secure Hash Standard. https://csrc.nist.gov/pubs/fips/180-4/upd1/final';

export const disclosure = 'Tell the audience that the data and any digest prefixes shown are authored teaching examples.';

function still(id: string, heading: string, description: string, art: string, notes: string) {
  return { id, heading, art, composition: sheet(heading, description, art), teachingNotes: notes, notes: `${notes}\n\n${disclosure}` };
}

const entries = pages.flatMap(({ rows }) => rows);

function ledgerList(count: number, expression: 'excited' | 'stand' | 'confused' | 'frustrated', long = false): string {
  const bottom = 425 + count * 45;
  const face = long
    ? 'M718 317Q855 307 986 320V693Q986 725 1046 738L1507 802Q1531 805 1534 830L1266 851L846 793Q719 774 719 725Z'
    : `M718 317Q855 307 986 320V${bottom}Q846 ${bottom - 11} 719 ${bottom + 4}Z`;
  return person('alice', 594, 365, 'point', expression, 'right', 1.67)
    + `<g data-ledger-list>
      <path class="paper" d="${face}"/>
      ${text(855, 368, 'Ledger', 'strong')}
      ${entries.slice(0, count).map((tx, i) => text(855, 416 + i * 45, transaction(tx), 'tx')).join('')}
      ${long ? `<g data-ledger-overflow>
        <path class="paper-rule" d="M946 755l-118 29m221-15-115 32m222-17-108 32m222-16-107 32m223-18-106 27"/>
        <path class="paper-back" d="M1266 851Q1254 829 1272 815L1507 802Q1531 805 1534 830Z"/>
        <path class="paper-rule" d="M1279 826l226-14m-218 24 222-14"/>
      </g>` : ''}
    </g>
    <path class="paper-grip" d="M716 415q10-11 16-7q3 4-3 8l-10 6Z"/>`;
}

export const slide18 = [
  still('18-short-list', growing, 'Alice happily holds a short list of transactions.', ledgerList(2, 'excited'),
    'Start with two appended transactions. Alice can comfortably hold and inspect the paper. This running list records payments in neutral units.'),
  still('18-growing-list', growing, 'The same paper grows as new transactions are appended.', ledgerList(4, 'stand'),
    'Append transactions individually. Keep the first entries in the same order and keep Alice holding the top of the same list.'),
  still('18-concern', growing, 'The longer list makes Alice concerned.', ledgerList(6, 'confused'),
    'Let the length and Alice’s expression carry the joke. Ask how Alice would recover a balance from a record that stores history alone.'),
  still('18-overwhelmed', growing, 'Alice is overwhelmed as the paper reaches the floor and rolls outward.', ledgerList(8, 'frustrated', true),
    'The visible entries are representative of the continuing roll. A history-only ledger must replay relevant transactions to reconstruct balances from its opening state. Implementations may maintain current state or use authenticated snapshots. Nothing on this slide carries a balance forward.'),
];

export const xs = [83, 452, 821, 1190] as const;
export const pageTilts = [-7, -3, 4, 6] as const;

function blockRow(blocks: readonly Block[], y: number, mode: 'plain' | 'link' = 'plain'): string {
  return blocks.map((block, i) => blockArt(xs[i], y, block, 1, mode)).join('');
}

const independentBlocks = `<g data-independent-composition>${blockRow(pages, 362)}</g>`;

export function notebook(left: Block, right?: Block): string {
  return `<path class="notebook-cover" d="M436 267Q612 225 800 267Q963 229 1165 269L1161 690
    Q977 660 800 695Q618 664 431 689Z"/>
    <path class="paper" d="M802 274Q960 241 1148 278V674Q975 641 802 682Z"/>
    ${pageArt(458, 281, left, 1.2)}
    ${right ? pageArt(818, 281, right, 1.2) : ''}
    <path class="paper-rule" d="M800 273V684"/>`;
}

export const slide19 = [
  still('19-first-page', growing, 'The ledger fills its first notebook page.', notebook(pages[0]),
    'Introduce a page as a group of ordered transactions. When staging this motion in production, write each line before turning the page.'),
  still('19-next-page', growing, 'The notebook turns to a second page, where a new transaction appears.',
    notebook(pages[0], { ...pages[1], rows: pages[1].rows.slice(0, 1) }),
    'The first page stays available. Begin the second page and fill it in the same order as the running list.'),
  still('19-four-pages', growing, 'Four numbered notebook pages contain the ordered payment record.',
    pages.map((page, i) => pageArt(xs[i] + 8, 297, page)).join('')
    + text(800, 711, 'Four completed pages', 'body'),
    'The spread makes four completed pages visible at once. Page numbers preserve order. Grouping makes the record easier to discuss and does not itself remove the cost of replaying history.'),
  still('19-detach-pages', growing, 'Four numbered pages are torn from the notebook and lift into separate positions.',
    pages.map((page, i) => `<g transform="rotate(${pageTilts[i]} ${xs[i] + 145} 474)">${pageArt(xs[i] + 8, 303 - (i % 2) * 33, page, 1, true)}</g>`).join('')
    + '<path class="motion-mark" d="M139 720v-28m-13 14 13-14 13 14 M668 696v-28m-13 14 13-14 13 14 M1118 716v-28m-13 14 13-14 13 14"/>',
    'Detach pages in order. The planning gesture marks lift rather than a link between the pages.'),
  still('19-independent-blocks', notebookTitle, 'Four independent blue blocks preserve the four pages and their transactions.',
    independentBlocks,
    'Fold each page into its matching block face, preserving the number and row identities. Each block is a separate container here. There are no hash references yet. Hold for the next slide, which opens on this exact arrangement. ' + source),
];

export function chain(blocks: readonly Block[], options: { y: number; links?: number; unchecked?: number; marked?: readonly number[] }): string {
  const { y, links = 3, unchecked, marked = [] } = options;
  return blockRow(blocks, y, 'link')
    + blocks.slice(1, links + 1).map((child, i) => {
      const x = xs[i] + 278;
      const end = xs[i + 1] - 8;
      const state = unchecked === i ? 'unchecked' : linkMatches(blocks[i], child) ? 'match' : 'mismatch';
      return connection(`M${x} ${y + 223}Q${end - 11} ${y + 216} ${end - 15} ${y + 32}H${end}`,
        end, y + 32, state, marked.includes(i) ? { x: x + 43, y: y + 127 } : undefined);
    }).join('');
}

function editCaption(words: string): string {
  return panel(374, 718, 852, 63, 'warning') + text(800, 759, words, 'body correction');
}

const firstLink = [linked[0], { ...linked[1], digest: undefined }, ...pages.slice(2)];

export const slide20 = [
  still('20-independent-blocks', historyTitle, 'The four independent blocks from the previous slide are unchanged.',
    independentBlocks, 'Start with exactly the previous arrangement. Ask what Alice can compare if someone changes an old record.'),
  still('20-unlinked-edit', historyTitle, 'Charlie changes, adds and removes entries in block 1 while the blocks are still unlinked.',
    blockRow(unlinkedEdit, 353) + person('charlie', 264, 665, 'point', 'suspicious', 'left', 1.05)
    + text(781, 774, 'Changed one amount · added one entry · removed one entry', 'body'),
    'Charlie changes 4 to 9, removes Alice → Bob 4, and adds Charlie → Bob 2. The underlined rows are edited or added. These records have no valid signatures for the changed data. Without links, there is no predecessor check to object here. Restore all original rows next. ' + source),
  still('20-restore', historyTitle, 'The original unlinked history is restored before Alice links it.',
    independentBlocks + text(800, 710, 'Original rows restored', 'body'),
    'Restore each original signed row before Alice begins. Use the same block geometry across all following frames.'),
  still('20-first-link', historyTitle, 'Alice copies the first block’s hash into the second block’s previous-hash field.',
    chain(firstLink, { y: 350, links: 1 }) + person('alice', 324, 652, 'point', 'stand', 'right', 1.07)
    + text(850, 759, 'Block 2 stores the hash of block 1', 'strong'),
    'The arrow traces block 1’s digest to block 2’s stored reference. Hash block 2 with its previous-hash field included, and store the result in block 3. Repeat for block 4. Blocks 3 and 4 are still awaiting links in this keyframe. ' + hashSource + ' ' + source),
  still('20-blockchain', historyTitle, 'The four blocks are connected by matching predecessor references.',
    chain(linked, { y: 351, marked: [0, 1, 2] }) + text(800, 743, 'Blockchain', 'question'),
    'Reveal the name only once all links are established. Each prefix stands for a full digest. A reference is part of the bytes of its block. The arrows trace the digest into the next block’s reference slot. ' + source),
  still('20-link-mismatch', historyTitle, 'The changed digest of block 1 disagrees with block 2’s stored reference.',
    chain(edited, { y: 335, marked: [0, 1, 2] }) + person('charlie', 303, 658, 'confused', 'confused', 'right', 1.04)
    + editCaption('Block 1 changed · Block 2 still points to the old hash'),
    'Charlie changes the amount again. Block 1’s apparent hash changes from 81cf2a to 9bf205. Block 2 still names 81cf2a. Its own contents remain unchanged, so the next two references still match their immediate predecessors. A matching structural link does not authorize a transaction. ' + hashSource),
  still('20-repaired-link', historyTitle, 'Charlie updates block 2’s reference and smiles before checking the next link.',
    chain(repaired, { y: 335, unchecked: 1, marked: [0, 2] })
    + person('charlie', 303, 658, 'excited', 'excited', 'right', 1.04)
    + editCaption('Block 2 now points to the new hash of block 1'),
    'Charlie repairs only the reference in block 2. Its own digest changes too. The dotted next link has yet to be checked on screen. Hold on the fleeting smile before checking it.'),
  still('20-next-mismatch', historyTitle, 'Block 3 now disagrees with the changed digest of block 2 while the last link still matches.',
    chain(repaired, { y: 335, marked: [0, 1, 2] })
    + person('charlie', 303, 658, 'frustrated', 'frustrated', 'right', 1.04)
    + editCaption('Block 2 changed · Block 3 still points to its old hash'),
    'Block 3 stores 5e0ab3 while block 2 now has 4dd807. Block 3 has not been changed, so block 4’s reference to b3427d still matches. Hash links expose a mismatch against a trusted reference. A person who can alter the data and associated references can recompute them. Signature and transaction validity requirements still apply. ' + source),
];

function historyLane(y: number, candidate?: Block): string {
  const blocks = candidate ? [...common, candidate] : common;
  const laneXs = [183, 495, 807, 1119];
  return blocks.map((block, i) => blockArt(laneXs[i], y, block, .91, 'link')).join('')
    + blocks.slice(1).map((_, i) => {
      const x = laneXs[i] + 254;
      const end = laneXs[i + 1] - 7;
      return connection(`M${x} ${y + 195}Q${end - 9} ${y + 190} ${end - 14} ${y + 28}H${end}`, end, y + 28);
    }).join('');
}

function paymentCard(x: number, y: number, candidate: Block): string {
  return `<g data-payment-card>${panel(x, y, 358, 112)}
    ${text(x + 179, y + 45, transaction(candidate.rows[0]), 'strong')}
    ${text(x + 179, y + 87, 'Signed by Charlie', 'small')}</g>`;
}

const laneLabel = (index: number, y: number) => {
  const name = index === 0 ? 'Alice' : 'Bob';
  return text(1260, y, `${name} ${forkViews[index].balances[name]} · Charlie 0`, 'small');
};

function forkDiagram(): string {
  const y = 385;
  const positions = [91, 425, 759];
  return '<path class="link" d="M1005 582H1065"/><circle class="fork-junction" cx="1065" cy="582" r="5"/>'
    + common.map((block, i) => blockArt(positions[i], y, block, .88, 'link')).join('')
    + positions.slice(1).map((x, i) =>
      connection(`M${positions[i] + 244} ${y + 200}Q${x - 25} ${y + 196} ${x - 20} ${y + 30}H${x - 7}`, x - 7, y + 30)).join('')
    + fork.map((candidate, i) => {
      const branchY = i === 0 ? 230 : 536;
      return blockArt(1224, branchY, candidate, .88, 'link')
        + connection(i === 0 ? 'M1065 582Q1090 582 1090 553V290Q1090 258 1125 258H1216'
          : 'M1065 582Q1090 582 1103 569Q1111 564 1130 564H1216', 1216, branchY + 28);
    }).join('')
    + text(488, 689, 'Common history', 'strong')
    + text(1339, 183, 'Alice’s candidate', 'body') + text(1339, 510, 'Bob’s candidate', 'body');
}

export const slide21 = [
  still('21-common-history', histories, 'A common three-block history ends with Alice and Bob at zero and Charlie at twenty.',
    historyLane(338) + panel(376, 654, 848, 92)
    + text(800, 713, `Alice ${commonState.Alice} · Bob ${commonState.Bob} · Charlie ${commonState.Charlie} units`, 'strong'),
    'Return to the slide 13 starting balances. The three earlier groups each cycle a payment from Charlie through Alice and Bob back to Charlie, so the common tip has the same 20 units for Charlie and 0 for Alice and Bob. The fourth block is still open. ' + source),
  still('21-conflicting-payments', histories, 'Charlie signs two distinct transfers of twenty units, one to Alice and one to Bob.',
    person('charlie', 800, 368, 'hold', 'suspicious', 'right', 1.36)
    + person('alice', 210, 462, 'hold', 'stand', 'right', 1.16)
    + person('bob', 1390, 462, 'hold', 'stand', 'left', 1.16)
    + paymentCard(343, 448, fork[0]) + paymentCard(899, 448, fork[1])
    + text(800, 731, 'Charlie has 20 units', 'strong'),
    'Charlie signs distinct transfers and each recipient sees their own first. Each could spend the same 20 units on a separate branch. Both cannot be applied in either order under the no-overdraft rule. ' + source),
  still('21-competing-blocks', histories, 'Alice and Bob each extend the same three blocks with a different locally valid fourth block.',
    text(1280, 183, 'Alice’s history', 'strong') + historyLane(221, fork[0]) + laneLabel(0, 492)
    + text(1280, 547, 'Bob’s history', 'strong') + historyLane(585, fork[1]) + laneLabel(1, 857),
    'Compare the previous hash in both fourth blocks with the same block 3 digest. Both satisfy the link and spending rules against the common parent. Each recipient tentatively records a different result. Neither choice is settled. ' + source),
  still('21-disagreement', histories, 'Alice and Bob dispute which candidate follows the common tip while Charlie looks mischievous.',
    person('alice', 249, 358, 'point', 'frustrated', 'right', 1.31)
    + person('bob', 1351, 359, 'point', 'frustrated', 'left', 1.31)
    + person('charlie', 801, 284, 'hold', 'suspicious', 'right', .86)
    + blockArt(388, 478, fork[0], 1, 'link') + blockArt(924, 478, fork[1], 1, 'link')
    + `<g data-speech="alice">${bubble(314, 240, 325, 'I saw mine first.', -1)}</g>
      <g data-speech="bob">${bubble(1285, 240, 255, 'So did I.', 1)}</g>`,
    'Both observers truthfully report what they saw first. Charlie deliberately authorized two competing payments. Their local checks provide no shared ordering rule.'),
  still('21-fork', histories, 'The duplicate common prefix folds into one fork with two valid candidates and no winner.',
    forkDiagram(),
    'Merge the repeated common prefix into one three-block chain. Both candidate links point back to the same tip and each spends the same funds independently. Ask “Which history do we believe?” aloud and leave the choice unanswered. The example ends before a consensus rule or proof of work is used. ' + source),
];

export const stills = [...slide18, ...slide19, ...slide20, ...slide21];
