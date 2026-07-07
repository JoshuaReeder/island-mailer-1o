import { NextResponse } from "next/server"
import { Resend } from "resend"
import { guardRequest } from "@/lib/form-guard"
import { upsertHubSpotContact } from "@/lib/hubspot"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      businessName,
      phone,
      email,
      website,
      businessType,
      industryCategory,
      mailings,
      areas,
      notes,
      im_hp,
    } = body

    // v21 guard: honeypot + rate limit + email validation
    const guard = guardRequest(request, { bucket: "contact", limit: 3, honeypot: im_hp, email, fakeSuccessMessage: "Application submitted successfully" })
    if (guard.blocked) return guard.blocked

    if (!name || !businessName || !email) {
      return NextResponse.json(
        { success: false, error: "Please fill in your name, business name, and email." },
        { status: 400 }
      )
    }

    const areasText = Array.isArray(areas) && areas.length > 0 ? areas.join(", ") : "Not specified"

    // v21: CRM upsert (HubSpot now; GHL later — see lib/hubspot.ts)
    void upsertHubSpotContact({
      email, name, phone, company: businessName,
      form: "Advertiser Contact", area: areasText,
      notes: [industryCategory, businessType, notes].filter(Boolean).join(" | "),
      createDeal: true, // v23: advertiser application → deal in "New Lead"
    })
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    // ─── Email Notifications ──────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      // Always send to aloha@islandmailer.com; add NOTIFICATION_EMAIL if different
      const notificationRecipients = ["aloha@islandmailer.com"]
      if (
        process.env.NOTIFICATION_EMAIL &&
        process.env.NOTIFICATION_EMAIL !== "aloha@islandmailer.com"
      ) {
        notificationRecipients.push(process.env.NOTIFICATION_EMAIL)
      }

      // Internal lead notification
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: notificationRecipients,
        replyTo: email,
        subject: `🔔 New Lead: ${businessName}${industryCategory ? " — " + industryCategory : ""}`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:0;color:#F5F4EF;font-size:26px;font-weight:700;">🔔 New Advertiser Lead</h1>
          <p style="margin:8px 0 0;color:#D5C1AA;font-size:14px;">${timestamp}</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:12px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:15px;font-weight:700;">New inquiry from ${businessName}</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:32px;">
          <h2 style="margin:0 0 20px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid rgba(163,124,79,0.2);padding-bottom:10px;">Business Details</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Business Name</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${businessName}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Industry</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${industryCategory}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Business Type</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${businessType}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Mailing Regions</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${areasText}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Mailings/Year</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${mailings}</td></tr>
            ${website ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Website</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="${website}" style="color:#A37C4F;font-size:14px;">${website}</a></td></tr>` : ""}
          </table>
          <h2 style="margin:24px 0 20px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid rgba(163,124,79,0.2);padding-bottom:10px;">Contact</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Name</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="mailto:${email}" style="color:#A37C4F;font-size:14px;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Phone</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="tel:${phone}" style="color:#A37C4F;font-size:14px;">${phone}</a></td></tr>
          </table>
          ${notes ? `<div style="margin-top:20px;"><h2 style="margin:0 0 10px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Notes</h2><p style="margin:0;background:#0f1923;border-left:3px solid #A37C4F;padding:12px 16px;color:#D5C1AA;font-size:14px;border-radius:0 8px 8px 0;">${notes}</p></div>` : ""}
          <div style="margin-top:28px;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;background:#A37C4F;color:#1F2735;font-weight:700;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;">Reply to ${name}</a>
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

      // Confirmation to the person who submitted
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: [email],
        replyTo: "aloha@islandmailer.com",
        subject: `Mahalo! We got your request 🤙🏾 — Island Mailer`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:12px 0 8px;color:#F5F4EF;font-size:28px;font-weight:700;">Mahalo, ${name}! 🤙🏾</h1>
          <p style="margin:0;color:#D5C1AA;font-size:16px;">Your application has been received.</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:14px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:14px;font-weight:700;letter-spacing:1px;">Support Local. Live Hawaii.</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:36px 32px;">
          <p style="margin:0 0 20px;color:#F5F4EF;font-size:16px;line-height:1.6;">We've received the advertising inquiry for <strong style="color:#A37C4F;">${businessName}</strong> and we're excited to connect with you.</p>
          <div style="background:#0f1923;border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="margin:0 0 16px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Your Application Summary</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:6px 0;color:#D5C1AA;font-size:13px;width:40%;">Business</td><td style="padding:6px 0;color:#F5F4EF;font-size:13px;">${businessName}</td></tr>
              <tr><td style="padding:6px 0;color:#D5C1AA;font-size:13px;">Industry</td><td style="padding:6px 0;color:#F5F4EF;font-size:13px;">${industryCategory}</td></tr>
              <tr><td style="padding:6px 0;color:#D5C1AA;font-size:13px;">Mailing Areas</td><td style="padding:6px 0;color:#F5F4EF;font-size:13px;">${areasText}</td></tr>
              <tr><td style="padding:6px 0;color:#D5C1AA;font-size:13px;">Mailings/Year</td><td style="padding:6px 0;color:#F5F4EF;font-size:13px;">${mailings}</td></tr>
            </table>
          </div>
          <div style="background:rgba(163,124,79,0.1);border:1px solid rgba(163,124,79,0.3);border-radius:12px;padding:24px;margin-bottom:28px;">
            <p style="margin:0 0 14px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:8px 0;vertical-align:top;width:28px;color:#A37C4F;font-size:16px;font-weight:700;">①</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">Our team reviews your application and available ad space in your area</td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;color:#A37C4F;font-size:16px;font-weight:700;">②</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">We reach out within 1–2 business days to confirm your spot</td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;color:#A37C4F;font-size:16px;font-weight:700;">③</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">We finalize your ad design and launch date — and you're in the next mailer!</td></tr>
            </table>
          </div>
          <p style="margin:0;color:#D5C1AA;font-size:14px;line-height:1.6;">Questions before then? Reply to this email or reach us at <a href="mailto:aloha@islandmailer.com" style="color:#A37C4F;">aloha@islandmailer.com</a>.</p>
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

      console.log("[island-mailer] Emails sent successfully for:", businessName)
    }

    // ─── Google Sheets Lead Logging ───────────────────────────────────────────
    // Non-blocking — if Sheets fails, the form submission still succeeds
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: businessName,
          tradeType: businessType,
          website: website || "",
          phone: phone,
          contactName: name,
          email: email,
          market: areasText,
          notes: notes || "",
          leadSource: "Website Contact Form",
          leadOwner: "Joshua Reeder",
          island: "Maui",
          timestamp: timestamp,
          mailings: mailings,
          industry: industryCategory,
        }),
      }).catch((err) => console.error("[island-mailer] Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" })
  } catch (error) {
    console.error("[island-mailer] API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
