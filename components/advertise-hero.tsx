"use client"

import { useRef } from "react"
import PhonePill from "@/components/phone-pill"
import { CategoryIcon } from "@/components/icons"

/*
 * v27 — "Golden Hour Drop" hero for /advertise (Joshua-approved mockup v27.1).
 * Pure CSS cinema: aurora dusk, drifting gold motes, and the TRUE 12×9
 * Side One template floating in 3D — real middle band (logo + ALOHA LOCAL
 * RESIDENT + POSTAGE), A–H category slots with gold line icons, light-glint
 * sweep, slots lighting up one by one, cursor parallax on desktop.
 * No stock photos, no fake claims — the product is the hero.
 */

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

const TOP = [
  { l: "A", n: "Restaurant" },
  { l: "B", n: "Café & Coffee" },
  { l: "C", n: "Sweets & Treats" },
  { l: "D", n: "Spa & Wellness" },
]
const BOTTOM = [
  { l: "E", n: "Salon & Beauty" },
  { l: "F", n: "Shop & Boutique" },
  { l: "G", n: "Home Services" },
  { l: "H", n: "Activities & Fun" },
]

export default function AdvertiseHero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent) => {
    const hero = heroRef.current
    const card = cardRef.current
    if (!hero || !card || e.pointerType !== "mouse") return
    const r = hero.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    card.style.transform = `rotateX(${8 - py * 10}deg) rotateY(${-13 + px * 12}deg)`
    card.style.animation = "none"
  }
  const onLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = ""
    card.style.animation = ""
  }

  return (
    <div className="adv2-hero" id="top" ref={heroRef} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="adv2-grain" aria-hidden="true" />
      <span className="adv2-mote" style={{ left: "8%", animationDuration: "16s" }} />
      <span className="adv2-mote" style={{ left: "22%", animationDuration: "21s", animationDelay: "3s" }} />
      <span className="adv2-mote" style={{ left: "37%", animationDuration: "18s", animationDelay: "7s" }} />
      <span className="adv2-mote" style={{ left: "58%", animationDuration: "23s", animationDelay: "2s" }} />
      <span className="adv2-mote" style={{ left: "72%", animationDuration: "17s", animationDelay: "9s" }} />
      <span className="adv2-mote" style={{ left: "88%", animationDuration: "20s", animationDelay: "5s" }} />

      <div className="adv2-wrap">
        <div className="adv2-copy">
          <div className="adv2-logo">
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." />
          </div>
          <h1>
            Your business, in <em>every mailbox</em> that matters.
          </h1>
          <p className="adv2-lead">
            One giant, beautiful card shared by the best local businesses — delivered to the neighborhoods you choose.
            One business per category. We handle everything.
          </p>
          <div className="adv2-ctas">
            <a className="btn" href="#contact">
              Reserve Your Spot
            </a>
            <a className="btn ghost" href="/local-offers">
              See the Virtual Mailer
            </a>
          </div>
          <div className="adv-hero-phone">
            <PhonePill />
            <span className="adv-phone-note">Call or text — talk story with us first.</span>
          </div>
        </div>

        <div className="adv2-stage">
          <div className="adv2-card" ref={cardRef}>
            <span className="adv2-chip">AUGUST · RESERVING NOW</span>
            <div className="adv2-row">
              {TOP.map((s, i) => (
                <div key={s.l} className={`adv2-slot${i !== 2 ? " lit" : ""}`} style={{ animationDelay: `${i * 1.4}s` }}>
                  <span className="ltr">{s.l}</span>
                  <CategoryIcon name={s.n} size={16} />
                  <span className="nm">{s.n}</span>
                </div>
              ))}
            </div>
            <div className="adv2-mid">
              <img src={LOGO} alt="" aria-hidden="true" />
              <div className="boxes">
                <span className="addr">
                  ALOHA
                  <br />
                  LOCAL RESIDENT
                </span>
                <span className="post">POSTAGE</span>
              </div>
            </div>
            <div className="adv2-row">
              {BOTTOM.map((s, i) => (
                <div key={s.l} className={`adv2-slot${i % 2 === 1 ? " lit" : ""}`} style={{ animationDelay: `${4.2 + i * 1.4}s` }}>
                  <span className="ltr">{s.l}</span>
                  <CategoryIcon name={s.n} size={16} />
                  <span className="nm">{s.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="adv2-stats container">
        <div className="stat">
          <b>16 premium ad spaces</b>
          <span>(8 per side)</span>
        </div>
        <div className="stat">
          <b>Up to 10,000 local homes</b>
          <span>per mailing</span>
        </div>
        <div className="stat">
          <b>One local business</b>
          <span>per industry</span>
        </div>
        <div className="stat">
          <b>Design, printing &amp; postage</b>
          <span>all included</span>
        </div>
      </div>
      <p className="adv2-micro">No long-term contracts. First-come, first-served by industry.</p>
    </div>
  )
}
