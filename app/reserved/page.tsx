import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"

/*
 * /reserved — post-payment thank-you.
 *
 * Set as the redirect URL on the GHL payment link, so the moment Stripe
 * clears the advertiser lands back on islandmailer.com instead of a generic
 * confirmation screen. The receipt and the "Ad Spot - Payment Received"
 * workflow are already firing by the time they read this.
 *
 * noindex — reachable only after checkout.
 */

export const metadata: Metadata = {
  title: "You're In — Spot Reserved | Island Mailer",
  description: "Your Island Mailer advertising spot is reserved.",
  robots: { index: false, follow: false },
}

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

const STEPS = [
  {
    n: "1",
    h: "Send us your ad details",
    p: "The intake form takes about five minutes and gives our designers everything they need — your offer, your art, where your links should go.",
  },
  {
    n: "2",
    h: "We build your proof",
    p: "You'll get a proof to look over. Nothing goes to print until you say yes.",
  },
  {
    n: "3",
    h: "Your card hits mailboxes",
    p: "Your spot is locked for your category. No competitor can appear beside you on this mailer.",
  },
]

export default function ReservedPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .rsv-step{display:flex;gap:22px;align-items:flex-start;padding:26px 0;border-bottom:1px solid rgba(213,193,170,.18);}
          .rsv-step:last-child{border-bottom:none;}
          .rsv-num{flex:none;width:52px;height:52px;border-radius:999px;border:2px solid var(--gold);
            color:var(--gold);display:flex;align-items:center;justify-content:center;
            font-family:Georgia,serif;font-size:22px;}
          @media (max-width:680px){
            .rsv-step{gap:16px;padding:22px 0;}
            .rsv-num{width:44px;height:44px;font-size:19px;}
          }
        `,
        }}
      />

      <section className="bg-navy" style={{ paddingTop: 72 }}>
        <div className="container narrow">
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <img
              src={LOGO}
              alt="Island Mailer — Support Local. Live Hawaii."
              style={{ width: 190, margin: "0 auto 28px" }}
            />
          </div>

          <div className="sec-divider">◆</div>

          <h2>You&rsquo;re in.</h2>

          <p className="sec-sub">
            Payment received &mdash; your spot is reserved and your category is now closed
            to everyone else on this mailer. A receipt is on its way to your inbox.
          </p>

          <div className="sec-body">
            <div style={{ margin: "10px 0 44px" }}>
              {STEPS.map((s) => (
                <div className="rsv-step" key={s.n}>
                  <div className="rsv-num">{s.n}</div>
                  <div>
                    <h3 style={{ margin: "2px 0 8px" }}>{s.h}</h3>
                    <p style={{ margin: 0 }}>{s.p}</p>
                  </div>
                </div>
              ))}
            </div>

            <a className="btn" href="/intake">
              Send Us Your Ad Details
            </a>

            <div className="talk-story" style={{ marginTop: 44 }}>
              <h3>Rather do this over the phone?</h3>
              <p>
                Call or text us at <a href="tel:8088086245">(808) 808-6245</a>{" "}
                and we&apos;ll fill it in together.
              </p>
              <p>
                Email: <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a>
              </p>
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: 44,
                fontFamily: "Georgia, serif",
                fontSize: 24,
                color: "var(--gold)",
              }}
            >
              Mahalo for supporting local.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingMenu />
    </div>
  )
}
