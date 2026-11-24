# The Science of Trustless Systems

An interactive, browser-based college guest lecture on how distributed systems reach agreement and how cryptography changes what participants need to reveal. The deck supports a live speaker with hand-drawn diagrams, short comics, and presenter-paced demonstrations.

| Part | Time | Focus |
| --- | ---: | --- |
| I — The Problem of Trust | 45 min | Distributed systems, CAP, both Generals problems, a first-principles Bitcoin reconstruction, alternative consensus designs, and interoperability |
| II — The Problem of Privacy | 45 min | Privacy properties, cryptographic history, MPC, homomorphic encryption, and zero-knowledge proofs |
| III — Ask Me Anything | 30 min | Audience questions, closing, and references |

The provisional storyboard spans 46 slides. Part I gives the Two Generals and Byzantine Generals problems five minutes each and the Bitcoin reconstruction 16 minutes. Rehearsal will refine the pacing within the 120-minute lecture.

## Development status

M0 is approved. The owner approved D — Expressive Minimalism on pure white. M1 finalization awaits PR review before M2. The other treatments remain archived for comparison. The project preserves the three-slide engineering diagnostic deck. The framework uses Reveal.js, TypeScript, Vite, Playwright, and npm. Rough.js, SVG illustrations, and GSAP playback are planned for later milestones.

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

For development, run `npm ci` followed by `npm run dev -- --port 5173 --strictPort`. For production review, use the preview commands below. Open the approved review URL in desktop Firefox. It starts on D’s title slide. Left and Right navigate, the style buttons switch treatments while keeping the current sample, and **Character poses** jumps to the active candidate’s Isha sheet. **Archive A–C** and **Approved D** switch decks. The E and F buttons open archived references for the same sample. Escape opens overview, F opens fullscreen, and S opens speaker view. Add `&type=1` to the refined URL to show title glyph specimens.

Run `npm test` to regenerate ignored screenshots in `test-results/visual-review/<browser>/<width>x<height>/` at 1920×1080, 1280×720, and 1024×768. If the local preview already uses port 4173, run `PLAYWRIGHT_PORT=4174 npm test`. The Firefox 1920×1080 run also writes these labeled comparisons using full-size source slides.

- `test-results/visual-review/m1.1-comparisons/title-comparison.png`
- `test-results/visual-review/m1.1-comparisons/failure-comparison.png`
- `test-results/visual-review/m1.1-comparisons/message-comparison.png`
- `test-results/visual-review/m1.1-comparisons/character-comparison.png`

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

- [Agent instructions](AGENTS.md) define scope, coding standards, and review gates.
- [Design](DESIGN.md) defines the visual language and illustration constraints.
- [Architecture](ARCHITECTURE.md) proposes implementation boundaries and verification.
- [Storyboard](STORYBOARD.md) describes the provisional lecture sequence and timing.
- [Roadmap](ROADMAP.md) defines milestone dependencies and acceptance criteria.
