import { NextResponse } from "next/server"

/*
 * Lightweight tracking endpoint for the Local Offers experience.
 * Receives { event, offerId, area } and logs it. Optionally forwards to a
 * Google Sheets webhook if OFFERS_TRACK_WEBHOOK_URL (or GOOGLE_SHEETS_WEBHOOK_URL)
 * is set. Always returns { ok: true } fast and never blocks the UI.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const event = typeof body.event === "string" ? body.event : "unknown"
    const offerId = typeof body.offerId === "string" ? body.offerId : ""
    const area = typeof body.area === "string" ? body.area : ""
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    console.log("[island-mailer] offer track:", { event, offerId, area, timestamp })

    const webhook = process.env.OFFERS_TRACK_WEBHOOK_URL || process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (webhook) {
      // non-blocking
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "offer_track", event, offerId, area, timestamp }),
      }).catch((err) => console.error("[island-mailer] offer track webhook failed (non-fatal):", err))
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[island-mailer] track API error:", error)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
