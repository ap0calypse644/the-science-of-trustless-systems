import type { TalkSlide } from '../slides';
import { baseline, byzantine, print } from './scene';

export const byzantineSlide: TalkSlide = {
  id: '08-byzantine-generals',
  composition: baseline,
  scene: byzantine,
  print,
  notes: `The Two Generals story allowed loss. Here the network is fully connected and synchronous: a message that is sent arrives, the immediate sender is identifiable, and omissions are detectable when a round ends. No transferable signatures. Mallory is a faulty general and can lie under Mallory’s own identity. Alice is the loyal commander in both fixed executions.

In OM(1), Alice sends an order. Every lieutenant reports the received value to each other lieutenant. Each loyal recipient includes their own direct value and one report from every other lieutenant. A detected omission supplies the default Retreat; a tied majority also defaults to Retreat in this example. Reveal the first table one row at a time. Ask what Bob should do with Attack directly from Alice and Mallory’s claim of Retreat. Bob’s tie resolves to Retreat, contrary to the loyal commander’s order.

Begin a separate run with Charlie as a loyal fourth general. Alice sends Attack to all three. Bob and Charlie each forward Attack. Mallory tells Bob Retreat and Charlie Attack. Reveal the second table progressively and ask the audience to predict both decisions before showing the majority row. Bob receives two Attack values and Charlie receives three. They agree, and they follow the loyal commander.

Agreement means loyal lieutenants decide alike; validity means they follow the commander when the commander is loyal. With one fault, the classical oral-message setting requires at least four participants for the guarantee (n ≥ 3f + 1). Here we illustrate OM(1) in two fixed runs. A single success does not establish a guarantee, and the tie is not the proof of impossibility with three. The proof uses indistinguishability. Other network and authentication assumptions change what is possible. Transition by asking what a group could agree on if it had to keep a shared ledger.

Source: Leslie Lamport, Robert Shostak and Marshall Pease, The Byzantine Generals Problem, ACM TOPLAS 4(3), 1982, §§2–3. https://lamport.azurewebsites.net/pubs/byz.pdf`,
};
