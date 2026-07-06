"use client"

import type React from "react"
import { useState } from "react"

export default function AmbassadorForm() {
  const [hp, setHp] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [area, setArea] = useState("")
  const [why, setWhy] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim()) {
      setError("Please add your name and email.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), area, why, im_hp: hp }),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        setDone(true)
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
      <div className="optin-done" role="status">
        <span className="optin-check" aria-hidden>✓</span>
        <p className="optin-done-h">Mahalo for your interest! 🤝</p>
        <p className="optin-done-p">We&apos;ll send more details if it&apos;s a fit.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
        {/* Honeypot — invisible to humans; bots fill it and get silently rejected */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="im_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
      <label htmlFor="amb-name">Your name</label>
      <input
        id="amb-name"
        type="text"
        placeholder="First & last"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />

      <label htmlFor="amb-email">Your email</label>
      <input
        id="amb-email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      <label htmlFor="amb-area">Which island / area?</label>
      <input
        id="amb-area"
        type="text"
        placeholder="e.g. North Shore Maui, Kihei, Hilo…"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />

      <label htmlFor="amb-why">Why you&apos;d be great (optional)</label>
      <textarea
        id="amb-why"
        placeholder="Tell us about your community, who you know, and why you'd love to do this."
        value={why}
        onChange={(e) => setWhy(e.target.value)}
      />

      {error && (
        <p className="optin-err" role="alert">{error}</p>
      )}
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting…" : "I'm Interested"}
      </button>
    </form>
  )
}
