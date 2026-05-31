"use client"

export default function CardPreview() {
  const spots = [
    { id: "A", side: "Front", status: "Available" },
    { id: "B", side: "Front", status: "Reserved" },
    { id: "C", side: "Front", status: "Available" },
    { id: "D", side: "Front", status: "Available" },
    { id: "E", side: "Front", status: "Reserved" },
    { id: "F", side: "Front", status: "Available" },
    { id: "G", side: "Front", status: "Available" },
    { id: "H", side: "Front", status: "Reserved" },
    { id: "I", side: "Back", status: "Available" },
    { id: "J", side: "Back", status: "Available" },
    { id: "K", side: "Back", status: "Reserved" },
    { id: "L", side: "Back", status: "Available" },
    { id: "M", side: "Back", status: "Available" },
    { id: "N", side: "Back", status: "Reserved" },
    { id: "O", side: "Back", status: "Available" },
    { id: "P", side: "Back", status: "Available" },
  ]

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-12 bg-cream/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream text-center mb-16">
          Live Card Preview & Availability
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Mockup */}
          <div className="gradient-navy-warm rounded-3xl p-8 lg:p-10 border-gradient-gold">
            <h3 className="text-2xl font-bold text-gold mb-6 text-center">Sample Island Mailer – Front & Back</h3>
            <div className="space-y-6">
              <div className="aspect-[3/2] bg-navy/50 rounded-2xl flex items-center justify-center border border-gold/20">
                <p className="text-sand text-lg text-center px-6">
                  Front Side
                  <br />
                  <span className="text-sm text-sand/60">(8 ad spaces)</span>
                </p>
              </div>
              <div className="aspect-[3/2] bg-navy/50 rounded-2xl flex items-center justify-center border border-gold/20">
                <p className="text-sand text-lg text-center px-6">
                  Back Side
                  <br />
                  <span className="text-sm text-sand/60">(8 ad spaces)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Availability Table */}
          <div className="gradient-navy-warm rounded-3xl p-8 lg:p-10 border-gradient-gold">
            <h3 className="text-2xl font-bold text-gold mb-6">See the Island Mailer in action</h3>
            <p className="text-lg text-sand mb-8">This is what your 9×12 "mailbox billboard" looks like.</p>

            <div className="space-y-3 mb-8">
              <div className="grid grid-cols-3 gap-4 text-base font-bold text-gold pb-3 border-b border-gold/20">
                <div>Spot</div>
                <div>Side</div>
                <div>Status</div>
              </div>
              {spots.map((spot) => (
                <div key={spot.id} className="grid grid-cols-3 gap-4 text-base text-sand py-2 border-b border-sand/10">
                  <div className="font-bold">{spot.id}</div>
                  <div>{spot.side}</div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        spot.status === "Available" ? "bg-gold/20 text-gold" : "bg-sand/20 text-sand"
                      }`}
                    >
                      {spot.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-sand/10 rounded-2xl p-6 border border-sand/20 mb-6">
              <p className="text-base text-sand leading-relaxed">
                Each Island Mailer features 16 ad spaces (8 on the front, 8 on the back). The next postcard reaches up
                to 10,000 homes on Maui the week of <span className="font-bold text-gold">March 15, 2025</span>. Spots
                are first-come, first-served. Once your industry category is taken, it's gone for that mailing.
              </p>
            </div>

            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full px-8 py-5 rounded-full font-bold text-lg gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/40 min-h-[64px]"
            >
              Check Availability & Reserve Your Spot
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
