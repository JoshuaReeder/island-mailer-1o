import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import NotifyForm from "@/components/notify-form"

export const metadata: Metadata = {
  title: "Local Offers | Island Mailer — Support Local. Live Hawaii.",
  description:
    "Browse and save the local deals from the businesses on your Island Mailer postcard, then redeem them around Maui. Launching with the July mailer — get notified.",
}

const ICONS: Record<string, React.ReactNode> = {
  bookmark: (
    <svg viewBox="0 0 24 24"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" /></svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 0 0 4 0" /></svg>
  ),
}

export default function LocalOffersPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Local Offers | Island Mailer",
            description:
              "Browse and save local deals from the businesses on your Island Mailer postcard, then redeem them around Maui.",
            url: "https://islandmailer.com/local-offers",
          }),
        }}
      />

      {/* ================= RESIDENT HERO ================= */}
      <div className="hero area">
        <p className="crumb">
          <a href="/">Island Mailer</a> · Local Offers
        </p>
        <div className="area-tag">Local Offers · For Maui Residents</div>
        <h1>Your local deals, all in one place</h1>
        <p className="hook">
          Every offer from the local businesses on your Island Mailer postcard — gathered in one spot. Save the ones you
          love, and redeem them around the island.
        </p>
        <p className="hook" style={{ marginTop: "var(--gap-xs)" }}>
          <span className="soon-badge">Launching with the July mailer</span>
        </p>
        <a className="btn" href="#notify">Get Notified When Offers Drop</a>
      </div>

      {/* ================= HOW IT WORKS (RESIDENTS) ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>How it works</h2>
          <p className="sec-sub">From your mailbox to your favorite local spots — in four easy steps.</p>
          <div className="sec-body">
            <div className="steps">
              <div className="step">
                <div className="num">1</div>
                <div className="stage">In your mailbox</div>
                <h3>Get your Island Mailer</h3>
                <p>A big, beautiful postcard of local offers lands in your mailbox.</p>
              </div>
              <div className="step">
                <div className="num">2</div>
                <div className="stage">One scan</div>
                <h3>Scan the QR code</h3>
                <p>Open the digital version of that mailer — every offer, right on your phone.</p>
              </div>
              <div className="step">
                <div className="num">3</div>
                <div className="stage">Your picks</div>
                <h3>Browse &amp; save</h3>
                <p>Tap to save the deals you want so they&apos;re ready when you need them.</p>
              </div>
              <div className="step">
                <div className="num">4</div>
                <div className="stage">Support local</div>
                <h3>Show &amp; redeem</h3>
                <p>Show your saved offer at the business and enjoy — while supporting local.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHAT YOU CAN DO ================= */}
      <section className="bg-navy">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Made for locals</h2>
          <div className="sec-body">
            <div className="features">
              <div className="feature">
                <div className="icon">{ICONS.bookmark}</div>
                <h3>Save your favorites</h3>
                <p>Keep all the offers you like in one place — no clipping, no paper to lose.</p>
              </div>
              <div className="feature">
                <div className="icon">{ICONS.phone}</div>
                <h3>Redeem digitally</h3>
                <p>Just show your phone at the business. Simple for you, simple for them.</p>
              </div>
              <div className="feature">
                <div className="icon">{ICONS.bell}</div>
                <h3>Never miss a deal</h3>
                <p>Get a heads-up when fresh offers land in your area each month.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOTIFY (LAUNCHING SOON) ================= */}
      <section className="bg-cream5 shimmer" id="notify">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Be first to the deals</h2>
          <p className="sec-sub">
            The first Local Offers go live with the July Island Mailer. Drop your email and we&apos;ll let you know the
            moment deals are available in your area.
          </p>
          <div className="sec-body">
            <NotifyForm />
          </div>
        </div>
      </section>

      {/* ================= FOR BUSINESSES (cross-path) ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Run a local business?</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                Get your offer in front of <b>up to 10,000 local homes</b> on the next Island Mailer — and right here in
                Local Offers.
              </p>
              <a className="btn" href="/products">See Advertising Options →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
      <FloatingMenu />
    </div>
  )
}
