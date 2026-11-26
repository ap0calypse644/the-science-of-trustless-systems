# Project continuation - 26 November 2026

This is the canonical restart point for a new ChatGPT or local Codex session. Read [AGENTS.md](AGENTS.md), [README.md](README.md), [ROADMAP.md](ROADMAP.md), [DESIGN.md](DESIGN.md), [ARCHITECTURE.md](ARCHITECTURE.md), and [STORYBOARD.md](STORYBOARD.md). This file records owner-approved creative decisions and supersedes conflicting older prototype visual ideas. It is a planning checkpoint, not permission to implement everything.

## Goal and workflow

A live college guest lecture, **The Science of Trustless Systems**, nominally two hours: Trust (roughly 45 min), Privacy (roughly 45 min), AMA/closing (roughly 30 min). The living storyboard is accepted as a starting point, not a contract. Add, remove, split, combine and reorder as the teaching narrative develops. Timing is guidance, not an examination or hard acceptance threshold; prioritize understanding, discussion, humor and accuracy. Do not force every topic into its initial time allocation. Keep slides sparse, projector-readable and visually engaging; put rigor, assumptions, caveats and sources in speaker notes. Pick static or scripted animated treatment according to the teaching idea, not quotas.

Owner decision (25 Nov 2026): the lecture uses static or presenter-paced scripted animated slides only. No live audience/presenter inputs that change the educational model, branching buttons, live cryptographic computations or worker searches are required. Preserve ordinary playback/navigation/seek/reset controls, verbal audience predictions, local offline operation and editable art. Use internally consistent authored examples. Identify simulated outputs in speaker notes and prompt the presenter to disclose them verbally. Keep substantive technical labels and essential toy-model caveats on slides. This supersedes earlier interactive and real-computation requirements. Issue #18 covers the separately reviewed scripted conversion of slide 6 and preserves archived diagnostic and staging routes. M5d is merged; M5e production is approved and merged in PR #23; #22 closed. M5f production (22–26) is owner-approved and merged in PR #25; #24 closed. Creative planning resumes at slide 27; implementation remains gated. Subsequent batches remain separately gated.

Owner approves creative direction, visual results and milestones. ChatGPT is the creative director, architecture/review partner and GitHub issue/PR coordinator. Local Codex implements and tests only explicitly authorized scopes. Use GitHub issues as implementation briefs and PR comments for build/test reports, review findings and corrections: do not require the owner to copy huge prompts, logs, diffs or reports between tools. After Codex posts a report and the owner says done, retrieve the issue/PR and inspect the actual code and results; request corrections in the PR if necessary; merge only after explicit owner review. Keep original issue scope and approval boundaries; do not start future work merely because it is documented. Keep repo documentation up to date so a fresh chat can recover state from GitHub. Warn the owner when chat context appears to be getting long, but do not claim access to an exact chat capacity meter.

## Engineering checkpoint

- M0, M0.1, M0.2 and M1 complete; expressive minimalism D on pure white approved.
- M2 illustration library: issue #4, PR #5, merged at 6e4ae7dbfaa55b53cf3070c806f25a9b88642fa4. Approved gallery; facepalm hand continuity corrected; final browser tests reported 17/17 each. Reuse the library, not the rough chat sketches.
- M3 presenter engine: issue #6, PR #7, merged at 8895480554c7d2775cf7df9c7ab85196d6e6f6ba. Automated checks reported 27/27 per browser, owner confirmed all ten desktop Firefox manual checks. Physical projector and dual-monitor rehearsal remain M8. Owner-approved M4a is merged in PR #9. Slides 1–2 are available at /talk/.
- Stack: Reveal.js, TypeScript, Vite, local GSAP, local fonts/assets, deterministic authored SVG. Firefox primary, Chromium compatibility. Preserve diagnostics at /, /review/, /library/, /engine/. See architecture for actual APIs.
- Engine: paused on entry/revisit; only active scene runs; independent slide navigation and scene playback; deterministic seek/reset/checkpoints; clean resource teardown. Left/Right slide navigation, Space play/pause, R reset, J/K checkpoints, Minus/Plus global speed, H controls, F fullscreen, S notes, Escape overview outside fullscreen; preserve native focus behavior. Speaker view preview shows baseline frame. No autoplay advance. Test offline with off-origin requests blocked.
- M4 is approved and merged, including slide 7 in PR #11. M5a, M5b and M5c are owner-approved and merged in PRs #13, #15 and #17. Main production merge checkpoint `c292a3624a6aedb31e9a97d315dd4719434a2eac` contains slides 1–13; issue #16 closed. M5c's approved 17-still reference remains at /talk/m5c/; M5b at /talk/m5b/. M5d is owner-approved and merged in PR #21 at `a0ded8571995e10a71fc5b072d4d77aa8a66ca91`; #20 closed. M5e is owner-approved and merged in PR #23 at `8602075989cdee0e6562a2b0bc77881c6efda017`; #22 closed. M5f is owner-approved and merged in PR #25 at `d97adfb7f35208bc95b77a4df0c92d10990deb39`; #24 closed. Main contains production 1–26. M5 completes Part I; M6 Part II; M7 AMA/closing/references; M8 rehearsal and offline/PDF delivery.

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

### 06 — Consistency or Availability? (scripted animation)

Owner approved banking scenario after the meme. Two bank branches A/B, one replicated account; Charlie visits both. White background, M2 cast, large balances, no excessive text. Presenter-paced checkpoints and two fixed sequential counterfactual outcomes; no choice buttons or autoplay navigation.
1. Both replicas synced at 1,000 units; connected network.
2. Break the link, show failed network messages; both branches still running.
3. Charlie withdraws 1,000 units at A; A accepts and records 0 units, B still stores 1,000 units. Show cash received, completed write before the next read.
4. Charlie walks to B and asks his balance; B cannot establish the latest balance from its local state.
5. Pause for audience debate; then show both fixed outcomes sequentially: return 1,000 units, or wait until authoritative synchronization. Returning stale value demonstrates a consistency violation for this completed read while answering it. Waiting indefinitely through a partition sacrifices availability for this request, but avoids a stale read. Do not imply that either branch by itself proves a complete protocol's CAP guarantees.
6. After showing the stale response, explicitly rewind to the identical pre-response partition state and demonstrate the alternative wait. Then restore connection, synchronize to 0 units, and complete that waiting read. Reset restores the initial scene; use J/K to revisit either outcome.
- Reuse the approved bank art and deterministic engine; remove the production choice widget and choice-dependent time limit. Derive both scripted outcomes from absolute time; test independent counterfactuals, restore, reset, revisit, seek/checkpoints and focus. Keep the archived staging/diagnostics.
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
- Discarded separate 10B signatures/hash explainer. Do not add it. Keep the dedicated hashing slide 14 and its scripted hashing illustration. Original slide numbering unchanged.


## Approved slide decisions (11–26, current numbering)

The 26 November 2026 checkpoint locks concepts through the Bitcoin reveal (26); 27 onward is provisional. These briefs override earlier visual alternatives and rough prototypes. All amounts, exact dialogue and timing are illustrative unless explicitly locked. No implementation authorization is implied.

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

### 14 - Giving Data a Fingerprint (animated)
- Approved B→C. Abstract hash machine; greeting enters and fixed digest emerges; then a ledger and a huge library of books represented as digital data. Same output length each time (SHA-256 concept: 256 bits). Alice and Bob hash identical ledger copies and obtain the same illustrative fingerprint. Show fixed length and determinism, not encryption or collision-free uniqueness. No avalanche until 15.
- Checkpoints machine, greeting, ledger, library, identical copies. Original sparse editable art. Identify the authored outputs in speaker notes and verbally. Transition: what if one bit changes?

### 15 - What If We Change Just One Bit? (animated)
- Approved B→A→C. Alice records original ledger fingerprint separately; mischievous Charlie edits amount 10→11. Zoom to ASCII/UTF-8 digit 0 (00110000) vs 1 (00110001), exactly one bit changed. Expand to aligned 256-bit illustrative before/after patterns; mark changed bits with shape/outline as well as color; count matches fixture (132/256 suggested, not mandatory). Zoom out: Alice compares against separately trusted original digest; Charlie disappointed.
- Hashing detects changes relative to a trusted commitment, does not prevent edits; Charlie could recompute. No live hashing. Transition: make finding an acceptable hash costly.

### 16 - Prove That You Have Done Some Work (animated)
- Approved B→A. Original mathematical 3Blue1Brown-inspired layout, signed ledger batch (illustrative Alice→Bob 10, Bob→Charlie 5, Charlie→Alice 2; separate from slide 13 balances), hash machine, fixed four leading ZERO BITS target, initial failure. Attempt changing signed transaction invalidates its signature; undo. Append nonce 0; vary only nonce; failed hashes accumulate, success with four zero bits highlighted (nonce 7 and 00001011… suggested). Fixed illustrative prefixes, labels and distinct success/failure marks. No runtime mining or proof verification. End on success; probability/verification on 17.

### 17 - Hard to Solve, Easy to Verify (animated)
- Approved A→C. Charlie surrounded by failed hashes hands Alice the ledger AND successful nonce. Alice hashes once, checks target. Compare 4/8/16/24 required leading zero bits with expected attempts 16/256/65,536/16,777,216 under ideal uniform hash assumption, one hash and target check for a fixed candidate; not whole block validation. Use legible numbers and not-to-scale label if necessary. Luck means not exact work. Fixed illustrations only.

### 18 - The Growing Ledger (animated)
- Alice holds short list of transactions, happy. One-by-one additions cause list to grow absurdly long; happy→neutral→concern→dismay. Character-driven comedy, not mempool/network terminology. Explain verbally that a history-only ledger without cached state must replay transactions to recover balances; actual systems may maintain state. No balance carry-forward design. At the last hold the same sheet stays in her grip, with readable ordered rows and a continuous curved overflow with a curled tip.

### 19 - From Pages to Blocks (animated)
- Ledger ONLY; page fills with transactions one by one; flip to new page; repeat 3–4 times. Tear completed pages from notebook and transform into individual familiar blue 3D blocks, side by side. Keep **The Growing Ledger** through the notebook, detached paper and folding. Reveal **From Pages to Blocks** only on the final four independent blocks, with no arrows, links, hashes, nonce, mining, balance summaries or carried-forward balances. Chunking alone does not solve historical validation cost. No mempool.

### 20 - What If Charlie Changes History? (animated)
- Start exact final frame 19. Mischievous Charlie edits/adds/deletes transactions in historical unlinked blocks, no visible hash-link objection. Restore clean baseline before Alice's defense. Alice hashes block 1 and writes digest in previous-hash field at top of block 2; hash block 2 including that field, repeat through last block. Reveal block-chain name; show linked blocks. Charlie repeats mischief on block 1; new hash disagrees with block 2's stored reference; confused. He repairs block 2's reference, smiles briefly, then notices block 3 disagrees, dismayed. Untouched later links remain locally matching until their predecessor changes. Hash links are tamper-evident, not sufficient security; signatures/transaction validity still apply. No PoW on blocks yet.

### 21 - Conflicting Histories (animated)
- Approved B→A→C. Revisit slide 13 fresh common state (Alice 0, Bob 0, Charlie 20). Charlie signs separate conflicting payments of 20 to Alice and Bob; they create different next blocks extending the same common tip and argue in separate speech bubbles. Merge common portion into fork diagram and show both branches' internally matching links and individually valid transactions. End on the unresolved fork. Keep both explanatory lines off the audience and print artwork. The presenter asks “Which history do we believe?” aloud from speaker notes. No PoW on blocks yet.

### 22 - Making History Expensive to Rewrite (animated)
- Approved A→B→C. Apply familiar nonce and four-zero-bit target to hash-linked blocks; mine sequentially with prior mined digest already in successor input. Charlie tampers with earlier block; illustrative old nonce fails target and successor reference mismatches. Script failed attempts, new valid hash, repair next reference and redo work, repeat; Charlie increasingly exhausted. Only immediate successor mismatch at each step. Original chain intact. Illustrative fixed data; chance old nonce still works exists, not guaranteed fail. No claim expensive work alone selects chain.

### 23 - Which History Do We Believe? (animated)
- User revised to mining race and confirmations rather than single extra block convergence. Honest majority of HASH POWER vs Charlie's competing individually valid alternate history, both start one block past common tip. Script branch counts (1/1, 2/1, 2/2 lucky catch-up, 4/2, 6/3, 9/4) as illustrative; Charlie briefly smiles then falls behind. Honest chain grows faster on average, not inevitably every interval. Compare greatest cumulative work among valid chains; equal difficulty explicitly assumed if using block count. Focus on transaction buried deeper: 1, 3, 6 confirmations (inclusion block counts as first); Alice increasingly confident, no guarantee or universal safe threshold. Reversal probability decreases under honest majority and ordinary propagation assumptions. Invalid blocks rejected regardless of work; alternate valid history not necessarily fake/invalid. Explain majority hash-power attack and limits verbally here (reorg/censor/double-spend own funds, not forge signatures or force invalid blocks). No standalone finality/51%/Who Makes the Rules slide.

### 24 - Why Would Anybody Do All This Work? (animated)
- Owner's exact dramatic concept: stationary camera, Alice sitting at table mining on computer; 2–3 small blue 3D block boxes neatly stacked on table, happy; about 20 messier boxes, neutral; about 50 strewn around table/floor, dismayed; hundreds bury Alice, table, computer completely. Only hand emerges holding white surrender flag, gently waves. Boxes tumble/settle, acceleration and brief silence before flag; title fades only at end; hold. No dialogue or technical diagram. Approx 15–20 seconds. Metaphor for work not storage burden.

### 25 - Rewarding the Miner (animated)
- Approved B→C. Begin mountain/flag callback, zoom individual candidate block; permitted golden reward transaction at top BEFORE mining, Create 10 units → Alice (illustrative). No other participant's balance debited. Mine including reward and previous hash, independently validate/adopt, show ten golden units. Alice emerges, throws away flag, enthusiastically resumes; money pile grows with accepted blocks. Protocol-defined subsidy not arbitrary printing; reward depends on accepted history, actual maturity rules in notes. Explain transaction fees verbally (existing currency paid for inclusion, distinct from issuance); no fees slide.

### 26 - Congratulations, You've Invented Bitcoin (subtle animated entrance)
- Retain prior approved B. Faint chain background; large centered orange Bitcoin logo subtle scale/rotation/settle; “Congratulations.” then “You've invented Bitcoin.” fade in, hold. Approx 3–4 seconds; static fallback acceptable. No confetti, recap, “Almost” or prior name reveal. Use local vector asset with documented provenance/rights. Qualify simplified account-based reconstruction verbally.

## Provisional continuation after Bitcoin (not authorized for production)
Expanded outline previously agreed in principle; exact designs beyond 26 still need individual review. Renumbering is provisional: 27 electricity bill/fictional RAM cameo, 28 bonded stake, 29 voting, 30 equivocation, 31 BFT finality, 32 ledger history vs current state, 33 smart contracts, 34 Merkle tree, 35 Merkle proof, 36 fictional AI credit fragmentation, 37 independent kingdoms/courier, 38 authenticated light client and packet proof, 39 IBC network. Preserve prior approved visual directions below as reference; old numbering is historical, not current slide IDs. Part II and III provisional, 40–59 and 60–62 if unchanged.

### Earlier concept reference (old 22) — Do We Really Need to Do All This Work? (static; old 20)
- Option A: original café, Alice horrified by exaggerated electricity bill, Bob concerned/calculating, Charlie happily mining. Neutral illustrative amount and optional subtle celebration remnants. Owner added small stick figure with Sam Altman head asking “More RAM?” as secondary side gag. Treat as fictional satire, not a quotation or factual claim; do not present alleged recent comment as verified. Before bundling any likeness/photo verify provenance and usage rights; use original caricature or owner-approved rights-cleared/local asset fallback if needed. No actual photo supplied or cleared. No energy statistics or claim PoW is useless. Motivate scarce resource at risk.

### Earlier concept reference (old 23) — What If We Put Something at Stake? (animated; old 21)
- A → C approved. Alice, Bob, Charlie bond currency, voting power 35/35/30 for consistent example. Then mathematical propose → prevote → precommit → commit. Alice proposes, Alice and Bob independently validate, see >2/3 matching prevotes and precommit; Charlie withholds; 70% matching precommits commits. Use messenger notes for signed votes if useful; no need full medieval return. Clarify that one-third threshold is voting power, not number of validators, and separate stake weighting, proposer choice, consensus and economic penalties.
- Optional approved-direction teaching extension: Charlie signs conflicting votes of same height/round/type, evidence of equivocation, stake at risk under application rules. No arbitrary slashing or claim all PoS uses BFT. Notes: CometBFT locks, rounds, timeouts, <1/3 Byzantine voting power and network assumptions for liveness; Cosmos application supplies validator set and power. Verify actual threshold strictly >2/3.

### Earlier concept reference (old 24) — Why Can't They Talk to Each Other? (animated; old 22)
- Owner replaced two-café concept entirely. Alice happily has ample fictional ChatGPT credits; Bob recommends Claude; Alice intrigued, then disappointed her ChatGPT credits cannot be used there and would need separate purchases. Gemini then Grok enter rapidly; Alice increasingly concerned then utterly dismayed at separate accounts/balances/payment requirements. End expressive reaction, no blockchain jargon. Fictional illustrative credits and generic billing panels, not screenshots or assertions about current plan entitlements/free access. Brand marks only with provenance/rights and offline assets; text labels/original generic cards as fallback.
- Checkpoints happy, Bob recommendation, failed portability, Gemini, Grok, dismay. Speaker maps independent records and rules to chains; interoperability does not compel commercial services to accept other currencies. No claims that IBC solves actual AI billing.

### Earlier concept reference (old 25) — What If They Could Talk? (animated; old 23)
- A → B → C approved. Two kingdoms with independent ledgers/castles; Charlie is courier. Morph into two blockchain diagrams; A commits packet to state; B's light client of A authenticates consensus state/root, updated as needed; Charlie carries packet plus commitment proof; B verifies against authenticated root and processes valid packet. Separate hypothetical tampering attempt: change transfer 10 to 1000 with original proof; rejected. Avoid conflating authenticated root with packet proof or implying merely relaying gives permission. Reuse note/castle/block motifs.
- Checkpoints kingdoms, packet commitment, client update, relay, acceptance, separate tamper attempt, rejection, zoom out to many sovereign connected chains with IBC label (no mandatory hub). Explain arbitrary data, client/counterparty assumptions, initial trusted state, relayer can withhold/delay, acknowledgements/timeouts/replay protections in notes. Not a working IBC implementation. No claim every chain or consensus mechanism is automatically supported.


## Implementation queue (planning only)

See ROADMAP.md for dependencies and shared acceptance. M4 is approved and merged. M5a (#12) is approved and merged in PR #13. M5b (#14) is owner-approved and merged. M5c (#16) is owner-approved and merged in PR #17. M5d (#20) slides 14–17 are approved and merged. M5e (#22) slides 18–21 are approved and merged in PR #23. M5f (#24) production for 22–26 is approved and merged in PR #25. Proposed subsequent batches M5g provisional 27–31, M5h provisional 32–39, M5i integrated Part I review. These labels are proposed issue-sized batches, not yet opened issues or permissions. Review each rendered batch and PR before merging. Preserve existing diagnostics and approved M3 controls.

Each brief must specify scene IDs, visual references, original/local asset plan, initial/hold/final frames, named checkpoints, state/playback/reset behavior, notes/source references, print still, test cases, screenshot paths, and exact permitted files. Include deterministic test coverage, browser compatibility, no external runtime dependencies, playback reset/backwards seek/fast navigation and input focus checks. For illustrative scenes verify fixed example relationships and labels; do not claim simulated digests are real. Test and inspect actual Firefox screenshots, including audience-size readable text. M8 retains manual projector/dual monitor/offline rehearsal.

## Scripted CAP correction complete

Issue #18 converts the existing production slide 6 to eight scripted checkpoints. The stale 1,000-unit reply ends the first run. The alternative restores the same partitioned inquiry before any response, waits, and completes the read with 0 after synchronization. The archived staging route and shared diagnostic APIs remain available. Hashing, mining, secret reconstruction and proof analogy use scripted animation; later slide numbers are provisional. All other future examples use fixed illustrative data; keep mathematical claims and visual consistency. Owner approved the revised slide 6; PR #19 merged at `61191c3fb94ccd975bda9cf0f87ada88d9fffec4`, closing #18. All 13 production slides are static or scripted animated. Codex reported 136/136 regression tests; existing Firefox speaker-preview flake reproduced on unchanged main and remains a final integration reliability concern. M5d requires separate authorization.

## Next session

Read this checkpoint and the latest main documentation. Production slides 1–26 are merged. Resume individual creative planning at slide 27, Do We Really Need to Do All This Work? No M5g staging or production until concepts are reviewed and explicitly authorized. Later Part I designs and Parts II/III provisional. No automatic implementation of later batches.


## Historical handover — M5c complete (25 Nov 2026)

- Repository: https://github.com/ap0calypse644/the-science-of-trustless-systems. Local checkout: `~/projects/the-science-of-trustless-systems` on BlackPearl. Owner uses local Codex; ChatGPT reviews remotely through GitHub.
- Prior main `ea8fec8f786a0bdce8400869197f46266871ff2c` had eight owner-approved production slides; M5b issue #14 closed, PR #15 merged; 110/110 reported regression tests. The slide 8 battlefield was accepted with minor artistic polish deferred. Do not reopen that design during M5c.
- Completed [issue #16](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/16), [merged PR #17](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/17), branch `feature/m5c-cafe-ledger`. Staging implementation checkpoint `ed48687e339c52dda5cf51fdbd4a2151df59e712`; later documentation-only commits are expected. [Staging report](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/16#issuecomment-7159913612) reports 118/118 tests and clean tree at that checkpoint.
- Owner inspected the rendered stills and said “almost correct”; [latest owner feedback](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/17#issuecomment-7160357652) defined the staging corrections. Add Bob's “I paid yesterday” to `09-receipt-chaos`; change slide 13 café title to proposed “The Double-Spend Problem”, reserve “We Are Back to the Generals” for final battlefield; remove `13-conflicting-histories` separate still/checkpoint. Preserve all other art. Revised staging contains 17 stills. Do not treat image-generation previews as source assets or as an approved alternate title; use authored SVG/HTML.
- Model: slide 9 IOUs Charlie owes Alice 4, Bob owes Charlie 3. Slides 10–12 toy balances start (Alice 0, Bob 30, Charlie 5); unsigned Bob→Charlie 20 rejected; signed Bob→Alice 10 accepted => (10,20,5); signed Charlie→Bob 500 rejected; 2-unit access fee proposed only. Slide 13 explicitly fresh (0,0,20); Charlie signs two distinct 20-unit transfers; Alice's first-arrival history (20,0,0), Bob's (0,20,0). Second payments rejected locally, no global settlement; retain in notes/model, remove redundant visible beat.
- The owner approved all 17 revised stills at `2ff39379cbc4c621bdfe8fa3c583eb21c79951d6`, including the exact café title **The Double-Spend Problem**, and authorized production in [PR #17](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/17). The merged implementation adds four presenter-paced scenes (9, 10, 12, 13) and static slide 11, with five print compositions. Slide 13 runs the fold and terrain rise between Local acceptance and Battlefield reveal. No extra stop for rejected payments or folding.
- Owner approved the production motion ("excellent. works fine") at `9e845f0d3bf79792b80096860a7f3d295a7a506d`; ChatGPT completed technical review with no blocking findings. Codex reported 136/136 regression tests (68 each browser) and desktop Firefox checks. PR #17 merged at `c292a3624a6aedb31e9a97d315dd4719434a2eac`; #16 closed. Production slides 1–13 are approved. Do not begin M5d until separately authorized. Next candidate scope is slides 14–16; read the locked creative briefs above and retain the same issue/PR review workflow.
- Local review: build with `npm run build` and start `npm run preview -- --port 4173 --strictPort`. Open [production slide 9](http://127.0.0.1:4173/talk/#/09-shared-ledger) or [slide 13](http://127.0.0.1:4173/talk/#/13-double-spend-problem). The staging route remains at `/talk/m5c/`. See README for all checkpoint names, durations, and capture locations.
- Future batches: M5d 14–16, M5e 17–21, M5f 22–25, M5g Part I integration; M6 privacy, M7 AMA/closing, M8 offline delivery/rehearsal. Canonical approved concepts are above. No need to reconstruct chat. Exact remaining context is not visible; restart ChatGPT and Codex independently as needed.

## Historical handover - M5e complete, M5f staging authorized (26 November 2026)

- M5d merged in PR #21 at `a0ded8571995e10a71fc5b072d4d77aa8a66ca91`; #20 closed; 166/166 reported tests. Staging `/talk/m5d/` preserved.
- M5e revised 22 stills approved at `698348a`; production approved at `d3fac5f55efd4c7fafbcdd2f2f146491073e8d5b`. PR #23 merged at `8602075989cdee0e6562a2b0bc77881c6efda017`; #22 closed. Main production slides 1–21. Codex reported 200/200 Firefox/Chromium regression and desktop Firefox checks; ChatGPT reviewed source, not local renders. No independent workflow runs returned. Projector/dual-monitor rehearsal pending. Preserve `/talk/m5e/` and earlier staging/diagnostic routes. Owner corrections: slide 19 retains The Growing Ledger until final complete blocks, coherent overflow on 18, speech bubbles on 21, no explanatory fork captions; question aloud. Slide 19 starts with filled first-page hold.
- M5f visual staging only authorized in [issue #24](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/24): slides 22–26, proposed 32 stills, branch `feature/m5f-bitcoin-reveal`, route `/talk/m5f/`. Read exact brief, preserve 1–21 and previous routes. Production separately gated; no 27+ implementation. Creative planning resumes at 27 after M5f approval. Earlier handovers historical where conflicting.

## M5f staging review

The 32 editable stills for [issue #24](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/24)
are in `/talk/m5f/` on `feature/m5f-bitcoin-reveal`. The three confirmation
holds are interleaved with forward branch growth. The last hold of slide 24
and the first hold of slide 25 use the same flag and mountain geometry.
See [the review guide](README.md#m5f-visual-staging-review) for navigation,
motion and print planning and local Firefox captures. The owner approved
these stills at `08b2d74` and authorized production in PR #25.

## Historical handover — M5f production review

Draft [PR #25](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/25)
on `feature/m5f-bitcoin-reveal` contains presenter-paced production slides
22–26. The branch includes the owner-approved 32 holds and the static
`/talk/m5f/` route. The [production review guide](README.md#m5f-production-motion-review)
lists elapsed times, review URLs, print and capture locations. Main contains
the approved production slides 1–21. Await owner motion approval and technical
review. Issue #24 stays open and subsequent batches remain separately gated.


## Active handover - M5f complete; resume creative planning (26 November 2026)

- Repository https://github.com/ap0calypse644/the-science-of-trustless-systems, local checkout `~/projects/the-science-of-trustless-systems`. Latest production merge `d97adfb7f35208bc95b77a4df0c92d10990deb39`, [PR #25](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/25), issue #24 closed. Owner approved staging `08b2d74` and production `e2f4a3111e4fc9fb68ae37928834af93c8198250`. Slides 1–26 production approved. Codex reported 238/238 Firefox/Chromium tests, installed Firefox motion review, 26-page 16:9 print export; ChatGPT reviewed code, not local renders. No independent GitHub CI runs returned. Physical projector/dual-monitor rehearsal remains pending. Preserve all earlier diagnostics and static staging routes, including `/talk/m5f/`. Bitcoin logo local credited vector; no reveal before 26.
- **Next: creative planning only at slide 27, Do We Really Need to Do All This Work?** Review individual concepts with owner before authorizing M5g. Use prior directions in provisional continuation above, not as permission to implement. Slide 27 café electricity-bill gag and fictional RAM cameo; then provisional 28–31 stake, voting, equivocation, finality. 32–35 state, smart contracts, Merkle tree/proof; 36–39 AI credit fragmentation, kingdoms/courier, light client proof, IBC network. Part II privacy and Part III AMA remain provisional. Current baseline 62 overall, not fixed. No new issue/PR or implementation yet. Revisit numbering if concepts change.
- Preserve collaboration workflow: ChatGPT creative direction and technical review through GitHub, local Codex implementation via scoped issues/PR comments, staging stills → owner visual approval → production motion → owner approval and technical review → merge; no later batch without explicit authorization. Static or scripted animation only, ordinary presenter controls preserved, authored crypto examples disclosed in notes and verbally, no generic on-slide disclaimers. Original editable SVG/HTML/CSS, white canvas, established M2 characters and local assets. Earlier handovers historical where conflicting. Start a new chat by pointing to the repo and this section, then resume slide 27.
