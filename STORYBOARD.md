# Living storyboard

The sequence assumes a college audience with mixed familiarity with distributed systems and cryptography. Times include setup, speaker explanation, and brief audience responses. A static slide can still prompt discussion. Animated slides use presenter-controlled checkpoints. All demonstrations are static or scripted animations; audience predictions are verbal, with no live model inputs. The owner accepted this sequence as a flexible starting point on 25 November 2026. Slide count, order, treatment and timing may evolve; the times are rough guides, not hard acceptance criteria. Make room for audience questions and understanding. [CONTINUATION.md](CONTINUATION.md) records approved visual decisions for slides 1–32 and the restart point.

## Part I — The Problem of Trust (flexible timing)

| Segment | Slides | Min |
| --- | --- | ---: |
| Distributed systems | 1–4 | 7 |
| CAP theorem | 5–6 | 4 |
| Two Generals Problem | 7 | 5 |
| Byzantine Generals Problem | 8 | 5 |
| Inventing Bitcoin | 9–26 | Flexible |
| Proof of Stake and BFT | 27–29 | TBD |
| Beyond cryptocurrency and privacy bridge | 30–32 | TBD |

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1 | The Science of Trustless Systems | Introduce the two halves | Approved original diagonal handshake contraption: enormous hands never touch, miniature cast operates ropes, gears, ledger, envelope and verification mechanism | Ask what people must agree on and what they should be allowed to see | Static | 1 |
| 2 | One plug to rule them all | Motivate distribution with a single point of failure | Charlie unplugs a shared power strip to charge his phone at the wall; all dependent devices fail | Elicit what stops working when a service depends on one component | Static | 2 |
| 3 | Why distribute? | Show practical motivations | Charlie accidentally trips over a cable; one independently powered cluster goes down, but redundant service survives on two others | Explain resilience, workload sharing and latency; distribution alone does not guarantee fault tolerance | Static | 2 |
| 4 | Centralized, Distributed, Decentralized | Separate deployment from control | Three panels: crowned Charlie owns one server; crowned Charlie owns three linked servers; Alice, Bob and Charlie independently operate the same three-server topology | Show how multiple machines can still answer to one operator; distinguish governance from topology | Static | 2 |
| 5 | The CAP Theorem | Introduce three properties | Actual three-Spider-Man pointing meme, overlaid Consistency, Availability and Partition Tolerance labels; verify rights before bundling | Introduce terms without implying pick-any-two; transition to the partition scenario | Static | 2 |
| 6 | Consistency or Availability? | Let students predict outcomes | Animated bank branches: Charlie withdraws 1,000 units at A after partition, then asks B for balance; show stale reply, explicitly rewind to the same partition state, show waiting, restore connection | Trace read-after-write consistency vs CAP availability; state assumptions and alternative write blocking | Animated | 2 |
| 7 | Two Generals Problem | Explain why guaranteed coordinated action fails under unreliable communication | Approved medieval battlefield with split-perspective thought bubbles and increasingly absurd queue of honest couriers | Ask who knows what after each delivery or loss and use the final-message argument to introduce common knowledge | Animated | 5 |
| 8 | Byzantine Generals Problem | Shift from lost messages to dishonest reports | Medieval sequel with loyal commander Alice, peer Mallory, and three- and four-general report tables | Compare agreement and validity under the oral-message assumptions | Animated | 5 |
| 9 | A shared ledger | Give the students a common record | Animated café debt confusion and receipt chaos (Bob: “I paid yesterday”) resolve when Alice unveils the shared notebook | Explain why recording payments and obligations is useful before introducing any blockchain machinery | Animated | 1 |
| 10 | Unauthorized transactions | Motivate digital signatures | Charlie mischievously adds a fake payment involving Bob; Bob objects, writes his own entry and attaches a stylized signature scribble | Introduce authorization visually; explain private signing, public verification, and message binding verbally | Animated | 1.5 |
| 11 | The infinite money glitch | Motivate transaction validity | Café: Charlie orders an absurd pile of food with only 5 units, presents a genuinely signed 500-unit payment | Signature is authorization, not sufficient funds; no overdraft in toy model | Static | 1 |
| 12 | Who controls the ledger? | Motivate replication | Alice leaves with notebook; Charlie monopolizes access; everyone gets a copy | Distinguish availability, censorship and independent validation; leave ordering open | Animated | 1 |
| 13 | The Double-Spend Problem → We Are Back to the Generals | Motivate consensus | Charlie signs two 20-unit payments; opposite receipt order; two accepted local histories; notebooks become messenger notes, hills and central castle rise | Opening title proposed; reveal Generals title only at final battlefield. No separate conflicting-histories beat; explain second-payment rejection verbally. Both histories locally valid; no explicit consensus takeaway on screen | Animated | 1.5 |
| 14 | Giving Data a Fingerprint | Motivate hashing | Machine: greeting, ledger, library; matching copies | Fixed length and determinism | Animated | 1.5 |
| 15 | What If We Change Just One Bit? | Avalanche | Charlie edit 10→11, single bit, 256-bit comparison | Trusted original commitment | Animated | 1.5 |
| 16 | Prove That You Have Done Some Work | PoW puzzle | Signed page, target, nonce, attempts | Four zero bits; fixed illustrative outputs | Animated | 2 |
| 17 | Hard to Solve, Easy to Verify | Asymmetry | Charlie hands Alice ledger and nonce; difficulty comparison | Expected attempts vs one check | Animated | 1.5 |
| 18 | The Growing Ledger | Motivate chunking | Alice's ever-longer list, escalating dismay | History-only replay cost | Animated | 1 |
| 19 | From Pages to Blocks | Chunk history | Fill and flip 3–4 pages, tear out and transform | No balance summaries or links | Animated | 1.5 |
| 20 | What If Charlie Changes History? | Hash linking | Charlie edits, Alice links hashes, Charlie repairs one and next mismatches | Tamper evidence, blockchain name | Animated | 2 |
| 21 | Conflicting Histories | Competing branches | Alice and Bob receive conflicting signed spends | Hash links alone don't select history | Animated | 1.5 |
| 22 | Making History Expensive to Rewrite | Apply PoW | Mine linked blocks, Charlie edits and sequentially re-mines | Work depends on predecessor | Animated | 2 |
| 23 | Which History Do We Believe? | Fork choice and confirmations | Honest hash-power majority races Charlie; temporary catch-up; growing depth | Greatest valid cumulative work, probabilistic security; verbal majority attack | Animated | 3 |
| 24 | Why Would Anybody Do All This Work? | Motivate incentives | Alice buried under hundreds of mined block boxes; white flag | Why spend resources? | Animated | 1 |
| 25 | Rewarding the Miner | Subsidy | Permitted reward before mining; Alice emerges and resumes | New issuance, fees verbally | Animated | 1.5 |
| 26 | Congratulations, You've Invented Bitcoin | Reveal | Orange logo, faint chain, gentle entrance | Qualify simplified reconstruction | Animated | 0.5 |
| 27 | Do We Really Need to Do All This Work? | Motivate alternatives to PoW | Server racks, fictional $ 4972 bill, discarded flag and licensed photo-head RAM cameo | Ask whether costly computation is the only option | Static | TBD |
| 28 | What If We Put Something at Stake? | Bonded stake | Coins 35/35/30, individual lockboxes, voting weights, PoS reveal | Explain stake as resource at risk | Animated | TBD |
| 29 | Let's Vote on It | Stake-weighted BFT | Triangle, propose, prevote, precommit, commit; Charlie silent | Independent observation of 70% >2/3; one successful round | Animated | TBD |
| 30 | Blockchain ≠ Cryptocurrency | Infrastructure vs application | Iceberg → parallel Internet and blockchain examples | Convey distinction verbally, no slogan | Animated | TBD |
| 31 | What Else Could We Agree On? | Non-financial applications and engineering judgment | Four examples → graduation credential → when blockchain is useful | Explain conditional value of shared verifiable state | Animated | TBD |
| 32 | But There's a Catch... | Bridge to privacy | Interview oversharing → matching café spending records with Alice’s entry highlighted in Charlie’s copy → glass house | Ask verbally whether verification can avoid disclosure | Animated | TBD |

Individual approved checkpoints, staging and acceptance criteria for slides 11–26 are in [CONTINUATION.md](CONTINUATION.md#approved-slide-decisions-1126-current-numbering). Timing remains flexible; fit and rehearse rather than enforcing a slide quota.

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

### Byzantine Generals scripted sequence (slide 8)

Reuse the slide 7 battlefield from a slightly elevated viewpoint. The upright fortress sits in the middle ground, with Mallory on a rear hill. Alice and Bob occupy separate near-side hills. Charlie joins on his own front hill, below the unobstructed fortress. Communication between Alice and Bob runs in front. Alice is the loyal commander for the worked example. Peer Mallory lies about the order Alice sent. Reveal Bob’s private evidence before comparing reports.

In the three-general run, Bob receives Attack directly and hears Mallory report Retreat. The tie defaults to Retreat and fails loyal-commander validity in this run. Compare with a fresh four-general run. Charlie forwards Alice’s Attack honestly, so Bob and Charlie each have a majority even when Mallory tailors reports to them. Read the evidence and decisions from tables.

In the classical oral-message model, sent messages arrive, immediate sender identity is known, and omissions are detectable. Agreement is a condition on loyal participants’ decisions and validity requires following a loyal commander. Explain the `n ≥ 3f + 1` bound under these assumptions in notes, with the Lamport, Shostak and Pease result. The sequence is scripted and presenter-paced. The owner approved the scripted production sequence and PR #15 is merged.

### Inventing Bitcoin (slides 9–26)

This is a conceptual reconstruction. Use internationally relatable café examples, neutral currency units, and no demographic-specific localization. Slide 9 animates the problem and notebook reveal; slide 10 animates the fake entry, Bob's objection and stylized signature. Explain real signature mechanics verbally; no separate signature/hash explainer. Keep the dedicated hashing demo at slide 14. Its sequence makes the design pressures visible before naming the mechanisms. Historical chronology stays outside this segment. Alice keeps everyone organized and wants the café queue moving. Bob checks claims and asks what a recipient can verify. Charlie tests every rule with a straight face and a suspiciously large lunch order. Reuse their props and viewpoints so each failure motivates the next stage. For the final centered logo reveal, show only “Congratulations. You've invented Bitcoin.” Do not include “Almost.” on screen; qualify verbally.

Speaker notes and later demonstrations should preserve these details.

- **Signatures and validity (10–11).** A signature authorizes signed data under a key. An unchanged signed transaction can still be copied, and conflicting spends can each carry a valid signature. The toy balance ledger has explicitly defined ownership, initial state or issuance, and spending rules. Bitcoin spends unspent transaction outputs (UTXOs). Individual validation against local history leaves competing histories unresolved.
- **Replication and conflicting histories (12–13).** Show copies independently checking the same rules. Different arrival orders and conflicting transactions can produce different locally valid histories. Revisit the Generals examples through local knowledge and adversarial behavior while keeping the fault models distinct. Identity, signatures, and local validation still leave a history selection problem.
- **Hashing (14–15).** Fixed-size deterministic digest, then illustrative one-bit avalanche and trusted prior commitment.
- **Mining (16–17).** Signed data, nonce, fixed four-zero-bit target, expected work and cheap verification. No actual hashing.
- **Pages and hash linking (18–20).** No carried balances, no links until Alice adds predecessor hash. Sequential mismatch on repair; hash links alone do not prevent rewriting.
- **Competing histories and PoW (21–23).** Forks, sequential re-mining, race between honest majority hash power and Charlie, cumulative work, probabilistic confirmations. Invalid blocks rejected regardless of work. Majority attack explained verbally.
- **Incentives and reveal (24–26).** Alice buried in blocks; protocol-defined reward included before mining; fees verbally; Bitcoin reveal.
- **Closing Part I (27–32).** Approved stake/BFT and non-financial applications, ending on the privacy problem; see CONTINUATION.md.

## Part II — The Problem of Privacy (45 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 33 | Why blockchain privacy matters | Make exposure concrete | A public payment board makes an individual's routine visible | Ask what observers infer from the data and metadata | Static | 2 |
| 34 | Anonymity, pseudonymity, confidentiality | Distinguish privacy properties | An unmarked mask, a reusable alias, and a sealed envelope | Ask which observer can identify participants, link records, or read content | Static | 2 |
| 35 | Ancient ciphers | Begin the historical thread | A courier carries a message written using a toy substitution wheel | Explain the shared rule and where secrecy resides in this example | Static | 2 |
| 36 | Frequency analysis | Show how structure survives substitution | Letter counts accumulate beside a sample ciphertext | Explain why a long enough monoalphabetic sample can leak useful language patterns | Animated | 2 |
| 37 | Mechanical encryption | Show how transformations can change | A rotor machine turns one step as a letter is entered | Illustrate changing substitutions and distinguish mechanism from security guarantees | Animated | 2 |
| 38 | Public-key cryptography | Change the key-distribution model | A public padlock and a private key sit beside the earlier shared wheel | Explain public-key encryption roles and distinguish them from signing roles | Static | 2 |
| 39 | Computing with private inputs | Set up the comparison | Three students want an aggregate while keeping individual values private | Ask who holds inputs, what output is allowed, and who should learn it | Static | 2 |
| 40 | Multiparty computation (MPC) | Introduce joint computation | Participants pass sealed slips and assemble a shared result | Frame privacy relative to the protocol, adversary model, and revealed output | Static | 2 |
| 41 | Shamir's Secret Sharing | Explain a threshold | Points appear on a line in a labeled toy finite-field example | Explain reconstruction in a two-of-three example and connect it to threshold sharing | Animated | 3 |
| 42 | Reconstruct the secret | Let students test the threshold | Scripted one-share and two-share reconstruction of a fixed toy example | Contrast one share with two distinct shares and explain that sharing is a building block for MPC | Animated | 3 |
| 43 | Homomorphic encryption | Introduce ciphertext computation | A sealed calculator returns an encrypted result | Trace encryption, evaluation of a supported operation, and decryption | Static | 2 |
| 44 | From homomorphic operations to FHE | Explain expressiveness | Encrypted values move through several circuit gates | Explain evaluation of general circuits and introduce supported operations and practical cost | Animated | 2 |
| 45 | Outsourced private computation | Ground FHE in a workflow | An analyst sends encrypted records to a compute service and receives encrypted output | Identify key ownership, authorized decryption, and what the workflow needs to reveal | Static | 2 |
| 46 | Zero-knowledge proofs | Introduce proof without revealing the witness | A prover and verifier stand beside a public claim card and a private witness card | Define statement and witness, then distinguish completeness, soundness, and zero knowledge | Static | 3 |
| 47 | Challenge and response | Build intuition for verification | A prover who knows a secret door route answers a random challenge in an illustrative cave | Explain what repeated challenges illustrate and state the limits of the analogy | Animated | 2 |
| 48 | Test a proof analogy | Let students predict a verification outcome | Fixed challenge-response sequence comparing honest and dishonest prover behaviors | Explain why an unpredictable challenge matters in this illustrative model | Animated | 3 |
| 49 | Proofs in a ledger | Tie the primitive back to blockchains | A ledger checks a proof of a private eligibility condition against a public statement | Identify what is proven, what remains public, and what separate metadata may reveal | Static | 2 |
| 50 | MPC, FHE, ZKP compared | Choose by problem and trust model | Three illustrated workflows show who holds data, computes, decrypts, or verifies | Compare information flow, assumptions, and outputs | Static | 2 |
| 51 | Combining primitives | Show complementary roles | A threshold keyholder group, an encrypted tally, and a proof of input validity | Walk through an illustrative voting design and explain that each component serves a distinct purpose | Static | 3 |
| 52 | Privacy recap | Connect to Part I and hand off | A shared ledger sits beside a diagram showing who learns which fields | Ask which trust and disclosure assumptions remain after choosing a technique | Static | 2 |

## Part III — Ask Me Anything (30 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 53 | Ask Me Anything | Invite and sustain discussion | Three stick figures holding question bubbles about agreement, privacy, and applications | Take audience questions and use prompts to seed discussion if needed | Static | 27 |
| 54 | Closing | Leave a practical design question | The notebook and envelope from the title return | Ask students to name who must agree and what each participant needs to learn | Static | 2 |
| 55 | References | Leave paths for follow-up | Readable grouped citations for distributed agreement, ledgers and interoperability, and cryptography | Point students to primary papers and specifications | Static | 1 |

## Review notes

Owner decision (25 Nov 2026): the lecture uses static or presenter-paced scripted animated slides only. No live audience/presenter inputs that change the educational model, branching buttons, live cryptographic computations or worker searches are required. Preserve ordinary playback/navigation/seek/reset controls, verbal audience predictions, local offline operation and editable art. Use internally consistent authored examples. Identify simulated outputs in speaker notes and prompt the presenter to disclose them verbally. Keep substantive technical labels and essential toy-model caveats on slides. This supersedes earlier interactive and real-computation requirements. Slide 6 scripted correction merged in PR #19; preserve archived diagnostic/staging routes. M5d is approved and merged in PR #21; #20 closed. M5e production is approved and merged in PR #23; #22 closed. M5f production (22–26) is owner-approved and merged in PR #25; #24 closed. All 32 Part I slide concepts and production implementations are owner-approved and merged. M5g merged in PR #27 at `899e3529f4b80b33bbc0d4bceb5d6e258311079d`; #26 closed. M5h merged in PR #29 at `9508df8788c8ced442b634b633d53d2de8606e90`; #28 closed. M5i integrated Part I review owner-approved and merged in PR #31 at `2e1d13fff3bb0dfa852a2860a8aaad525f117262`; #30 closed. Part I checkpoint complete. Part II creative planning requires separate owner authorization; no Part II implementation authorized. Later batches require separate authorization.

Current baseline: 32 approved Part I concepts (all production merged), provisional Part II 33–52 and Part III 53–55, 55 overall if unchanged. No interactive production slides. M5g production approved and merged in PR #27. M5h approved and merged in PR #29. M5i review owner-approved and merged in PR #31; #30 closed. Part II and III remain provisional; begin M6 concept review only on owner authorization. See CONTINUATION.md.

Confirm the precise CAP failure model, the Two Generals progress requirement, the oral-message protocol and boundary examples, Bitcoin's security assumptions, the CometBFT example, and the privacy guarantees of later toy models. The complete lecture bibliography belongs to M7.

### Pedagogical references

3Blue1Brown's problem-driven progression is a teaching reference for the Bitcoin segment. Use an original cast, examples, visuals, staging, dialogue, and humor. [Video](https://www.youtube.com/watch?v=bBC-nXj3Ng4) · [Companion lesson](https://www.3blue1brown.com/lessons/bitcoin/)

### Primary technical references

- CAP and coordinated action. [Gilbert and Lynch, Brewer's Conjecture](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf) · [Halpern and Moses, Knowledge and Common Knowledge in a Distributed Environment](https://arxiv.org/abs/cs/0006009)
- Oral-message model, Byzantine agreement, and OM. [Lamport, Shostak, and Pease, The Byzantine Generals Problem](https://lamport.azurewebsites.net/pubs/byz.pdf)
- Bitcoin authorization, Proof of Work, incentives, and confirmation risk. [Nakamoto, Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf) · [Bitcoin Core validation](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp) · [Bitcoin Core chain work accumulation](https://github.com/bitcoin/bitcoin/blob/master/src/node/blockstorage.cpp)
- SHA-256. [NIST FIPS 180-4](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- Consensus and interoperability examples. [CometBFT consensus specification](https://github.com/cometbft/cometbft/blob/main/spec/consensus/consensus.md) · [Cosmos SDK staking module](https://github.com/cosmos/cosmos-sdk/blob/main/x/staking/README.md) · [IBC client semantics](https://github.com/cosmos/ibc/blob/main/spec/core/ics-002-client-semantics/README.md) · [IBC relayer algorithms](https://github.com/cosmos/ibc/blob/main/spec/relayer/ics-018-relayer-algorithms/README.md)
