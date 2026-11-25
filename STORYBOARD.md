# Living storyboard

The sequence assumes a college audience with mixed familiarity with distributed systems and cryptography. Times include setup, speaker explanation, and brief audience responses. A static slide can still prompt discussion. Animated slides use presenter-controlled checkpoints. Interactive slides give the presenter an input that changes the model while the audience predicts the outcome. The owner accepted this sequence as a flexible starting point on 25 November 2026. Slide count, order, treatment and timing may evolve; the times are rough guides, not hard acceptance criteria. Make room for audience questions and understanding. [CONTINUATION.md](CONTINUATION.md) records approved visual decisions for all 25 Part I slides and the restart point.

## Part I — The Problem of Trust (45 minutes)

| Segment | Slides | Min |
| --- | --- | ---: |
| Distributed systems | 1–4 | 7 |
| CAP theorem | 5–6 | 4 |
| Two Generals Problem | 7 | 5 |
| Byzantine Generals Problem | 8 | 5 |
| Inventing Bitcoin | 9–21 | 16 |
| Proof of Stake and BFT | 22–23 | 4 |
| Inter-blockchain communication | 24–25 | 4 |

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1 | The Science of Trustless Systems | Introduce the two halves | Approved original diagonal handshake contraption: enormous hands never touch, miniature cast operates ropes, gears, ledger, envelope and verification mechanism | Ask what people must agree on and what they should be allowed to see | Static | 1 |
| 2 | Single Point of Failure | Motivate distribution | One plug to rule them all: Charlie unplugs a shared power strip to charge his phone at the wall; all dependent devices fail | Elicit what stops working when a service depends on one component | Static | 2 |
| 3 | Why distribute? | Show practical motivations | Charlie accidentally trips over a cable; one independently powered cluster goes down, but redundant service survives on two others | Explain resilience, workload sharing and latency; distribution alone does not guarantee fault tolerance | Static | 2 |
| 4 | Centralized, Distributed, Decentralized | Separate deployment from control | Three panels: crowned Charlie owns one server; crowned Charlie owns three linked servers; Alice, Bob and Charlie independently operate the same three-server topology | Show how multiple machines can still answer to one operator; distinguish governance from topology | Static | 2 |
| 5 | The CAP Theorem | Introduce three properties | Actual three-Spider-Man pointing meme, overlaid Consistency, Availability and Partition Tolerance labels; verify rights before bundling | Introduce terms without implying pick-any-two; transition to the partition scenario | Static | 2 |
| 6 | Consistency or Availability? | Let students predict outcomes | Animated bank branches: Charlie withdraws 1,000 units at A after partition, then asks B for balance; presenter chooses stale reply or wait, explores both, restores connection | Trace read-after-write consistency vs CAP availability; state assumptions and alternative write blocking | Interactive | 2 |
| 7 | Two Generals Problem | Explain why guaranteed coordinated action fails under unreliable communication | Approved medieval battlefield with split-perspective thought bubbles and increasingly absurd queue of honest couriers | Ask who knows what after each delivery or loss and use the final-message argument to introduce common knowledge | Animated | 5 |
| 8 | Byzantine Generals Problem | Shift from messages failing to arrive to participants saying contradictory things | Medieval sequel: Mallory sends conflicting orders to honest Alice and Bob; compare local views, then add Charlie as a fourth general | Introduce equivocation, agreement, validity, and the assumptions behind the classical fault threshold | Interactive | 5 |
| 9 | A shared ledger | Give the students a common record | Animated café debt confusion and receipt chaos resolve when Alice unveils the shared notebook | Explain why recording payments and obligations is useful before introducing any blockchain machinery | Animated | 1 |
| 10 | Unauthorized transactions | Motivate digital signatures | Charlie mischievously adds a fake payment involving Bob; Bob objects, writes his own entry and attaches a stylized signature scribble | Introduce authorization visually; explain private signing, public verification, and message binding verbally | Animated | 1.5 |
| 11 | The infinite money glitch | Motivate transaction validity | Café: Charlie orders an absurd pile of food with only 5 units, presents a genuinely signed 500-unit payment | Signature is authorization, not sufficient funds; no overdraft in toy model | Static | 1 |
| 12 | Who controls the ledger? | Motivate replication | Alice leaves with notebook; Charlie monopolizes access; everyone gets a copy | Distinguish availability, censorship and independent validation; leave ordering open | Animated | 1 |
| 13 | We are back to the Generals | Motivate consensus | Charlie spends 20 twice; opposite receipt order; notebooks become messenger notes, hills and central castle rise | Both provisional histories locally valid; no explicit consensus takeaway on screen | Animated | 1.5 |
| 14 | Giving data a fingerprint | Motivate hashing | Hash machine then 256-bit avalanche visualization | Real SHA-256, editable input, deterministic output, bit-change count; trusted commitment caveat | Interactive | 1 |
| 15 | Prove that you have done some work | Explain PoW | Stationary signed ledger batch, varying nonce, binary hash, leading-zero target | Real responsive search; difficulty in bits, expected work and cheap verification | Interactive | 2.5 |
| 16 | Building a blockchain | Link work to history | Divide ledger into papers, mine linked batches, edit older entry and propagate consequences | Prior hash, transaction commitment and re-mining; simplified model | Animated | 1.5 |
| 17 | Why would anybody do all this work? | Motivate incentives | Exhausted Charlie surrounded by failed hashes, Bob watches | Ask why anyone would spend resources voluntarily | Animated | 0.5 |
| 18 | Rewarding the miner | Introduce subsidy | Miner inserts permitted self-reward transaction in candidate block before mining | New issuance, protocol-defined reward, accepted valid block | Animated | 0.75 |
| 19 | Transaction fees | Introduce fees | Café: Bob and Alice pay Charlie for including transactions | Existing currency paid for inclusion, not newly issued money | Static | 0.75 |
| 20 | The battle of two histories | Resolve competing histories | Alice and Bob mine conflicting tips; growing fork converges; Charlie tries a rewrite | Valid greatest cumulative work, reorgs, probabilistic confirmations | Animated | 2.5 |
| 21 | Congratulations, you've invented Bitcoin | Reveal | Large orange Bitcoin mark with faint ledger and chain background; subtle entrance | Celebrate; qualify simplified reconstruction verbally | Animated | 1 |
| 22 | Do we really need to do all this work? | Motivate alternatives | Café electricity bill; Alice horrified, Bob concerned, Charlie happy; small Sam Altman RAM satire cameo | Resource expenditure secures PoW; motivate stake | Static | 2 |
| 23 | What if we put something at stake? | Explain stake plus BFT | Bonded coins then propose, prevote, precommit, commit | Separate stake weighting from agreement protocol; threshold and assumptions | Animated | 2 |
| 24 | Why can't they talk to each other? | Motivate interoperability | Alice has ChatGPT credits; Bob introduces Claude; separate billing, Gemini and Grok escalate frustration | Independent systems have separate records and rules; no promise of transferable commercial credits | Animated | 2 |
| 25 | What if they could talk? | Introduce IBC | Two kingdoms, Charlie relays packet and proof, receiving light client verifies; tampering rejected; zoom out to connected chains | Separate transport and verification, client assumptions and sovereignty | Animated | 2 |

Individual approved checkpoints, staging and acceptance criteria for slides 11–25 are in [CONTINUATION.md](CONTINUATION.md#approved-slide-decisions-1125-final-part-i-numbering). Timing remains flexible; fit and rehearse rather than enforcing a slide quota.

### Two Generals checkpoints (slide 7)

Use the approved medieval battlefield with Alice and Bob's local-knowledge thought bubbles, Charlie as honest courier, and separate, named checkpoints the presenter can revisit individually. Pause before reveals to ask what the class would try and let the speaker step back to compare what each general knows.

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

Use the approved medieval sequel with Mallory as the malicious general; compare three vs four participants with one faulty commander, plus the loyal-commander case. Transition from uncertainty about whether messages arrive to uncertainty about the participants sending them. Start with several generals sharing consistent reports and needing a common action. Then let an arbitrarily faulty general send conflicting orders to different recipients. Show each honest general only its local evidence before comparing views. A delivered order tells its recipient nothing by itself about which order others received.

In the classical commander formulation, agreement requires loyal lieutenants to decide alike, and validity requires them to follow a loyal commander's order. Explain that the synchronous, fully connected oral-message model provides delivery for messages sent, known immediate sender identity, and detectable omissions, without transferable signatures. For up to `f` Byzantine faults this model requires `n ≥ 3f + 1`. Different communication and authentication models can have different thresholds.

Propose Lamport, Shostak, and Pease's OM protocol as the M5 candidate. Review the protocol and exact scope in M5 before implementation. Let the presenter change the participant count, designate faulty participants, choose or reveal equivocation, inspect each honest participant's local view, step through protocol rounds, compare cases around the stated bound, and reset. Show how structured forwarding and recursive decisions differ from taking a majority of arbitrary messages. Label cases outside the supported fault bound and explain that one run cannot prove a guarantee or impossibility result.

### Inventing Bitcoin (slides 9–21)

This is a conceptual reconstruction. Use internationally relatable café examples, neutral currency units, and no demographic-specific localization. Slide 9 animates the problem and notebook reveal; slide 10 animates the fake entry, Bob's objection and stylized signature. Explain real signature mechanics verbally; no separate signature/hash explainer. Keep the dedicated hashing demo at slide 14. Its sequence makes the design pressures visible before naming the mechanisms. Historical chronology stays outside this segment. Alice keeps everyone organized and wants the café queue moving. Bob checks claims and asks what a recipient can verify. Charlie tests every rule with a straight face and a suspiciously large lunch order. Reuse their props and viewpoints so each failure motivates the next stage. For the final centered logo reveal, show only “Congratulations. You've invented Bitcoin.” Do not include “Almost.” on screen; qualify verbally.

Speaker notes and later demonstrations should preserve these details.

- **Signatures and validity (10–11).** A signature authorizes signed data under a key. An unchanged signed transaction can still be copied, and conflicting spends can each carry a valid signature. The toy balance ledger has explicitly defined ownership, initial state or issuance, and spending rules. Bitcoin spends unspent transaction outputs (UTXOs). Individual validation against local history leaves competing histories unresolved.
- **Replication and conflicting histories (12–13).** Show copies independently checking the same rules. Different arrival orders and conflicting transactions can produce different locally valid histories. Revisit the Generals examples through local knowledge and adversarial behavior while keeping the fault models distinct. Identity, signatures, and local validation still leave a history selection problem.
- **Hashing (14, M5).** Use real SHA-256 on presenter-entered text, show the digest, allow a one-character edit, and provide reset. Explain that collision resistance is a practical security property and collisions exist. An editor can recompute an unprotected hash. Check against a previously trusted commitment to detect alteration. Skip the compression algorithm.
- **Mining (15, M5).** Use actual cryptographic hashing. Let the presenter set difficulty, start, pause, resume, stop, and reset. Show nonce values, generated hashes, misses, a valid hit, and independent verification. A simplified binary leading-zero-bit puzzle is approved with a visible educational label and a speaker note explaining Bitcoin's numeric target comparison. Evaluate a worker or bounded asynchronous work in M5 so hashing keeps the browser responsive and respects presenter controls. Work supplies one component of Nakamoto consensus.
- **Hash links (16).** The header commits to transaction data through a Merkle root and to the previous block through its hash. Changing old data requires rebuilding affected commitments and redoing the corresponding work to compete. Hash links give tamper evidence. Resistance to a rewrite depends on accumulated work and the network and adversary assumptions.
- **Incentives (17–19).** Distinguish newly issued subsidy from fees paid by transactions. The comic's reward is for a valid block that becomes part of the adopted chain.
- **Competing histories (20).** Use cumulative work among valid chains. If the sketch uses block count as a visual proxy, explicitly assume equal work per block. Independent validation still applies to the higher-work branch. Show that the displaced transaction may lose its confirmation and that a conflicting spend may appear in the adopted history. More confirmations can reduce reversal risk under suitable assumptions. Explain the dependence on network propagation, adversarial hash power, and protocol rules. Bitcoin offers probabilistic agreement under its own assumptions. The original Two Generals guarantee remains impossible in its model.
- **Recap and handoff (21–23).** The audience has built a useful model with omissions. Keep additional Bitcoin rules in notes, then use the electricity bill to motivate alternatives. In the illustrative Cosmos architecture, application rules set validator membership and voting power while CometBFT specifies consensus. State the timing and voting-power assumptions for the example and leave protocol-specific penalties and finality rules qualified.
- **Interoperability handoff (24–25).** Use the approved fictional AI credit fragmentation analogy, then independent kingdoms and IBC. Different communities can choose different ledgers. Use IBC to illustrate a relayer carrying data and proofs while the receiving chain verifies according to its client, with assumptions about the counterparty and client intact.

## Part II — The Problem of Privacy (45 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 26 | Why blockchain privacy matters | Make exposure concrete | A public payment board makes an individual's routine visible | Ask what observers infer from the data and metadata | Static | 2 |
| 27 | Anonymity, pseudonymity, confidentiality | Distinguish privacy properties | An unmarked mask, a reusable alias, and a sealed envelope | Ask which observer can identify participants, link records, or read content | Static | 2 |
| 28 | Ancient ciphers | Begin the historical thread | A courier carries a message written using a toy substitution wheel | Explain the shared rule and where secrecy resides in this example | Static | 2 |
| 29 | Frequency analysis | Show how structure survives substitution | Letter counts accumulate beside a sample ciphertext | Explain why a long enough monoalphabetic sample can leak useful language patterns | Animated | 2 |
| 30 | Mechanical encryption | Show how transformations can change | A rotor machine turns one step as a letter is entered | Illustrate changing substitutions and distinguish mechanism from security guarantees | Animated | 2 |
| 31 | Public-key cryptography | Change the key-distribution model | A public padlock and a private key sit beside the earlier shared wheel | Explain public-key encryption roles and distinguish them from signing roles | Static | 2 |
| 32 | Computing with private inputs | Set up the comparison | Three students want an aggregate while keeping individual values private | Ask who holds inputs, what output is allowed, and who should learn it | Static | 2 |
| 33 | Multiparty computation (MPC) | Introduce joint computation | Participants pass sealed slips and assemble a shared result | Frame privacy relative to the protocol, adversary model, and revealed output | Static | 2 |
| 34 | Shamir's Secret Sharing | Explain a threshold | Points appear on a line in a labeled toy finite-field example | Explain reconstruction in a two-of-three example and connect it to threshold sharing | Animated | 3 |
| 35 | Reconstruct the secret | Let students test the threshold | Presenter toggles which share cards are visible | Contrast one share with two distinct shares and explain that sharing is a building block for MPC | Interactive | 3 |
| 36 | Homomorphic encryption | Introduce ciphertext computation | A sealed calculator returns an encrypted result | Trace encryption, evaluation of a supported operation, and decryption | Static | 2 |
| 37 | From homomorphic operations to FHE | Explain expressiveness | Encrypted values move through several circuit gates | Explain evaluation of general circuits and introduce supported operations and practical cost | Animated | 2 |
| 38 | Outsourced private computation | Ground FHE in a workflow | An analyst sends encrypted records to a compute service and receives encrypted output | Identify key ownership, authorized decryption, and what the workflow needs to reveal | Static | 2 |
| 39 | Zero-knowledge proofs | Introduce proof without revealing the witness | A prover and verifier stand beside a public claim card and a private witness card | Define statement and witness, then distinguish completeness, soundness, and zero knowledge | Static | 3 |
| 40 | Challenge and response | Build intuition for verification | A prover who knows a secret door route answers a random challenge in an illustrative cave | Explain what repeated challenges illustrate and state the limits of the analogy | Animated | 2 |
| 41 | Test a proof analogy | Let students predict a verification outcome | Presenter picks a challenge in the cave model and steps through two scripted prover behaviors | Explain why an unpredictable challenge matters in this illustrative model | Interactive | 3 |
| 42 | Proofs in a ledger | Tie the primitive back to blockchains | A ledger checks a proof of a private eligibility condition against a public statement | Identify what is proven, what remains public, and what separate metadata may reveal | Static | 2 |
| 43 | MPC, FHE, ZKP compared | Choose by problem and trust model | Three illustrated workflows show who holds data, computes, decrypts, or verifies | Compare information flow, assumptions, and outputs | Static | 2 |
| 44 | Combining primitives | Show complementary roles | A threshold keyholder group, an encrypted tally, and a proof of input validity | Walk through an illustrative voting design and explain that each component serves a distinct purpose | Static | 3 |
| 45 | Privacy recap | Connect to Part I and hand off | A shared ledger sits beside a diagram showing who learns which fields | Ask which trust and disclosure assumptions remain after choosing a technique | Static | 2 |

## Part III — Ask Me Anything (30 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 46 | Ask Me Anything | Invite and sustain discussion | Three stick figures holding question bubbles about agreement, privacy, and applications | Take audience questions and use prompts to seed discussion if needed | Static | 27 |
| 47 | Closing | Leave a practical design question | The notebook and envelope from the title return | Ask students to name who must agree and what each participant needs to learn | Static | 2 |
| 48 | References | Leave paths for follow-up | Readable grouped citations for distributed agreement, ledgers and interoperability, and cryptography | Point students to primary papers and specifications | Static | 1 |

## Review notes

The current planning baseline has 48 slides: 24 static, 18 animated (including slide 21's subtle entrance), and 6 interactive. Part I's 25 creative concepts are approved; Parts II and III remain provisional. The M4 prototype gate remains slides 1, 2, 7. Slides 9A/9B merged, 10B discarded, old 17A/17B/17C now 17/18/19; old 18–46 shifted by two. See CONTINUATION.md for definitive individual briefs, acceptance requirements and asset caveats. Creative approval does not authorize implementation.

Confirm the precise CAP failure model, the Two Generals progress requirement, the oral-message protocol and boundary examples, Bitcoin's security assumptions, the CometBFT example, IBC client assumptions, and the privacy guarantees of later toy models. The complete lecture bibliography belongs to M7.

### Pedagogical references

3Blue1Brown's problem-driven progression is a teaching reference for the Bitcoin segment. Use an original cast, examples, visuals, staging, dialogue, and humor. [Video](https://www.youtube.com/watch?v=bBC-nXj3Ng4) · [Companion lesson](https://www.3blue1brown.com/lessons/bitcoin/)

### Primary technical references

- CAP and coordinated action. [Gilbert and Lynch, Brewer's Conjecture](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf) · [Halpern and Moses, Knowledge and Common Knowledge in a Distributed Environment](https://arxiv.org/abs/cs/0006009)
- Oral-message model, Byzantine agreement, and OM. [Lamport, Shostak, and Pease, The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)
- Bitcoin authorization, Proof of Work, incentives, and confirmation risk. [Nakamoto, Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) · [Bitcoin Core validation](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp) · [Bitcoin Core chain work accumulation](https://github.com/bitcoin/bitcoin/blob/master/src/node/blockstorage.cpp)
- SHA-256. [NIST FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- Consensus and interoperability examples. [CometBFT consensus specification](https://github.com/cometbft/cometbft/blob/main/spec/consensus/consensus.md) · [Cosmos SDK staking module](https://github.com/cosmos/cosmos-sdk/blob/main/x/staking/README.md) · [IBC client semantics](https://github.com/cosmos/ibc/blob/main/spec/core/ics-002-client-semantics/README.md) · [IBC relayer algorithms](https://github.com/cosmos/ibc/blob/main/spec/relayer/ics-018-relayer-algorithms/README.md)
