import { character, poses, type Character, type Expression, type Pose } from '../illustration/character';
import { bubble, envelope, flag, handFan, laptop, ledger, server } from '../illustration/props';
import { drawRefinedSample } from '../review/refined-scenes';
import '../illustration/theme.css';
import './library.css';

const cast = [
  ['alice', 'Alice', 'Practical'],
  ['bob', 'Bob', 'Analytical'],
  ['charlie', 'Charlie', 'Mischievous'],
] as const;
const principal = [
  ['stand', 'Neutral'], ['excited', 'Excited'], ['confused', 'Confused'], ['suspicious', 'Suspicious'],
  ['frustrated', 'Frustrated'], ['facepalm', 'Facepalm'], ['run', 'Running'],
] as const;

function label(x: number, y: number, content: string, style = ''): string {
  // All gallery labels are static review copy.
  return `<text x="${x}" y="${y}" class="${style}">${content}</text>`;
}

const views = {
  cast: {
    title: 'The cast',
    description: 'Alice with tied hair and scarf, Bob with curls and glasses, and Charlie with angular hair.',
    draw: () => cast.map(([identity, name, trait], index) => {
      const x = 300 + index * 500;
      const pose = (['point', 'confused', 'suspicious'] as const)[index];
      return character(identity, { x, y: 230, scale: 2, pose })
        + label(x, 647, name, 'cast-name') + label(x, 701, trait, 'support');
    }).join(''),
  },
  poses: {
    title: 'Seven poses · Three characters',
    description: 'Neutral, excited, confused, suspicious, frustrated, facepalm, and running poses for each cast member.',
    draw: () => principal.map(([pose, title], index) => label(276 + index * 192, 63, title, 'support')).join('')
      + cast.map(([identity, name], row) => {
        const y = 158 + row * 215;
        return label(87, y + 52, name, 'cast-name')
          + principal.map(([pose], index) => character(identity, { pose, x: 276 + index * 192, y, scale: .83 })).join('');
      }).join(''),
  },
  props: {
    title: 'Props, scale & facing',
    description: 'Two differently sized, opposite-facing Alice instances hold readable props. Two generals and a courier wear distinct headwear.',
    draw: () => `
      ${bubble(330, 85, 256, 'Ready to go?', 1)}
      ${character('alice', { x: 290, y: 230, scale: 1.5, pose: 'point', hands: { right: { kind: 'ledger', label: '24' } } })}
      ${character('alice', { x: 530, y: 300, scale: 1.08, facing: 'left', pose: 'hold', hands: { right: { kind: 'ledger', label: '24' } } })}
      ${label(410, 514, 'Same Alice · two scales', 'support')}
      ${character('alice', { x: 820, y: 275, pose: 'frustrated', headwear: 'plume' })}
      ${character('bob', { x: 1090, y: 275, pose: 'confused', headwear: 'kettle' })}
      ${character('generic', { x: 1370, y: 300, pose: 'run', headwear: 'courier', hands: { right: { kind: 'envelope' } } })}
      ${flag(738, 450)}
      ${label(955, 514, 'Generals', 'support')}${label(1370, 514, 'Courier', 'support')}
      ${envelope(219, 639, .61)}${ledger(515, 637, 0, '24')}${laptop(800, 636, true)}${server(1080, 633, true)}
      ${handFan(1370, 665, -15)}
    `,
  },
  ledger: {
    title: 'Conflicting ledger copies',
    description: 'Alice and Bob compare two different ledger copies while Charlie protects a sealed envelope.',
    draw: () => drawRefinedSample('title', 'expressive'),
    composition: true,
  },
  failure: {
    title: 'A single point of failure',
    description: 'Two terminals lose access when the server goes down. Alice arrives with a hand fan.',
    draw: () => drawRefinedSample('failure', 'expressive'),
    composition: true,
  },
  articulation: {
    title: 'Articulation check',
    description: 'Alice holds an envelope. The head and right arm can rotate around their marked pivots.',
    draw: () => '',
  },
};

type View = keyof typeof views;
const gallery = document.querySelector<HTMLElement>('#gallery')!;
const links = document.querySelectorAll<HTMLAnchorElement>('nav a');

function articulationControls(): string {
  return `<form class="articulation" aria-label="Articulation controls">
    <div><label for="pose">Pose</label><select id="pose" name="pose">${[...principal, ['point', 'Pointing'], ['hold', 'Holding']]
      .map(([value, name]) => `<option value="${value}">${name}</option>`).join('')}</select></div>
    <div><label for="expression">Expression</label><select id="expression" name="expression"><option value="">Match pose</option>${principal
      .map(([value, name]) => `<option value="${value}">${name}</option>`).join('')}</select></div>
    <div><label for="head">Head</label><input id="head" name="head" type="range" min="-25" max="25" value="0"></div>
    <div><label for="arm">Right arm</label><input id="arm" name="arm" type="range" min="-45" max="45" value="0"></div>
    <button type="button">Reset</button>
  </form>`;
}

function mountArticulation(): void {
  const art = gallery.querySelector<SVGSVGElement>('.art')!;
  const form = gallery.querySelector<HTMLFormElement>('form')!;
  function update(): void {
    const data = new FormData(form);
    const pose = data.get('pose') as Pose;
    const expression = data.get('expression') as Expression | '';
    const x = 955;
    const y = 188;
    const scale = 2.35;
    const { neck, rightShoulder } = poses[pose];
    art.innerHTML = character('alice', {
      pose, expression: expression || undefined, x, y, scale, instance: 'articulation',
      hands: { right: { kind: 'envelope' } },
      angles: { head: Number(data.get('head')), rightArm: Number(data.get('arm')) },
    }) + `<g class="pivot-markers" aria-hidden="true">
      <circle cx="${x + neck[0] * scale}" cy="${y + neck[1] * scale}" r="7"/>
      <circle cx="${x + rightShoulder[0] * scale}" cy="${y + rightShoulder[1] * scale}" r="7"/>
    </g>` + label(540, 360, 'Neck & shoulder pivots', 'support');
  }
  form.addEventListener('input', update);
  form.querySelector('button')!.addEventListener('click', () => {
    form.reset();
    update();
  });
  update();
}

function render(): void {
  const hash = location.hash.slice(1);
  const key: View = Object.hasOwn(views, hash) ? hash as View : 'cast';
  const view = views[key];
  for (const link of links) {
    if (link.hash === '#' + key) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  gallery.innerHTML = `<section class="plate" data-view="${key}">
    <h1>${view.title}</h1>
    <svg class="art" viewBox="0 0 1600 ${'composition' in view ? 650 : 780}" role="img" aria-label="${view.description}">
      ${view.draw()}
    </svg>
    ${key === 'articulation' ? articulationControls() : ''}
  </section>`;
  if (key === 'articulation') mountArticulation();
}

window.addEventListener('hashchange', render);
render();
