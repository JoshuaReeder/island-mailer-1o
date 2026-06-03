"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface SiteHeaderProps {
  onReserve: () => void
}

export default function SiteHeader({ onReserve }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b border-gold/20 transition-all duration-300 gradient-navy-subtle ${
        scrolled ? "py-2" : "py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo shrinks when scrolled */}
        <Image
          src="/images/horizontal-20im-20logo.svg"
          alt="Island Mailer"
          width={200}
          height={50}
          className={`w-auto transition-all duration-300 ${
            scrolled ? "h-10 sm:h-12" : "h-28 sm:h-36"
          }`}
          priority
        />

        {/* CTA button shrinks when scrolled */}
        <button
          onClick={onReserve}
          className={`rounded-full font-bold gradient-gold-shine text-white transition-all duration-300 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-0.5 active:translate-y-0 ${
            scrolled
              ? "px-5 py-2 text-sm min-h-[36px]"
              : "px-8 sm:px-10 py-4 sm:py-5 text-xs sm:text-lg min-h-[56px]"
          }`}
        >
          Reserve Your Spot
        </button>
      </div>
    </header>
  )
}
