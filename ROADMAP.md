# Roadmap

Explicit owner review gates each milestone. A dependency means an approved deliverable from the preceding work. M0 is approved. The owner approved D — Expressive Minimalism and a pure-white canvas. M1 is merged. M2 is merged. M3 is approved and merged (PR #7); desktop Firefox manual checks passed. M4 is complete. M5a staging is at owner review. See [CONTINUATION.md](CONTINUATION.md) for all 25 Part I approvals and restart point. Creative prototyping for Part I is complete. The owner approved M4a for slides 1–2 and PR #9 is merged. The owner approved M4b and PR #11 is merged. This planning checkpoint does not change M4 or later milestone gates. Milestone scope gates remain in force; slide count and time allocations are approximate, not rigid pass/fail targets.

| Milestone | Dependencies | Deliverables | Acceptance criteria |
| --- | --- | --- | --- |
| M0.1 — Documentation | Project brief | README, agent instructions, design, architecture, storyboard, roadmap | All six files agree on scope and constraints. Storyboard provides a nominal 120-minute plan. Provisional choices are identified. Changes are documentation only. |
| M0.2 — Framework initialization | Approved M0.1 | Minimal Reveal.js, TypeScript, Vite, and npm foundation, lockfile, build and test entry points, setup instructions | A clean setup builds and runs a minimal 16:9 deck shell. The shared production smoke suite passes in Playwright Firefox (primary) and Chromium (secondary), including local assets and speaker view with off-origin requests blocked. README documents desktop Firefox verification. |
| M1 — Visual identity | Approved M0 | Three archived visual candidates, three refined illustration candidates on pure white, nine refined matched samples, three character sheets, local fonts, and candidate tokens | The shared Firefox and Chromium suite checks the review deck and diagnostic deck. Screenshots demonstrate legibility, contrast, safe areas, and non-color cues at representative resolutions. The owner’s selection is reflected in the review deck. M1 finalization requires PR review before M2. |
| M2 — Illustration library | Approved M1 | Reusable SVG characters, poses, expressions, speech bubbles, and diagram props using deterministic authored paths, plus an illustration review gallery | Original artwork uses consistent roles and line weights. Fixed inputs render repeatably. The gallery demonstrates pose changes, articulation pivots, prop contact, and two approved-style compositions. M2 was approved before M3 began. |
| M3 — Controls and animation engine | Approved M2 | Standalone diagnostic deck, scene lifecycle, GSAP controller, keyboard bindings, seek and checkpoint UI, notes and navigation integration | Playback starts paused and supports all presenter commands. Navigation remains independent. Revisits reset predictably. Browser checks cover lifecycle, focus, and shortcut conflicts. |
| M4 — Three prototypes | Approved M3 | Title slide, static single-point-of-failure comic, animated Two Generals slide, speaker notes, representative print stills | Prototypes meet theme and readability goals. The five-minute Two Generals comedy uses individually accessible teaching checkpoints and supports audience predictions about lost plans, lost acknowledgments, and the final-message argument. All three run offline. |
| M5 — Part I | Approved M4 | Remaining approved Part I slides (25 total including M4), speaker and source notes, an explicit-protocol Byzantine Generals demo, a real SHA-256 demo, and responsive binary leading-zero educational mining | Part I follows the revised pacing and problem-driven Bitcoin sequence. Rehearsal includes audience beats and assesses flexible pacing. Demo rules, fault models, puzzle labels, playback, and resets are verified. |
| M6 — Part II | Approved M5 | Privacy history, MPC, FHE, and ZKP slides and demonstrations with speaker and source notes | All Part II topics are covered and claims, assumptions, and toy labels are reviewed. Part II is rehearsed with flexible pacing. Interactions work offline and reset cleanly. |
| M7 — AMA, closing, references | Approved M6 | AMA prompt and notes, closing slide, readable references | Audience questions, closing, and references are planned with a flexible 30-minute guide. Citations are traceable without live network access. |
| M8 — Rehearsal and delivery | Approved M7 | Browser test results, rehearsal and projector checks, offline package and launch instructions, static PDF | Full lecture is rehearsed in desktop Firefox with the nominal two-hour duration as guidance. The package starts with internet disconnected on the presentation machine. Fullscreen, dual-monitor speaker view, responsive scaling, animation performance, and projector readability are verified. Every slide has a readable PDF counterpart. |

## Proposed issue-sized implementation queue

These are planning briefs, not open issues or implementation authorization. Keep each PR owner-reviewed; M4 approval precedes M5.

| Batch | Scope | Specific gate |
| --- | --- | --- |
| M4a (#8) | 1–2 | Owner-approved and merged in PR #9 |
| M4b (#10) | 7 | Owner-approved and merged in PR #11 |
| M5a (#12) | 3–6 | Visual staging at owner review before production and interactive CAP |
| M5b | 8 | OM model and three/four-general cases; fault assumptions and reset |
| M5c | 9–13 | Café continuity, ledger arithmetic, medieval note/castle transformation |
| M5d | 14–16 | SHA-256 vectors, avalanche count, responsive real binary mining, linked pages |
| M5e | 17–21 | Separate economic beats, valid greatest-work fork selection, subtle reveal |
| M5f | 22–25 | Bill/cameo, BFT threshold, fictional AI credits, IBC verification |
| M5g | Integrated 1–25 | Full Part I rehearsal, notes, source/asset audit, browser tests, print stills |

Shared acceptance: preserve diagnostics and presenter engine; offline local assets; deterministic playback, clean reset/seek/navigation; real hash and mining tests, explicit model labels, no fabricated outputs; print compositions and desktop Firefox screenshots for owner review. Parts II/III retain provisional scope and shifted numbering 26–45/46–48. Timing remains flexible within nominal two-hour talk.
