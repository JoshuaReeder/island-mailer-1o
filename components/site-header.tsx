"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface SiteHeaderProps {
  onReserve: () => void
}

export default function SiteHeader({ onReserve }: SiteHeaderProps) {
  const [scrollState, setScrollState] = useState<"top" | "mid" | "deep">("top")

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 50) setScrollState("top")
      else if (y < 400) setScrollState("mid")
      else setScrollState("deep")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollState === "top"
          ? "bg-transparent border-b border-transparent py-4"
          : scrollState === "mid"
          ? "bg-[#1F2735]/85 backdrop-blur-md border-b border-[#A37C4F]/20 py-2"
          : "bg-[#141C28]/70 backdrop-blur-sm border-b border-[#A37C4F]/10 py-1"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">

        {/* Logo — shrinks dramatically on scroll */}
        <Image
          src="/images/horizontal-20im-20logo.svg"
          alt="Island Mailer"
          width={200}
          height={50}
          className={`w-auto transition-all duration-500 ${
            scrollState === "top"
              ? "h-20 sm:h-28"
              : scrollState === "mid"
              ? "h-9 sm:h-11"
              : "h-6 sm:h-7 opacity-75"
          }`}
          priority
        />

        {/* Deep scroll only: subtle gold dots as a spacer */}
        {scrollState === "deep" && (
          <div className="flex gap-1.5 items-center flex-1 justify-center" aria-hidden>
            <span className="w-1 h-1 rounded-full bg-[#A37C4F]/60" />
            <span className="w-1 h-1 rounded-full bg-[#A37C4F]/60" />
            <span className="w-1 h-1 rounded-full bg-[#A37C4F]/60" />
          </div>
        )}

        {/* CTA Button — scales down, goes ghost at deep scroll */}
        <button
          onClick={onReserve}
          className={`rounded-full font-bold transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap ${
            scrollState === "top"
              ? "gradient-gold-shine text-white px-8 sm:px-10 py-4 sm:py-5 text-xs sm:text-lg min-h-[56px] hover:shadow-2xl hover:shadow-gold/40"
              : scrollState === "mid"
              ? "gradient-gold-shine text-white px-5 py-2 text-sm min-h-[36px] hover:shadow-lg"
              : "border border-[#A37C4F]/50 text-[#A37C4F] bg-transparent px-4 py-1.5 text-xs"
          }`}
        >
          {scrollState === "deep" ? "Reserve" : "Reserve Your Spot"}
        </button>

      </div>
    </header>
  )
}
