export default function ResultsTestimonials() {
  const stats = [
    { number: "10,000+", label: "Maui homes reached per mailing" },
    { number: "50+", label: "local businesses featured so far" },
    { number: "500,000+", label: "total Island Mailer impressions delivered" },
  ]

  const testimonials = [
    {
      quote:
        "After our first Island Mailer, we saw a clear bump in local customers mentioning the postcard and using our offer. It's now part of our regular marketing.",
      name: "Keoni M.",
      business: "Maui Coffee Roasters",
      location: "Kahului",
    },
    {
      quote:
        "We wanted more steady local traffic without burning money on digital ads. The Island Mailer gave us big exposure, and the cost per home was a no-brainer.",
      name: "Sarah P.",
      business: "Upcountry Yoga Studio",
      location: "Makawao",
    },
    {
      quote:
        "As a Maui-based business, it matters to us that our marketing supports local. Island Mailer helped us reach our neighbors and keep dollars on-island.",
      name: "Mike T.",
      business: "T&M Plumbing",
      location: "Kihei",
    },
  ]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 gradient-navy-subtle">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="gradient-navy-warm rounded-3xl p-8 lg:p-10 border-gradient-gold transition-smooth hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2"
            >
              <div className="mb-6">
                <svg className="w-12 h-12 text-gold/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-lg text-sand leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t border-gold/20 pt-6">
                <p className="font-bold text-gold text-lg">{testimonial.name}</p>
                <p className="text-sand text-base">
                  {testimonial.business}, {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
