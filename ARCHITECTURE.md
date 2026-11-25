# Architecture

M0.2 establishes the Reveal.js shell, local build, and shared Firefox and Chromium smoke tests. The scene and playback behavior below records approved requirements for later milestones. Module boundaries and implementation details remain proposals. Desktop Firefox is the primary presentation and development browser. Playwright's bundled Firefox build is the primary automated target. Chromium is the secondary compatibility target. Desktop Firefox on the presentation machine requires its own manual checks.

## Presentation policy

Owner decision (25 Nov 2026): the lecture uses static or presenter-paced scripted animated slides only. No live audience/presenter inputs that change the educational model, branching buttons, live cryptographic computations or worker searches are required. Preserve ordinary playback/navigation/seek/reset controls, verbal audience predictions, local offline operation and editable art. Use fixed internally consistent illustrative examples, clearly label simulated hashes/proofs/results, never imply they are actual computed cryptographic outputs. This supersedes earlier interactive and real-computation requirements. Issue #18 covers the separately reviewed scripted conversion of slide 6 and preserves archived diagnostic and staging routes. Future M5d and M6 implementation remain separately gated.

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
3. Render each animated state from timeline position and explicit model inputs. Avoid irreversible callback side effects during seeks. Production scenes use only fixed scripted state and timeline controls.
4. On exit, pause and dispose of the timeline, listeners, pending work, and scene-owned DOM. Drop work from stale scene instances. Static slides expose only applicable commands. Re-entering from either direction uses the same baseline state.

Reveal.js owns the slide index. Timeline changes never advance slides, and end-of-timeline playback remains on the current slide. Opening overview pauses playback, and returning leaves it paused. Playback speed defaults to 1× and persists globally across scenes.

## Keyboard and presenter workflow

The main presentation window owns playback. Presenter controls must be hideable. The M3 diagnostic provides labeled controls and a focusable seek slider. Speaker previews show their scene’s initial frame.

The M3 route disables Reveal’s default keyboard listener and delegates slide navigation, overview, and notes to Reveal’s API. Reveal 6.0.2 normally binds Space to slide navigation. The scoped adapter preserves browser modifiers, ignores repeats, and leaves focused widgets to their native behavior.

| Key | Action |
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

Escape is reserved for the browser when fullscreen is active. Shift+Equals is accepted as Plus. The root diagnostic continues to use Reveal defaults.

## M1 visual review

Vite builds the diagnostic deck at `/` and the separate review deck at `/review/`. Review-only CSS, local fonts, and fixed inline SVG samples belong to the review entry point. The archived A–C deck is the default review entry. The `?set=refined` view opens on approved D and retains E and F as archived references, with one pose sheet per style. Both use the same Reveal configuration. The style picker selects the corresponding sample or pose sheet in another candidate using ordinary Reveal navigation. The authoring scope is visual comparison. The approved D review shares character and prop geometry with the M2 gallery. The M3 playback diagnostics use a separate entry and typed scene registry.

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

## M3 playback engine

- `src/engine/main.ts` registers stable slide IDs, speaker notes, and optional scene factories. It connects Reveal slide and overview events to the controller, or mounts static scene previews when the Notes plugin supplies the `receiver` parameter. Page exit removes handlers and disposes the current view. A cached page reconnects with fresh scene state.
- `playback.ts` owns one paused GSAP timeline and a session-wide speed selection. At completion it stays at the final beat until reset or seek. Speeds are 0.5×, 0.75×, 1×, 1.25×, 1.5×, and 2×. Nonfinite seeks and unsupported rates are ignored. Finite seeks clamp and pause. A 1 µs tolerance excludes the current beat when stepping. Checkpoints include the initial and final frames.
- `scenes.ts` keeps diagnostic time-to-state functions separate from their SVG view. The view mounts once, updates cached SVG nodes, and selects among pre-authored poses. Reset is a paused seek to zero. The diagnostics have no independent educational inputs. Retain diagnostic APIs; production scenes do not require independent educational input.
- `controls.ts`, `navigation.ts`, and `shell.ts` handle the presenter panel, shortcut dispatch, and Reveal configuration. Static slides hide the playback panel and Space leaves slide navigation unchanged.

An animated scene declares its timing and returns a view with an absolute render function.

```ts
const scene: AnimatedScene = {
  duration: 2,
  checkpoints: [{ time: 0, label: 'Ready' }, { time: 2, label: 'At the desk' }],
  mount(root, signal) {
    const mark = document.createElement('span');
    mark.textContent = '●';
    root.append(mark);
    // Use signal with any scene-owned listeners and asynchronous work.
    mark.style.display = 'inline-block';
    return { render: (time) => { mark.style.transform = `translateX(${time * 60}px)`; } };
  },
};
```

Give each factory a fresh view on entry. Write transforms, visibility, text, pose, and prop state from the supplied time. Use the abort signal to cancel pending scene work and optional `dispose()` for resources the controller cannot release. Timeline callbacks are scoped to the active scene instance. The controller removes its mount contents on exit. The current previews do not mirror live playback. Print-still selection remains future work.

GSAP **3.15.1** is pinned and bundled locally. The installed npm metadata identifies the Standard “No Charge” license. The build retains the upstream notice. GSAP provides the linear clock, time scaling, pause and seeking, while scene-specific visual state remains in TypeScript. [Upstream source](https://github.com/greensock/GSAP) · [Standard license](https://gsap.com/standard-license/)

## Offline and print

Build a static bundle with Vite, including local fonts, notes, styles, scripts, and assets. Offline delivery uses a local HTTP server. M0.2 serves the production bundle using Vite preview on loopback. M8 will validate the packaged launch method on the presentation machine with internet disconnected. Citations may point to external sources, with readable citations bundled in the deck and no reliance on opening a link during the lecture. Ship without audio.

For PDF, propose a print mode driven by reviewed stills or compact sequences from the slide registry, with a 16:9 page per slide. Verify representative animation and interaction fallbacks in M4 and the full export in M8.

## Verification plan

- Check type safety and production builds after framework setup. Exercise model transitions, checkpoint boundaries, repeated visits, and cleanup with deterministic fixtures.
- Use Playwright to cover initial load, independent slide and playback state, pause/resume/restart, seek and speed, checkpoint movement, focus and shortcuts, overview, and repeatable interaction resets. Run the shared production smoke suite in both browsers. Verify notes, fullscreen, dual-monitor placement, scaling, and future animation performance separately in desktop Firefox on rehearsal hardware.
- Serve the production bundle locally during offline tests. Allow only the production preview origin for page requests, reject unexpected WebSockets, and fail on runtime errors or failed asset loads while exercising the deck and speaker view. Extend coverage to bundled fonts, animations, and interactions when available. Repeat with internet disconnected on the presentation machine.
- Compare representative SVG states with fixed seeds, viewport, and timeline positions. Verify text, contrast, clipping, and PDF output visually and assess readability on classroom hardware.

## Production lecture

Vite builds the independent lecture at `/talk/`. Its ordered registry supplies
stable IDs, compositions, speaker notes, and optional scene definitions and
print overrides. The production order is 1–13. M4a
retains its static artwork and applicable shortcuts.

The production route and `/engine/` share the presenter lifecycle, controls,
keyboard adapter and GSAP playback. Only the active animated scene mounts.
Slide 7 opts into pausing at each checkpoint so the presenter can ask for
predictions. Its overview fallback and notes receiver both show the opening
battlefield. The notes receiver has no playback ownership. Navigation disposes
the live scene, and revisiting starts at time zero.

The slide 7 model defines message deliveries and derives each general’s view
from that general’s sends and receipts. The renderer keeps the battlefield
mounted while updating that evidence and positioning Charlie from timeline time.
The alternate run is identified on the slide. The paired final runs share the
same prefix and differ in the delivery of Alice’s last reply.

The `?print` view uses one 16:9 sheet per slide. Slide 7 substitutes the
final-reply comparison. The separate `/talk/staging/` entry retains the four
approved artwork stills. Lecture-wide PDF delivery remains part of M8.

Teaching reference: Halpern and Moses,
[Knowledge and Common Knowledge in a Distributed Environment](https://arxiv.org/abs/cs/0006009).


## M5a staging review

The independent `/talk/m5a/` route uses the static review shell for slides 3–5
and eight illustrative bank states for slide 6. Bank choices are visual samples.
The optional slide 5 picker uses a local object URL for a selected image, with
no asset path in the build or remote fetch. Production loads the bundled image and retains attribution in speaker notes.
The asset provenance and rights status are recorded in README.md.

### Slide 6 scripted production

The shared clock pauses at eight fixed checkpoints. Absolute time selects a
scripted bank state and drives Charlie’s existing walk from A to B. The
initial inquiry and counterfactual rewind share one pre-response state.
Stored balances, read status and returned value are separate fields. The
stale run ends with its reply of 1,000. The alternative starts at the
partitioned inquiry and completes its waiting read with 0 after
resynchronization. The notes preview renders Synced and the 16:9 print
override compares the two responses under partition.

## M5b scripted production scene

The separate `/talk/m5b/` route retains six approved stills. Production slide
`08-byzantine-generals` uses the same elevated, four-hill composition. The
upright fortress sits between Mallory’s rear hill and Charlie’s front hill;
Alice and Bob’s message paths pass in front of it. Cosmetic refinements are
deferred to final polish.

The shared presenter clock runs 13 named stops. The renderer moves envelopes
and Charlie from timeline position and reveals table rows and majority results
at fixed checkpoints. The two example runs record ordered message paths and
their orders. Local views and results derive from that fixed data. The notes
receiver shows the opening still. The 16:9 print override compares the
three-general tie and four-general decisions side by side.

Reference: [Lamport, Shostak and Pease, The Byzantine Generals Problem, §§2–3](https://lamport.azurewebsites.net/pubs/byz.pdf).

## M5c café and ledger production

The independent `/talk/m5c/` route uses the static review shell. Its frames
share original SVG café artwork, cast positions, a blue notebook and a
signature motif. The staging ledger uses neutral units and checks
authorization, replay of recorded IDs and available balance before posting.
Slide 9 uses IOUs. Slides 10–12 share the café balance example and slide 13
opens a separate run with Charlie holding 20 units.

Slide 13 stages two independent local histories, the folding notebook shapes
at a midpoint, and the final battlefield. The left and right notebook anchors
line up with the same envelope geometry used in slides 7 and 8. The hills and
castle reuse the slide 7 art. Owner-approved staging remains available.

Production uses the same still artwork and the shared paused-entry scene
contract. The segment renderer mounts artwork when a segment changes and
derives transforms, ink reveals and opacity from absolute scene time.
Slide 11 uses the static registry path. Slide 13 interpolates the outlines
of two paper surfaces at each book’s fixed horizontal anchor. The paper
contracts to the shared messenger-note outline while the café fades, the
terrain rises and the generals arrive. Only the terminal frame changes the
heading. The print composition holds on the two local histories. The
accounting model remains independent of playback and the DOM.
