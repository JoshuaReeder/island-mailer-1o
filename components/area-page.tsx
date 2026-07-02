import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import AreaLeadForm from "@/components/area-lead-form"
import { spotStatus, type AreaData } from "@/lib/area-data"
import { areaJsonLd, expansionAreaJsonLd, jsonLdScript } from "@/lib/jsonld"

export default function AreaPage({ area }: { area: AreaData }) {
  // Non-Maui islands are waitlist-only: their CTAs route to the prefilled waitlist.
  const isExpansion = !!area.island && area.island !== "Maui"
  const islandKey = area.island ?? "Maui"
  const islandSlug = area.islandSlug ?? "maui"
  const islandLabel = islandKey === "Big Island" ? "Big Island" : islandKey

  const contactHref = isExpansion
    ? `/waitlist?island=${encodeURIComponent(islandKey)}&area=${encodeURIComponent(area.tag)}`
    : "#reserve"

  const heroBtnLabel = isExpansion ? `Join the ${islandLabel} Waitlist` : "Check Availability"
  const sectionBtnLabel = isExpansion ? "Join the Waitlist" : "Check Availability"
  const reserveBtnLabel = isExpansion ? "Join the Waitlist →" : "Check Availability →"
  const homes = area.homesEstimate ?? 10000
  const homesText = homes.toLocaleString("en-US")

  // B1 scarcity (v18) — status word only, never counts
  const status = spotStatus(area)
  const showSpots = !isExpansion && (area.spotsTotal ?? 0) > 0
  const spotsLine =
    status === "full"
      ? `The next ${area.tag} mailer is full — join the waitlist and we'll hold your category for the next drop`
      : status === "almost-full"
        ? `Almost full — just a few categories left for the next ${area.tag} mailer. One business per category, exclusively yours.`
        : `Ad space is available for the next ${area.tag} mailer — one business per category, exclusively yours`

  const breadcrumb = isExpansion ? (
    <p className="crumb">
      <a href="/">Island Mailer</a> · <a href={`/${islandSlug}`}>{islandLabel}</a> · Areas We Serve
    </p>
  ) : (
    <p className="crumb">
      <a href="/">Island Mailer</a> · <a href="/maui">Maui</a> · Areas We Serve
    </p>
  )

  const jsonLd = isExpansion
    ? expansionAreaJsonLd({
        slug: area.slug,
        region: area.region,
        title: area.title,
        description: area.description,
        islandName: islandLabel,
        islandSlug,
      })
    : areaJsonLd({
        slug: area.slug,
        region: area.region,
        title: area.title,
        description: area.description,
      })

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      {/* ================= AREA HERO ================= */}
      <div className="hero area">
        <img className="hero-bg" src={area.heroImg} alt={area.heroAlt} />
        <div className="overlay" />
        {breadcrumb}
        <div className="area-tag">{area.tag}</div>
        <h1>{area.h1}</h1>
        <p className="hook">{area.hooks[0]}</p>
        <p className="hook">{area.hooks[1]}</p>
        <a className="btn" href={contactHref}>{heroBtnLabel}</a>
      </div>

      {/* ================= WHAT'S INCLUDED ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>What&apos;s Included</h2>
          <div className="sec-body">
            <div className="price-card">
              <p className="price-head">One flat rate. Everything handled.</p>
              {!isExpansion && (
                <p className="fine" style={{ marginBottom: "var(--gap-s)" }}>
                  Available as the <b>Signature Mailer</b> (9×12, up to {homesText} homes) or the{" "}
                  <b>Hyper-Local Mailer</b> (6.5×12, ~2,500 homes) — for a fraction of a solo mailer campaign.{" "}
                  <a href="/products" style={{ color: "var(--gold-bright)", fontWeight: 700, textDecoration: "none" }}>Compare both →</a>
                </p>
              )}
              <ul className="check-list">
                <li><span><b>Your ad on a premium 9×12 postcard</b> mailed to up to {homesText} local homes</span></li>
                <li><span><b>One business per industry</b> - your category, exclusively yours</span></li>
                <li><span><b>Custom ad design</b> - we handle the layout, you provide the details</span></li>
                <li><span><b>Print, postage &amp; USPS delivery</b> - all included, nothing hidden</span></li>
                <li><span><b>{area.includedFinal.bold}</b>{area.includedFinal.rest}</span></li>
              </ul>
              <p className="fine">No long-term contracts. Reserve a single mailing or multiple in a row.</p>
              <a className="btn" href={contactHref}>{sectionBtnLabel}</a>
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
      <section className="bg-navy2 shimmer" id="reserve">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>{area.reserveHeading}</h2>
          {showSpots && (
            <p className="spots-open" style={{ textAlign: "center", margin: "18px 0 0" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(163,124,79,0.14)",
                  border: "1px solid rgba(163,124,79,0.4)",
                  borderRadius: 999,
                  padding: "10px 26px",
                  color: "var(--gold-bright)",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              >
                {spotsLine}
              </span>
            </p>
          )}
          <div className="sec-body">
            {isExpansion ? (
              <div className="cta-card">
                <p className="big">
                  {area.ctaBig.pre}<b>{area.ctaBig.bold}</b>{area.ctaBig.post}
                </p>
                <a className="btn" href={contactHref}>{reserveBtnLabel}</a>
                <div className="contact-lines">
                  <p>Or call/text us: <a href="tel:8088086245">(808) 808-6245</a></p>
                  <p>Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a></p>
                </div>
              </div>
            ) : (
              <>
                <AreaLeadForm area={area.query} areaLabel={area.tag} />
                <div className="contact-lines" style={{ textAlign: "center", marginTop: "var(--gap-s)" }}>
                  <p>Prefer to talk? Call or text <a href="tel:8088086245">(808) 808-6245</a></p>
                  <p>Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a></p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ================= WE SERVE ALL OF {ISLAND} ================= */}
      <section className="bg-navy">
        <div className="container other-areas">
          <div className="sec-divider">◆</div>
          <h2>We Serve All of {islandLabel}</h2>
          <div className="sec-body links">
            <a href={`/${islandSlug}`}><b>{islandLabel.toUpperCase()} — All Areas</b></a>
            {area.crossLinks.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
            <a href="/advertise#pricing">Pricing &amp; Details</a>
            {isExpansion && <a href={`/waitlist?island=${encodeURIComponent(islandKey)}`}>Waitlist</a>}
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
