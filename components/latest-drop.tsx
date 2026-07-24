"use client"

/*
 * LatestDrop (v32) — the interactive lookbook on the homepage, now showing the
 * REAL 9×12 fall card artwork (Side One / Side Two images). Keeps the 3D
 * pointer tilt, scroll-driven entrance, and the Y-flip when switching sides.
 * Fall-series framing; sample offers shown until the real lineup locks (doc 07).
 */
import { useEffect, useRef, useState } from "react"

const SIDES = {
  1: { src: "/images/mailer/side-one-fall.webp", alt: "Island Mailer 9×12 fall card — Side One with 8 featured local offers" },
  2: { src: "/images/mailer/side-two-fall.webp", alt: "Island Mailer 9×12 fall card — Side Two with 8 more featured local offers" },
} as const

export default function LatestDrop() {
  const [side, setSide] = useState<1 | 2>(1)
  const [flipping, setFlipping] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const hoveringRef = useRef(false)

  const switchSide = (n: 1 | 2) => {
    if (n === side || flipping) return
    setFlipping(true)
    const c = cardRef.current
    if (c) {
      c.style.transition = "transform .5s ease"
      c.style.transform = "rotateY(88deg)"
      setTimeout(() => {
        setSide(n)
        c.style.transform = "rotateY(0deg)"
        setTimeout(() => {
          c.style.transition = "transform .12s linear"
          setFlipping(false)
        }, 520)
      }, 260)
    } else {
      setSide(n)
      setFlipping(false)
    }
  }

  /* 3D pointer tilt + scroll entrance */
  useEffect(() => {
    const card = cardRef.current
    const stage = stageRef.current
    if (!card || !stage) return
    const move = (e: PointerEvent) => {
      hoveringRef.current = true
      const r = card.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      card.style.transform = `rotateY(${px * 9}deg) rotateX(${-py * 7}deg) translateZ(6px)`
    }
    const leave = () => { hoveringRef.current = false; card.style.transform = "" }
    const onScroll = () => {
      if (hoveringRef.current || flipping) return
      const r = card.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.top < vh && r.bottom > 0) {
        const p = Math.min(1, Math.max(0, 1 - (r.top - vh * 0.06) / (vh * 0.62)))
        card.style.transform = `rotateX(${(1 - p) * 15}deg) scale(${0.93 + p * 0.07})`
        card.style.boxShadow = `0 ${50 - p * 18}px 110px rgba(0,0,0,.55), 0 0 ${50 + p * 45}px rgba(163,124,79,${0.1 + p * 0.12})`
      }
    }
    stage.addEventListener("pointermove", move)
    stage.addEventListener("pointerleave", leave)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      stage.removeEventListener("pointermove", move)
      stage.removeEventListener("pointerleave", leave)
      window.removeEventListener("scroll", onScroll)
    }
  }, [flipping])

  return (
    <section className="shimmer" id="latest-drop">
      <div className="container">
        <div className="sec-divider">◆</div>
        <h2 className="reveal">The Latest Drop</h2>
        <p className="lead reveal">
          One beautiful card. Sixteen local businesses. Yours to browse the moment it lands — in the mailbox and right
          here. The fall series is taking shape now.
        </p>

        <div className="ld-issuebar reveal">
          <span className="ld-ichip now">Fall Mailers · North Shore — reserving now</span>
          <span className="ld-ichip dim">September · October · November</span>
        </div>

        <div className="ld-tabs reveal">
          <button className={`ld-tab${side === 1 ? " on" : ""}`} onClick={() => switchSide(1)}>Side One</button>
          <button className={`ld-tab${side === 2 ? " on" : ""}`} onClick={() => switchSide(2)}>Side Two</button>
        </div>

        <div className="ld-stage reveal" ref={stageRef}>
          <div className="ld-card" ref={cardRef} style={{ padding: 0, overflow: "hidden" }}>
            <a href="/local-offers" aria-label="Browse the full issue in Local Offers" style={{ position: "absolute", inset: 0, display: "block" }}>
              <img
                src={SIDES[side].src}
                alt={SIDES[side].alt}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </a>
          </div>
        </div>

        <p className="ld-fine reveal">Sample offers shown — the fall lineup is being reserved now.</p>

        <div className="ld-areas reveal">
          <p>One island, five areas — find yours:</p>
          <div className="ld-archips">
            <a className="ld-achip on" href="/local-offers">North Shore — this issue</a>
            <a className="ld-achip" href="/local-offers">Central</a>
            <a className="ld-achip" href="/local-offers">West Side</a>
            <a className="ld-achip" href="/local-offers">South Side</a>
            <a className="ld-achip" href="/local-offers">Upcountry</a>
          </div>
        </div>

        <div className="ld-ctas reveal">
          <a className="btn" href="/local-offers">Browse the Full Issue →</a>
          <a className="btn ghost" href="#optin">Get it in your mailbox — join the list</a>
        </div>
      </div>
    </section>
  )
}
