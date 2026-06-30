"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

/* Sample Hawaii businesses (mirrors the v5 mockup). Real Google Places
   Autocomplete is a production follow-up — see TODO below. */
const SAMPLE: { n: string; a: string }[] = [
  { n: "Ululani's Hawaiian Shave Ice", a: "Maui" },
  { n: "Tin Roof Maui", a: "Kahului, Maui" },
  { n: "Pā'ia Bay Coffee", a: "Pā'ia, Maui" },
  { n: "Leoda's Kitchen & Pie Shop", a: "Lahaina, Maui" },
  { n: "Komoda Store & Bakery", a: "Makawao, Maui" },
  { n: "Sam Sato's", a: "Wailuku, Maui" },
  { n: "Maui Brewing Co.", a: "Kihei, Maui" },
  { n: "Tasaka Guri Guri", a: "Kahului, Maui" },
  { n: "Coffee Works", a: "Kapaa, Kauai" },
  { n: "Leonard's Bakery", a: "Honolulu, Oahu" },
  { n: "Helena's Hawaiian Food", a: "Honolulu, Oahu" },
  { n: "Big Island Brewhaus", a: "Waimea, Big Island" },
]

/* TODO (production): swap this sample typeahead for the real Google Places
   Autocomplete API. Requires NEXT_PUBLIC_GOOGLE_MAPS_API_KEY and the Places
   library; bias results to Hawaii (components=country:us + lat/lng bounds). */

export default function NominateForm() {
  const [businessName, setBusinessName] = useState("")
  const [note, setNote] = useState("")
  const [email, setEmail] = useState("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const acRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (acRef.current && !acRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", onDoc)
    return () => document.removeEventListener("click", onDoc)
  }, [])

  const q = businessName.trim().toLowerCase()
  const matches = q
    ? SAMPLE.filter((b) => b.n.toLowerCase().includes(q) || b.a.toLowerCase().includes(q)).slice(0, 5)
    : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!businessName.trim()) {
      setError("Please tell us the business name.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/nominate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName: businessName.trim(), note, email }),
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
        <span className="optin-check" aria-hidden>
          ✓
        </span>
        <p className="optin-done-h">Mahalo for the nomination! 🌺</p>
        <p className="optin-done-p">
          We&apos;ll reach out and try to bring your favorite onto a future mailer.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nom-biz">Local business you&apos;d love to see featured</label>
      <div className="ac" ref={acRef}>
        <input
          id="nom-biz"
          type="text"
          autoComplete="off"
          placeholder="Start typing a local business…"
          value={businessName}
          onChange={(e) => {
            setBusinessName(e.target.value)
            setOpen(true)
          }}
          onFocus={() => businessName && setOpen(true)}
        />
        {open && q && (
          <div className="acmenu open">
            {matches.map((b) => (
              <div
                key={b.n}
                className="acitem"
                onClick={() => {
                  setBusinessName(b.n)
                  setOpen(false)
                }}
              >
                <span className="pin" aria-hidden>
                  📍
                </span>
                <span>
                  {b.n} <span className="sub">· {b.a}</span>
                </span>
              </div>
            ))}
            <div
              className="acitem add"
              onClick={() => {
                setBusinessName(businessName.trim())
                setOpen(false)
              }}
            >
              ＋ Add &quot;{businessName.trim()}&quot; (not listed)
            </div>
          </div>
        )}
      </div>
      <p className="ac-powered">Search powered by Google Places · or type any business name</p>

      <label htmlFor="nom-note">What do you love about them? What offer would you want? (optional)</label>
      <textarea
        id="nom-note"
        placeholder="Their garlic shrimp is unreal — would love a local's discount!"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <label htmlFor="nom-email">Your email (optional — so we can tell you if they join)</label>
      <input
        id="nom-email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />

      {error && (
        <p className="optin-err" role="alert">
          {error}
        </p>
      )}
      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Submitting…" : "Submit a Local Favorite"}
      </button>
    </form>
  )
}
