"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

/* A nomination the visitor has staged before sending. */
interface Nomination {
  businessName: string
  note: string
}

interface Suggestion {
  placeId: string
  primary: string
  secondary: string
  description: string
}

/* Live Hawaii business autocomplete via our server proxy (/api/places),
   which calls Google Places Autocomplete (New) with the key kept server-side.
   If GOOGLE_MAPS_API_KEY is not set, the proxy returns configured:false and the
   field gracefully behaves as a plain free-text input that still submits. */

export default function NominateForm() {
  const [businessName, setBusinessName] = useState("")
  const [note, setNote] = useState("")
  const [email, setEmail] = useState("")

  /* staged (added but not yet submitted) nominations */
  const [staged, setStaged] = useState<Nomination[]>([])

  /* autocomplete */
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [placesConfigured, setPlacesConfigured] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [doneCount, setDoneCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const acRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (acRef.current && !acRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("click", onDoc)
    return () => document.removeEventListener("click", onDoc)
  }, [])

  /* debounced fetch to the Places proxy */
  useEffect(() => {
    const q = businessName.trim()
    if (q.length < 2) {
      setSuggestions([])
      return
    }
    const ctrl = new AbortController()
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        const data = await res.json()
        setPlacesConfigured(data.configured !== false)
        setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : [])
      } catch {
        /* network/abort — quietly fall back to free text */
      }
    }, 220)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [businessName])

  const q = businessName.trim()

  const postOne = async (n: Nomination) => {
    const res = await fetch("/api/nominate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessName: n.businessName, note: n.note, email }),
    })
    const result = await res.json()
    if (!(res.ok && result.success)) {
      throw new Error(result.error || "Something went wrong. Please try again.")
    }
  }

  const addToList = () => {
    const name = businessName.trim()
    if (!name) {
      setError("Please tell us the business name.")
      return
    }
    setStaged((s) => [...s, { businessName: name, note: note.trim() }])
    setBusinessName("")
    setNote("")
    setSuggestions([])
    setOpen(false)
    setError(null)
  }

  const removeStaged = (i: number) => setStaged((s) => s.filter((_, idx) => idx !== i))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    /* gather everything: anything staged + whatever's currently typed */
    const all: Nomination[] = [...staged]
    const typed = businessName.trim()
    if (typed) all.push({ businessName: typed, note: note.trim() })

    if (all.length === 0) {
      setError("Please tell us at least one business name.")
      return
    }

    setIsLoading(true)
    try {
      for (const n of all) {
        await postOne(n)
      }
      setDoneCount(all.length)
      setStaged([])
      setBusinessName("")
      setNote("")
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't connect. Please try again.")
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
        <p className="optin-done-h">Mahalo for the nomination{doneCount > 1 ? "s" : ""}! 🌺</p>
        <p className="optin-done-p">
          We&apos;ll reach out and try to bring your favorite{doneCount > 1 ? "s" : ""} onto a future mailer.
        </p>
        <button
          type="button"
          className="btn ghost nom-again"
          onClick={() => {
            setDone(false)
            setDoneCount(0)
          }}
        >
          ＋ Nominate another business
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {staged.length > 0 && (
        <ul className="nom-staged" aria-label="Businesses you've added">
          {staged.map((n, i) => (
            <li key={`${n.businessName}-${i}`} className="nom-chip">
              <span className="nom-chip-name">
                <span className="pin" aria-hidden>
                  📍
                </span>
                {n.businessName}
              </span>
              <button
                type="button"
                className="nom-chip-x"
                aria-label={`Remove ${n.businessName}`}
                onClick={() => removeStaged(i)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

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
        {open && q.length >= 2 && (suggestions.length > 0 || q) && (
          <div className="acmenu open">
            {suggestions.map((sug) => (
              <div
                key={sug.placeId}
                className="acitem"
                onClick={() => {
                  setBusinessName(sug.primary || sug.description)
                  setSuggestions([])
                  setOpen(false)
                }}
              >
                <span className="pin" aria-hidden>
                  📍
                </span>
                <span>
                  {sug.primary || sug.description}
                  {sug.secondary && <span className="sub"> · {sug.secondary}</span>}
                </span>
              </div>
            ))}
            <div
              className="acitem add"
              onClick={() => {
                setSuggestions([])
                setOpen(false)
              }}
            >
              ＋ Use &quot;{q}&quot;
            </div>
          </div>
        )}
      </div>
      <p className="ac-powered">
        {placesConfigured ? "Local business search by Google · or type any business name" : "Type any business name"}
      </p>

      <label htmlFor="nom-note">What do you love about them? What offer would you want? (optional)</label>
      <textarea
        id="nom-note"
        placeholder="Their garlic shrimp is unreal — would love a local's discount!"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="button" className="nom-add-btn" onClick={addToList}>
        ＋ Add another business
      </button>

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
        {isLoading
          ? "Submitting…"
          : staged.length > 0
            ? `Submit ${staged.length + (businessName.trim() ? 1 : 0)} Local Favorites`
            : "Submit a Local Favorite"}
      </button>
    </form>
  )
}
