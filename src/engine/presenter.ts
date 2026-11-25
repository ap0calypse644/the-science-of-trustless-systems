import type { NotesPlugin } from 'reveal.js/plugin/notes';
import { presenterControls } from './controls';
import { bindShortcuts } from './navigation';
import type { AnimatedScene, SceneView } from './playback';
import type { createDeck } from './shell';

export interface SceneRegistration {
  root: HTMLElement;
  scene?: AnimatedScene;
}

export function connectPresenter(
  deck: ReturnType<typeof createDeck>, notes: NotesPlugin, deckRoot: HTMLElement,
  bar: HTMLElement, registry: ReadonlyMap<string, SceneRegistration>, receiver: boolean,
  staticPlaybackKeys = true,
): void {
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
        playbackAvailable: () => staticPlaybackKeys || Boolean(current().scene),
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
}
