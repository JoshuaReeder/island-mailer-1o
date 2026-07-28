import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"

/*
 * /pay — Advertiser reservation summary + secure checkout hand-off.
 *
 * This is the branded front door for payment. An advertiser gets a personalised
 * link (email or text from the "Ad Spot - Reserve to Paid" workflow in GHL),
 * lands here, sees an invoice-style summary of exactly what they agreed to,
 * then taps through to the Stripe checkout hosted on pay.islandmailer.com.
 *
 * noindex — this is a working link we send to advertisers, never a landing page.
 * That also keeps Locked Rule #1 (pricing is gated) intact: rates only ever
 * appear here for the one business the link was built for.
 *
 * Everything is driven by query params so one page serves every advertiser:
 *   /pay?biz=Maui%20Training%20Center&who=Coach%20Junior%20Leoso
 *       &inv=M26-8008&area=North%20Shore%20Maui&cat=Martial%20Arts
 *       &amt=800&credit=300
 */

export const metadata: Metadata = {
  title: "Reserve Your Spot | Island Mailer",
  description: "Secure checkout for your Island Mailer advertising spot.",
  robots: { index: false, follow: false },
}

/* Live GHL payment link. Swap the host to pay.islandmailer.com once the
   CNAME (pay -> sites.ludicrous.cloud) has propagated and verified. */
const CHECKOUT_URL = "https://pay.islandmailer.com/reserve"

const LOGO = "/images/island-mailer-logo-vertical-light.png"

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" })

type Search = Record<string, string | string[] | undefined>

const one = (v: string | string[] | undefined, fallback: string) => {
  if (Array.isArray(v)) return v[0] ?? fallback
  return v ?? fallback
}

const num = (v: string | string[] | undefined, fallback: number) => {
  const raw = Array.isArray(v) ? v[0] : v
  if (raw == null || raw === "") return fallback
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback
}

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  const sp = await searchParams

  const biz = one(sp.biz, "Your Business")
  const who = one(sp.who, "")
  const where = one(sp.where, "")
  const inv = one(sp.inv, "")
  const area = one(sp.area, "North Shore Maui")
  const cat = one(sp.cat, "your category")
  const amount = num(sp.amt, 800)
  const credit = num(sp.credit, 0)
  const total = Math.max(0, amount - credit)

  const subline = [who, where].filter(Boolean).join(" · ")

  return (
    <div style={{ background: "#F5F4EF", color: "#1F2735", minHeight: "100vh" }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .pay-wrap{max-width:840px;margin:0 auto;padding:72px 32px 96px;}
          .pay-h1{font-family:var(--font-display,Georgia),serif;font-weight:500;font-size:52px;line-height:1.15;letter-spacing:-.5px;margin-bottom:22px;color:#1F2735;}
          .pay-card{background:#fff;border:1px solid #E8E6E1;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(31,39,53,.06);}
          .pay-head{background:#F5F4EF;border-bottom:1px solid #E8E6E1;padding:26px 34px;display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap;}
          .pay-rows{padding:10px 34px 6px;}
          .pay-row{display:flex;justify-content:space-between;gap:24px;padding:24px 0;border-bottom:1px solid #E8E6E1;}
          .pay-row:last-child{border-bottom:none;}
          .pay-total{margin:8px 34px 34px;background:#1F2735;color:#fff;border-radius:14px;padding:24px 30px;display:flex;justify-content:space-between;align-items:center;gap:18px;}
          .pay-btn{display:flex;align-items:center;justify-content:center;width:100%;background:#A37C4F;color:#fff;border-radius:14px;font-size:21px;font-weight:600;letter-spacing:.3px;padding:18px 32px;min-height:88px;line-height:1.25;text-align:center;text-decoration:none;box-shadow:0 6px 20px rgba(163,124,79,.28);transition:background .18s ease,transform .18s ease;}
          .pay-btn:hover{background:#8f6c43;transform:translateY(-1px);}
          @media (max-width:680px){
            .pay-wrap{padding:48px 20px 72px;}
            .pay-h1{font-size:38px;}
            .pay-head{padding:22px;flex-direction:column;}
            .pay-rows{padding:6px 22px 4px;}
            .pay-row{flex-direction:column;gap:6px;}
            .pay-total{margin:6px 22px 22px;padding:20px 22px;}
            .pay-btn{font-size:19px;min-height:78px;padding:16px 22px;}
          }
        `,
        }}
      />

      {/* gold rule */}
      <div style={{ height: 8, background: "linear-gradient(90deg,#A37C4F,#C29A63)" }} />

      <header style={{ background: "#1F2735", padding: "36px 32px", textAlign: "center" }}>
        <img
          src={LOGO}
          alt="Island Mailer — Support Local. Live Hawaii."
          style={{ width: 150, margin: "0 auto", display: "block" }}
        />
      </header>

      <div className="pay-wrap">
        <div
          style={{
            fontSize: 13,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            color: "#A37C4F",
            marginBottom: 18,
          }}
        >
          Reserve Your Spot
        </div>

        <h1 className="pay-h1">
          Your spot is temporarily held.
          <br />
          Let&rsquo;s make it official.
        </h1>

        <p style={{ fontSize: 21, color: "#6E7687", maxWidth: 600, marginBottom: 56 }}>
          Here&rsquo;s a summary of what we discussed. Payment reserves your exclusive
          category &mdash; your competitors are locked out of this mailer.
        </p>

        <div className="pay-card">
          <div className="pay-head">
            <div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 1.6,
                  textTransform: "uppercase",
                  color: "#A37C4F",
                  marginBottom: 6,
                }}
              >
                Reserved For
              </div>
              <div style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.35 }}>
                {biz}
                {subline && (
                  <span
                    style={{
                      display: "block",
                      fontWeight: 400,
                      fontSize: 15,
                      color: "#6E7687",
                      marginTop: 3,
                    }}
                  >
                    {subline}
                  </span>
                )}
              </div>
            </div>

            {inv && (
              <div style={{ textAlign: "right", fontSize: 15, color: "#6E7687" }}>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: 1.6,
                    textTransform: "uppercase",
                    color: "#A37C4F",
                    marginBottom: 6,
                  }}
                >
                  Invoice
                </div>
                <span
                  style={{
                    display: "block",
                    fontFamily: "Georgia, serif",
                    fontSize: 19,
                    color: "#1F2735",
                    letterSpacing: 1,
                  }}
                >
                  {inv}
                </span>
                Due upon receipt
              </div>
            )}
          </div>

          <div className="pay-rows">
            <div className="pay-row">
              <div>
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                  Exclusive Advertising Spot &mdash; Signature 9&times;12
                </div>
                <div style={{ fontSize: 15, color: "#6E7687", marginTop: 5 }}>
                  {area} &middot; {cat}{" "}category &middot; one business per category
                </div>
              </div>
              <div style={{ fontSize: 19, whiteSpace: "nowrap" }}>{money(amount)}</div>
            </div>

            {credit > 0 && (
              <div className="pay-row">
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: "#A37C4F" }}>
                    Advertising Credit Promo
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 19,
                    whiteSpace: "nowrap",
                    fontWeight: 600,
                    color: "#A37C4F",
                  }}
                >
                  &minus;{money(credit)}
                </div>
              </div>
            )}
          </div>

          <div className="pay-total">
            <div style={{ fontFamily: "Georgia, serif", fontSize: 21 }}>Total Due</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 34, color: "#D5C1AA" }}>
              {money(total)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 44, textAlign: "center" }}>
          <a className="pay-btn" href={CHECKOUT_URL}>
            Pay Securely &amp; Reserve My Spot
          </a>
          <div style={{ marginTop: 20, fontSize: 15, color: "#6E7687" }}>
            Secure checkout powered by Stripe. We never see your card details.
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 13,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "#6E7687",
              opacity: 0.75,
            }}
          >
            Visa &middot; Mastercard &middot; Amex &middot; Discover &middot; Apple Pay &middot; Google Pay
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 30,
            borderTop: "1px solid #E8E6E1",
            fontSize: 16,
            color: "#6E7687",
            lineHeight: 1.75,
          }}
        >
          <b style={{ color: "#1F2735" }}>Terms:</b> Full payment reserves your exclusive
          category spot on the Island Mailer {area}{" "}card. One business per category
          &mdash; your competitors are excluded. Design begins upon payment; you&rsquo;ll
          receive a proof to approve before print. Spot is held pending payment.
          Questions? Call or text <b style={{ color: "#1F2735" }}>808-808-MAIL (6245)</b> or
          email <b style={{ color: "#1F2735" }}>aloha@islandmailer.com</b>.
        </div>

        <div
          style={{
            marginTop: 44,
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontSize: 24,
            color: "#A37C4F",
          }}
        >
          Mahalo for supporting local.
        </div>
      </div>

      <Footer />
      <FloatingMenu />
    </div>
  )
}
