import { character } from '../illustration/character';

function outage(x: number, y: number, radius: number): string {
  return `<path class="outage" d="M${x - radius} ${y - radius} l${2 * radius} ${2 * radius}
    m${-2 * radius} 0 ${2 * radius} ${-2 * radius}"/>`;
}

const supplies = [
  { socket: 501, cable: 'M382 755 C456 748 434 818 501 814' },
  { socket: 557, cable: 'M351 358 C423 354 415 457 404 504 C386 601 501 602 538 701 Q560 748 557 813' },
  { socket: 612, cable: 'M552 416 C551 471 479 515 511 589 C537 653 613 686 612 813' },
  { socket: 667, cable: 'M800 399 C697 395 728 465 651 502 C566 543 570 635 622 695 Q670 746 667 813' },
  { socket: 724, cable: 'M775 616 Q798 630 814 653 C822 749 710 693 721 782 L724 813' },
];

export const failureComposition = `<div class="talk-sheet failure-sheet">
  <h1>Single Point of Failure</h1>
  <p>One plug to rule them all</p>
  <svg class="art" viewBox="0 0 1672 940.5" role="img"
       aria-label="Five devices show outage crosses. Their separate cords plug into the same power strip, whose supply plug lies disconnected. Charlie holds a charger in the wall socket, and its cord runs to a charging phone on his desk.">
    <path class="gold" d="M409 136 Q567 111 684 119 M700 117 Q1041 94 1262 131
      M352 62 l-33-20 m20 47-39-2 m44 26-29 10 M1318 62 l29-21 m-21 47 39-6 m-34 32 24 11"/>
    <path class="lavender" d="M578 155 Q835 131 1086 152 Q1127 159 1117 183 Q1112 199 1085 197
      Q845 187 582 202 Q554 203 556 181 Q557 164 578 155Z"/>
    <path class="fine" d="M536 165 l-18-7 m16 27-23 2 m25 9-15 11 M1136 166 l17-9 m-15 23 23 2 m-24 10 15 11"/>

    <g class="lavender">
      <ellipse cx="259" cy="446" rx="123" ry="16"/>
      <ellipse cx="561" cy="420" rx="119" ry="14"/>
      <ellipse cx="878" cy="421" rx="95" ry="13"/>
      <ellipse cx="638" cy="889" rx="210" ry="19"/>
      <ellipse cx="902" cy="894" rx="75" ry="7"/>
    </g>
    ${supplies.map(({ cable }) => `<path class="cable" d="${cable}"/>`).join('')}

    <g>
      <path class="lavender outlined" d="M168 279 l36-24 24 11 -4 178 -56-8Z"/>
      <path class="head" d="M204 255 Q278 243 352 256 L353 441 Q282 452 208 444Z"/>
      <path class="dark-fill" d="M220 267 L337 269 L338 430 L221 432Z"/>
      <path class="screen-detail" d="M221 296 l113 1 m-113 29 h113 m-113 31 h114 m-113 34 h114
        M232 278 h22 m-22 31 h32 m-32 109 h28 M306 282 h5 m-5 30 h5 m-5 105 h5"/>
      ${outage(285, 354, 25)}
      <path class="fine" d="M228 237 q-3-10 7-14 q-31 2-27-15 q1-9 12-12 q-29-7-16-25
        q6-9 22-8 q5-19 22-11 q14 5 11 17 q13 1 12 12 q-2 14-26 13 q14 14-8 26 q7 8 5 15"/>
      <path class="alarm accent" d="m309 227 7-34 m10 40 22-35 m-9 44 29-18"/>
    </g>
    <g>
      <path class="blue-tint outlined" d="m473 321 32-32 167 10 16 28 -15 88 -198-4Z"/>
      <path class="head" d="M475 321 Q555 314 687 324 L676 409 Q587 418 475 409Z"/>
      <rect class="dark-fill" x="491" y="337" width="172" height="56" rx="6"/>
      <path class="screen-detail" d="M504 350 h60 m-60 13 h38 m-38 14 h61 m-31-77 94 3"/>
      ${outage(627, 367, 13)}
      <path class="alarm accent" d="m652 278 9-34 m8 39 23-30 m-9 43 25-14"/>
    </g>
    <g>
      <path class="head" d="m817 376-6-60 q5-10 12-3 l7 62 m80-4 6-49 q7-8 12 0 l-4 49"/>
      <path class="prop neutral" d="M801 381 Q803 371 820 373 L935 371 Q951 372 952 386 L953 408 Q953 420 935 420 L816 420 Q801 420 801 408Z"/>
      <path class="fine" d="M830 419 v5 m86-5 v5"/>
      <circle class="head fine" cx="825" cy="396" r="5"/><circle class="head fine" cx="847" cy="396" r="5"/>
      <circle class="head fine" cx="869" cy="396" r="5"/><circle class="head fine" cx="890" cy="396" r="5"/>
      ${outage(922, 395, 10)}
      <path class="alarm accent" d="m939 319 8-23 m1 31 20-21 m-11 30 25-9"/>
    </g>

    <g class="custom-arms">
      ${character('alice', { x: 173, y: 607, scale: 1.52, pose: 'frustrated', angles: { head: 5 } })}
      <path class="actor-line" d="M170 694 Q111 717 66 679 Q48 654 111 574
        M170 694 Q260 701 292 648 Q299 629 234 561"/>
      <path class="head fine" d="M105 581 q-9-12-3-25 l6-10 q4-5 6-1 l-2 8
        q9-14 14-11 l-3 10 q10-8 12-4 l-10 13 q3 7-12 19Z
        M228 566 q-12-5-15-17 q-5-11 1-13 l6 10 q-5-13 1-13 l8 10
        q12-3 14 11 l-3 12Z"/>
      <path class="alarm accent" d="m222 519 8-24 m-1 31 24-29 m-9 40 30-16"/>
    </g>
    <g class="custom-arms seated">
      ${character('bob', { x: 879, y: 540, scale: 1.34, pose: 'frustrated', angles: { head: 8 } })}
      <path class="actor-line" d="M878 619 Q841 648 814 622 L788 562 M882 620 Q924 659 955 592 L967 570"/>
      <path class="head fine" d="M787 564 q-17-2-25-20 q-4-9 2-9 l9 10 q-9-15-3-17 l11 13
        q-4-16 2-16 l7 16 q5-11 9-7 l1 15 q-2 13-13 15Z
        M964 575 q-12-1-12-15 l4-17 q3-5 5 0 l1 9 q10-18 15-13 l-5 14
        q12-16 16-11 l-9 14 q12-7 14-2 q0 8-14 15Z"/>
      <path class="alarm accent" d="m765 502-20-11 m29 2-17-23 m27 16-3-27"/>
    </g>

    <g>
      <path class="lavender outlined" d="M31 844 l113 44 288-61 v-24 M50 856 l-2 49 m333-62-3 49 m28-52-2 48"/>
      <path class="head" d="M23 813 L166 772 L432 797 L432 817 L195 864 L31 860"/>
      <path class="fine" d="M41 841 l141 4 m14 1 226-43"/>
      <path class="head" d="M242 670 Q325 652 409 657 L385 766 L216 785Z"/>
      <path class="dark-fill" d="M251 678 L397 665 L377 758 L229 771Z"/>
      <path class="head" d="M286 773 l-2 18 -44 9 q-5 8 7 8 l96-15 -2-8 -37 3 4-18"/>
      ${outage(322, 722, 22)}
      <path class="head" d="M648 532 Q712 522 780 527 L789 627 L650 631Z"/>
      <path class="dark-fill" d="M656 540 L771 535 L778 619 L659 622Z"/>
      <path class="head" d="M706 630 l-1 15 -20 4 2 6 64-3 -3-7 -26-2 -1-14"/>
      ${outage(717, 578, 19)}
      <path class="head" d="M624 656 L665 646 L967 648 L968 665 L624 670Z"/>
      <path class="fine" d="M656 671 l-3 20 m295-25 1 20"/>
    </g>

    <g data-strip-lead>
      <path class="cable heavy-cable" d="M804 856 C857 849 870 893 921 866 C951 850 936 807 970 766"/>
      <path class="cable-glint" d="M804 856 C857 849 870 893 921 866 C951 850 936 807 970 766"/>
      <g transform="translate(965 773) rotate(43)">
        <path class="head fine" d="M-13-38 v-23 q5-8 9 0 v22 m11 0 v-22 q5-8 9 0 v22"/>
        <path class="plug-fill" d="M-26-37 Q0-42 25-37 L24-6 Q23 4 0 5 Q-23 4-26-6Z"/>
        <path class="cable-glint" d="M-20-29 h39"/>
      </g>
      <path class="gold accent" d="m915 785-23-10 m28-1-18-23 m27 16-4-31"/>
    </g>
    <path class="strip-fill" d="M461 831 Q478 814 509 814 L780 811 Q799 809 808 831 L816 863
      Q818 882 806 891 L472 892 Q459 889 460 875Z"/>
    <path class="fine" d="M465 855 Q499 855 748 855 M753 853 l-6-28"/>
    ${supplies.map(({ socket }) => `<g>
      <path class="plug-fill fine" d="M${socket - 9} 801 q9-8 18 0 v16 h-18Z"/>
      <rect class="plug-fill" x="${socket - 18}" y="809" width="36" height="31" rx="6"/>
      <path class="cable-glint" d="M${socket - 11} 815 h22"/>
    </g>`).join('')}
    <path class="prop red fine" d="m763 827 25-1 7 25 -24 1Z"/>
    <path class="screen-detail" d="M773 837 a4 4 0 1 0 8 0 a4 4 0 1 0-8 0 m5 9 h6"/>

    <g class="custom-arms seated">
      <path class="lavender outlined" d="M1374 815 L1379 720 Q1386 680 1424 678 L1462 677 Q1519 677 1515 719 L1503 815Z"/>
      ${character('charlie', { x: 1385, y: 539, scale: 1.92, pose: 'hold', expression: 'excited', angles: { head: -12 } })}
      <path class="actor-line" d="M1374 649 Q1331 731 1284 731 Q1250 730 1211 657 L1177 643
        M1393 646 Q1451 674 1456 734 Q1449 771 1396 793"/>
      <path class="fine" d="M1509 489 l-3-36 22-9 5 28"/>
      <ellipse class="ink-fill" cx="1505" cy="489" rx="8" ry="5" transform="rotate(-19 1505 489)"/>
      <ellipse class="ink-fill" cx="1528" cy="474" rx="8" ry="5" transform="rotate(-19 1528 474)"/>
    </g>
    <g>
      <path class="lavender outlined" d="M1080 882 h562 v19 l-560 2Z M1110 899 v27 m490-28 v25"/>
      <path class="head" d="M1075 880 Q1084 858 1137 813 L1654 813 M1076 881 L1646 881"/>
      <path class="head" d="M1076 879 V899 L1647 901"/>
    </g>
    <g data-phone-feed>
      <path class="head" d="M1045 610 Q1046 603 1057 604 L1117 603 Q1128 603 1128 616 L1126 704
        Q1125 711 1112 711 L1056 711 Q1045 712 1043 703Z"/>
      <path class="fine" d="M1066 638 Q1066 628 1085 628 Q1106 627 1106 636 V675
        Q1103 686 1084 685 Q1065 688 1066 675Z M1077 644 v16 m12-17 v17 m-6 11 v3"/>
      <path class="head fine" d="M1100 661 h20 v9 h-20Z"/>
      <path class="head" d="M1116 644 L1177 643 Q1187 644 1187 653 L1182 674 Q1181 682 1170 683 L1116 684Z"/>
      <path class="cable heavy-cable" d="M1179 674 C1224 691 1175 808 1237 842 C1288 867 1364 836 1436 839"/>
      <path class="cable-glint" d="M1179 674 C1224 691 1175 808 1237 842 C1288 867 1364 836 1436 839"/>
      <path class="head fine" d="M1212 657 Q1200 657 1190 649 Q1188 661 1179 663
        Q1170 664 1174 657 L1179 649 Q1172 653 1168 650 Q1163 646 1176 638 Q1190 628 1212 657Z"/>
      <path class="signal accent" d="m1102 586-21-17 m34 9-7-26 m24 24 10-28"/>
      <ellipse class="lavender" cx="1518" cy="855" rx="92" ry="14"/>
      <path class="head fine" d="M1438 829 l24-1 -6 18 -34 1 5-14Z"/>
      <path class="plug-fill" d="M1461 806 Q1466 795 1484 794 L1583 783 Q1599 781 1597 794 L1578 852
        Q1575 861 1561 863 L1444 862 Q1429 860 1437 845Z"/>
      <path class="screen-detail" d="m1459 827-6 13 m111-34 7-1 -4 13 -7 1"/>
      <path class="prop green fine" d="m1499 806 62-6 -16 35 -63 5Z"/>
      <path class="charge-mark" d="m1527 807-16 13 15-1 -10 12"/>
      <path class="signal accent" d="m1571 770-7-23 m19 18 10-29 m3 32 22-26 m-14 39 25-12"/>
    </g>
  </svg>
</div>`;
