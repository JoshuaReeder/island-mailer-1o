"use client"

interface PricingSectionProps {
  onGetStarted: () => void
}

export default function PricingSection({ onGetStarted }: PricingSectionProps) {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-sand/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gradient-gold text-lg sm:text-xl font-bold mb-4">WHAT'S IT COST?</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6">
            While Others Charge Per Lead,
            <br />
            <span className="text-gradient-gold">You Pay Per Home</span>
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-3xl mx-auto leading-relaxed">
            No hidden fees. No per-lead charges. Just pure, predictable pricing that scales with your reach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Package */}
          <div className="gradient-navy-warm rounded-3xl p-10 lg:p-12 border-gradient-gold transition-smooth hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-2">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-cream mb-2">Standard Spot</h3>
              <p className="text-sand text-lg">Single spot on our postcard</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Reach 10,000+ Homes</span>
              </div>
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Nearly 20,000 impressions</span>
              </div>
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Professional design included</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gold mb-2">Custom</div>
              <p className="text-sand">Contact for pricing</p>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full px-8 py-5 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 active:translate-y-0 min-h-[64px]"
            >
              Get Custom Quote
            </button>
          </div>

          {/* Premium Package */}
          <div className="bg-gold/15 rounded-3xl p-10 lg:p-12 border-2 border-gold relative transition-smooth hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="inline-block px-6 py-3 rounded-full gradient-gold-shine text-white text-sm font-bold shadow-lg shadow-gold/40">
                ⭐ MOST POPULAR
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-cream mb-2">Double Spot</h3>
              <p className="text-sand text-lg">Double-sized spot for maximum impact</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Reach 10,000+ Homes</span>
              </div>
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Nearly 20,000 impressions</span>
              </div>
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>2x the visibility</span>
              </div>
              <div className="flex items-center gap-4 text-lg text-sand">
                <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Premium design included</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gold mb-2">Custom</div>
              <p className="text-sand">Contact for pricing</p>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full px-8 py-5 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 active:translate-y-0 min-h-[64px]"
            >
              Get Custom Quote
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl text-sand">
            Need multiple spots or want to expand to other islands?{" "}
            <button onClick={onGetStarted} className="text-gradient-gold font-bold hover:underline">
              Get in touch
            </button>{" "}
            and we'll create a custom package for you.
          </p>
        </div>
      </div>
    </section>
  )
}
