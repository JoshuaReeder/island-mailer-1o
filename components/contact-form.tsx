"use client"
import type React from "react"
import { useState } from "react"
export default function ContactForm() {
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
        body: JSON.stringify(formData),
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
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-cream mb-6 sm:text-8xl">
          Ready to get your business in local mailboxes?
        </h2>
        <p className="text-xl sm:text-2xl text-sand">Fill out the form below to reserve your ad space</p>
      </div>
      <div className="gradient-navy-warm rounded-3xl p-10 lg:p-12 border-gradient-gold">
        {successData ? (
          /* ── Full branded success takeover ── */
          <div className="text-center py-10 px-4">
            {/* Check icon */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(163,124,79,0.15)",
                border: "2px solid #A37C4F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
              }}
            >
              <svg width="40" height="40" fill="none" stroke="#A37C4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 style={{ margin: "0 0 10px", color: "#D5C1AA", fontSize: 40, fontWeight: 700, lineHeight: 1.2 }}>
              Mahalo, {successData.name}! 🤙🏾
            </h2>
            <p style={{ margin: "0 0 8px", color: "#A37C4F", fontSize: 24, fontWeight: 600 }}>
              {successData.businessName}
            </p>
            <p style={{ margin: "0 0 36px", color: "rgba(213,193,170,0.75)", fontSize: 18, lineHeight: 1.7, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
              Your application is in. We&apos;ll review your info and reach out within 1–2 business days to lock in your spot.
            </p>

            {/* What happens next card */}
            <div
              style={{
                background: "rgba(15,25,35,0.6)",
                border: "1px solid rgba(163,124,79,0.25)",
                borderRadius: 20,
                padding: "28px 32px",
                textAlign: "left",
                maxWidth: 420,
                margin: "0 auto 32px",
              }}
            >
              <p style={{ margin: "0 0 20px", color: "#A37C4F", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                What Happens Next
              </p>
              {[
                "Our team reviews your application and available ad space in your area",
                "We reach out to confirm your spot, pricing, and mailing schedule",
                "We finalize your ad design — then you're in the next Island Mailer!",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 2 ? 18 : 0, alignItems: "flex-start" }}>
                  <span style={{ color: "#A37C4F", fontWeight: 700, fontSize: 20, flexShrink: 0, lineHeight: 1.4 }}>
                    {["①", "②", "③"][i]}
                  </span>
                  <span style={{ color: "rgba(213,193,170,0.85)", fontSize: 17, lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid rgba(163,124,79,0.2)", paddingTop: 24, maxWidth: 420, margin: "0 auto" }}>
              <p style={{ margin: "0 0 6px", color: "rgba(213,193,170,0.5)", fontSize: 16 }}>
                Questions in the meantime?
              </p>
              <p style={{ margin: 0, fontSize: 17 }}>
                <a href="tel:+18088086245" style={{ color: "#A37C4F", textDecoration: "none" }}>
                  (808) 808-6245
                </a>
                <span style={{ color: "rgba(213,193,170,0.3)", margin: "0 10px" }}>·</span>
                <a href="mailto:aloha@islandmailer.com" style={{ color: "#A37C4F", textDecoration: "none" }}>
                  aloha@islandmailer.com
                </a>
              </p>
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
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gold mb-3">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gold mb-3">Business Name</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gold mb-3">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gold mb-3">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gold mb-3">Website / Instagram</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gold mb-3">Business Type</label>
                  <select
                    required
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
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
                <div>
                  <label className="block text-lg font-semibold text-gold mb-3">Industry Category</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Coffee Shop, Plumbing, Yoga Studio"
                    value={formData.industryCategory}
                    onChange={(e) => setFormData({ ...formData, industryCategory: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                  />
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gold mb-3">How many mailings?</label>
                <select
                  required
                  value={formData.mailings}
                  onChange={(e) => setFormData({ ...formData, mailings: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth"
                >
                  <option value="">Select option...</option>
                  <option value="Just the next one">Just the next one</option>
                  <option value="2-3 in a row">2-3 in a row</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gold mb-4">Preferred Areas (select all that apply)</label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["Central", "Upcountry", "South", "West", "North Shore"].map((area) => (
                    <label key={area} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.areas.includes(area)}
                        onChange={() => handleCheckboxChange(area)}
                        className="w-6 h-6 rounded border-2 border-gold/20 bg-navy cursor-pointer accent-gold"
                      />
                      <span className="text-lg text-sand hover:text-gold transition-smooth">{area}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold text-gold mb-3">Anything else we should know?</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth resize-none"
                  rows={6}
                  placeholder="Tell us more about your business, your goals, or anything else we should know..."
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-12 py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed min-h-[64px]"
                style={{ borderRadius: "48px" }}
              >
                {isLoading ? "Submitting..." : "Check Availability & Reserve My Ad Space"}
              </button>
            </form>
            <div className="mt-12 pt-8 border-t border-gold/20">
              <p className="text-center text-sand mb-6">Prefer to talk story first?</p>
              <p className="text-lg text-sand text-center">
                Call or text us at{" "}
                <a
                  href="tel:+18088086245"
                  className="text-gold hover:text-gold/80 underline underline-offset-2 transition-smooth"
                >
                  (808) 808-6245
                </a>
              </p>
              <p className="text-lg text-sand text-center">
                Email:{" "}
                <a
                  href="mailto:aloha@islandmailer.com"
                  className="text-gold hover:text-gold/80 underline underline-offset-2 transition-smooth"
                >
                  aloha@islandmailer.com
                </a>
              </p>
              <p className="text-center text-sand/80 text-sm mt-6">
                No pressure, no hard sell - just advice on whether Island Mailer is a good fit for you.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
