export type RefinedStyle = 'expressive' | 'cartoon' | 'sketch';
type Person = 'isha' | 'noor' | 'dev';
type Pose = 'stand' | 'excited' | 'confused' | 'suspicious' | 'frustrated' | 'facepalm' | 'run';

const faces: Record<RefinedStyle, Record<Person, string>> = {
  expressive: {
    isha: 'M-34 14 Q-48-8-32-38 Q-15-56 9-48 Q38-42 37-16 Q42 8 26 33 Q8 48-16 40 Q-29 35-34 14Z',
    noor: 'M-39-12 Q-37-42-12-47 Q22-52 39-26 Q50 0 34 30 Q19 44-5 40 Q-36 36-39-12Z',
    dev: 'M-42-11 Q-50-33-21-44 Q6-51 36-32 Q50-16 36 10 L24 31 Q9 46-21 32 Q-37 26-42-11Z',
  },
  cartoon: {
    isha: 'M-53-28 C-43-62-8-72 27-56 Q62-46 60-9 Q61 7 69 11 Q66 22 53 21 Q42 55 5 55 Q-49 62-57 13 Q-65 4-61-7Z',
    noor: 'M-56 6 Q-68-7-56-26 Q-62-49-32-59 Q-18-76 4-65 Q26-74 39-53 Q63-50 62-21 Q76-6 62 9 Q61 45 34 54 Q-7 67-41 47 Q-56 32-56 6Z',
    dev: 'M-59-15 Q-58-57-20-63 Q13-68 52-42 Q66-29 54-5 L64 6 Q65 17 48 19 Q39 46 14 58 Q-36 56-54 33 Q-66 21-59-15Z',
  },
  sketch: {
    isha: 'M-31-38 Q-16-57 10-49 Q35-44 37-20 L35-4 L49 7 L37 15 Q37 32 25 44 L4 51 Q-23 45-32 29 L-39 4 Q-49-14-31-38Z',
    noor: 'M-45-9 Q-52-26-32-44 Q-13-58 9-51 Q35-48 43-26 L43-5 Q57 8 43 16 L36 35 L14 46 Q-18 42-34 26 Q-43 10-45-9Z',
    dev: 'M-47-22 Q-37-55-4-48 Q30-47 41-25 Q38-8 48-2 L45 12 L35 15 Q33 32 12 39 L-21 41 Q-48 31-49 7Z',
  },
};

const hair: Record<Person, string> = {
  isha: '<path d="M-34 1 Q-26-32-4-36 Q11-16 33-20 M-32-21 Q-57-42-62-16 Q-67 0-51 9 L-38 3"/>',
  noor: '<path d="M-35-26 q-4-13 11-13 q-1-14 15-10 q12-12 23-1 q15-7 22 10 M-31-6 q10-7 21 0 l-2 17 q-12 7-20-2Z M7-6 q12-8 25-1 l-3 17 q-12 8-22-1Z M-10-3 Q-1-7 7-3"/>',
  dev: '<path d="M-43-14 Q-48-31-34-37 L-42-51 Q-17-51-7-38 L-4-55 Q14-53 24-38 L39-40 Q47-28 37-14 Q9-27-20-23Z"/>',
};

const expressions: Record<Pose, string> = {
  stand: '<path d="M-19-12 q6-5 13-2 M8-13 q7-5 13 0 M-11 17 q12 9 22 0"/><path class="pupil" d="M-12-3 L-12 1 M15-3 L15 1"/>',
  excited: '<path d="M-22-14 l13-6 M9-18 l13 6 M-19-2 q6-10 12 0 M8-2 q7-11 15-2"/><path class="pupil" d="M-15 9 Q2 16 20 7 Q17 34-2 29 Q-13 26-15 9Z"/>',
  confused: '<path d="M-22-18 l15 6 M7-16 l16-7 M-8 22 q10-11 22-5"/><path class="pupil" d="M-14-5 l0 6 M14-7 l0 5"/>',
  suspicious: '<path d="M-23-5 l15-11 M10-15 l16 0 M-11 20 q20 7 27-9 M-19 1 l11 1 M9-1 l13 1"/><path class="pupil" d="M-10 2 l0 3 M19 2 l0 3"/>',
  frustrated: '<path d="M-24-16 l15 8 M8-8 l17-9 M-19-1 l10 3 M9 1 l11-2"/><path class="pupil" d="M-15 22 Q-4 5 13 15 L17 25 Q-1 20-15 22Z"/>',
  facepalm: '<path d="M-21-4 q8 6 14 2 M8 0 q8 6 14 1 M-10 24 q10-7 20 0"/>',
  run: '<path d="M-22-13 l13-5 M9-12 l15 5 M-16-2 l8 3 M9 2 l10-4"/><path class="pupil" d="M-13 17 Q0 8 16 17 L14 23 L-11 23Z"/>',
};

// The rows describe authored full-body poses, from relaxed weight shifts to an asymmetric sprint.
const stick: Record<Pose, string> = {
  stand: 'M1 43 Q8 77-1 115 M2 54 Q-14 77-39 97 M3 55 Q26 66 36 96 M-1 115 Q-13 141-31 170 l-15 1 M-1 115 Q17 140 20 173 l16 0',
  excited: 'M2 42 Q-4 76 7 105 M2 55 Q-27 58-45 23 l-10-18 M2 58 Q42 53 56 14 l3-13 M7 105 Q-13 122-19 151 l-30-8 M7 105 Q37 122 32 151 l23 0',
  confused: 'M4 43 Q-3 80 8 116 M3 56 Q-19 79-42 70 l-8-10 M5 55 Q28 70 53 60 l5-8 M8 116 Q-21 141-29 171 l-13 1 M8 116 Q22 142 23 172 l19 0',
  suspicious: 'M0 43 Q14 70 17 115 M7 60 Q31 78 49 55 l4-13 M6 60 Q-20 73-40 98 M17 115 Q-9 151-38 158 l-17-2 M17 115 Q35 140 42 161 l15-3',
  frustrated: 'M1 43 Q-15 73-2 112 M0 58 Q-30 53-47 30 l-7-13 M0 57 Q28 60 55 32 l6-15 M-2 112 Q-9 148-38 167 l-16-1 M-2 112 Q31 134 38 164 l18 0',
  facepalm: 'M4 43 Q-10 67 9 112 M1 58 Q-35 64-31 32 L-20 7 M2 60 Q24 73 27 111 M9 112 Q-2 147-15 168 l-18 3 M9 112 Q25 141 23 170 l17 1',
  run: 'M6 39 Q-9 68-26 99 M-4 58 Q26 77 48 51 l10-16 M-5 59 Q-56 71-72 44 M-26 99 Q10 100 30 118 l-12 30 M-26 99 Q-41 129-68 135 l-36-14',
};

const sleeves: Record<Pose, string> = {
  stand: 'M-16 57 Q-31 75-44 103 L-34 109 Q-14 96-9 78 M16 60 Q31 78 39 104 L29 109 Q17 93 10 81',
  excited: 'M-12 62 Q-31 55-54 25 L-48 16 Q-26 44-7 49 M14 53 Q37 43 51 11 L61 17 Q53 45 24 68',
  confused: 'M-12 62 Q-32 83-56 63 L-62 72 Q-42 99-15 87 M14 63 Q40 80 58 62 L66 71 Q50 97 18 88',
  suspicious: 'M-12 66 Q-35 85-51 101 L-43 112 Q-17 97-8 84 M15 61 Q33 79 49 53 L57 58 Q48 88 25 86',
  frustrated: 'M-15 58 Q-35 51-46 22 L-56 25 Q-49 61-22 77 M19 58 Q37 51 51 22 L61 28 Q52 60 23 77',
  facepalm: 'M-12 64 Q-38 70-37 39 L-27 15 L-17 20 Q-32 54-14 51 M14 60 Q34 86 38 110 L26 113 Q15 96 10 81',
  run: 'M-16 57 Q-43 68-67 47 L-74 57 Q-53 86-25 79 M12 58 Q34 74 53 45 L64 51 Q52 82 24 85',
};

const hands: Record<Pose, string> = {
  stand: 'M-42 104 q-13 13-5 18 q5 3 13-12 M32 106 q0 15 8 16 q7-2 0-17',
  excited: 'M-53 25 q-16-8-16-18 l8 5 l-2-13 l8 12 l3-5 l4 11 M51 12 q0-14 7-18 l1 10 l7-10 l0 13 l7-4 q0 11-12 14',
  confused: 'M-57 64 q-16-5-19-14 l10 5 l-4-8 l14 8 l1-5 l5 11 M57 63 q14-4 18-12 l-1 10 l8-3 q-4 12-16 14',
  suspicious: 'M-48 101 q-14 10-8 17 q5 5 14-8 M48 55 q-1-9 6-11 l2-17 q5-3 7 1 l-2 21 q8 3-4 12',
  frustrated: 'M-46 23 q-3-17-15-16 l-8 11 q2 9 14 8 M53 24 q1-14 11-13 l8 9 q0 9-13 9',
  facepalm: 'M-26 20 Q-29 9-24 4 l12-12 q6-3 8 2 l-8 12 l12-7 q7 1 2 7 l-15 16 q-5 6-13-2 M27 112 q1 16 9 17 q9-2 3-18',
  run: 'M-68 49 q-11-13-19-8 q-7 8 12 17 M53 46 q2-11 10-13 q11 1 8 9 l-8 10',
};

const trousers: Record<Pose, string> = {
  stand: 'M-18 110 Q-17 141-34 165 q-14 2-15 9 l27 1 Q-4 152 3 130 Q14 148 16 174 l31 0 q0-8-19-12 Q31 137 20 109Z',
  excited: 'M-15 108 Q-28 119-26 143 l-24-7 q-11 4-6 13 l42 12 Q-8 154 5 131 Q21 136 23 154 l34 1 q11-9-15-11 Q37 119 20 108Z',
  confused: 'M-13 111 Q-22 140-33 165 l-16 7 q-2 6 9 6 l22-3 Q-6 154 5 134 Q14 147 13 174 l34 0 q0-9-18-10 Q29 135 22 109Z',
  suspicious: 'M-10 111 Q-20 133-42 151 l-17 0 q-6 8 2 11 l24 1 Q-9 150 12 132 Q23 146 33 167 l29-5 q1-8-20-7 Q36 129 25 108Z',
  frustrated: 'M-21 110 Q-19 141-43 162 l-17 0 q-6 10 5 12 l23-1 Q-8 151 1 132 Q17 144 32 167 l28 0 q4-8-16-10 Q37 130 22 108Z',
  facepalm: 'M-18 108 Q-17 142-24 166 l-17 8 q-2 6 9 6 l24-5 Q0 151 5 134 Q18 149 16 174 l31 1 q3-9-15-13 Q34 138 24 110Z',
  run: 'M-32 96 Q-42 114-64 123 l-30-12 q-13 1-10 12 l39 15 Q-38 132-21 114 Q4 113 15 127 l-10 23 q3 10 15 2 l17-32 Q23 96-8 94Z',
};

const sketchLegs: Record<Pose, string> = {
  stand: 'M-22 108 Q-12 134-20 160 L-31 181 Q-47 181-47 188 L-16 188 Q0 163 3 132 Q7 163 22 186 L51 185 Q47 177 35 178 Q26 143 22 109Z',
  excited: 'M-19 107 Q-32 125-38 155 L-63 158 Q-72 167-59 170 L-26 168 Q-2 140 3 124 Q24 140 42 151 L65 147 Q76 135 59 138 L47 140 Q32 115 23 105Z',
  confused: 'M-21 107 Q-25 142-41 176 L-63 182 Q-65 190-49 191 L-27 187 Q-3 162 4 128 Q18 156 26 185 L55 186 Q56 176 39 174 L22 109Z',
  suspicious: 'M-20 109 Q-25 128-38 149 L-56 148 Q-67 154-57 164 L-28 167 Q-9 151 8 126 L33 155 L37 179 L66 174 Q71 167 51 168 L49 149 Q34 117 22 105Z',
  frustrated: 'M-23 109 Q-20 145-51 173 L-71 172 Q-77 185-63 187 L-38 184 Q-12 167 4 132 Q9 151 38 178 L66 178 Q70 169 48 168 Q42 138 23 108Z',
  facepalm: 'M-20 109 Q-8 139-23 182 L-41 185 Q-45 192-34 194 L-10 190 Q4 166 8 135 Q19 155 33 178 L59 181 Q60 172 46 171 Q35 135 26 107Z',
  run: 'M-23 91 Q-44 110-74 116 L-105 105 Q-115 113-104 122 L-64 133 Q-28 128-10 116 Q15 109 34 130 L24 153 Q28 162 42 154 L55 125 Q36 97 15 95Z',
};

const lean: Record<Pose, number> = {
  stand: -3, excited: -9, confused: 16, suspicious: 18, frustrated: -12, facepalm: 20, run: 23,
};

function costume(person: Person): string {
  if (person === 'isha') return '<path class="prop blue" d="M-13 43 q17 6 34-4 l2 10 q-17 9-36 3 l-15 18 l1-14Z"/>';
  if (person === 'noor') return '<path class="prop green" d="M-17 45 q9 4 18 12 q7-9 21-15 l-3 12 l-17 12 l-19-9Z"/>';
  return '<path class="prop purple" d="M-15 43 q22 5 35-2 l0 10 l-13 7 l-17-4Z"/>';
}

export function personAt(style: RefinedStyle, person: Person, pose: Pose, x: number, y: number, size: number, helmet = ''): string {
  const running = pose === 'run';
  const body = style === 'expressive'
    ? '<path d="' + stick[pose] + '"/>'
    : '<path class="sleeves" d="' + sleeves[pose] + '"/><path class="prop neutral" d="' + (style === 'cartoon' ? trousers[pose] : sketchLegs[pose]) + '"/>'
      + (style === 'cartoon'
        ? '<path class="torso" d="M-17 50 Q0 45 18 50 Q28 73 23 113 Q0 122-24 113 Q-23 78-17 50Z"/>'
        : '<path class="torso" d="M-23 47 Q-3 42 18 51 Q24 67 21 82 L30 110 Q4 127-28 114 L-20 87 Q-31 67-23 47Z"/><path class="hatch" d="M-17 99 l-4 13 m10-14-4 16 m28-50 8 11 M-10 62 q6 15 20 8 M-12 75 l13 3"/>');
  const headScale = style === 'sketch' ? 0.92 : 1;
  const adultProportion = style === 'sketch' && person === 'noor' ? ' scale(.88 1.05)' : '';
  return `<g class="person ${person}" transform="translate(${x} ${y}) scale(${size})${adultProportion}">
    <g ${running && style !== 'expressive' ? 'transform="rotate(15 0 62)"' : ''}>${body}</g>
    <g transform="rotate(${lean[pose]}) scale(${headScale})">
      <path class="head" d="${faces[style][person]}"/>
      ${helmet || hair[person]}
      ${expressions[pose]}
      ${style === 'sketch' ? '<path class="hatch" d="M-29 20 l4 8 m2-7 4 9 M26 22 l-4 9"/>' : ''}
    </g>
    ${costume(person)}
    ${style !== 'expressive' ? '<path class="hand" d="' + hands[pose] + '"/>'
      : pose === 'facepalm' ? '<path class="hand" d="M-24 11 Q-11 6-10-5 l11-7 q4 1 0 6 l-6 7 l12-6 q4 2 1 6 l-11 8 l8-3 q4 3 0 6 l-16 9 q-8 2-13-7Z"/>' : ''}
  </g>`;
}
