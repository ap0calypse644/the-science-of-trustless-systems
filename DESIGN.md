# Visual design

The slides support a live speaker. Give each slide one visual question, reveal, or takeaway. Put derivations, caveats, and extended explanations in speaker notes. Use a comic beat or pop-culture reference when it reinforces the concept and works for students unfamiliar with the reference.

## Problem-driven storytelling

Give a technical concept a reason to exist before naming it. Start with a relatable problem, let the audience propose an intuitive solution, then show its limits. A recurring character can expose a weakness where it helps the explanation. Introduce the mechanism that addresses it and let the consequence lead to the next question.

Use this progression where it helps the lecture flow, from agreement and replicated ledgers to privacy and controlled disclosure. Keep the speaker free to follow student suggestions and let simpler explanations stand on their own. Use original recurring characters, examples, dialogue, and staging. Pop-culture references are optional Easter eggs.

## Canvas and typography

- Design for a 16:9 canvas and responsive scaling. Keep labels and speech bubbles inside safe margins, with room for presenter controls and browser or projector cropping.
- Use pure white (#FFFFFF) for the presentation canvas, as required by the owner. Use near-black ink and selective accents. Pair color with labels, line patterns, shapes, or position when encoding states such as a dropped message or a conflicting vote.
- Use legible handwritten typography for short text and a readable supporting face where appropriate. Use local Kalam for titles and major headings and Patrick Hand for speech and short annotations. Use system sans-serif where technical symbols need broader glyph coverage. Establish size and stroke-width targets through projected trials.
- Place titles high on the canvas by default, keeping the main content area clear. Favor a few large labels, clear reading order, and generous whitespace. Keep equations sparse and large. Verify critical text and linework on a classroom projector from typical audience distances.

## Illustration and motion

Owner decision (25 Nov 2026): the lecture uses static or presenter-paced scripted animated slides only. No live audience/presenter inputs that change the educational model, branching buttons, live cryptographic computations or worker searches are required. Preserve ordinary playback/navigation/seek/reset controls, verbal audience predictions, local offline operation and editable art. Use fixed internally consistent illustrative examples, clearly label simulated hashes/proofs/results, never imply they are actual computed cryptographic outputs. This supersedes earlier interactive and real-computation requirements. Slide 6 scripted correction merged in PR #19; preserve archived diagnostic/staging routes. M5d revised visual staging (14–17) is authorized under issue #20; production and later batches remain separately gated.

- Draw original stick figures with readable silhouettes, simple poses, expressive faces, and concise speech bubbles. Take inspiration from the general educational explainer aesthetic of MinuteEarth, MinutePhysics, and XKCD. Create original poses, characters, compositions, and jokes.
- Use the M2 reusable SVG character parts and props derived from the approved organic stick-figure direction. Preserve recognizable head shapes, weight shifts, and body language. Preserve stable visual roles within a scene, especially for senders, recipients, validators, and adversarial actors.
- Use movement to show a meaningful change such as message delivery, a split history, or a computation step. Pause at states worth discussing. Use fixed scripted demonstrations with prediction pauses; no editable input or branching choice controls.
- Use fictional names, transactions, and scenarios. Use internationally relatable examples, neutral currency units, and no demographic-specific localization or samosas. Optional pop-culture references generally use original imagery. Slide 5 is a specific owner-approved exception: the actual three-Spider-Man pointing meme, subject to provenance and redistribution rights; see CONTINUATION.md. Keep toy cryptography labels visible wherever students operate the demonstration.
- Plan a print composition for each slide. Comics can use their full panel sequence. Animated scenes need an informative still or compact sequence that preserves the teaching point.

## Production slide decisions

[CONTINUATION.md](CONTINUATION.md) records the owner-approved slide 1–25 directions, superseding the historical review compositions below for production slides. Keep pure white and the approved M2 characters; vary heading treatment and composition to suit each slide. The title's bold integrated lettering is not a mandatory template for later slides.

Approved visual arcs: café and signatures (9–13); hash machine and avalanche (14–15); nonce and verification (16–17); Alice's growing list (18), unlinked pages/blocks (19), Charlie and Alice hash-link sequence (20), competing histories (21), sequential re-mining (22), mining race and confirmations (23), Alice buried under boxes and white flag (24), subsidy and enthusiastic return (25), restrained Bitcoin reveal (26). Later stake, state, Merkle and interoperability outlines provisional. See CONTINUATION.md. Original editable artwork, illustrative labels, local licensed assets and no runtime computation. Earlier meme, likeness and brand exceptions require provenance/rights review.

## M1 archive · Candidates A–C

The same three scenes support comparison between treatments. The title uses a shared notebook and sealed envelope. The server comic contrasts working and failed connections. The lost-message still leaves both generals waiting. Keep the underlying story and on-screen wording constant across candidates.

| Candidate | Composition and color | Display / heading | Speech / annotation | Main ink |
| --- | --- | --- | --- | --- |
| A — The Whiteboard | Near-white, centered headings, open diagrams, sparing green and red state marks | Patrick Hand Regular, 112 / 92 px | Patrick Hand Regular, 44 / 40 px | 5.5 px |
| B — The Scientist’s Notebook | Warm ivory, slight heading tilt, margin rule, soft ochre and sage washes, sketched arrows | Kalam Regular, 105 / 88 px | Kalam Regular, 43 / 40 px | 5.5 px |
| C — The Comic Strip | Warm light ground, bold left-aligned titles, irregular panels, stronger amber and teal fills, exaggerated reactions | Balsamiq Sans Bold, 105 / 84 px | Balsamiq Sans Regular, 42 / 39 px | 7 px |

Sizes are logical pixels on a 1920×1080 canvas. The SVG illustration scales to the available slide width. The system sans-serif stack is the candidate role for mathematical symbols and other technical labels that need wider glyph coverage. The optional `?type=1` view provides a title-slide specimen for case, digits, punctuation, and mathematical symbols. Caveat is deferred so each evaluated treatment can be compared using a single handwriting family. The bundled subsets cover the Latin sample content. Confirm glyph coverage for future content before selecting production font assets. [Font sources and SIL OFL 1.1 notices](public/review-font-licenses/SOURCES.md)

The candidate CSS custom properties define paper, primary and secondary ink, accent fills, honest, adversarial and neutral roles, success, failure and muted states, stroke weights, typography, spacing, safe margins, and bubble fill. The sheet keeps 144 logical px horizontal and 100 px vertical padding. Stroke weights distinguish detail, main contours, and emphasis. A check or cross, connected or broken links, and facial expressions carry state information alongside color.

The original inline SVGs use fixed paths, small asymmetries, and shared sample geometry to make comparison repeatable. The A–C pose and prop helpers are local to that archive. The approved D treatment uses the shared M2 library.

Primary ink against the paper measures about 15.2:1 for A, 13.3:1 for B, and 15.5:1 for C using sRGB relative luminance. The sample tests exercise 16:9 at two sizes and verify letterboxing at 1024×768. Inspect panel density, fine lines, bubble lettering, and the smallest annotations in desktop Firefox. Projector brightness, viewing distance, and physical hardware still need rehearsal.

The original treatments remain available for comparison. The owner rejected the warm and off-white grounds for the production canvas.


## Approved direction · D — Expressive Minimalism

D, E, and F share a pure white canvas and use near-black #222222 ink, Kalam at 106 px for display titles and 91 px for headings, Patrick Hand at 42 px for speech and 40 px for labels, and system sans-serif for math. The owner approved D across all scenes, with pure white, Kalam headings, Patrick Hand dialogue and labels, restrained accents, and open composition. Use panels where the story benefits. E and F are archived references. Exact sizes, accent values, and stroke refinements remain open for M2. The current accent proposal uses blue #527DA8, green #62966B, red #C95650, yellow #E9B949, purple #9276B5, and neutral #E5E7EB. Small features and props carry color while the backgrounds stay white.

| Candidate | Character construction |
| --- | --- |
| D · Expressive Minimalism | Curved stick anatomy, individually shaped faces, quick strokes, and strong changes in weight and limb direction. |
| E · Cartoon Minimalism | Oversized heads with distinct contours, compact bodies, larger gestures, and visible fingers and shoes. |
| F · Sketchbook Cartoons | Smaller angular heads, more varied proportions, longer legs, unequal stance widths, garment seams, and selective hatching. |

Alice has swept hair tied back, a neck scarf, and emphatic gestures. Bob has curls and glasses, with a more measured stance and a tendency to inspect or ask. Charlie has angular hair and an off-center smirk, with a lean that reads as trying to get away with something. Accessories, posture, and silhouettes distinguish them alongside color. All three styles show Alice in the same seven pose prompts, with authored changes in the shoulders, hands, legs, and weight shift.

The revised title depicts conflicting ledger copies and a deliberately guarded envelope. In the failure sample two terminals share a smoking server, and Alice arrives with a hand fan. In the lost-message still a courier bogs down between two waiting generals. Use selective smoke, motion marks, and reactions where they communicate the story. These illustrations are review-only SVG poses and props. Heads, limbs, facial details, costume and props are grouped where it helps evaluate future articulation.

M2 preserves D’s authored character paths and cast silhouettes. Reserve Eve for eavesdroppers and Mallory for explicitly malicious adversaries in future slides. Review fine stroke, expression, and accent adjustments on the approved base style. Verify small features, speech, and thin strokes on the classroom projector from audience distance. The browser captures establish fit and legibility at representative viewport sizes.
