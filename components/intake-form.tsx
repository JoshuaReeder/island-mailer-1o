"use client"
/*
 * intake-form.tsx — Advertiser Intake (B2, the data spine seed).
 * One form collects everything needed for: the printed ad slot, the resident
 * offer card on /local-offers + /m/[code], and the future ROI report.
 * Posts to /api/intake. GHL-ready: when GHL is live, the API route forwards there.
 */
import type React from "react"
import { useState } from "react"

const AREA_OPTIONS = ["North Shore", "Central", "West", "South", "Upcountry"]
const MONTH_OPTIONS = ["August", "September", "October", "Every month"]
const CATEGORY_OPTIONS = [
  "Restaurant", "Pizza", "Café & Coffee", "Bakery", "Sweets & Treats", "Food Truck",
  "Happy Hour", "Health", "Spa & Wellness", "Salon & Beauty", "Fitness",
  "Shop & Boutique", "Home Services", "Auto", "Activities & Fun", "Pet", "Other",
]
const PRODUCT_OPTIONS = ["Signature 9×12", "Hyper-Local 6.5×12", "Not sure yet"]

const EMPTY = {
  businessName: "",
  category: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  areas: [] as string[],
  months: [] as string[],
  product: "",
  offerHeadline: "",
  finePrint: "",
  preferredCode: "",
  linksTo: "",
  logoLink: "",
  notes: "",
}

export default function IntakeForm() {
  const [hp, setHp] = useState("")
  const [data, setData] = useState({ ...EMPTY })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ contactName: string; businessName: string } | null>(null)

  const toggle = (field: "areas" | "months", value: string) =>
    setData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, im_hp: hp }),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        setDone({ contactName: data.contactName, businessName: data.businessName })
        setData({ ...EMPTY })
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Failed to submit. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (done) {
    return (
      <div className="form-card">
        <div className="text-center py-12 px-4">
          <div
            style={{
              width: 88, height: 88, borderRadius: "50%",
              background: "rgba(163,124,79,0.15)", border: "2px solid #A37C4F",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px",
            }}
          >
            <svg width="44" height="44" fill="none" stroke="#A37C4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 style={{ color: "var(--cream)", fontSize: 30, margin: "0 0 16px" }}>
            Mahalo, {done.contactName}! Your ad details are in.
          </h3>
          <p style={{ color: "var(--sand)", fontSize: 19, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 28px" }}>
            We&apos;ll confirm <strong style={{ color: "var(--gold-bright)" }}>{done.businessName}</strong>&apos;s spot and
            category exclusivity, then send your ad proof to approve. Check your inbox for a confirmation —{" "}
            <strong style={{ color: "var(--gold-bright)" }}>reply to it with your logo &amp; any art attached</strong> and
            you&apos;re all set.
          </p>
          <a className="btn ghost" href="/advertise">Back to Advertise</a>
        </div>
      </div>
    )
  }

  return (
    <div className="form-card">
      {error && (
        <div className="mb-8 p-6 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-100">
          <p className="text-lg font-semibold">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Honeypot — invisible to humans; bots fill it and get silently rejected */}
        <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
          <input type="text" name="im_hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
        </div>
        <h3 style={{ color: "var(--gold-bright)", letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 15, margin: "0 0 18px" }}>
          1 · Your business
        </h3>
        <div className="fgroup">
          <label>Business Name</label>
          <input type="text" required value={data.businessName} onChange={(e) => setData({ ...data, businessName: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Category (one business per category, per mailer)</label>
          <select required value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })}>
            <option value="" disabled>Choose your category…</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="fgroup">
          <label>Your Name</label>
          <input type="text" required value={data.contactName} onChange={(e) => setData({ ...data, contactName: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Email</label>
          <input type="email" required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Business Phone (shown on your offer so locals can call)</label>
          <input type="tel" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Website (optional)</label>
          <input type="url" placeholder="https://" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Business address or town (for the &quot;Directions&quot; button)</label>
          <input type="text" placeholder="e.g. 123 Hāna Hwy, Pā'ia" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
        </div>

        <h3 style={{ color: "var(--gold-bright)", letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 15, margin: "38px 0 18px" }}>
          2 · Your offer
        </h3>
        <div className="fgroup">
          <label>Your offer headline (short &amp; strong — this goes on the mailer)</label>
          <input type="text" required maxLength={80} placeholder="e.g. Buy one large pizza, get one free" value={data.offerHeadline} onChange={(e) => setData({ ...data, offerHeadline: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Fine print (optional)</label>
          <input type="text" maxLength={140} placeholder="e.g. Dine-in only. One per table. Expires 8/31." value={data.finePrint} onChange={(e) => setData({ ...data, finePrint: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Preferred redeem code (optional — we can create one for you)</label>
          <input type="text" maxLength={20} placeholder="e.g. ALOHA2FOR1" value={data.preferredCode} onChange={(e) => setData({ ...data, preferredCode: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Where should your links &amp; QR taps go? (your website, Instagram, menu, booking page…)</label>
          <input type="text" placeholder="e.g. https://instagram.com/yourbusiness" value={data.linksTo} onChange={(e) => setData({ ...data, linksTo: e.target.value })} />
        </div>

        <h3 style={{ color: "var(--gold-bright)", letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 15, margin: "38px 0 18px" }}>
          3 · Placement
        </h3>
        <div className="fgroup">
          <label>Mailer areas (select all that apply)</label>
          <div className="areas">
            {AREA_OPTIONS.map((area) => (
              <label key={area} className="area-chip">
                <input type="checkbox" checked={data.areas.includes(area)} onChange={() => toggle("areas", area)} />
                {area}
              </label>
            ))}
          </div>
        </div>
        <div className="fgroup">
          <label>Months</label>
          <div className="areas">
            {MONTH_OPTIONS.map((m) => (
              <label key={m} className="area-chip">
                <input type="checkbox" checked={data.months.includes(m)} onChange={() => toggle("months", m)} />
                {m}
              </label>
            ))}
          </div>
        </div>
        <div className="fgroup">
          <label>Mailer product</label>
          <div className="areas">
            {PRODUCT_OPTIONS.map((p) => (
              <label key={p} className="area-chip">
                <input type="radio" name="product" checked={data.product === p} onChange={() => setData({ ...data, product: p })} />
                {p}
              </label>
            ))}
          </div>
        </div>

        <h3 style={{ color: "var(--gold-bright)", letterSpacing: "0.14em", textTransform: "uppercase", fontSize: 15, margin: "38px 0 18px" }}>
          4 · Art &amp; extras
        </h3>
        <div className="fgroup">
          <label>Logo / art link (optional — Google Drive, Dropbox, your website…)</label>
          <input type="text" placeholder="Paste a link, or just reply to your confirmation email with files attached" value={data.logoLink} onChange={(e) => setData({ ...data, logoLink: e.target.value })} />
        </div>
        <div className="fgroup">
          <label>Anything else? (optional)</label>
          <textarea rows={5} placeholder="Brand colors, what makes your business special, design wishes…" value={data.notes} onChange={(e) => setData({ ...data, notes: e.target.value })} />
        </div>

        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting…" : "Submit My Ad Details"}
        </button>
        <p className="form-note">
          You&apos;ll get a confirmation email right away — reply to it with your logo &amp; art attached.
        </p>
      </form>
    </div>
  )
}
