# The Science of Trustless Systems

An interactive, browser-based college guest lecture on how distributed systems reach agreement and how cryptography changes what participants need to reveal. The deck supports a live speaker with hand-drawn diagrams, short comics, and presenter-paced demonstrations.

| Part | Time | Focus |
| --- | ---: | --- |
| I — The Problem of Trust | 45 min | Distributed systems, CAP, both Generals problems, a first-principles Bitcoin reconstruction, alternative consensus designs, and interoperability |
| II — The Problem of Privacy | 45 min | Privacy properties, cryptographic history, MPC, homomorphic encryption, and zero-knowledge proofs |
| III — Ask Me Anything | 30 min | Audience questions, closing, and references |

The planning storyboard spans 48 slides (25 approved Part I concepts; 23 provisional Part II/III slides). Part I gives the Two Generals and Byzantine Generals problems five minutes each and the Bitcoin reconstruction 16 minutes. These times and the slide count are flexible planning guides; prioritize the live teaching narrative and audience discussion.

## Development status

M0 is approved. The owner approved D — Expressive Minimalism on pure white. M1 merged in PR #3. The M2 illustration library merged in PR #5. The M3 playback engine and diagnostic deck merged in PR #7 after owner review. The owner approved M4a and PR #9 is merged. The owner approved M4b staging and the slide 7 production prototype is at owner review. All 25 Part I creative directions are approved. The other treatments remain archived for comparison. The project preserves the three-slide engineering diagnostic deck. The framework uses Reveal.js, TypeScript, Vite, Playwright, and npm. M2 uses deterministic authored SVG paths. M3 uses a local GSAP clock for presenter-paced diagnostics.

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
- Open [the print compositions](http://127.0.0.1:4173/talk/?print) to print the two static slides and the final-reply comparison on separate 16:9 pages.

The Firefox tests write review screenshots to `test-results/visual-review/m4a-reference-pass/<width>x<height>/`. The editable artwork was revised against the owner-supplied concept images, which are kept outside the repository.

## M4b production review

The prototype deck temporarily orders slides 1, 2 and 7. Open [slide 7](http://127.0.0.1:4173/talk/#/07-two-generals) in desktop Firefox. Space plays or pauses, and playback stops at the next named beat. J and K step backward and forward, R resets, and Minus and Plus adjust speed. H hides the controls. S opens notes with a baseline preview. The [print view](http://127.0.0.1:4173/talk/?print) shows the final-reply comparison.

Firefox captures all eight beats and the print comparison at 1920×1080 under `test-results/visual-review/m4b-production/`, plus the final comparison at 1280×720 and 1024×768.

## M4b approved staging reference

With the production preview running, open [the staging stills](http://127.0.0.1:4173/talk/staging/) in desktop Firefox. Use Left and Right to compare the opening, courier escalation, and the two possible outcomes of the final reply. Firefox captures are in `test-results/visual-review/m4b-staging/1920x1080/`.

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

- [Continuation / restart point](CONTINUATION.md) records current status, collaboration workflow, and approved creative directions for all 25 Part I slides. Start here when resuming in a new chat.

- [Agent instructions](AGENTS.md) define scope, coding standards, and review gates.
- [Design](DESIGN.md) defines the visual language and illustration constraints.
- [Architecture](ARCHITECTURE.md) proposes implementation boundaries and verification.
- [Storyboard](STORYBOARD.md) describes the provisional lecture sequence and timing.
- [Roadmap](ROADMAP.md) defines milestone dependencies and acceptance criteria.
