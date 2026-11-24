# Provisional storyboard

The sequence assumes a college audience with mixed familiarity with distributed systems and cryptography. Times include setup, speaker explanation, and brief audience responses. A static slide can still prompt discussion. Animated slides use presenter-controlled checkpoints. Interactive slides give the presenter an input that changes the model while the audience predicts the outcome. Times and scene treatments are rehearsal estimates.

## Part I — The Problem of Trust (45 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1 | The Science of Trustless Systems | Introduce the two halves | Title flanked by a shared notebook and a sealed envelope | Ask what people must agree on and what they should be allowed to see | Static | 1 |
| 2 | A single point of failure | Motivate distribution | Three-panel comic about a campus club whose only ledger keeper is absent | Elicit what stops working when a service depends on one component | Static | 2 |
| 3 | Why distribute? | Show practical motivations | Service desks across a campus share load and cover a closure | Explain latency, capacity, and fault tolerance as reasons to distribute | Static | 2 |
| 4 | Centralized, distributed, decentralized | Separate deployment from control | Identical server maps overlaid with different decision-making lines | Show how multiple machines can still answer to one operator | Static | 2 |
| 5 | CAP during a partition | Introduce the trade-off | A broken bridge between two replica desks interrupts a read after a write | Explain the tension between linearizable consistency and the theorem's availability requirement during a partition | Animated | 2 |
| 6 | Replica decision | Let students predict outcomes | Presenter chooses to return a local value or wait after a scripted write | Trace what each policy sacrifices in this scenario | Interactive | 2 |
| 7 | Two Generals | Show uncertainty under message loss | Two hilltops, a courier, and successive acknowledgments | Step through the last-message uncertainty when any message may be lost | Animated | 3 |
| 8 | Byzantine Generals | Introduce arbitrary behavior | One messenger's sender gives different orders to two recipients | Distinguish equivocation from message loss and motivate explicit fault assumptions | Animated | 2 |
| 9 | The ledger | Establish the shared record | A campus token notebook with two contributors | Ask who checks entries and who decides their order | Static | 2 |
| 10 | Bitcoin architecture | Assign roles | Wallets, peer nodes, and miners exchange transactions and blocks | Trace broadcast, independent validation, and block production | Static | 2 |
| 11 | Digital signatures | Explain authorization | A transaction and signature pass through a public-key verifier | Explain what verification establishes about the signed data and key | Static | 2 |
| 12 | Cryptographic hashes | Explain hash commitments | Two nearly identical inputs receive visibly different fingerprints | Introduce fixed-size digests and the practical difficulty of finding a collision | Static | 2 |
| 13 | Hash chains | Show links between blocks | Editing an old card breaks its successor's recorded link | Distinguish detecting a change from resisting a rewritten history | Animated | 2 |
| 14 | Mining and Proof of Work | Show search and verification | A miner tries header variants until a digest meets the target | Explain the search, the target check, and the separate validation of the block | Animated | 2 |
| 15 | Two valid tips | Set up fork choice | Two miners publish valid blocks close together, producing different local views | Explain how propagation can leave nodes with different tips temporarily | Animated | 2 |
| 16 | Nakamoto consensus | Explain convergence | One branch accumulates more work as nodes receive new blocks | Trace selection by cumulative work among valid chains | Animated | 2 |
| 17 | Double spending | Explore conflicting payments | A toy merchant waits while the presenter advances a scripted competing history | Explain why conflicting spends cannot both persist in one valid history and why a reorganization matters | Interactive | 3 |
| 18 | Probabilistic finality | Set confirmation expectations | Extra blocks accumulate over a merchant's transaction | Relate confirmation depth to reversal risk under the model's assumptions | Static | 2 |
| 19 | Proof of Stake | Compare participation costs | Bonded validators sit beside a rulebook for one example protocol | Describe stake-weighted participation and qualify penalties and finality by protocol | Static | 2 |
| 20 | BFT protocols | Compare agreement mechanisms | Validators collect votes under a quorum rule | Introduce explicit fault and timing assumptions, and explain that BFT voting can be paired with PoS | Static | 2 |
| 21 | Why interchain communication? | Motivate verification across ledgers | Two islands keep independent notebooks | Ask what one chain needs to verify about an event on another | Static | 2 |
| 22 | IBC, light clients, and relayers | Follow a message across chains | A relayer carries a packet and proof to a chain that checks them using its client state | Separate transport from verification and name the client's trust assumptions | Animated | 2 |

## Part II — The Problem of Privacy (45 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 23 | Why blockchain privacy matters | Make exposure concrete | A public payment board makes an individual's routine visible | Ask what observers infer from the data and metadata | Static | 2 |
| 24 | Anonymity, pseudonymity, confidentiality | Distinguish privacy properties | An unmarked mask, a reusable alias, and a sealed envelope | Ask which observer can identify participants, link records, or read content | Static | 2 |
| 25 | Ancient ciphers | Begin the historical thread | A courier carries a message written using a toy substitution wheel | Explain the shared rule and where secrecy resides in this example | Static | 2 |
| 26 | Frequency analysis | Show how structure survives substitution | Letter counts accumulate beside a sample ciphertext | Explain why a long enough monoalphabetic sample can leak useful language patterns | Animated | 2 |
| 27 | Mechanical encryption | Show how transformations can change | A rotor machine turns one step as a letter is entered | Illustrate changing substitutions and distinguish mechanism from security guarantees | Animated | 2 |
| 28 | Public-key cryptography | Change the key-distribution model | A public padlock and a private key sit beside the earlier shared wheel | Explain public-key encryption roles and distinguish them from signing roles | Static | 2 |
| 29 | Computing with private inputs | Set up the comparison | Three students want an aggregate while keeping individual values private | Ask who holds inputs, what output is allowed, and who should learn it | Static | 2 |
| 30 | Multiparty computation (MPC) | Introduce joint computation | Participants pass sealed slips and assemble a shared result | Frame privacy relative to the protocol, adversary model, and revealed output | Static | 2 |
| 31 | Shamir's Secret Sharing | Explain a threshold | Points appear on a line in a labeled toy finite-field example | Explain reconstruction in a two-of-three example and connect it to threshold sharing | Animated | 3 |
| 32 | Reconstruct the secret | Let students test the threshold | Presenter toggles which share cards are visible | Contrast one share with two distinct shares and explain that sharing is a building block for MPC | Interactive | 3 |
| 33 | Homomorphic encryption | Introduce ciphertext computation | A sealed calculator returns an encrypted result | Trace encryption, evaluation of a supported operation, and decryption | Static | 2 |
| 34 | From homomorphic operations to FHE | Explain expressiveness | Encrypted values move through several circuit gates | Explain evaluation of general circuits and introduce supported operations and practical cost | Animated | 2 |
| 35 | Outsourced private computation | Ground FHE in a workflow | An analyst sends encrypted records to a compute service and receives encrypted output | Identify key ownership, authorized decryption, and what the workflow needs to reveal | Static | 2 |
| 36 | Zero-knowledge proofs | Introduce proof without revealing the witness | A prover and verifier stand beside a public claim card and a private witness card | Define statement and witness, then distinguish completeness, soundness, and zero knowledge | Static | 3 |
| 37 | Challenge and response | Build intuition for verification | A prover who knows a secret door route answers a random challenge in an illustrative cave | Explain what repeated challenges illustrate and state the limits of the analogy | Animated | 2 |
| 38 | Test a proof analogy | Let students predict a verification outcome | Presenter picks a challenge in the cave model and steps through two scripted prover behaviors | Explain why an unpredictable challenge matters in this illustrative model | Interactive | 3 |
| 39 | Proofs in a ledger | Tie the primitive back to blockchains | A ledger checks a proof of a private eligibility condition against a public statement | Identify what is proven, what remains public, and what separate metadata may reveal | Static | 2 |
| 40 | MPC, FHE, ZKP compared | Choose by problem and trust model | Three illustrated workflows show who holds data, computes, decrypts, or verifies | Compare information flow, assumptions, and outputs | Static | 2 |
| 41 | Combining primitives | Show complementary roles | A threshold keyholder group, an encrypted tally, and a proof of input validity | Walk through an illustrative voting design and explain that each component serves a distinct purpose | Static | 3 |
| 42 | Privacy recap | Connect to Part I and hand off | A shared ledger sits beside a diagram showing who learns which fields | Ask which trust and disclosure assumptions remain after choosing a technique | Static | 2 |

## Part III — Ask Me Anything (30 minutes)

| # | Topic | Purpose | Visual idea | Speaker objective | Type | Min |
| ---: | --- | --- | --- | --- | --- | ---: |
| 43 | Ask Me Anything | Invite and sustain discussion | Three stick figures holding question bubbles about agreement, privacy, and applications | Take audience questions and use prompts to seed discussion if needed | Static | 27 |
| 44 | Closing | Leave a practical design question | The notebook and envelope from the title return | Ask students to name who must agree and what each participant needs to learn | Static | 2 |
| 45 | References | Leave paths for follow-up | Readable grouped citations for distributed agreement, ledgers and interoperability, and cryptography | Point students to primary papers and specifications | Static | 1 |

## Review notes

The provisional mix is 28 static, 13 animated, and 4 interactive slides. The title and single-point-of-failure comic are static and Two Generals is animated, matching the three M4 prototypes. Rehearsal will set pacing and confirm which explanations fit the audience.

Technical review should confirm the precise CAP failure model, the assumptions behind finality and BFT examples, the IBC client example, and the privacy guarantees of each toy model. Initial references for two Part I topics include [Gilbert and Lynch's CAP paper](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf) and [the Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf). The complete lecture bibliography belongs to M7.
