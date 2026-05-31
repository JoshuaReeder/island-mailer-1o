"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: 1,
    title: "Inquiry",
    description: "Tell us about your business and campaign goals",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Design",
    description: "We create beautiful, custom postcard designs",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Print",
    description: "High-quality printing with attention to detail",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
        />
      </svg>
    ),
  },
  {
    number: 4,
    title: "Deliver",
    description: "Postcards reach your Hawaii community",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          steps.forEach((_, idx) => {
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, idx])
            }, idx * 150)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-bold mb-4 text-primary text-8xl">How It Works</h2>
        <p className="text-lg text-tan max-w-2xl mx-auto">A simple, streamlined process from idea to delivery</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="relative"
            style={{
              opacity: visibleSteps.includes(idx) ? 1 : 0,
              transform: visibleSteps.includes(idx) ? "translateY(0)" : "translateY(24px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="bg-card rounded-2xl p-8 text-center border border-border transition-smooth hover:shadow-lg hover:-translate-y-1 h-full">
              {/* Icon */}
              <div className="w-16 rounded-xl text-gold flex items-center justify-center mx-auto mb-5 bg-secondary-foreground h-16">
                {step.icon}
              </div>

              {/* Step Badge */}
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold text-white mb-4">
                Step {step.number}
              </span>

              <h3 className="text-xl font-semibold mb-2 text-card-foreground">{step.title}</h3>
              <p className="text-tan text-sm leading-relaxed">{step.description}</p>
            </div>

            {/* Connector (desktop only) */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gold/30" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
