import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import WaitlistForm from "@/components/waitlist-form"

export const metadata: Metadata = {
  title: "Join the Waitlist | Island Mailer — Support Local. Live Hawaii.",
  description:
    "Island Mailer is expanding across Maui and the Hawaiian Islands. Join the waitlist to get notified first, lock in launch pricing, and help bring affordable local direct-mail advertising to your town.",
  alternates: { canonical: "/waitlist" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/waitlist",
    title: "Join the Waitlist | Island Mailer — Support Local. Live Hawaii.",
    description:
      "Island Mailer is expanding across Maui and the Hawaiian Islands. Join the waitlist to get notified first, lock in launch pricing, and help bring affordable local direct-mail advertising to your town.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

const WAITLIST_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Join the Island Mailer Waitlist",
  description:
    "Sign up to be notified first when Island Mailer schedules a direct-mail campaign in your Hawaiʻi area.",
  url: "https://islandmailer.com/waitlist",
  isPartOf: { "@type": "WebSite", name: "Island Mailer", url: "https://islandmailer.com" },
}

const WHY = [
  {
    h: "Get notified first",
    p: "The moment we schedule a mailer in your area, you'll be the first to know — before any spots are public.",
  },
  {
    h: "Lock in launch pricing",
    p: "Waitlist businesses get first pick of ad space at our flat per-space rate — one business per industry, so your category stays yours.",
  },
  {
    h: "Help bring it to your town",
    p: "Every signup tells us where local businesses want Island Mailer next. Your interest helps decide where we launch.",
  },
]

export default function WaitlistPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WAITLIST_JSONLD) }}
      />

      {/* ================= COMPACT HERO (no video) ================= */}
      <div className="hero area">
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · Waitlist
        </p>
        <div className="area-tag">Coming Soon</div>
        <h1>Be First When Island Mailer Comes to Your Area</h1>
        <p className="hook">
          We&apos;re expanding across Maui and out to the other Hawaiian Islands. The waitlist tells us
          where local businesses want Island Mailer next — and makes sure you&apos;re the first to hear
          when a mailer is scheduled for your town.
        </p>
        <a className="btn" href="#waitlist-form">Join the Waitlist →</a>
      </div>

      {/* ================= WAITLIST FORM ================= */}
      <section className="bg-navy2 shimmer" id="waitlist-form">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Join the Waitlist</h2>
          <p className="sec-sub">Tell us where you are. We&apos;ll take it from there.</p>
          <div className="sec-body">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="bg-cream5 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Why join the waitlist</h2>
          <div className="sec-body features">
            {WHY.map((item) => (
              <div className="feature" key={item.h}>
                <h3>{item.h}</h3>
                <p>{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ALREADY ACTIVE CTA ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Already in an active Maui area?</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                Island Mailer is live across Maui — <b>North Shore, Central, West Side, South Side, and Upcountry</b>.
                If you&apos;re here, you can reserve your spot today.
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

      <Footer variant="simple" showMauiAreasLink />
      <FloatingMenu />
    </div>
  )
}
