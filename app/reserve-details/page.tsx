"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"

const AREA_OPTIONS = ["Central", "Upcountry", "South", "West", "North Shore"]

export default function ReserveDetailsPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    website: "",
    businessType: "",
    industryCategory: "",
    mailings: "",
    areas: [] as string[],
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "error"; text: string } | null>(null)
  const [done, setDone] = useState<{ businessName: string } | null>(null)

  /* Pre-select a Preferred Area chip when arriving with ?area=North Shore */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const area = params.get("area")
    if (!area) return
    const match = AREA_OPTIONS.find((a) => a.toLowerCase() === area.toLowerCase())
    if (!match) return
    setFormData((prev) =>
      prev.areas.includes(match) ? prev : { ...prev, areas: [...prev.areas, match] },
    )
  }, [])

  const toggleArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.includes(area) ? prev.areas.filter((a) => a !== area) : [...prev.areas, area],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok && result.success) {
        setDone({ businessName: formData.businessName })
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

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      {/* ================= COMPACT HERO (no video) ================= */}
      <div className="hero area">
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · Reserve Your Spot
        </p>
        <div className="area-tag">Almost There</div>
        <h1>Add Your Business Details</h1>
        <p className="hook">
          Already reached out? Mahalo! Drop a few more details here and we&apos;ll have everything we
          need to prep your ad space and get you in the next Island Mailer faster.
        </p>
      </div>

      {/* ================= DETAILS FORM ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Your Business Details</h2>
          <p className="sec-sub">The more we know, the smoother we can lock in your spot.</p>
          <div className="sec-body">
            <div className="form-card">
              {done ? (
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
                  <h2 style={{ margin: "0 0 12px", color: "#D5C1AA", fontSize: 40, fontWeight: 700, lineHeight: 1.15 }}>
                    Mahalo — your details are in! 🤙🏾
                  </h2>
                  <p style={{ margin: "0 0 32px", color: "rgba(213,193,170,0.75)", fontSize: 20, lineHeight: 1.7, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
                    We&apos;ve got everything we need for <strong style={{ color: "#A37C4F" }}>{done.businessName}</strong>. We&apos;ll be in touch within 1–2 business days to confirm your spot.
                  </p>
                  <a className="btn ghost" href="/">
                    Back to Home
                  </a>
                </div>
              ) : (
                <>
                  {message?.type === "error" && (
                    <div className="mb-8 p-6 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-100">
                      <p className="text-lg font-semibold">{message.text}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="fgroup">
                      <label>Business Name</label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      />
                    </div>
                    <div className="fgroup">
                      <label>Email</label>
                      <input
                        type="email"
                        required
                        placeholder="Use the same email you applied with"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="fgroup">
                      <label>Your Name (optional)</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="fgroup">
                      <label>Website / Instagram</label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </div>
                    <div className="fgroup">
                      <label>Business Type</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      >
                        <option value="">Select type...</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Retail">Retail</option>
                        <option value="Service">Service</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Professional">Professional</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="fgroup">
                      <label>Industry Category</label>
                      <input
                        type="text"
                        placeholder="e.g., Coffee Shop, Plumbing, Yoga Studio"
                        value={formData.industryCategory}
                        onChange={(e) => setFormData({ ...formData, industryCategory: e.target.value })}
                      />
                    </div>
                    <div className="fgroup">
                      <label>How many mailings?</label>
                      <select
                        value={formData.mailings}
                        onChange={(e) => setFormData({ ...formData, mailings: e.target.value })}
                      >
                        <option value="">Select option...</option>
                        <option value="Just the next one">Just the next one</option>
                        <option value="2-3 in a row">2-3 in a row</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                    <div className="fgroup">
                      <label>Preferred Areas (select all that apply)</label>
                      <div className="areas">
                        {AREA_OPTIONS.map((area) => (
                          <label key={area} className="area-chip">
                            <input
                              type="checkbox"
                              checked={formData.areas.includes(area)}
                              onChange={() => toggleArea(area)}
                            />
                            {area}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="fgroup">
                      <label>Anything else? (optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={6}
                        placeholder="Your offer, goals, logo/photo notes, or anything else we should know..."
                      />
                    </div>
                    <button className="btn" type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit Details"}
                    </button>
                    <p className="form-note">We&apos;ll match these details to your original inquiry.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
      <FloatingMenu />
    </div>
  )
}
