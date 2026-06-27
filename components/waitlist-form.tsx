"use client"

import type React from "react"
import { useState } from "react"

const ISLANDS = [
  "Maui",
  "Oʻahu",
  "Hawaiʻi Island (Big Island)",
  "Kauaʻi",
  "Molokaʻi",
  "Lānaʻi",
]

interface WaitlistFormProps {
  defaultIsland?: string
  defaultArea?: string
}

export default function WaitlistForm({ defaultIsland = "", defaultArea = "" }: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    island: defaultIsland,
    area: defaultArea,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "error"; text: string } | null>(null)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (!formData.island) {
      setMessage({ type: "error", text: "Please choose your island." })
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setDone(true)
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong. Please try again." })
      }
    } catch {
      setMessage({
        type: "error",
        text: "Failed to submit. Please check your connection and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (done) {
    return (
      <div className="form-card">
        <div className="text-center py-12 px-4">
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "rgba(163,124,79,0.15)",
              border: "2px solid #A37C4F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 32px",
            }}
          >
            <svg width="44" height="44" fill="none" stroke="#A37C4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ margin: "0 0 16px", color: "#D5C1AA", fontSize: 40, fontWeight: 700, lineHeight: 1.15 }}>
            You&apos;re on the list! 🤙🏾
          </h2>
          <p style={{ margin: "0 auto 8px", color: "rgba(213,193,170,0.78)", fontSize: 20, lineHeight: 1.7, maxWidth: 480 }}>
            We&apos;ll text or email you the moment a mailer is scheduled for your area.
          </p>
          <p style={{ margin: "24px auto 0", color: "rgba(213,193,170,0.5)", fontSize: 17, lineHeight: 1.6, maxWidth: 460 }}>
            Mahalo for helping us decide where Island Mailer launches next.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card">
      {message?.type === "error" && (
        <div className="mb-8 p-6 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-100">
          <p className="text-lg font-semibold">{message.text}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="fgroup">
          <label>Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="fgroup">
          <label>Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="fgroup">
          <label>Phone (optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="fgroup">
          <label>Business Name (optional)</label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>
        <div className="fgroup">
          <label>Which island?</label>
          <div className="areas">
            {ISLANDS.map((isl) => (
              <label key={isl} className="area-chip">
                <input
                  type="radio"
                  name="island"
                  checked={formData.island === isl}
                  onChange={() => setFormData({ ...formData, island: isl })}
                />
                {isl}
              </label>
            ))}
          </div>
        </div>
        <div className="fgroup">
          <label>Area / town (optional)</label>
          <input
            type="text"
            placeholder="e.g., Hāna, Kailua, Hilo, Princeville..."
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
        </div>
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? "Joining..." : "Join the Waitlist"}
        </button>
        <p className="form-note">No spam. We&apos;ll only reach out when a mailer is coming to your area.</p>
      </form>
    </div>
  )
}
