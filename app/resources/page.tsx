import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"

export const metadata: Metadata = {
  title: "Resources & Local Advertising Guides | Island Mailer (Maui)",
  description:
    "Practical guides for Maui small businesses: how to advertise to local residents, whether direct mail is still worth it, and how a shared mailer compares to EDDM. Real, useful, Maui-specific advice.",
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/resources",
    title: "Resources & Local Advertising Guides | Island Mailer (Maui)",
    description:
      "Practical guides for Maui small businesses: how to advertise to local residents, whether direct mail is still worth it, and how a shared mailer compares to EDDM. Real, useful, Maui-specific advice.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

const ARTICLES = [
  {
    href: "/resources/kamaaina-deals-maui",
    tag: "For Residents",
    h: "Kamaʻāina Deals on Maui: Free Local Offers in Your Mailbox (2026)",
    p: "Living here shouldn't mean paying visitor prices. Where kamaʻāina find real local deals — and how Island Mailer delivers them free to your mailbox.",
  },
  {
    href: "/resources/advertise-to-locals-on-maui",
    tag: "Local Marketing",
    h: "How to Advertise to Local Residents on Maui (2026 Guide)",
    p: "Reaching the people who actually live here takes a different playbook than chasing tourists. Here's how to do it without burning your budget.",
  },
  {
    href: "/resources/is-direct-mail-worth-it-small-business",
    tag: "Direct Mail",
    h: "Is Direct Mail Still Worth It for Small Businesses? (Maui Edition)",
    p: "Spoiler: yes — but only when it's done right. What the numbers really say for a small island business in 2026.",
  },
  {
    href: "/resources/eddm-vs-shared-mailer-maui",
    tag: "How It Works",
    h: "EDDM vs. Shared Mailer: The Affordable Way to Reach Maui Households",
    p: "Every Door Direct Mail is powerful — but doing it solo gets expensive fast. Here's how sharing the postcard changes the math.",
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      {/* ================= COMPACT HERO ================= */}
      <div className="hero area">
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · Resources
        </p>
        <div className="area-tag">Resources</div>
        <h1>Local Advertising Guides for Maui Businesses</h1>
        <p className="hook">
          No fluff, no jargon — just honest, practical advice on reaching local residents and getting the
          most out of every marketing dollar here on Maui.
        </p>
      </div>

      {/* ================= ARTICLE CARDS ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Guides &amp; Articles</h2>
          <div className="sec-body resource-cards">
            {ARTICLES.map((a) => (
              <a className="resource-card" href={a.href} key={a.href}>
                <span className="rc-tag">{a.tag}</span>
                <h3>{a.h}</h3>
                <p>{a.p}</p>
                <span className="rc-link">Read the guide →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-navy">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Ready to get in local mailboxes?</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                Island Mailer reaches up to <b>10,000 local Maui homes</b> for one flat per-ad-space rate — design, print &amp;
                postage included.
              </p>
              <a className="btn" href="/advertise#contact">Check Availability →</a>
              <div className="contact-lines">
                <p>
                  Not in an active area yet?{" "}
                  <a href="/waitlist" style={{ color: "var(--gold-bright)", fontWeight: 700 }}>
                    Join the waitlist →
                  </a>
                </p>
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
