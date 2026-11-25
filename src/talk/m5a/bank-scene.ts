import type { AnimatedScene } from '../../engine/playback';
import { bankComposition } from './bank';
import { checkpoints, choiceTime, duration, frameAt, type BankFrame, type Choice, type Response } from './bank-model';

function composition(frame: BankFrame, response: Response | null | undefined = frame.response, walking = false): string {
  return bankComposition({
    ...frame,
    a: frame.a === 0 ? '0' : '1,000',
    b: frame.b === 0 ? '0' : '1,000',
    response: response ?? undefined,
    walking,
  });
}

export const bankBaseline = composition(frameAt(0, null));
export const bankPrint = composition(frameAt(choiceTime, null), 'print');

const choices = `<div class="bank-choices" role="group" aria-label="Choose the response at branch B">
  <button type="button" data-choice="stale" aria-pressed="false">Return 1,000</button>
  <button type="button" data-choice="wait" aria-pressed="false">Wait for sync</button>
</div>`;

export const banking: AnimatedScene = {
  duration,
  checkpoints,
  pauseAtCheckpoints: true,
  mount(root, signal, refresh) {
    let choice: Choice | null = null;
    let key = '';
    let walker: SVGGElement | null = null;

    root.addEventListener('click', (event) => {
      if (!refresh || !(event.target instanceof Element)) return;
      const selected = event.target.closest('button')?.dataset.choice;
      if (selected !== 'stale' && selected !== 'wait') return;
      choice = selected;
      refresh();
    }, { signal });

    return {
      limitTime: () => choice === null ? choiceTime : duration,
      reset() { choice = null; },
      render(time) {
        const frame = frameAt(time, choice);
        const walking = frame.id === 'withdrawal' && time >= 8;
        const nextKey = `${frame.id}:${walking}:${frame.response ?? ''}`;
        if (key !== nextKey) {
          if (root.contains(document.activeElement)) root.closest<HTMLElement>('.reveal')?.focus();
          root.innerHTML = composition(frame, frame.response === 'choice' ? null : frame.response, walking);
          // The presentation layer displays read state without changing either account balance.
          root.dataset.read = frame.read;
          if (frame.returned !== undefined) root.dataset.returned = String(frame.returned);
          else delete root.dataset.returned;
          if (frame.id === 'choose-response' && refresh) {
            root.querySelector('.talk-sheet')!.insertAdjacentHTML('beforeend', choices);
          }
          walker = walking ? root.querySelector('[data-walk]') : null;
          key = nextKey;
        }
        if (walker) {
          const progress = Math.min(1, (time - 8) / (checkpoints[3].time - 8));
          const x = 844 * progress;
          const y = -9 * Math.abs(Math.sin(progress * 7 * Math.PI));
          walker.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        }
        for (const button of root.querySelectorAll<HTMLButtonElement>('[data-choice]')) {
          button.setAttribute('aria-pressed', String(button.dataset.choice === choice));
        }
      },
      dispose() {
        delete root.dataset.read;
        delete root.dataset.returned;
      },
    };
  },
};
