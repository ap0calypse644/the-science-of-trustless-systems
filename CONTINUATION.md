# Project continuation — 25 November 2026

This is the canonical restart point for a new ChatGPT or local Codex session. Read [AGENTS.md](AGENTS.md), [README.md](README.md), [ROADMAP.md](ROADMAP.md), [DESIGN.md](DESIGN.md), [ARCHITECTURE.md](ARCHITECTURE.md), and [STORYBOARD.md](STORYBOARD.md). This file records owner-approved creative decisions and supersedes conflicting older prototype visual ideas. It is a planning checkpoint, not permission to implement everything.

## Goal and workflow

A live college guest lecture, **The Science of Trustless Systems**, nominally two hours: Trust (roughly 45 min), Privacy (roughly 45 min), AMA/closing (roughly 30 min). The current 48-slide storyboard is accepted as a starting point, not a contract. Add, remove, split, combine and reorder as the teaching narrative develops. Timing is guidance, not an examination or hard acceptance threshold; prioritize understanding, discussion, humor and accuracy. Do not force every topic into its initial time allocation. Keep slides sparse, projector-readable and visually engaging; put rigor, assumptions, caveats and sources in speaker notes. Pick static/animated/interactive treatment according to the teaching idea, not quotas.

Owner approves creative direction, visual results and milestones. ChatGPT is the creative director, architecture/review partner and GitHub issue/PR coordinator. Local Codex implements and tests only explicitly authorized scopes. Use GitHub issues as implementation briefs and PR comments for build/test reports, review findings and corrections: do not require the owner to copy huge prompts, logs, diffs or reports between tools. After Codex posts a report and the owner says done, retrieve the issue/PR and inspect the actual code and results; request corrections in the PR if necessary; merge only after explicit owner review. Keep original issue scope and approval boundaries; do not start future work merely because it is documented. Keep repo documentation up to date so a fresh chat can recover state from GitHub. Warn the owner when chat context appears to be getting long, but do not claim access to an exact chat capacity meter.

## Engineering checkpoint

- M0, M0.1, M0.2 and M1 complete; expressive minimalism D on pure white approved.
- M2 illustration library: issue #4, PR #5, merged at 6e4ae7dbfaa55b53cf3070c806f25a9b88642fa4. Approved gallery; facepalm hand continuity corrected; final browser tests reported 17/17 each. Reuse the library, not the rough chat sketches.
- M3 presenter engine: issue #6, PR #7, merged at 8895480554c7d2775cf7df9c7ab85196d6e6f6ba. Automated checks reported 27/27 per browser, owner confirmed all ten desktop Firefox manual checks. Physical projector and dual-monitor rehearsal remain M8. Owner-approved M4a is merged in PR #9. Slides 1–2 are available at /talk/.
- Stack: Reveal.js, TypeScript, Vite, local GSAP, local fonts/assets, deterministic authored SVG. Firefox primary, Chromium compatibility. Preserve diagnostics at /, /review/, /library/, /engine/. See architecture for actual APIs.
- Engine: paused on entry/revisit; only active scene runs; independent slide navigation and scene playback; deterministic seek/reset/checkpoints; clean resource teardown. Left/Right slide navigation, Space play/pause, R reset, J/K checkpoints, Minus/Plus global speed, H controls, F fullscreen, S notes, Escape overview outside fullscreen; preserve native focus behavior. Speaker view preview shows baseline frame. No autoplay advance. Test offline with off-origin requests blocked.
- M4 is approved and merged, including slide 7 in PR #11. M5a and M5b are approved and merged in PRs #13 and #15. Main checkpoint `ea8fec8f786a0bdce8400869197f46266871ff2c` has production slides 1–8. Under issue #16, the owner approved the 17 revised M5c stills at `/talk/m5c/` and authorized production. Draft PR #17 on `feature/m5c-cafe-ledger` adds production slides 9–13 for final owner review. The M5b reference remains at `/talk/m5b/`. M5 completes Part I, M6 covers Part II, M7 covers AMA/closing/references, and M8 covers rehearsal and offline/PDF delivery.

## Visual rules (approved)

Pure white #FFFFFF canvas, near-black #222 ink, sparse accents blue #527DA8, green #62966B, red #C95650, yellow #E9B949, purple #9276B5, neutral #E5E7EB. Pair state color with shape/label/line cues. Original expressive stick figures, not chibi or detailed human anatomy. Alice: blue scarf, tied-back hair, practical. Bob: green accessory, curls/glasses, analytical. Charlie: purple accessory, angular hair, expressive mischief or accidental chaos as appropriate. Alice/Bob/Charlie; Eve for eavesdroppers, Mallory for explicitly malicious actors. Kalam major headings, Patrick Hand speech/annotations, system sans technical labels; local assets with license notices. Vary headings/composition across slides; do not repeat the title slide's dramatic lettering everywhere. No overarching franchise theme. Pop culture is occasional; slide 5 is a specific owner-approved exception to original-only artwork, subject to asset rights.

Use internationally relatable examples, no India-specific or other demographic-specific localization, no samosas anywhere in the slides, and neutral currency units (including slide 6). Coffee, sandwiches and ordinary transactions are acceptable. Preserve existing approved mechanics and compositions.

## Approved slide decisions (1–10, unchanged numbering)

Concept approval is distinct from approval of finished rendered slides. Chat-generated images and rough SVG/widget sketches were visual references, not production assets or validated code. Recreate editable original scenes in HTML/CSS/SVG with M2 characters. Use approved concept images as direct visual references whenever available. The images stay outside the repository, and the descriptions below preserve the durable design decisions. Do not substitute one of the rejected variants.

### 01 — The Science of Trustless Systems (static)

Owner explicitly prefers the ORIGINAL handshake illustration over all three later refined alternatives. Lock the original composition, not a new reinterpretation.
- 16:9 white canvas. Two enormous hands reach diagonally toward each other: blue-cuffed open hand entering from lower-left and a purple-cuffed reaching hand with four fingers and a thumb from upper-right. They do not touch.
- In the gap, a playful engineered trust contraption: ropes/pulleys, small scaffold, gears, yellow envelope, ledger/document, lock/verification motifs. Tiny Alice, Bob and Charlie actively operate the mechanism; they are not spectators. Retain charming mechanical complexity with clear silhouette and legibility.
- Bold expressive handwritten title integrated in lower-right open space, gold underline. Strong diagonal/asymmetrical hierarchy; preserve negative space. No subtitle overload.
- Reject the earlier ledger/envelope ensemble, trust-fall/bridge alternatives and later more symmetrical simplified handshake variants. This is the one owner-selected reference (chat generation ID 4f629dca-abef-4408-9818-6313b09d25d1; identifier is not a publicly accessible URL).
- Editable SVG and local typography, not a flattened generated slide. Notes introduce the two questions: how do we agree, and what information must we reveal?

### 02 — One plug to rule them all (static)

Owner selected concept C, "One plug to rule them all," then approved the cleaner second reference with a heading change.
- The sole heading is **One plug to rule them all**. The topic and slide ID `02-single-point-of-failure` describe the single point of failure.
- White canvas, restrained component count, large readable composition. A few computers/services all plug into one central power strip. Clearly trace each cable from a separate device into the strip; no strip-to-itself connection or confusing phantom cable.
- The strip has exactly one upstream power lead ending in a visibly disconnected plug near a wall socket. Charlie has unplugged it and plugged his phone charger INTO THE WALL SOCKET instead; phone connected to charger. All dependent devices are down; Alice and Bob react. Show the physical disconnection and dead equipment unambiguously. No phone charger plugged into dead strip; no second live strip supply.
- Latest reference: one_plug_many_systems_down.png, generation ID 47e53b19-b61a-46ff-a8d4-b68f1dc6ba5b. Reject initial busier reference. Title change is intended in authored code, not another image generation.
- Ask why so many computers stopped together; the shared dependency is the answer.

### 03 — Why distribute? (static)

Owner selected B, continuation of slide 2. Latest correction overrides intentional sabotage and disappointed-villain versions.
- Three separately powered service/server clusters; each independently functional and connected to a replicated/redundant service arrangement, no shared single power strip. Clear service paths and failover cues.
- Charlie ACCIDENTALLY trips over a cable and disconnects one cluster. Mid-stumble or post-stumble, dismayed/apologetic expression. Not deliberately cutting/pulling a cable, not charging his phone, not disappointed that his sabotage failed.
- One cluster is visibly down; two are up; Alice and Bob continue working. Use explicit healthy/down cues, not color alone. The service remains accessible via surviving clusters. Do not imply distribution automatically guarantees fault tolerance; appropriate replication/failover and independent failure domains matter.
- Primary visual lesson resilience. Speaker explains sharing load/scalability and geographically closer service/lower latency verbally as other motivations. Do not cram three separate diagrams into the artwork. Heading Why distribute?; optional subtitle only if useful (earlier Charlie-proof infrastructure subtitle is not required and may clash with the accident).

### 04 — Centralized, Distributed, Decentralized (static)

Owner chose rough composition A, not the puppet-master C or food-analogy B. Replace rough placeholder stick figures with polished approved M2 characters.
- Three side-by-side panels, large clear labels. Panel 1: crowned Charlie controls a single server used by several clients. Panel 2: crowned Charlie controls three interconnected servers used by clients. Panel 3: Alice, Bob and Charlie each independently operate an interconnected server, no crowns.
- Panels 2 and 3 should use identical infrastructure geometry/client links, so the contrast is authority, not hardware. Crown = centralized authority; dashed control lines distinguish management from network connections. No crown in decentralized example.
- Label panel 2 distributed but centrally controlled; explain that deployment and governance are different axes, not mutually exclusive categories. Independent operators do not automatically imply decentralized decision-making; consider shared rules, governance and actual control. Use the simple three-panel visual, not a detailed network topology lesson.

### 05 — The CAP Theorem (static)

Owner explicitly wants the REAL three-Spider-Man pointing meme from the internet, not a custom drawing, animation or generated imitation. Static white slide, large recognizable three-way pointing image with HTML/CSS overlay labels: left Consistency, middle Availability, right Partition Tolerance. Heading The CAP Theorem.
- Reference origin: https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man/ . Original 1967 cartoon meme has two figures; use the familiar three-character adaptation. The owner authorized bundling the exact three-character edit from Imgflip template 206014687, JPEG 600×551. See README for the file and provenance. The editor and redistribution rights remain unverified. The file is excluded from the repository’s original-art license claims.
- The production slide uses the locally bundled JPEG with attribution in the notes and README. The owner’s project authorization does not establish permission from the third-party rights holders. No runtime CDN or remote image dependency.
- Meme introduces three terms, then slide 6 explains the actual dilemma. Do NOT teach "pick any two." During a partition, linearizable consistency and CAP availability cannot both be guaranteed. Availability concerns every request to a non-failing node receiving a response, not simply uptime or an arbitrary error. Partition tolerance concerns lost/delayed communication. Keep these precise model caveats in notes.

### 06 — Consistency or Availability? (interactive animation)

Owner approved banking scenario after the meme. Two bank branches A/B, one replicated account; Charlie visits both. White background, M2 cast, large balances, no excessive text. Presenter-paced checkpoints and actual branching choice; no autoplay navigation.
1. Both replicas synced at 1,000 units; connected network.
2. Break the link, show failed network messages; both branches still running.
3. Charlie withdraws 1,000 units at A; A accepts and records 0 units, B still stores 1,000 units. Show cash received, completed write before the next read.
4. Charlie walks to B and asks his balance; B cannot establish the latest balance from its local state.
5. Pause for audience debate; two choices: return 1,000 units, or wait until authoritative synchronization. Returning stale value demonstrates a consistency violation for this completed read while answering it. Waiting indefinitely through a partition sacrifices availability for this request, but avoids a stale read. Do not imply that either branch by itself proves a complete protocol's CAP guarantees.
6. Allow stepping back/replaying the decision and exploring both paths, then restore connection, synchronize to 0 units, and complete any waiting read. Explicit reset restores all values, link, Charlie, branch state and pending requests.
- Use the established engine and deterministic state transitions; accessible controls, visible checkpoint names, repeatable back/forward/reset. The rough chat widget had a branch-index/display bug; do NOT copy its code. Build explicit state machine and test both branches, restore, reset, revisit, seek/checkpoint transitions and keyboard focus.
- Notes: simplified read-after-write history, not a complete banking protocol. The consistency-prioritizing design could have refused the earlier write instead; illustrate the local dilemma without claiming a particular real bank architecture. Distinguish linearizability from eventual convergence and CAP availability from uptime. Use clear local balance vs returned value labels.
- Print still: partitioned A=0 units/B=1,000 units with both decision outcomes readable.

### 07 — Two Generals Problem (animated)

Owner approved the medieval battlefield combined with split-perspective thought bubbles (A+B). Retain the same white canvas and expressive cast.
- Alice and Bob command armies on opposing hills; an enemy fortress occupies the valley. Both must attack together or neither should attack. Charlie is an honest courier, not a traitor. More couriers and increasingly exhausted Charlie variants provide the escalating comedy; no graphic violence.
- Persistent landscape, short dialogue and local-knowledge thought bubbles above each general. The audience sees deliveries/losses, but neither general has access to the other's local view. Avoid clutter and avoid implying a reliable visual signal between hills.
- Preserve the eight named checkpoints in STORYBOARD.md: setup, send plan ("Attack at sunrise!"), lost plan, retry delivered, acknowledgment sent ("Agreed!"), lost acknowledgment, further acknowledgments, final-message argument. Give the presenter prediction pauses and reversible comparisons. Escalate acknowledgments and courier traffic for humor, then freeze and compare otherwise identical executions with/without the final delivered message.
- Final takeaway: knowing is not enough; each must know that the other knows, recursively (common knowledge). Explain the finite final-message removal argument and the safety/progress assumptions in notes. Honest participants, unreliable delivery; no finite exchange guarantees both coordinated action in some run and no unilateral action in any run.
- A protocol diagram may support the final explanation if helpful, not replace the battlefield. Print still should preserve the delivery/loss contrast and local knowledge. Issue #10 retains the approved stills at /talk/staging/, with the raised title and Charlie’s “I give up…” bubble in the lost-reply still. The owner approved the production slide at /talk/#/07-two-generals, merged in PR #11.

### 08 — Byzantine Generals Problem (scripted animation)

- **There's a traitor among us** is a medieval sequel to slide 7. Show the upright fortress in the middle ground from a slightly elevated viewpoint. Give Alice and Bob separate near-side hills, Mallory a rear hill, and Charlie a front hill with clear space below the fortress. Draw message paths between Alice and Bob in the foreground.
- Alice is the loyal commander in the fixed example. Mallory is a malicious peer who misreports Alice’s order under Mallory’s own identity. Bob first reads Alice’s Attack order, then sees Mallory report Retreat.
- After forwarding, show Bob’s reports in a three-general table. The tie defaults to Retreat, contrary to Alice’s order. In a separate four-general run, Charlie joins as a loyal general. Bob and Charlie each have a direct Attack and an honest forwarded Attack. Mallory tells Bob Retreat and Charlie Attack. Both loyal recipients decide Attack.
- Explain the conditional oral-message bound and the distinction between agreement and validity in notes. The three-general tie illustrates a particular failure. The general impossibility requires the indistinguishability argument.
- The latest owner direction calls for scripted animation using the existing presenter controls. The owner approved the production sequence and PR #15 is merged. Minor cosmetic refinements are deferred to final polish. Transition to agreement on a shared ledger without implementing slide 9.

### 09 — A Shared Ledger (animated)

Owner first split café debt crisis (A) and ledger reveal (C) into 9A/9B, then explicitly merged them into one animated slide. Original numbering restored.
- Café setting with Alice, Bob, Charlie, coffee, sandwiches/ordinary food, receipts and IOUs; internationally relatable, no demographic-specific localization. Confusion over who paid whom and small repayments escalates, then Alice proudly introduces a shared notebook.
- In the second staging still `09-receipt-chaos`, Bob (centre, green accessory) must say “I paid yesterday”. Keep Alice’s question. Charlie’s receipt line may remain if it fits. Suggested checkpoints: café, confusion, receipt chaos, Alice's idea, notebook reveal with organized transaction entries, resolution. A gentle zoom into the notebook is preferred proposed staging, not a required exact camera implementation.
- Notebook becomes recurring prop in slides 10 onward. Make it big and readable; keep arithmetic consistent, explicitly establish initial balances/issuance and distinguish transfers from debt accounting when moving to a toy currency. Neutral amounts, no national currency symbols. Print still may show problem and solution.
- Takeaway: a common transaction record solves the memory problem, not authorization or trust. No early Bitcoin terminology.

### 10 — Unauthorized transactions (animated)

Owner approved Charlie mischievously trying to add a fake payment involving Bob, Bob getting mad, then Bob adding a signature to his own legitimate entry. Owner approved a stylized signature scribble beside that entry.
- Same café and ledger. Charlie grins while trying to write "Bob pays Charlie 20" (suggested wording). Bob objects ("I never approved that!"), then writes a genuine entry and attaches a recognizable signature scribble. Alice recognizes the need for authorization. Use a distinct legitimate entry if needed to avoid implying Bob authorized the fake one.
- Suggested presenter checkpoints: shared ledger, fake entry, Bob's angry objection, Bob signs his own entry, contrast unauthorized and authorized entries. Final still contrasts rejected unsigned fake and signature-verified legitimate entry (authorization check, not blanket transaction validity).
- Signature scribble is an illustrative metaphor, not a real secure signature. Speaker verbally explains private-key signing, public-key verification, key/identity association, binding to message content, and why copying a handwritten mark is insecure. A valid signature can be replayed and does not guarantee sufficient funds or other transaction validity; these checks motivate slide 11.
- Discarded separate 10B signatures/hash explainer. Do not add it. Keep the dedicated hashing slide 14 and its real SHA-256 demo. Original slide numbering unchanged.


## Approved slide decisions (11–25, final Part I numbering)

The 25 November 2026 second creative checkpoint locks all Part I concepts. Old 17A/17B/17C become 17/18/19; old 18–46 become 20–48. Slides 1–16 unchanged in numbering. These briefs override earlier visual alternatives and rough prototypes. All amounts, exact dialogue and timing are illustrative unless explicitly locked. No implementation authorization is implied.

### 11 — The Infinite Money Glitch (static)
- Approved oversized order option A, transplanted into the established café. Charlie grins at an absurd pile of ordinary food/drinks, presents a properly signed payment (e.g. 500), yet has only 5 units. Bob objects; Alice thoughtful. Possible lines: “You only have 5 units, Charlie.” / “It's signed. What's the problem?”
- Show signed but rejected, clear balance vs requested amount. No credit/overdraft in toy rules. Keep the signature metaphor and neutral units. Acceptance: readable, arithmetic consistent; authorization and validity visibly separate.

### 12 — Who Controls the Ledger? (animated)
- Approved B → A → C, one café animation. Alice takes only notebook away; Bob and Charlie cannot access it. Charlie offers replacement stewardship, crowns himself and charges a fee for access (callback to slide 4). Everyone then maintains their own copy, independently checks signatures/rules.
- Checkpoints: missing ledger, access monopoly, replication. Keep censorship/unilateral-control risk in notes. No solution to ordering yet; transition asks how copies agree. Print still/sequence shows the three stages.

### 13 — The Double-Spend Problem → We Are Back to the Generals (animated)
- Latest owner feedback: do not spoil the battlefield reveal by using “We Are Back to the Generals” during the café phase. Proposed new opening title is **The Double-Spend Problem** (exact wording approved with revised staging). Change to **We Are Back to the Generals** only at the final battlefield reveal. One animated slide, unchanged numbering.
- A → B → C: start with Charlie holding 20 units; two genuinely signed payments of 20 each, one to Alice and one to Bob. Each receives their own first, validates against its local initial state, tentatively accepts; later receives and rejects the conflicting payment. Compare the two accepted local histories side by side. Owner removed the separate `13-conflicting-histories` still/checkpoint; do not show the rejected-attempt overlay as a separate beat. Preserve the rejected payments in model and notes; the `13-local-acceptance` frame already shows the divergence.
- Final animation explicitly approved: café fades; each notebook transforms into the SAME messenger note asset from slide 7–8; hilltops rise; castle rises in the middle; return to general roles with contradictory notes and Charlie's grin. Reuse battlefield geometry. No “We need consensus”, takeaway overlay, or explanatory closing text. Leave visual callback to speaker; no irreversible settlement implied. Distinguish fault models verbally.
- Checkpoints: common balance, two signatures, local acceptance, medieval transformation, final battlefield/title reveal. Verify both histories individually valid and mutually exclusive.

### 14 — Giving Data a Fingerprint (interactive)
- A + B: abstract hashing machine from editable input to actual SHA-256 digest; same input repeats same output; change one character, expand digest to 256-bit grid, mark flipped bits vs baseline and count exactly. Real arbitrary UTF-8 text hashing, including punctuation/empty text; no hardcoded chat preview digests. Show fixed length and reset. Use simple clear layout and non-color change cues.
- Checkpoints: input, hash, repeat, edit, avalanche, free experiment. Explain collision resistance/preimage resistance and that hashing is not encryption; trusted prior commitment needed for tamper evidence. Baseline selection and output format visible. End by asking for a leading-zero hash, then simplify machine for next slide.

### 15 — Prove That You Have Done Some Work (interactive)
- Revised owner-approved 3Blue1Brown-inspired design supersedes gears/dashboard and hexadecimal puzzle. Show stationary signed ledger batch, append changing nonce at bottom, simple hash function, binary output. Failed attempts then valid leading-zero result, highlight required bits. Minimal hideable presenter controls, not dashboard. Use original art/examples; video and companion lesson teaching references only.
- Real local hash search on documented unambiguous serialization of batch + nonce; variable leading ZERO BITS (not hex digits), manual step plus start/pause/resume/stop/reset, current nonce/hash/attempts, independent recomputation, responsive worker or bounded async batches, cancellation/cleanup on edit, navigation and reset. Difficulty default should finish reliably during class; larger targets optional. Expected attempts 2^d, random luck not exact work count. Never fabricate successful nonce/digest. Tampering changes input, verify old proof again; use a verified example where target fails, not assertion every edit must fail.
- Checkpoints: challenge, manual guesses, real search, success, change difficulty, one-hash verification, modify input. Label educational simplification: Bitcoin double-SHA-256 header hash vs numeric target. No requirement to emulate all header fields.

### 16 — Building a Blockchain (animated)
- Revised mathematical design supersedes Charlie edit comic; physically divide existing signed ledger into pages, form batches, add nonce, link predecessor digest into top of next block, mine with predecessor included. If demonstrating standalone work before links, visibly re-mine after predecessor field is added; do not imply existing nonce stays valid. Reveal blockchain name after links. Use binary digest snippets consistent with slide 15.
- Modify old transaction, show changed commitment/header hash and immediate successor mismatch; repairing links sequentially changes later header inputs and requires new work to compete. Do not mark untouched descendant links broken until affected predecessor is updated. No stick figures or explosion during core diagram. Final transition may bring back exhausted Charlie/failed hashes to start 17 (preserve approved 17 opening; no need for Charlie during technical sequence). Use consistent computed data or clearly labeled illustrative digest prefixes. Speaker notes: Merkle root, previous hash, other header fields, double SHA-256, security assumptions. No “impossible to modify.”
- Checkpoints: divide, proof, predecessor insertion and mining, extend, edit, propagate repair. Print still depicts linked pages and consequences.

### 17 — Why Would Anybody Do All This Work? (animated; old 17A)
- Start exactly from prior narrative: Charlie frantically re-mines affected blocks, surrounded by discarded hashes, exhausted; Bob watches. Ask audience “Why would anybody voluntarily do all this work?” No reward answer yet. Short animated setup, hold final question. Café/character props as appropriate.

### 18 — Rewarding the Miner (animated; old 17B)
- 3Blue1Brown-like abstract ledger/block view. Miner inserts special permitted self-funding transaction at top of candidate block BEFORE mining; find valid proof; other participants validate and accept block; show reward. Newly issued subsidy, protocol-controlled amount; not arbitrary printing. Illustrative neutral amount. Speaker may name coinbase transaction, reward maturity and actual Bitcoin implementation only if useful. No fee explanation until next slide.

### 19 — Transaction Fees (static; old 17C)
- Back at café, Bob and Alice pay Charlie for maintaining ledger/inclusion of their transactions. Show small fees attached to transaction submissions, not gatekeeper access monopoly. Existing units transfer as fees rather than new issuance. Reward/fees conditional on accepted block. Distinguish the two revenue sources verbally.

### 20 — The Battle of Two Histories (animated; old 18)
- B → A → C. Reuse slide 13's conflicting Charlie payments. Alice/Bob find valid blocks near-simultaneously extending same tip, each includes one payment. Different participants see different blocks first. Extend one branch, compare cumulative work, adopt valid greater-work branch after propagation, displaced Bob payment loses confirmation and is incompatible with adopted spend. No explicit summary on screen.
- Then Charlie mines an alternative history while public chain grows; demonstrate confirmations and why catching up gets harder under honest hash-power/network assumptions. Equal work per block explicitly labeled when using length proxy; no exact attack probability or finality promise. Checkpoints common tip, competing blocks, local views, extension, reorg, confirmations/rewrite. Use slide 16 page geometry and colors. Ask audience if they recognize what was built.

### 21 — Congratulations, You've Invented Bitcoin (subtle animated entrance; old 19)
- Option B approved instead of group photograph. Center large orange Bitcoin logo, faint ledger/fork diagrams around periphery, only “Congratulations. You've invented Bitcoin.” Logo gently scales/rotates/settles, text fades in, then hold static. Approx. 2 seconds; no endless rotation, confetti, recap, or “Almost.” Static fallback acceptable. Use approved theme, local vector logo with recorded provenance and rights. Speaker qualifies simplification verbally.

### 22 — Do We Really Need to Do All This Work? (static; old 20)
- Option A: original café, Alice horrified by exaggerated electricity bill, Bob concerned/calculating, Charlie happily mining. Neutral illustrative amount and optional subtle celebration remnants. Owner added small stick figure with Sam Altman head asking “More RAM?” as secondary side gag. Treat as fictional satire, not a quotation or factual claim; do not present alleged recent comment as verified. Before bundling any likeness/photo verify provenance and usage rights; use original caricature or owner-approved rights-cleared/local asset fallback if needed. No actual photo supplied or cleared. No energy statistics or claim PoW is useless. Motivate scarce resource at risk.

### 23 — What If We Put Something at Stake? (animated; old 21)
- A → C approved. Alice, Bob, Charlie bond currency, voting power 35/35/30 for consistent example. Then mathematical propose → prevote → precommit → commit. Alice proposes, Alice and Bob independently validate, see >2/3 matching prevotes and precommit; Charlie withholds; 70% matching precommits commits. Use messenger notes for signed votes if useful; no need full medieval return. Clarify that one-third threshold is voting power, not number of validators, and separate stake weighting, proposer choice, consensus and economic penalties.
- Optional approved-direction teaching extension: Charlie signs conflicting votes of same height/round/type, evidence of equivocation, stake at risk under application rules. No arbitrary slashing or claim all PoS uses BFT. Notes: CometBFT locks, rounds, timeouts, <1/3 Byzantine voting power and network assumptions for liveness; Cosmos application supplies validator set and power. Verify actual threshold strictly >2/3.

### 24 — Why Can't They Talk to Each Other? (animated; old 22)
- Owner replaced two-café concept entirely. Alice happily has ample fictional ChatGPT credits; Bob recommends Claude; Alice intrigued, then disappointed her ChatGPT credits cannot be used there and would need separate purchases. Gemini then Grok enter rapidly; Alice increasingly concerned then utterly dismayed at separate accounts/balances/payment requirements. End expressive reaction, no blockchain jargon. Fictional illustrative credits and generic billing panels, not screenshots or assertions about current plan entitlements/free access. Brand marks only with provenance/rights and offline assets; text labels/original generic cards as fallback.
- Checkpoints happy, Bob recommendation, failed portability, Gemini, Grok, dismay. Speaker maps independent records and rules to chains; interoperability does not compel commercial services to accept other currencies. No claims that IBC solves actual AI billing.

### 25 — What If They Could Talk? (animated; old 23)
- A → B → C approved. Two kingdoms with independent ledgers/castles; Charlie is courier. Morph into two blockchain diagrams; A commits packet to state; B's light client of A authenticates consensus state/root, updated as needed; Charlie carries packet plus commitment proof; B verifies against authenticated root and processes valid packet. Separate hypothetical tampering attempt: change transfer 10 to 1000 with original proof; rejected. Avoid conflating authenticated root with packet proof or implying merely relaying gives permission. Reuse note/castle/block motifs.
- Checkpoints kingdoms, packet commitment, client update, relay, acceptance, separate tamper attempt, rejection, zoom out to many sovereign connected chains with IBC label (no mandatory hub). Explain arbitrary data, client/counterparty assumptions, initial trusted state, relayer can withhold/delay, acknowledgements/timeouts/replay protections in notes. Not a working IBC implementation. No claim every chain or consensus mechanism is automatically supported.


## Implementation queue (planning only)

See ROADMAP.md for dependencies and shared acceptance. M4 is approved and merged. M5a (#12) is approved and merged in PR #13. M5b (#14) is owner-approved and merged. M5c (#16) is at the production review gate. Candidate subsequent briefs: M5d slides 14–16 (real SHA-256, worker mining, linked pages); M5e slides 17–21 (incentives, competing histories, reveal); M5f slides 22–25 (stake/BFT, credit gag, IBC); M5g integrated Part I review and pacing. These labels are proposed issue-sized batches, not yet opened issues or permissions. Review each rendered batch and PR before merging. Preserve existing diagnostics and approved M3 controls.

Each brief must specify scene IDs, visual references, original/local asset plan, initial/hold/final frames, named checkpoints, state/interaction/reset behavior, notes/source references, print still, test cases, screenshot paths, and exact permitted files. Include deterministic test coverage, browser compatibility, no external runtime dependencies, playback reset/backwards seek/fast navigation and input focus checks. For real demos verify independently known test vectors and cleanup/cancellation; for illustrative scenes do not claim simulated digests are real. Test and inspect actual Firefox screenshots, including audience-size readable text. M8 retains manual projector/dual monitor/offline rehearsal.

## Next session

Part I creative phase complete: all 25 concepts approved. Overall planning baseline 48 slides; Part II 26–45, Part III 46–48 remain provisional. Read main, then the active branch `feature/m5c-cafe-ledger` and issue #16 / draft PR #17. Review M5c production in desktop Firefox and review the code in draft PR #17 before considering merge. If owner instead wants Part II creative planning, use provisional storyboard and continue one slide at a time. No need to reconstruct decisions from chat. Rough sketches are not production assets. Third-party meme, likeness and brand assets require provenance/rights review; exact sources not supplied here.


## Active handover — M5c production review (25 Nov 2026)

- Repository: https://github.com/ap0calypse644/the-science-of-trustless-systems. Local checkout: `~/projects/the-science-of-trustless-systems` on BlackPearl. Owner uses local Codex; ChatGPT reviews remotely through GitHub.
- Main `ea8fec8f786a0bdce8400869197f46266871ff2c` has eight owner-approved production slides; M5b issue #14 closed, PR #15 merged; 110/110 reported regression tests. The slide 8 battlefield was accepted with minor artistic polish deferred. Do not reopen that design during M5c.
- Active [issue #16](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/16), [draft PR #17](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/17), branch `feature/m5c-cafe-ledger`. Staging implementation checkpoint `ed48687e339c52dda5cf51fdbd4a2151df59e712`; later documentation-only commits are expected. [Staging report](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/16#issuecomment-7159913612) reports 118/118 tests and clean tree at that checkpoint.
- Owner inspected the rendered stills and said “almost correct”; [latest owner feedback](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/17#issuecomment-7160357652) defined the staging corrections. Add Bob's “I paid yesterday” to `09-receipt-chaos`; change slide 13 café title to proposed “The Double-Spend Problem”, reserve “We Are Back to the Generals” for final battlefield; remove `13-conflicting-histories` separate still/checkpoint. Preserve all other art. Revised staging contains 17 stills. Do not treat image-generation previews as source assets or as an approved alternate title; use authored SVG/HTML.
- Model: slide 9 IOUs Charlie owes Alice 4, Bob owes Charlie 3. Slides 10–12 toy balances start (Alice 0, Bob 30, Charlie 5); unsigned Bob→Charlie 20 rejected; signed Bob→Alice 10 accepted => (10,20,5); signed Charlie→Bob 500 rejected; 2-unit access fee proposed only. Slide 13 explicitly fresh (0,0,20); Charlie signs two distinct 20-unit transfers; Alice's first-arrival history (20,0,0), Bob's (0,20,0). Second payments rejected locally, no global settlement; retain in notes/model, remove redundant visible beat.
- The owner approved all 17 revised stills at `2ff39379cbc4c621bdfe8fa3c583eb21c79951d6`, including the exact café title **The Double-Spend Problem**, and authorized production in [PR #17](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/17). The branch now adds four presenter-paced scenes (9, 10, 12, 13) and static slide 11, with five print compositions. Slide 13 runs the fold and terrain rise between Local acceptance and Battlefield reveal. No extra stop for rejected payments or folding.
- Next action: owner reviews rendered motion in desktop Firefox and ChatGPT reviews the production code and verification report. Keep PR #17 draft and issue #16 open pending explicit approval. M5d requires separate authorization.
- Local review: build with `npm run build` and start `npm run preview -- --port 4173 --strictPort`. Open [production slide 9](http://127.0.0.1:4173/talk/#/09-shared-ledger) or [slide 13](http://127.0.0.1:4173/talk/#/13-double-spend-problem). The staging route remains at `/talk/m5c/`. See README for all checkpoint names, durations, and capture locations.
- Future batches: M5d 14–16, M5e 17–21, M5f 22–25, M5g Part I integration; M6 privacy, M7 AMA/closing, M8 offline delivery/rehearsal. Canonical approved concepts are above. No need to reconstruct chat. Exact remaining context is not visible; restart ChatGPT and Codex independently as needed.
