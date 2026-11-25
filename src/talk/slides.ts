import { character } from '../illustration/character';
import { envelope, laptop, ledger } from '../illustration/props';

interface TalkSlide {
  id: string;
  composition: string;
  notes: string;
}

function gear(x: number, y: number, radius: number, rotation: number): string {
  const rim = Array.from({ length: 40 }, (_, index) => {
    const angle = index * Math.PI / 20;
    const distance = index % 4 < 2 ? radius : radius * .79;
    return `${(Math.cos(angle) * distance).toFixed(2)},${(Math.sin(angle) * distance).toFixed(2)}`;
  }).join(' ');
  return `<g class="gear" transform="translate(${x} ${y}) rotate(${rotation})">
    <polygon class="prop yellow" points="${rim}"/>
    <circle class="prop neutral" r="${radius * .53}"/>
    <circle class="head" r="${radius * .2}"/>
    <path class="detail" d="M0 -${radius * .49} V-${radius * .23} M0 ${radius * .23} V${radius * .49}"/>
  </g>`;
}

const title = `<div class="talk-sheet title-sheet">
  <h1>The Science of<br>Trustless Systems</h1>
  <svg class="art" viewBox="0 0 1920 1080" role="img"
       aria-label="Two giant hands reach across a gap while Alice, Bob and Charlie run a scaffold of pulleys, gears, a sealed letter and a ledger.">
    <g>
      <path class="prop blue outline" d="M-12 827 Q111 795 220 748 L308 943 Q181 1003 78 1090 H-12Z"/>
      <path class="skin" d="M221 768 Q284 737 342 675 Q399 611 477 600
        L639 553 Q675 544 684 562 Q695 581 660 599 L548 647
        L716 615 Q750 610 754 631 Q757 651 722 662 L566 704
        L713 681 Q743 678 745 699 Q748 718 714 730 L558 763
        L663 755 Q696 751 698 769 Q701 791 670 802 L477 847
        Q415 876 355 881 L293 911Z"/>
      <path class="skin" d="M303 754 Q332 727 364 711 Q382 686 414 666
        Q447 645 483 641 Q519 636 519 659 Q518 677 481 695 L440 731
        Q412 759 399 795"/>
      <path class="crease" d="M463 757 Q492 766 510 790 M533 687 Q545 700 542 715 M540 748 Q545 758 542 770"/>
      <path class="prop blue outline" d="M185 762 L239 736 L333 913 L276 945Z"/>
      <circle class="head" cx="267" cy="884" r="9"/>
      <path class="detail" d="M48 856 L183 804 M82 993 L226 926"/>
    </g>
    <g>
      <path class="prop purple outline" d="M1734 0 H1925 V163 L1729 245 L1656 82Z"/>
      <path class="skin" d="M1704 66 Q1637 109 1555 116 Q1461 124 1391 151
        Q1331 174 1292 214 L1200 296 Q1177 318 1192 332 Q1206 345 1236 325
        L1336 258 L1255 339 Q1233 362 1250 377 Q1267 389 1294 364 L1381 295
        L1322 376 Q1306 401 1325 411 Q1345 419 1365 395 L1431 326
        L1407 382 Q1398 410 1417 417 Q1436 421 1450 392 L1522 296
        Q1576 284 1623 257 L1770 201Z"/>
      <path class="skin" d="M1564 190 Q1516 172 1469 188 L1384 214
        Q1354 225 1357 243 Q1359 261 1393 257 L1475 245
        Q1505 271 1544 266"/>
      <path class="crease" d="M1454 277 Q1472 287 1495 284 M1376 290 l11 11 M1425 319 l12 10"/>
      <path class="prop purple outline" d="M1670 74 L1725 51 L1794 205 L1737 229Z"/>
      <circle class="head" cx="1745" cy="187" r="9"/>
      <path class="detail" d="M1757 68 L1881 20 M1794 161 L1890 120"/>
    </g>
    <g class="steel">
      <path class="outline" d="M719 714 L760 408 L1147 375 L1243 679 M743 707 L780 430 L1134 401 L1218 681
        M755 588 L1169 553 M752 615 L1180 579 M762 586 L909 418 L1002 577 L1137 405
        M749 610 L922 679 L1010 593 L1222 679"/>
      <path class="prop neutral" d="M706 714 L1250 673 L1253 697 L709 738Z"/>
      <path class="prop neutral" d="M736 402 L1164 367 L1169 390 L739 426Z"/>
      <path class="detail" d="M823 723 L807 766 M842 721 L829 765 M1097 703 L1117 751 M1118 701 L1139 749"/>
    </g>
    <path class="rope" d="M639 552 L818 381 A25 25 0 0 1 857 399 L871 498 M850 385 L1033 328
      A29 29 0 0 1 1069 355 L1088 494 M1064 336 L1193 322 M1014 513 L1034 349"/>
    <g>
      <circle class="prop neutral" cx="838" cy="398" r="20"/><circle class="head detail" cx="838" cy="398" r="6"/>
      <circle class="prop neutral" cx="1044" cy="351" r="22"/><circle class="head detail" cx="1044" cy="351" r="7"/>
    </g>
    ${gear(936, 615, 57, 12)}
    ${gear(1016, 651, 42, 29)}
    ${gear(881, 656, 27, 44)}
    <path class="detail" d="M936 615 l-29 -38 -24 1"/>
    <path class="rope" d="M871 498 l-25 28 m25-28 24 23 M821 582 Q831 539 857 519"/>
    ${envelope(875, 547, .62, -7)}
    <g transform="translate(1063 525)">
      <path class="outline" d="M-15 1 v-16 a15 15 0 0 1 30 0 V1"/>
      <rect class="prop yellow" x="-26" width="52" height="41" rx="6"/>
      <path class="detail" d="M0 15 v10"/>
    </g>
    <g transform="translate(1009 494)">
      <circle class="head" r="21"/><path class="signal" d="m-10 0 7 7 13-15"/>
    </g>
    <path class="outline" d="M1095 579 L1176 569 M1104 579 l-5 106 M1167 572 l12 107"/>
    <g transform="translate(1133 531) scale(.52)">${ledger(0, 0, -7, '✓')}</g>
    ${character('alice', { x: 778, y: 575, scale: .67, pose: 'point', angles: { rightArm: -17 } })}
    ${character('bob', { x: 1193, y: 567, scale: .63, pose: 'point', facing: 'left', angles: { rightArm: -32 } })}
    ${character('charlie', { x: 974, y: 465, scale: .61, pose: 'hold', facing: 'left' })}
    <path class="outline" d="M969 517 l20 38"/><circle class="prop yellow detail" cx="969" cy="517" r="6"/>
    <path class="outline" d="M943 567 L1004 563 M949 566 l-2 20 M998 565 l1 20"/>
    <path class="gold" d="M1043 966 Q1336 926 1744 935"/>
  </svg>
</div>`;

const computers = [
  { x: 230, socket: 672, cable: 'M263 510 C269 606 353 618 461 645 S663 697 672 795' },
  { x: 520, socket: 815, cable: 'M553 510 C559 591 595 609 663 626 S810 673 815 795' },
  { x: 810, socket: 958, cable: 'M843 510 C848 573 903 577 931 622 S954 724 958 795' },
];

const failure = `<div class="talk-sheet failure-sheet">
  <h1>Single Point of Failure</h1>
  <p>One plug to rule them all</p>
  <svg class="art" viewBox="0 0 1920 1080" role="img"
       aria-label="Three computers are down. Each plugs into one power strip. The strip's plug dangles below the wall outlet, which powers Charlie's phone charger. Alice points and Bob facepalms.">
    <path class="ground" d="M113 554 Q529 550 932 555 M116 554 v31 m810-30 v29 M117 950 Q953 958 1800 950"/>
    ${computers.map(({ x, socket, cable }) => `<g data-device="${x}">
      <path class="cable" d="${cable}"/>
      <g transform="translate(${x} 436) scale(1.65)">${laptop(0, 0, false)}</g>
      <text class="down-label" x="${x}" y="347">NO POWER</text>
      <path class="prop neutral" d="M${socket - 16} 795 h32 v37 h-32Z"/>
    </g>`).join('')}
    <g>
      <rect class="prop neutral outline" x="601" y="820" width="514" height="94" rx="22"/>
      ${computers.map(({ socket }) => `<g>
        <rect class="head" x="${socket - 27}" y="837" width="54" height="59" rx="13"/>
        <path class="prop neutral" d="M${socket - 18} 826 h36 v55 h-36Z"/>
        <path class="detail" d="M${socket - 11} 839 h22"/>
      </g>`).join('')}
      <path class="alarm outline" d="m1043 852 20 20 m0-20-20 20"/>
    </g>
    <g data-strip-lead>
      <path class="cable" d="M1115 875 C1186 877 1252 926 1331 902 C1430 873 1370 772 1440 731"/>
      <g transform="translate(1440 731) rotate(52)">
        <path class="prop neutral" d="M-23 0 H23 V-42 Q0-48-23-42Z"/>
        <path class="outline" d="M-11-45 v-24 M11-45 v-24"/>
        <path class="detail" d="M-14-11 h28"/>
      </g>
    </g>
    <g data-phone-feed>
      <rect class="head outline" x="1548" y="489" width="116" height="145" rx="13"/>
      <path class="detail" d="M1562 506 h3 m80 112 h3"/>
      <path class="cable" d="M1638 590 C1749 563 1821 678 1780 760 Q1766 787 1731 761"/>
      <rect class="prop neutral outline" x="1570" y="539" width="70" height="70" rx="12"/>
      <path class="detail" d="M1621 551 v45"/>
      <g transform="translate(1713 711) rotate(-20)">
        <rect class="prop purple outline" x="-30" y="-53" width="60" height="106" rx="11"/>
        <rect class="head" x="-21" y="-42" width="42" height="78" rx="4"/>
        <path class="signal" d="m4-24-13 20 H4 L-3 15"/>
        <path class="detail" d="M-5 44 h10"/>
      </g>
    </g>
    ${character('alice', { x: 152, y: 701, scale: 1.32, pose: 'point', expression: 'frustrated', angles: { rightArm: -20 } })}
    ${character('bob', { x: 371, y: 717, scale: 1.25, pose: 'facepalm' })}
    ${character('charlie', { x: 1622, y: 756, scale: 1.01, pose: 'excited' })}
  </svg>
</div>`;

export const slides: readonly TalkSlide[] = [
  {
    id: '01-title',
    composition: title,
    notes: 'Ask: How do we agree? What information must we reveal? Take a few answers before naming the two halves of the lecture. The machine is a metaphor for the work done by protocols and their participants.',
  },
  {
    id: '02-single-point-of-failure',
    composition: failure,
    notes: 'Ask why the devices stopped together. Trace each computer to the strip, then follow the strip lead to the disconnected plug. Charlie’s charger draws power directly from the wall. The computers share a dependency. In this example the strip is their sole power source and none has a battery or backup supply.',
  },
];
