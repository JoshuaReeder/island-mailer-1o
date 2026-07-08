"use client"

/*
 * LatestDrop (v24) — the interactive digital lookbook on the homepage.
 * Mirrors the REAL print card: Side One = 4 slots / logo+address+postage band /
 * 4 slots (A–H). Side Two = I–P with a slim QR strip. 3D pointer tilt,
 * scroll-driven entrance, and a Y-flip when switching sides.
 * Offers below are GENERIC SAMPLES (no business names) until the real
 * August lineup locks — swap via lib/offers-data when ready (doc 07).
 */
import { useEffect, useRef, useState } from "react"
import CategoryIcon from "@/components/icons"

interface Slot { letter: string; cat: string; offer: string; your?: boolean }

const SIDE_ONE: Slot[] = [
  { letter: "A", cat: "Restaurant", offer: "Buy one entrée, get one 50% off" },
  { letter: "B", cat: "Café & Coffee", offer: "Free pastry with any large coffee" },
  { letter: "C", cat: "Sweets & Treats", offer: "Buy-one-get-one shave ice" },
  { letter: "D", cat: "Spa & Wellness", offer: "$25 off your first massage" },
  { letter: "E", cat: "Salon & Beauty", offer: "20% off your first visit" },
  { letter: "F", cat: "Shop & Boutique", offer: "15% off any one item" },
  { letter: "G", cat: "Home Services", offer: "$75 off any service call" },
  { letter: "H", cat: "Activities & Fun", offer: "Keiki free with paying adult" },
]
const SIDE_TWO: Slot[] = [
  { letter: "I", cat: "Fitness", offer: "First week free" },
  { letter: "J", cat: "Bakery", offer: "Free coffee with any dozen" },
  { letter: "K", cat: "Auto", offer: "Free car wash with any service" },
  { letter: "L", cat: "Pet", offer: "Free nail trim with grooming" },
  { letter: "M", cat: "Health", offer: "New-patient special" },
  { letter: "N", cat: "Happy Hour", offer: "2-for-1 pau hana pupus" },
  { letter: "O", cat: "Home Services", offer: "Free estimate + 10% off" },
  { letter: "P", cat: "Your Business", offer: "This spot could be yours", your: true },
]

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

  const slots = side === 1 ? SIDE_ONE : SIDE_TWO
  const top = slots.slice(0, 4)
  const bottom = slots.slice(4)

  const renderSlot = (s: Slot) => (
    <a
      className={`ld-slot${s.your ? " your" : ""}`}
      key={s.letter}
      href={s.your ? "/advertise" : "/local-offers"}
      aria-label={s.your ? "Get your business featured" : `${s.cat}: ${s.offer}`}
    >
      <span className="ld-lt">{s.letter}</span>
      <CategoryIcon name={s.your ? "offer" : s.cat} size={30} />
      <span className="ld-cat">{s.cat}</span>
      <span className="ld-offer">{s.offer}</span>
    </a>
  )

  return (
    <section className="shimmer" id="latest-drop">
      <div className="container">
        <div className="sec-divider">◆</div>
        <h2 className="reveal">The Latest Drop</h2>
        <p className="lead reveal">
          One beautiful card. Sixteen local businesses. Yours to browse the moment it lands — in the mailbox and right
          here. The August issue is taking shape now.
        </p>

        <div className="ld-issuebar reveal">
          <span className="ld-ichip now">📬 August Issue · North Shore — reserving now</span>
          <span className="ld-ichip dim">September · up next</span>
        </div>

        <div className="ld-tabs reveal">
          <button className={`ld-tab${side === 1 ? " on" : ""}`} onClick={() => switchSide(1)}>Side One · A–H</button>
          <button className={`ld-tab${side === 2 ? " on" : ""}`} onClick={() => switchSide(2)}>Side Two · I–P</button>
        </div>

        <div className="ld-stage reveal" ref={stageRef}>
          <div className="ld-card" ref={cardRef}>
            <div className="ld-row">{top.map(renderSlot)}</div>
            {side === 1 ? (
              <div className="ld-mid">
                <img src="/images/horizontal-20im-20logo.svg" alt="Island Mailer — Support Local. Live Hawaii." className="ld-midlogo" />
                <div className="ld-addr">
                  <span className="ld-bx">Aloha<br />Local Resident</span>
                  <span className="ld-bx">Postage</span>
                </div>
              </div>
            ) : (
              <div className="ld-mid slim">
                <span className="ld-qrhint">⿻ One QR — every offer, saved right on your phone</span>
                <span className="ld-tag">Support Local. Live Hawaii.</span>
              </div>
            )}
            <div className="ld-row">{bottom.map(renderSlot)}</div>
          </div>
        </div>

        <p className="ld-fine reveal">Sample offers shown — the August lineup is being reserved now.</p>

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
