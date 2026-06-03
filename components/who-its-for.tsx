export default function WhoItsFor() {
  const perfectFor = [
    "Restaurants, food trucks, shave ice, coffee, and plate lunch spots",
    "Salons, spas, gyms, yoga, massage, and wellness studios",
    "Trades and services – plumbers, electricians, landscapers, cleaners",
    "Auto repair, car wash, tire shops, detailing, towing",
    "Real estate, mortgage, insurance, and financial professionals",
    "Medical, dental, chiropractic, optometry, and pet care",
  ]

  const painPoints = [
    "We're spending on ads, but locals still say, 'We didn't know you were here.'",
    "Social posts vanish in the algorithm, and boosts burn cash fast.",
    "Solo mailers quote us thousands we just don't have.",
    "We want more local 'regulars,' not tourists who never come back.",
  ]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 gradient-navy-subtle">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream text-center mb-16">
          Is Island Mailer right for your business?
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* Perfect For */}
          <div className="gradient-navy-warm rounded-3xl p-10 lg:p-12 border-gradient-gold">
            <h3 className="text-2xl sm:text-3xl font-bold text-gold mb-8">Perfect for businesses like:</h3>
            <ul className="space-y-4">
              {perfectFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <svg className="w-7 h-7 text-gold flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg sm:text-xl text-sand leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pain Points */}
          <div className="gradient-navy-warm rounded-3xl p-10 lg:p-12 border-gradient-gold">
            <h3 className="text-2xl sm:text-3xl font-bold text-gold mb-8">
              If this sounds familiar, we can help:
            </h3>
            <ul className="space-y-4">
              {painPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  {/* Gold question mark — signals "sound familiar?" rather than a negative */}
                  <span className="flex-shrink-0 w-7 h-7 mt-0.5 rounded-full border-2 border-gold text-gold text-sm font-bold flex items-center justify-center leading-none">
                    ?
                  </span>
                  <span className="text-lg sm:text-xl text-sand leading-relaxed italic">&ldquo;{item}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xl sm:text-2xl text-center text-sand max-w-4xl mx-auto">
        </p>
      </div>
    </section>
  )
}
