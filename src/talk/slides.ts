import { failureComposition } from './failure-art';
import { titleComposition } from './title-art';

interface TalkSlide {
  id: string;
  composition: string;
  notes: string;
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
];
