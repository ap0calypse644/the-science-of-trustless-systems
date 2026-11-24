import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import 'reveal.js/reveal.css';
import { drawSample, type Candidate } from './samples';
import { drawRefinedSample } from './refined-scenes';
import type { RefinedStyle } from './refined-characters';
import './review.css';
import '../illustration/theme.css';

const parameters = new URLSearchParams(location.search);
const refined = parameters.get('set') === 'refined';
const candidates = refined
  ? (['expressive', 'cartoon', 'sketch'] as const)
  : (['whiteboard', 'notebook', 'comic'] as const);
const samples = [
  {
    id: 'title',
    title: 'The Science of Trustless Systems',
    description: 'Two students confer over an open notebook while a third holds a sealed envelope close.',
    note: 'Ask what people need to agree on and what each person needs to see.',
  },
  {
    id: 'failure',
    title: 'Single point of failure',
    description: 'Two students connect to one working server. When it fails, both lose access and the administrator discovers the outage.',
    note: 'Ask what both students depend on and where the failure happened.',
  },
  {
    id: 'message',
    title: 'A lost message',
    description: 'Two generals wait on opposite hills. Their courier stops in the valley and the path to the recipient is interrupted.',
    note: 'Ask what each general knows about delivery. This sample is a still composition.',
  },
] as const;

const characterSample = {
  id: 'characters',
  title: 'Alice in seven poses',
  description: 'Alice stands, celebrates, shrugs, schemes, loses patience, facepalms, and runs with an envelope.',
  note: 'Compare Alice’s body language and silhouette across the seven poses.',
} as const;

const refinedDescriptions = {
  title: 'Alice and Bob compare conflicting ledger copies while Charlie guards a sealed envelope.',
  failure: 'Two students lose their connections when their shared server starts smoking. Alice arrives with a hand fan.',
  message: 'Generals wait on opposite ridges while a courier struggles in the valley with an oversized envelope.',
  characters: characterSample.description,
};

const activeSamples = refined ? [...samples, characterSample] : samples;
const slides = document.querySelector<HTMLDivElement>('.slides')!;
const styleButtons = document.querySelectorAll<HTMLButtonElement>(
  refined ? '.style-picker [data-set="refined"] button[data-candidate]' : '.style-picker [data-set="archive"] button[data-candidate]',
);
const compareLink = document.querySelector<HTMLAnchorElement>('.compare-set')!;
const characterButton = document.querySelector<HTMLButtonElement>('.character-picker')!;
document.querySelector<HTMLElement>(refined ? '[data-set="refined"]' : '[data-set="archive"]')!.hidden = false;
compareLink.href = refined ? '/review/' : '/review/?set=refined';
compareLink.textContent = refined ? 'Archive A–C' : 'Approved D';
const showType = parameters.get('type') === '1';

for (const candidate of candidates) {
  for (const sample of activeSamples) {
    const slide = document.createElement('section');
    slide.dataset.candidate = candidate;
    slide.dataset.sample = sample.id;
    slide.className = `review-slide ${candidate}${refined ? ' refined expressive-theme' : ''}`;
    const heading = sample.id === 'title' && candidate === 'comic'
      ? 'The Science of <br>Trustless Systems'
      : sample.title;
    slide.innerHTML = `
      <div class="sheet">
        <${sample.id === 'title' ? 'h1' : 'h2'}>${heading}</${sample.id === 'title' ? 'h1' : 'h2'}>
        <svg class="art" viewBox="0 0 1600 650" role="img" aria-label="${refined ? refinedDescriptions[sample.id] : sample.description}">
          ${refined
            ? drawRefinedSample(sample.id, candidate as RefinedStyle)
            : drawSample(sample.id as typeof samples[number]['id'], candidate as Candidate)}
        </svg>
        ${showType && sample.id === 'title'
          ? '<div class="type-sample"><span>Ag Qq Rr · 0123456789 · “Yes?” (A–B)!</span><span class="math">n ≥ 3f + 1 · A ≠ B</span></div>'
          : ''}
      </div>
      <aside class="notes">${sample.note}</aside>`;
    slides.append(slide);
  }
}

const deck = new Reveal({
  width: 1920,
  height: 1080,
  // Reveal rounds its scale to two decimal places. Allow a small guard against edge cropping.
  margin: 0.004,
  maxScale: 1,
  keyboard: true,
  overview: true,
  hash: true,
  controls: false,
  progress: false,
  autoSlide: 0,
  transition: 'none',
  backgroundTransition: 'none',
  plugins: [Notes],
});

function updateStylePicker(): void {
  const { candidate, sample } = deck.getCurrentSlide().dataset;
  characterButton.setAttribute('aria-pressed', String(sample === 'characters'));
  for (const button of styleButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.candidate === candidate));
  }
}

for (const button of styleButtons) {
  button.addEventListener('click', () => {
    const candidate = candidates.findIndex((style) => style === button.dataset.candidate);
    const sampleIndex = deck.getIndices().h % activeSamples.length;
    deck.slide(candidate * activeSamples.length + sampleIndex);
    button.blur();
  });
}

characterButton.addEventListener('click', () => {
  const candidateStart = Math.floor(deck.getIndices().h / activeSamples.length) * activeSamples.length;
  const isCharacterSheet = deck.getCurrentSlide().dataset.sample === 'characters';
  deck.slide(candidateStart + (isCharacterSheet ? 0 : activeSamples.length - 1));
  characterButton.blur();
});

deck.on('ready', updateStylePicker);
deck.on('slidechanged', updateStylePicker);
void deck.initialize();
