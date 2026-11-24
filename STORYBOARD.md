# Provisional storyboard

The sequence assumes a college audience with mixed familiarity with distributed systems and cryptography. Times include setup, speaker explanation, and brief audience responses. A static slide can still prompt discussion. Animated slides use presenter-controlled checkpoints. Interactive slides give the presenter an input that changes the model while the audience predicts the outcome. All timings and scene treatments are provisional until rehearsal. Use the audience beats within each allocation to leave room for interruptions and spontaneous explanations.

## Part I — The Problem of Trust (45 minutes)

| Segment | Slides | Min |
| --- | --- | ---: |
| Distributed systems | 1–4 | 7 |
| CAP theorem | 5–6 | 4 |
| Two Generals Problem | 7 | 5 |
| Byzantine Generals Problem | 8 | 5 |
| Inventing Bitcoin | 9–19 | 16 |
| Proof of Stake and BFT | 20–21 | 4 |
| Inter-blockchain communication | 22–23 | 4 |

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1 | The Science of Trustless Systems | Introduce the two halves | Title flanked by a shared notebook and a sealed envelope | Ask what people must agree on and what they should be allowed to see | Static | 1 |
| 2 | A single point of failure | Motivate distribution | Three-panel comic about a campus club whose only ledger keeper is absent | Elicit what stops working when a service depends on one component | Static | 2 |
| 3 | Why distribute? | Show practical motivations | Service desks across a campus share load and cover a closure | Explain latency, capacity, and fault tolerance as reasons to distribute | Static | 2 |
| 4 | Centralized, distributed, decentralized | Separate deployment from control | Identical server maps overlaid with different decision-making lines | Show how multiple machines can still answer to one operator | Static | 2 |
| 5 | CAP during a partition | Introduce the trade-off | A broken bridge between two replica desks interrupts a read after a write | Explain the tension between linearizable consistency and the theorem's availability requirement during a partition | Animated | 2 |
| 6 | Replica decision | Let students predict outcomes | Presenter chooses to return a local value or wait after a scripted write | Trace what each policy sacrifices in this scenario | Interactive | 2 |
| 7 | Two Generals Problem | Explain why guaranteed coordinated action fails under unreliable communication | Presenter-paced comedy with two hilltops and an increasingly absurd queue of couriers | Ask who knows what after each delivery or loss and use the final-message argument to introduce common knowledge | Animated | 5 |
| 8 | Byzantine Generals Problem | Shift from messages failing to arrive to participants saying contradictory things | Honest generals compare their local reports with messages from a general who tells different stories | Introduce equivocation, agreement, validity, and the assumptions behind the classical fault threshold | Interactive | 5 |
| 9 | A shared ledger | Give the students a common record | Campus café receipts, coffee cups, and a pile of small repayments give way to Alice's notebook | Explain why recording payments and obligations is useful before introducing any blockchain machinery | Static | 1 |
| 10 | Unauthorized transactions | Motivate digital signatures | Charlie copies Bob's authorization onto an altered café order and verification fails | Walk through private signing, public verification, and binding a signature to the signed message | Animated | 1.5 |
| 11 | The infinite money glitch | Motivate transaction validity | Charlie signs an order for a cartload of samosas with an empty balance | Introduce spending, ownership, and initial state or issuance rules for a toy native currency | Static | 1 |
| 12 | Who controls the ledger? | Motivate distributed copies | Alice takes the only notebook to an exam and Charlie proposes a fee for access to his replacement | Connect availability, censorship, and unilateral edits to control over a centralized ledger | Static | 1 |
| 13 | We are back to the Generals | Create a need for consensus | Bob and Alice receive Charlie's conflicting payments in opposite order and compare their notebooks | Show how locally valid histories can disagree. Ask how the network will select a history and leave the question open | Animated | 1.5 |
| 14 | Giving data a fingerprint | Motivate cryptographic hashing | Bob changes a character in a café order and compares its digest with the earlier one | Explain deterministic fixed-size digests, sensitivity to changes, practical collision resistance, and how hashing differs from encryption | Interactive | 1 |
| 15 | Prove that you have done some work | Motivate Proof of Work in an open network | Charlie's stack of aliases gives way to Bob's display of nonce attempts and a verifiable result | Explain computational search, difficulty, nonces, inexpensive verification, and participation weighted by resources | Interactive | 2.5 |
| 16 | Building a blockchain | Commit work to an ordered history | Bob links transaction batches into blocks. Charlie edits an old order and the commitments and links stop matching | Trace transaction commitments and the previous-block hash through the header, then explain the work needed to rebuild a branch | Animated | 1.5 |
| 17 | Why would anybody do this work? | Motivate mining incentives | Bob is surrounded by rejected hashes and power bills. Alice adds a reward for a valid block that gets accepted | Explain subsidy, issuance, and fees without a digression into monetary policy or mining pools | Static | 1 |
| 18 | The battle of two histories | Resolve the open question about competing histories | Two valid tips split over Charlie's conflicting payments. Alice follows the valid branch with greater cumulative work and a payment drops out of the adopted history | Explain competing tips, fork choice, double spending, reorganizations, confirmations, and probabilistic finality | Animated | 2.5 |
| 19 | Congratulations, you've invented Bitcoin | Name and recap the design the audience built | Alice, Charlie, and Bob surrounded by receipts, notebooks, keys, blocks, computers, and exhausted miners | Recap shared history, authorization, validation, replication, hash commitments, work, incentives, and fork choice. Acknowledge remaining rules and trade-offs | Static | 1.5 |
| 20 | Do we really need to do all this work? | Motivate Proof of Stake | The café celebration ends when Alice opens the electricity bill | Separate open participation, Sybil resistance, block production, and proposer selection. Explain how stake changes the resource and incentive assumptions | Static | 2 |
| 21 | Proof of Stake and BFT together | Explain what an agreement protocol still needs to specify | An illustrative Cosmos chain supplies a stake-weighted validator set and CometBFT rounds show proposing and voting | Separate economic security, consensus, fork choice, and finality. Qualify fault tolerance, slashing, and finality by protocol and assumptions | Static | 2 |
| 22 | Why interchain communication? | Ask how independent ledgers communicate | Two campus communities adopt different rulebooks and want to exchange a message | Introduce independent chains, sovereignty, and the need to verify a claim about another ledger | Static | 2 |
| 23 | IBC, light clients, and relayers | Follow a message across chains | A relayer carries a packet and proof to a chain whose client checks them against client state | Separate message transport from proof verification and identify client-specific trust assumptions. Bridge security models vary | Animated | 2 |

### Two Generals checkpoints (slide 7)

Use an original animated comedy with separate, named checkpoints the presenter can revisit individually. Pause before reveals to ask what the class would try and let the speaker step back to compare what each general knows.

1. **Two hilltops.** Establish armies on opposite sides of an enemy-controlled valley. They need to act together because acting alone fails.
2. **Send the plan.** General A dispatches a courier with the proposed time. Stop for a delivery prediction.
3. **No arrival.** The first courier fails to reach General B. Compare A's and B's local views.
4. **Retry delivered.** A second courier reaches B. Ask whether B can now safely assume coordinated action.
5. **Acknowledgment sent.** B dispatches a reply. Ask the audience what each general would need to know before acting.
6. **Acknowledgment lost.** B knows the plan, while A lacks evidence that B received it.
7. **One more acknowledgment.** Consider a run in which the reply arrives. Ask whether A should acknowledge it and what happens if that acknowledgment is lost. Revisit sender and receiver perspectives while exploring student suggestions.
8. **The final message.** Compare a successful finite exchange with one in which its final delivered message is lost. The sender cannot distinguish those runs. Repeating the argument strips away any finite sequence that purportedly guarantees a coordinated attack. Introduce common knowledge through the recursive “each knows that the other knows” question.

Speaker notes should state the model: honest generals, potentially lost messages including all messages, no reliable coordination channel, and a requirement to permit a coordinated attack in some run while ruling out a unilateral attack in every run. Always abstaining is safe but fails that progress requirement. The result concerns guaranteed coordinated action under these assumptions. The later BFT and Bitcoin examples change the model or guarantee.

### Byzantine Generals demonstration (slide 8, proposed for M5)

Transition from uncertainty about whether messages arrive to uncertainty about the participants sending them. Start with several generals sharing consistent reports and needing a common action. Then let an arbitrarily faulty general send conflicting orders to different recipients. Show each honest general only its local evidence before comparing views. A delivered order tells its recipient nothing by itself about which order others received.

In the classical commander formulation, agreement requires loyal lieutenants to decide alike, and validity requires them to follow a loyal commander's order. Explain that the synchronous, fully connected oral-message model provides delivery for messages sent, known immediate sender identity, and detectable omissions, without transferable signatures. For up to `f` Byzantine faults this model requires `n ≥ 3f + 1`. Different communication and authentication models can have different thresholds.

Propose Lamport, Shostak, and Pease's OM protocol as the M5 candidate. Review the protocol and exact scope in M5 before implementation. Let the presenter change the participant count, designate faulty participants, choose or reveal equivocation, inspect each honest participant's local view, step through protocol rounds, compare cases around the stated bound, and reset. Show how structured forwarding and recursive decisions differ from taking a majority of arbitrary messages. Label cases outside the supported fault bound and explain that one run cannot prove a guarantee or impossibility result.

### Inventing Bitcoin (slides 9–19)

This is a conceptual reconstruction. Its sequence makes the design pressures visible before naming the mechanisms. Historical chronology stays outside this segment. Alice keeps everyone organized and wants the café queue moving. Bob checks claims and asks what a recipient can verify. Charlie tests every rule with a straight face and a suspiciously large lunch order. Reuse their props and viewpoints so each failure motivates the next stage. For the final comic, reveal only “Congratulations. You've invented Bitcoin.” An optional “Almost.” can cue the speaker to qualify the model.

Speaker notes and later demonstrations should preserve these details.

- **Signatures and validity (10–11).** A signature authorizes signed data under a key. An unchanged signed transaction can still be copied, and conflicting spends can each carry a valid signature. The toy balance ledger has explicitly defined ownership, initial state or issuance, and spending rules. Bitcoin spends unspent transaction outputs (UTXOs). Individual validation against local history leaves competing histories unresolved.
- **Replication and conflicting histories (12–13).** Show copies independently checking the same rules. Different arrival orders and conflicting transactions can produce different locally valid histories. Revisit the Generals examples through local knowledge and adversarial behavior while keeping the fault models distinct. Identity, signatures, and local validation still leave a history selection problem.
- **Hashing (14, M5).** Use real SHA-256 on presenter-entered text, show the digest, allow a one-character edit, and provide reset. Explain that collision resistance is a practical security property and collisions exist. An editor can recompute an unprotected hash. Check against a previously trusted commitment to detect alteration. Skip the compression algorithm.
- **Mining (15, M5).** Use actual cryptographic hashing. Let the presenter set difficulty, start, pause, resume, stop, and reset. Show nonce values, generated hashes, misses, a valid hit, and independent verification. A simplified leading-zero puzzle is acceptable with a visible educational label and a speaker note explaining Bitcoin's numeric target comparison. Evaluate a worker or bounded asynchronous work in M5 so hashing keeps the browser responsive and respects presenter controls. Work supplies one component of Nakamoto consensus.
- **Hash links (16).** The header commits to transaction data through a Merkle root and to the previous block through its hash. Changing old data requires rebuilding affected commitments and redoing the corresponding work to compete. Hash links give tamper evidence. Resistance to a rewrite depends on accumulated work and the network and adversary assumptions.
- **Incentives (17).** Distinguish newly issued subsidy from fees paid by transactions. The comic's reward is for a valid block that becomes part of the adopted chain.
- **Competing histories (18).** Use cumulative work among valid chains. If the sketch uses block count as a visual proxy, explicitly assume equal work per block. Independent validation still applies to the higher-work branch. Show that the displaced transaction may lose its confirmation and that a conflicting spend may appear in the adopted history. More confirmations can reduce reversal risk under suitable assumptions. Explain the dependence on network propagation, adversarial hash power, and protocol rules. Bitcoin offers probabilistic agreement under its own assumptions. The original Two Generals guarantee remains impossible in its model.
- **Recap and handoff (19–21).** The audience has built a useful model with omissions. Keep additional Bitcoin rules in notes, then use the electricity bill to motivate alternatives. In the illustrative Cosmos architecture, application rules set validator membership and voting power while CometBFT specifies consensus. State the timing and voting-power assumptions for the example and leave protocol-specific penalties and finality rules qualified.
- **Interoperability handoff (22–23).** Different communities can choose different ledgers. Use IBC to illustrate a relayer carrying data and proofs while the receiving chain verifies according to its client, with assumptions about the counterparty and client intact.

## Part II — The Problem of Privacy (45 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 24 | Why blockchain privacy matters | Make exposure concrete | A public payment board makes an individual's routine visible | Ask what observers infer from the data and metadata | Static | 2 |
| 25 | Anonymity, pseudonymity, confidentiality | Distinguish privacy properties | An unmarked mask, a reusable alias, and a sealed envelope | Ask which observer can identify participants, link records, or read content | Static | 2 |
| 26 | Ancient ciphers | Begin the historical thread | A courier carries a message written using a toy substitution wheel | Explain the shared rule and where secrecy resides in this example | Static | 2 |
| 27 | Frequency analysis | Show how structure survives substitution | Letter counts accumulate beside a sample ciphertext | Explain why a long enough monoalphabetic sample can leak useful language patterns | Animated | 2 |
| 28 | Mechanical encryption | Show how transformations can change | A rotor machine turns one step as a letter is entered | Illustrate changing substitutions and distinguish mechanism from security guarantees | Animated | 2 |
| 29 | Public-key cryptography | Change the key-distribution model | A public padlock and a private key sit beside the earlier shared wheel | Explain public-key encryption roles and distinguish them from signing roles | Static | 2 |
| 30 | Computing with private inputs | Set up the comparison | Three students want an aggregate while keeping individual values private | Ask who holds inputs, what output is allowed, and who should learn it | Static | 2 |
| 31 | Multiparty computation (MPC) | Introduce joint computation | Participants pass sealed slips and assemble a shared result | Frame privacy relative to the protocol, adversary model, and revealed output | Static | 2 |
| 32 | Shamir's Secret Sharing | Explain a threshold | Points appear on a line in a labeled toy finite-field example | Explain reconstruction in a two-of-three example and connect it to threshold sharing | Animated | 3 |
| 33 | Reconstruct the secret | Let students test the threshold | Presenter toggles which share cards are visible | Contrast one share with two distinct shares and explain that sharing is a building block for MPC | Interactive | 3 |
| 34 | Homomorphic encryption | Introduce ciphertext computation | A sealed calculator returns an encrypted result | Trace encryption, evaluation of a supported operation, and decryption | Static | 2 |
| 35 | From homomorphic operations to FHE | Explain expressiveness | Encrypted values move through several circuit gates | Explain evaluation of general circuits and introduce supported operations and practical cost | Animated | 2 |
| 36 | Outsourced private computation | Ground FHE in a workflow | An analyst sends encrypted records to a compute service and receives encrypted output | Identify key ownership, authorized decryption, and what the workflow needs to reveal | Static | 2 |
| 37 | Zero-knowledge proofs | Introduce proof without revealing the witness | A prover and verifier stand beside a public claim card and a private witness card | Define statement and witness, then distinguish completeness, soundness, and zero knowledge | Static | 3 |
| 38 | Challenge and response | Build intuition for verification | A prover who knows a secret door route answers a random challenge in an illustrative cave | Explain what repeated challenges illustrate and state the limits of the analogy | Animated | 2 |
| 39 | Test a proof analogy | Let students predict a verification outcome | Presenter picks a challenge in the cave model and steps through two scripted prover behaviors | Explain why an unpredictable challenge matters in this illustrative model | Interactive | 3 |
| 40 | Proofs in a ledger | Tie the primitive back to blockchains | A ledger checks a proof of a private eligibility condition against a public statement | Identify what is proven, what remains public, and what separate metadata may reveal | Static | 2 |
| 41 | MPC, FHE, ZKP compared | Choose by problem and trust model | Three illustrated workflows show who holds data, computes, decrypts, or verifies | Compare information flow, assumptions, and outputs | Static | 2 |
| 42 | Combining primitives | Show complementary roles | A threshold keyholder group, an encrypted tally, and a proof of input validity | Walk through an illustrative voting design and explain that each component serves a distinct purpose | Static | 3 |
| 43 | Privacy recap | Connect to Part I and hand off | A shared ledger sits beside a diagram showing who learns which fields | Ask which trust and disclosure assumptions remain after choosing a technique | Static | 2 |

## Part III — Ask Me Anything (30 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 44 | Ask Me Anything | Invite and sustain discussion | Three stick figures holding question bubbles about agreement, privacy, and applications | Take audience questions and use prompts to seed discussion if needed | Static | 27 |
| 45 | Closing | Leave a practical design question | The notebook and envelope from the title return | Ask students to name who must agree and what each participant needs to learn | Static | 2 |
| 46 | References | Leave paths for follow-up | Readable grouped citations for distributed agreement, ledgers and interoperability, and cryptography | Point students to primary papers and specifications | Static | 1 |

## Review notes

The provisional deck has 46 slides: 28 static, 12 animated, and 6 interactive. The title, single-point-of-failure comic, and Two Generals animation remain the M4 prototypes. Detailed timing, demo controls, and the technical models are subject to rehearsal and milestone review.

Confirm the precise CAP failure model, the Two Generals progress requirement, the oral-message protocol and boundary examples, Bitcoin's security assumptions, the CometBFT example, IBC client assumptions, and the privacy guarantees of later toy models. The complete lecture bibliography belongs to M7.

### Pedagogical references

3Blue1Brown's problem-driven progression is a teaching reference for the Bitcoin segment. Use an original cast, examples, visuals, staging, dialogue, and humor. [Video](https://www.youtube.com/watch?v=bBC-nXj3Ng4) · [Companion lesson](https://www.3blue1brown.com/lessons/bitcoin/)

### Primary technical references

- CAP and coordinated action. [Gilbert and Lynch, Brewer's Conjecture](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf) · [Halpern and Moses, Knowledge and Common Knowledge in a Distributed Environment](https://arxiv.org/abs/cs/0006009)
- Oral-message model, Byzantine agreement, and OM. [Lamport, Shostak, and Pease, The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)
- Bitcoin authorization, Proof of Work, incentives, and confirmation risk. [Nakamoto, Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) · [Bitcoin Core validation](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp) · [Bitcoin Core chain work accumulation](https://github.com/bitcoin/bitcoin/blob/master/src/node/blockstorage.cpp)
- SHA-256. [NIST FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- Consensus and interoperability examples. [CometBFT consensus specification](https://github.com/cometbft/cometbft/blob/main/spec/consensus/consensus.md) · [Cosmos SDK staking module](https://github.com/cosmos/cosmos-sdk/blob/main/x/staking/README.md) · [IBC client semantics](https://github.com/cosmos/ibc/blob/main/spec/core/ics-002-client-semantics/README.md) · [IBC relayer algorithms](https://github.com/cosmos/ibc/blob/main/spec/relayer/ics-018-relayer-algorithms/README.md)
