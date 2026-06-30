"use client"

import { useState } from "react"

export default function NotifyForm() {
  const [form, setForm] = useState({ name: "", email: "" })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          island: "Maui",
          area: "Local Offers — resident notify",
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) setDone(true)
      else setError(json.error || "Something went wrong. Please try again.")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="form-card" style={{ textAlign: "center" }}>
        <h3 style={{ color: "var(--cream)", fontSize: "var(--h3)" }}>You&apos;re on the list! 🤙🏾</h3>
        <p style={{ color: "var(--sand)", marginTop: "var(--gap-xs)", fontSize: "var(--text)", lineHeight: 1.6 }}>
          We&apos;ll email you the moment Local Offers go live for your area — starting with the July mailer.
        </p>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="fgroup">
        <label>Name</label>
        <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required autoComplete="name" />
      </div>
      <div className="fgroup">
        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required autoComplete="email" />
      </div>
      {error && <p style={{ color: "#e9a", marginBottom: "var(--gap-xs)", fontSize: "calc(var(--text) * 0.9)" }}>{error}</p>}
      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Notify Me When Offers Drop"}
      </button>
    </form>
  )
}
