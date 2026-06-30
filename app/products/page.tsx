import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import PricingReveal from "@/components/pricing-reveal"

export const metadata: Metadata = {
  title: "Products & Services | Island Mailer — Local Direct Mail in Hawaii",
  description:
    "Island Mailer's community mailers: the 9×12 Signature Mailer reaches up to 10,000 local homes and the 6.5×12 Hyper-Local Mailer reaches ~2,500 homes — for a fraction of a solo direct-mail campaign. Design, print & postage included, one business per category. Plus custom direct mail, EDDM, solo & campaign mailers, design and print.",
}

const cells = "ABCDEFGH".split("")

export default function ProductsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <div className="hero area">
        <p className="crumb">
          <a href="/">Island Mailer</a> · Products &amp; Services
        </p>
        <div className="area-tag">Products &amp; Services</div>
        <h1>Pick the mailer that fits your business</h1>
        <p className="hook">
          Island Mailer puts local businesses in front of local households through premium community mailers — you reserve
          an ad space, we handle the design, print, postage and delivery. Choose the reach that fits your goals and budget.
        </p>
        <a className="btn" href="#mailers">See the mailers</a>
      </div>

      {/* ===== Community mailers ===== */}
      <section className="bg-navy2 shimmer" id="mailers">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Our community mailers</h2>
          <p className="sec-sub">
            Both are shared mailers — your ad joins up to 15 other local businesses, one per industry, with 8 ad spaces per
            side (16 total).
          </p>
          <div className="sec-body">
            <div className="mailer-grid">

              <div className="mailer-card">
                <div className="mailer-name">Hyper-Local Mailer</div>
                <div className="mailer-size">6.5″ × 12″ · one neighborhood</div>
                <div className="mini-card hl">
                  {cells.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <p className="mini-cap">8 ad spaces per side — 16 total (front + back)</p>
                <div className="mailer-stats">
                  <div className="ms">
                    <b>2,500</b>
                    <span>local homes</span>
                  </div>
                  <div className="ms">
                    <b>up to 16</b>
                    <span>ad spaces</span>
                  </div>
                  <div className="ms">
                    <b>~10¢</b>
                    <span>per home</span>
                  </div>
                </div>
                <p className="mailer-best">
                  <b>Best for:</b> testing a new offer, tighter budgets, and reaching one specific neighborhood.
                </p>
                <ul className="check-list">
                  <li><span>16 total ad spaces (8 per side of the 6.5×12 card)</span></li>
                  <li><span>Mails to ~2,500 nearby homes</span></li>
                  <li><span>One business per industry per mailing</span></li>
                  <li><span>Custom ad design, print &amp; postage included</span></li>
                  <li><span>No long-term contracts</span></li>
                </ul>
                <p className="mailer-best" style={{ marginTop: "auto" }}>
                  <b>Reach:</b> ~2,500 nearby homes for less than the cost of a stamp per home.
                </p>
                <a className="btn" href="#pricing-reveal">See Pricing</a>
              </div>

              <div className="mailer-card flagship">
                <div className="mailer-badge">Most reach</div>
                <div className="mailer-name">Signature Mailer</div>
                <div className="mailer-size">9″ × 12″ · whole community</div>
                <div className="mini-card sig">
                  {cells.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <p className="mini-cap">8 ad spaces per side — 16 total (front + back)</p>
                <div className="mailer-stats">
                  <div className="ms">
                    <b>10,000</b>
                    <span>local homes</span>
                  </div>
                  <div className="ms">
                    <b>up to 16</b>
                    <span>ad spaces</span>
                  </div>
                  <div className="ms">
                    <b>~8¢</b>
                    <span>per home</span>
                  </div>
                </div>
                <p className="mailer-best">
                  <b>Best for:</b> maximum visibility, established businesses, and the lowest cost per home.
                </p>
                <ul className="check-list">
                  <li><span>16 total ad spaces (8 per side of the 9×12 card)</span></li>
                  <li><span>Mails to up to 10,000 local homes</span></li>
                  <li><span>One business per industry per mailing</span></li>
                  <li><span>Custom ad design, print &amp; postage included</span></li>
                  <li><span>No long-term contracts</span></li>
                </ul>
                <p className="mailer-best" style={{ marginTop: "auto" }}>
                  <b>Reach:</b> up to 10,000 local homes for less than the cost of a stamp per home.
                </p>
                <a className="btn" href="#pricing-reveal">See Pricing</a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUE FRAMING + GATED PRICING ===== */}
      <section className="bg-navy home-resident" id="pricing-reveal">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>A fraction of a solo direct-mail campaign</h2>
          <p className="lead">
            A solo mailer campaign often runs <b>$5,000&ndash;$10,000+</b> once you add design, print and postage. On
            Island Mailer you share that cost with other local businesses &mdash; and still land in every mailbox.
          </p>
          <div className="value-grid">
            <div className="value-card">
              <div className="vbig">Up to 10,000</div>
              <div className="vlbl">local homes reached &mdash; or ~2,500 with the Hyper-Local</div>
            </div>
            <div className="value-card">
              <div className="vbig">&lt; a stamp</div>
              <div className="vlbl">per home &mdash; design, print &amp; postage all included</div>
            </div>
            <div className="value-card">
              <div className="vbig">1 per category</div>
              <div className="vlbl">your industry is exclusively yours, no long-term contracts</div>
            </div>
          </div>
          <div style={{ marginTop: 44 }}>
            <PricingReveal source="pricing-interest-products" />
          </div>
        </div>
      </section>

      {/* ===== MAUI PHOTO BAND ===== */}
      <div
        className="home-resident"
        style={{
          position: "relative",
          minHeight: 360,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundImage:
            "url('https://commons.wikimedia.org/wiki/Special:FilePath/Kihei_coast.jpg?width=1800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,28,40,.74), rgba(20,28,40,.66))" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 760, padding: "56px 24px" }}>
          <h2 style={{ color: "var(--cream)", fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, textShadow: "0 3px 20px rgba(0,0,0,.6)" }}>
            Real homes. Real neighbors. Real reach.
          </h2>
          <p style={{ color: "var(--cream)", fontSize: "clamp(17px,2.4vw,20px)", marginTop: 18, textShadow: "0 2px 14px rgba(0,0,0,.6)" }}>
            Your offer lands in mailboxes across the community — then lives on inside Local Offers, where locals are already looking.
          </p>
        </div>
      </div>

      {/* ===== Custom direct mail (services) ===== */}
      <section className="bg-navy">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Need something custom?</h2>
          <p className="sec-sub">
            Beyond our shared community mailers, we produce custom direct mail of any kind through our print shop, i Can
            Print That — designed, printed and mailed for you.
          </p>
          <div className="sec-body">
            <div className="mailer-foot">
              <h3>Custom direct mail &amp; print</h3>
              <p>
                Have your own piece in mind, or a bigger campaign? Tell us what you&apos;re trying to do and we&apos;ll put
                together a quote.
              </p>
              <div className="chips">
                <span>Solo mailers</span>
                <span>Campaign mailers</span>
                <span>Full-card EDDM</span>
                <span>Postcards &amp; flyers</span>
                <span>Design &amp; print</span>
                <span>Branded materials</span>
              </div>
              <a className="btn" href="/advertise#contact" style={{ marginTop: "var(--gap-s)" }}>
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Not sure which mailer is right?</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                Tell us your business and the area you want to reach — we&apos;ll recommend the best fit and check
                availability for your industry.
              </p>
              <a className="btn" href="/advertise#contact">Check Availability</a>
              <div className="contact-lines">
                <p>
                  Or call/text us: <a href="tel:8088086245">(808) 808-6245</a>
                </p>
                <p>
                  Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a>
                </p>
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
