"use client"

/*
 * PhonePill — compact header pill for the business line.
 * Aug 10: business/advertise pages use the GHL B2B number (808) 707-7393
 * (Jul 29 phone-split ruling: B2C/resident = 808-808-MAIL, B2B = 707-7393).
 * The vanity MAIL flip retired with the number swap.
 */
export default function PhonePill() {
  return (
    <>
      <style>{`
        .im-pillbtn { display:inline-flex; align-items:center; gap:10px; background:rgba(31,39,53,.72); border:1.5px solid var(--gold); border-radius:999px; padding:12px 22px; color:var(--gold-bright); font-weight:800; font-size:17px; letter-spacing:.04em; text-decoration:none; backdrop-filter:blur(8px); box-shadow:0 8px 28px rgba(0,0,0,.35), 0 0 24px rgba(163,124,79,.15); transition:background .3s, box-shadow .3s; line-height:1; }
        .im-pillbtn:hover { background:rgba(163,124,79,.24); box-shadow:0 8px 32px rgba(0,0,0,.4), 0 0 34px rgba(163,124,79,.3); }
        .im-pillbtn svg { width:17px; height:17px; flex:none; }
        .im-pillbtn .pfix { color:var(--cream); font-variant-numeric:tabular-nums; }
        @media (max-width:480px){ .im-pillbtn { font-size:15px; padding:11px 16px; } }
      `}</style>
      <a href="tel:8087077393" className="im-pillbtn" aria-label="Call or text 808-707-7393">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>
        <span className="pfix">(808)&nbsp;707-7393</span>
      </a>
    </>
  )
}
