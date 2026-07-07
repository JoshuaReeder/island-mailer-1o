import { NextResponse } from "next/server"
import { Resend } from "resend"
import { guardRequest } from "@/lib/form-guard"
import { upsertHubSpotContact } from "@/lib/hubspot"

/*
 * /api/intake — Advertiser Intake (B2, the data spine seed).
 * One submission carries everything needed to build BOTH the printed ad slot
 * AND the resident offer card (lib/offers-data.ts Offer shape) AND the future
 * ROI report row. Logged to Sheets with leadSource "Advertiser Intake".
 */

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      businessName,
      category,
      contactName,
      email,
      phone, // public/business phone for the offer card
      website,
      address,
      areas, // string[]
      months, // string[]
      product, // Signature 9×12 | Hyper-Local 6.5×12 | Not sure yet
      offerHeadline,
      finePrint,
      preferredCode,
      linksTo, // "where should your links/QR go?"
      logoLink,
      notes,
    } = body

    const guard = guardRequest(request, { bucket: "intake", limit: 4, honeypot: body.im_hp, email, fakeSuccessMessage: "Intake submitted successfully" })
    if (guard.blocked) return guard.blocked

    if (!businessName || !contactName || !email || !offerHeadline) {
      return NextResponse.json(
        { success: false, error: "Please fill in your business name, your name, email, and your offer." },
        { status: 400 }
      )
    }

    const areasText = Array.isArray(areas) && areas.length > 0 ? areas.join(", ") : "Not specified"
    const monthsText = Array.isArray(months) && months.length > 0 ? months.join(", ") : "Not specified"
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    // v21: CRM upsert — confirmed advertiser = opportunity
    await upsertHubSpotContact({
      email, name: contactName, phone, company: businessName,
      form: "Advertiser Intake", area: areasText,
      notes: `${offerHeadline}${category ? " | " + category : ""} | ${monthsText}`,
      lifecycle: "opportunity",
      createDeal: true, // v23: intake = highest intent → deal in "New Lead" (awaited: deal chain must finish before the lambda freezes)
    })

    const row = (label: string, value?: string, link?: string) =>
      value
        ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:38%;vertical-align:top;">${label}</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${
            link ? `<a href="${link}" style="color:#A37C4F;">${value}</a>` : value
          }</td></tr>`
        : ""

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const notificationRecipients = ["aloha@islandmailer.com"]
      if (process.env.NOTIFICATION_EMAIL && process.env.NOTIFICATION_EMAIL !== "aloha@islandmailer.com") {
        notificationRecipients.push(process.env.NOTIFICATION_EMAIL)
      }

      // Internal notification — formatted as a ready-to-use "offer record"
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: notificationRecipients,
        replyTo: email,
        subject: `📥 Advertiser Intake: ${businessName} — ${areasText} (${monthsText})`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:0;color:#F5F4EF;font-size:26px;font-weight:700;">📥 Advertiser Intake</h1>
          <p style="margin:8px 0 0;color:#D5C1AA;font-size:14px;">${timestamp}</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:12px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:15px;font-weight:700;">${businessName} — complete offer record below</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:32px;">
          <h2 style="margin:0 0 20px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid rgba(163,124,79,0.2);padding-bottom:10px;">The Offer (for print + offer card)</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Offer headline", offerHeadline)}
            ${row("Fine print", finePrint)}
            ${row("Preferred code", preferredCode)}
            ${row("Category", category)}
            ${row("Links / QR go to", linksTo, linksTo)}
          </table>
          <h2 style="margin:24px 0 20px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid rgba(163,124,79,0.2);padding-bottom:10px;">Mailer Placement</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Areas", areasText)}
            ${row("Months", monthsText)}
            ${row("Product", product)}
          </table>
          <h2 style="margin:24px 0 20px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid rgba(163,124,79,0.2);padding-bottom:10px;">Business & Contact</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Business", businessName)}
            ${row("Contact", contactName)}
            ${row("Email", email, `mailto:${email}`)}
            ${row("Phone", phone, `tel:${phone}`)}
            ${row("Website", website, website)}
            ${row("Address / town", address)}
            ${row("Logo / art link", logoLink, logoLink)}
          </table>
          ${notes ? `<div style="margin-top:20px;"><h2 style="margin:0 0 10px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Notes</h2><p style="margin:0;background:#0f1923;border-left:3px solid #A37C4F;padding:12px 16px;color:#D5C1AA;font-size:14px;border-radius:0 8px 8px 0;">${notes}</p></div>` : ""}
          <div style="margin-top:28px;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;background:#A37C4F;color:#1F2735;font-weight:700;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;">Reply to ${contactName}</a>
          </div>
        </td></tr>
        <tr><td style="background:#0f1923;border-radius:0 0 16px 16px;padding:20px;text-align:center;border-top:1px solid rgba(163,124,79,0.2);">
          <p style="margin:0;color:rgba(163,124,79,0.4);font-size:11px;">Island Mailer · Support Local. Live Hawaii. · islandmailer.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      })

      // Confirmation to the advertiser — best effort, never blocks
      try {
        await resend.emails.send({
          from: "Island Mailer <aloha@mail.islandmailer.com>",
          to: [email],
          replyTo: "aloha@islandmailer.com",
          subject: `Mahalo, ${contactName}! Your ad details are in 🤙🏾 — Island Mailer`,
          html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:12px 0 8px;color:#F5F4EF;font-size:28px;font-weight:700;">Mahalo, ${contactName}! 🤙🏾</h1>
          <p style="margin:0;color:#D5C1AA;font-size:16px;">We received your ad details for ${businessName}.</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:14px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:14px;font-weight:700;letter-spacing:1px;">Support Local. Live Hawaii.</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:36px 32px;">
          <div style="background:#0f1923;border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="margin:0 0 16px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Your Offer</p>
            <p style="margin:0 0 8px;color:#F5F4EF;font-size:18px;font-weight:700;">${offerHeadline}</p>
            ${finePrint ? `<p style="margin:0;color:#D5C1AA;font-size:13px;">${finePrint}</p>` : ""}
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
              <tr><td style="padding:6px 0;color:#D5C1AA;font-size:13px;width:38%;">Areas</td><td style="padding:6px 0;color:#F5F4EF;font-size:13px;">${areasText}</td></tr>
              <tr><td style="padding:6px 0;color:#D5C1AA;font-size:13px;">Months</td><td style="padding:6px 0;color:#F5F4EF;font-size:13px;">${monthsText}</td></tr>
            </table>
          </div>
          <div style="background:rgba(163,124,79,0.1);border:1px solid rgba(163,124,79,0.3);border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="margin:0 0 14px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:8px 0;vertical-align:top;width:28px;color:#A37C4F;font-size:16px;font-weight:700;">①</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">We review your offer and confirm your ad space + category exclusivity</td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;color:#A37C4F;font-size:16px;font-weight:700;">②</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">Our designers build your ad and send you a proof to approve</td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;color:#A37C4F;font-size:16px;font-weight:700;">③</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">Your business lands in local mailboxes — and on the digital mailer locals scan</td></tr>
            </table>
          </div>
          <p style="margin:0 0 12px;color:#F5F4EF;font-size:15px;line-height:1.6;"><strong style="color:#A37C4F;">One quick favor:</strong> if you haven't sent your logo yet, just reply to this email with your logo (and any art or photos you'd like us to use) attached.</p>
          <p style="margin:0;color:#D5C1AA;font-size:14px;line-height:1.6;">Questions? Reply anytime or reach us at <a href="mailto:aloha@islandmailer.com" style="color:#A37C4F;">aloha@islandmailer.com</a>.</p>
        </td></tr>
        <tr><td style="background:#0f1923;border-radius:0 0 16px 16px;padding:24px;text-align:center;border-top:1px solid rgba(163,124,79,0.2);">
          <p style="margin:0 0 4px;color:#F5F4EF;font-size:14px;font-weight:600;">Island Mailer</p>
          <p style="margin:0 0 12px;color:#A37C4F;font-size:11px;letter-spacing:2px;">SUPPORT LOCAL. LIVE HAWAII.</p>
          <p style="margin:0;"><a href="https://islandmailer.com" style="color:rgba(163,124,79,0.5);font-size:11px;text-decoration:none;">islandmailer.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
        })
      } catch (err) {
        console.error("[island-mailer] Intake confirmation email failed (non-fatal):", err)
      }
    }

    // Google Sheets — non-blocking
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: businessName,
          tradeType: category || "",
          website: website || "",
          phone: phone || "",
          contactName,
          email,
          market: areasText,
          notes: [
            `OFFER: ${offerHeadline}`,
            finePrint ? `FINE PRINT: ${finePrint}` : "",
            preferredCode ? `CODE: ${preferredCode}` : "",
            `MONTHS: ${monthsText}`,
            product ? `PRODUCT: ${product}` : "",
            linksTo ? `LINKS TO: ${linksTo}` : "",
            address ? `ADDRESS: ${address}` : "",
            logoLink ? `LOGO: ${logoLink}` : "",
            notes ? `NOTES: ${notes}` : "",
          ]
            .filter(Boolean)
            .join(" | "),
          leadSource: "Advertiser Intake",
          leadOwner: "Joshua Reeder",
          island: "Maui",
          timestamp,
        }),
      }).catch((err) => console.error("[island-mailer] Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Intake submitted successfully" })
  } catch (error) {
    console.error("[island-mailer] Intake API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
