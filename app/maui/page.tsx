import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
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
      <div className="hero area">
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
            <svg
              viewBox="0 0 900 600"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Map of Maui divided into five Island Mailer areas"
            >
              {/* ocean glow */}
              <ellipse cx="470" cy="310" rx="445" ry="260" fill="rgba(22,66,104,.25)" />
              {/* Maui island silhouette (north up): West Maui Mountains lobe, Kahului Bay,
                  central isthmus, Māʻalaea Bay, and the larger Haleakalā lobe out to Hana */}
              <path
                d="M 232,142
                   C 258,132 286,140 305,162
                   C 330,180 348,200 352,226
                   C 356,252 368,268 392,272
                   C 398,284 402,290 414,288
                   C 428,272 446,258 472,246
                   C 520,224 575,208 632,204
                   C 700,200 762,212 805,242
                   C 830,260 844,280 840,302
                   C 834,338 812,376 776,410
                   C 740,444 696,468 648,478
                   C 600,488 560,486 530,472
                   C 516,482 502,480 496,466
                   C 484,470 474,464 472,452
                   C 458,432 450,408 448,384
                   C 446,362 438,346 416,340
                   C 404,348 392,348 382,340
                   C 352,352 318,354 286,344
                   C 232,330 184,300 162,258
                   C 146,224 152,186 178,162
                   C 194,148 212,148 232,142 Z"
                fill="rgba(163,124,79,.10)"
                stroke="#C29A63"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* dashed area dividers */}
              <g stroke="#A37C4F" strokeWidth="1.8" strokeDasharray="7 9" fill="none" opacity=".85">
                <path d="M 330,180 C 340,235 338,290 320,340" />
                <path d="M 460,252 C 466,300 462,345 450,388" />
                <path d="M 462,278 C 590,256 715,262 836,300" />
                <path d="M 458,360 C 510,400 555,438 596,474" />
              </g>
              {/* WEST SIDE */}
              <a href="/west-maui-advertising" aria-label="West Side - Maui">
                <ellipse className="hot" cx="245" cy="245" rx="95" ry="92" />
                <circle className="pin" cx="245" cy="200" r="5" />
                <text className="lbl" x="245" y="245">West Side</text>
                <text className="sub" x="245" y="270">LAHAINA · KĀʻANAPALI</text>
              </a>
              {/* CENTRAL */}
              <a href="/central-maui-advertising" aria-label="Central - Maui">
                <ellipse className="hot" cx="398" cy="308" rx="52" ry="74" />
                <circle className="pin" cx="398" cy="262" r="5" />
                <text className="lbl" x="398" y="305">Central</text>
                <text className="sub" x="398" y="330">KAHULUI · WAILUKU</text>
              </a>
              {/* NORTH SHORE */}
              <a href="/north-shore-maui-advertising" aria-label="North Shore - Maui">
                <ellipse className="hot" cx="645" cy="238" rx="170" ry="44" />
                <circle className="pin" cx="645" cy="210" r="5" />
                <text className="lbl" x="645" y="240">North Shore</text>
                <text className="sub" x="645" y="264">PĀʻIA · HAʻIKŪ · KUʻAU</text>
              </a>
              {/* UPCOUNTRY */}
              <a href="/upcountry-maui-advertising" aria-label="Upcountry - Maui">
                <ellipse className="hot" cx="650" cy="368" rx="150" ry="80" />
                <circle className="pin" cx="650" cy="324" r="5" />
                <text className="lbl" x="650" y="368">Upcountry</text>
                <text className="sub" x="650" y="393">MAKAWAO · KULA · PUKALANI</text>
              </a>
              {/* SOUTH SIDE */}
              <a href="/south-maui-advertising" aria-label="South Side - Maui">
                <ellipse className="hot" cx="490" cy="420" rx="82" ry="58" />
                <circle className="pin" cx="490" cy="385" r="5" />
                <text className="lbl" x="490" y="422">South Side</text>
                <text className="sub" x="490" y="446">KĪHEI · WAILEA · MĀKENA</text>
              </a>
              {/* compass */}
              <g opacity=".7">
                <circle cx="845" cy="78" r="26" fill="none" stroke="#A37C4F" strokeWidth="1.5" />
                <path d="M845,60 L851,82 L845,77 L839,82 Z" fill="#C29A63" />
                <text
                  x="845"
                  y="123"
                  textAnchor="middle"
                  fill="#D5C1AA"
                  fontSize="13"
                  letterSpacing="2"
                  fontFamily="-apple-system, sans-serif"
                >
                  N
                </text>
              </g>
            </svg>
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
