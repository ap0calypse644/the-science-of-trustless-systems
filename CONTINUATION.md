# Project continuation — 25 November 2026

This is the canonical restart point for a new ChatGPT or local Codex session. Read [AGENTS.md](AGENTS.md), [README.md](README.md), [ROADMAP.md](ROADMAP.md), [DESIGN.md](DESIGN.md), [ARCHITECTURE.md](ARCHITECTURE.md), and [STORYBOARD.md](STORYBOARD.md). This file records owner-approved creative decisions and supersedes conflicting older prototype visual ideas. It is a planning checkpoint, not permission to implement everything.

## Goal and workflow

A live college guest lecture, **The Science of Trustless Systems**, nominally two hours: Trust (roughly 45 min), Privacy (roughly 45 min), AMA/closing (roughly 30 min). The current 46-slide storyboard is accepted as a starting point, not a contract. Add, remove, split, combine and reorder as the teaching narrative develops. Timing is guidance, not an examination or hard acceptance threshold; prioritize understanding, discussion, humor and accuracy. Do not force every topic into its initial time allocation. Keep slides sparse, projector-readable and visually engaging; put rigor, assumptions, caveats and sources in speaker notes. Pick static/animated/interactive treatment according to the teaching idea, not quotas.

Owner approves creative direction, visual results and milestones. ChatGPT is the creative director, architecture/review partner and GitHub issue/PR coordinator. Local Codex implements and tests only explicitly authorized scopes. Use GitHub issues as implementation briefs and PR comments for build/test reports, review findings and corrections: do not require the owner to copy huge prompts, logs, diffs or reports between tools. After Codex posts a report and the owner says done, retrieve the issue/PR and inspect the actual code and results; request corrections in the PR if necessary; merge only after explicit owner review. Keep original issue scope and approval boundaries; do not start future work merely because it is documented. Keep repo documentation up to date so a fresh chat can recover state from GitHub. Warn the owner when chat context appears to be getting long, but do not claim access to an exact chat capacity meter.

## Engineering checkpoint

- M0, M0.1, M0.2 and M1 complete; expressive minimalism D on pure white approved.
- M2 illustration library: issue #4, PR #5, merged at 6e4ae7dbfaa55b53cf3070c806f25a9b88642fa4. Approved gallery; facepalm hand continuity corrected; final browser tests reported 17/17 each. Reuse the library, not the rough chat sketches.
- M3 presenter engine: issue #6, PR #7, merged at 8895480554c7d2775cf7df9c7ab85196d6e6f6ba. Automated checks reported 27/27 per browser, owner confirmed all ten desktop Firefox manual checks. Physical projector and dual-monitor rehearsal remain M8. No M4 slide implementation yet.
- Stack: Reveal.js, TypeScript, Vite, local GSAP, local fonts/assets, deterministic authored SVG. Firefox primary, Chromium compatibility. Preserve diagnostics at /, /review/, /library/, /engine/. See architecture for actual APIs.
- Engine: paused on entry/revisit; only active scene runs; independent slide navigation and scene playback; deterministic seek/reset/checkpoints; clean resource teardown. Left/Right slide navigation, Space play/pause, R reset, J/K checkpoints, Minus/Plus global speed, H controls, F fullscreen, S notes, Escape overview outside fullscreen; preserve native focus behavior. Speaker view preview shows baseline frame. No autoplay advance. Test offline with off-origin requests blocked.
- M4 remains the prototype gate: Slides 1, 2 and 7, notes, print stills. All three have approved visual concepts. Slides 3–6 and 8–10 are approved concepts for later production, not an instruction to bypass M4. Owner explicitly chose to finish Part I creative prototyping (slides 1–23, flexible count) before any production slide implementation. Issue #8 remains pending; do not start Codex or create implementation branches until explicit authorization after that checkpoint. M5 completes Part I; M6 Part II; M7 AMA/closing/references; M8 rehearsal, delivery, offline package and PDF.

## Visual rules (approved)

Pure white #FFFFFF canvas, near-black #222 ink, sparse accents blue #527DA8, green #62966B, red #C95650, yellow #E9B949, purple #9276B5, neutral #E5E7EB. Pair state color with shape/label/line cues. Original expressive stick figures, not chibi or detailed human anatomy. Alice: blue scarf, tied-back hair, practical. Bob: green accessory, curls/glasses, analytical. Charlie: purple accessory, angular hair, expressive mischief or accidental chaos as appropriate. Alice/Bob/Charlie; Eve for eavesdroppers, Mallory for explicitly malicious actors. Kalam major headings, Patrick Hand speech/annotations, system sans technical labels; local assets with license notices. Vary headings/composition across slides; do not repeat the title slide's dramatic lettering everywhere. No overarching franchise theme. Pop culture is occasional; slide 5 is a specific owner-approved exception to original-only artwork, subject to asset rights.

Use internationally relatable examples, no India-specific or other demographic-specific localization, no samosas anywhere in the slides, and neutral currency units (including slide 6). Coffee, sandwiches and ordinary transactions are acceptable. Preserve existing approved mechanics and compositions.

## Approved slide decisions (1–10)

Concept approval is distinct from approval of finished rendered slides. Chat-generated images and rough SVG/widget sketches were visual references, not production assets or validated code. Recreate editable original scenes in HTML/CSS/SVG with M2 characters. The actual reference image files are not included in this documentation commit; the descriptions below are the durable design brief. Obtain the originals from the owner/chat if exact visual matching needs them. Do not substitute one of the rejected variants.

### 01 — The Science of Trustless Systems (static)

Owner explicitly prefers the ORIGINAL handshake illustration over all three later refined alternatives. Lock the original composition, not a new reinterpretation.
- 16:9 white canvas. Two enormous hands reach diagonally toward each other: blue-cuffed open hand entering from lower-left, purple-cuffed reaching hand from upper-right. They do not touch.
- In the gap, a playful engineered trust contraption: ropes/pulleys, small scaffold, gears, yellow envelope, ledger/document, lock/verification motifs. Tiny Alice, Bob and Charlie actively operate the mechanism; they are not spectators. Retain charming mechanical complexity with clear silhouette and legibility.
- Bold expressive handwritten title integrated in lower-right open space, gold underline. Strong diagonal/asymmetrical hierarchy; preserve negative space. No subtitle overload.
- Reject the earlier ledger/envelope ensemble, trust-fall/bridge alternatives and later more symmetrical simplified handshake variants. This is the one owner-selected reference (chat generation ID 4f629dca-abef-4408-9818-6313b09d25d1; identifier is not a publicly accessible URL).
- Editable SVG and local typography, not a flattened generated slide. Notes introduce the two questions: how do we agree, and what information must we reveal?

### 02 — Single Point of Failure (static)

Owner selected concept C, "One plug to rule them all," then approved the cleaner second reference with a heading change.
- Main heading exactly **Single Point of Failure**. Small subtitle **One plug to rule them all**. Simpler handwritten heading, distinct from slide 1's dramatic treatment.
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
- Reference origin: https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man/ . Original 1967 cartoon meme has two figures; use the familiar three-character adaptation. Exact template URL/file and reuse rights still to verify. No actual meme bytes have been added to GitHub; do not invent license or imply it is covered by the repository's original-art license.
- Before shipping: identify source and rights/permission, record attribution and provenance; only bundle/distribute a copy in public repo if authorized. If public distribution isn't authorized, propose an owner-supplied local untracked asset with documented offline setup, and an owner-approved public fallback; do not silently substitute a generated imitation. No runtime CDN or remote image dependency.
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
- A protocol diagram may support the final explanation if helpful, not replace the battlefield. Print still should preserve the delivery/loss contrast and local knowledge. Separate M4 implementation issue still required after creative prototyping is complete.

### 08 — Byzantine Generals Problem (interactive)

Owner approved A, "There's a traitor among us": direct medieval sequel to slide 7. Messages now arrive under the classical synchronous oral-message model; a participant may lie.
- Introduce Mallory as the deliberately malicious general; Alice and Bob are honest lieutenants. Mallory sends Attack to Alice and Retreat to Bob, both delivered. Their thought bubbles/local reports differ; compare reports only after forwarding. Charlie remains the playful, non-malicious recurring character.
- Demonstrate three participants with one faulty commander, then four participants with one faulty commander (Charlie joins as honest lieutenant). In the latter example honest lieutenants forward their received orders and derive the same majority from three reports. A tie/default in the three-participant example is not by itself a proof of impossibility. Explain both agreement and loyal-commander validity; include a loyal commander/faulty lieutenant case.
- Preserve the planned M5 interactive scope in STORYBOARD.md: explicit structured oral-message protocol (OM candidate), rounds, participant/fault selections, local views, comparisons around n >= 3f+1, reset. Do not suggest that arbitrary majority voting or identifying the traitor solves Byzantine agreement. Exact protocol UI and implementation scope require M5 review. Show threshold only with its assumptions; other models differ.
- Reject war-council and imposter-detection framings. Transition from agreement to everyday ledger problem.

### 09 — A Shared Ledger (animated)

Owner first split café debt crisis (A) and ledger reveal (C) into 9A/9B, then explicitly merged them into one animated slide. Original numbering restored.
- Café setting with Alice, Bob, Charlie, coffee, sandwiches/ordinary food, receipts and IOUs; internationally relatable, no demographic-specific localization. Confusion over who paid whom and small repayments escalates, then Alice proudly introduces a shared notebook.
- Suggested checkpoints: café, confusion, receipt chaos, Alice's idea, notebook reveal with organized transaction entries, resolution. A gentle zoom into the notebook is preferred proposed staging, not a required exact camera implementation.
- Notebook becomes recurring prop in slides 10 onward. Make it big and readable; keep arithmetic consistent, explicitly establish initial balances/issuance and distinguish transfers from debt accounting when moving to a toy currency. Neutral amounts, no national currency symbols. Print still may show problem and solution.
- Takeaway: a common transaction record solves the memory problem, not authorization or trust. No early Bitcoin terminology.

### 10 — Unauthorized transactions (animated)

Owner approved Charlie mischievously trying to add a fake payment involving Bob, Bob getting mad, then Bob adding a signature to his own legitimate entry. Owner approved a stylized signature scribble beside that entry.
- Same café and ledger. Charlie grins while trying to write "Bob pays Charlie 20" (suggested wording). Bob objects ("I never approved that!"), then writes a genuine entry and attaches a recognizable signature scribble. Alice recognizes the need for authorization. Use a distinct legitimate entry if needed to avoid implying Bob authorized the fake one.
- Suggested presenter checkpoints: shared ledger, fake entry, Bob's angry objection, Bob signs his own entry, contrast unauthorized and authorized entries. Final still contrasts rejected unsigned fake and signature-verified legitimate entry (authorization check, not blanket transaction validity).
- Signature scribble is an illustrative metaphor, not a real secure signature. Speaker verbally explains private-key signing, public-key verification, key/identity association, binding to message content, and why copying a handwritten mark is insecure. A valid signature can be replayed and does not guarantee sufficient funds or other transaction validity; these checks motivate slide 11.
- Discarded separate 10B signatures/hash explainer. Do not add it. Keep the dedicated hashing slide 14 and its real SHA-256 demo. Original slide numbering unchanged.

## Next session

Owner stopped after approving slide 10 on 25 November 2026. Resume at **slide 11 — The infinite money glitch** (creative direction pending). The proposed oversized café order / insufficient balance scenario is not yet approved. Continue through the rest of Part I before starting production slide implementation. No Codex work, background implementation or new implementation issue is authorized yet. Issue #8 remains open and ready but deliberately pending; retain M4 gate (1, 2, 7), then M5, without bypassing owner reviews. Original 46-slide numbering is intact: 9A/9B merged, 10B discarded. Read current main and open issues before resuming. Keep planning in chat, then checkpoint decisions in GitHub; use issue/PR workflow for eventual implementation. Review rendered screenshots in desktop Firefox with owner.

Slides 11–46 remain open for creative development; STORYBOARD.md provides the living plan and technical notes. FHE demo expansion and contemporary confidential-chain use case remain optional; closing handshake callback is a candidate. No exact new visual reference files committed; use approved descriptions, not rough chat sketches as production assets.
