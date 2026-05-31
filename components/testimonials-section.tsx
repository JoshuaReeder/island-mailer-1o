export default function TestimonialsSection() {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 gradient-navy-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gradient-gold text-lg sm:text-xl font-bold mb-4">🌴 LOCAL BUSINESS OWNERS</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Real People,
            <br />
            <span className="text-gradient-gold">Real Results</span>
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-3xl mx-auto leading-relaxed">
            We're local business owners just like you who understand the struggle to get noticed in today's market.
          </p>
        </div>

        <div className="gradient-navy-warm rounded-3xl p-10 lg:p-14 border-gradient-gold shadow-2xl shadow-gold/20">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-full gradient-gold-shine text-white flex items-center justify-center flex-shrink-0 text-3xl font-bold shadow-lg shadow-gold/30">
              IM
            </div>
            <div>
              <h3 className="text-2xl font-bold text-cream mb-2">Your Local Partners</h3>
              <p className="text-sand text-lg">Local Business Owners like you</p>
            </div>
          </div>

          <p className="text-xl text-sand leading-relaxed mb-8">
            We've been serving Hawaii communities for years, helping local businesses connect with their neighbors
            through beautiful, effective postcard campaigns. In addition to running Island Mailer campaigns, we offer
            other marketing services to support your business growth.
          </p>

          <p className="text-xl text-cream font-semibold mb-6">Let's chat and see how we can support each other!</p>

          <button className="px-10 py-5 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1 active:translate-y-0 min-h-[64px]">
            Let's Connect
          </button>
        </div>
      </div>
    </section>
  )
}
