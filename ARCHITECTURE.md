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

Vite builds the diagnostic deck at `/` and the separate review deck at `/review/`. Review-only CSS, local fonts, and fixed inline SVG samples belong to the review entry point. The archived A–C deck is the default review entry. The `?set=refined` view opens on approved D and retains E and F as archived references, with one pose sheet per style. Both use the same Reveal configuration. The style picker selects the corresponding sample or pose sheet in another candidate using ordinary Reveal navigation. The authoring scope is visual comparison. The approved D review shares character and prop geometry with the M2 gallery. The scene registry and playback remain later milestone work.

## M2 illustration API

Use `src/illustration/theme.css` and put the SVG inside an `.expressive-theme` container with an `.art` SVG. The theme shares the existing local Kalam and Patrick Hand files and their SIL OFL notices. The palette and fine stroke widths remain subject to projection checks.

```ts
import { character } from './illustration/character';
import { bubble } from './illustration/props';

const artwork = character('alice', {
  instance: 'ledger-alice',
  x: 300, y: 200, scale: 1.4, facing: 'left',
  pose: 'point', expression: 'confused',
  hands: { right: { kind: 'ledger', label: '24' } },
}) + bubble(340, 100, 250, 'This copy?', 1);
```

The API returns SVG fragments from authored paths. Use plain strings for bubble and ledger text. The helpers escape markup and attribute metacharacters. A character has no global SVG IDs. Set an optional `instance` label to find its root by `data-instance`, then scope part queries to that root.

Coordinates are SVG units with x increasing right and y increasing down. A character is placed at its head center and scaled about that origin. Left facing reflects only the character and attached props. Independently placed dialogue stays readable, and an attached ledger compensates for the reflected character. Left and right part names refer to the sides of the unmirrored artwork.

- `data-part` identifies torso, head, hair, head-accessory, eyes, brows, mouth, costume, left/right arms, legs and hands. The forward facepalm hand has its own `facepalm-hand` layer.
- `data-pivot` stores a local neck, shoulder or hip pair. Pose-specific hand anchors are inside their arm groups, so attached props move with arm rotation. Neck and shoulders support relative angle overrides. The original authored head tilt still applies. Body paths draw first, then head, costume and the facepalm overlay.
- The seven principal poses reuse the approved paths. Point and hold add authored curves. Pose changes swap paths and anchors. Expression overrides swap the face while keeping the pose intact. Large arbitrary rotations can cause overlaps or visibly separate joints. This is a pose library with no inverse kinematics or morphing.
- `props.ts` also exposes envelope, ledger, laptop, server, flag, headwear, bubble and hand fan. Placement is in scene coordinates. The ledger, envelope, laptop and server are centered around their pose-independent drawing origins. The flag is based at the foot of its pole, and headwear uses the character head origin. Bubble width is author-selected and text stays on one line.

## Offline and print

Build a static bundle with Vite, including local fonts, notes, styles, scripts, and assets. Offline delivery uses a local HTTP server. M0.2 serves the production bundle using Vite preview on loopback. M8 will validate the packaged launch method on the presentation machine with internet disconnected. Citations may point to external sources, with readable citations bundled in the deck and no reliance on opening a link during the lecture. Ship without audio.

For PDF, propose a print mode driven by reviewed stills or compact sequences from the slide registry, with a 16:9 page per slide. Verify representative animation and interaction fallbacks in M4 and the full export in M8.

## Verification plan

- Check type safety and production builds after framework setup. Exercise model transitions, checkpoint boundaries, repeated visits, and cleanup with deterministic fixtures.
- Use Playwright to cover initial load, independent slide and playback state, pause/resume/restart, seek and speed, checkpoint movement, focus and shortcuts, overview, and repeatable interaction resets. Run the shared production smoke suite in both browsers. Verify notes, fullscreen, dual-monitor placement, scaling, and future animation performance separately in desktop Firefox on rehearsal hardware.
- Serve the production bundle locally during offline tests. Allow only the production preview origin for page requests, reject unexpected WebSockets, and fail on runtime errors or failed asset loads while exercising the deck and speaker view. Extend coverage to bundled fonts, animations, and interactions when available. Repeat with internet disconnected on the presentation machine.
- Compare representative SVG states with fixed seeds, viewport, and timeline positions. Verify text, contrast, clipping, and PDF output visually and assess readability on classroom hardware.
