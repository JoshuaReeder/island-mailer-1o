"use client"

import { useState } from "react"
import Image from "next/image"

type Side = "one" | "two"

const images: Record<Side, string> = {
  one: "/images/mailer/side-one-fall.webp",
  two: "/images/mailer/side-two-fall.webp",
}

export default function PostcardShowcase() {
  const [side, setSide] = useState<Side>("one")

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-navy">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-4">
            The 9&times;12 Postcard
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-2xl mx-auto leading-relaxed">
            Side One &amp; Side Two — see what lands in every mailbox.
          </p>
        </div>

        {/* Side One / Side Two toggle */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-1 bg-navy/60 rounded-full p-1 border border-gold/30">
            {(["one", "two"] as Side[]).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className={`px-8 py-3 rounded-full text-base font-semibold transition-smooth ${
                  side === s
                    ? "bg-gold text-white shadow-md"
                    : "text-sand hover:text-gold"
                }`}
              >
                {s === "one" ? "Side One" : "Side Two"}
              </button>
            ))}
          </div>
        </div>

        {/* Postcard image */}
        <div className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-2xl shadow-black/40 max-w-5xl mx-auto">
          <Image
            key={side}
            src={images[side]}
            alt={`Island Mailer 9×12 fall card — Side ${side === "one" ? "One" : "Two"} with 8 featured local offers`}
            width={1600}
            height={1200}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Caption */}
        <p className="text-center text-sand/60 text-sm mt-4">
          {side === "one"
            ? "Side One — 8 featured local offers + QR to view and redeem everything on your phone"
            : "Side Two — 8 more featured local offers + QR to view and redeem"}
          {" · "}Sample offers shown — the fall lineup is being reserved now.
        </p>

        {/* Fall series */}
        <div className="mt-20 text-center bg-navy/60 rounded-3xl p-10 lg:p-14 border border-gold/20">
          <div className="max-w-2xl mx-auto">
            <p className="text-sand text-lg mb-3">Now Reserving</p>
            <p className="text-4xl sm:text-5xl font-bold text-gold mb-3">Fall Mailers</p>
            <p className="text-xl text-sand mb-6">September · October &amp; November — first drop lands in September</p>
            <p className="text-xl text-cream mb-8">
              One reservation keeps your category exclusively yours across the whole series — in local mailboxes all
              season, right when the timing is right.
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
