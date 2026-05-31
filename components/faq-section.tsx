"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is Island Mailer?",
    answer:
      "Island Mailer is a Hawaii-based ohana dedicated to empowering local businesses through targeted postcard advertising. We help you connect with residents across Maui, Oahu, Hawaii Island, and Kauai with beautifully designed 9×12 mailers.",
  },
  {
    question: "How much does a campaign cost?",
    answer:
      "Our pricing is custom-tailored to your specific needs. Factors like quantity, design complexity, and distribution scope all play a role. We recommend starting with a chat to discuss your project and receive an accurate quote.",
  },
  {
    question: "How long does it take?",
    answer:
      "Typical turnaround is 3-5 business days for design, with printing and delivery taking an additional 1-2 weeks. We offer rush options for urgent campaigns. Timeline depends on your project scope and current queue.",
  },
  {
    question: "Do you design my ad?",
    answer:
      "Yes! Our team works with you to create custom designs that reflect your brand and message. We handle everything from concept to final print-ready files, or we can work with your existing designs.",
  },
]

export default function FAQSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="font-bold mb-4 text-primary leading-7 text-5xl">Frequently Asked Questions</h2>
        <p className="text-lg text-tan">Quick answers to help you understand our service</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className={`rounded-xl border overflow-hidden transition-smooth ${
              expandedIdx === idx ? "bg-card shadow-md" : "bg-card/50"
            }`}
            style={{ borderColor: expandedIdx === idx ? "#A37C4F" : "#e8e3dd" }}
          >
            <button
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left transition-smooth hover:bg-muted min-h-[64px]"
            >
              <h3 className="text-base sm:text-lg font-semibold pr-4 text-primary">{faq.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${
                  expandedIdx === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${expandedIdx === idx ? "max-h-96" : "max-h-0"}`}
            >
              <div className="px-6 pb-5 pt-0">
                <p className="text-tan leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
