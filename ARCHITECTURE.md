# Architecture

M0.2 establishes the Reveal.js shell, local build, and shared Firefox and Chromium smoke tests. The scene and playback behavior below records approved requirements for later milestones. Module boundaries and implementation details remain proposals. Desktop Firefox is the primary presentation and development browser. Playwright's bundled Firefox build is the primary automated target. Chromium is the secondary compatibility target. Desktop Firefox on the presentation machine requires its own manual checks.

## Responsibilities

| Proposed area | Responsibility |
| --- | --- |
| Deck shell | Configure Reveal.js, register slides and speaker notes, and own navigation, overview, and fullscreen integration. |
| Slide registry | Map stable slide IDs to slide content, optional scene factories, and print compositions. |
| Illustration | Develop reusable SVG characters and props from approved Expressive Minimalism, with deterministic rendering and shared theme tokens. |
| Scene models | Represent educational state and input rules without browser or timeline dependencies where practical. |
| Scene views | Render the model and expose local interactions, descriptions, and accessible status. |
| Playback | Coordinate a single active GSAP timeline, presenter commands, time, speed, and named checkpoints. |
| Presenter controls | Route input to the active scene, expose available actions, and handle focus and shortcut conflicts. |

## Scene lifecycle and playback

1. On initial entry or revisit, mount a fresh scene in its named initial state. Initialize its timeline paused at time zero. Any deliberate exception must be documented and reviewed for that scene.
2. While active, expose play, pause, resume, restart, absolute seek, speed control, and previous/next checkpoint. Use ordered, named timeline positions with labels tied to speaker beats. Clamp seeks to the timeline range. Seeking and checkpoint jumps pause playback. Reset returns to the initial paused state.
3. Render each animated state from timeline position and explicit model inputs. Avoid irreversible callback side effects during seeks. Give interactive scenes an explicit reset and define how their inputs interact with any timeline they own.
4. On exit, pause and dispose of the timeline, listeners, pending work, and scene-owned DOM. Drop work from stale scene instances. Static slides expose only applicable commands. Re-entering from either direction uses the same baseline state.

Reveal.js owns the slide index. Timeline changes never advance slides, and end-of-timeline playback remains on the current slide. Opening overview pauses playback, and returning leaves it paused. Playback speed defaults to 1× and persists globally across scenes.

## Keyboard and presenter workflow

The main presentation window owns playback. Presenter controls must be hideable. The proposed controls include labeled buttons and a focusable seek slider. Mirroring playback status in speaker view remains open.

The following preferred bindings are proposals for M3. Test conflicts with Reveal.js defaults, browser shortcuts, keyboard layouts, overview, and focused controls before adopting them.

| Key | Proposed action |
| --- | --- |
| Left / Right | Previous / next slide |
| Space | Play / pause |
| R | Reset scene |
| J / K | Previous / next checkpoint |
| Minus / Plus | Adjust playback speed |
| H | Hide / show presenter controls |
| F | Fullscreen |
| S | Speaker view |
| Escape | Overview |

M0.2 uses Reveal.js defaults with no custom playback shortcuts. Preserve normal interaction in editable fields and widgets. Test keyboard focus after navigation and fullscreen transitions.

## M1 visual review

Vite builds the diagnostic deck at `/` and the separate review deck at `/review/`. Review-only CSS, local fonts, and fixed inline SVG samples belong to the review entry point. The archived A–C deck is the default review entry. The `?set=refined` view opens on approved D and retains E and F as archived references, with one pose sheet per style. Both use the same Reveal configuration. The style picker selects the corresponding sample or pose sheet in another candidate using ordinary Reveal navigation. The authoring scope is visual comparison. The scene registry, production illustration library, and playback remain later milestone work.

## Offline and print

Build a static bundle with Vite, including local fonts, notes, styles, scripts, and assets. Offline delivery uses a local HTTP server. M0.2 serves the production bundle using Vite preview on loopback. M8 will validate the packaged launch method on the presentation machine with internet disconnected. Citations may point to external sources, with readable citations bundled in the deck and no reliance on opening a link during the lecture. Ship without audio.

For PDF, propose a print mode driven by reviewed stills or compact sequences from the slide registry, with a 16:9 page per slide. Verify representative animation and interaction fallbacks in M4 and the full export in M8.

## Verification plan

- Check type safety and production builds after framework setup. Exercise model transitions, checkpoint boundaries, repeated visits, and cleanup with deterministic fixtures.
- Use Playwright to cover initial load, independent slide and playback state, pause/resume/restart, seek and speed, checkpoint movement, focus and shortcuts, overview, and repeatable interaction resets. Run the shared production smoke suite in both browsers. Verify notes, fullscreen, dual-monitor placement, scaling, and future animation performance separately in desktop Firefox on rehearsal hardware.
- Serve the production bundle locally during offline tests. Allow only the production preview origin for page requests, reject unexpected WebSockets, and fail on runtime errors or failed asset loads while exercising the deck and speaker view. Extend coverage to bundled fonts, animations, and interactions when available. Repeat with internet disconnected on the presentation machine.
- Compare representative SVG states with fixed seeds, viewport, and timeline positions. Verify text, contrast, clipping, and PDF output visually and assess readability on classroom hardware.
