export default function AboutGiveBack() {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-cream/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream text-center mb-16">About Island Mailer</h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Text */}
          <div className="space-y-6">
            <p className="text-lg sm:text-xl text-sand leading-relaxed">
              Island Mailer was created on Maui with one simple belief: local businesses are the heart of island life,
              and marketing shouldn't be what holds them back.
            </p>
            <p className="text-lg sm:text-xl text-sand leading-relaxed">
              After years of seeing Maui shops, services, and ʻohana-owned businesses struggle to afford effective
              advertising, we set out to build something better - a way to share the cost of a big, beautiful postcard so
              everyone could reach more local homes without burning their entire budget.
            </p>
            <p className="text-lg sm:text-xl text-sand leading-relaxed">
              Island Mailer connects Maui businesses with Maui residents - no guessing with online algorithms, no fighting for attention in an endless feed. Just a giant "mailbox billboard" that lands in every hale that makes it easy for locals to find and support you.
            </p>
            <p className="text-lg sm:text-xl text-sand leading-relaxed">
              When you join Island Mailer, you're not just buying ad space. You're joining a local movement to support small businesses while discovering the people and places that make this island special.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="gradient-navy-warm rounded-3xl p-8 lg:p-10 border-gradient-gold">
            <div className="aspect-square bg-navy/50 rounded-2xl flex items-center justify-center">
              <p className="text-sand text-xl text-center px-6">
                Island Community
                <br />
                <span className="text-base text-sand/60">(Photo)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Give-Back Box */}
        <div className="gradient-navy-warm rounded-3xl p-10 lg:p-12 border-gradient-gold text-center max-w-4xl mx-auto">
          <div className="w-20 h-20 rounded-2xl gradient-gold-shine text-white flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/30">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gold mb-6">Island Mailer Gives-Back</h3>
          <p className="text-lg sm:text-xl text-sand leading-relaxed">
            A portion of profits from each Island Mailer is set aside to support local Maui causes. As we grow, so does
            the impact we can make together.
          </p>
        </div>
      </div>
    </section>
  )
}
