import { NextResponse } from "next/server"
import { Resend } from "resend"
import { guardRequest } from "@/lib/form-guard"
import { upsertHubSpotContact } from "@/lib/hubspot"

/*
 * /api/pricing — pricing-interest lead.
 *
 * (a) logs the lead to Google Sheets (leadSource "pricing-interest"),
 * (b) sends a branded HTML rate-card email to the submitter via Resend,
 * (c) sends an internal notice to aloha@.
 * Email sends are best-effort (try/catch) and never block the JSON success.
 * If RESEND isn't configured the route still returns success and logs to Sheets.
 */

const FROM = "Island Mailer <aloha@mail.islandmailer.com>"
const LOGO_CARD = "https://islandmailer.com/images/island-mailer-logo-card-navy.png"

function rateCardHtml(): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F5F4EF;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F4EF;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e7e1d6;">
        <tr><td style="background:#1F2735;padding:32px;text-align:center;border-bottom:3px solid #A37C4F;">
          <img src="${LOGO_CARD}" alt="Island Mailer" width="200" style="display:inline-block;max-width:200px;height:auto;" />
        </td></tr>
        <tr><td style="padding:36px 32px 8px;text-align:center;">
          <p style="margin:0 0 6px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Rate Card</p>
          <h1 style="margin:0;color:#1F2735;font-size:26px;font-weight:800;line-height:1.2;">Your Island Mailer rate card</h1>
          <p style="margin:14px auto 0;color:#5a554d;font-size:15px;max-width:440px;line-height:1.6;">One business per category. Design, print &amp; postage all included — no long-term contracts.</p>
        </td></tr>
        <tr><td style="padding:24px 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;border:1.5px solid #A37C4F;border-radius:14px;overflow:hidden;">
            <tr><td style="background:#1F2735;padding:18px 22px;">
              <p style="margin:0 0 2px;color:#C29A63;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Most reach</p>
              <p style="margin:0;color:#F5F4EF;font-size:19px;font-weight:800;">Signature Mailer · 9″ × 12″</p>
              <p style="margin:4px 0 0;color:#D5C1AA;font-size:13px;">Up to 10,000 local homes</p>
            </td></tr>
            <tr><td style="background:#ffffff;padding:18px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;padding:4px;width:33%;"><p style="margin:0;color:#7a756c;font-size:12px;font-weight:700;">1 mailer</p><p style="margin:4px 0 0;color:#1F2735;font-size:24px;font-weight:800;">$800</p></td>
                  <td style="text-align:center;padding:4px;width:34%;background:#faf3e8;border-radius:10px;"><p style="margin:0;color:#A37C4F;font-size:12px;font-weight:800;">3–5 mailers ★</p><p style="margin:4px 0 0;color:#1F2735;font-size:24px;font-weight:800;">$600<span style="font-size:12px;font-weight:600;color:#7a756c;">/ea</span></p></td>
                  <td style="text-align:center;padding:4px;width:33%;"><p style="margin:0;color:#7a756c;font-size:12px;font-weight:700;">6+ mailers</p><p style="margin:4px 0 0;color:#1F2735;font-size:24px;font-weight:800;">$500<span style="font-size:12px;font-weight:600;color:#7a756c;">/ea</span></p></td>
                </tr>
              </table>
            </td></tr>
          </table>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1.5px solid #d9cdba;border-radius:14px;overflow:hidden;">
            <tr><td style="background:#262F40;padding:18px 22px;">
              <p style="margin:0;color:#F5F4EF;font-size:19px;font-weight:800;">Hyper-Local Mailer · 6.5″ × 12″</p>
              <p style="margin:4px 0 0;color:#D5C1AA;font-size:13px;">~2,500 nearby homes</p>
            </td></tr>
            <tr><td style="background:#ffffff;padding:18px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align:center;padding:4px;width:33%;"><p style="margin:0;color:#7a756c;font-size:12px;font-weight:700;">1 mailer</p><p style="margin:4px 0 0;color:#1F2735;font-size:24px;font-weight:800;">$250</p></td>
                  <td style="text-align:center;padding:4px;width:34%;background:#faf3e8;border-radius:10px;"><p style="margin:0;color:#A37C4F;font-size:12px;font-weight:800;">3–5 mailers ★</p><p style="margin:4px 0 0;color:#1F2735;font-size:24px;font-weight:800;">$220<span style="font-size:12px;font-weight:600;color:#7a756c;">/ea</span></p></td>
                  <td style="text-align:center;padding:4px;width:33%;"><p style="margin:0;color:#7a756c;font-size:12px;font-weight:700;">6+ mailers</p><p style="margin:4px 0 0;color:#1F2735;font-size:24px;font-weight:800;">$180<span style="font-size:12px;font-weight:600;color:#7a756c;">/ea</span></p></td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:8px 32px 28px;">
          <div style="background:#F5F4EF;border-radius:12px;padding:22px 24px;">
            <p style="margin:0 0 10px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Why it's a deal</p>
            <p style="margin:0 0 8px;color:#3f3b35;font-size:14px;line-height:1.6;">A solo direct-mail campaign typically runs <strong>$5,000–$10,000</strong>. On a shared Island Mailer you reach the same homes for a fraction of that — because neighbors split the cost.</p>
            <p style="margin:0 0 8px;color:#3f3b35;font-size:14px;line-height:1.6;">Design, printing &amp; postage are all included, and only one business per category gets in — your spot is 100% exclusive, no competitors on your mailer.</p>
            <p style="margin:0;color:#3f3b35;font-size:14px;line-height:1.6;"><strong>★ Commit to 3+ mailings (within 12 months) and the per-mailing rate drops on every one.</strong> Repetition is where direct mail wins — by the third mailer, your offer is a familiar face in the household.</p>
          </div>
        </td></tr>
        <tr><td style="padding:0 32px 36px;text-align:center;">
          <a href="https://islandmailer.com/advertise#contact" style="display:inline-block;background:#A37C4F;color:#1F2735;font-weight:800;font-size:15px;padding:16px 36px;border-radius:999px;text-decoration:none;">Check availability for your category</a>
        </td></tr>
        <tr><td style="background:#1F2735;padding:24px;text-align:center;">
          <p style="margin:0 0 4px;color:#F5F4EF;font-size:14px;font-weight:600;">Island Mailer</p>
          <p style="margin:0 0 12px;color:#A37C4F;font-size:11px;letter-spacing:2px;">SUPPORT LOCAL. LIVE HAWAII.</p>
          <p style="margin:0;"><a href="https://islandmailer.com" style="color:rgba(213,193,170,.6);font-size:11px;text-decoration:none;">islandmailer.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const source = typeof body.source === "string" ? body.source : "pricing-interest"
    const im_hp = typeof body.im_hp === "string" ? body.im_hp : ""

    const guard = guardRequest(request, { bucket: "pricing", limit: 4, honeypot: im_hp, email, fakeSuccessMessage: "Rate card sent" })
    if (guard.blocked) return guard.blocked

    if (!email) {
      return NextResponse.json({ success: false, error: "Please enter your email." }, { status: 400 })
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    // v21: CRM upsert — pricing interest is a HOT business lead
    void upsertHubSpotContact({ email, form: "Pricing Reveal", notes: source })

    // ─── Emails (best-effort, never blocks success) ───────────────────────────
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)

        const notificationRecipients = ["aloha@islandmailer.com"]
        if (
          process.env.NOTIFICATION_EMAIL &&
          process.env.NOTIFICATION_EMAIL !== "aloha@islandmailer.com"
        ) {
          notificationRecipients.push(process.env.NOTIFICATION_EMAIL)
        }

        // Rate card to the submitter
        await resend.emails.send({
          from: FROM,
          to: [email],
          replyTo: "aloha@islandmailer.com",
          subject: "Your Island Mailer rate card 🤙🏾",
          html: rateCardHtml(),
        })

        // Internal notice
        await resend.emails.send({
          from: FROM,
          to: notificationRecipients,
          replyTo: email,
          subject: `💵 Pricing interest: ${email}`,
          html: `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#1F2735;color:#F5F4EF;padding:24px;">
            <p style="color:#C29A63;letter-spacing:3px;text-transform:uppercase;font-size:11px;font-weight:700;margin:0 0 8px;">Island Mailer</p>
            <h2 style="margin:0 0 12px;">💵 Rate card requested</h2>
            <p style="margin:0 0 6px;color:#D5C1AA;">Email: <a href="mailto:${email}" style="color:#A37C4F;">${email}</a></p>
            <p style="margin:0 0 6px;color:#D5C1AA;">Source: ${source}</p>
            <p style="margin:0;color:#D5C1AA;">${timestamp}</p>
          </body></html>`,
        })

        console.log("[island-mailer] Pricing rate-card emails sent for:", email)
      } catch (err) {
        console.error("[island-mailer] Pricing email send failed (non-fatal):", err)
      }
    }

    // ─── Google Sheets Logging (non-blocking) ─────────────────────────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          leadSource: "pricing-interest",
          timestamp,
        }),
      }).catch((err) => console.error("[island-mailer] Pricing Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Rate card sent" })
  } catch (error) {
    console.error("[island-mailer] Pricing API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
