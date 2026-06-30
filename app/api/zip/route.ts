import { NextResponse } from "next/server"

/*
 * /api/zip — logs every ZIP-code lookup from the Local Offers gate.
 *
 * Receives { zip, area?, ts? }, maps the ZIP to a known Maui area label,
 * forwards the lookup to Google Sheets (env-guarded, leadSource "ZIP Lookup"),
 * and returns { ok, area }. Never blocks the UI. This data feeds which ZIPs
 * are entered most/least so we know where demand is strongest.
 */

const ZIP_AREAS: Record<string, string> = {
  "96779": "Pā'ia / North Shore",
  "96708": "Haʻikū",
  "96768": "Makawao / Upcountry",
  "96732": "Kahului / Central",
  "96793": "Wailuku / Central",
  "96761": "Lahaina / West",
  "96753": "Kīhei / South",
}

export function areaForZip(zip: string): string {
  return ZIP_AREAS[zip] ?? "your area"
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const zip = typeof body.zip === "string" ? body.zip.trim() : ""
    const area = areaForZip(zip)
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Pacific/Honolulu" })

    console.log("[island-mailer] zip lookup:", { zip, area, timestamp })

    const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL
    if (webhook && zip) {
      // non-blocking
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zip,
          area,
          leadSource: "ZIP Lookup",
          timestamp,
        }),
      }).catch((err) => console.error("[island-mailer] zip Sheets logging failed (non-fatal):", err))
    }

    return NextResponse.json({ ok: true, area })
  } catch (error) {
    console.error("[island-mailer] zip API error:", error)
    // Still return ok so the gate never traps the visitor.
    return NextResponse.json({ ok: true, area: "your area" }, { status: 200 })
  }
}
