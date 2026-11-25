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

Pause at Choose response. Ask what B can infer from its stored 1,000 units. Use Tab or the mouse to select a response. Selection enables continuation without advancing the beat. Return 1,000 answers the read, but it cannot be linearized after a completed withdrawal that leaves 0. Wait keeps the read pending. If the partition lasts indefinitely, waiting fails CAP availability for this request. Both branches are still running, so uptime does not settle CAP availability.

Return to Choose response to explore the other outcome. Reconnect synchronizes both stored balances to 0. If a read was pending, it completes with 0. If B already returned 1,000, synchronization does not change that earlier answer or retroactively make it linearizable. Eventual convergence and linearizability refer to different guarantees. This history illustrates a decision under partition, not full guarantees of either branch or a banking protocol.

Source: Seth Gilbert and Nancy Lynch, Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services, SIGACT News 33(2), 2002. DOI 10.1145/564585.564601.`,
  },
];
