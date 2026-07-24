"use client"

import { useRef } from "react"
import PhonePill from "@/components/phone-pill"

/*
 * v32 — "Golden Hour Drop" hero for /advertise.
 * The REAL 9×12 fall card (Side One artwork) floats in 3D — cursor parallax,
 * float loop and glint sweep preserved from the approved v27 hero.
 * Fall-series positioning (approved): "Now Reserving: Fall Mailers —
 * September, October & November."
 */

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
          <p
            style={{
              color: "var(--gold-bright)",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Now Reserving: Fall Mailers — September, October &amp; November
          </p>
          <h1>
            Your business, in <em>every mailbox</em> that matters.
          </h1>
          <p className="adv2-lead">
            One giant, beautiful card shared by the best local businesses — delivered to the neighborhoods you choose.
            One business per category. We handle everything. Reserve the fall series and stay in local mailboxes all
            season — your spot stays exclusively yours across all three mailers.
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
          <div className="adv2-card" ref={cardRef} style={{ overflow: "visible" }}>
            <img
              src="/images/mailer/side-one-fall.webp"
              alt="Island Mailer 9×12 fall card — Side One with 8 featured local offers"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 14,
                boxShadow: "0 40px 100px rgba(0,0,0,.55), 0 0 60px rgba(163,124,79,.18)",
              }}
            />
            <span className="adv2-chip">NOW RESERVING · FALL MAILERS</span>
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
