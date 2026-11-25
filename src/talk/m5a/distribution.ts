import { character } from '../../illustration/character';
import { client, outlet, plug, rack, stagingSheet } from './art';

const locations = [280, 801, 1316];

export const resilience = stagingSheet('Why distribute?',
  'Charlie trips over the left cluster’s cord and unplugs it. The other two clusters have independent power and maintain service. Alice’s request is rerouted and Bob continues working.', `
  <g class="fine">
    <path class="ground-line" d="M78 777 Q270 769 484 775 M591 777 Q801 766 1010 776 M1108 776 Q1320 767 1522 775"/>
  </g>
  <g class="service-path">
    <path class="failed-service" d="M413 214 Q327 257 300 333"/>
    <path class="alarm" d="m286 330 23 23 m-24 0 24-25"/>
    <path d="M431 214 C447 310 697 250 773 366 m-21-10 22 13 1-23"/>
    <path d="M1158 213 Q1265 254 1300 365 m-19-13 20 16 2-23"/>
    <path d="M889 405 Q1052 383 1228 409 m-18-16 18 16-22 10 m-298-27-19 13 23 11"/>
  </g>
  <text class="callout" x="610" y="247">Request rerouted</text>
  <text class="minor-label" x="1060" y="380">Replicated service</text>
  <g transform="translate(357 182) scale(1.02)">${client(51, 13)}</g>
  <g transform="translate(1204 181) scale(1.02)">${client(-46, 14)}</g>
  ${character('alice', { x: 295, y: 160, scale: .54, pose: 'point', angles: { rightArm: 12 } })}
  ${character('bob', { x: 1265, y: 159, scale: .54, pose: 'point', facing: 'left', angles: { rightArm: 12 } })}
  <path class="desk-edge" d="M233 233 Q330 230 469 233 M1091 232 Q1198 229 1327 232"/>
  ${locations.map((x, index) => `<g data-cluster="${index + 1}">
    <path class="cluster-shadow" d="M${x - 130} 619 q136-35 265 0 q-49 32-248 20Z"/>
    ${rack(x, 503, 1.18, index === 0 ? 'down' : 'up')}
    <text class="availability ${index ? 'positive-text' : 'negative-text'}" x="${index ? x : x + 52}" y="679">${index ? 'ONLINE' : 'OFFLINE'}</text>
    ${outlet(x + 160, 730)}
    ${index === 0
      ? `<path class="power-cord" d="M222 615 C141 647 159 700 117 726 C101 735 100 754 117 754 C133 755 132 741 119 741
          C164 737 199 758 249 735 C284 720 299 756 334 748"/>
        ${plug(334, 748, 71)}`
      : `<path class="power-cord" d="M${x + 56} 615 C${x + 127} 655 ${x + 93} 711 ${x + 160} 740"/>
        ${plug(x + 160, 740, 0)}`}
  </g>`).join('')}
  <g transform="translate(192 644) rotate(30)">
    ${character('charlie', { scale: .9, pose: 'run', expression: 'confused', facing: 'left' })}
    <path class="gesture alarm" d="m-45-56-16-17 m27 9-6-22 m69 40 18-13"/>
  </g>
  <path class="gesture alarm" d="m98 737-15 3 m20 10-12 9 m23-6-2 14"/>
  <path class="head fine" d="M73 537 Q128 526 177 536 L181 575 Q180 591 154 590 l6 23-30-20
    Q72 596 68 580Z"/>
  <text class="callout" x="125" y="572">Oops!</text>
  <text class="callout" x="800" y="845">Three independent power feeds</text>
`);

type Operator = 'alice' | 'bob' | 'charlie';

function operator(person: Operator, x: number, crowned: boolean): string {
  return `<g data-operator="${person}">
    ${character(person, { x, y: crowned ? 328 : 293, scale: crowned ? .66 : .57,
      pose: person === 'charlie' ? 'hold' : 'point', expression: 'stand' })}
    ${crowned ? `<path class="prop yellow" d="M${x - 25} 301 l-9-34 20 11 13-22 17 20 17-12-5 35Z"/>
      <path class="fine" d="M${x - 21} 291 q23-6 45-2"/>` : ''}
  </g>`;
}

const infrastructure = `
  <g data-infrastructure="distributed">
    <path class="network-line" d="M96 576 Q169 567 241 576 Q317 567 389 576
      M96 576 Q69 653 97 723 M241 576 V723 M389 576 Q415 656 389 723"/>
    ${rack(96, 544, .51, 'plain')}${rack(241, 544, .51, 'plain')}${rack(389, 544, .51, 'plain')}
    ${client(97, 737)}${client(241, 737)}${client(389, 737)}
  </g>`;

function panel(x: number, title: string, subtitle: string, content: string): string {
  return `<g transform="translate(${x} 0)">
    <path class="panel-paper" d="M15 175 Q220 161 462 172 Q482 174 480 199 L479 805
      Q479 825 456 827 Q223 834 19 824 Q0 824 1 802 L3 196 Q3 179 15 175Z"/>
    <text class="panel-title" x="241" y="226">${title}</text>
    ${content}
    <text class="minor-label" x="241" y="803">${subtitle}</text>
  </g>`;
}

export const governance = stagingSheet('Centralized, Distributed, Decentralized',
  'Centralized: Charlie controls one server. Distributed and centrally controlled: Charlie controls all three servers. Decentralized: Alice, Bob and Charlie operate one server each. The last two panels have identical infrastructure.', `
  ${panel(56, 'Centralized', 'One operator, one server', `
    <path class="manage purple-line" d="M241 443 V498"/>
    <path class="network-line" d="M241 578 Q194 637 97 722 M241 578 V722 M241 578 Q298 638 389 722"/>
    ${operator('charlie', 241, true)}
    ${rack(241, 544, .62, 'plain')}
    ${client(97, 737)}${client(241, 737)}${client(389, 737)}
  `)}
  ${panel(559, 'Distributed', 'Centrally controlled', `
    <path class="manage purple-line" d="M241 443 Q166 454 96 492 M241 443 V492 M241 443 Q318 454 389 492"/>
    ${operator('charlie', 241, true)}
    ${infrastructure}
  `)}
  ${panel(1062, 'Decentralized', 'Independent operators', `
    <path class="manage blue-line" d="M96 396 V492"/>
    <path class="manage green-line" d="M241 396 V492"/>
    <path class="manage purple-line" d="M389 396 V492"/>
    ${operator('alice', 96, false)}${operator('bob', 241, false)}${operator('charlie', 389, false)}
    ${infrastructure}
  `)}
`);
