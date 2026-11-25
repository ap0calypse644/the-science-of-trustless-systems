import type { TalkSlide } from '../slides';
import { bankBaseline, banking, bankPrint } from './bank-scene';
import { governance, resilience } from './distribution';
import { capNotes, distributionNotes, governanceNotes } from './notes';
import meme from './assets/3enly7.jpg';
import './staging.css';

export const m5aSlides: readonly TalkSlide[] = [
  { id: '03-why-distribute', composition: resilience, notes: distributionNotes },
  { id: '04-centralized-distributed-decentralized', composition: governance, notes: governanceNotes },
  {
    id: '05-cap-theorem',
    composition: `<div class="talk-sheet m5a-sheet cap-sheet meme-production">
      <h1>The CAP Theorem</h1>
      <div class="meme-frame">
        <img src="${meme}" width="600" height="551" alt="Three cartoon Spider-Man figures pointing at each other">
        <div class="meme-labels" aria-label="Labels from left to right">
          <span>Consistency</span><span>Availability</span><span>Partition Tolerance</span>
        </div>
      </div>
    </div>`,
    notes: `${capNotes}

Image source: Imgflip template 206014687, linked file 3enly7.jpg. This user-uploaded composite references the 1967 Spider-Man cartoon. The editor and third-party redistribution rights are unverified. See the repository README for provenance.`,
  },
  {
    id: '06-consistency-or-availability',
    composition: bankBaseline,
    print: bankPrint,
    scene: banking,
    notes: `Both branches run throughout. This is one replicated account with initial balance 1,000 units. The link fails, then A completes Charlie’s withdrawal of 1,000 units and hands him cash. Charlie walks to B and asks for the balance only after the write completed. Point out that an availability-oriented configuration accepted the withdrawal. A consistency-first design could refuse or delay that earlier write instead.

Pause at Balance inquiry for a verbal prediction. Ask what B can infer from its stored 1,000 units. The first run replies with 1,000. It answers the read, but the stale value cannot be linearized after a completed withdrawal that leaves 0.

The Alternative run restores the same partition, stored balances and question at B before any answer. Treat it as a counterfactual, with no second read in the stale run. This time B waits. If the partition lasts indefinitely, waiting fails CAP availability for this request, even though both branches are still running. On reconnection both stored balances synchronize to 0 and B completes that waiting read with 0. Synchronization could not retroactively fix the stale reply in the first run. Eventual convergence and linearizability refer to different guarantees. This history illustrates a decision under partition, not full guarantees of either branch or a banking protocol.

Source: Seth Gilbert and Nancy Lynch, Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services, SIGACT News 33(2), 2002. DOI 10.1145/564585.564601.`,
  },
];
