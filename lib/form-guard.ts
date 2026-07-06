/*
 * form-guard.ts (v21) — shared bot/spam protection for ALL form APIs.
 * Mirrors the protections first shipped on /api/waitlist (Jul 5) so every
 * endpoint behaves the same:
 *   1. Honeypot: hidden field bots fill → fake 200 success, nothing processed.
 *   2. Rate limiting per IP per route bucket (in-memory; per serverless
 *      instance, i.e. a soft limit — upgrade to KV if spam escalates).
 *   3. Email format validation + disposable-domain blocklist.
 * Also returns request metadata (ip hash, source, user agent) for Sheets logging.
 */
import { NextResponse } from "next/server"
import { createHash } from "crypto"

const rateLimitMap = new Map<string, number[]>()

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.info", "guerrillamailblock.com",
  "temp-mail.org", "throwaway.email", "yopmail.com", "tempmail.com", "fakeinbox.com",
  "mailnull.com", "spamgourmet.com", "trashmail.com", "trashmail.at", "trashmail.io",
  "trashmail.me", "trashmail.net", "mailexpire.com", "dispostable.com", "spamfree24.org",
  "tempemail.net", "discard.email", "sharklasers.com", "grr.la", "spam4.me",
  "tempinbox.com", "mailnesia.com", "maildrop.cc", "getnada.com", "zetmail.com",
  "mailtemp.net", "temp-mail.io", "tmail.io", "moakt.com", "getairmail.com",
])

export interface GuardMeta {
  ip: string
  ipHash: string
  source: string
  userAgent: string
}

export interface GuardOptions {
  /** Route bucket name so each form has its own rate-limit pool. */
  bucket: string
  /** Max submissions per IP per window (default 3). */
  limit?: number
  /** Window in ms (default 1 hour). */
  windowMs?: number
  /** Value of the honeypot field from the request body (if the form has one). */
  honeypot?: unknown
  /** Email to validate (format + disposable domains). */
  email?: unknown
  /** Fake success payload returned on honeypot hits (default generic). */
  fakeSuccessMessage?: string
}

export interface GuardResult {
  /** If set, return this response immediately — the request was blocked. */
  blocked: NextResponse | null
  meta: GuardMeta
}

function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const hits = (rateLimitMap.get(key) ?? []).filter((t) => now - t < windowMs)
  if (hits.length >= limit) return true
  hits.push(now)
  rateLimitMap.set(key, hits)
  return false
}

export function guardRequest(request: Request, opts: GuardOptions): GuardResult {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  const meta: GuardMeta = {
    ip,
    ipHash: ip !== "unknown" ? createHash("sha256").update(ip).digest("hex") : "unknown",
    source: request.headers.get("referer") || request.headers.get("origin") || "direct",
    userAgent: request.headers.get("user-agent") || "",
  }

  // 1. Honeypot — fake success so bots don't retry; nothing gets processed.
  if (typeof opts.honeypot === "string" && opts.honeypot.trim().length > 0) {
    console.log(`[island-mailer] Honeypot triggered on ${opts.bucket} — bot blocked`)
    return {
      blocked: NextResponse.json({
        success: true,
        message: opts.fakeSuccessMessage ?? "Submitted successfully",
      }),
      meta,
    }
  }

  // 2. Rate limit
  const limit = opts.limit ?? 3
  const windowMs = opts.windowMs ?? 60 * 60 * 1000
  if (isRateLimited(`${opts.bucket}:${ip}`, limit, windowMs)) {
    return {
      blocked: NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      ),
      meta,
    }
  }

  // 3. Email checks (only when the route passes an email in)
  if (typeof opts.email === "string" && opts.email.length > 0) {
    if (!EMAIL_REGEX.test(opts.email)) {
      return {
        blocked: NextResponse.json(
          { success: false, error: "Please enter a valid email address." },
          { status: 400 }
        ),
        meta,
      }
    }
    const domain = opts.email.split("@")[1]?.toLowerCase()
    if (domain && DISPOSABLE_DOMAINS.has(domain)) {
      return {
        blocked: NextResponse.json(
          { success: false, error: "Please use a permanent email address." },
          { status: 400 }
        ),
        meta,
      }
    }
  }

  return { blocked: null, meta }
}
