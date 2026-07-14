"use client"

/*
 * PhonePill (v24) — compact header pill for the vanity number.
 * Reuses the exact staggered per-character flip from components/phone-flip.tsx
 * (Joshua's locked preference): "(808) 808-" stays fixed, only 6→M, 2→A,
 * 4→I, 5→L flip, one after another. Tap-to-call (and text) on mobile.
 */
export default function PhonePill() {
  return (
    <>
      <style>{`
        .im-pillbtn { display:inline-flex; align-items:center; gap:10px; background:rgba(31,39,53,.72); border:1.5px solid var(--gold); border-radius:999px; padding:12px 22px; color:var(--gold-bright); font-weight:800; font-size:17px; letter-spacing:.04em; text-decoration:none; backdrop-filter:blur(8px); box-shadow:0 8px 28px rgba(0,0,0,.35), 0 0 24px rgba(163,124,79,.15); transition:background .3s, box-shadow .3s; line-height:1; }
        .im-pillbtn:hover { background:rgba(163,124,79,.24); box-shadow:0 8px 32px rgba(0,0,0,.4), 0 0 34px rgba(163,124,79,.3); }
        .im-pillbtn svg { width:17px; height:17px; flex:none; }
        .im-pillbtn .pfix { color:var(--cream); font-variant-numeric:tabular-nums; }
        .im-pillbtn .pnum { display:inline-flex; align-items:center; gap:0; }
        .im-pillbtn .pfw { display:inline-block; height:1.2em; line-height:1.2em; overflow:hidden; vertical-align:bottom; animation-duration:6s; animation-timing-function:cubic-bezier(0.85,0,0.15,1); animation-iteration-count:infinite; }
        .im-pillbtn .pw1 { animation-name:pColM; } .im-pillbtn .pw2 { animation-name:pColA; animation-delay:.12s; }
        .im-pillbtn .pw3 { animation-name:pColI; animation-delay:.24s; } .im-pillbtn .pw4 { animation-name:pColL; animation-delay:.36s; }
        @keyframes pColM { 0%,35% { width:.714em; } 45%,90% { width:.932em; } 100% { width:.714em; } }
        @keyframes pColA { 0%,35% { width:.671em; } 45%,90% { width:.767em; } 100% { width:.671em; } }
        @keyframes pColI { 0%,35% { width:.716em; } 45%,90% { width:.35em; } 100% { width:.716em; } }
        @keyframes pColL { 0%,35% { width:.693em; } 45%,90% { width:.619em; } 100% { width:.693em; } }
        .im-pillbtn .pfc { display:flex; flex-direction:column; animation:imPillFlip 6s cubic-bezier(0.85,0,0.15,1) infinite; }
        .im-pillbtn .pfc span { display:block; height:1.2em; text-align:center; font-variant-numeric:tabular-nums; color:var(--cream); }
        .im-pillbtn .pfc span.g { color:var(--gold-bright); }
        .im-pillbtn .pd1 { animation-delay:0s; } .im-pillbtn .pd2 { animation-delay:.12s; }
        .im-pillbtn .pd3 { animation-delay:.24s; } .im-pillbtn .pd4 { animation-delay:.36s; }
        @keyframes imPillFlip { 0%,35%,100% { transform:translateY(0); } 45%,90% { transform:translateY(-1.2em); } }
        @media (max-width:480px){ .im-pillbtn { font-size:15px; padding:11px 16px; } }
      `}</style>
      <a href="tel:8088086245" className="im-pillbtn" aria-label="Call or text 808-808-6245">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>
        <span className="pnum"><span className="pfix">(808)&nbsp;808-</span><span className="pfw pw1"><span className="pfc pd1"><span>6</span><span className="g">M</span></span></span><span className="pfw pw2"><span className="pfc pd2"><span>2</span><span className="g">A</span></span></span><span className="pfw pw3"><span className="pfc pd3"><span>4</span><span className="g">I</span></span></span><span className="pfw pw4"><span className="pfc pd4"><span>5</span><span className="g">L</span></span></span></span>
      </a>
    </>
  )
}
