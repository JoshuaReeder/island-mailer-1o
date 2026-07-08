"use client"

import { useState } from "react"
import Image from "next/image"

type Side = "front" | "back"

const images: Record<Side, string> = {
  front:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FRONT%208%20Gold%20on%20Navy-EdKtbmAI0oK519d63uOWFOq9Unh3bw.png",
  back: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BACK%208%20Gold%20on%20Navy-8WHj3r4qC3gDGxhD2zJKTU0IFGHEid.png",
}

export default function PostcardShowcase() {
  const [side, setSide] = useState<Side>("front")

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-navy">
      <div className="max-w-7xl mx-auto"
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-4">
            The 9&times;12 Postcard
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-2xl mx-auto leading-relaxed">
            Front &amp; back — see what lands in every mailbox.
          </p>
        </div>

        {/* Front / Back toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-1 bg-navy/60 rounded-full p-1 border border-gold/30">
            {(["front", "back"] as Side[]).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`px-8 py-3 rounded-full text-base font-semibold capitalize transition-smooth ${
                  side === s
                    ? "bg-gold text-white shadow-md"
                    : "text-sand hover:text-gold"
                }`}
              >
                {s === "front" ? "Front (A–H)" : "Back (I–P)"}
              </button>
            ))}
          </div>
        </div>

        {/* Postcard image */}
        <div className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-2xl shadow-black/40 max-w-5xl mx-auto" style={{ lineHeight: "2em", fontSize: "25px" }}>
          <Image
            key={side}
            src={images[side]}
            alt={`Island Mailer 9×12 postcard ${side} — navy background`}
            width={1280}
            height={960}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Caption */}
        <p className="text-center text-sand/60 text-sm mt-4">
          {side === "front"
            ? "Front side — 8 ad spaces (A–H) + Island Mailer logo and mailing address area"
            : "Back side — 8 ad spaces (I–P) + postage and recipient area"}
        </p>

        {/* Campaign Timeline */}
        <div className="mt-20 text-center bg-navy/60 rounded-3xl p-10 lg:p-14 border border-gold/20">
          <div className="max-w-2xl mx-auto">
            <p className="text-sand text-lg mb-3">Next Mailer</p>
            <p className="text-4xl sm:text-5xl font-bold text-gold mb-6">August</p>
            <p className="text-xl text-cream mb-8">
              Limited spots available. Reserve your space on the most visible mail in local neighborhoods.
            </p>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-5 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1 active:translate-y-0 min-h-[64px]"
            >
              Reserve Your Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
