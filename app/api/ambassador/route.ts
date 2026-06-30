import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, area, why } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Please tell us your name and email." },
        { status: 400 },
      )
    }

    const areaText = area || "Not specified"
    const whyText = why || ""
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    // ─── Email Notification ───────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      const notificationRecipients = ["aloha@islandmailer.com"]
      if (
        process.env.NOTIFICATION_EMAIL &&
        process.env.NOTIFICATION_EMAIL !== "aloha@islandmailer.com"
      ) {
        notificationRecipients.push(process.env.NOTIFICATION_EMAIL)
      }

      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: notificationRecipients,
        replyTo: email,
        subject: `🤝 Ambassador interest: ${name}`,
        html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:0;color:#F5F4EF;font-size:26px;font-weight:700;">🤝 Ambassador interest</h1>
          <p style="margin:8px 0 0;color:#D5C1AA;font-size:14px;">${timestamp}</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:12px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:15px;font-weight:700;">${name}</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Name</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="mailto:${email}" style="color:#A37C4F;font-size:14px;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Island / Area</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${areaText}</td></tr>
          </table>
          ${whyText ? `<div style="margin-top:20px;"><h2 style="margin:0 0 10px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Why they'd be great</h2><p style="margin:0;background:#0f1923;border-left:3px solid #A37C4F;padding:12px 16px;color:#D5C1AA;font-size:14px;border-radius:0 8px 8px 0;">${whyText}</p></div>` : ""}
        </td></tr>
        <tr><td style="background:#0f1923;border-radius:0 0 16px 16px;padding:20px;text-align:center;border-top:1px solid rgba(163,124,79,0.2);">
          <p style="margin:0;color:rgba(163,124,79,0.4);font-size:11px;">Island Mailer · Support Local. Live Hawaii. · islandmailer.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
      })

      console.log("[island-mailer] Ambassador interest email sent for:", name)
    }

    // ─── Google Sheets Logging (non-blocking) ─────────────────────────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          area: areaText,
          why: whyText,
          leadSource: "Ambassador",
          timestamp,
        }),
      }).catch((err) => console.error("[island-mailer] Ambassador Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Ambassador interest received" })
  } catch (error) {
    console.error("[island-mailer] Ambassador API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
