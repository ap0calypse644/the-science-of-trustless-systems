export type Character = 'alice' | 'bob' | 'charlie';
export type Expression = 'stand' | 'excited' | 'confused' | 'suspicious' | 'frustrated' | 'facepalm' | 'run';
export type Pose = Expression | 'point' | 'hold';
export type Point = readonly [x: number, y: number];

export const headShapes: Record<Character, string> = {
    alice: 'M-34 14 Q-48-8-32-38 Q-15-56 9-48 Q38-42 37-16 Q42 8 26 33 Q8 48-16 40 Q-29 35-34 14Z',
    bob: 'M-39-12 Q-37-42-12-47 Q22-52 39-26 Q50 0 34 30 Q19 44-5 40 Q-36 36-39-12Z',
    charlie: 'M-42-11 Q-50-33-21-44 Q6-51 36-32 Q50-16 36 10 L24 31 Q9 46-21 32 Q-37 26-42-11Z',
};

export const hairAndGlasses = {
  alice: { hair: 'M-34 1 Q-26-32-4-36 Q11-16 33-20 M-32-21 Q-57-42-62-16 Q-67 0-51 9 L-38 3', glasses: '' },
  bob: { hair: 'M-35-26 q-4-13 11-13 q-1-14 15-10 q12-12 23-1 q15-7 22 10', glasses: 'M-31-6 q10-7 21 0 l-2 17 q-12 7-20-2Z M7-6 q12-8 25-1 l-3 17 q-12 8-22-1Z M-10-3 Q-1-7 7-3' },
  charlie: { hair: 'M-43-14 Q-48-31-34-37 L-42-51 Q-17-51-7-38 L-4-55 Q14-53 24-38 L39-40 Q47-28 37-14 Q9-27-20-23Z', glasses: '' },
};

// Each move command in the approved D body path becomes one independently addressable part.
export const poses = {
  stand: {
    torso: 'M1 43 Q8 77-1 115',
    leftArm: 'M2 54 Q-14 77-39 97', rightArm: 'M3 55 Q26 66 36 96',
    leftLeg: 'M-1 115 Q-13 141-31 170 l-15 1', rightLeg: 'M-1 115 Q17 140 20 173 l16 0',
    neck: [1, 43], leftShoulder: [2, 54], rightShoulder: [3, 55], hip: [-1, 115],
    leftHand: [-39, 97], rightHand: [36, 96],
  },
  excited: {
    torso: 'M2 42 Q-4 76 7 105',
    leftArm: 'M2 55 Q-27 58-45 23 l-10-18', rightArm: 'M2 58 Q42 53 56 14 l3-13',
    leftLeg: 'M7 105 Q-13 122-19 151 l-30-8', rightLeg: 'M7 105 Q37 122 32 151 l23 0',
    neck: [2, 42], leftShoulder: [2, 55], rightShoulder: [2, 58], hip: [7, 105],
    leftHand: [-55, 5], rightHand: [59, 1],
  },
  confused: {
    torso: 'M4 43 Q-3 80 8 116',
    leftArm: 'M3 56 Q-19 79-42 70 l-8-10', rightArm: 'M5 55 Q28 70 53 60 l5-8',
    leftLeg: 'M8 116 Q-21 141-29 171 l-13 1', rightLeg: 'M8 116 Q22 142 23 172 l19 0',
    neck: [4, 43], leftShoulder: [3, 56], rightShoulder: [5, 55], hip: [8, 116],
    leftHand: [-50, 60], rightHand: [58, 52],
  },
  suspicious: {
    torso: 'M0 43 Q14 70 17 115',
    leftArm: 'M6 60 Q-20 73-40 98', rightArm: 'M7 60 Q31 78 49 55 l4-13',
    leftLeg: 'M17 115 Q-9 151-38 158 l-17-2', rightLeg: 'M17 115 Q35 140 42 161 l15-3',
    neck: [0, 43], leftShoulder: [6, 60], rightShoulder: [7, 60], hip: [17, 115],
    leftHand: [-40, 98], rightHand: [53, 42],
  },
  frustrated: {
    torso: 'M1 43 Q-15 73-2 112',
    leftArm: 'M0 58 Q-30 53-47 30 l-7-13', rightArm: 'M0 57 Q28 60 55 32 l6-15',
    leftLeg: 'M-2 112 Q-9 148-38 167 l-16-1', rightLeg: 'M-2 112 Q31 134 38 164 l18 0',
    neck: [1, 43], leftShoulder: [0, 58], rightShoulder: [0, 57], hip: [-2, 112],
    leftHand: [-54, 17], rightHand: [61, 17],
  },
  facepalm: {
    torso: 'M4 43 Q-10 67 9 112',
    leftArm: 'M1 58 Q-35 64-31 32 L-20 7', rightArm: 'M2 60 Q24 73 27 111',
    leftLeg: 'M9 112 Q-2 147-15 168 l-18 3', rightLeg: 'M9 112 Q25 141 23 170 l17 1',
    neck: [4, 43], leftShoulder: [1, 58], rightShoulder: [2, 60], hip: [9, 112],
    leftHand: [-20, 7], rightHand: [27, 111],
  },
  run: {
    torso: 'M6 39 Q-9 68-26 99',
    leftArm: 'M-5 59 Q-56 71-72 44', rightArm: 'M-4 58 Q26 77 48 51 l10-16',
    leftLeg: 'M-26 99 Q10 100 30 118 l-12 30', rightLeg: 'M-26 99 Q-41 129-68 135 l-36-14',
    neck: [6, 39], leftShoulder: [-5, 59], rightShoulder: [-4, 58], hip: [-26, 99],
    leftHand: [-72, 44], rightHand: [58, 35],
  },
  point: {
    torso: 'M1 43 Q5 77 0 113',
    leftArm: 'M2 55 Q-23 71-31 94', rightArm: 'M3 54 Q32 50 62 33 l13-3',
    leftLeg: 'M0 113 Q-13 142-31 168 l-15 2', rightLeg: 'M0 113 Q20 144 22 170 l16 1',
    neck: [1, 43], leftShoulder: [2, 55], rightShoulder: [3, 54], hip: [0, 113], leftHand: [-31, 94], rightHand: [75, 30],
  },
  hold: {
    torso: 'M1 43 Q-6 77 2 113',
    leftArm: 'M2 55 Q-34 76-28 96 Q-17 99-8 86', rightArm: 'M3 55 Q34 77 28 96 Q17 99 8 86',
    leftLeg: 'M2 113 Q-13 142-30 170 l-15 1', rightLeg: 'M2 113 Q17 140 23 171 l16 0',
    neck: [1, 43], leftShoulder: [2, 55], rightShoulder: [3, 55], hip: [2, 113], leftHand: [-8, 86], rightHand: [8, 86],
  },
} as const satisfies Record<Pose, Record<'torso' | 'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg', string>
  & Record<'neck' | 'leftShoulder' | 'rightShoulder' | 'hip' | 'leftHand' | 'rightHand', Point>>;

export const expressions = {
  stand: { brows: 'M-19-12 q6-5 13-2 M8-13 q7-5 13 0', eyes: '', dots: 'M-12-3 L-12 1 M15-3 L15 1', mouth: 'M-11 17 q12 9 22 0', filled: false },
  excited: { brows: 'M-22-14 l13-6 M9-18 l13 6', eyes: 'M-19-2 q6-10 12 0 M8-2 q7-11 15-2', dots: '', mouth: 'M-15 9 Q2 16 20 7 Q17 34-2 29 Q-13 26-15 9Z', filled: true },
  confused: { brows: 'M-22-18 l15 6 M7-16 l16-7', eyes: '', dots: 'M-14-5 l0 6 M14-7 l0 5', mouth: 'M-8 22 q10-11 22-5', filled: false },
  suspicious: { brows: 'M-23-5 l15-11 M10-15 l16 0', eyes: 'M-19 1 l11 1 M9-1 l13 1', dots: 'M-10 2 l0 3 M19 2 l0 3', mouth: 'M-11 20 q20 7 27-9', filled: false },
  frustrated: { brows: 'M-24-16 l15 8 M8-8 l17-9', eyes: 'M-19-1 l10 3 M9 1 l11-2', dots: '', mouth: 'M-15 22 Q-4 5 13 15 L17 25 Q-1 20-15 22Z', filled: true },
  facepalm: { brows: '', eyes: 'M-21-4 q8 6 14 2 M8 0 q8 6 14 1', dots: '', mouth: 'M-10 24 q10-7 20 0', filled: false },
  run: { brows: 'M-22-13 l13-5 M9-12 l15 5', eyes: 'M-16-2 l8 3 M9 2 l10-4', dots: '', mouth: 'M-13 17 Q0 8 16 17 L14 23 L-11 23Z', filled: true },
} as const satisfies Record<Expression, { brows: string; eyes: string; dots: string; mouth: string; filled: boolean }>;

export const headLean: Record<Pose, number> = {
  stand: -3, excited: -9, confused: 16, suspicious: 18, frustrated: -12, facepalm: 20, run: 23, point: -7, hold: 0,
};
