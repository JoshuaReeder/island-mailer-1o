import { NextResponse } from "next/server"
import { Resend } from "resend"

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
    } = body

    // Validate required fields
    if (!name || !businessName || !phone || !email || !businessType || !industryCategory || !mailings) {
      return NextResponse.json({ success: false, error: "Please fill in all required fields." }, { status: 400 })
    }

    const areasText = Array.isArray(areas) && areas.length > 0 ? areas.join(", ") : "Not specified"
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)

      // ── 1. Notify YOU of the new lead ──────────────────────────────────
      await resend.emails.send({
        from: "Island Mailer <aloha@islandmailer.com>",
        to: [process.env.NOTIFICATION_EMAIL || "aloha@islandmailer.com"],
        replyTo: email,
        subject: `🔔 New Lead: ${businessName} — ${industryCategory}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1F2735; color: #F5F0E8; padding: 32px; border-radius: 12px;">
            <h2 style="color: #C9A84C; margin-top: 0;">🔔 New Ad Space Inquiry</h2>
            <p style="color: #D4C5A0; font-size: 14px; margin-top: 0;">Submitted: ${timestamp} (Hawaii Time)</p>
            <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold; width: 40%;">Name</td><td style="color: #F5F0E8;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Business</td><td style="color: #F5F0E8;">${businessName}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Phone</td><td style="color: #F5F0E8;"><a href="tel:${phone}" style="color: #C9A84C;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Email</td><td style="color: #F5F0E8;"><a href="mailto:${email}" style="color: #C9A84C;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Website/IG</td><td style="color: #F5F0E8;">${website || "Not provided"}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Business Type</td><td style="color: #F5F0E8;">${businessType}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Industry</td><td style="color: #F5F0E8;">${industryCategory}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Mailings</td><td style="color: #F5F0E8;">${mailings}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold;">Areas</td><td style="color: #F5F0E8;">${areasText}</td></tr>
              <tr><td style="padding: 8px 0; color: #C9A84C; font-weight: bold; vertical-align: top;">Notes</td><td style="color: #F5F0E8;">${notes || "None"}</td></tr>
            </table>
            <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />
            <p style="color: #C9A84C; font-weight: bold; font-size: 16px; margin: 0;">👉 Follow up within 24 hours!</p>
          </div>
        `,
      })

      // ── 2. Send confirmation to the LEAD ───────────────────────────────
      await resend.emails.send({
        from: "Island Mailer <aloha@islandmailer.com>",
        to: [email],
        subject: `Mahalo! We got your request 🤙 — Island Mailer`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1F2735; color: #F5F0E8; padding: 32px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #C9A84C; font-size: 28px; margin: 0;">Island Mailer</h1>
              <p style="color: #D4C5A0; margin: 4px 0 0;">Support Local. Live Hawaii. 🌺</p>
            </div>
            <hr style="border-color: rgba(201,168,76,0.2); margin: 20px 0;" />
            <h2 style="color: #F5F0E8;">Aloha ${name}! 🤙</h2>
            <p style="color: #D4C5A0; line-height: 1.6;">
              Mahalo for reaching out to Island Mailer! We received your request for
              <strong style="color: #C9A84C;">${businessName}</strong> and we're stoked to connect.
            </p>
            <div style="background: rgba(201,168,76,0.08); border: 1px solid rgba(201,168,76,0.3); border-radius: 8px; padding: 20px; margin: 24px 0;">
              <h3 style="color: #C9A84C; margin-top: 0;">Here's what happens next:</h3>
              <p style="color: #D4C5A0; margin: 8px 0;">✅ &nbsp;We'll confirm availability in your preferred area(s)</p>
              <p style="color: #D4C5A0; margin: 8px 0;">✅ &nbsp;Someone will reach out within 1 business day to talk story</p>
              <p style="color: #D4C5A0; margin: 8px 0;">✅ &nbsp;Once confirmed, we'll get your ad designed and your spot reserved for the <strong style="color: #C9A84C;">July 1st mailer</strong></p>
            </div>
            <p style="color: #D4C5A0; line-height: 1.6;">
              Ad spaces are limited and first-come, first-served by industry — so we'll move quickly for you.
            </p>
            <div style="border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
              <p style="color: #D4C5A0; margin: 0 0 12px;">Questions? Reach us at:</p>
              <p style="margin: 6px 0;"><a href="tel:+18088086245" style="color: #C9A84C; font-size: 18px; font-weight: bold;">(808) 808-6245</a></p>
              <p style="margin: 6px 0;"><a href="mailto:aloha@islandmailer.com" style="color: #C9A84C;">aloha@islandmailer.com</a></p>
              <p style="margin: 6px 0;"><a href="https://islandmailer.com" style="color: #C9A84C;">islandmailer.com</a></p>
            </div>
            <p style="color: #D4C5A0; font-size: 13px; font-style: italic;">
              No pressure, no hard sell — just real advice on whether Island Mailer is a great fit for you.
            </p>
            <hr style="border-color: rgba(201,168,76,0.2); margin: 24px 0;" />
            <p style="color: #D4C5A0; font-size: 12px; text-align: center; margin: 0;">
              © 2026 Island Mailer &nbsp;|&nbsp; Support Local. Live Hawaii.<br/>
              <a href="https://islandmailer.com" style="color: #C9A84C;">islandmailer.com</a>
            </p>
          </div>
        `,
      })

      console.log("[island-mailer] Emails sent successfully for:", businessName)
    } else {
      console.log("[island-mailer] No RESEND_API_KEY — form data received but email not sent")
      console.log("[island-mailer] Submission:", { name, businessName, phone, email, businessType, industryCategory, mailings, areas, notes })
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" })

  } catch (error) {
    console.error("[island-mailer] API error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}