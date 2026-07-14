import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import MauiInteractiveMap from "@/components/maui-interactive-map"
import { MAUI_OUTLINE, MAUI_HERO_VIEWBOX } from "@/lib/maui-outline"
import { mauiJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Maui Advertising Areas | Island Mailer — Support Local. Live Hawaii.",
  description:
    "Island Mailer serves all of Maui: North Shore, Central, West Side, South Side, and Upcountry. See the island map, explore each area, and reserve your 9×12 postcard ad space.",
  alternates: { canonical: "/maui" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/maui",
    title: "Maui Advertising Areas | Island Mailer — Support Local. Live Hawaii.",
    description:
      "Island Mailer serves all of Maui: North Shore, Central, West Side, South Side, and Upcountry. See the island map, explore each area, and reserve your 9×12 postcard ad space.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

const AREA_CARDS = [
  {
    href: "/north-shore-maui-advertising",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-giDBybwI37gwn0qdjSDN7dZhdT7yvC.png",
    alt: "Pā'ia Town aerial, North Shore Maui",
    h: "North Shore - Maui",
    p: "Pā'ia, Haʻikū, Kuʻau, Spreckelsville and the windward coast — word-of-mouth country where locals support locals.",
    link: "Explore North Shore →",
  },
  {
    href: "/central-maui-advertising",
    img: "https://images.unsplash.com/photo-1636760475389-5ddb8253095f?auto=format&fit=crop&w=900&q=70",
    alt: "ʻĪao Valley, Central Maui",
    h: "Central - Maui",
    p: "Kahului and Wailuku — the working heart of the island, where Maui lives, shops, and hires every day.",
    link: "Explore Central →",
  },
  {
    href: "/west-maui-advertising",
    img: "https://images.unsplash.com/photo-1563121625-969780a24e77?auto=format&fit=crop&w=900&q=70",
    alt: "West Maui coastline",
    h: "West Side - Maui",
    p: "Lahaina, Kāʻanapali, Nāpili and Kapalua — rebuilding, resilient, and more community-focused than ever.",
    link: "Explore West Side →",
  },
  {
    href: "/south-maui-advertising",
    img: "https://images.unsplash.com/photo-1678156913491-d9a6b5f33db1?auto=format&fit=crop&w=900&q=70",
    alt: "South Maui beach with palms",
    h: "South Side - Maui",
    p: "Kīhei, Wailea, and Mākena — one of the island's most densely populated residential corridors.",
    link: "Explore South Side →",
  },
  {
    href: "/upcountry-maui-advertising",
    img: "https://images.unsplash.com/photo-1507032336878-13f159192baa?auto=format&fit=crop&w=900&q=70",
    alt: "Above the clouds on Haleakalā, Upcountry Maui",
    h: "Upcountry - Maui",
    p: "Makawao, Kula, Pukalani and the Haleakalā slopes — tight-knit mountainside communities built on trust.",
    link: "Explore Upcountry →",
  },
]

export default function MauiPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(mauiJsonLd())} />
      {/* ================= MAUI HERO ================= */}
      <div className="hero area maui-hero2">
        <div className="mh2-contour" aria-hidden="true" />
        <svg className="mh2-isle" viewBox={MAUI_HERO_VIEWBOX} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="isleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(163,124,79,.28)" />
              <stop offset="1" stopColor="rgba(163,124,79,.04)" />
            </linearGradient>
          </defs>
          <path d={MAUI_OUTLINE} fill="url(#isleGrad)" stroke="rgba(201,163,107,.8)" strokeWidth="2.5" />
        </svg>
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · Areas We Serve
        </p>
        <div className="area-tag">MAUI — All Areas</div>
        <h1>One Island. Five Local Markets. Your Mailbox Billboard.</h1>
        <p className="hook">
          Island Mailer divides Maui into five local market areas so your ad lands in the neighborhoods that matter
          most to your business. Pick your home area — or reach more than one.
        </p>
        <a className="btn" href="/advertise#contact">Check Availability</a>
      </div>

      {/* ================= ISLAND MAP ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>How We Divide the Island</h2>
          <p className="sec-sub">Tap an area on the map to explore its page.</p>
          <div className="sec-body maui-map-wrap">
            <MauiInteractiveMap />
            <p className="map-note">Simplified area map — mailing routes are confirmed per campaign.</p>
          </div>
        </div>
      </section>

      {/* ================= AREA CARDS ================= */}
      <section className="bg-navy">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Explore Each Area</h2>
          <div className="sec-body area-cards">
            {AREA_CARDS.map((card) => (
              <a className="area-card" href={card.href} key={card.href}>
                <div className="ac-img">
                  <img src={card.img} alt={card.alt} loading="lazy" />
                </div>
                <div className="ac-body">
                  <h3>{card.h}</h3>
                  <p>{card.p}</p>
                  <span className="ac-link">{card.link}</span>
                </div>
              </a>
            ))}
            <a className="area-card" href="/advertise#contact">
              <div
                className="ac-img"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(160deg,#2B3447,#1A2231)",
                  fontSize: 56,
                }}
              >
                📬
              </div>
              <div className="ac-body">
                <h3>Not sure which area?</h3>
                <p>
                  Tell us about your business and we&apos;ll recommend the best mailing area — or a combination — for
                  your customers.
                </p>
                <span className="ac-link">Check Availability →</span>
              </div>
            </a>
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
                Every area: <b>16 ad spaces, one business per industry</b> — design, print &amp; postage
                included.
              </p>
              <a className="btn" href="/advertise#contact">Check Availability →</a>
              <div className="contact-lines">
                <p>Or call/text us: <a href="tel:8088086245">(808) 808-6245</a></p>
                <p>Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
      <FloatingMenu />
    </div>
  )
}
