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
      if (y < 60) setScrollState("top")
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
          ? "bg-transparent border-b border-transparent"
          : scrollState === "mid"
          ? "bg-[#1F2735]/85 backdrop-blur-md border-b border-[#A37C4F]/20 py-2"
          : "bg-[#141C28]/70 backdrop-blur-sm border-b border-[#A37C4F]/10 py-1"
      }`}
    >
      {scrollState === "top" ? (
        /* TOP STATE:
           Mobile  — flex-col: logo centered, button below
           Desktop — logo centered, button absolutely right */
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row sm:relative items-center justify-center gap-5 sm:gap-0 py-6 sm:py-5">
          <Image
            src="/images/logo-transparent.svg"
            alt="Island Mailer"
            width={220}
            height={220}
            className="h-[55vh] sm:h-60 w-auto transition-all duration-700"
            priority
          />
          <button
            onClick={onReserve}
            className="gradient-gold-shine text-white px-9 py-4 rounded-full font-bold text-base sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2 min-h-[52px] hover:opacity-95 hover:shadow-2xl hover:shadow-[#A37C4F]/40 active:scale-95 transition-all duration-300 whitespace-nowrap"
          >
            Reserve Your Spot
          </button>
        </div>
      ) : (
        /* SCROLLED STATE: small left-aligned logo */
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          <Image
            src="/images/logo-transparent.svg"
            alt="Island Mailer"
            width={100}
            height={100}
            className={`w-auto transition-all duration-500 ${
              scrollState === "mid" ? "h-10 sm:h-12" : "h-7 sm:h-8 opacity-75"
            }`}
            priority
          />
          {scrollState === "deep" && (
            <div className="flex gap-1.5 items-center flex-1 justify-center" aria-hidden>
              <span className="w-1 h-1 rounded-full bg-[#A37C4F]/60" />
              <span className="w-1 h-1 rounded-full bg-[#A37C4F]/60" />
              <span className="w-1 h-1 rounded-full bg-[#A37C4F]/60" />
            </div>
          )}
          <button
            onClick={onReserve}
            className={`rounded-full font-bold transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap ${
              scrollState === "mid"
                ? "gradient-gold-shine text-white px-5 py-2 text-sm min-h-[36px] hover:shadow-lg"
                : "border border-[#A37C4F]/50 text-[#A37C4F] bg-transparent px-4 py-1.5 text-xs"
            }`}
          >
            {scrollState === "deep" ? "Reserve" : "Reserve Your Spot"}
          </button>
        </div>
      )}
    </header>
  )
}
