"use client"

import type React from "react"
import { useState } from "react"

interface FormData {
  name: string
  business: string
  email: string
  location: string
}

interface ChatFormProps {
  onSubmit: (formData: FormData) => void
}

export default function ChatForm({ onSubmit }: ChatFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    business: "",
    email: "",
    location: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.business && formData.email && formData.location) {
      onSubmit(formData)
    }
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-border bg-card text-base outline-none transition-smooth focus:border-gold focus:ring-2 focus:ring-gold/20 min-h-[48px]"

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5 rounded-xl bg-muted animate-scale-in">
      <p className="text-sm font-medium text-navy mb-4">Please fill out your details:</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Business Name</label>
          <input
            type="text"
            name="business"
            value={formData.business}
            onChange={handleChange}
            placeholder="Your business"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Island / Town</label>
          <select name="location" value={formData.location} onChange={handleChange} required className={inputClasses}>
            <option value="">Select location</option>
            <optgroup label="Maui">
              <option value="Wailuku">Wailuku</option>
              <option value="Kahului">Kahului</option>
              <option value="Kihei">Kihei</option>
              <option value="Wailea">Wailea</option>
              <option value="Lahaina">Lahaina</option>
              <option value="Paia">Paia</option>
            </optgroup>
            <optgroup label="Oahu">
              <option value="Honolulu">Honolulu</option>
              <option value="Waikiki">Waikiki</option>
              <option value="Kailua">Kailua</option>
            </optgroup>
            <optgroup label="Hawaii Island">
              <option value="Kona">Kona</option>
              <option value="Hilo">Hilo</option>
            </optgroup>
            <optgroup label="Kauai">
              <option value="Lihue">Lihue</option>
              <option value="Poipu">Poipu</option>
            </optgroup>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl font-semibold text-white bg-gold transition-smooth hover:shadow-lg hover:shadow-gold/30 hover:-translate-y-0.5 active:translate-y-0 min-h-[52px]"
      >
        Submit Quote Request
      </button>
    </form>
  )
}
