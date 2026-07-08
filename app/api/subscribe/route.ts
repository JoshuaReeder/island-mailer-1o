import { NextResponse } from "next/server"
import { Resend } from "resend"
import { guardRequest } from "@/lib/form-guard"
import { upsertHubSpotContact } from "@/lib/hubspot"
import { areaForZip } from "@/app/api/zip/route"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, source, im_hp } = body
    const zip = typeof body.zip === "string" && /^\d{5}$/.test(body.zip.trim()) ? body.zip.trim() : ""

    const guard = guardRequest(request, { bucket: "subscribe", limit: 5, honeypot: im_hp, email, fakeSuccessMessage: "Subscribed successfully" })
    if (guard.blocked) return guard.blocked

    if (!email) {
      return NextResponse.json({ success: false, error: "Please enter your email." }, { status: 400 })
    }

    const sourceText = source || "home"
    const nameText = name || ""
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    // v21: CRM upsert — residents join as subscribers (v24: + ZIP → area segmentation)
    const zipArea = zip ? areaForZip(zip) : ""
    void upsertHubSpotContact({
      email,
      name: nameText,
      form: "Mailing List",
      notes: sourceText + (zip ? " | zip " + zip : ""),
      lifecycle: "subscriber",
      area: zipArea && zipArea !== "your area" ? zipArea : undefined,
      zip: zip || undefined,
    })

    // ─── Email Notifications ──────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      const notificationRecipients = ["aloha@islandmailer.com"]
      if (
        process.env.NOTIFICATION_EMAIL &&
        process.env.NOTIFICATION_EMAIL !== "aloha@islandmailer.com"
      ) {
        notificationRecipients.push(process.env.NOTIFICATION_EMAIL)
      }

      // Internal notice
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: notificationRecipients,
        replyTo: email,
        subject: `📥 New Mailing List signup`,
        html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:0;color:#F5F4EF;font-size:26px;font-weight:700;">📥 New Mailing List signup</h1>
          <p style="margin:8px 0 0;color:#D5C1AA;font-size:14px;">${timestamp}</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${nameText ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Name</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${nameText}</td></tr>` : ""}
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="mailto:${email}" style="color:#A37C4F;font-size:14px;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Source</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${sourceText}</td></tr>
          </table>
        </td></tr>
        <tr><td style="background:#0f1923;border-radius:0 0 16px 16px;padding:20px;text-align:center;border-top:1px solid rgba(163,124,79,0.2);">
          <p style="margin:0;color:rgba(163,124,79,0.4);font-size:11px;">Island Mailer · Support Local. Live Hawaii. · islandmailer.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
      })

      // Friendly confirmation to the subscriber
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: [email],
        replyTo: "aloha@islandmailer.com",
        subject: `You're on the list! 🤙🏾 — Island Mailer`,
        html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:12px 0 8px;color:#F5F4EF;font-size:28px;font-weight:700;">You're on the list! 🤙🏾</h1>
          <p style="margin:0;color:#D5C1AA;font-size:16px;">Local deals are coming your way.</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:14px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:14px;font-weight:700;letter-spacing:1px;">Support Local. Live Hawaii.</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:36px 32px;">
          <p style="margin:0 0 20px;color:#F5F4EF;font-size:16px;line-height:1.6;">Mahalo for joining the Island Mailer list! You&apos;ll be the first to know the moment a new mailer lands in your area — packed with exclusive offers from locally loved businesses.</p>
          <p style="margin:0;color:#D5C1AA;font-size:14px;line-height:1.6;">No spam, just local deals. Questions? Reply any time or reach us at <a href="mailto:aloha@islandmailer.com" style="color:#A37C4F;">aloha@islandmailer.com</a>.</p>
        </td></tr>
        <tr><td style="background:#0f1923;border-radius:0 0 16px 16px;padding:24px;text-align:center;border-top:1px solid rgba(163,124,79,0.2);">
          <p style="margin:0 0 4px;color:#F5F4EF;font-size:14px;font-weight:600;">Island Mailer</p>
          <p style="margin:0;"><a href="https://islandmailer.com" style="color:rgba(163,124,79,0.5);font-size:11px;text-decoration:none;">islandmailer.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
      })

      console.log("[island-mailer] Subscribe emails sent for:", email)
    }

    // ─── Google Sheets Logging (non-blocking) ─────────────────────────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameText,
          email,
          source: sourceText,
          leadSource: "Mailing List",
          timestamp,
        }),
      }).catch((err) => console.error("[island-mailer] Subscribe Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Subscribed" })
  } catch (error) {
    console.error("[island-mailer] Subscribe API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
