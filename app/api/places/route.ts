import { NextResponse } from "next/server"

/**
 * Google Places Autocomplete (New) proxy.
 * Keeps the API key server-side. The nominate form calls /api/places?q=...
 * and gets back a small list of { description, placeId } suggestions,
 * biased to Hawaii.
 *
 * ENV: GOOGLE_MAPS_API_KEY  (server-only)
 *   - Enable "Places API (New)" + billing in Google Cloud.
 *   - Restrict the key by IP (server) for safety.
 *
 * GRACEFUL FALLBACK: if the key is missing, we return { configured: false }
 * with an empty list so the form quietly falls back to free-text entry and
 * never breaks.
 */

// Rough bounding circle over the Hawaiian Islands (center ~Maui, radius ~500km
// covers Kauai → Big Island) to bias/keep results local.
const HAWAII_CENTER = { latitude: 20.7984, longitude: -156.3319 }
const HAWAII_RADIUS_M = 500000

export async function GET(request: Request) {
  // v21: rate limit protects the Google Places API quota/key
  const guard = guardRequest(request, { bucket: "places", limit: 120 })
  if (guard.blocked) return guard.blocked

  const { searchParams } = new URL(request.url)
  const q = (searchParams.get("q") || "").trim()

  const key = process.env.GOOGLE_MAPS_API_KEY
  if (!key) {
    return NextResponse.json({ configured: false, suggestions: [] })
  }
  if (q.length < 2) {
    return NextResponse.json({ configured: true, suggestions: [] })
  }

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": key,
      },
      body: JSON.stringify({
        input: q,
        includedPrimaryTypes: ["establishment"],
        includedRegionCodes: ["us"],
        locationBias: {
          circle: { center: HAWAII_CENTER, radius: HAWAII_RADIUS_M },
        },
      }),
      // Autocomplete is fast; don't let a slow upstream hang the form.
      cache: "no-store",
    })

    if (!res.ok) {
      // Soft-fail: let the form fall back to free text.
      return NextResponse.json({ configured: true, suggestions: [], error: "upstream" })
    }

    const data = await res.json()
    const suggestions = (data.suggestions || [])
      .map((s: any) => s.placePrediction)
      .filter(Boolean)
      .slice(0, 6)
      .map((p: any) => ({
        placeId: p.placeId as string,
        primary: p.structuredFormat?.mainText?.text || p.text?.text || "",
        secondary: p.structuredFormat?.secondaryText?.text || "",
        description: p.text?.text || "",
      }))

    return NextResponse.json({ configured: true, suggestions })
  } catch {
    return NextResponse.json({ configured: true, suggestions: [], error: "fetch" })
  }
}
