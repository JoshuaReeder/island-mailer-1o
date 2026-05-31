export default function ReferralSection() {
  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold text-lg sm:text-xl font-semibold mb-4">REFERRAL REWARDS</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream mb-6">
            Know Other Local
            <br />
            <span className="text-gold">Businesses?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-sand max-w-3xl mx-auto leading-relaxed">
            Help us build an amazing local business community. Get rewarded for every business you refer that joins our
            postcard campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ),
              title: "Mailing Discounts",
              description: "Get discounts on future mailings for every successful referral",
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ),
              title: "Build Community",
              description: "Help create a stronger local business network",
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              ),
              title: "Bonus Perks",
              description: "Unlock special benefits as a referring partner",
            },
          ].map((benefit, idx) => (
            <div
              key={idx}
              className="bg-secondary-navy rounded-3xl p-10 border border-white/10 text-center transition-smooth hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="w-20 h-20 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-bold text-cream mb-4">{benefit.title}</h3>
              <p className="text-lg text-sand leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-10 py-5 rounded-full font-bold text-xl bg-gold text-white transition-smooth hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-1 active:translate-y-0 min-h-[64px]">
            Refer a Business
          </button>
          <p className="text-sand text-lg mt-6">
            Contact us with business details and we'll reach out to discuss partnership opportunities
          </p>
        </div>
      </div>
    </section>
  )
}
