import Reveal from 'reveal.js';
import type { NotesPlugin } from 'reveal.js/plugin/notes';

export function createDeck(notes: NotesPlugin) {
  return new Reveal({
    width: 1920,
    height: 1080,
    margin: 0.004,
    maxScale: 1,
    keyboard: false,
    overview: true,
    controls: false,
    progress: false,
    slideNumber: 'c/t',
    hash: true,
    autoSlide: 0,
    transition: 'none',
    backgroundTransition: 'none',
    plugins: [notes],
  });
}
