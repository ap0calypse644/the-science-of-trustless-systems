import { capNotes, distributionNotes, governanceNotes } from './notes';
import { bankStills } from './bank';
import { governance, resilience } from './distribution';
import './staging.css';

const cap = `<div class="talk-sheet m5a-sheet cap-sheet">
  <h1>The CAP Theorem</h1>
  <div class="meme-frame">
    <img alt="Three cartoon Spider-Man figures pointing at each other" hidden>
    <div class="meme-placeholder">
      <p>Staging placeholder</p>
      <p>Three-Spider-Man meme pending asset clearance</p>
    </div>
    <div class="meme-labels" aria-label="Labels from left to right">
      <span>Consistency</span><span>Availability</span><span>Partition Tolerance</span>
    </div>
  </div>
  <label class="meme-picker">Choose a local review image <input type="file" accept="image/jpeg,image/png,image/webp"></label>
  <p class="meme-error" role="status"></p>
</div>`;

export const stills = [
  { id: '03-why-distribute', composition: resilience, notes: distributionNotes },
  { id: '04-centralized-distributed-decentralized', composition: governance, notes: governanceNotes },
  { id: '05-cap-theorem', composition: cap, notes: capNotes },
  ...bankStills,
];

export function connectLocalMeme(root: HTMLElement): void {
  const sheet = root.querySelector('.cap-sheet');
  const frame = sheet?.querySelector<HTMLElement>('.meme-frame');
  const input = sheet?.querySelector<HTMLInputElement>('input');
  const image = sheet?.querySelector('img');
  const placeholder = sheet?.querySelector<HTMLElement>('.meme-placeholder');
  const error = sheet?.querySelector('.meme-error');
  if (!frame || !input || !image || !placeholder || !error) return;
  let url: string | undefined;

  const clearImage = () => {
    if (url) URL.revokeObjectURL(url);
    url = undefined;
    image.removeAttribute('src');
    image.hidden = true;
    placeholder.hidden = false;
    frame.style.removeProperty('width');
  };

  input.addEventListener('change', () => {
    clearImage();
    error.textContent = '';
    const file = input.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      error.textContent = 'Choose a JPEG, PNG, or WebP image.';
      return;
    }
    const selected = URL.createObjectURL(file);
    url = selected;
    image.src = selected;
    void image.decode().then(() => {
      if (url !== selected) return;
      frame.style.width = `${Math.min(1270, 770 * image.naturalWidth / image.naturalHeight)}px`;
      image.hidden = false;
      placeholder.hidden = true;
    }, () => {
      if (url !== selected) return;
      clearImage();
      error.textContent = 'This image could not be opened.';
    });
  });

  window.addEventListener('pagehide', (event) => {
    if (!event.persisted) clearImage();
  });
}
