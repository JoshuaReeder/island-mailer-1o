import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import PricingReveal from "@/components/pricing-reveal"
import ProductsShowcaseFx from "@/components/products-showcase-fx"
import { productsJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Products & Services | Island Mailer — Local Direct Mail in Hawaii",
  description:
    "Island Mailer's community mailers: the 9×12 Signature Mailer reaches up to 10,000 local homes and the 6.5×12 Hyper-Local Mailer reaches ~2,500 homes — for a fraction of a solo direct-mail campaign. Design, print & postage included, one business per category. Plus custom direct mail, EDDM, solo & campaign mailers, design and print.",
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/products",
    title: "Products & Services | Island Mailer — Local Direct Mail in Hawaii",
    description:
      "Two community mailers: the 9×12 Signature (up to 10,000 homes) and the 6.5×12 Hyper-Local (~2,500 homes). Design, print & postage included, one business per category.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(productsJsonLd())} />
      <div className="hero area prod-hero2">
        <div className="ph2-horizon" aria-hidden="true" />
        <div className="ph2-rays" aria-hidden="true" />
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
        <div className="ph2-duo" aria-hidden="true">
          <div className="d1"><i /><em>Signature · 12″×9″</em></div>
          <div className="d2"><i /><em>Hyper-Local · 12″×6.5″</em></div>
        </div>
      </div>

      {/* ===== Community mailers — simplified visual comparison (P4) ===== */}
      <section className="bg-navy2 shimmer" id="mailers">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Our community mailers</h2>
          <p className="sec-sub">
            Two sizes, one simple idea: a premium shared postcard with your ad alongside other local businesses — one
            per category, 8 ad spaces per side (16 total). Pick the reach that fits.
          </p>

          <ProductsShowcaseFx />
          <div className="compare-wrap">
            {/* v18: big horizontal mailer showcase — drawn to true scale (both a full 12″ wide) */}
            <p className="msh-lead">
              These aren&apos;t coupons in an envelope. Both mailers are a <b>full 12 inches wide</b> — a giant,
              premium card that fills the mailbox and can&apos;t be missed. That dashed outline? That&apos;s a
              standard postcard, <b>for scale</b>.
            </p>
            <div className="mailer-showcase">
              <figure className="msh-item is-sig">
                <span className="msh-flag">Most reach</span>
                <div className="msh-paper sig">
                  <span className="msh-eyebrow">A full foot wide</span>
                  <span className="msh-dims">
                    12&Prime; × 9&Prime;
                    <small>4&#215; the size of a standard postcard</small>
                  </span>
                  <span className="msh-ghost">standard postcard<br />6&Prime; × 4&Prime;</span>
                </div>
                <figcaption className="msh-caption">
                  <b>Signature</b>
                  <span>up to 10,000 local homes</span>
                </figcaption>
              </figure>
              <figure className="msh-item">
                <div className="msh-paper hl">
                  <span className="msh-eyebrow">Same width, neighborhood focus</span>
                  <span className="msh-dims">
                    12&Prime; × 6.5&Prime;
                    <small>~3&#215; the size of a standard postcard</small>
                  </span>
                  <span className="msh-ghost">standard postcard<br />6&Prime; × 4&Prime;</span>
                </div>
                <figcaption className="msh-caption">
                  <b>Hyper-Local</b>
                  <span>~2,500 nearby homes</span>
                </figcaption>
              </figure>
            </div>

            {/* aligned spec table */}
            <div className="compare-table" role="table" aria-label="Mailer comparison">
              <div className="ct-row ct-head" role="row">
                <span role="columnheader" />
                <span role="columnheader">Hyper-Local</span>
                <span role="columnheader" className="ct-best">Signature</span>
              </div>
              <div className="ct-row" role="row">
                <span role="rowheader">Size</span>
                <span role="cell">12&Prime; × 6.5&Prime;</span>
                <span role="cell" className="ct-best">12&Prime; × 9&Prime;</span>
              </div>
              <div className="ct-row" role="row">
                <span role="rowheader">Reach</span>
                <span role="cell">~2,500 mailboxes</span>
                <span role="cell" className="ct-best">up to 10,000 mailboxes</span>
              </div>
              <div className="ct-row" role="row">
                <span role="rowheader">Ad spaces</span>
                <span role="cell">16 (8 per side)</span>
                <span role="cell" className="ct-best">16 (8 per side)</span>
              </div>
              <div className="ct-row" role="row">
                <span role="rowheader">Exclusivity</span>
                <span role="cell">1 per category</span>
                <span role="cell" className="ct-best">1 per category</span>
              </div>
            </div>

            <p className="compare-note">
              Both shared mailers — design, print &amp; postage included, no long-term contracts.
            </p>
            <div className="compare-cta">
              <a className="btn" href="#pricing-reveal">See Pricing</a>
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
            "url('/images/kihei-coast.jpg')",
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
