"use client"

import { useState } from "react"

export default function AreaLeadForm({ area, areaLabel }: { area: string; areaLabel: string }) {
  const [hp, setHp] = useState("")
  const [form, setForm] = useState({ name: "", businessName: "", email: "", phone: "", notes: "" })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState<{ name: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, areas: [area], im_hp: hp }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setDone({ name: form.name })
      } else {
        setError(json.error || "Something went wrong. Please call or text us instead.")
      }
    } catch {
      setError("Something went wrong. Please call or text us instead.")
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="form-card" style={{ textAlign: "center" }}>
        <h3 style={{ color: "var(--cream)", fontSize: "var(--h3)" }}>Mahalo, {done.name}! 🤙🏾</h3>
        <p style={{ color: "var(--sand)", marginTop: "var(--gap-xs)", fontSize: "var(--text)", lineHeight: 1.6 }}>
          Your inquiry for {areaLabel} is in. We&apos;ll check availability for your industry and area and get right back
          to you. A confirmation email is on its way.
        </p>
        <p style={{ color: "var(--sand)", marginTop: "var(--gap-xs)", fontSize: "var(--text)" }}>
          Want to talk story sooner? Call or text{" "}
          <a href="tel:8088086245" style={{ color: "var(--gold-bright)", fontWeight: 800, textDecoration: "none" }}>
            (808) 808-6245
          </a>
        </p>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={submit}>
        {/* Honeypot — invisible to humans; bots fill it and get silently rejected */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="im_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
      <p className="price-head" style={{ marginBottom: "var(--gap-s)" }}>
        Check availability for {areaLabel}
      </p>
      <div className="fgroup">
        <label>Name</label>
        <input value={form.name} onChange={set("name")} required autoComplete="name" />
      </div>
      <div className="fgroup">
        <label>Business Name</label>
        <input value={form.businessName} onChange={set("businessName")} required autoComplete="organization" />
      </div>
      <div className="fgroup">
        <label>Email</label>
        <input type="email" value={form.email} onChange={set("email")} required autoComplete="email" />
      </div>
      <div className="fgroup">
        <label>Phone (optional)</label>
        <input type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
      </div>
      <div className="fgroup">
        <label>Anything else? (optional)</label>
        <textarea
          value={form.notes}
          onChange={set("notes")}
          placeholder="Your industry, goals, or which mailer you're interested in..."
        />
      </div>
      {error && (
        <p style={{ color: "#e9a", marginBottom: "var(--gap-xs)", fontSize: "calc(var(--text) * 0.9)" }}>{error}</p>
      )}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Check Availability"}
      </button>
    </form>
  )
}
