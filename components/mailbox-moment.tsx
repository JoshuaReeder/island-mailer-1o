"use client"

/*
 * mailbox-moment.tsx (v31) — "The Mailbox Moment" scroll-driven hero for /local-offers.
 * Built from the approved v28.3 mockup: lush daylight Maui garden scene, planted
 * mailbox (LOCAL RESIDENT), scroll scrub: door opens → the 9×12 slides out of the
 * box → full Side One fills the screen → docks beside the copy.
 *
 * Static SVG artwork is injected via dangerouslySetInnerHTML (verbatim from the
 * approved mockup — avoids JSX attribute conversion). Scrub timeline runs in a
 * rAF-throttled scroll handler; ?p=0..1 jumps to a scrub position (dev/QA).
 * Reduced-motion: static end state, no scrub.
 */

import { useEffect, useRef } from "react"

const HOOD_SVG = `<svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lawnG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A9A64"/><stop offset=".5" stop-color="#417A4E"/><stop offset="1" stop-color="#2E5C3C"/></linearGradient>
    <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4ECD8"/><stop offset="1" stop-color="#E2D5BC"/></linearGradient>
    <linearGradient id="roofG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8BCBE"/><stop offset="1" stop-color="#84999E"/></linearGradient>
    <radialGradient id="winG" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#EECB96"/><stop offset=".7" stop-color="#C9A36B"/><stop offset="1" stop-color="#A37C4F"/></radialGradient>
    <filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>
    <g id="pfrond" stroke="currentColor" fill="none" stroke-linecap="round">
      <path d="M0,0 C40,-32 115,-30 172,26" stroke-width="4"/>
      <g stroke-width="2.5">
        <path d="M10,-8 q5,-11 11,-13"/><path d="M21,-14 q6,-12 12,-14"/><path d="M33,-19 q6,-13 13,-15"/><path d="M46,-23 q7,-13 14,-15"/><path d="M60,-25.5 q7,-13 14,-14"/><path d="M75,-26.5 q7,-12 14,-13"/><path d="M90,-26 q7,-11 13,-12"/><path d="M105,-24 q6,-10 12,-11"/><path d="M120,-20 q6,-9 11,-9"/><path d="M134,-14 q5,-8 10,-8"/><path d="M147,-6 q5,-6 9,-6"/><path d="M159,4 q4,-5 8,-5"/>
        <path d="M10,-8 q4,10 2,20"/><path d="M21,-14 q5,13 4,25"/><path d="M33,-19 q6,15 5,29"/><path d="M46,-23 q7,17 7,32"/><path d="M60,-25.5 q8,18 8,34"/><path d="M75,-26.5 q9,18 9,34"/><path d="M90,-26 q9,18 10,33"/><path d="M105,-24 q9,17 10,31"/><path d="M120,-20 q9,16 10,28"/><path d="M134,-14 q8,14 9,24"/><path d="M147,-6 q7,12 8,20"/><path d="M159,4 q6,10 7,16"/><path d="M168,15 q5,8 6,13"/>
      </g>
      <g stroke-width="2.2">
        <path d="M15.5,-11 q5,12 3,23"/><path d="M27,-16.5 q6,14 5,27"/><path d="M39.5,-21 q7,16 6,30"/><path d="M53,-24.2 q8,17 8,33"/><path d="M67.5,-26 q9,18 9,34"/><path d="M82.5,-26.2 q9,18 10,33"/><path d="M97.5,-25 q9,17 10,32"/><path d="M112.5,-22 q9,16 10,29"/><path d="M127,-17 q8,15 9,26"/><path d="M140.5,-10 q8,13 8,22"/><path d="M153,-1 q7,11 7,18"/><path d="M163.5,9.5 q5,9 6,14"/>
        <path d="M15.5,-11 q5,-11 11,-13"/><path d="M27,-16.5 q6,-12 12,-14"/><path d="M39.5,-21 q7,-13 13,-14"/><path d="M53,-24.2 q7,-13 14,-14"/><path d="M67.5,-26 q7,-12 14,-13"/><path d="M82.5,-26.2 q7,-12 13,-12"/><path d="M97.5,-25 q6,-10 12,-11"/><path d="M112.5,-22 q6,-10 12,-10"/><path d="M127,-17 q5,-9 10,-9"/><path d="M140.5,-10 q5,-7 9,-7"/><path d="M153,-1 q4,-6 8,-6"/>
      </g>
    </g>
    <g id="palm">
      <path d="M0,0 C4,-60 0,-130 -10,-196 C-12,-206 -8,-214 2,-216 C10,-217 16,-212 17,-204 C13,-136 19,-66 16,2 Z" fill="#6B5138"/>
      <g stroke="#55412C" stroke-width="2.5" opacity=".85"><path d="M-1,-26 h15"/><path d="M-3,-54 h16"/><path d="M-5,-82 h16"/><path d="M-6,-110 h16"/><path d="M-8,-138 h15"/><path d="M-9,-166 h14"/><path d="M-10,-190 h13"/></g>
      <g style="color:var(--p1,#2A5C3C)">
        <g class="frond f2"><use href="#pfrond" transform="translate(0,-216) rotate(-78) scale(.72)"/></g>
        <g class="frond"><use href="#pfrond" transform="translate(1,-214) rotate(-44) scale(.95)"/></g>
        <g class="frond f3"><use href="#pfrond" transform="translate(2,-210) rotate(-8)"/></g>
        <g class="frond f2"><use href="#pfrond" transform="translate(2,-206) rotate(30) scale(.88)"/></g>
        <g transform="translate(0,-212) scale(-1,1)">
          <g class="frond"><use href="#pfrond" transform="rotate(-24) scale(.9)"/></g>
          <g class="frond f3"><use href="#pfrond" transform="translate(0,2) rotate(44) scale(.78)"/></g>
        </g>
      </g>
      <g style="color:var(--p2,#3F8A57)">
        <g class="frond f3"><use href="#pfrond" transform="translate(1,-218) rotate(-62) scale(.85)"/></g>
        <g class="frond"><use href="#pfrond" transform="translate(2,-212) rotate(-26) scale(1.02)"/></g>
        <g class="frond f2"><use href="#pfrond" transform="translate(2,-204) rotate(52) scale(.7)"/></g>
        <g transform="translate(0,-214) scale(-1,1)">
          <g class="frond f2"><use href="#pfrond" transform="translate(0,-2) rotate(-58) scale(.8)"/></g>
          <g class="frond"><use href="#pfrond" transform="rotate(-4) scale(.98)"/></g>
          <g class="frond f3"><use href="#pfrond" transform="translate(0,2) rotate(24) scale(.85)"/></g>
        </g>
      </g>
      <circle cx="-7" cy="-206" r="8" fill="#B8945F"/><circle cx="6" cy="-208" r="7" fill="#A8854F"/><circle cx="0" cy="-198" r="7" fill="#B8945F"/>
    </g>
    <g id="areca">
      <g stroke="#A9B264" stroke-width="5" fill="none" stroke-linecap="round">
        <path d="M0,0 C-6,-40 -22,-80 -48,-108"/><path d="M2,0 C0,-46 -6,-92 -20,-128"/><path d="M4,0 C8,-48 10,-96 6,-138"/><path d="M6,0 C16,-44 30,-86 52,-118"/><path d="M8,0 C22,-36 44,-70 74,-92"/>
      </g>
      <g color="#3F8A57">
        <g class="frond f2"><use href="#pfrond" transform="translate(-48,-108) rotate(-34) scale(.42)"/></g>
        <g class="frond"><use href="#pfrond" transform="translate(-48,-108) rotate(-96) scale(.36)"/></g>
        <g class="frond f3"><use href="#pfrond" transform="translate(-20,-128) rotate(-52) scale(.44)"/></g>
        <g class="frond"><use href="#pfrond" transform="translate(-20,-128) rotate(-118) scale(.36)"/></g>
        <g class="frond"><use href="#pfrond" transform="translate(6,-138) rotate(-22) scale(.46)"/></g>
        <g class="frond f2"><use href="#pfrond" transform="translate(6,-138) rotate(-88) scale(.4)"/></g>
        <g class="frond f3"><use href="#pfrond" transform="translate(52,-118) rotate(-8) scale(.44)"/></g>
        <g class="frond"><use href="#pfrond" transform="translate(52,-118) rotate(-62) scale(.36)"/></g>
        <g class="frond f2"><use href="#pfrond" transform="translate(74,-92) rotate(8) scale(.42)"/></g>
      </g>
    </g>
    <g id="monstera">
      <path d="M0,0 C-8,-36 6,-74 40,-88 C82,-104 128,-86 140,-48 C150,-16 132,14 96,24 C60,34 16,28 0,0 Z M34,-58 C30,-44 32,-28 42,-18 M66,-70 C60,-50 62,-28 74,-12 M98,-64 C92,-46 94,-28 104,-16" fill="#2E5C40" stroke="#2E5C40" stroke-width="2"/>
      <path d="M40,-88 C60,-60 78,-28 88,8" fill="none" stroke="#4E8A5A" stroke-width="3" opacity=".8"/>
    </g>
    <g id="tiplant" fill="currentColor">
      <path d="M0,0 C-4,-30 -18,-52 -40,-62 C-16,-58 -4,-34 2,-6 Z"/>
      <path d="M0,0 C0,-36 -6,-64 -18,-84 C2,-66 8,-34 6,-2 Z"/>
      <path d="M2,0 C8,-34 20,-58 40,-70 C22,-52 12,-26 8,0 Z"/>
      <path d="M0,0 C2,-40 10,-72 28,-92 C14,-68 8,-34 6,-2 Z"/>
    </g>
    <g id="brom">
      <g fill="#3F7A4C"><path d="M0,0 L-30,-16 L-8,-4 Z"/><path d="M0,0 L30,-16 L8,-4 Z"/><path d="M0,0 L-24,-30 L-4,-8 Z"/><path d="M0,0 L24,-30 L4,-8 Z"/></g>
      <g fill="#D96A4A"><path d="M0,-2 L-14,-34 L0,-10 Z"/><path d="M0,-2 L14,-34 L2,-10 Z"/><path d="M-1,-2 L0,-40 L1,-2 Z" stroke="#D96A4A" stroke-width="5" stroke-linecap="round"/></g>
      <circle cx="0" cy="-8" r="4" fill="#E8865E"/>
    </g>
    <g id="plum">
      <g fill="#F7F2E4"><ellipse cx="0" cy="-8" rx="5.5" ry="9"/><ellipse cx="0" cy="-8" rx="5.5" ry="9" transform="rotate(72)"/><ellipse cx="0" cy="-8" rx="5.5" ry="9" transform="rotate(144)"/><ellipse cx="0" cy="-8" rx="5.5" ry="9" transform="rotate(216)"/><ellipse cx="0" cy="-8" rx="5.5" ry="9" transform="rotate(288)"/></g>
      <circle cx="0" cy="0" r="3.5" fill="#E3B96A"/>
    </g>
    <g id="hib">
      <g fill="#E2554A"><ellipse cx="0" cy="-10" rx="8" ry="11"/><ellipse cx="0" cy="-10" rx="8" ry="11" transform="rotate(72)"/><ellipse cx="0" cy="-10" rx="8" ry="11" transform="rotate(144)"/><ellipse cx="0" cy="-10" rx="8" ry="11" transform="rotate(216)"/><ellipse cx="0" cy="-10" rx="8" ry="11" transform="rotate(288)"/></g>
      <circle cx="0" cy="0" r="4.5" fill="#C23B33"/>
      <path d="M0,0 L10,-16" stroke="#E3B96A" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="11" cy="-17" r="3" fill="#E3B96A"/>
    </g>
    <g id="vine" stroke="#3F7A4C" fill="#4E8A5A" stroke-linecap="round">
      <path d="M0,0 C8,40 -6,84 6,128 C12,150 8,172 2,192" fill="none" stroke-width="4"/>
      <path d="M2,26 q-16,-2 -18,-16 q14,-2 18,16 Z" stroke="none"/>
      <path d="M0,58 q16,-4 20,-18 q-16,-4 -20,18 Z" stroke="none"/>
      <path d="M4,92 q-16,-2 -18,-16 q14,-2 18,16 Z" stroke="none"/>
      <path d="M6,126 q16,-4 20,-18 q-16,-4 -20,18 Z" stroke="none"/>
      <path d="M4,158 q-15,-2 -17,-15 q13,-2 17,15 Z" stroke="none"/>
      <path d="M2,190 q14,-4 18,-16 q-15,-3 -18,16 Z" stroke="none"/>
    </g>
  </defs>
  <path d="M0,600 q60,-40 130,-24 q50,-34 110,-16 q60,-30 120,-8 q55,-26 115,-6 q60,-22 120,-2 q60,-20 120,0 q60,-18 120,2 q60,-16 120,4 q60,-14 120,6 q60,-12 120,8 q55,-10 105,10 q50,-8 100,12 L1600,660 L0,668 Z" fill="#9CC4AE" opacity=".6"/>
  <g style="--p1:#7FAE93;--p2:#93BFA6" opacity=".75">
    <use href="#palm" transform="translate(390,640) scale(.55)"/>
    <use href="#palm" transform="translate(1330,632) scale(.6) scale(-1,1)"/>
  </g>
  <path d="M0,650 L1600,642 L1600,900 L0,900 Z" fill="url(#lawnG)"/>
  <g transform="translate(690,0)">
    <path d="M50,668 L50,528 L470,528 L470,668 Z" fill="url(#wallG)"/>
    <path d="M14,536 L260,442 L506,536 Z" fill="url(#roofG2)"/>
    <path d="M14,536 L260,442 L506,536" fill="none" stroke="#6E8489" stroke-width="3"/>
    <path d="M34,576 L486,576 L468,604 L52,604 Z" fill="#C9BCA0"/>
    <rect x="74" y="604" width="9" height="64" fill="#A08B66"/><rect x="206" y="604" width="9" height="64" fill="#A08B66"/><rect x="436" y="604" width="9" height="64" fill="#A08B66"/>
    <path d="M62,640 h396" stroke="#A08B66" stroke-width="5"/>
    <rect x="300" y="604" width="50" height="64" rx="3" fill="#6B4A33"/>
    <g class="winGlow"><rect x="108" y="612" width="58" height="42" rx="3" fill="url(#winG)"/><rect x="372" y="612" width="44" height="42" rx="3" fill="url(#winG)" opacity=".9"/></g>
    <rect x="108" y="612" width="58" height="42" rx="3" fill="none" stroke="#8A7457" stroke-width="3"/>
    <path d="M137,612 v42 M108,633 h58" stroke="#8A7457" stroke-width="2.5"/>
    <rect x="372" y="612" width="44" height="42" rx="3" fill="none" stroke="#8A7457" stroke-width="3"/>
    <g><circle cx="240" cy="636" r="5" fill="#C74E76"/><circle cx="250" cy="630" r="4" fill="#D96A94"/><circle cx="232" cy="628" r="4" fill="#D96A94"/><circle cx="262" cy="636" r="5" fill="#C74E76"/><circle cx="270" cy="629" r="4" fill="#B84E9A"/></g>
  </g>
  <g transform="translate(1180,0)">
    <ellipse cx="-34" cy="668" rx="42" ry="22" fill="#4A443C"/><ellipse cx="-52" cy="656" rx="24" ry="14" fill="#3A352E"/>
    <ellipse cx="96" cy="666" rx="40" ry="20" fill="#4A443C"/><ellipse cx="112" cy="654" rx="22" ry="13" fill="#3A352E"/>
    <path d="M-6,664 L-6,600 Q32,576 70,600 L70,664 Z" fill="#8A5A33"/>
    <g stroke="#6E4626" stroke-width="3"><path d="M8,600 v62 M22,592 v70 M36,589 v73 M50,592 v70 M62,599 v63"/></g>
    <path d="M-6,626 h76" stroke="#6E4626" stroke-width="4"/>
  </g>
  <g style="--p1:#275238;--p2:#37784C"><use href="#palm" transform="translate(150,700) scale(1.5) scale(-1,1)"/></g>
  <g style="--p1:#2E6B45;--p2:#44935C"><use href="#palm" transform="translate(320,668) scale(1.05)"/></g>
  <g style="--p1:#234D32;--p2:#357A48"><use href="#palm" transform="translate(1445,710) scale(1.65)"/></g>
  <g style="--p1:#2E6B45;--p2:#44935C"><use href="#palm" transform="translate(1560,680) scale(1.1) scale(-1,1)"/></g>
  <g style="--p1:#37784C;--p2:#4A9C63"><use href="#palm" transform="translate(620,650) scale(.6)"/></g>
  <use href="#areca" transform="translate(1120,690) scale(1.15)"/>
  <use href="#areca" transform="translate(520,700) scale(1.0) scale(-1,1)"/>
  <path d="M0,700 q50,-52 120,-34 q56,-40 124,-16 q60,-30 118,-4 L370,760 L0,772 Z" fill="#3F7A4C"/>
  <g fill="#C74E76"><circle cx="66" cy="668" r="13"/><circle cx="96" cy="652" r="11"/><circle cx="126" cy="666" r="14"/><circle cx="156" cy="650" r="10"/><circle cx="186" cy="662" r="13"/><circle cx="84" cy="686" r="10"/><circle cx="150" cy="682" r="11"/></g>
  <g fill="#DE6A92"><circle cx="110" cy="662" r="7"/><circle cx="170" cy="654" r="6"/><circle cx="78" cy="656" r="6"/><circle cx="196" cy="676" r="7"/></g>
  <path d="M840,706 q46,-40 104,-22 q50,-30 106,-8 q44,-22 90,2 L1130,760 L840,764 Z" fill="#417A4E"/>
  <use href="#hib" transform="translate(900,676) scale(1.15)"/>
  <use href="#hib" transform="translate(972,662) scale(.95) rotate(14)"/>
  <use href="#hib" transform="translate(1044,678) scale(1.05) rotate(-10)"/>
  <path d="M1310,712 q40,-36 92,-20 q44,-24 92,-2 L1490,762 L1310,766 Z" fill="#4E8A5A"/>
  <use href="#plum" transform="translate(1352,678) scale(1.2)"/>
  <use href="#plum" transform="translate(1394,664) scale(1.05)"/>
  <use href="#plum" transform="translate(1436,682) scale(1.25)"/>
  <use href="#plum" transform="translate(1374,700) scale(.95)"/>
  <g fill="#C9B896" stroke="#A6947242" stroke-width="2">
    <ellipse cx="1222" cy="688" rx="26" ry="9"/><ellipse cx="1204" cy="712" rx="32" ry="11"/><ellipse cx="1226" cy="742" rx="38" ry="13"/><ellipse cx="1206" cy="778" rx="46" ry="16"/><ellipse cx="1232" cy="822" rx="54" ry="19"/><ellipse cx="1208" cy="872" rx="64" ry="22"/>
  </g>
  <g>
    <ellipse cx="60" cy="800" rx="72" ry="40" fill="#3A352E"/><ellipse cx="170" cy="812" rx="80" ry="44" fill="#443E35"/><ellipse cx="290" cy="806" rx="70" ry="38" fill="#38332C"/><ellipse cx="120" cy="772" rx="54" ry="28" fill="#4A443C"/><ellipse cx="238" cy="770" rx="50" ry="26" fill="#403A32"/>
    <g fill="#4E8A5A" opacity=".85"><ellipse cx="96" cy="762" rx="20" ry="8"/><ellipse cx="212" cy="758" rx="24" ry="9"/><ellipse cx="150" cy="792" rx="18" ry="7"/><ellipse cx="288" cy="784" rx="20" ry="8"/></g>
    <use href="#brom" transform="translate(120,756) scale(1.5)"/>
    <use href="#brom" transform="translate(236,752) scale(1.3) scale(-1,1)"/>
    <use href="#brom" transform="translate(304,772) scale(1.15)"/>
    <g stroke="#5FA06B" stroke-width="3" fill="none"><path d="M180,760 q10,-26 30,-34"/></g>
    <g fill="#DE6A92"><circle cx="206" cy="722" r="5"/><circle cx="214" cy="712" r="4.5"/><circle cx="220" cy="722" r="4"/></g>
  </g>
  <g color="#7A3B4A"><use href="#tiplant" transform="translate(430,742) scale(1.5)"/></g>
  <g color="#8A4656"><use href="#tiplant" transform="translate(1092,748) scale(1.35) scale(-1,1)"/></g>
  <g color="#417A4E"><use href="#tiplant" transform="translate(56,746) scale(1.3) scale(-1,1)"/></g>
  <use href="#monstera" transform="translate(-36,906) scale(2.0)"/>
  <use href="#monstera" transform="translate(112,916) scale(1.45) scale(-1,1)"/>
  <use href="#areca" transform="translate(60,912) scale(1.5)"/>
  <use href="#monstera" transform="translate(1630,908) scale(2.2) scale(-1,1)"/>
  <use href="#monstera" transform="translate(1498,918) scale(1.5)"/>
  <use href="#areca" transform="translate(1560,915) scale(1.6) scale(-1,1)"/>
  <g color="#6E3644"><use href="#tiplant" transform="translate(238,908) scale(2.2)"/></g>
  <g color="#7A3B4A"><use href="#tiplant" transform="translate(1392,910) scale(2.3) scale(-1,1)"/></g>
  <use href="#hib" transform="translate(212,846) scale(1.35) rotate(-8)"/>
  <use href="#hib" transform="translate(1418,852) scale(1.3) rotate(10)"/>
  <use href="#plum" transform="translate(292,868) scale(1.3)"/>
  <use href="#plum" transform="translate(1338,872) scale(1.2)"/>
  <g stroke="#2E5C3C" stroke-width="4" stroke-linecap="round" fill="none">
    <path d="M420,842 l-6,-20 M430,842 l0,-24 M440,842 l6,-19"/>
    <path d="M760,850 l-5,-18 M769,850 l1,-22 M778,850 l6,-16"/>
    <path d="M1000,846 l-6,-19 M1010,846 l0,-23 M1020,846 l6,-17"/>
  </g>
  <g stroke="#4A6B78" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M1210,180 q10,-10 20,0 q10,-10 20,0"/><path d="M1290,150 q8,-8 16,0 q8,-8 16,0"/><path d="M1130,220 q7,-7 14,0 q7,-7 14,0"/>
  </g>
  <use href="#vine" transform="translate(120,-6) scale(1.15)"/>
  <use href="#vine" transform="translate(196,-6) scale(.85) scale(-1,1)"/>
  <use href="#vine" transform="translate(1440,-6) scale(1.3) scale(-1,1)"/>
  <use href="#vine" transform="translate(1368,-6) scale(.9)"/>
</svg>`

const BOX_BACK_SVG = `<svg class="layer mbx-back" viewBox="0 0 460 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A4A6B"/><stop offset=".28" stop-color="#2A3750"/><stop offset=".62" stop-color="#1D2739"/><stop offset="1" stop-color="#151D2B"/></linearGradient>
    <linearGradient id="postG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A3A28"/><stop offset=".5" stop-color="#6B563B"/><stop offset="1" stop-color="#3A2E20"/></linearGradient>
    <radialGradient id="inGlow" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#C9A36B" stop-opacity=".5"/><stop offset=".45" stop-color="#A37C4F" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse cx="230" cy="566" rx="180" ry="22" fill="#16281C" opacity=".55"/>
  <rect x="208" y="404" width="44" height="158" rx="6" fill="url(#postG)"/>
  <rect x="208" y="404" width="44" height="158" rx="6" fill="none" stroke="#0F141D" stroke-width="2" opacity=".5"/>
  <path d="M216,412 v142 M236,410 v144" stroke="#2A2418" stroke-width="2" opacity=".6"/>
  <rect x="164" y="388" width="132" height="16" rx="4" fill="#54452F"/>
  <rect x="164" y="388" width="132" height="16" rx="4" fill="none" stroke="#0F141D" stroke-width="1.5" opacity=".4"/>
  <path d="M204,404 L176,452 M256,404 L284,452" stroke="#4A3A28" stroke-width="10" stroke-linecap="round"/>
  <path d="M212,556 C248,530 212,502 246,476 C214,452 244,428 216,406" fill="none" stroke="#4E8A5A" stroke-width="3.5" stroke-linecap="round"/>
  <g fill="#5FA06B"><ellipse cx="240" cy="520" rx="7" ry="4" transform="rotate(-24 240 520)"/><ellipse cx="222" cy="466" rx="7" ry="4" transform="rotate(20 222 466)"/><ellipse cx="236" cy="418" rx="6" ry="3.5" transform="rotate(-18 236 418)"/></g>
  <g style="color:#4E8A5A">
    <g class="frond f2"><use href="#pfrond" transform="translate(196,560) rotate(-118) scale(.34)"/></g>
    <g class="frond"><use href="#pfrond" transform="translate(192,562) rotate(-146) scale(.3)"/></g>
    <g class="frond f3"><use href="#pfrond" transform="translate(262,562) rotate(-38) scale(.33)"/></g>
    <g class="frond"><use href="#pfrond" transform="translate(266,564) rotate(-66) scale(.28)"/></g>
  </g>
  <use href="#brom" transform="translate(176,562) scale(1.7)"/>
  <use href="#hib" transform="translate(152,536) scale(1.25) rotate(-10)"/>
  <use href="#plum" transform="translate(298,540) scale(1.45)"/>
  <use href="#plum" transform="translate(318,556) scale(1.15)"/>
  <g stroke="#3F7A4C" stroke-width="4" stroke-linecap="round" fill="none"><path d="M168,566 l-6,-18 M178,568 l-1,-22 M298,566 l6,-16 M308,568 l2,-20"/></g>
  <path d="M85,215 C85,132 150,88 230,88 C310,88 375,132 375,215 L375,376 C375,384 369,390 361,390 L99,390 C91,390 85,384 85,376 Z" fill="url(#bodyG)"/>
  <path d="M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z" fill="#080C13"/>
  <path d="M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z" fill="url(#inGlow)" id="inGlowP" opacity="0"/>
</svg>`

const DOOR_SVG = `<svg viewBox="0 0 264 276" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="doorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#33425F"/><stop offset=".5" stop-color="#26334B"/><stop offset="1" stop-color="#1A2333"/></linearGradient>
  </defs>
  <path d="M4,272 L4,120 C4,46 60,6 132,6 C204,6 260,46 260,120 L260,272 Z" fill="url(#doorG)" stroke="#C9A36B" stroke-width="3.5"/>
  <g id="doorFace">
    <path d="M22,272 L22,126 C22,60 72,24 132,24 C192,24 242,60 242,126 L242,272 Z" fill="none" stroke="rgba(201,163,107,.45)" stroke-width="1.6"/>
    <circle cx="132" cy="82" r="13" fill="#C9A36B"/>
    <circle cx="132" cy="82" r="13" fill="none" stroke="#8F6C42" stroke-width="2.5"/>
    <rect x="47" y="138" width="170" height="30" rx="7" fill="rgba(20,28,40,.85)" stroke="rgba(201,163,107,.7)" stroke-width="1.5"/>
    <text x="132" y="159" text-anchor="middle" font-weight="700" font-size="13" letter-spacing="2.4" fill="#C9A36B">LOCAL RESIDENT</text>
    <rect x="102" y="214" width="60" height="10" rx="5" fill="rgba(201,163,107,.55)"/>
  </g>
</svg>`

const BOX_FRONT_SVG = `<svg class="layer mbx-front" viewBox="0 0 460 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rimG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43547A"/><stop offset=".3" stop-color="#33425F"/><stop offset=".7" stop-color="#232F45"/><stop offset="1" stop-color="#182031"/></linearGradient>
  </defs>
  <path fill-rule="evenodd" clip-rule="evenodd" fill="url(#rimG)" stroke="#C9A36B" stroke-width="3.5" d="M85,215 C85,132 150,88 230,88 C310,88 375,132 375,215 L375,376 C375,384 369,390 361,390 L99,390 C91,390 85,384 85,376 Z M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z"/>
  <path d="M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z" fill="none" stroke="rgba(201,163,107,.8)" stroke-width="2"/>
  <path d="M110,120 C142,100 186,92 230,92" stroke="rgba(245,244,239,.35)" stroke-width="5" stroke-linecap="round" opacity=".8"/>
  <g id="mmFlag" transform="rotate(112 374 214)">
    <rect x="368" y="118" width="11" height="98" rx="5.5" fill="#C9A36B"/>
    <path d="M379,118 L424,130 L379,150 Z" fill="#C9A36B"/>
    <circle cx="374" cy="214" r="10" fill="#8F6C42" stroke="#C9A36B" stroke-width="2.5"/>
  </g>
</svg>`

const CARD_HTML = `<span class="m-pill">FALL · NORTH SHORE</span>
<div class="m-grid">
  <div class="m-row">
    <div class="m-slot"><small>A</small><svg viewBox="0 0 24 24"><path d="M7 3v7c0 1 .8 2 2 2s2-1 2-2V3M9 12v9M16 3c-1.5 1.5-2 3.5-2 5.5 0 2 .8 3 2 3s2-1 2-3c0-2-.5-4-2-5.5ZM16 11.5V21"/></svg><b>Restaurant</b><em>FREE Appetizer<br>with any 2 entr&eacute;es</em></div>
    <div class="m-slot"><small>B</small><svg viewBox="0 0 24 24"><path d="M4 9h13v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17M7 5.5c.8-1 .8-2 0-3M11 5.5c.8-1 .8-2 0-3"/></svg><b>Caf&eacute; &amp; Coffee</b><em>Buy One Get One<br>FREE any drink</em></div>
    <div class="m-slot"><small>C</small><svg viewBox="0 0 24 24"><path d="M8 11 10 3h4l2 8M6.5 11h11l-1 4.5a3 3 0 0 1-3 2.5h-3a3 3 0 0 1-3-2.5ZM9 18v3h6v-3M10 7h4"/></svg><b>Sweets &amp; Treats</b><em>$5 OFF<br>any $20 order</em></div>
    <div class="m-slot"><small>D</small><svg viewBox="0 0 24 24"><path d="M12 4c1.8 1.6 2.8 3.6 2.8 5.6 0 2.4-1.2 4-2.8 4s-2.8-1.6-2.8-4c0-2 1-4 2.8-5.6ZM4 13c2.2.4 4 1.8 5 3.8M20 13c-2.2.4-4 1.8-5 3.8M7 20c3.2-1.4 6.8-1.4 10 0"/></svg><b>Spa &amp; Wellness</b><em>$20 OFF<br>first massage</em></div>
  </div>
  <div class="m-mid">
    <div class="m-logo"><img src="/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png" alt="Island Mailer"></div>
    <div class="m-aloha"><b>ALOHA<br>LOCAL RESIDENT</b></div>
    <div class="m-postage"><b>POSTAGE</b></div>
  </div>
  <div class="m-row">
    <div class="m-slot"><small>E</small><svg viewBox="0 0 24 24"><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="17.5" r="2.5"/><path d="M8.6 8.2 20 19M8.6 15.8 20 5M12.5 12.1l2 1.9"/></svg><b>Salon &amp; Beauty</b><em>20% OFF<br>first visit</em></div>
    <div class="m-slot"><small>F</small><svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12a1.8 1.8 0 0 1-1.8 1.6H8a1.8 1.8 0 0 1-1.8-1.6ZM8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/></svg><b>Shop &amp; Boutique</b><em>15% OFF<br>storewide</em></div>
    <div class="m-slot"><small>G</small><svg viewBox="0 0 24 24"><path d="M3 11 12 4l9 7M6 9.5V20h12V9.5M10 20v-6h4v6"/></svg><b>Home Services</b><em>FREE estimate<br>+ $50 OFF</em></div>
    <div class="m-slot"><small>H</small><svg viewBox="0 0 24 24"><path d="M12 3v2M12 5c-4.5 0-8 3-8.5 7.5 2.8-1.8 5.8-1.8 8.5 0 2.7-1.8 5.7-1.8 8.5 0C20 8 16.5 5 12 5ZM12 12v7a2 2 0 0 1-4 0"/></svg><b>Activities &amp; Fun</b><em>Kama&#699;&#257;ina<br>25% OFF</em></div>
  </div>
</div>`

const COPY_HTML = `<span class="im-pill">Maui Local Offers &middot; Free To Your Mailbox</span>
<h1>The best of Maui, <em>delivered to your mailbox.</em></h1>
<p class="mm-lead">Seasonal mailers featuring trusted local businesses and real offers for Maui households. No apps. No accounts. Just neighbors supporting neighbors.</p>
<div class="mm-benefits">
  <span><svg viewBox="0 0 24 24"><path d="M4 10c0-3 2.5-5 6-5h4c3.5 0 6 2 6 5v8H4ZM4 18h16M8 21v-3M16 21v-3M20 8l1.5-.5"/></svg>Know when it lands in your area</span>
  <span><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>Outside the zone? Get the email edition</span>
  <span><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.3.8-4.6 4.3 1.2 6.1L12 16.9 6.4 19.8l1.2-6.1L3 9.4l6.3-.8Z"/></svg>Subscriber-only extra offers</span>
</div>
<div class="mm-ctas">
  <a class="btn" href="#offers">Get the Offers</a>
  <a class="btn ghost" href="#inside">See What's Inside</a>
</div>`

const PETAL_SVG = `<svg viewBox="-14 -14 28 28"><g fill="#F7F2E4"><ellipse cx="0" cy="-6" rx="4" ry="7"/><ellipse cx="0" cy="-6" rx="4" ry="7" transform="rotate(72)"/><ellipse cx="0" cy="-6" rx="4" ry="7" transform="rotate(144)"/><ellipse cx="0" cy="-6" rx="4" ry="7" transform="rotate(216)"/><ellipse cx="0" cy="-6" rx="4" ry="7" transform="rotate(288)"/></g><circle r="2.6" fill="#E3B96A"/></svg>`

const BFLY_SVG = `<svg viewBox="-14 -12 28 24"><g fill="#D9863C" stroke="#5A3A1E" stroke-width="1.4"><path d="M-1,0 C-5,-9 -13,-11 -13,-4 C-13,1 -6,3 -1,2 Z"/><path d="M1,0 C5,-9 13,-11 13,-4 C13,1 6,3 1,2 Z"/><path d="M-1,2 C-4,7 -10,9 -10,4 C-10,1 -4,2 -1,3 Z"/><path d="M1,2 C4,7 10,9 10,4 C10,1 4,2 1,3 Z"/></g><ellipse cx="0" cy="0" rx="1.6" ry="5" fill="#3A2A18"/></svg>`

function clamp(v: number, a: number, b: number) { return v < a ? a : v > b ? b : v }
function easeFn(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export default function MailboxMoment() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const $ = (id: string) => root.querySelector<HTMLElement>("#" + id)
    const stage = $("mmStage"), box = $("mmBox"), door = $("mmDoor"), sky = $("mmSky"),
      hood = $("mmHood"), chip = $("mmChip"), cue = $("mmCue"), copy = $("mmCopy"), mailer = $("mmMailer")
    const flag = root.querySelector<SVGGElement>("#mmFlag")
    const glow = root.querySelector<SVGElement>("#inGlowP")
    const doorFace = root.querySelector<SVGGElement>("#doorFace")
    if (!stage || !box || !door || !sky || !hood || !chip || !cue || !copy || !mailer || !flag || !glow || !doorFace) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seg = (p: number, a: number, b: number) => easeFn(clamp((p - a) / (b - a), 0, 1))

    let vw = 0, vh = 0, S0 = 0, S1 = 0, S2 = 0, S3 = 0, dockX = 0, dockY = 0, mobile = false
    function measure() {
      vw = window.innerWidth; vh = window.innerHeight
      mobile = vw <= 980
      const boxW = box!.getBoundingClientRect().width || 1
      const holeW = boxW * (260 / 460)
      S1 = holeW / 560
      S0 = S1 * 0.44
      const fullW = Math.min(0.9 * vw, vh * 0.84 * (12 / 9))
      S2 = fullW / 560
      const dockW = mobile ? Math.min(0.62 * vw, 330) : Math.min(0.44 * vw, 560)
      S3 = dockW / 560
      dockX = mobile ? 0 : 0.235 * vw
      dockY = mobile ? -0.2 * vh : 0.015 * vh
    }

    const T = { door: [0.03, 0.15], flag: [0.05, 0.17], em: [0.16, 0.5], gr: [0.5, 0.78], push: [0.55, 0.85], dk: [0.8, 0.95], cp: [0.845, 0.97] }

    function paint() {
      const r = stage!.getBoundingClientRect()
      const total = r.height - vh
      let p = total > 0 ? clamp(-r.top / total, 0, 1) : 1
      if (reduce) p = 1

      const d = seg(p, T.door[0], T.door[1])
      door!.style.transform = "rotateX(" + -104 * d + "deg)"
      door!.style.filter = "brightness(" + (1 - 0.42 * d) + ")"
      doorFace!.setAttribute("opacity", (1 - clamp((d - 0.72) / 0.18, 0, 1)).toFixed(3))
      const f = seg(p, T.flag[0], T.flag[1])
      flag!.setAttribute("transform", "rotate(" + (112 - 112 * f) + " 374 214)")
      glow!.setAttribute("opacity", (0.9 * d).toFixed(3))

      const em = seg(p, T.em[0], T.em[1]), gr = seg(p, T.gr[0], T.gr[1]), dk = seg(p, T.dk[0], T.dk[1])
      let s = S0
      if (p >= T.dk[0]) s = lerp(S2, S3, dk)
      else if (p >= T.gr[0]) s = lerp(S1, S2, gr)
      else s = lerp(S0, S1, em)
      const x = lerp(0, dockX, dk)
      let y = lerp(0.012 * vh, 0.06 * vh, em)
      y = lerp(y, dockY, dk)
      let rot = lerp(0, -3.2, em)
      rot = lerp(rot, 0, gr)
      rot = lerp(rot, mobile ? 0 : -3.5, dk)
      mailer!.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + rot + "deg) scale(" + s + ")"
      mailer!.style.opacity = String(seg(p, 0.07, 0.17))
      mailer!.style.filter = "brightness(" + lerp(0.62, 1, Math.max(em, d * 0.4)) + ")"
      mailer!.classList.toggle("front", p >= 0.48)
      mailer!.classList.toggle("docked", p >= 0.985)

      const push = seg(p, T.push[0], T.push[1])
      box!.style.transform = "translate(-50%,-40%) translateY(" + 14 * push + "vh) scale(" + (1 + 0.62 * push) + ")"
      box!.style.filter = "blur(" + 10 * push + "px)"
      box!.style.opacity = String(1 - push)
      sky!.style.opacity = String(1 - 0.62 * push)
      hood!.style.transform = "translateY(" + 6 * push + "vh) scale(" + (1 + 0.1 * push) + ")"
      hood!.style.filter = "blur(" + 5 * push + "px)"

      chip!.style.opacity = String(1 - seg(p, 0.42, 0.55))
      chip!.style.transform = "translateX(-50%) translateY(" + -30 * seg(p, 0.42, 0.55) + "px)"
      cue!.style.opacity = String(1 - seg(p, 0, 0.06))
      const cp = seg(p, T.cp[0], T.cp[1])
      copy!.style.opacity = String(cp)
      copy!.style.transform = mobile
        ? "translate(-50%," + (30 - 30 * cp) + "px)"
        : "translateY(-46%) translateX(" + (-40 + 40 * cp) + "px)"
    }

    measure()
    const onResize = () => { measure(); paint() }
    window.addEventListener("resize", onResize)

    /* QA: jump to a scrub position with ?p=0..1 */
    const devP = new URLSearchParams(location.search).get("p")
    if (devP) setTimeout(() => { window.scrollTo(0, parseFloat(devP) * (stage!.offsetHeight - vh)); paint() }, 400)

    let ticking = false
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { paint(); ticking = false }) }
    }

    if (reduce) {
      root.classList.add("mm-static")
      measure(); paint()
    } else {
      window.addEventListener("scroll", onScroll, { passive: true })
      paint()
    }
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div ref={rootRef}>
      <div className="mm-stage" id="mmStage">
        <div className="mm-sticky">
          <div className="mm-sky" id="mmSky">
            <div className="mm-rays" />
            <div className="mm-sun" />
            <div className="mm-hood" id="mmHood" dangerouslySetInnerHTML={{ __html: HOOD_SVG }} />
            <span className="mote" style={{ left: "10%", animationDuration: "17s" }} />
            <span className="mote" style={{ left: "30%", animationDuration: "22s", animationDelay: "4s" }} />
            <span className="mote" style={{ left: "55%", animationDuration: "19s", animationDelay: "8s" }} />
            <span className="mote" style={{ left: "78%", animationDuration: "21s", animationDelay: "2s" }} />
            <span className="mote" style={{ left: "92%", animationDuration: "18s", animationDelay: "6s" }} />
            <span className="petal" style={{ left: "24%", animationDuration: "19s" }} dangerouslySetInnerHTML={{ __html: PETAL_SVG }} />
            <span className="petal" style={{ left: "64%", animationDuration: "24s", animationDelay: "7s" }} dangerouslySetInnerHTML={{ __html: PETAL_SVG }} />
            <span className="petal" style={{ left: "86%", animationDuration: "21s", animationDelay: "12s" }} dangerouslySetInnerHTML={{ __html: PETAL_SVG }} />
            <span className="bfly" style={{ left: "14%", top: "56%" }} dangerouslySetInnerHTML={{ __html: BFLY_SVG }} />
          </div>

          <div className="mm-box" id="mmBox">
            <div dangerouslySetInnerHTML={{ __html: BOX_BACK_SVG }} />
            <div className="mm-doorWrap"><div className="mm-door" id="mmDoor" dangerouslySetInnerHTML={{ __html: DOOR_SVG }} /></div>
            <div dangerouslySetInnerHTML={{ __html: BOX_FRONT_SVG }} />
          </div>

          <div className="mm-mailer" id="mmMailer"><div className="m-float">
            <div className="m-face" dangerouslySetInnerHTML={{ __html: CARD_HTML }} />
          </div></div>

          <div className="mm-chip" id="mmChip">FALL LOCAL DEALS — COMING SOON</div>
          <div className="mm-cue" id="mmCue">
            <span>Scroll</span>
            <svg viewBox="0 0 24 24"><path d="M12 4v14M6 13l6 6 6-6" /></svg>
          </div>

          <div className="mm-copy" id="mmCopy" dangerouslySetInnerHTML={{ __html: COPY_HTML }} />

          <div className="mm-grain" />
          <div className="mm-vig" />
        </div>
      </div>
    </div>
  )
}
