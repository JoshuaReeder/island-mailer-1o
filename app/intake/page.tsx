import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import IntakeForm from "@/components/intake-form"

/*
 * /intake — Advertiser Intake (B2, the data spine seed).
 * For businesses who have reserved (or are reserving) a spot: one form that
 * feeds the print layout, the resident offer card, and the ROI report.
 * noindex — this is a working link we send to advertisers, not a landing page.
 */

export const metadata: Metadata = {
  title: "Advertiser Intake — Your Ad Details | Island Mailer",
  description: "Send us your business info, offer, and art — everything we need to build your Island Mailer ad.",
  robots: { index: false, follow: false },
}

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

export default function IntakePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <section className="bg-navy" style={{ paddingTop: 72 }}>
        <div className="container narrow">
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." style={{ width: 190, margin: "0 auto 28px" }} />
          </div>
          <div className="sec-divider">◆</div>
          <h2>Let&apos;s build your ad</h2>
          <p className="sec-sub">
            This is everything our designers need to put your business on the mailer — and on the digital
            mailer locals scan, save, and redeem from. Takes about 5 minutes.
          </p>
          <div className="sec-body">
            <IntakeForm />
            <div className="talk-story">
              <h3>Rather do this over the phone?</h3>
              <p>
                Call or text us at <a href="tel:8088086245">(808) 808-6245</a> and we&apos;ll fill it in together.
              </p>
              <p>
                Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingMenu />
    </div>
  )
}
