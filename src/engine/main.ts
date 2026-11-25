import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import '../illustration/theme.css';
import { createPresenterBar } from './controls';
import type { AnimatedScene } from './playback';
import { connectPresenter, type SceneRegistration } from './presenter';
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
const bar = createPresenterBar();
const registry = new Map<string, SceneRegistration>();

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
await deck.initialize();
connectPresenter(deck, notes, deckRoot, bar, registry, new URLSearchParams(location.search).has('receiver'));
