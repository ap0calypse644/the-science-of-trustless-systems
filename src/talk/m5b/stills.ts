import { arrival, lie, opening, orders } from './battlefield';
import './staging.css';

interface Still {
  id: string;
  subtitle: string;
  body: string;
  notes: string;
}

const threeReports = `
  <table class="byz-table three-reports">
    <caption>Bob’s reports</caption>
    <thead><tr><th scope="col">Source</th><th scope="col">Reported order</th></tr></thead>
    <tbody>
      <tr><th scope="row">Alice · direct</th><td class="attack">Attack</td></tr>
      <tr><th scope="row">Mallory · forwarded</th><td class="retreat">Retreat</td></tr>
    </tbody>
  </table>
  <p class="byz-majority">1 Attack, 1 Retreat → tie defaults to Retreat</p>
  <p class="byz-foot">Bob fails to follow the loyal commander in this run.</p>
`;

const fourReports = `
  <table class="byz-table four-reports">
    <caption>What each loyal general receives</caption>
    <thead><tr><th scope="col">Report source</th><th scope="col">Bob’s view</th><th scope="col">Charlie’s view</th></tr></thead>
    <tbody>
      <tr><th scope="row">Alice · direct</th><td class="attack">Attack</td><td class="attack">Attack</td></tr>
      <tr><th scope="row">Other loyal general · forwarded</th><td class="attack">Attack</td><td class="attack">Attack</td></tr>
      <tr><th scope="row">Mallory · forwarded</th><td class="retreat">Retreat</td><td class="attack">Attack</td></tr>
    </tbody>
    <tfoot><tr><th scope="row">Majority decision</th><td>Attack · 2 of 3</td><td>Attack · 3 of 3</td></tr></tfoot>
  </table>
  <p class="byz-foot">Both follow Alice’s order despite Mallory’s conflicting reports.</p>
`;

const frames: readonly Still[] = [
  {
    id: '08-byzantine-generals', subtitle: 'Sent messages arrive. Can you trust the report?', body: opening,
    notes: 'Direct sequel to slide 7. Alice is the loyal commander. Bob and Mallory are generals receiving her order. In this oral-message setting a sent message arrives; recipients know the immediate sender, and omissions are detectable. Mallory can lie in reports sent under Mallory’s own identity. No transferable signatures.',
  },
  {
    id: '08-orders-alice', subtitle: 'Alice sends the same order to everyone', body: orders,
    notes: 'Alice sends Attack to Bob and to Mallory. Bob’s thought bubble shows his private direct order. The route follows the foreground; dispatch and receipt are discrete steps in the eventual scripted animation.',
  },
  {
    id: '08-orders-bob', subtitle: 'Mallory forwards a different report', body: lie,
    notes: 'Mallory received Attack from Alice but tells Bob that the received order was Retreat. Bob knows Mallory sent the second report and Alice sent the first. Pause before showing what the two reports imply.',
  },
  {
    id: '08-forwarded-reports', subtitle: 'Three generals · one faulty report', body: threeReports,
    notes: 'After forwarding, Bob counts his direct order and Mallory’s forwarded report. In this scripted three-general example the tie defaults to Retreat, contrary to loyal Alice’s order. This illustrates a validity failure outside the guarantee. The general impossibility result follows from indistinguishability, not from a tie alone.',
  },
  {
    id: '08-charlie-joins', subtitle: 'Charlie joins the next run', body: arrival,
    notes: 'Restart the example with Charlie, another loyal general. Alice sends Attack to all three recipients. Bob and Charlie report faithfully to each other. Mallory tells Bob Retreat and Charlie Attack. These are different runs with fixed scripts.',
  },
  {
    id: '08-four-generals', subtitle: 'Four generals · one faulty general', body: fourReports,
    notes: 'This is the final report table after forwarding. In Bob’s view “other loyal general” is Charlie, and in Charlie’s view it is Bob. Both have a direct Attack from Alice and an honest forwarded Attack. Bob has a 2–1 majority; Charlie has a 3–0 majority. They agree and follow the loyal commander in this run. The guarantee needs the oral-message assumptions and n ≥ 3f + 1. Four participants with one fault meet the OM(1) bound. See Lamport, Shostak and Pease, The Byzantine Generals Problem, §§2–3, https://lamport.azurewebsites.net/pubs/byz.pdf.',
  },
];

export const stills = frames.map(({ id, subtitle, body, notes }) => ({
  id,
  notes,
  composition: `<div class="talk-sheet byz-sheet">
    <h1>There's a traitor among us</h1>
    <p class="byz-subtitle">${subtitle}</p>
    ${body}
  </div>`,
}));
