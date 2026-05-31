"use client"

export default function PostcardShowcase() {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-navy">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6">
            <span className="text-gold">Massive Impact</span>
            <br />
            Every Piece Gets Maximum Visibility
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-3xl mx-auto leading-relaxed">
            No competition. No getting buried. Grab their attention, and a spot on their fridge too.
          </p>
        </div>

        {/* Postcard Examples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="group relative rounded-3xl overflow-hidden bg-secondary-navy border border-white/10 transition-smooth hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-sand/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 rounded-2xl bg-gold/20 text-gold flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gold font-semibold">PREMIUM DESIGN</p>
                  <p className="text-sm text-sand mt-2">Example {num}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                <p className="text-cream font-semibold">9×12 Postcard Design</p>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Timeline */}
        <div className="mt-20 text-center bg-secondary-navy rounded-3xl p-10 lg:p-14 border border-white/10">
          <div className="max-w-2xl mx-auto">
            <p className="text-sand text-lg mb-3">Next Campaign</p>
            <p className="text-4xl sm:text-5xl font-bold text-gold mb-6">Summer, 2026</p>
            <p className="text-xl text-cream mb-8">
              Limited spots available for maximum exclusivity. Reserve your space on the most visible mail in the
              neighborhood.
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
