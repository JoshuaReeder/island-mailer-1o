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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        // Reset form on success
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
        setSubmitStatus("error")
        setErrorMessage(result.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      areas: prev.areas.includes(area) ? prev.areas.filter((a) => a !== area) : [...prev.areas, area],
    }))
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
        {submitStatus === "success" ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gold mb-4">Mahalo!</h3>
            <p className="text-xl text-cream mb-2">Your reservation request has been received.</p>
            <p className="text-lg text-sand mb-8">We&apos;ll be in touch within 1-2 business days to confirm your spot.</p>
            <button
              onClick={() => setSubmitStatus("idle")}
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-gold text-gold hover:bg-gold hover:text-navy transition-smooth"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
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
                  <option value="restaurant">Restaurant / Food</option>
                  <option value="wellness">Wellness / Beauty</option>
                  <option value="trades">Trades / Services</option>
                  <option value="auto">Auto / Transportation</option>
                  <option value="professional">Professional Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
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
                <option value="one">Just the next one</option>
                <option value="multiple">2-3 in a row</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gold mb-4">
                Preferred Areas (select all that apply)
              </label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Central", "Upcountry", "South", "West", "North Shore"].map((area) => (
                  <label key={area} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.areas.includes(area)}
                      onChange={() => handleCheckboxChange(area)}
                      className="w-6 h-6 rounded border-2 border-gold/20 bg-navy text-gold focus:ring-4 focus:ring-gold/20"
                    />
                    <span className="text-lg text-sand group-hover:text-gold transition-smooth">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gold mb-3">Anything else we should know? </label>
              <textarea
                rows={5}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gold/20 bg-navy text-cream text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-smooth resize-none"
              />
            </div>

            {submitStatus === "error" && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-center">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-12 py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 min-h-[64px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
              style={{ borderRadius: "48px" }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Check Availability & Reserve My Ad Space"
              )}
            </button>
          </form>
        )}

        <div className="mt-10 pt-10 border-t border-gold/20 text-center space-y-4">
          <p className="text-xl text-gold font-semibold">Prefer to talk story first?</p>
          <p className="text-lg text-sand">
            Call or text us at{" "}
            <a
              href="tel:+18088086245"
              className="text-gold hover:text-gold/80 underline underline-offset-2 transition-smooth"
            >
              (808) 808-6245
            </a>
          </p>
          <p className="text-lg text-sand">
            Email:{" "}
            <a
              href="mailto:aloha@islandmailer.com"
              className="text-gold hover:text-gold/80 underline underline-offset-2 transition-smooth"
            >
              aloha@islandmailer.com
            </a>
          </p>
          <p className="text-base text-sand/80 italic max-w-2xl mx-auto">
            No pressure, no hard sell - just advice on whether Island Mailer is a good fit for you.
          </p>
        </div>
      </div>
    </div>
  )
}
