import type { createDeck } from './shell';

type Deck = ReturnType<typeof createDeck>;

interface PresenterCommands {
  toggle?(): void;
  reset?(): void;
  checkpoint?(direction: -1 | 1): void;
  adjustSpeed?(direction: -1 | 1): void;
  toggleVisibility?(): void;
  openNotes(): void;
}

export function bindShortcuts(deck: Deck, commands: PresenterCommands, signal: AbortSignal): void {
  const actions: Record<string, (() => void) | undefined> = {
    ArrowLeft: () => deck.left(),
    ArrowRight: () => deck.right(),
    ' ': commands.toggle,
    r: commands.reset,
    j: commands.checkpoint && (() => commands.checkpoint?.(-1)),
    k: commands.checkpoint && (() => commands.checkpoint?.(1)),
    '-': commands.adjustSpeed && (() => commands.adjustSpeed?.(-1)),
    '+': commands.adjustSpeed && (() => commands.adjustSpeed?.(1)),
    h: commands.toggleVisibility,
    f: () => {
      const request = document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen();
      void request.catch(() => { /* Fullscreen can be denied by the browser or embedding page. */ });
    },
    s: commands.openNotes,
    Escape: () => deck.toggleOverview(),
  };

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;
    const key = event.shiftKey && event.code === 'Equal' ? '+' : event.key;
    if ((event.shiftKey && key !== '+') || (key === 'Escape' && document.fullscreenElement)) return;
    if (event.target instanceof Element && event.target.closest(
      'input, button, select, textarea, a[href], summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="slider"], [role="textbox"], [role="combobox"], [role="listbox"], [role="checkbox"], [role="radio"]',
    )) return;
    const action = Object.hasOwn(actions, key) ? actions[key] : undefined;
    if (!action) return;
    event.preventDefault();
    if (deck.isOverview() && [' ', 'r', 'j', 'k', '+', '-'].includes(key)) return;
    action();
  }, { signal });
}
