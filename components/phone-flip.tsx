"use client"

export default function PhoneFlip() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&display=swap');
        .im-phone { font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: clamp(32px, 8vw, 52px); font-weight: 800; color: #F5F4EF; display: inline-flex; align-items: center; gap: 1px; line-height: 1; letter-spacing: -0.02em; text-decoration: none; }
        .im-phone:hover { opacity: 0.85; }
        .im-prefix { color: #D5C1AA; margin-right: 0.05em; font-variant-numeric: tabular-nums; }
        .im-fw { display: inline-block; height: 1.25em; line-height: 1.25em; overflow: hidden; vertical-align: bottom; }
        .im-fc { display: flex; flex-direction: column; animation: imFlipLoop 6s cubic-bezier(0.85, 0, 0.15, 1) infinite; }
        .im-fc span { display: block; height: 1.25em; text-align: center; font-variant-numeric: tabular-nums; color: #F5F4EF; }
        .im-fc span.im-gold { color: #A37C4F; }
        .im-d1 { animation-delay: 0.00s; }
        .im-d2 { animation-delay: 0.12s; }
        .im-d3 { animation-delay: 0.24s; }
        .im-d4 { animation-delay: 0.36s; }
        @keyframes imFlipLoop {
          0%, 35%, 100% { transform: translateY(0); }
          45%, 90% { transform: translateY(-1.25em); }
        }
      `}</style>

      <div className="flex flex-col items-center gap-2">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#A37C4F", fontFamily: "'Montserrat', sans-serif" }}>
          Call or Text
        </p>

        <a href="tel:8088086245" className="im-phone">
          <span className="im-prefix">808-808-</span>
          <div className="im-fw"><div className="im-fc im-d1"><span>6</span><span className="im-gold">M</span></div></div>
          <div className="im-fw"><div className="im-fc im-d2"><span>2</span><span className="im-gold">A</span></div></div>
          <div className="im-fw"><div className="im-fc im-d3"><span>4</span><span className="im-gold">I</span></div></div>
          <div className="im-fw"><div className="im-fc im-d4"><span>5</span><span className="im-gold">L</span></div></div>
        </a>

        <p className="text-xs tracking-wide" style={{ color: "rgba(213,193,170,0.45)", fontFamily: "'Montserrat', sans-serif" }}>
          808-808-6245
        </p>
      </div>
    </>
  )
}
