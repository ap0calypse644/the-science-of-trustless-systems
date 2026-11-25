import { battlefield, late, opening, outcome, type Thought } from './art';

interface StagingStill {
  id: string;
  label: string;
  alice: Thought;
  bob: Thought;
  valley: string;
  notes: string;
}

const scenes: readonly StagingStill[] = [
  { id: 'opening', label: 'Opening battlefield', alice: ['We have to move', 'at the same time.'],
    bob: ['We have to move', 'at the same time.'], valley: opening,
    notes: 'Opening still. Each thought bubble is one general’s private view. The opposing camps cannot see or reliably signal to one another. Their pennants identify the camps to the audience.' },
  { id: 'couriers', label: 'Late acknowledgment exchange', alice: ['Bob received', 'my plan.'], bob: ['Did Alice get', 'my reply?'], valley: late,
    notes: 'Late still from an alternate exchange where Bob’s reply reached Alice. Bob has yet to receive confirmation of his reply. The repeated Charlie poses stage several trips as a visual shorthand.' },
  { id: 'reply-arrives', label: 'Final reply arrives', alice: ['I sent my reply.', 'Did Bob get it?'],
    bob: ['Alice got my reply.', 'She just confirmed it.'], valley: outcome(true),
    notes: 'Paired comparison, delivery run. Alice sends the final reply confirming she received Bob’s acknowledgment. Bob learns that it arrived. Alice’s local evidence is the same in both runs.' },
  { id: 'reply-lost', label: 'Final reply is lost', alice: ['I sent my reply.', 'Did Bob get it?'],
    bob: ['Did Alice get', 'my reply?'], valley: outcome(false),
    notes: 'Paired comparison, loss run. Alice sends the same final reply and lacks confirmation. Bob has no evidence that Alice received his acknowledgment. The audience can see the outcome; Alice cannot.' },
];

export const stills = scenes.map(({ id, label, alice, bob, valley, notes }) => ({
  id,
  notes,
  composition: battlefield(label, alice, bob, valley),
}));
