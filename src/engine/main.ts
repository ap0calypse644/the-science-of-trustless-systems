import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '../illustration/theme.css';
import { presenterControls } from './controls';
import { bindShortcuts } from './navigation';
import type { AnimatedScene, SceneView } from './playback';
import { delivery, inspection } from './scenes';
import { createDeck } from './shell';
import './engine.css';

interface DiagnosticSlide {
  id: string;
  title: string;
  notes: string;
  scene?: AnimatedScene;
}

const slides: readonly DiagnosticSlide[] = [
  { id: 'envelope', title: 'Envelope delivery', notes: 'Delivery diagnostic: use the named beats to inspect the pose, envelope and dialogue.', scene: delivery },
  { id: 'static', title: 'Static checkpoint', notes: 'Static diagnostic: the playback panel is unavailable on this slide.' },
  { id: 'ledger', title: 'Ledger inspection', notes: 'Inspection diagnostic: seek backwards to restore the ledger, pose and dialogue.', scene: inspection },
];

const deckRoot = document.querySelector<HTMLElement>('.reveal')!;
const list = deckRoot.querySelector('.slides')!;
const bar = document.querySelector<HTMLElement>('.presenter')!;
const registry = new Map<string, { root: HTMLElement; scene?: AnimatedScene }>();

for (const { id, title, notes, scene } of slides) {
  const section = document.createElement('section');
  section.id = id;
  section.innerHTML = `<div class="engine-sheet">
    <h1>${title}</h1><div class="scene-root"></div>
    ${scene ? '' : '<p>Use Left or Right to change slides.</p>'}
  </div><aside class="notes">${notes}</aside>`;
  registry.set(id, { root: section.querySelector('.scene-root')!, scene });
  list.append(section);
}

const notes = Notes();
const deck = createDeck(notes);
const receiver = new URLSearchParams(location.search).has('receiver');
await deck.initialize();
document.body.dataset.playbackOwner = receiver ? 'preview' : 'presenter';

let lifetime: AbortController | undefined;

function connect(): void {
  if (lifetime) return;
  lifetime = new AbortController();
  const { signal } = lifetime;
  const current = () => registry.get(deck.getCurrentSlide()?.id ?? '')!;
  let enter: () => void;

  if (receiver) {
    let preview: { lifetime: AbortController; root: HTMLElement; view: SceneView } | undefined;
    const clear = () => {
      preview?.lifetime.abort();
      preview?.view.dispose?.();
      preview?.root.replaceChildren();
      preview = undefined;
    };
    enter = () => {
      clear();
      const { root, scene } = current();
      if (!scene) return;
      const lifetime = new AbortController();
      const view = scene.mount(root, lifetime.signal);
      view.render(0);
      preview = { lifetime, root, view };
    };
    signal.addEventListener('abort', clear, { once: true });
  } else {
    const { playback, toggleVisibility } = presenterControls(bar, deckRoot, signal);
    enter = () => {
      const { root, scene } = current();
      playback.enter(root, scene);
    };
    const overviewShown = () => playback.setOverview(true);
    const overviewHidden = () => playback.setOverview(false);
    deck.on('overviewshown', overviewShown);
    deck.on('overviewhidden', overviewHidden);
    signal.addEventListener('abort', () => {
      deck.off('overviewshown', overviewShown);
      deck.off('overviewhidden', overviewHidden);
    }, { once: true });
    playback.setOverview(deck.isOverview());
    bindShortcuts(deck, {
      toggle: () => playback.toggle(), reset: () => playback.reset(),
      checkpoint: (direction) => playback.checkpoint(direction),
      adjustSpeed: (direction) => playback.adjustSpeed(direction),
      toggleVisibility, openNotes: () => notes.open(),
    }, signal);
  }

  deck.on('slidechanged', enter);
  signal.addEventListener('abort', () => deck.off('slidechanged', enter), { once: true });
  enter();
}

connect();
window.addEventListener('pagehide', () => {
  lifetime?.abort();
  lifetime = undefined;
});
window.addEventListener('pageshow', (event) => {
  if (event.persisted) connect();
});
