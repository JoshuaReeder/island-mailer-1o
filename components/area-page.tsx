import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import type { AreaData } from "@/lib/area-data"
import { areaJsonLd, jsonLdScript } from "@/lib/jsonld"

export default function AreaPage({ area }: { area: AreaData }) {
  const contactHref = `/?area=${encodeURIComponent(area.query)}#contact`

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          areaJsonLd({
            slug: area.slug,
            region: area.region,
            title: area.title,
            description: area.description,
          }),
        )}
      />
      {/* ================= AREA HERO ================= */}
      <div className="hero area">
        <img className="hero-bg" src={area.heroImg} alt={area.heroAlt} />
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · <a href="/maui">Maui</a> · Areas We Serve
        </p>
        <div className="area-tag">{area.tag}</div>
        <h1>{area.h1}</h1>
        <p className="hook">{area.hooks[0]}</p>
        <p className="hook">{area.hooks[1]}</p>
        <a className="btn" href={contactHref}>Check Availability</a>
      </div>

      {/* ================= WHAT'S INCLUDED ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>What&apos;s Included - For Just $800</h2>
          <div className="sec-body">
            <div className="price-card">
              <p className="price-head">One flat rate. Everything handled.</p>
              <ul className="check-list">
                <li><span><b>Your ad on a premium 9×12 postcard</b> mailed to up to 10,000 local homes</span></li>
                <li><span><b>One business per industry</b> - your category, exclusively yours</span></li>
                <li><span><b>Custom ad design</b> - we handle the layout, you provide the details</span></li>
                <li><span><b>Print, postage &amp; USPS delivery</b> - all included, nothing hidden</span></li>
                <li><span><b>{area.includedFinal.bold}</b>{area.includedFinal.rest}</span></li>
              </ul>
              <p className="fine">No long-term contracts. Reserve a single mailing or multiple in a row.</p>
              <a className="btn" href={contactHref}>Check Availability</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PERFECT FOR ================= */}
      <section className="bg-navy">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>{area.fitHeading}</h2>
          <div className="sec-body">
            <ul className="fit-list">
              {area.fitList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials intentionally omitted until real advertiser quotes exist. */}

      {/* ================= NEIGHBORHOODS ================= */}
      <section className="bg-cream5 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>{area.hoodsHeading}</h2>
          <div className="sec-body">
            <div className="area-photo">
              <img src={area.hoodPhoto.src} alt={area.hoodPhoto.alt} loading="lazy" />
            </div>
            <div className="hoods" style={{ marginTop: "var(--gap-s)" }}>
              {area.hoods.map((hood) => (
                <span className="hood" key={hood}>{hood}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= RESERVE CTA ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>{area.reserveHeading}</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                {area.ctaBig.pre}<b>{area.ctaBig.bold}</b>{area.ctaBig.post}
              </p>
              <a className="btn" href={contactHref}>Check Availability →</a>
              <div className="contact-lines">
                <p>Or call/text us: <a href="tel:8088086245">(808) 808-6245</a></p>
                <p>Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WE SERVE ALL OF MAUI ================= */}
      <section className="bg-navy">
        <div className="container other-areas">
          <div className="sec-divider">◆</div>
          <h2>We Serve All of Maui</h2>
          <div className="sec-body links">
            <a href="/maui"><b>MAUI — All Areas</b></a>
            {area.crossLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <a href="/#pricing">Pricing &amp; Details</a>
          </div>
          <p className="map-note" style={{ marginTop: "var(--gap-s)" }}>
            Outside this area?{" "}
            <a href="/waitlist" style={{ color: "var(--gold-bright)", fontWeight: 700, textDecoration: "none" }}>
              Join the waitlist
            </a>{" "}
            and we&apos;ll let you know when Island Mailer reaches your town.
          </p>
        </div>
      </section>

      <Footer variant="simple" showMauiAreasLink />
      <FloatingMenu />
    </div>
  )
}
