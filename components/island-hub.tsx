import type { ReactNode } from "react"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import WaitlistForm from "@/components/waitlist-form"
import type { AreaData, IslandConfig } from "@/lib/area-data"
import { islandHubJsonLd, jsonLdScript } from "@/lib/jsonld"

interface IslandHubProps {
  config: IslandConfig
  areas: AreaData[]
  /** Inline SVG <svg>…</svg> for the island silhouette map. */
  map: ReactNode
}

export default function IslandHub({ config, areas, map }: IslandHubProps) {
  const islandLabel = config.islandName
  const waitlistHref = `/waitlist?island=${encodeURIComponent(config.islandKey)}`
  const heroBtn = `Join the ${islandLabel} Waitlist`

  const jsonLd = islandHubJsonLd({
    islandName: islandLabel,
    islandSlug: config.islandSlug,
    title: config.hubTitle,
    description: config.hubMetaDesc,
    regions: areas.map((a) => a.region),
  })

  // 1–2 sentence description per card = first hook sentence.
  const cardBlurb = (a: AreaData) => a.hooks[0]

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      {/* ================= HUB HERO ================= */}
      <div className="hero area">
        <img className="hero-bg" src={config.hubHeroImg} alt={`${islandLabel}, Hawaii`} />
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · Areas We Serve
        </p>
        <div className="area-tag">{islandLabel.toUpperCase()} — All Areas</div>
        <h1>{config.hubH1}</h1>
        <p className="hook">{config.hubHook}</p>
        <a className="btn" href={waitlistHref}>{heroBtn}</a>
      </div>

      {/* ================= ISLAND MAP ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>How We Divide the Island</h2>
          <p className="sec-sub">Tap an area on the map to explore its page.</p>
          <div className="sec-body maui-map-wrap">
            {map}
            <p className="map-note">Simplified area map — mailing routes are confirmed per campaign.</p>
          </div>
        </div>
      </section>

      {/* ================= ISLAND WAITLIST (PRIORITY) ================= */}
      <section className="bg-cream5 shimmer" id="waitlist-form">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Be First When Island Mailer Comes to {islandLabel}</h2>
          <p className="sec-sub">
            We&apos;re not mailing on {islandLabel} yet. Join the waitlist and you&apos;ll be the first to know the
            moment a mailer is scheduled in your area — and the first to lock in a spot.
          </p>
          <div className="sec-body">
            <WaitlistForm defaultIsland={config.islandKey} />
          </div>
        </div>
      </section>

      {/* ================= AREA CARDS ================= */}
      <section className="bg-navy">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Explore Each Area</h2>
          <div className="sec-body area-cards">
            {areas.map((a) => (
              <a className="area-card" href={`/${a.slug}`} key={a.slug}>
                <div className="ac-img">
                  <img src={a.heroImg} alt={a.heroAlt} loading="lazy" />
                </div>
                <div className="ac-body">
                  <h3>{a.tag}</h3>
                  <p>{cardBlurb(a)}</p>
                  <span className="ac-link">Explore {a.tag.split(" - ")[0]} →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Ready to get your business in local mailboxes?</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                Every area: <b>16 ad spaces, one business per industry, $800 flat</b> — design, print &amp; postage
                included.
              </p>
              <a className="btn" href={waitlistHref}>{heroBtn} →</a>
              <div className="contact-lines">
                <p>Or call/text us: <a href="tel:8088086245">(808) 808-6245</a></p>
                <p>Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" showMauiAreasLink />
      <FloatingMenu />
    </div>
  )
}
