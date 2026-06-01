"use client"

export default function BenefitsGrid() {
  const benefits = [
    {
      title: "One Business Per Industry",
      description: "your category gets one exclusive ad space.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
    },
    {
      title: "Mailbox Billboard",
      description: "A huge 9×12 postcard that lands in every home in your surrounding area.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "No Pages to Flip Through",
      description: "No coupon book, no envelope; just one big, premium card with your offer front and center.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Premium Designs",
      description:
        "Customized to enhance your business and exclusive offer ",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      ),
    },
    {
      title: "Affordable Co-Op Pricing",
      description:
        "Share printing and postage with other local businesses—get mass-mail reach at a fraction of running your own solo mailer.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Locals Supporting Locals",
      description:
        "Focused on keeping our local economy circulating right here.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-cream/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream text-center mb-16">
          Why local businesses love Island Mailer
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="gradient-navy-warm rounded-3xl p-8 lg:p-10 border-gradient-gold transition-smooth hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2"
            >
              <div className="w-20 h-20 rounded-2xl gradient-gold-shine text-white flex items-center justify-center mb-6 shadow-lg shadow-gold/30">
                <div className="scale-125">{benefit.icon}</div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gold mb-4">{benefit.title}</h3>
              <p className="text-lg text-sand leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="px-12 py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 min-h-[64px]"
          >
            See How It Works
          </button>
        </div>
      </div>
    </section>
  )
}
