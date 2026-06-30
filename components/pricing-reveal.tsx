"use client"

import type React from "react"
import { useState } from "react"

/*
 * PricingReveal — gated ad-space pricing.
 *
 * The actual rate numbers live ONLY inside this component and are shown
 * after the visitor submits their email. They are intentionally NOT in any
 * public page copy, metadata, or SEO text. On submit we POST to /api/subscribe
 * with source "pricing-interest" and reveal the rates inline immediately
 * (no waiting). The note tells them we've also emailed the full rate card.
 */

const RATES = [
  {
    name: "Signature Mailer",
    size: "9″ × 12″",
    reach: "Reaches up to 10,000 local homes",
    amount: "$800",
    per: "per ad space, per mailing",
    badge: "Most reach",
    flag: true,
  },
  {
    name: "Hyper-Local Mailer",
    size: "6.5″ × 12″",
    reach: "Reaches ~2,500 nearby homes",
    amount: "$250",
    per: "per ad space, per mailing",
    badge: "",
    flag: false,
  },
]

interface PricingRevealProps {
  source?: string
}

export default function PricingReveal({ source = "pricing-interest" }: PricingRevealProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) {
      setError("Please enter your email.")
      return
    }
    setIsLoading(true)
    // Reveal immediately - don't make them wait on the network.
    setRevealed(true)
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      })
    } catch {
      /* non-blocking - pricing is already revealed */
    } finally {
      setIsLoading(false)
    }
  }

  if (revealed) {
    return (
      <div className="pricing-reveal" role="status">
        <p className="pr-eyebrow">Current ad-space pricing</p>
        <h3>Here&apos;s what a featured spot costs</h3>
        <p className="pr-sub">
          One business per category. Design, print &amp; postage all included &mdash; no long-term contracts.
        </p>
        <div className="pr-rates">
          {RATES.map((r) => (
            <div className={`pr-rate${r.flag ? " flag" : ""}`} key={r.name}>
              {r.badge && <span className="pr-badge">{r.badge}</span>}
              <div className="pr-name">{r.name}</div>
              <div className="pr-size">{r.size}</div>
              <div className="pr-reach">{r.reach}</div>
              <div className="pr-amt">{r.amount}</div>
              <div className="pr-per">{r.per}</div>
            </div>
          ))}
        </div>
        <p className="pr-emailed">&#128231; We&apos;ve also emailed you the full rate card.</p>
        <div className="pr-cta">
          <a className="btn" href="#contact">Check Availability for Your Category</a>
        </div>
      </div>
    )
  }

  return (
    <div className="pricing-reveal">
      <p className="pr-eyebrow">Ad-space pricing</p>
      <h3>See current ad-space pricing</h3>
      <p className="pr-sub">
        Drop your email and we&apos;ll show you both mailer rates right here &mdash; and send the full rate card to your inbox.
      </p>
      <form className="pr-form" onSubmit={handleSubmit}>
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
          {isLoading ? "One sec…" : "Show me the pricing"}
        </button>
        {error && (
          <p className="pr-err" role="alert">
            {error}
          </p>
        )}
      </form>
      <p className="pr-fine">No spam &mdash; just your rate card and the occasional spot-availability heads-up.</p>
    </div>
  )
}
