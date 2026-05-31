export default function StatsSection() {
  return (
    <section className="py-24 px-6 sm:px-12 gradient-navy-warm border-y border-gold/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {[
            { value: "10,000+", label: "Mailboxes Reached" },
            { value: "100%", label: "Guaranteed USPS Delivery" },
            { value: "9×12", label: "Massive Size" },
            { value: "Limited", label: "Exclusive Spots" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gradient-gold mb-4 group-hover:scale-110 transition-smooth">
                {stat.value}
              </div>
              <div className="text-lg sm:text-xl text-sand font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
