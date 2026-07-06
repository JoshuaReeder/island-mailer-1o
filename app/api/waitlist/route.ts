import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createHash } from "crypto"

// ─── Rate Limiting (in-memory, resets on cold start) ─────────────────────────
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateLimitMap.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (hits.length >= RATE_LIMIT_MAX) return true
  hits.push(now)
  rateLimitMap.set(ip, hits)
  return false
}

// ─── Disposable Email Domains ─────────────────────────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.info", "guerrillamailblock.com",
  "temp-mail.org", "throwaway.email", "yopmail.com", "tempmail.com", "fakeinbox.com",
  "mailnull.com", "spamgourmet.com", "trashmail.com", "trashmail.at", "trashmail.io",
  "trashmail.me", "trashmail.net", "mailexpire.com", "dispostable.com", "spamfree24.org",
  "tempemail.net", "discard.email", "sharklasers.com", "grr.la", "spam4.me",
  "tempinbox.com", "mailnesia.com", "maildrop.cc", "getnada.com", "zetmail.com",
  "mailtemp.net", "temp-mail.io", "tmail.io", "moakt.com", "getairmail.com",
])

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(request: Request) {
  try {
    // ─── Rate Limiting ──────────────────────────────────────────────────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown"
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, businessName, island, area, website } = body

    // ─── Honeypot Check ─────────────────────────────────────────────────────
    // Bots fill all form fields; real users never see or touch this hidden field.
    // Return fake 200 success so bots don't retry.
    if (website && String(website).trim().length > 0) {
      console.log("[island-mailer] Honeypot triggered — bot submission blocked")
  
    // ─── HubSpot CRM Contact (non-blocking upsert) ────────────────────────────
    if (process.env.HUBSPOT_API_KEY) {
      try {
        const nameParts = String(name).trim().split(/\s+/)
        const firstName = nameParts[0] ?? ""
        const lastName = nameParts.slice(1).join(" ") || ""
        await fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            inputs: [{
              idProperty: "email",
              id: email,
              properties: {
                email,
                firstname: firstName,
                lastname: lastName,
                phone: phone || "",
                company: businessName || "",
                hs_lead_status: "NEW",
                lifecyclestage: "lead",
                island_mailer_waitlist: "true",
                island_mailer_island: island,
                island_mailer_area: area || "",
              },
            }],
          }),
        })
        console.log("[island-mailer] HubSpot contact upserted for:", email)
      } catch (err) {
        console.error("[island-mailer] HubSpot contact upsert error (non-fatal):", err)
      }
    }

    return NextResponse.json({ success: true, message: "Waitlist signup successful" })
    }

    // ─── Required Fields ─────────────────────────────────────────────────────
    if (!name || !email || !island) {
      return NextResponse.json(
        { success: false, error: "Please fill in your name, email, and island." },
        { status: 400 }
      )
    }

    // ─── Email Format Validation ─────────────────────────────────────────────
    if (!EMAIL_REGEX.test(String(email))) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    // ─── Disposable Email Check ──────────────────────────────────────────────
    const emailDomain = String(email).split("@")[1]?.toLowerCase()
    if (emailDomain && DISPOSABLE_DOMAINS.has(emailDomain)) {
      return NextResponse.json(
        { success: false, error: "Please use a permanent email address." },
        { status: 400 }
      )
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })
    const source = request.headers.get("referer") || request.headers.get("origin") || "direct"
    const userAgent = request.headers.get("user-agent") || ""
    const ipHash = ip !== "unknown"
      ? createHash("sha256").update(ip).digest("hex")
      : "unknown"

    const row = (label: string, value?: string) =>
      value
        ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">${label}</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#F5F4EF;font-size:14px;">${value}</td></tr>`
        : ""

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

      // Internal waitlist notification
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: notificationRecipients,
        replyTo: email,
        subject: `🌊 New Waitlist Signup: ${island}${area ? " · " + area : ""}`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:2px solid #A37C4F;">
<p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
<h1 style="margin:0;color:#F5F4EF;font-size:26px;font-weight:700;">🌊 New Waitlist Signup</h1>
<p style="margin:8px 0 0;color:#D5C1AA;font-size:14px;">${timestamp}</p>
</td></tr>
<tr><td style="background:#A37C4F;padding:12px 32px;text-align:center;">
<p style="margin:0;color:#1F2735;font-size:15px;font-weight:700;">${name} wants Island Mailer in ${island}${area ? " · " + area : ""}</p>
</td></tr>
<tr><td style="background:#1F2735;padding:32px;">
<h2 style="margin:0 0 20px;color:#A37C4F;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-bottom:1px solid rgba(163,124,79,0.2);padding-bottom:10px;">Waitlist Details</h2>
<table width="100%" cellpadding="0" cellspacing="0">
${row("Name", name)}
<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;width:40%;">Email</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="mailto:${email}" style="color:#A37C4F;font-size:14px;">${email}</a></td></tr>
${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);color:#D5C1AA;font-size:13px;font-weight:600;">Phone</td><td style="padding:8px 0;border-bottom:1px solid rgba(163,124,79,0.1);"><a href="tel:${phone}" style="color:#A37C4F;font-size:14px;">${phone}</a></td></tr>` : ""}
${row("Business", businessName)}
${row("Island", island)}
${row("Area / Town", area)}
${row("Submitted", timestamp)}
</table>
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

      // Confirmation to the submitter
      await resend.emails.send({
        from: "Island Mailer <aloha@mail.islandmailer.com>",
        to: [email],
        replyTo: "aloha@islandmailer.com",
        subject: `You're on the list! 🤙🏾 — Island Mailer`,
        html: `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0f1923;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1923;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="background:linear-gradient(135deg,#1F2735 0%,#2a3547 100%);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center;border-bottom:2px solid #A37C4F;">
<p style="margin:0 0 4px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;">Island Mailer</p>
<h1 style="margin:12px 0 8px;color:#F5F4EF;font-size:28px;font-weight:700;">You're on the list, ${name}! 🤙🏾</h1>
<p style="margin:0;color:#D5C1AA;font-size:16px;">Mahalo for raising your hand.</p>
</td></tr>
<tr><td style="background:#A37C4F;padding:14px 32px;text-align:center;">
<p style="margin:0;color:#1F2735;font-size:14px;font-weight:700;letter-spacing:1px;">Support Local. Live Hawaii.</p>
</td></tr>
<tr><td style="background:#1F2735;padding:36px 32px;">
<p style="margin:0 0 20px;color:#F5F4EF;font-size:16px;line-height:1.6;">We&apos;ll notify you the moment Island Mailer schedules a mailer in <strong style="color:#A37C4F;">${island}${area ? " · " + area : ""}</strong>. Your interest helps us decide where to launch next — so mahalo for putting your area on the map.</p>
<div style="background:rgba(163,124,79,0.1);border:1px solid rgba(163,124,79,0.3);border-radius:12px;padding:24px;margin-bottom:28px;">
<p style="margin:0 0 14px;color:#A37C4F;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">What This Means For You</p>
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td style="padding:8px 0;vertical-align:top;width:28px;color:#A37C4F;font-size:16px;font-weight:700;">①</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">You&apos;ll be the first to hear when we launch in your area</td></tr>
<tr><td style="padding:8px 0;vertical-align:top;color:#A37C4F;font-size:16px;font-weight:700;">②</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">You&apos;ll get first pick of ad space — one business per industry</td></tr>
<tr><td style="padding:8px 0;vertical-align:top;color:#A37C4F;font-size:16px;font-weight:700;">③</td><td style="padding:8px 0;color:#D5C1AA;font-size:14px;line-height:1.5;">You&apos;re helping bring affordable local advertising to your town</td></tr>
</table>
</div>
<p style="margin:0;color:#D5C1AA;font-size:14px;line-height:1.6;">Have a question in the meantime? Just reply to this email or reach us at <a href="mailto:aloha@islandmailer.com" style="color:#A37C4F;">aloha@islandmailer.com</a>.</p>
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

      console.log("[island-mailer] Waitlist emails sent for:", email)
    }

    // ─── Google Sheets Logging (non-blocking) ─────────────────────────────────
    const sheetsWebhookUrl =
      process.env.WAITLIST_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (sheetsWebhookUrl) {
      fetch(sheetsWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || "",
          businessName: businessName || "",
          island,
          area: area || "",
          leadSource: "Waitlist",
          timestamp,
          source,
          userAgent,
          ip_hash: ipHash,
        }),
      }).catch((err) => console.error("[island-mailer] Waitlist Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ success: true, message: "Waitlist signup successful" })
  } catch (error) {
    console.error("[island-mailer] Waitlist API error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
