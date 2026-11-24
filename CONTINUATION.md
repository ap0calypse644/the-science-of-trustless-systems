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
- M4 remains the prototype gate: Slides 1, 2 and 7, notes, print stills. Slides 1–2 have approved visual concepts; slide 7's teaching sequence is defined in STORYBOARD but detailed artwork/staging still needs owner review. Slides 3–6 are approved concepts for later production, not an instruction to bypass M4. M5 completes Part I; M6 Part II; M7 AMA/closing/references; M8 rehearsal, delivery, offline package and PDF.

## Visual rules (approved)

Pure white #FFFFFF canvas, near-black #222 ink, sparse accents blue #527DA8, green #62966B, red #C95650, yellow #E9B949, purple #9276B5, neutral #E5E7EB. Pair state color with shape/label/line cues. Original expressive stick figures, not chibi or detailed human anatomy. Alice: blue scarf, tied-back hair, practical. Bob: green accessory, curls/glasses, analytical. Charlie: purple accessory, angular hair, expressive mischief or accidental chaos as appropriate. Alice/Bob/Charlie; Eve for eavesdroppers, Mallory for explicitly malicious actors. Kalam major headings, Patrick Hand speech/annotations, system sans technical labels; local assets with license notices. Vary headings/composition across slides; do not repeat the title slide's dramatic lettering everywhere. No overarching franchise theme. Pop culture is occasional; slide 5 is a specific owner-approved exception to original-only artwork, subject to asset rights.

## Approved slide decisions (1–6)

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

Owner chose rough composition A, not the puppet-master C or samosa B. Replace rough placeholder stick figures with polished approved M2 characters.
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
1. Both replicas synced at ₹1,000; connected network.
2. Break the link, show failed network messages; both branches still running.
3. Charlie withdraws ₹1,000 at A; A accepts and records ₹0, B still stores ₹1,000. Show cash received, completed write before the next read.
4. Charlie walks to B and asks his balance; B cannot establish the latest balance from its local state.
5. Pause for audience debate; two choices: return ₹1,000, or wait until authoritative synchronization. Returning stale value demonstrates a consistency violation for this completed read while answering it. Waiting indefinitely through a partition sacrifices availability for this request, but avoids a stale read. Do not imply that either branch by itself proves a complete protocol's CAP guarantees.
6. Allow stepping back/replaying the decision and exploring both paths, then restore connection, synchronize to ₹0, and complete any waiting read. Explicit reset restores all values, link, Charlie, branch state and pending requests.
- Use the established engine and deterministic state transitions; accessible controls, visible checkpoint names, repeatable back/forward/reset. The rough chat widget had a branch-index/display bug; do NOT copy its code. Build explicit state machine and test both branches, restore, reset, revisit, seek/checkpoint transitions and keyboard focus.
- Notes: simplified read-after-write history, not a complete banking protocol. The consistency-prioritizing design could have refused the earlier write instead; illustrate the local dilemma without claiming a particular real bank architecture. Distinguish linearizability from eventual convergence and CAP availability from uptime. Use clear local balance vs returned value labels.
- Print still: partitioned A=₹0/B=₹1,000 with both decision outcomes readable.

## Next session

Owner stopped after approving slide 6; local Codex is intentionally idle until quota recovers. No automation or background implementation. On resume, fetch current main and open issues, read this file and current storyboard; avoid redoing creative decisions. Begin the first authorized prototype implementation (Slides 1–2) once owner directs Codex; finish slide 7's visual direction before its implementation and retain the M4 gate. Continue creative planning at slide 7, not slide 1. Review rendered screenshots in desktop Firefox with owner; then iterate through remaining slides as agreed. Maintain the storyboard as a living plan and update this checkpoint after material changes.

The remaining slide sequence (7–46) and detailed technical notes are already in STORYBOARD.md. No additional slide-specific art decisions beyond slide 6 were made in this session. FHE demo expansion and contemporary confidential-chain use case are optional future ideas, not approved scope. Closing visual callback to handshake is a candidate, not final approval.
