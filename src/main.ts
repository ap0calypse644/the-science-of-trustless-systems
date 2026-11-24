import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import './diagnostic.css';

const deck = new Reveal({
  width: 1920,
  height: 1080,
  keyboard: true,
  overview: true,
  slideNumber: 'c/t',
  autoSlide: 0,
  transition: 'none',
  backgroundTransition: 'none',
  plugins: [Notes],
});

void deck.initialize();
