"use client"

import type React from "react"
import { useState } from "react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

interface EmailOptinProps {
  source?: string
  /** "panel" = the big card opt-in (default); "footer" = compact inline row */
  variant?: "panel" | "footer"
}

export default function EmailOptin({ source = "home", variant = "panel" }: EmailOptinProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [zip, setZip] = useState("")
  const [hp, setHp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email) {
      setError("Please enter your email.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, zip, source, im_hp: hp }),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        // Fire GA4 form_submit event on successful waitlist signup
        try {
          window.gtag?.("event", "form_submit", {
            form_id: "waitlist",
            form_name: "Email Waitlist",
            source: source,
          })
        } catch {
          /* noop */
        }
        setDone(true)
        setEmail("")
        setName("")
        setZip("")
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Couldn't connect. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (done) {
    return (
      <div className={`optin-done${variant === "footer" ? " footer" : ""}`} role="status">
        <span className="optin-check" aria-hidden>
          ✓
        </span>
        <p className="optin-done-h">You&apos;re on the list — mahalo!</p>
        <p className="optin-done-p">We&apos;ll let you know the moment the next mailer drops in your area.</p>
      </div>
    )
  }

  return (
    <form className={`optin-form${variant === "footer" ? " footer" : ""}`} onSubmit={handleSubmit}>
        {/* Honeypot — invisible to humans; bots fill it and get silently rejected */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="im_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
      {variant === "panel" && (
        <input
          type="text"
          aria-label="Your name (optional)"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      )}
      <input
        type="email"
        required
        aria-label="Your email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        className="optin-zip"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={5}
        aria-label="Home ZIP code (optional)"
        placeholder="ZIP (optional)"
        title="Optional - so we can tell you when a mailer drops in YOUR area"
        value={zip}
        onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ""))}
        autoComplete="postal-code"
      />
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Joining…" : "Join the List"}
      </button>
      {error && (
        <p className="optin-err" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
