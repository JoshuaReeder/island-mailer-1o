"use client"

import type React from "react"
import { useState } from "react"

/*
 * PricingReveal (v18) — gated ad-space pricing with commitment tiers.
 *
 * The REAL pricing table renders blurred behind an email gate. On submit the
 * blur dissolves and the pricing appears right where they're looking (and the
 * full rate card is emailed via /api/pricing). Rate numbers stay out of all
 * public page copy / metadata / SEO text.
 *
 * Commitment tiers (Joshua's incentive plan, July 2026):
 *   Signature 9×12 (up to 10,000 homes):  1 mailer $800 · 3–5 $600/ea · 6+ $500/ea
 *   Hyper-Local 6.5×12 (~2,500 homes):    1 mailer $250 · 3–5 $220/ea · 6+ $180/ea
 *   (commitments within a 12-month window)
 */

interface Tier {
  label: string
  sub: string
  sig: string
  hl: string
  flag?: boolean
}

const TIERS: Tier[] = [
  { label: "1 mailer", sub: "try it out", sig: "$800", hl: "$250" },
  { label: "3–5 mailers", sub: "where offers start to compound", sig: "$600", hl: "$220", flag: true },
  { label: "6+ mailers", sub: "own your category all year", sig: "$500", hl: "$180" },
]

interface PricingRevealProps {
  source?: string
}

export default function PricingReveal({ source = "pricing-interest" }: PricingRevealProps) {
  const [email, setEmail] = useState("")
  const [hp, setHp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [dissolving, setDissolving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) {
      setError("Please enter your email.")
      return
    }
    setIsLoading(true)
    // Reveal immediately — dissolve animation, don't make them wait on the network.
    setDissolving(true)
    setTimeout(() => setRevealed(true), 650)
    try {
      await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, im_hp: hp }),
      })
    } catch {
      /* non-blocking — pricing is already revealed */
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pricing-reveal pr-wide">
      <p className="pr-eyebrow">Current ad-space pricing</p>
      <h3>{revealed ? "Today's rates for a featured spot" : "Your current pricing is right here"}</h3>
      <p className="pr-sub">
        {revealed ? (
          <>
            Per ad space, per mailing &mdash; design, print &amp; postage all included. One business per category:{" "}
            <b style={{ color: "var(--gold-bright)" }}>your spot is exclusive, no competitors</b>.
          </>
        ) : (
          <>Enter your email and the rates below unlock instantly &mdash; we&apos;ll send the full rate card too.</>
        )}
      </p>

      {/* ── the real table, blurred until revealed ── */}
      <div className={`pr-gate${revealed ? " open" : ""}${dissolving ? " dissolving" : ""}`}>
        <div className="pr-tiers" aria-hidden={!revealed}>
          <div className="pr-tier-head">
            <span className="pr-th-cell" />
            <span className="pr-th-cell pr-th-sig">
              Signature<em>9&Prime; × 12&Prime; · up to 10,000 homes</em>
            </span>
            <span className="pr-th-cell">
              Hyper-Local<em>6.5&Prime; × 12&Prime; · ~2,500 homes</em>
            </span>
          </div>
          {TIERS.map((t) => (
            <div className={`pr-tier${t.flag ? " flag" : ""}`} key={t.label}>
              {t.flag && <span className="pr-badge">Most popular</span>}
              <span className="pr-t-label">
                {t.label}
                <em>{t.sub}</em>
              </span>
              <span className="pr-t-price pr-t-sig">
                {t.sig}
                <em>per mailing</em>
              </span>
              <span className="pr-t-price">
                {t.hl}
                <em>per mailing</em>
              </span>
            </div>
          ))}
          <p className="pr-tier-note">
            Commit to 3+ mailings (within 12 months) and the rate drops on every single one. Repetition is where
            direct mail wins &mdash; by the third mailer, your business and offer are familiar faces in the household.
            No long-term contracts beyond your committed mailings.
          </p>
        </div>

        {/* ── email gate overlay ── */}
        {!revealed && (
          <div className="pr-gate-overlay" role="dialog" aria-label="Enter your email to see pricing">
            <form className="pr-gate-card" onSubmit={handleSubmit}>
        {/* Honeypot — invisible to humans; bots fill it and get silently rejected */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="im_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
              <span className="gate-pill">Ad-Space Pricing</span>
              <h4>See it appear right here</h4>
              <p>One email &mdash; the blur dissolves and your rates are on screen.</p>
              <div className="pr-gate-row">
                <input
                  type="email"
                  required
                  aria-label="Your email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <button className="btn" type="submit" disabled={isLoading}>
                  {isLoading ? "One sec…" : "Reveal Current Pricing"}
                </button>
              </div>
              {error && (
                <p className="pr-err" role="alert">
                  {error}
                </p>
              )}
              <p className="pr-fine">No spam &mdash; just your rate card and the occasional availability heads-up.</p>
            </form>
          </div>
        )}
      </div>

      {revealed && (
        <>
          <p className="pr-emailed">&#128231; We&apos;ve also emailed you the current rate card.</p>
          <div className="pr-cta">
            <a className="btn" href="#contact">Check Availability for Your Category</a>
          </div>
        </>
      )}
    </div>
  )
}
