import type { AnimatedScene } from '../../engine/playback';
import { bankComposition } from './bank';
import { checkpoints, inquiryTime, duration, frameAt, type BankFrame } from './bank-model';

function composition(frame: BankFrame, response: BankFrame['response'] | 'print' = frame.response, walking = false): string {
  return bankComposition({
    ...frame,
    a: frame.a === 0 ? '0' : '1,000',
    b: frame.b === 0 ? '0' : '1,000',
    response,
    walking,
  });
}

export const bankBaseline = composition(frameAt(0));
export const bankPrint = composition(frameAt(inquiryTime), 'print');

export const banking: AnimatedScene = {
  duration,
  checkpoints,
  pauseAtCheckpoints: true,
  mount(root) {
    let key = '';
    let walker: SVGGElement | null = null;

    return {
      render(time) {
        const frame = frameAt(time);
        const walking = frame.id === 'withdrawal' && time >= 8;
        const nextKey = `${frame.id}:${walking}`;
        if (key !== nextKey) {
          root.innerHTML = composition(frame, frame.response, walking);
          root.dataset.read = frame.read;
          if (frame.returned !== undefined) root.dataset.returned = String(frame.returned);
          else delete root.dataset.returned;
          walker = walking ? root.querySelector('[data-walk]') : null;
          key = nextKey;
        }
        if (walker) {
          const progress = Math.min(1, (time - 8) / (inquiryTime - 8));
          const x = 844 * progress;
          const y = -9 * Math.abs(Math.sin(progress * 7 * Math.PI));
          walker.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        }
      },
      dispose() {
        delete root.dataset.read;
        delete root.dataset.returned;
      },
    };
  },
};
