"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Island Mailer?",
    answer:
      "Island Mailer is a local advertising mailer that helps Hawaiʻi businesses get directly in front of nearby residents through a professionally designed 9x12 postcard delivered to homes in selected communities.\nEach mailer features a limited number of local businesses, giving residents an easy way to discover and support trusted businesses in their area.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Island Mailer uses a simple flat-rate price of $800 per ad spot for each mailer campaign.\nThis gives your business exposure to thousands of local households without the cost of mailing your own individual postcard.",
  },
  {
    question: "What is included?",
    answer:
      "Your ad spot includes placement on the Island Mailer postcard, professional ad layout support, print production, and direct-mail delivery to the selected local mailing area.\nWe handle the design, printing, and mailing process so you can focus on running your business.",
  },
  {
    question: "Do you design my ad?",
    answer:
      "Yes. We design your ad so it looks clean, professional, and on-brand.\nYou can provide your logo, photos, offer, contact info, website, social media, or anything else you have for our consideration. We'll help organize it into a strong, simple ad that is clear and easy for residents to respond to.",
  },
  {
    question: "Can I choose my mailing area?",
    answer:
      "In most cases, yes. Island Mailer is organized by local market areas, such as North Shore Maui, Central Maui, West Maui, South Maui, and Upcountry Maui.\nAvailable mailing areas may depend on the current campaign schedule and available routes. We'll help you choose the best fit based on your business, service area, and target customers.",
  },
  {
    question: "What happens if my industry is already taken?",
    answer:
      "Island Mailer limits competing businesses in the same category whenever possible.\nIf your industry is already reserved for a specific mailer, we can place you on the waitlist, offer you a future campaign spot, or help find another available market area that makes sense for your business.",
  },
  {
    question: "How do I reserve a spot?",
    answer:
      "You can reserve a spot by filling out the contact form on our website or contacting us directly.\nOnce we confirm availability, we'll review your business category, mailing area, ad materials, and campaign timing. Your spot is reserved once availability is confirmed and payment is completed.",
  },
  {
    question: "How many homes will receive the mailer?",
    answer:
      "Each campaign is designed to reach thousands of local households within the selected mailing area. Some campaigns may reach up to 10,000 homes depending on the market and mailing route.\nWe'll confirm the estimated household count before each campaign.",
  },
  {
    question: "What kind of businesses are a good fit?",
    answer:
      "Island Mailer is a great fit for local restaurants, cafés, service businesses, contractors, health and wellness providers, retail shops, family services, home services, auto services, and other businesses that want more local visibility.\nThe goal is to help residents discover and support businesses in their own community.",
  },
  {
    question: "Can I advertise in more than one area?",
    answer:
      "Yes, depending on availability.\nIf your business serves multiple parts of Maui or multiple islands, we can discuss options for placing your ad in more than one market area or future campaign.",
  },
  {
    question: "When will the mailer go out?",
    answer:
      "Mailer dates depend on the campaign schedule, design deadlines, print production, and mailing route timing.\nOnce your spot is reserved, we'll let you know the expected timeline and any important deadlines for submitting your business information, logo, photos, and offer.",
  },
]

export default function FAQSection() {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set())

  const allOpen = openIndexes.size === faqs.length

  const toggleOne = (idx: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev)
      next.has(idx) ? next.delete(idx) : next.add(idx)
      return next
    })
  }

  const toggleAll = () => {
    if (allOpen) {
      setOpenIndexes(new Set())
    } else {
      setOpenIndexes(new Set(faqs.map((_, i) => i)))
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-bold mb-4 text-primary leading-7 text-5xl">Frequently Asked Questions</h2>
      </div>

      {/* Expand / Collapse all */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleAll}
          className="text-sm font-semibold text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 px-5 py-2 rounded-full transition-smooth"
        >
          {allOpen ? "Collapse All" : "Expand All"}
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndexes.has(idx)
          return (
            <div
              key={idx}
              className={`rounded-xl border overflow-hidden transition-smooth ${
                isOpen ? "bg-card shadow-md" : "bg-card/50"
              }`}
              style={{ borderColor: isOpen ? "#A37C4F" : "#e8e3dd" }}
            >
              <button
                onClick={() => toggleOne(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-smooth hover:bg-muted min-h-[64px]"
                aria-expanded={isOpen}
              >
                <h3 className="text-base sm:text-lg font-semibold pr-4 text-primary">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px]" : "max-h-0"}`}
              >
                <div className="px-6 pb-5 pt-0">
                  {faq.answer.split("\n").map((line, i) => (
                    <p key={i} className={`text-tan leading-relaxed ${i > 0 ? "mt-3" : ""}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
