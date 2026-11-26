import type { TalkSlide } from '../slides';
import { goldUnits, sheet, text } from './art';
import { editFirst, finishRepair, focusRace, growRace, introduceNonce, solveEditedFirst,
  solveFirst, solveRest, startSecondRepair } from './history-motion';
import { acceptReward, fallingBoxes, growRewards, insertReward, mineReward, resumeMining,
  revealName, settleLogo, surrender, zoomCandidate } from './miner-motion';
import { scene, type Hold, type Motion } from './motion';
import { candidate, compareRewrite, race, raceTitle, rewardTitle, slide22, slide23,
  slide24, slide25, slide26, workTitle } from './stills';
import { rewardMined, rewrite } from './fixtures';

function hold(time: number, label: string, still: TalkSlide, motion?: Motion): Hold {
  return { time, label, still, motion };
}

const m5fCheckpoints = [
  [
    hold(0, 'Linked history', slide22[0]),
    hold(2.4, 'Nonce target', slide22[1], introduceNonce),
    hold(5, 'First block mined', slide22[2], solveFirst),
    hold(13.4, 'Mined chain', slide22[3], solveRest),
    hold(16, 'Tampered copy', slide22[4], editFirst),
    hold(20, 'First block re-mined', slide22[5], solveEditedFirst),
    hold(23.5, 'Next re-mine', slide22[6], startSecondRepair),
    hold(33.5, 'Exhausted', slide22[7], finishRepair),
  ],
  [
    hold(0, 'Race start', slide23[0]),
    hold(1.8, 'One confirmation', slide23[1], focusRace(1)),
    hold(3.8, 'Honest lead', slide23[2], growRace([1, 1], [[2, 1]], 1, 2)),
    hold(5.8, 'Charlie catches up', slide23[3], growRace([2, 1], [[2, 2]], 2, 3)),
    hold(8, 'Three confirmations', slide23[4], growRace([2, 2], [[3, 2]], 3, 4)),
    hold(9.8, 'Gap opens', slide23[5], growRace([3, 2], [[4, 2]], 3, 5)),
    hold(13, 'Gap widens', slide23[6], growRace([4, 2], [[5, 2], [5, 3], [6, 3]], 4, 6)),
    hold(14.8, 'Six confirmations', slide23[7], focusRace(7)),
    hold(19.4, 'Final honest lead', slide23[8], growRace([6, 3], [[7, 3], [8, 3], [8, 4], [9, 4]], 5, 8)),
  ],
  [
    hold(0, 'Neat stack', slide24[0]),
    hold(4.6, 'Messy stack', slide24[1], fallingBoxes(1)),
    hold(8.8, 'Overwhelmed', slide24[2], fallingBoxes(2)),
    hold(14.2, 'Buried', slide24[3], fallingBoxes(3)),
    hold(19, 'Surrender', slide24[4], surrender),
  ],
  [
    hold(0, 'Mountain', slide25[0]),
    hold(2.6, 'Candidate', slide25[1], zoomCandidate),
    hold(5, 'Reward row', slide25[2], insertReward),
    hold(9.6, 'Mined', slide25[3], mineReward),
    hold(13.4, 'Accepted', slide25[4], acceptReward),
    hold(17.2, 'Back to work', slide25[5], resumeMining),
    hold(23.2, 'Growing rewards', slide25[6], growRewards),
  ],
  [
    hold(0, 'Logo', slide26[0]),
    hold(2, 'Congratulations', slide26[1], settleLogo),
    hold(3.8, 'Bitcoin', slide26[2], revealName),
  ],
] as const;

const print22 = sheet(workTitle, 'The original and re-mined copy with a stale link and an unauthorized payment.',
  compareRewrite(0, true, rewrite[0]) + text(800, 876, '× Edited payment lacks authorization', 'warning-label'));
const print23 = sheet(raceTitle, 'The final branches and six-confirmation evidence on the honest payment.',
  race(5) + '<path class="confirmation-bracket" d="M425 388v14H1071v-14"/>'
  + text(450, 451, 'Six-confirmation point · count from the payment block', 'rule-label lane-label')
  + text(450, 488, 'Reversal risk falls with depth and remains possible', 'body lane-label'));
const print25 = sheet(rewardTitle, 'The gold first row is committed before mining and validated before it is earned.',
  candidate(rewardMined, true) + text(1080, 602, '✓ Independently validated and accepted', 'rule-label')
  + text(1080, 671, '10 units earned', 'body') + goldUnits(970, 750, 10));

function production(id: string, holds: readonly Hold[], print: string): TalkSlide {
  const notes = holds.map(({ label, still }) => `${label}. ${still.notes.split('\n\n')[0]}`);
  const teaching = holds[0].still.notes.split('\n\n').slice(1);
  return { id, composition: holds[0].still.composition, scene: scene(holds), print,
    notes: [...notes, ...teaching].join('\n\n') };
}

export const m5fSlides: readonly TalkSlide[] = [
  production('22-expensive-history', m5fCheckpoints[0], print22),
  production('23-which-history', m5fCheckpoints[1], print23),
  production('24-mining-work', m5fCheckpoints[2], slide24[4].composition),
  production('25-rewarding-miner', m5fCheckpoints[3], print25),
  production('26-bitcoin-reveal', m5fCheckpoints[4], slide26[2].composition),
];
