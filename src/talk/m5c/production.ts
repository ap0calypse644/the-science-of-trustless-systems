import type { AnimatedScene } from '../../engine/playback';
import { envelope } from '../../illustration/props';
import type { TalkSlide } from '../slides';
import { cafeStills, emptyBalanceLedger, sharedCopy } from './cafe-stills';
import { mountMorph, morphComposition, transformationStills } from './transformation';

const stills = [...cafeStills, ...transformationStills];
type Still = (typeof stills)[number];
type Motion = (root: HTMLElement) => (progress: number, atStop: boolean) => void;
interface Beat {
  time: number;
  label: string;
  still: Still;
  motion?: { start: number; mount: Motion; composition?: string };
}

function still(id: string): Still {
  const match = stills.find((frame) => frame.id === id);
  if (!match) throw new Error(`Missing M5c artwork: ${id}`);
  return match;
}

function beat(time: number, label: string, id: string, motion?: Beat['motion']): Beat {
  return { time, label, still: still(id), motion };
}

// Mount at segment boundaries, then derive every SVG attribute from the clock.
function animated(beats: readonly Beat[]): AnimatedScene {
  const duration = beats[beats.length - 1].time;
  const latestFirst = [...beats].reverse();
  return {
    duration,
    pauseAtCheckpoints: true,
    checkpoints: beats.map(({ time, label }) => ({ time, label })),
    mount(root) {
      let active: Beat | undefined;
      let update: ReturnType<Motion> | undefined;
      return {
        render(time) {
          const frame = latestFirst.find(({ time: stop, motion }) => (motion?.start ?? stop) <= time)!;
          if (frame !== active) {
            root.innerHTML = frame.motion?.composition ?? frame.still.composition;
            update = frame.motion?.mount(root);
            active = frame;
          }
          if (frame.motion) {
            const fraction = Math.min(1, (time - frame.motion.start) / (frame.time - frame.motion.start));
            update?.(fraction * fraction * (3 - 2 * fraction), time >= frame.time);
          }
        },
      };
    },
  };
}

function moving(root: HTMLElement, selector: string) {
  return [...root.querySelectorAll(selector)].map((element) => {
    const baseline = element.getAttribute('transform') ?? '';
    return (x: number, y: number, opacity = 1, transform = ''): void => {
      element.setAttribute('transform', `translate(${x} ${y}) ${baseline} ${transform}`.trim());
      element.setAttribute('opacity', String(opacity));
    };
  });
}

const scatter: Motion = (root) => {
  const receipts = moving(root, '[data-prop="receipt"]');
  return (p) => receipts.forEach((move, index) => {
    const travel = 1 - p;
    move((2.5 - index) * 75 * travel, -190 * travel - Math.sin(p * Math.PI) * (42 + index * 9),
      Math.min(1, p * 5), `rotate(${travel * (index % 2 === 0 ? 54 : -58)})`);
  });
};

const showNotebook: Motion = (root) => {
  const [book] = moving(root, '[data-prop="blue-notebook"]');
  return (p) => book(-385 * (1 - p), -218 * (1 - p), Math.min(1, p * 6), `scale(${.43 + .57 * p})`);
};

function writing(signed: boolean): Motion {
  return (root) => {
    const svg = root.querySelector('svg.art')!;
    const entry = svg.querySelector<SVGTextElement>('.entry')!;
    const signature = svg.querySelector<SVGPathElement>('.signature');
    const footer = svg.querySelector('.notebook-footer')!;
    const length = signature?.getTotalLength() ?? 0;
    svg.querySelector('.pencil')?.remove();
    svg.insertAdjacentHTML('beforeend', '<path class="pencil" data-writing-pen d="m0 0 38-57 8 5 -37 58 -10 6Z"/>');
    const pen = svg.querySelector('[data-writing-pen]')!;
    const bounds = entry.getBBox();
    const entryMatrix = entry.parentElement!.parentElement!.getAttribute('transform')!;
    return (p) => {
      const written = signed ? Math.min(1, p / .62) : p;
      const ink = Math.max(0, (p - .62) / .38);
      // Keep the complete text centered while its ink advances left to right.
      entry.style.clipPath = `inset(0 ${(1 - written) * 100}% 0 0)`;
      let x = bounds.x + written * bounds.width;
      let y = -12;
      if (signature) {
        signature.style.strokeDasharray = String(length);
        signature.style.strokeDashoffset = String(length * (1 - ink));
        signature.setAttribute('opacity', String(ink > 0 ? 1 : 0));
        footer.setAttribute('opacity', String(Math.max(0, (ink - .7) / .3)));
        if (ink > 0) {
          const point = signature.getPointAtLength(length * ink);
          x = 229 + point.x;
          y = -16 + point.y;
        }
      }
      pen.setAttribute('transform', `${entryMatrix} translate(${x} ${y})`);
      pen.setAttribute('opacity', String(Math.min(1, (1 - p) * 10)));
    };
  };
}

const carryAway: Motion = (root) => {
  const carriers = moving(root, '[data-character="alice"], [data-prop="closed-notebook"]');
  const legs = [...root.querySelectorAll('[data-character="alice"] [data-part$="-leg"]')];
  return (p) => {
    const stride = Math.sin(4 * Math.PI * p);
    carriers.forEach((move) => move(237 * (1 - p), -10 * Math.abs(stride)));
    legs.forEach((leg, index) => {
      leg.setAttribute('transform', `rotate(${stride * (index === 0 ? -14 : 14)} ${leg.getAttribute('data-pivot')})`);
    });
  };
};

const offerAccess: Motion = (root) => {
  const [book] = moving(root, '[data-prop="blue-notebook"]');
  const [crown] = moving(root, '[data-prop="crown"]');
  return (p) => {
    book(165 * (1 - p), -232 * (1 - p), Math.min(1, p * 5), `scale(${.55 + .45 * p})`);
    crown(0, -120 * (1 - p), Math.min(1, p * 4));
  };
};

const distribute: Motion = (root) => {
  const copies = moving(root, '[data-prop="blue-notebook"]');
  return (p) => copies.forEach((move, index) => {
    const x = [292, 802, 1302][index];
    const travel = 1 - p;
    const reveal = index === 2 ? 1 : Math.min(1, Math.max(0, (p - .12) * 3));
    move((1085 - x) * travel, -Math.sin(p * Math.PI) * (115 - index * 38),
      reveal, `scale(${1.27 - .27 * p})`);
  });
};

const deliverPayments: Motion = (root) => {
  const svg = root.querySelector('svg.art')!;
  svg.insertAdjacentHTML('beforeend', [0, 1].map(() =>
    `<g data-payment-in-flight>${envelope(0, 0, .66)}</g>`).join(''));
  const notes = moving(root, '[data-payment-in-flight]');
  const copies = moving(root, '[data-prop="blue-notebook"]');
  return (p) => notes.forEach((move, index) => {
    const progress = Math.min(1, Math.max(0, (p - index * .13) / .78));
    const target = index === 0 ? 406 : 1194;
    move(800 + (target - 800) * progress, 510 + 145 * progress - 106 * Math.sin(Math.PI * progress),
      Math.min(1, progress * 10, (1 - progress) * 14));
    copies[index](0, 12 * (1 - progress), Math.max(0, (progress - .76) / .24));
  });
};

const signPayments: Motion = (root) => {
  const signatures = [...root.querySelectorAll<SVGPathElement>('.signature')].map((path) => ({
    path, length: path.getTotalLength(),
  }));
  return (p) => signatures.forEach(({ path, length }, index) => {
    const ink = Math.min(1, Math.max(0, (p - index * .42) / .58));
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length * (1 - ink));
    path.setAttribute('opacity', String(ink > 0 ? 1 : 0));
  });
};

const transform: Motion = (root) => {
  const draw = mountMorph(root);
  const heading = root.querySelector('h1')!;
  const finalDocument = document.createElement('template');
  finalDocument.innerHTML = still('13-battlefield').composition;
  const finalHeading = finalDocument.content.querySelector('h1')!.textContent;
  const openingHeading = heading.textContent;
  const art = root.querySelector('svg.art')!;
  const finalDescription = finalDocument.content.querySelector('svg.art')!.getAttribute('aria-label')!;
  const openingDescription = art.getAttribute('aria-label')!;
  return (p, atStop) => {
    draw(p);
    const nextHeading = atStop ? finalHeading : openingHeading;
    if (heading.textContent !== nextHeading) heading.textContent = nextHeading;
    art.setAttribute('aria-label', atStop ? finalDescription : openingDescription);
  };
};

const ledger = [
  beat(0, 'Café setup', '09-cafe'),
  beat(3, 'Receipt chaos', '09-receipt-chaos', { start: .55, mount: scatter }),
  beat(6, 'Alice’s idea', '09-alice-idea'),
  beat(9, 'Notebook reveal', '09-notebook', { start: 6.65, mount: showNotebook }),
];
const authorization = [
  { time: 0, label: 'Notebook open', still: emptyBalanceLedger },
  beat(2.5, 'Unsigned entry', '10-unsigned-entry', { start: .45, mount: writing(false) }),
  beat(5.5, 'Bob objects', '10-bob-objects'),
  beat(8.5, 'Bob writes and signs', '10-bob-signs', { start: 6, mount: writing(true) }),
  beat(11.5, 'Authorization contrast', '10-authorization'),
];

const replication = [
  { time: 0, label: 'One shared notebook', still: sharedCopy },
  beat(3, 'Missing notebook', '12-missing-ledger', { start: .5, mount: carryAway }),
  beat(6, 'Access monopoly', '12-access-monopoly', { start: 3.55, mount: offerAccess }),
  beat(9, 'Replicated copies', '12-replicated-copies', { start: 6.55, mount: distribute }),
];
const doubleSpend = [
  beat(0, 'Fresh balance', '13-fresh-balance'),
  beat(3, 'Two signatures', '13-two-signatures', { start: .55, mount: signPayments }),
  beat(6, 'Local acceptance', '13-local-acceptance', { start: 3.6, mount: deliverPayments }),
  beat(11, 'Battlefield reveal', '13-battlefield', { start: 7, mount: transform, composition: morphComposition }),
];

function production(id: string, beats: readonly Beat[], print: Still, notes: string): TalkSlide {
  return { id, composition: beats[0].still.composition, scene: animated(beats), print: print.composition, notes };
}

const order = still('11-infinite-money-glitch');
export const m5cSlides: readonly TalkSlide[] = [
  production('09-shared-ledger', ledger, still('09-notebook'), `${ledger.map(({ still }) => still.notes).join('\n\n')}

Assume all three remember who the parties are and share the same convention for recording debts. These IOUs are a classroom example with no cash settlement.`),
  production('10-unauthorized-transactions', authorization, still('10-authorization'), `Charlie attempts to write an unsigned Bob-to-Charlie transfer for 20. Start Alice 0, Bob 30, Charlie 5. The fake entry is rejected without posting. Bob writes a different transfer for 10 to Alice. The signed row posts once and yields Alice 10, Bob 20, Charlie 5.

The mark illustrates authorization in a toy ledger. In a real signature scheme, verification needs the relevant signed bytes, public key and a trusted binding of the key to the signer. Altering signed data breaks verification under the scheme’s assumptions. Copying a valid signed instruction can replay it. This toy ledger rejects a recorded transaction ID and separately checks available funds.

Source: NIST Digital Signature Standard, FIPS 186-5. https://csrc.nist.gov/pubs/fips/186-5/final`),
  { ...order, print: order.composition },
  production('12-who-controls-the-ledger', replication, still('12-replicated-copies'), `${replication.slice(1).map(({ still }) => still.notes).join('\n\n')}

All three use the same rules and initial state. Compare what replication fixes about access with what it leaves open about ordering. This classroom scenario assumes the participants can exchange their records.`),
  production('13-double-spend-problem', doubleSpend, still('13-local-acceptance'), `${doubleSpend.map(({ still }) => still.notes).join('\n\n')}

The issue is inconsistent ordering of conflicting authorized payments. The same spending power supports either local history, and there is no global settlement rule in this toy model. The earlier Two Generals result assumed arbitrary message loss. Slide 8’s oral-message example assumed detectable omissions and known immediate senders. Here both signed instructions can arrive intact under different orders.

References: Nakamoto, Bitcoin: A Peer-to-Peer Electronic Cash System, §2, for the distinction between signature verification and deciding which spend counts. https://bitcoin.org/bitcoin.pdf

Lamport, Shostak and Pease, The Byzantine Generals Problem, §§2–4, for the distinction between conflicting reports and the assumptions of the oral and signed-message models. https://lamport.azurewebsites.net/pubs/byz.pdf`),
];
