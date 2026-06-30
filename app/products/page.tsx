import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"

export const metadata: Metadata = {
  title: "Products & Services | Island Mailer — Local Direct Mail in Hawaii",
  description:
    "Island Mailer's community mailers: the 9×12 Signature Mailer (up to 10,000 homes, $800/space) and the 6.5×12 Hyper-Local Mailer (2,500 homes, $250/space). Plus custom direct mail, EDDM, solo & campaign mailers, design and print.",
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
                <div className="mailer-price">
                  <span className="amt">$250</span>
                  <span className="per">per ad space, per mailing</span>
                </div>
                <a className="btn" href="/advertise#contact">Check Availability</a>
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
                <div className="mailer-price">
                  <span className="amt">$800</span>
                  <span className="per">per ad space, per mailing</span>
                </div>
                <a className="btn" href="/advertise#contact">Check Availability</a>
              </div>

            </div>
          </div>
        </div>
      </section>

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
