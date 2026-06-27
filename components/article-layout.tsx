import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import { articleJsonLd, jsonLdScript } from "@/lib/jsonld"

export interface ArticleMeta {
  slug: string
  tag: string
  h1: string
  hook: string
  headline: string
  description: string
  faq?: { q: string; a: string }[]
}

export default function ArticleLayout({
  meta,
  children,
}: {
  meta: ArticleMeta
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            slug: meta.slug,
            headline: meta.headline,
            description: meta.description,
            faq: meta.faq,
          }),
        )}
      />

      {/* ================= COMPACT HERO (no video) ================= */}
      <div className="hero area">
        <div className="overlay" />
        <p className="crumb">
          <a href="/">Island Mailer</a> · <a href="/resources">Resources</a>
        </p>
        <div className="area-tag">{meta.tag}</div>
        <h1>{meta.h1}</h1>
        <p className="hook">{meta.hook}</p>
      </div>

      {/* ================= ARTICLE BODY ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container narrow">
          <div className="resource-body">{children}</div>
        </div>
      </section>

      {/* ================= END CTA ================= */}
      <section className="bg-navy">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Ready to reach local Maui homes?</h2>
          <div className="sec-body">
            <div className="cta-card">
              <p className="big">
                Get your business on a premium 9×12 postcard — <b>$800 flat, one business per industry</b>,
                design, print &amp; postage included.
              </p>
              <a className="btn" href="/#contact">Check Availability →</a>
              <div className="contact-lines">
                <p>
                  Not in an active area yet?{" "}
                  <a href="/waitlist" style={{ color: "var(--gold-bright)", fontWeight: 700 }}>
                    Join the waitlist →
                  </a>
                </p>
                <p>Or call/text us: <a href="tel:8088086245">(808) 808-6245</a></p>
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
