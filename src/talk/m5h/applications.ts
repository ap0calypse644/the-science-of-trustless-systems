import { character } from '../../illustration/character';
import { signature, speech } from '../m5c/art';
import { arrow, card, still, text } from './art';

const title = 'What Else Could We Agree On?';
const question = 'Should This Even Be a Blockchain?';
const notes = 'Disclose that these are authored examples, not named deployments. An issuer is trusted for credential accuracy. A verifier checks the credential signature, recognition of the issuer and credential status. The employer gets the credential from Alice; the example registry has issuer and status information, not Alice’s degree or personal record. Signatures and conventional PKI may suffice, depending on the trust model. A record of a handoff cannot prove the physical event by itself. A trusted timestamp can support evidence of existence by a time, not authorship. Ask whether independent operators need to agree on shared state and lack a mutually trusted administrator. That can make a shared ledger worth considering. A conventional database often fits better. Sources: W3C Verifiable Credentials Data Model 2.0 https://www.w3.org/TR/vc-data-model-2.0/ and RFC 3161 https://www.rfc-editor.org/rfc/rfc3161.html.';

function icon(kind: string): string {
  switch (kind) {
    case 'credential':
      return '<path class="icon-fill" d="M-77-66H70V47H-77Z"/><path d="M-53-35H47m-100 22h100m-100 22h55"/><circle class="gold-fill" cx="37" cy="36" r="20"/><path class="gold-fill" d="m23 53-6 26 20-10 19 10-7-27"/>';
    case 'handoff':
      return '<path class="icon-fill" d="M-90-24h60v58h-60Zm119 0h60v58H29Z"/><path d="M-89-24l10-11h60l-11 11m0 0 11-11v56l-11 13m59-58 10-11h60L89-24m0 0 10-11v56L89 34M-16 3h35m-10-8 10 8-10 8"/>';
    case 'timestamp':
      return '<path class="icon-fill" d="M-69-67H12l31 30V59H-69Z"/><path d="M12-67v30h31m-91 1h35m-35 22h48m-48 22h40"/><circle class="gold-fill" cx="43" cy="35" r="37"/><path d="M43 13v23l15 9"/>';
    case 'network':
      return '<path d="M0-52-72 45H75Z"/><rect class="icon-fill" x="-26" y="-70" width="52" height="37" rx="5"/><rect class="icon-fill" x="-98" y="26" width="52" height="37" rx="5"/><rect class="icon-fill" x="49" y="26" width="52" height="37" rx="5"/>';
    case 'shopping':
      return '<path class="icon-fill" d="M-61-74H61V73H-61Z"/><path d="m-40-37 7 7 11-15m-18 42 7 7 11-15m-18 42 7 7 11-15m16-16h41m-41-34h41m-41 68h41"/>';
    default:
      return '<path class="icon-fill" d="M-73 63V-66H65V63ZM-18 63V33h30v30"/><path d="M-48-40h18m15 0H3m16 0h20m-87 26h18m15 0H3m16 0h20m-87 26h18m15 0H3m16 0h20"/>';
  }
}

const topics = [
  { id: 'credential', title: 'Academic credentials', subtitle: 'Recognized issuers and status' },
  { id: 'handoff', title: 'Supply chain provenance', subtitle: 'Recorded handoffs' },
  { id: 'timestamp', title: 'Document timestamping', subtitle: 'Evidence of existence by a time' },
  { id: 'network', title: 'Shared infrastructure', subtitle: 'Independent groups maintain common state' },
] as const;

function panels(count: number): string {
  return topics.slice(0, count).map((topic, index) => {
    const x = 95 + index % 2 * 731;
    const y = 191 + Math.floor(index / 2) * 309;
    return `<g data-application-panel="${topic.id}">
      ${card(x, y, 680, 257, index % 2 ? 'paper' : 'blue')}
      <g class="app-icon" transform="translate(${x + 119} ${y + 123}) scale(.87)">${icon(topic.id)}</g>
      ${text(x + 231, y + 113, topic.title, 'application panel-label')}
      ${text(x + 231, y + 166, topic.subtitle, 'label panel-label')}
    </g>`;
  }).join('');
}

function credential(x: number, y: number, scale = 1): string {
  return `<g data-credential transform="translate(${x} ${y}) scale(${scale})">
    ${card(-187, -128, 374, 256, 'cream')}
    ${text(0, -69, 'Degree credential', 'diagram-heading')}
    ${text(0, -12, 'Alice · B.Tech', 'application')}
    ${text(0, 37, 'Signed by the college', 'label')}
    ${signature(81, 82)}
  </g>`;
}

function graduation(): string {
  return `<g data-graduation>
    <path class="ground-line" d="M233 695q540 12 1110 0"/>
    ${character('alice', { x: 386, y: 384, scale: 1.54, pose: 'excited', expression: 'excited' })}
    <path class="cap" d="M317 301l68-30 74 30-73 24Zm23 13v22q47 17 93-2v-20m19-11v42l-4 10h9l-5-10"/>
    ${credential(797, 464, 1.1)}
    <path class="flow-arrow" d="M1112 455h-79m13-10-13 10 13 10"/>
    ${character('generic', { x: 1216, y: 390, scale: 1.38, pose: 'point', expression: 'stand', facing: 'left' })}
    ${text(383, 754, 'Alice graduates', 'diagram-heading')}
    ${text(1216, 754, 'College issuer', 'diagram-heading')}
  </g>`;
}

function verification(): string {
  return `<g data-verification>
    ${text(800, 208, 'Job application abroad', 'diagram-heading')}
    ${character('alice', { x: 224, y: 407, scale: 1.40, pose: 'point', expression: 'stand' })}
    ${credential(496, 503, .92)}
    ${arrow(690, 501, 796)}
    ${character('bob', { x: 877, y: 422, scale: 1.17, pose: 'hold', expression: 'stand', facing: 'left' })}
    ${text(874, 694, 'Employer', 'diagram-heading')}
    ${text(492, 703, 'Credential shared by Alice', 'label')}
    ${card(1043, 370, 450, 271, 'blue')}
    ${text(1268, 432, 'Shared registry', 'diagram-heading')}
    ${text(1268, 509, '✓ Recognized issuer', 'application')}
    ${text(1268, 568, '✓ Credential status', 'application')}
    <path class="query-line" d="M965 516h59m-13-9 13 9-13 9"/>
    ${speech(846, 317, 260, 'Signature valid')}
  </g>`;
}

const choices = [
  { title: 'Shopping list', detail: 'One person', icon: 'shopping' },
  { title: 'Payroll', detail: 'One company', icon: 'building' },
  { title: 'Shared registry', detail: 'Independent organizations', icon: 'network' },
] as const;

function decision(answer: boolean): string {
  return choices.map((choice, index) => {
    const x = 91 + index * 483;
    const center = x + 220;
    return `<g data-choice="${index}">
      ${card(x, 214, 440, 502, 'paper')}
      <g class="app-icon" transform="translate(${center} 373) scale(1.13)">${icon(choice.icon)}</g>
      ${text(center, 539, choice.title, 'diagram-heading')}
      ${text(center, 594, choice.detail, 'label')}
      ${answer ? text(center, 687, index === 2 ? '✓' : '✕', index === 2 ? 'yes mark' : 'no mark') : ''}
    </g>`;
  }).join('') + (answer ? text(800, 793, '✓ If shared state is needed and there is no mutually trusted administrator', 'label') : '');
}

export const applicationStills = [
  still('31-credentials', title, 'Start with recognized issuers and credential status.', panels(1), notes),
  still('31-provenance', title, 'Add recorded supply chain handoffs.', panels(2), notes),
  still('31-timestamping', title, 'Add evidence that a document existed by a particular time.', panels(3), notes),
  still('31-infrastructure', title, 'Add common state maintained by independent organizations.', panels(4), notes),
  still('31-graduation', title, 'Alice graduates and receives a signed credential from her college.', graduation(), notes),
  still('31-verification', title, 'Alice applies for a job abroad. The employer checks the signature and consults a shared issuer and status registry.', verification(), notes),
  still('31-question', question, 'Compare three scenarios and invite a verbal prediction.', decision(false), notes),
  still('31-answer', question, 'Reveal the two crosses and the conditional check for the shared registry.', decision(true), notes),
];
