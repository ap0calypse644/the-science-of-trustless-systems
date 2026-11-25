import type { AnimatedScene } from '../engine/playback';
import { m5cSlides } from './m5c/production';
import { byzantineSlide } from './m5b/production';
import { m5aSlides } from './m5a/production';
import { baselineComposition, comparisonComposition, twoGenerals } from './two-generals/scene';
import { failureComposition } from './failure-art';
import { titleComposition } from './title-art';

export interface TalkSlide {
  id: string;
  composition: string;
  notes: string;
  scene?: AnimatedScene;
  print?: string;
}

export const slides: readonly TalkSlide[] = [
  {
    id: '01-title',
    composition: titleComposition,
    notes: 'Ask: How do we agree? What information must we reveal? Take a few answers before naming the two halves of the lecture. The machine is a metaphor for the work done by protocols and their participants.',
  },
  {
    id: '02-single-point-of-failure',
    composition: failureComposition,
    notes: 'Ask why the devices stopped together. Trace each computer to the strip, then follow the strip lead to the disconnected plug. Charlie’s charger draws power directly from the wall. The computers share a dependency. In this example the strip is their sole power source and none has a battery or backup supply.',
  },
  ...m5aSlides,
  {
    id: '07-two-generals',
    composition: baselineComposition,
    print: comparisonComposition,
    scene: twoGenerals,
    notes: `Two hilltops. The generals are honest, they require coordinated action, and any number of courier messages can be lost, including all of them. There is no other reliable channel or prearranged clock trigger that guarantees agreement. Ask what each general can see from their own camp.

Send the plan. Pause and ask whether Charlie will arrive. No arrival. Ask what Alice can infer from sending. On the retry, Bob learns the time, but Alice lacks a receipt. Acknowledgment sent. Pause and ask whether Bob now knows Alice received it. Acknowledgment lost. Have students read the two thoughts before revealing the alternate run.

One more acknowledgment. In the alternate run Bob’s acknowledgment reaches Alice. Each further delivery can supply one more layer of evidence. Ask students whether they would send one more. In the paired endings Alice sends the same final reply. Her local history is identical. Bob can distinguish the outcomes because he sees a delivery in only one.

Final-message argument. Safety rules out unilateral attack in every possible run. Progress permits a coordinated attack in at least one run. Consider a finite successful exchange and remove its last delivered message. The sender cannot tell the difference and would still attack, so safety requires the other general to attack too. Repeat the removal down to no delivered messages. With no reliable shared trigger, a general cannot distinguish the resulting history from a run where the other general lacks the plan. Always abstaining preserves safety and fails progress. This is about guaranteed coordination in this model. Ask what changes if a messenger can lie, to lead into Byzantine faults.

Source: Joseph Y. Halpern and Yoram Moses, Knowledge and Common Knowledge in a Distributed Environment, Journal of the ACM 37(3), 1990, §3. https://arxiv.org/abs/cs/0006009`,
  },
  byzantineSlide,
  ...m5cSlides,
];
