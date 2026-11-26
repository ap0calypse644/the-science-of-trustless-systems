# The Science of Trustless Systems

A browser-based college guest lecture on how distributed systems reach agreement and how cryptography changes what participants need to reveal. The deck supports a live speaker with hand-drawn diagrams, short comics, and presenter-paced demonstrations.

| Part | Time | Focus |
| --- | ---: | --- |
| I — The Problem of Trust | 45 min | Distributed systems, CAP, both Generals problems, a first-principles Bitcoin reconstruction, alternative consensus designs, non-financial applications, and the privacy bridge |
| II — The Problem of Privacy | 45 min | Privacy properties, cryptographic history, MPC, homomorphic encryption, and zero-knowledge proofs |
| III — Ask Me Anything | 30 min | Audience questions, closing, and references |

The current planning baseline is 55 slides if later scope remains unchanged: 32 approved Part I concepts (all 32 production merged) and 23 provisional Part II/III slides. Timing remains flexible; see CONTINUATION.md.

## Presentation policy

Owner decision (25 Nov 2026): the lecture uses static or presenter-paced scripted animated slides only. No live audience/presenter inputs that change the educational model, branching buttons, live cryptographic computations or worker searches are required. Preserve ordinary playback/navigation/seek/reset controls, verbal audience predictions, local offline operation and editable art. Use internally consistent authored examples. Identify simulated outputs in speaker notes and prompt the presenter to disclose them verbally. Keep substantive technical labels and essential toy-model caveats on slides. This supersedes earlier interactive and real-computation requirements. Issue #18 covers the separately reviewed scripted conversion of slide 6 and preserves archived diagnostic and staging routes. M5d is approved and merged in PR #21; #20 closed. M5e production is approved and merged in PR #23; #22 closed. M5f production (22–26) is owner-approved and merged in PR #25; #24 closed. All 32 Part I slide concepts and production implementations are owner-approved and merged. M5g merged in PR #27 at `899e3529f4b80b33bbc0d4bceb5d6e258311079d`; #26 closed. M5h merged in PR #29 at `9508df8788c8ced442b634b633d53d2de8606e90`; #28 closed. M5i integrated Part I review authorized in #30; Part II remains separately gated. Later batches require separate authorization.

## Development status

M0 is approved. The owner approved D — Expressive Minimalism on pure white. M1 merged in PR #3. The M2 illustration library merged in PR #5. The M3 playback engine and diagnostic deck merged in PR #7 after owner review. The owner approved M4a and PR #9 is merged. M4b is owner-approved and merged in PR #11, completing M4. The owner approved M5a and PR #13 is merged. The owner approved M5b and PR #15 is merged. The owner approved M5c staging and production, and PR #17 is merged. M5d staging and production approved and merged in PR #21. Main contains production slides 1–32. M5e production approved and merged in PR #23; M5f production (22–26) is owner-approved and merged in PR #25; #24 closed. All 32 Part I slide concepts and production implementations are owner-approved and merged. M5g merged in PR #27 at `899e3529f4b80b33bbc0d4bceb5d6e258311079d`; #26 closed. M5h merged in PR #29 at `9508df8788c8ced442b634b633d53d2de8606e90`; #28 closed. M5i integrated Part I review authorized in #30; Part II remains separately gated. Slides 1–32 creative directions approved; Parts II/III pending individual review. The other treatments remain archived for comparison. The project preserves the three-slide engineering diagnostic deck. The framework uses Reveal.js, TypeScript, Vite, Playwright, and npm. M2 uses deterministic authored SVG paths. M3 uses a local GSAP clock for presenter-paced diagnostics.

The target is a 16:9 deck with responsive scaling, classroom-projector readability, independent slide and animation controls, and offline operation using bundled assets. A static PDF fallback is an M8 deliverable.

## Setup

Use Node.js 24 and its bundled npm. Initial dependency and browser installation requires internet access.

```sh
npm ci
npx --no-install playwright install firefox chromium
```

On Linux, if Playwright reports missing system libraries and you have permission to install them, run `npx --no-install playwright install-deps firefox chromium`.

## Development and verification

| Command | Purpose |
| --- | --- |
| `npm run dev` | Serve the development deck at `http://127.0.0.1:5173` by default. |
| `npm run typecheck` | Check source and tests in TypeScript strict mode. |
| `npm run build` | Generate the production bundle in `dist/`. |
| `npm run preview -- --port 4173 --strictPort` | Serve the current production bundle at `http://127.0.0.1:4173`. |
| `npm test` | Build and run the shared smoke tests in Playwright Firefox and Chromium against a local production preview. Keep port 4173 free. |

Firefox is the primary browser for presentation and development. Playwright's bundled Firefox build is the primary automated target, with Chromium as the secondary compatibility target. The Playwright build is separate from the owner's installed desktop Firefox. To run only the primary project, use `npm test -- --project=firefox`.

## M1 visual review

| Deck | Development | Production preview |
| --- | --- | --- |
| Three engineering diagnostics | [`/`](http://127.0.0.1:5173/) | [`/`](http://127.0.0.1:4173/) |
| Archive A–C, nine visual samples | [`/review/`](http://127.0.0.1:5173/review/) | [`/review/`](http://127.0.0.1:4173/review/) |
| Archive typography specimens | [`/review/?type=1`](http://127.0.0.1:5173/review/?type=1) | [`/review/?type=1`](http://127.0.0.1:4173/review/?type=1) |
| Approved D and archived E–F | [`/review/?set=refined`](http://127.0.0.1:5173/review/?set=refined) | [`/review/?set=refined`](http://127.0.0.1:4173/review/?set=refined) |

For development, run `npm ci` followed by `npm run dev -- --port 5173 --strictPort`. For production review, use the preview commands below. Open the approved review URL in desktop Firefox. It starts on D’s title slide. Left and Right navigate, the style buttons switch treatments while keeping the current sample, and **Character poses** jumps to the active candidate’s Alice sheet. **Archive A–C** and **Approved D** switch decks. The E and F buttons open archived references for the same sample. Escape opens overview, F opens fullscreen, and S opens speaker view. Add `&type=1` to the refined URL to show title glyph specimens.

Run `npm test` to regenerate ignored screenshots in `test-results/visual-review/<browser>/<width>x<height>/` at 1920×1080, 1280×720, and 1024×768. If the local preview already uses port 4173, run `PLAYWRIGHT_PORT=4174 npm test`. The Firefox 1920×1080 run also writes these labeled comparisons using full-size source slides.

- `test-results/visual-review/m1.1-comparisons/title-comparison.png`
- `test-results/visual-review/m1.1-comparisons/failure-comparison.png`
- `test-results/visual-review/m1.1-comparisons/message-comparison.png`
- `test-results/visual-review/m1.1-comparisons/character-comparison.png`

## M2 illustration review

Start the production preview using the commands below. Open [the M2 gallery](http://127.0.0.1:4173/library/) or use [the development gallery](http://127.0.0.1:5173/library/) with the Vite development server. Use the gallery links to compare the cast, all 21 principal pose examples, props and variants, the ledger and server compositions, and the articulation check. In [Articulation](http://127.0.0.1:4173/library/#articulation), choose a pose and expression, move the head or right arm, then use **Reset** to return to the baseline.

The Firefox suite captures `cast.png`, `poses.png`, `props.png`, `ledger.png`, `failure.png`, and `articulation.png` under each of `test-results/visual-review/m2/1920x1080/`, `1280x720/`, and `1024x768/`. These files stay local. The [library API](ARCHITECTURE.md#m2-illustration-api) describes part names and prop placement.

## M3 playback review

From the repository root, run `npm ci`, `npm run build`, and `npm run preview -- --port 4173 --strictPort`. Open [the playback diagnostic](http://127.0.0.1:4173/engine/) in desktop Firefox. For development, use [port 5173](http://127.0.0.1:5173/engine/) with `npm run dev`. The existing root diagnostics, visual review, and illustration gallery remain at their original paths.

1. Press Space to play and pause Envelope delivery. Use J/K to step through beats and the seek slider to go backward. Watch the pose, envelope, and speech return to the earlier state.
2. Change speed with Minus or Plus, then use Right twice to visit the static slide and Ledger inspection. The active scene resets to zero and inherits the speed. Complete a scene, then use R or seek back before replaying.
3. Open overview with Escape while playing, then exit overview and check that playback stays paused. Hide or restore the controls with H or the control button. Use Tab and arrow keys to exercise the slider and use F and S to check fullscreen and speaker notes. Click the slide or tab out of the control bar to use deck shortcuts again.
4. Check speaker notes on a separate window or monitor. The preview follows slide navigation and shows each scene at its initial frame. Playback stays in the main window.

The Firefox suite captures `envelope-beat.png`, `static.png`, and `ledger-beat.png` under each of `test-results/visual-review/m3/1920x1080/`, `1280x720/`, and `1024x768/`. See [scene authoring and controls](ARCHITECTURE.md#m3-playback-engine).

## M4a production slide review

Run `npm ci`, `npm run build`, and `npm run preview -- --port 4173 --strictPort`. Open [the production lecture](http://127.0.0.1:4173/talk/) in desktop Firefox. The [development route](http://127.0.0.1:5173/talk/) is available with `npm run dev`.

- Check that the huge hands approach on a diagonal with clear space between them. Alice, Bob and Charlie operate the mechanism, and the title sits in the lower-right open space.
- Trace each computer cable into its own receptacle in the shared strip. Follow the strip's single supply cord to the loose plug, then trace the phone cable to the charger in the wall. The large crosses show the simultaneous outages.
- Use Left and Right to navigate, Escape for overview, F for fullscreen and S for speaker notes. Space leaves the current slide in place.
- Open [the print compositions](http://127.0.0.1:4173/talk/?print) to print twenty-one 16:9 sheets, including the CAP, final-reply and Byzantine report comparisons.

The Firefox tests write review screenshots to `test-results/visual-review/m4a-reference-pass/<width>x<height>/`. The editable artwork was revised against the owner-supplied concept images, which are kept outside the repository.

## M4b production review

Open [slide 7](http://127.0.0.1:4173/talk/#/07-two-generals) in desktop Firefox. Space plays or pauses, and playback stops at the next named beat. J and K step backward and forward, R resets, and Minus and Plus adjust speed. H hides the controls. S opens notes with a baseline preview. The final checkpoint holds on both outcomes, with Charlie’s audience-only reaction in the lost-reply panel. The [print view](http://127.0.0.1:4173/talk/?print) shows the two outcomes and the generals’ evidence.

Firefox captures all eight beats and the print comparison at 1920×1080 under `test-results/visual-review/m4b-production/`, plus the final comparison at 1280×720 and 1024×768.

## M4b approved staging reference

With the production preview running, open [the staging stills](http://127.0.0.1:4173/talk/staging/) in desktop Firefox. Use Left and Right to compare the opening, courier escalation, and the two possible outcomes of the final reply. Firefox captures are in `test-results/visual-review/m4b-staging/1920x1080/`.

## M5a production review

Use desktop Firefox with production preview running. Open [the production bank scene](http://127.0.0.1:4173/talk/#/06-consistency-or-availability), [Why distribute?](http://127.0.0.1:4173/talk/#/03-why-distribute), [the governance comparison](http://127.0.0.1:4173/talk/#/04-centralized-distributed-decentralized), or [the CAP meme](http://127.0.0.1:4173/talk/#/05-cap-theorem).

1. Press Space to play to the next beat or K to jump there. Watch Charlie walk from A to B after the withdrawal.
2. Pause at **Balance inquiry · Predict** for a verbal prediction. Advance to **Stale reply** to see B return 1,000 while A stores 0.
3. **Alternative run** restores the same partitioned inquiry before any reply. Continue to **Wait for sync**, then **Reconnect**. Both replicas store 0 on reconnection, and B completes the waiting read with 0.
4. J steps backward, the seek slider can reach either outcome directly, and R resets to **Synced**. S opens notes with a baseline preview. The [print view](http://127.0.0.1:4173/talk/?print) compares both possible responses under partition.

The eight checkpoints span 24 seconds at 1×. Firefox production captures are under `test-results/visual-review/m5a-production/<width>x<height>/`.

## M5a approved staging reference

With production preview running, open [the M5a stills](http://127.0.0.1:4173/talk/m5a/) in desktop Firefox. Use Left and Right to review the distribution, governance, and CAP scenes. The CAP bank scene has eight stills, including both responses and reconnection after the waiting outcome. This independent route preserves the approved stills.

Firefox screenshots are in `test-results/visual-review/m5a-staging/<width>x<height>/`. The 1920×1080 directory contains all eleven stills, named by their review IDs. The smaller directories contain the distribution, governance, asset-placeholder, and bank-choice stills.

### Slide 5 asset provenance

[Know Your Meme traces the original two-character frame](https://knowyourmeme.com/memes/spider-man-pointing-at-spider-man/) to the 1967 animated episode “Double Identity.” Production slide 5 bundles the distinct [three-character Imgflip template 206014687](https://imgflip.com/memetemplate/206014687/3-Spidermen-Pointing-at-each-other), served as [3enly7.jpg](https://i.imgflip.com/3enly7.jpg), a 600×551 JPEG listed as a user upload. The inspected file has SHA-256 `44e3d3465eea6ea9e51656ff0b7f5e326a3edd7f5d778aa43c4bb3db269ae823`. Its editor, first publication, and permission to redistribute the composited image and underlying cartoon art are unverified. The template page and [Imgflip’s terms](https://imgflip.com/terms) do not establish permission for this project to bundle it.

The project owner authorized the exact file for this repository in issue #12. Public access to the template is distinct from a free license. This third-party image is excluded from the project’s original-art license claims. The production and print views load the local bundle. The historical staging route retains its labeled placeholder and local-only picker.

## M5b production review

Open [slide 8](http://127.0.0.1:4173/talk/#/08-byzantine-generals) in desktop
Firefox. Space plays to the next checkpoint, J/K step through reveals, and R
resets. At the first table, predict Bob’s decision before revealing the tie.
At the second, compare Bob’s two Attack reports with Charlie’s three.
S opens notes and an opening-state preview. The
[print view](http://127.0.0.1:4173/talk/?print) places both cases on one sheet.
Firefox production captures are under
`test-results/visual-review/m5b-production/<width>x<height>/`.

## M5b approved staging reference

Open [the slide 8 staging deck](http://127.0.0.1:4173/talk/m5b/) in desktop Firefox. Use Left and Right to review the battlefield, Bob’s direct order and Mallory’s report, the three-general tie, Charlie arriving in the foreground, and the [four-general report table](http://127.0.0.1:4173/talk/m5b/#/08-four-generals). These stills stage a scripted animation.

Firefox screenshots are under `test-results/visual-review/m5b-scripted-staging/<width>x<height>/`. The 1920×1080 directory contains all six revised stills. The two smaller directories contain the three- and four-general report tables.

## M5c staging review

Open [the café and ledger stills](http://127.0.0.1:4173/talk/m5c/) in desktop
Firefox. Use Left and Right to step through all 17 stills. Check Bob’s line in
[Receipt chaos](http://127.0.0.1:4173/talk/m5c/#/09-receipt-chaos).
**The Double-Spend Problem** starts with [a fresh 20-unit balance](http://127.0.0.1:4173/talk/m5c/#/13-fresh-balance),
then shows [conflicting local histories](http://127.0.0.1:4173/talk/m5c/#/13-local-acceptance),
the [morph midpoint](http://127.0.0.1:4173/talk/m5c/#/13-morph-keyframe),
and the [battlefield callback](http://127.0.0.1:4173/talk/m5c/#/13-battlefield),
where the title changes to **We Are Back to the Generals**.
Firefox captures are under `test-results/visual-review/m5c-staging/<width>x<height>/`.
The owner approved these 17 staging frames. The route remains available as a
reference for the production review.

## M5c production review

After rebuilding and starting the preview, use desktop Firefox to open the
[shared ledger](http://127.0.0.1:4173/talk/#/09-shared-ledger). Use Left and
Right to navigate slides. Space plays to the next beat, J/K step, R resets,
Minus/Plus adjust speed, and H hides the controls. S opens speaker notes with
an opening-frame preview.

| Slide | Duration at 1× | Checkpoints |
| --- | ---: | --- |
| [09 A Shared Ledger](http://127.0.0.1:4173/talk/#/09-shared-ledger) | 9 s | Café setup, Receipt chaos, Alice’s idea, Notebook reveal |
| [10 Unauthorized transactions](http://127.0.0.1:4173/talk/#/10-unauthorized-transactions) | 11.5 s | Notebook open, Unsigned entry, Bob objects, Bob writes and signs, Authorization contrast |
| [11 The Infinite Money Glitch](http://127.0.0.1:4173/talk/#/11-infinite-money-glitch) | Static | Signed order rejected against Charlie’s five units |
| [12 Who Controls the Ledger?](http://127.0.0.1:4173/talk/#/12-who-controls-the-ledger) | 9 s | One shared notebook, Missing notebook, Access monopoly, Replicated copies |
| [13 The Double-Spend Problem](http://127.0.0.1:4173/talk/#/13-double-spend-problem) | 11 s | Fresh balance, Two signatures, Local acceptance, Battlefield reveal |

On slide 13, play from Local acceptance to watch the notebook pages fold into
the messenger notes. Seek backward from the reveal to see the café and its
opening title return. The [print view](http://127.0.0.1:4173/talk/?print)
includes one evidence sheet per slide. Firefox captures are under
`test-results/visual-review/m5c-production/<width>x<height>/`.

## M5d staging review

Build and start the preview, then open [the 18 hash and proof-of-work stills](http://127.0.0.1:4173/talk/m5d/)
in desktop Firefox. Left and Right move between keyframes. S opens speaker
notes, which identify the hash patterns and nonce attempts as authored examples.
These approved stills remain available as a reference for production review.

| Slide | Planned checkpoints in staging order | Planned print evidence |
| --- | --- | --- |
| [14 Giving Data a Fingerprint](http://127.0.0.1:4173/talk/m5d/#/14-machine) | Machine, greeting, ledger, library, identical ledger copies | Greeting, ledger and library feeding equal-size outputs, with the identical-copy result |
| [15 What If We Change Just One Bit?](http://127.0.0.1:4173/talk/m5d/#/15-original) | Save original, edit amount, isolate the bit, compare grids, detect edit | Side-by-side grids with 132 outlined positions on each and a caption about the trusted original |
| [16 Prove That You Have Done Some Work](http://127.0.0.1:4173/talk/m5d/#/16-target) | Target and initial miss, signature failure and undo, nonce 0, failed attempts, nonce 7 success | Signed ledger, nonce 7, highlighted target bits and representative misses |
| [17 Hard to Solve, Easy to Verify](http://127.0.0.1:4173/talk/m5d/#/17-handoff) | Handoff, verify once, compare expected search work | Expected-attempts table next to one hash and target check |

Firefox writes all 18 captures by still ID under
`test-results/visual-review/m5d-staging/1920x1080/`. The 1280×720 and
1024×768 folders contain the library, avalanche, successful nonce and work
comparison stills. Run `npm test -- tests/m5d-staging.spec.ts --project=firefox`
to regenerate them.

## M5d production review

Use the usual playback controls in desktop Firefox. Space plays to the next
checkpoint. J/K step, R resets, Minus/Plus adjust speed, H hides controls and S
opens notes with the baseline preview. Present the hash outputs as authored
examples before showing them.

| Slide | Duration at 1× | Checkpoints |
| --- | ---: | --- |
| [14 Giving Data a Fingerprint](http://127.0.0.1:4173/talk/#/14-data-fingerprint) | 12 s | Machine, Greeting, Ledger, Library, Identical copies |
| [15 What If We Change Just One Bit?](http://127.0.0.1:4173/talk/#/15-one-bit) | 13 s | Save original, Edit amount, One bit, Avalanche, Edit detected |
| [16 Prove That You Have Done Some Work](http://127.0.0.1:4173/talk/#/16-proof-of-work) | 15 s | Target and first miss, Signature failure, Undo and nonce 0, Failed attempts, Nonce 7 succeeds |
| [17 Hard to Solve, Easy to Verify](http://127.0.0.1:4173/talk/#/17-easy-verification) | 9 s | Handoff, Verify once, Expected work |

Firefox captures are in `test-results/visual-review/m5d-production/<width>x<height>/`.
The [17-sheet print view](http://127.0.0.1:4173/talk/?print) includes the proof
and hash evidence. Production motion awaits final owner review.

## M5e staging review

Build and start the preview, then open [the 22 ledger-history stills](http://127.0.0.1:4173/talk/m5e/)
in desktop Firefox. Left and Right step through the review stills. S opens notes,
which identify the authored transactions and hash prefixes and give the
assumptions to explain aloud. The 22 approved stills remain available for comparison.

| Slide | Planned production transitions | Planned print evidence |
| --- | --- | --- |
| [18 The Growing Ledger](http://127.0.0.1:4173/talk/m5e/#/18-short-list) | Append transactions one at a time, extend the same sheet, then unroll the excess as Alice’s expression changes | Short list beside the final overflowing list |
| [19 From Pages to Blocks](http://127.0.0.1:4173/talk/m5e/#/19-first-page) | Write each row, turn through four pages, detach them and fold each into a blue block before revealing the new title | Four detached pages beside their matching independent blocks |
| [20 What If Charlie Changes History?](http://127.0.0.1:4173/talk/m5e/#/20-independent-blocks) | Start on the exact block layout from 19, edit and restore, write predecessor hashes in order, then show the immediate mismatch, repair and next mismatch | First mismatch and repaired first link beside the next mismatch, with the last matching link visible |
| [21 Conflicting Histories](http://127.0.0.1:4173/talk/m5e/#/21-common-history) | Show common history and signed payments, extend both views, let Alice and Bob react, and merge the duplicated prefix into one fork | Shared prefix and both candidate blocks, with the unresolved question posed aloud |

Firefox captures all 22 stills by ID in
`test-results/visual-review/m5e-staging/1920x1080/`. The 1280×720 and
1024×768 directories contain four representative stills. Regenerate with
`npm test -- tests/m5e-staging.spec.ts --project=firefox`. The staging route is preserved for the final production review.

## M5e production review

Open the links below in desktop Firefox. Space plays to the next beat, J/K step,
R resets, Minus/Plus adjust speed, H hides controls, and S opens notes with a
baseline preview. Start slide 19 at “Detach pages” to watch the title reveal,
then step into slide 20 to compare the exact block layout. On slide 21, pose
the final question aloud from speaker notes.

| Slide | Duration at 1× | Checkpoints |
| --- | ---: | --- |
| [18 The Growing Ledger](http://127.0.0.1:4173/talk/#/18-growing-ledger) | 10 s | Short list, Growing list, Concern, Overwhelmed |
| [19 From Pages to Blocks](http://127.0.0.1:4173/talk/#/19-pages-to-blocks) | 17 s | First page, Next page, Four pages, Detach pages, Independent blocks |
| [20 What If Charlie Changes History?](http://127.0.0.1:4173/talk/#/20-changing-history) | 29 s | Independent blocks, Unlinked edit, Restore, First link, Blockchain, Link mismatch, Repaired link, Next mismatch |
| [21 Conflicting Histories](http://127.0.0.1:4173/talk/#/21-conflicting-histories) | 17 s | Common history, Conflicting payments, Competing blocks, Disagreement, Fork |

The [print view](http://127.0.0.1:4173/talk/?print) adds evidence sheets
for the growing ledger, pages and blocks, link repair, and the unresolved fork.
Firefox captures are under `test-results/visual-review/m5e-production/<width>x<height>/`.
Owner motion and technical review are pending.

## Desktop Firefox verification

From the repository root, run these commands and leave preview running.

```sh
npm ci
npm run build
npm run preview -- --port 4173 --strictPort
```

Open `http://127.0.0.1:4173` in desktop Firefox. Use Left and Right to navigate and Escape to enter and exit overview.

- **Fullscreen and speaker view.** Press F to fullscreen the presentation and verify it exits with Escape. Press S to open speaker view, allowing pop-ups for the local origin if Firefox prompts. Navigate in the main deck and check that the speaker view follows the slide and displays its note.
- **Dual monitors.** Set the displays to extend. Move the presentation window to the audience display and the speaker view to the presenter display. Focus the presentation window before pressing F. Confirm notes stay on the presenter display and track forward and backward navigation.
- **Responsive scaling.** Resize the window and check that all three slides remain legible, keep their proportions, and fit at different window sizes.
- **Offline operation.** With preview still running, disconnect from the internet, reload the loopback URL, and repeat the navigation and speaker-view checks. The automated suite blocks off-origin page requests and WebSockets during the production smoke test.
- **Future animation performance.** Once scenes exist, use the presentation machine and desktop Firefox to exercise playback, seeking, and checkpoints alongside speaker view. Check responsiveness and assess rendering during a dual-monitor rehearsal.

Desktop Firefox, dual-monitor operation, an internet-disconnected rehearsal, and projector readability require manual verification. Full rehearsal and projector acceptance are scheduled for M8.

## Project documents

- [Continuation / restart point](CONTINUATION.md) records current status, collaboration workflow, and approved creative directions for slides 1–32 and the provisional continuation. Start here when resuming in a new chat.

- [Agent instructions](AGENTS.md) define scope, coding standards, and review gates.
- [Design](DESIGN.md) defines the visual language and illustration constraints.
- [Architecture](ARCHITECTURE.md) proposes implementation boundaries and verification.
- [Storyboard](STORYBOARD.md) describes the provisional lecture sequence and timing.
- [Roadmap](ROADMAP.md) defines milestone dependencies and acceptance criteria.

## M5f visual staging review

Build the bundle and start the preview server, then open [slides 22–26 in desktop Firefox](http://127.0.0.1:4173/talk/m5f/).
Use Left and Right to review the 32 stills. A still's URL can be opened directly.
The route is the visual review for [issue #24](https://github.com/ap0calypse644/the-science-of-trustless-systems/issues/24).
The owner approved these stills and authorized production in draft PR #25.

| Slide | Checkpoints and movement | Print composition |
| --- | --- | --- |
| 22 | Restore the linked history, add nonce and target, and hold after the first successful attempt and after mining all four blocks. In between, move each winning digest into its successor before showing that successor's nonce search. Keep the original above Charlie's copy. Hold at the edit, first successful re-mine, and first successor update. Move the mismatch through blocks 3 and 4 as their inputs change, and end with exhausted Charlie and the authorization warning. | Use the first re-mined comparison with the stale link and mark the edited payment as unauthorized. |
| 23 | Build both branches from the same three-block prefix. Add blocks independently so Charlie can catch up at 2/2 before falling behind. Mark the payment and extend its confirmation bracket at 1/1, 3/2 and 6/3, then hold the final 9/4 comparison. | Use both final branches and the cumulative-work rule with a bracket showing the six-confirmation point. |
| 24 | Hold the camera fixed. Accelerate tumbling boxes through the three visible workstation holds, then bury the workstation. Pause in silence, raise and gently wave the flag, and reveal the title last. Aim for 15–20 seconds. | Use the final flag and title. |
| 25 | Open on the same mountain, zoom into one block, and insert the reward before advancing through two misses and a success. Hold for the independent checks before showing ten gold units. Alice emerges, discards the flag, and resumes mining. Show two more accepted rewards. | Pair the candidate's gold first row and successful target with the acceptance checks and ten earned units. |
| 26 | Settle the orange mark with a subtle scale and rotation, pause, then fade in each line separately. Hold within a sequence of about 3–4 seconds. | Use the completed reveal. |

Firefox captures from `npm test -- tests/m5f-staging.spec.ts --project=firefox` are saved under
`test-results/visual-review/m5f-staging/<width>x<height>/<still-id>.png`.
The 1920×1080 set includes all stills. The 1280×720 and 1024×768 sets include five representative stills each.
See the [M5f still index and asset credits](src/talk/m5f/REVIEW.md).

### M5f production motion review

[Draft PR #25](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/25)
contains production slides 22–26 for review. Build and start the local preview
as above. Use Space to play to the next hold, J/K to step across holds, and R
to reset. The speaker preview stays on the opening composition.

| Slide | Checkpoints at elapsed time in seconds |
| --- | --- |
| [22 Making History Expensive to Rewrite](http://127.0.0.1:4173/talk/#/22-expensive-history) | 0 Linked history · 2.4 Nonce target · 5 First block mined · 13.4 Mined chain · 16 Tampered copy · 20 First block re-mined · 23.5 Next re-mine · 33.5 Exhausted |
| [23 Which History Do We Believe?](http://127.0.0.1:4173/talk/#/23-which-history) | 0 Race start · 1.8 One confirmation · 3.8 Honest lead · 5.8 Charlie catches up · 8 Three confirmations · 9.8 Gap opens · 13 Gap widens · 14.8 Six confirmations · 19.4 Final honest lead |
| [24 Why Would Anybody Do All This Work?](http://127.0.0.1:4173/talk/#/24-mining-work) | 0 Neat stack · 4.6 Messy stack · 8.8 Overwhelmed · 14.2 Buried · 19 Surrender |
| [25 Rewarding the Miner](http://127.0.0.1:4173/talk/#/25-rewarding-miner) | 0 Mountain · 2.6 Candidate · 5 Reward row · 9.6 Mined · 13.4 Accepted · 17.2 Back to work · 23.2 Growing rewards |
| [26 Bitcoin reveal](http://127.0.0.1:4173/talk/#/26-bitcoin-reveal) | 0 Logo · 2 Congratulations · 3.8 Bitcoin |

The [print route](http://127.0.0.1:4173/talk/?print) has 26 sheets on this
branch. Firefox review captures are under
`test-results/visual-review/m5f-production/<width>x<height>/`. Full-size
files include all 32 holds, intermediate motion samples, and five
`<production-slide-id>-print.png` sheets. The smaller sets show representative
frames of each slide.

## M5g visual staging review

Build and run `npm run preview -- --port 4173 --strictPort`, then open
[the nine M5g stills](http://127.0.0.1:4173/talk/m5g/) in desktop Firefox.
Use Left and Right to step through slides 27–29. The
[still index](src/talk/m5g/REVIEW.md) lists direct URLs, intended motion and
pauses, print compositions, speaker notes and sources. Production slides
remain available at `/talk/`, with the 29-sheet print view at `/talk/?print` on main.

Run `npm test -- tests/m5g-staging.spec.ts` for the scoped Firefox and
Chromium checks. Firefox captures are under
`test-results/visual-review/m5g-staging/<width>x<height>/<still-id>.png`.
The 1920×1080 set contains all nine stills, and the 1280×720 and 1024×768 sets
contain representative images.

### M5g production review

The owner approved the nine staging stills at `5e08573`. Production on
[draft PR #27](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/27)
uses the same holds. Slide 27 keeps the approved six server racks, fictional
`$ 4972` bill and licensed photo-head cameo with the “More RAM?” bubble.
Space plays to the next hold, J/K step between holds and R resets.

| Slide | Checkpoints at elapsed seconds |
| --- | --- |
| [27 Electricity bill](http://127.0.0.1:4173/talk/#/27-electricity-bill) | Static |
| [28 Proof of Stake](http://127.0.0.1:4173/talk/#/28-proof-of-stake) | 0 Coins · 4 Bonded · 6 Voting power · 8 Proof of Stake |
| [29 Stake-weighted voting](http://127.0.0.1:4173/talk/#/29-stake-weighted-voting) | 0 Propose · 5 Prevote · 10.5 Precommit · 15 Commit |

The M5g print compositions use the static bill, the stake reveal and the
commit view. Firefox production captures are
under `test-results/visual-review/m5g-production/<width>x<height>/`.

## M5h visual staging review

Build and run `npm run preview -- --port 4173 --strictPort`, then open
[the 18 M5h stills](http://127.0.0.1:4173/talk/m5h/) in desktop Firefox.
Use Left and Right to navigate. The [still index](src/talk/m5h/REVIEW.md)
includes direct URLs, planned movement and pauses, print candidates and sources.

Run `npm test -- tests/m5h-staging.spec.ts` for the scoped browser checks.
Firefox captures are under
`test-results/visual-review/m5h-staging/<width>x<height>/<still-id>.png`.
All 18 are captured at 1920×1080, with representative views at 1280×720 and
1024×768. Main has 32 production slides and print sheets.

### M5h production review

The owner approved all 18 holds at `0c70d1d`. [Draft PR #29](https://github.com/ap0calypse644/the-science-of-trustless-systems/pull/29)
contains production slides 30–32 for visual and motion review. Run the local
preview on port 4173. Space plays to the next hold, J/K step between holds,
and R resets. The speaker preview stays on the opening composition.

| Slide | Checkpoints at elapsed seconds |
| --- | --- |
| [30 Blockchain ≠ Cryptocurrency](http://127.0.0.1:4173/talk/#/30-blockchain-beyond-currency) | 0 Iceberg tip · 4 Iceberg reveal · 7.5 Internet analogy · 11 Parallel comparison |
| [31 What Else Could We Agree On?](http://127.0.0.1:4173/talk/#/31-agree-on) | 0 Credentials · 2 Provenance · 4 Timestamping · 6 Shared infrastructure · 10 Graduation · 14 Employer verification · 17.5 Design question · 20.5 Decision |
| [32 But There's a Catch...](http://127.0.0.1:4173/talk/#/32-privacy-bridge) | 0 Interview · 3.5 Transcript handoff · 6.5 Oversharing · 9 Alice’s question · 13 Transparent café ledger · 17.5 Glass house |

The [32-sheet print deck](http://127.0.0.1:4173/talk/?print) uses the parallel
comparison, conditional decision and glass house. Firefox production captures
are under `test-results/visual-review/m5h-production/<width>x<height>/`.
