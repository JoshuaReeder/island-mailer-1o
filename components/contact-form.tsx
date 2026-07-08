"use client"
import type React from "react"
import { useEffect, useState } from "react"

const AREA_OPTIONS = ["Central", "Upcountry", "South", "West", "North Shore"]

export default function ContactForm() {
  const [hp, setHp] = useState("")
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
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [successData, setSuccessData] = useState<{ name: string; businessName: string } | null>(null)

  /* Pre-select a Preferred Area chip when arriving from an area page (?area=North Shore) */
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

  const handleCheckboxChange = (area: string) => {
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
      console.log("[v0] Submitting form data:", formData)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, im_hp: hp }),
      })
      const result = await response.json()
      console.log("[v0] API response:", result)
      if (response.ok && result.success) {
        setSuccessData({ name: formData.name, businessName: formData.businessName })
        setMessage({
          type: "success",
          text: "Thank you! Your application has been submitted. We'll review your information and get back to you soon.",
        })
        // Reset form
        setFormData({
          name: "",
          businessName: "",
          phone: "",
          email: "",
          website: "",
          businessType: "",
          industryCategory: "",
          mailings: "",
          areas: [],
          notes: "",
        })
      } else {
        setMessage({
          type: "error",
          text: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      console.error("[v0] Form submission error:", error)
      setMessage({
        type: "error",
        text: "Failed to submit form. Please check your connection and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <div className="sec-divider">◆</div>
      <h2>Ready to get your business in local mailboxes?</h2>
      <p className="sec-sub">Fill out the form below to reserve your ad space</p>
      <div className="sec-body">
        <div className="form-card">
          {successData ? (
            /* ── Full branded success takeover ── */
            <div className="text-center py-12 px-4">
              {/* Check icon */}
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

              <h2 style={{ margin: "0 0 12px", color: "#D5C1AA", fontSize: 46, fontWeight: 700, lineHeight: 1.15 }}>
                Mahalo, {successData.name}! 🤙🏾
              </h2>
              <p style={{ margin: "0 0 12px", color: "#A37C4F", fontSize: 26, fontWeight: 600 }}>
                {successData.businessName}
              </p>
              <p style={{ margin: "0 0 40px", color: "rgba(213,193,170,0.75)", fontSize: 20, lineHeight: 1.7, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
                Your application is in. We&apos;ll review your info and reach out within 1–2 business days to lock in your spot.
              </p>

              {/* What happens next card */}
              <div
                style={{
                  background: "rgba(15,25,35,0.6)",
                  border: "1px solid rgba(163,124,79,0.25)",
                  borderRadius: 20,
                  padding: "32px 36px",
                  textAlign: "left",
                  maxWidth: 460,
                  margin: "0 auto 36px",
                }}
              >
                <p style={{ margin: "0 0 22px", color: "#A37C4F", fontSize: 14, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  What Happens Next
                </p>
                {[
                  "Our team reviews your application and available ad space in your area",
                  "We reach out to confirm your spot, pricing, and mailing schedule",
                  "We finalize your ad design — then you're in the next Island Mailer!",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, marginBottom: i < 2 ? 22 : 0, alignItems: "flex-start" }}>
                    <span style={{ color: "#A37C4F", fontWeight: 700, fontSize: 22, flexShrink: 0, lineHeight: 1.4 }}>
                      {["①", "②", "③"][i]}
                    </span>
                    <span style={{ color: "rgba(213,193,170,0.85)", fontSize: 19, lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
              </div>

              {/* Contact section */}
              <div style={{ borderTop: "1px solid rgba(163,124,79,0.2)", paddingTop: 32, maxWidth: 460, margin: "0 auto" }}>
                <p style={{ margin: "0 0 20px", color: "rgba(213,193,170,0.5)", fontSize: 18 }}>
                  Questions in the meantime?
                </p>

                {/* Tap-to-call block — full width, easy to tap on mobile */}
                <a
                  href="tel:+18088086245"
                  style={{
                    display: "block",
                    background: "rgba(163,124,79,0.12)",
                    border: "1px solid rgba(163,124,79,0.35)",
                    borderRadius: 16,
                    padding: "18px 24px",
                    textDecoration: "none",
                    marginBottom: 14,
                  }}
                >
                  <span style={{ color: "#A37C4F", fontSize: 28, fontWeight: 700, display: "block", letterSpacing: "0.03em" }}>
                    808-808-6245
                  </span>
                  <span style={{ color: "rgba(163,124,79,0.55)", fontSize: 16, letterSpacing: "0.15em", display: "block", marginTop: 4 }}>
                    808-808-MAIL
                  </span>
                </a>

                {/* Email */}
                <a
                  href="mailto:aloha@islandmailer.com"
                  style={{ color: "#A37C4F", fontSize: 19, textDecoration: "none", display: "block" }}
                >
                  aloha@islandmailer.com
                </a>
              </div>

              {/* Gentle nudge toward the longer details page */}
              <div style={{ marginTop: 36, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
                <p style={{ margin: "0 0 16px", color: "rgba(213,193,170,0.6)", fontSize: 17, lineHeight: 1.6 }}>
                  Want to speed things up? Add a few business details so we can prep your spot faster.
                </p>
                <a className="btn ghost" href="/reserve-details">
                  Add your business details →
                </a>
              </div>
            </div>
          ) : (
            /* ── Normal form view ── */
            <>
              {/* Error message (success banner removed — success now shows the overlay above) */}
              {message?.type === "error" && (
                <div className="mb-8 p-6 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-100">
                  <p className="text-lg font-semibold">{message.text}</p>
                </div>
              )}
              <form onSubmit={handleSubmit}>
        {/* Honeypot — invisible to humans; bots fill it and get silently rejected */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="im_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
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
                  <label>Preferred Areas (select all that apply)</label>
                  <div className="areas">
                    {AREA_OPTIONS.map((area) => (
                      <label key={area} className="area-chip">
                        <input
                          type="checkbox"
                          checked={formData.areas.includes(area)}
                          onChange={() => handleCheckboxChange(area)}
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
                    placeholder="Tell us more about your business, your goals, or anything else we should know..."
                  />
                </div>
                <button className="btn" type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                <p className="form-note">You&apos;ll get a confirmation email right after you submit.</p>
              </form>
            </>
          )}
        </div>
        <div className="talk-story">
          <h3>Prefer to talk story first? Call or text us.</h3>
          <p>
            Call or text us at <a href="tel:8088086245">(808) 808-6245</a>
          </p>
          <p>
            Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a>
          </p>
          <p>No pressure, no hard sell - just advice on whether Island Mailer is a good fit for you.</p>
        </div>
      </div>
    </div>
  )
}
