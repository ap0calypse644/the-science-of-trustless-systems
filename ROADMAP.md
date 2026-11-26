# Roadmap

Explicit owner review gates each milestone. A dependency means an approved deliverable from the preceding work. M0 is approved. The owner approved D — Expressive Minimalism and a pure-white canvas. M1 is merged. M2 is merged. M3 is approved and merged (PR #7); desktop Firefox manual checks passed. M4 is complete. M5a is approved and merged. M5b is approved and merged. The owner approved M5c visual staging and production; PR #17 is merged. M5d staging and production approved and merged in PR #21. M5e production approved and merged in PR #23; M5f production (22–26) is owner-approved and merged in PR #25; #24 closed. Part I creative planning is complete (slides 1–32); production 1–26 remains merged. M5g visual staging (27–29) is owner-authorized; production and M5h (30–32) require separate approval. See [CONTINUATION.md](CONTINUATION.md) for approved 1–32 and provisional Parts II/III. The owner approved M4a for slides 1–2 and PR #9 is merged. The owner approved M4b and PR #11 is merged. This planning checkpoint does not change M4 or later milestone gates. Milestone scope gates remain in force; slide count and time allocations are approximate, not rigid pass/fail targets.

| Milestone | Dependencies | Deliverables | Acceptance criteria |
| --- | --- | --- | --- |
| M0.1 — Documentation | Project brief | README, agent instructions, design, architecture, storyboard, roadmap | All six files agree on scope and constraints. Storyboard provides a nominal 120-minute plan. Provisional choices are identified. Changes are documentation only. |
| M0.2 — Framework initialization | Approved M0.1 | Minimal Reveal.js, TypeScript, Vite, and npm foundation, lockfile, build and test entry points, setup instructions | A clean setup builds and runs a minimal 16:9 deck shell. The shared production smoke suite passes in Playwright Firefox (primary) and Chromium (secondary), including local assets and speaker view with off-origin requests blocked. README documents desktop Firefox verification. |
| M1 — Visual identity | Approved M0 | Three archived visual candidates, three refined illustration candidates on pure white, nine refined matched samples, three character sheets, local fonts, and candidate tokens | The shared Firefox and Chromium suite checks the review deck and diagnostic deck. Screenshots demonstrate legibility, contrast, safe areas, and non-color cues at representative resolutions. The owner’s selection is reflected in the review deck. M1 finalization requires PR review before M2. |
| M2 — Illustration library | Approved M1 | Reusable SVG characters, poses, expressions, speech bubbles, and diagram props using deterministic authored paths, plus an illustration review gallery | Original artwork uses consistent roles and line weights. Fixed inputs render repeatably. The gallery demonstrates pose changes, articulation pivots, prop contact, and two approved-style compositions. M2 was approved before M3 began. |
| M3 — Controls and animation engine | Approved M2 | Standalone diagnostic deck, scene lifecycle, GSAP controller, keyboard bindings, seek and checkpoint UI, notes and navigation integration | Playback starts paused and supports all presenter commands. Navigation remains independent. Revisits reset predictably. Browser checks cover lifecycle, focus, and shortcut conflicts. |
| M4 — Three prototypes | Approved M3 | Title slide, static single-point-of-failure comic, animated Two Generals slide, speaker notes, representative print stills | Prototypes meet theme and readability goals. The five-minute Two Generals comedy uses individually accessible teaching checkpoints and supports audience predictions about lost plans, lost acknowledgments, and the final-message argument. All three run offline. |
| M5 — Part I | Approved M4 | Remaining approved Part I slides (32 approved concepts including M4), speaker and source notes, a scripted Byzantine Generals explanation, scripted hashing and binary leading-zero educational mining | Part I follows the revised pacing and problem-driven Bitcoin sequence. Rehearsal includes audience beats and assesses flexible pacing. Demo rules, fault models, puzzle labels, playback, and resets are verified. |
| M6 — Part II | Approved M5 | Privacy history, MPC, FHE, and ZKP slides and demonstrations with speaker and source notes | All Part II topics are covered and claims, assumptions, and toy labels are reviewed. Part II is rehearsed with flexible pacing. Interactions work offline and reset cleanly. |
| M7 — AMA, closing, references | Approved M6 | AMA prompt and notes, closing slide, readable references | Audience questions, closing, and references are planned with a flexible 30-minute guide. Citations are traceable without live network access. |
| M8 — Rehearsal and delivery | Approved M7 | Browser test results, rehearsal and projector checks, offline package and launch instructions, static PDF | Full lecture is rehearsed in desktop Firefox with the nominal two-hour duration as guidance. The package starts with internet disconnected on the presentation machine. Fullscreen, dual-monitor speaker view, responsive scaling, animation performance, and projector readability are verified. Every slide has a readable PDF counterpart. |

## Presentation scope update

Owner decision (25 Nov 2026): the lecture uses static or presenter-paced scripted animated slides only. No live audience/presenter inputs that change the educational model, branching buttons, live cryptographic computations or worker searches are required. Preserve ordinary playback/navigation/seek/reset controls, verbal audience predictions, local offline operation and editable art. Use internally consistent authored examples. Identify simulated outputs in speaker notes and prompt the presenter to disclose them verbally. Keep substantive technical labels and essential toy-model caveats on slides. This supersedes earlier interactive and real-computation requirements. Slide 6 scripted correction merged in PR #19; preserve archived diagnostic/staging routes. M5d is approved and merged in PR #21. M5e production is approved and merged in PR #23. M5f production (22–26) is owner-approved and merged in PR #25; #24 closed. Part I creative planning is complete (slides 1–32); production 1–26 remains merged. M5g visual staging (27–29) is owner-authorized; production and M5h (30–32) require separate approval. Later batches require separate authorization.

## Proposed issue-sized implementation queue

These are planning briefs, not open issues or implementation authorization. Keep each PR owner-reviewed; M4 approval precedes M5.

| Batch | Scope | Specific gate |
| --- | --- | --- |
| M4a (#8) | 1–2 | Owner-approved and merged in PR #9 |
| M4b (#10) | 7 | Owner-approved and merged in PR #11 |
| M5a (#12) | 3–6 | Owner-approved and merged in PR #13 |
| M5b (#14) | 8 | Owner-approved and merged in PR #15 |
| M5c (#16) | 9–13 | Owner-approved and merged in PR #17 |
| Slide 6 correction (#18) | 6 | Owner-approved scripted CAP sequence, merged in PR #19 |
| M5d (#20) | 14–17 | Owner-approved and merged in PR #21 |
| M5e (#22) | 18–21 | Owner-approved and merged in PR #23 |
| M5f (#24) | 22–26 | Owner-approved and merged in PR #25 |
| M5g | 27–29 | Stake/BFT; concepts approved, visual staging authorized; production separately gated |
| M5h | 30–32 | Beyond cryptocurrency and privacy bridge; concepts approved, staging separately gated |
| M5i | Integrated Part I (1–32) | Full rehearsal, notes, source/asset audit, browser tests, print stills |

Shared acceptance: preserve diagnostics and presenter engine; offline local assets; deterministic playback, clean reset/seek/navigation; fixed example consistency and disclosure of authored outputs in notes and verbally; print compositions and desktop Firefox screenshots for owner review. Parts II/III retain provisional scope and shifted provisional numbering 33–52/53–55. Timing remains flexible within nominal two-hour talk.
