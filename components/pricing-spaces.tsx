"use client"

interface PricingSpacesProps {
  onReserve: () => void
}

export default function PricingSpaces({ onReserve }: PricingSpacesProps) {
  return (
    <section id="pricing" className="py-28 sm:py-36 px-6 sm:px-12 gradient-navy-subtle scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Simple, flat-rate pricing
          </h2>
          <p className="text-2xl sm:text-3xl text-gold">16 ad spaces. Up to 10,000 homes. One flat price.</p>
        </div>

        <div className="gradient-navy-warm rounded-3xl p-10 lg:p-14 border-gradient-gold shadow-2xl mb-12">
          <div className="text-center mb-10">
            <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-gradient-gold mb-4">$800</div>
            <p className="text-xl sm:text-2xl text-sand">per ad space, per mailing</p>
            <p className="text-lg text-sand/80 mt-2">Up to 10,000 local homes - Design, printing & postage included</p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              "16 total ad spaces (8 per side of the 9×12 card)",
              "One business per industry per mailing",
              "Custom island mailer ad design included",
              "Print, postage, and USPS handling included",
              "Targeted local advertisement ",
              "No long-term contracts—book a single mailer or multiple in a row",
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <svg className="w-7 h-7 text-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg sm:text-xl text-sand leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="bg-sand/10 rounded-2xl p-6 lg:p-8 border border-sand/20">
            <p className="text-base sm:text-lg text-sand leading-relaxed">
              <span className="font-bold text-gold">Note:</span> For smaller campaigns (for example, up to ~5,000 homes
              in one market), pricing may be adjusted for that mailing (e.g., around $600 per ad space). Ask about
              current routes and pricing when you reserve.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onReserve}
            className="px-12 py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 min-h-[64px]"
          >
            Check Availability & Reserve My Ad Space
          </button>
        </div>
      </div>
    </section>
  )
}
