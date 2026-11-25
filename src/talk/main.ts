import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '../illustration/theme.css';
import { bindShortcuts } from '../engine/navigation';
import { createDeck } from '../engine/shell';
import { slides } from './slides';
import './talk.css';

const root = document.querySelector<HTMLElement>('main')!;
const list = root.querySelector<HTMLElement>('.slides')!;
const params = new URLSearchParams(location.search);
const staging = root.hasAttribute('data-staging');
const print = !staging && params.has('print');
const review = staging ? await import('./staging/stills') : undefined;

for (const { id, composition, notes } of review?.stills ?? slides) {
  const section = document.createElement('section');
  section.id = id;
  section.innerHTML = composition;
  if (!print) {
    const aside = document.createElement('aside');
    aside.className = 'notes';
    aside.textContent = notes;
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
  if (!params.has('receiver')) {
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
