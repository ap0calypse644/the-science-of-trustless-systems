import { SPEEDS } from './checkpoints';
import { Playback, type PlaybackState } from './playback';

export function presenterControls(root: HTMLElement, deck: HTMLElement, signal: AbortSignal) {
  const panel = root.querySelector<HTMLElement>('.playback-panel')!;
  const visibility = root.querySelector<HTMLButtonElement>('.visibility')!;
  const slider = root.querySelector<HTMLInputElement>('input')!;
  const status = panel.querySelector<HTMLOutputElement>('.playback-state')!;
  const announcement = panel.querySelector<HTMLElement>('.playback-announcement')!;
  const speed = panel.querySelector<HTMLOutputElement>('.playback-speed')!;
  const buttons = [...panel.querySelectorAll<HTMLButtonElement>('[data-action]')];
  const play = buttons[0];
  let hidden = panel.hidden;

  const playback = new Playback(({ scene, speed: rate }: PlaybackState) => {
    if (!scene && root.contains(document.activeElement)) deck.focus({ preventScroll: true });
    root.hidden = !scene;
    if (!scene) return;
    const verb = scene.status === 'playing' ? 'Pause' : scene.status === 'ended' ? 'Play (at end)' : 'Play';
    if (play.textContent !== verb) play.textContent = verb;
    play.disabled = scene.status === 'ended';
    if (play.disabled && document.activeElement === play) slider.focus({ preventScroll: true });
    const label = `${scene.status[0].toUpperCase()}${scene.status.slice(1)} · ${scene.beat} · ${scene.time.toFixed(2)} / ${scene.duration.toFixed(2)} s`;
    status.textContent = label;
    const spoken = `${scene.status} · ${scene.beat}`;
    if (announcement.textContent !== spoken) announcement.textContent = spoken;
    const speedLabel = `${rate}×`;
    if (speed.textContent !== speedLabel) speed.textContent = speedLabel;
    if (slider.max !== String(scene.duration)) slider.max = String(scene.duration);
    slider.value = String(scene.time);
    slider.setAttribute('aria-valuetext', `${scene.time.toFixed(2)} seconds, ${scene.beat}`);
    for (const button of buttons) {
      if (button.dataset.action === 'slower') button.disabled = rate === SPEEDS[0];
      if (button.dataset.action === 'faster') button.disabled = rate === SPEEDS[SPEEDS.length - 1];
    }
  });

  const actions: Record<string, () => void> = {
    play: () => playback.toggle(),
    reset: () => playback.reset(),
    previous: () => playback.checkpoint(-1),
    next: () => playback.checkpoint(1),
    slower: () => playback.adjustSpeed(-1),
    faster: () => playback.adjustSpeed(1),
  };
  for (const button of buttons) button.addEventListener('click', actions[button.dataset.action!], { signal });
  slider.addEventListener('input', () => playback.seek(slider.valueAsNumber), { signal });

  function toggleVisibility(): void {
    hidden = !hidden;
    if (hidden && panel.contains(document.activeElement)) visibility.focus({ preventScroll: true });
    panel.hidden = hidden;
    visibility.textContent = hidden ? 'Show controls' : 'Hide controls';
    visibility.setAttribute('aria-expanded', String(!hidden));
  }

  visibility.addEventListener('click', toggleVisibility, { signal });
  signal.addEventListener('abort', () => playback.dispose(), { once: true });
  return { playback, toggleVisibility };
}

export function createPresenterBar(): HTMLElement {
  const template = document.createElement('template');
  template.innerHTML = `<aside class="presenter" aria-label="Presenter controls" hidden>
    <div id="playback-panel" class="playback-panel">
      <output class="playback-state" aria-live="off"></output>
      <span class="playback-announcement" role="status"></span>
      <div class="playback-actions">
        <button type="button" data-action="play">Play</button>
        <button type="button" data-action="reset">Reset</button>
        <button type="button" data-action="previous">Previous beat</button>
        <button type="button" data-action="next">Next beat</button>
        <label>Seek <input type="range" min="0" step="0.01" value="0" aria-label="Seek"></label>
        <button type="button" data-action="slower" aria-label="Decrease speed">−</button>
        <output class="playback-speed" aria-label="Playback speed"></output>
        <button type="button" data-action="faster" aria-label="Increase speed">+</button>
      </div>
    </div>
    <button class="visibility" type="button" aria-controls="playback-panel" aria-expanded="true">Hide controls</button>
  </aside>`;
  const bar = template.content.firstElementChild as HTMLElement;
  document.body.append(bar);
  return bar;
}
