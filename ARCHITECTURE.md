# Architecture proposal

All module boundaries, controls, and tooling choices below are provisional and unvalidated. M0.2 will check the framework foundation. M1–M4 will test the design and presenter workflow before production slides.

## Responsibilities

| Proposed area | Responsibility |
| --- | --- |
| Deck shell | Configure Reveal.js, register slides and speaker notes, and own navigation, overview, and fullscreen integration. |
| Slide registry | Map stable slide IDs to slide content, optional scene factories, and print compositions. |
| Illustration | Provide reusable SVG characters and props, deterministic Rough.js rendering, and shared theme tokens. |
| Scene models | Represent educational state and input rules without browser or timeline dependencies where practical. |
| Scene views | Render the model and expose local interactions, descriptions, and accessible status. |
| Playback | Coordinate a single active GSAP timeline, presenter commands, time, speed, and named checkpoints. |
| Presenter controls | Route input to the active scene, expose available actions, and handle focus and shortcut conflicts. |

## Scene lifecycle and playback

1. On initial entry or revisit, mount a fresh scene in its named initial state. Initialize its timeline paused at time zero. Any deliberate exception must be documented and reviewed for that scene.
2. While active, expose play, pause, resume, restart, absolute seek, speed control, and previous/next checkpoint. Use ordered, named timeline positions with labels tied to speaker beats. Clamp seeks to the timeline range. In the proposed baseline, seeking and checkpoint jumps pause playback, and restart returns to the initial paused state.
3. Render each animated state from timeline position and explicit model inputs. Avoid irreversible callback side effects during seeks. Give interactive scenes an explicit reset and define how their inputs interact with any timeline they own.
4. On exit, pause and dispose of the timeline, listeners, pending work, and scene-owned DOM. Drop work from stale scene instances. Static slides expose only applicable commands. Re-entering from either direction uses the same baseline state.

Reveal.js owns the slide index. Timeline changes never advance slides, and end-of-timeline playback remains on the current slide. Overview should pause the scene and leave it paused on return to the same slide. Review whether playback speed should persist across scenes or reset to 1×.

## Keyboard and presenter workflow

Keep Reveal.js navigation, overview, fullscreen, and notes bindings subject to verification against the installed version and target browsers. Start with labeled on-screen buttons and a focusable seek control. Trial **Shift+P** for play/pause, **Shift+R** for restart, **Shift+J/K** for previous/next checkpoint, and **Shift+−/+** for speed adjustment. Exact assignments and keyboard-layout support remain open. Seek should also work through the focused slider.

Handle only bindings active in the current context. Preserve normal interaction in editable fields, appropriately scoped interaction widgets, and overview or notes mode. Test keyboard focus after navigation and fullscreen transitions. Treat the main deck as the playback owner. Confirm whether speaker notes need mirrored playback status or remote controls during prototype review.

## Offline and print

Build a static bundle with Vite, including local fonts, notes, styles, scripts, and assets. Prototype delivery via a prebuilt package served over loopback so rehearsal can start with internet disconnected and no dependency installation. Validate the launch method on the presentation machine. Direct file opening and service-worker support remain optional delivery choices to evaluate only if needed. Citations may point to external sources, with readable citations bundled in the deck and no reliance on opening a link during the lecture. Ship without audio.

For PDF, propose a print mode driven by reviewed stills or compact sequences from the slide registry, with a 16:9 page per slide. Verify representative animation and interaction fallbacks in M4 and the full export in M8.

## Verification plan

- Check type safety and production builds after framework setup. Exercise model transitions, checkpoint boundaries, repeated visits, and cleanup with deterministic fixtures.
- Use Playwright to cover initial load, independent slide and playback state, pause/resume/restart, seek and speed, checkpoint movement, focus and shortcuts, overview, and repeatable interaction resets. Exercise notes and fullscreen where browser automation permits and verify them manually on rehearsal hardware.
- Serve the production bundle locally during offline tests. Block non-loopback requests, fail on unexpected external network attempts, and exercise initial load, fonts, notes, animation, and interactions. Repeat with internet disconnected on the presentation machine.
- Compare representative SVG states with fixed seeds, viewport, and timeline positions. Verify text, contrast, clipping, and PDF output visually and assess readability on classroom hardware.
