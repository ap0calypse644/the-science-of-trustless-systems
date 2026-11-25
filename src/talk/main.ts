import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '../illustration/theme.css';
import { createPresenterBar } from '../engine/controls';
import { connectPresenter, type SceneRegistration } from '../engine/presenter';
import '../engine/engine.css';
import { bindShortcuts } from '../engine/navigation';
import { createDeck } from '../engine/shell';
import { slides, type TalkSlide } from './slides';
import './talk.css';

const root = document.querySelector<HTMLElement>('main')!;
const list = root.querySelector<HTMLElement>('.slides')!;
const params = new URLSearchParams(location.search);
const staging = root.hasAttribute('data-staging');
const print = !staging && params.has('print');
const review = staging ? await import('./two-generals/stills') : undefined;
const registry = new Map<string, SceneRegistration>();
const entries: readonly TalkSlide[] = review?.stills ?? slides;

for (const { id, composition, notes, scene, print: printComposition } of entries) {
  const section = document.createElement('section');
  section.id = id;
  section.innerHTML = print ? printComposition ?? composition : composition;
  if (scene && !print) {
    const mount = document.createElement('div');
    mount.className = 'scene-root';
    section.firstElementChild!.classList.add('scene-baseline');
    section.prepend(mount);
    registry.set(id, { root: mount, scene });
  } else {
    registry.set(id, { root: section });
  }
  if (!print) {
    const aside = document.createElement('aside');
    aside.className = 'notes';
    for (const paragraph of notes.split('\n\n')) {
      const block = document.createElement('p');
      block.textContent = paragraph;
      aside.append(block);
    }
    section.append(aside);
  }
  list.append(section);
}

if (print) {
  root.classList.replace('reveal', 'print-deck');
} else {
  const notes = Notes();
  const deck = createDeck(notes);
  await deck.initialize();
  if (!staging) {
    connectPresenter(deck, notes, root, createPresenterBar(), registry, params.has('receiver'), false);
  } else if (!params.has('receiver')) {
    let lifetime: AbortController;
    const connect = () => {
      lifetime = new AbortController();
      bindShortcuts(deck, { openNotes: () => notes.open() }, lifetime.signal);
    };
    connect();
    window.addEventListener('pagehide', () => lifetime.abort());
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) connect();
    });
  }
}
