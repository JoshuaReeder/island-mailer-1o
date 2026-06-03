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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    // Handle form submission
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

          <button
            type="submit"
            className="w-full px-12 py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 min-h-[64px]"
            style={{ borderRadius: "48px" }}
          >
            Check Availability & Reserve My Ad Space
          </button>
        </form>

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
