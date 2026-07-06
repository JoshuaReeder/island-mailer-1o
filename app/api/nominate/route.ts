import { NextResponse } from "next/server"
import { Resend } from "resend"
import { guardRequest } from "@/lib/form-guard"
import { upsertHubSpotContact } from "@/lib/hubspot"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { businessName, note, email, im_hp } = body

    const guard = guardRequest(request, { bucket: "nominate", limit: 6, honeypot: im_hp, email: typeof email === "string" && email ? email : undefined, fakeSuccessMessage: "Nomination received" })
    if (guard.blocked) return guard.blocked

    if (!businessName) {
      return NextResponse.json(
        { success: false, error: "Please tell us the business name." },
        { status: 400 }
      )
    }

    const noteText = note || ""
    const emailText = email || ""
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    // v21: CRM upsert — the nominating resident (when they left an email)
    if (emailText) {
      void upsertHubSpotContact({ email: emailText, form: "Nomination", notes: `Nominated: ${businessName}${noteText ? " — " + noteText : ""}`, lifecycle: "subscriber" })
    }

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
        replyTo: emailText || "aloha@islandmailer.com",
        subject: `🌟 Local business nomination: ${businessName}`,
        html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:0;color:#F5F4EF;font-size:26px;font-weight:700;">🌟 Local business nomination</h1>
          <p style="margin:8px 0 0;color:#D5C1AA;font-size:14px;">${timestamp}</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:12px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:15px;font-weight:700;">${businessName}</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Business</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${businessName}</td></tr>
            ${emailText ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Submitter Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="mailto:${emailText}" style="color:#A37C4F;font-size:14px;">${emailText}</a></td></tr>` : ""}
          </table>
          ${noteText ? `<div style="margin-top:20px;"><h2 style="margin:0 0 10px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">What they love / offer wanted</h2><p style="margin:0;background:#0f1923;border-left:3px solid #A37C4F;padding:12px 16px;color:#D5C1AA;font-size:14px;border-radius:0 8px 8px 0;">${noteText}</p></div>` : ""}
        </td></tr>
        <tr><td style="background:#0f1923;border-radius:0 0 16px 16px;padding:20px;text-align:center;border-top:1px solid rgba(163,124,79,0.2);">
          <p style="margin:0;color:rgba(163,124,79,0.4);font-size:11px;">Island Mailer · Support Local. Live Hawaii. · islandmailer.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
      })

      // Friendly confirmation to the submitter (only if they shared an email)
      if (emailText) {
        try {
          await resend.emails.send({
            from: "Island Mailer <aloha@mail.islandmailer.com>",
            to: [emailText],
            replyTo: "aloha@islandmailer.com",
            subject: `Mahalo for the nomination! 🤙🏾 — Island Mailer`,
            html: `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;border-bottom:2px solid #A37C4F;">
          <p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
          <h1 style="margin:12px 0 8px;color:#F5F4EF;font-size:28px;font-weight:700;">Mahalo! 🤙🏾</h1>
          <p style="margin:0;color:#D5C1AA;font-size:16px;">We got your nomination.</p>
        </td></tr>
        <tr><td style="background:#A37C4F;padding:14px 32px;text-align:center;">
          <p style="margin:0;color:#1F2735;font-size:14px;font-weight:700;letter-spacing:1px;">Support Local. Live Hawaii.</p>
        </td></tr>
        <tr><td style="background:#1F2735;padding:36px 32px;">
          <p style="margin:0 0 20px;color:#F5F4EF;font-size:16px;line-height:1.6;">Thanks for telling us about <strong style="color:#A37C4F;">${businessName}</strong>! We&apos;ll reach out and try to bring your favorite onto a future Island Mailer.</p>
          <p style="margin:0;color:#D5C1AA;font-size:14px;line-height:1.6;">Questions? Just reply, or reach us at <a href="mailto:aloha@islandmailer.com" style="color:#A37C4F;">aloha@islandmailer.com</a>.</p>
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
        } catch (err) {
          console.error("[island-mailer] Nominate confirmation failed (non-fatal):", err)
        }
      }

      console.log("[island-mailer] Nomination email sent for:", businessName)
    }

    // ─── Google Sheets Logging (non-blocking) ─────────────────────────────────
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: businessName,
          notes: noteText,
          email: emailText,
          leadSource: "Nomination",
          timestamp,
        }),
      }).catch((err) => console.error("[island-mailer] Nominate Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Nomination received" })
  } catch (error) {
    console.error("[island-mailer] Nominate API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
