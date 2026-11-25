import { character } from '../illustration/character';
import { envelope } from '../illustration/props';

function gear(x: number, y: number, radius: number, color: 'yellow' | 'purple', check = false): string {
  const rim = Array.from({ length: 40 }, (_, index) => {
    const angle = (index - .5) * Math.PI / 20;
    const distance = index % 4 < 2 ? radius : radius * .79;
    return `${(Math.cos(angle) * distance).toFixed(2)},${(Math.sin(angle) * distance).toFixed(2)}`;
  }).join(' ');
  return `<g class="gear" transform="translate(${x} ${y})">
    <polygon class="prop ${color}" points="${rim}"/>
    <circle class="head" r="${radius * .52}"/>
    ${check ? '<path class="verification" d="m-16 0 11 13 22-26"/>' : ''}
  </g>`;
}

function pulley(x: number, y: number): string {
  return `<g transform="translate(${x} ${y})">
    <circle class="prop neutral" r="23"/>
    <circle class="head fine" r="16"/>
    <circle class="prop yellow fine" r="6"/>
  </g>`;
}

const rope = 'M348 611 L483 488 L628 403 L749 352 M493 508 L590 573 L620 660 L618 685 M632 443 L604 530 M657 425 L733 486 M635 574 L765 514 M792 375 L791 450 M836 351 L930 407 M919 422 L848 488 M849 519 L961 549 M948 431 L969 496 M967 407 L1021 263 Q1032 237 1062 236 L1079 226 M1047 259 L1081 337 L1115 392 M1082 337 V421';

export const titleComposition = `<div class="talk-sheet title-sheet">
  <h1>
    <span>The Science of</span>
    <strong>Trustless</strong>
    <strong>Systems</strong>
  </h1>
  <svg class="art" viewBox="0 0 1672 940.5" role="img"
       aria-label="From opposite corners, two giant hands hold a web of ropes and gears. Alice turns the winch, Bob checks a clipboard and Charlie pulls the rope.">
    <g class="scaffold">
      <path d="M318 472 l62 59 69-57 m-69 1 67 52 M379 470 v175 m66-171 v145 M379 528 h65"/>
      <path class="prop neutral" d="M310 461 L531 459 L532 472 L311 474Z"/>
      <path d="M998 508 L1149 428 M1012 508 L1154 441 M1039 488 V429 l47 40 V429 l-49 43Z"/>
      <path class="prop neutral" d="M1029 420 L1172 417 L1170 430 L1029 432Z"/>
    </g>

    <path class="rope-edge" d="${rope}"/>
    <path class="rope" d="${rope}"/>
    <path class="rope-twist" d="${rope}"/>
    ${pulley(498, 493)}
    ${pulley(637, 424)}
    ${pulley(949, 414)}
    ${pulley(1045, 257)}

    ${gear(691, 513, 40, 'purple')}
    ${gear(879, 505, 39, 'purple')}
    ${gear(790, 497, 64, 'yellow', true)}
    ${envelope(794, 354, .53, -1)}
    <path class="head" d="M569 524 l76-3 -3 82 -74 4Z M931 482 h57 l16 17 -5 64 -72 1Z"/>
    <path class="fine blue-ink" d="M577 532 l6-2 m50 61 -1 6 -10 2 m319-107 7-3 m43 63 -6 4"/>
    <path class="fine" d="M585 545 l41-3 m-40 16 41-3 m-41 15 38-3 m-38 14 26-2 M988 483 l-1 16 15 1"/>
    <path class="fine" d="M953 520 v-8 a12 12 0 0 1 24 0 v8 m-19-1 v-7 a7 7 0 0 1 14 0 v7"/>
    <path class="prop yellow fine" d="M949 521 l31-2 -1 28 -31 1Z"/><path class="fine" d="M964 530 v8"/>
    <path class="fine" d="m776 301-10-15 m28 9-1-19 m17 24 10-15"/>

    <g class="scaffold">
      <path d="M327 463 l12-29 m29 29 -2-30 m53 29 -15-31"/>
      <path class="head" d="M290 351 l131-10 13 87 -128 10Z"/>
      <path class="fine" d="m325 391 36-30 44 25 -36 31 -44-26 80-5 m-44-25 8 56"/>
      <circle class="prop blue fine" cx="325" cy="391" r="8"/>
      <circle class="prop blue fine" cx="362" cy="361" r="8"/>
      <circle class="prop blue fine" cx="405" cy="386" r="8"/>
      <circle class="prop blue fine" cx="369" cy="416" r="8"/>
    </g>
    <g class="custom-arms">
      ${character('bob', { x: 485, y: 318, scale: .82, pose: 'stand', angles: { head: -11 } })}
      <path class="actor-line" d="M486 364 Q474 373 469 389 L506 377 M488 363 Q504 373 520 354"/>
      <path class="prop green fine" d="m513 353 30-5 -15 47 -30 4Z"/>
      <path class="fine" d="m519 351 4-6 13-1 -3 6 m-12 14 8-39"/>
      <circle class="head fine" cx="506" cy="378" r="4"/>
      <path class="fine" d="m538 281 5-12 m7 19 11-10 m-5 22 12-3"/>
    </g>
    <g class="custom-arms">
      ${character('charlie', { x: 1143, y: 316, scale: .59, pose: 'stand', facing: 'left', expression: 'excited' })}
      <path class="actor-line" d="M1140 347 Q1104 336 1071 307 M1140 350 Q1109 351 1081 333"/>
      <circle class="head fine" cx="1070" cy="307" r="5"/><circle class="head fine" cx="1080" cy="332" r="5"/>
      <path class="fine" d="M1036 328 q0 15 13 22 m-3-31 q2 12 10 18"/>
    </g>
    <g class="custom-arms">
      ${character('alice', { x: 205, y: 548, scale: .91, pose: 'stand', angles: { head: -8 } })}
      <path class="actor-line" d="M205 596 Q218 610 253 607 M207 595 Q226 590 269 578"/>
      <g class="scaffold">
        <path d="M247 673 l38-83 35 81 m-45-18 h69 m-21 14 20-83 37 72"/>
        <path class="prop neutral" d="M288 589 Q311 580 341 585 L351 622 Q317 637 292 631Z"/>
        <path class="prop yellow fine" d="M301 588 Q293 610 307 632 m2-46 q-7 25 5 46 m4-47 q-7 23 5 45 m4-46 q-7 22 5 43"/>
        <ellipse class="prop neutral" cx="343" cy="607" rx="15" ry="26"/>
        <ellipse class="head fine" cx="343" cy="607" rx="8" ry="16"/>
        <path class="actor-line" d="M293 611 l-16-31 -8-2 M293 611 l-40-4"/>
      </g>
      <circle class="head fine" cx="253" cy="607" r="5"/><circle class="head fine" cx="269" cy="578" r="5"/>
      <path class="fine" d="M298 560 q16-12 31 2 m-23-19 q20-6 33 9"/>
    </g>

    <g class="giant-hand">
      <path class="skin" d="M130 779 C97 752 66 750 71 732 C115 680 179 674 236 671
        C288 670 321 656 368 634 C405 616 467 593 497 607 C523 619 514 648 485 670
        C446 701 382 698 360 741 C394 757 422 750 445 761
        C483 786 520 762 558 720 C598 676 661 625 701 648 C733 664 687 696 662 722
        C635 753 615 785 598 804 C568 828 511 835 467 862 C437 886 432 889 383 883
        C297 886 229 858 156 897Z"/>
      <path class="skin" d="M446 762 C470 749 488 711 516 711 Q534 711 540 725
        C560 696 578 661 609 657 Q633 651 629 676 C603 700 587 720 566 745
        Q507 750 476 774"/>
      <path class="contour" d="M446 762 Q474 770 479 793 M358 741 Q341 754 332 774 M361 745 Q382 756 392 780
        M540 725 Q527 733 520 748 M566 745 Q578 747 583 754 M448 626 Q457 639 464 657
        Q487 650 508 632 M670 699 Q672 678 707 666"/>
      <path class="hatch" d="M79 730 q9-13 22-22 m-10 30 23-34 m-13 36 23-39 m-10 39 22-43 m-10 37 22-41
        m-9 33 21-35 m-10 25 20-27 m-9 18 20-22 M147 877 l22-45 m-13 41 41-62 m-29 58 34-47
        m-24 43 43-66 m-28 57 28-38 m-14 42 25-29 m-11 29 39-42 m-25 40 37-37 m-20 38 31-31
        m-14 33 37-35 m-20 35 37-35 m-19 37 36-38 m-19 40 33-39 m-13 41 36-41 m-22 44 35-44
        m-16 44 30-42 m-14 41 33-41 m-15 34 29-34 m-14 24 24-34 m-9 27 24-29 m-10 24 23-31
        m-9 25 21-30 m-10 25 23-34 m-9 30 20-31 m-8 26 20-32 m-8 25 16-31 m-6 24 15-28
        m-3 11 19-42 m-8 20 19-39 m-8 21 21-40 M316 747 l11-21 m-4 26 16-33 m-7 34 25-43
        m-14 37 27-46 m-9 27 18-32 m-7 25 24-34 m-12 22 16-26 m-6 21 17-23 m-4 18 14-22
        m-3 17 11-21 M474 750 l16-22 m-6 22 16-24 m-5 19 14-24 m-1 25 19-30 m10 25 16-27
        m-4 23 16-28 m-4 25 16-28 m4 15 18-30"/>
      <path class="skin" d="M19 754 L61 727 Q139 755 160 909 L98 942 L36 946Z"/>
      <path class="prop blue cuff" d="M-8 755 L17 744 Q91 781 112 952 H-8Z"/>
      <circle class="head" cx="129" cy="888" r="10"/>
      <path class="hatch" d="m105 881 12-31 m-7 41 14-41 m-8 49 10-24 m11 27 10-23
        M9 778 l-9 25 m18-21-18 44 m25-36-17 50 m24-36-12 37 M7 930 l29-59 m-17 68 30-65
        m-17 67 24-44 m-9 46 22-56 m-7 58 15-36 m-4 37 16-38"/>
    </g>
    <g class="giant-hand">
      <path class="skin" d="M1594 55 C1525 70 1437 47 1374 23 C1350 12 1327 20 1307 25
        C1260 29 1212 42 1171 41 C1146 38 1124 61 1093 75 C1062 86 1056 105 1029 120
        C1012 130 998 138 1002 151 C1006 170 1039 174 1065 159 Q1089 147 1108 127
        C1132 125 1155 112 1175 101 C1200 111 1246 110 1261 101 C1278 113 1289 130 1291 148
        C1288 167 1271 189 1275 204 C1282 222 1306 209 1317 190
        C1329 173 1334 158 1338 141 Q1353 143 1364 150
        C1371 177 1375 184 1384 196 C1366 217 1340 231 1303 242 C1278 254 1241 284 1248 319
        C1253 344 1280 339 1304 325 C1327 311 1355 311 1374 293 C1409 264 1438 266 1484 265
        C1527 264 1550 241 1578 220 L1628 190Z"/>
      <path class="skin" d="M1174 103 C1148 126 1129 148 1112 173 C1103 193 1088 211 1074 228
        C1062 243 1078 260 1099 252 C1128 241 1140 214 1150 197
        C1179 179 1185 165 1197 150 Q1234 143 1273 125
        L1262 102 Q1222 113 1174 103Z"/>
      <path class="skin" d="M1176 105 Q1219 116 1263 102 L1283 128
        Q1307 136 1332 143 Q1312 153 1286 152 Q1271 165 1255 174
        C1250 208 1231 235 1207 235 Q1189 232 1198 215 Q1210 191 1214 167
        Q1243 153 1264 138 Q1231 147 1197 151 Q1190 155 1188 160"/>
      <path class="contour" d="M1004 146 Q1025 146 1050 117 M1107 126 l2-17
        M1260 103 q11-10 17-27 M1364 150 q-14-17-19-49 M1384 197 q16-22 30-67
        M1396 184 q19-43 41-55 M1277 198 q13-8 19-24 M1310 164 q6-8 7-17 M1250 311 q19-25 46-30 q14 9 16 34 M1080 236 q13-10 21-30"/>
      <path class="hatch" d="M1358 25 l23 19 m-12-18 33 28 m-17-22 37 33 m-21-29 33 32 m-17-27 37 34
        m-17-28 36 33 m-18-29 37 35 m-18-31 39 31 m-20-28 36 27 m-18-25 32 24 m-11-24 28 24
        M1122 118 l14-23 m-3 20 15-25 m-4 20 16-21 m-4 16 17-23 m-4 19 12-21
        M1184 101 l11-15 m1 16 12-16 m0 16 11-18 m2 19 14-19 m-1 18 16-21 m-2 18 16-20
        M1114 223 l7-20 m1 13 13-31 m-4 23 14-34 m-3 21 15-36 m-2 30 15-39 m-4 32 16-39
        m-2 29 16-40 m-2 28 15-36 m-3 35 16-33 m-2 31 15-31 m-1 26 15-29
        M1210 222 l11-28 m-2 28 13-38 m-5 29 15-35 m-7 27 16-42 m-2 23 13-33
        m-1 20 13-32 m-1 25 14-27 m-4 18 9-16 m2 15 6-12 m5 12 6-9
        M1281 120 l-8-22 m15 26-5-19 m14 25-7-24 m16 27-8-26 m17 28-9-24 m17 27-9-24
        m17 26-9-27 m18 30-9-32 m26 43-5-25 m11 41-1-23 m9 39 5-36
        M1323 314 q10-11 14-29 m-5 24 q14-15 19-39 m-8 35 q14-16 20-35 m-7 26 q18-17 25-41
        m-9 28 24-34 m-7 26 q17-15 24-36 m-8 31 q20-15 28-38 m-10 34 25-36 m-10 34 26-40
        m-8 39 24-44 m-8 43 26-48 m-10 44 q26-31 34-55 m-15 47 q22-28 43-64 m-21 52 36-62"/>
      <path class="prop purple cuff" d="M1554 37 Q1607 27 1680 7 L1685 242 Q1632 253 1601 272
        C1620 205 1625 121 1587 62 Q1571 42 1554 37Z"/>
      <path class="contour" d="M1554 37 l-11 23 25-2 m0 162 q13 42 33 52 l9-68 -42 16"/>
      <circle class="head" cx="1644" cy="220" r="11"/>
      <path class="hatch" d="m1617 221 37-70 m-31 59 35-72 m-34 62 22-49 m-22 26 15-35
        m-26 101 33-54 m-22 55 15-23 m3 21 25-41 m-14 34 22-39 m-10 33 13-26"/>
    </g>
    <path class="gold brush-underline" d="M1000 918 Q1282 808 1569 838"/>
    <path class="gold" d="m1546 710 19-31 m-7 54 49-29 m-42 54 44 1"/>
  </svg>
</div>`;
