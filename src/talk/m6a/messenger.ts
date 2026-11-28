import { character } from '../../illustration/character';
import { envelope } from '../../illustration/props';
import { speech } from '../m5c/art';
import { castle } from '../two-generals/art';
import { arrow, still, text } from './art';
import { eve } from './eve';

export const plaintext = 'MEET AT DAWN';
export const ciphertext = 'PHHW DW GDZQ';
export const historicalNote = 'Historical source: Suetonius, Life of Julius Caesar 56.6, reports the D-for-A substitution. https://penelope.uchicago.edu/thayer/e/roman/texts/suetonius/12caesars/julius%2A.html#56';
const notes = `Disclose aloud that this medieval messenger story and both messages are authored classroom examples. The setting is a callback to the earlier castle scenes, with no claim that it depicts Caesar’s time. Eve reads or copies the paper and returns the same original. Charlie and Bob remain unaware of the interception.\n\n${historicalNote}`;

function parchment(x: number, y: number, words: string, label = '', width = 334): string {
  const half = width / 2;
  return `<g data-letter transform="translate(${x} ${y})">
    <path class="parchment" d="M${-half} -50 Q0-60 ${half} -52 l-6 94 Q0 36 ${-half} 47 Q${-half + 8} 3 ${-half} -50Z"/>
    ${text(0, 10, words, 'lettering')}
    ${label ? text(0, 87, label, 'annotation') : ''}
  </g>`;
}

function towers(x: number, y: number, scale: number): string {
  return `<g class="medieval" transform="translate(${x} ${y}) scale(${scale}) translate(-800 -503)">${castle}</g>`;
}

function bush(x: number, y: number): string {
  return `<g data-prop="bush" transform="translate(${x} ${y})">
    <path class="hedge" d="M-121 34 Q-155 16-130-6 Q-134-39-95-35 Q-83-84-43-61
      Q-18-91 16-63 Q50-79 61-42 Q99-51 111-21 Q150-25 151 4 Q166 24 131 36 Q4 47-121 34Z"/>
    <path class="hedge-detail" d="M-80 13 q13-17 30-11 m54-27 q18-14 32 0 m38 32 q15-12 31-4
      M-37-32 q12 3 19 15"/>
  </g>`;
}

function courier(x: number, y: number, scale: number): string {
  return character('charlie', { x, y, scale, pose: 'run', expression: 'stand', headwear: 'courier', hands: { right: { kind: 'envelope' } } });
}

const title = 'A Long Time Ago...';

export const messengerStills = [
  still('35-first-message', title, 'Alice writes MEET AT DAWN. Charlie carries the sealed letter from Alice’s castle to Bob’s castle.',
    `${towers(244, 312, .76)}${towers(1356, 311, .76)}
      <path class="trail" d="M107 753 Q365 743 531 728 Q813 691 1061 720 Q1364 750 1494 718"/>
      ${character('alice', { x: 185, y: 515, scale: 1.16, headwear: 'plume', pose: 'hold' })}
      <path class="writing-desk" d="M143 628h340m-316 1-18 99m302-99 18 91"/>
      ${parchment(358, 572, plaintext, '', 326)}
      <path class="quill" d="M194 618 Q185 585 218 558 Q236 591 194 618Z M186 630l29-62"/>
      ${courier(787, 528, 1.26)}
      ${character('bob', { x: 1379, y: 510, scale: 1.16, headwear: 'kettle', facing: 'left' })}
      ${bush(1084, 681)}
      ${text(185, 798, 'Alice', 'name-tag')}${text(791, 787, 'Charlie', 'name-tag')}${text(1381, 793, 'Bob', 'name-tag')}`,
    notes),
  still('35-eve-reads', title, 'Eve slips out from the bushes and reads the letter while Charlie is distracted. She returns the same letter and Bob receives it without noticing.',
    `<path class="trail" d="M82 712 Q346 690 627 712 M1066 707 Q1298 729 1513 707"/>
      ${towers(1337, 340, .83)}
      ${bush(231, 642)}
      ${eve(398, 478, 1.31, 'suspicious')}
      ${parchment(428, 324, plaintext)}
      <path class="inference-line" d="M514 376 Q549 471 480 501"/>
      ${envelope(471, 521, .24, -14)}
      ${text(383, 778, 'Eve reads it…', 'annotation')}
      ${character('charlie', { x: 684, y: 487, scale: 1.16, headwear: 'courier', pose: 'point', angles: { head: -15 } })}
      ${speech(802, 371, 252, 'Look! A bird!')}
      <path class="bird" d="M878 253 q26-20 46 6 q21-20 45-4 m38 29 q14-15 27 2 q14-14 29-6"/>
      ${arrow(841, 630, 1042)}
      ${character('bob', { x: 1250, y: 477, scale: 1.24, headwear: 'kettle', pose: 'hold' })}
      ${parchment(1250, 580, plaintext)}
      ${text(1250, 778, '…and Bob gets the original.', 'annotation')}`,
    notes),
  still('35-second-message', title, 'Alice writes PHHW DW GDZQ for a second delivery, then Charlie sets out again.',
    `${towers(255, 338, .91)}
      <path class="trail" d="M110 752 Q559 764 913 710 Q1242 670 1500 705"/>
      ${character('alice', { x: 372, y: 487, scale: 1.3, headwear: 'plume', pose: 'hold' })}
      ${speech(411, 352, 398, 'Let’s try that again.')}
      <path class="writing-desk" d="M242 654h520m-483 0-13 89m456-89 11 91"/>
      ${parchment(530, 602, ciphertext, '', 400)}
      ${courier(1059, 502, 1.31)}${bush(1348, 657)}`,
    `${notes}\n\nLet the changed letter do the work. Save the alphabet mechanics for slide 36.`),
  still('35-caesar-reveal', 'The Caesar Cipher', 'On the second delivery Eve reads the transformed message and is baffled. Bob reads it and recovers MEET AT DAWN.',
    `${towers(1287, 329, .81)}
      <path class="trail" d="M105 751 Q346 721 673 739 M942 741 Q1241 717 1486 739"/>
      ${bush(230, 640)}
      ${eve(380, 473, 1.31, 'confused')}
      ${parchment(509, 602, ciphertext)}
      ${speech(369, 330, 222, 'Phhw… what?')}
      ${character('bob', { x: 1175, y: 486, scale: 1.31, headwear: 'kettle', pose: 'hold', expression: 'excited' })}
      ${parchment(1308, 619, plaintext)}
      ${speech(1129, 382, 264, 'See you at dawn!')}
      ${envelope(806, 627, .57, -11)}`,
    `${notes}\n\nAsk aloud: How did Bob recover the message? Explain the fixed transformation on the next slide.`),
];
