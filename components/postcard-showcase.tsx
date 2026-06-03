"use client"

import { useState } from "react"
import Image from "next/image"

type Side = "front" | "back"
type ColorScheme = "navy" | "cream"

const images: Record<Side, Record<ColorScheme, string>> = {
  front: {
    navy: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FRONT%208%20Gold%20on%20Navy-EdKtbmAI0oK519d63uOWFOq9Unh3bw.png",
    cream:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FRONT%208%20Gold%20on%20Cream-1OZvxbI6SAe3TQBgCa07kmYAFd8KLQ.png",
  },
  back: {
    navy: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACK%208%20Gold%20on%20Navy-8WHj3r4qC3gDGxhD2zJKTU0IFGHEid.png",
    cream:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACK%208%20Gold%20on%20Cream-lbcf07LM4RgelaeA9DgYhaMys6TuJ4.png",
  },
}

export default function PostcardShowcase() {
  const [side, setSide] = useState<Side>("front")
  const [color, setColor] = useState<ColorScheme>("navy")

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-navy">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-4">
            The 9&times;12 Postcard
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-2xl mx-auto leading-relaxed">
            Front &amp; back — see what lands in every mailbox.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {/* Side toggle */}
          <div className="flex items-center gap-1 bg-secondary-navy rounded-full p-1 border border-white/10">
            {(["front", "back"] as Side[]).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-smooth ${
                  side === s
                    ? "bg-gold text-white shadow-md"
                    : "text-sand hover:text-gold"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Color toggle */}
          <div className="flex items-center gap-1 bg-secondary-navy rounded-full p-1 border border-white/10">
            <button
              onClick={() => setColor("navy")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-smooth ${
                color === "navy"
                  ? "bg-gold text-white shadow-md"
                  : "text-sand hover:text-gold"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-[#1e2d4a] border border-gold/40 inline-block" />
              Navy
            </button>
            <button
              onClick={() => setColor("cream")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-smooth ${
                color === "cream"
                  ? "bg-gold text-white shadow-md"
                  : "text-sand hover:text-gold"
              }`}
            >
              <span className="w-3 h-3 rounded-full bg-[#f5f0e8] border border-gold/40 inline-block" />
              Cream
            </button>
          </div>
        </div>

        {/* Postcard image */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40 max-w-5xl mx-auto">
          <Image
            key={`${side}-${color}`}
            src={images[side][color]}
            alt={`Island Mailer ${side} — ${color} background`}
            width={1280}
            height={960}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Caption */}
        <p className="text-center text-sand/60 text-sm mt-4">
          {side === "front" ? "Front — 8 ad spaces (A–H)" : "Back — 8 ad spaces (I–P)"}
          {" · "}
          {color === "navy" ? "Navy background" : "Cream background"}
        </p>

        {/* Campaign Timeline */}
        <div className="mt-20 text-center bg-secondary-navy rounded-3xl p-10 lg:p-14 border border-white/10">
          <div className="max-w-2xl mx-auto">
            <p className="text-sand text-lg mb-3">Next Mailer</p>
            <p className="text-4xl sm:text-5xl font-bold text-gold mb-6">July 1st</p>
            <p className="text-xl text-cream mb-8">
              Limited spots available. Reserve your space on the most visible mail in local mailboxes.
            </p>
            <button className="px-10 py-5 rounded-full font-bold text-xl bg-gold text-white transition-smooth hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1 active:translate-y-0 min-h-[64px]">
              Reserve Your Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
