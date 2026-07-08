"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import EmailOptin from "@/components/email-optin"
import type { MailerData } from "@/lib/offers-data"
import CategoryIcon from "@/components/icons"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const ZIP_KEY = "im_home_zip"

/* Known Maui ZIP → friendly area label. Keep in sync with /api/zip. */
const ZIP_AREAS: Record<string, string> = {
  "96779": "North Shore",
  "96708": "Haʻikū",
  "96768": "Upcountry",
  "96732": "Central Maui",
  "96793": "Central Maui",
  "96761": "West Maui",
  "96753": "South Maui",
}

function areaLabelForZip(zip: string): string {
  return ZIP_AREAS[zip] ?? "your area"
}

/* Mailer-proportioned placeholder slots — one printed side of the 9×12 mailer
   is a 2-col × 4-row block of ad spaces (8 slots), shown in printed order.
   NO real business identities — advertisers aren't locked yet. */
const PLACEHOLDER_SLOTS: { n: number; icon: string; cat: string }[] = [
  { n: 1, icon: "🍕", cat: "Restaurant" },
  { n: 2, icon: "☕", cat: "Café & Coffee" },
  { n: 3, icon: "🍦", cat: "Sweets & Treats" },
  { n: 4, icon: "💆", cat: "Spa & Wellness" },
  { n: 5, icon: "✂️", cat: "Salon & Beauty" },
  { n: 6, icon: "🛍️", cat: "Shop & Boutique" },
  { n: 7, icon: "🔧", cat: "Home Services" },
  { n: 8, icon: "🤿", cat: "Activities & Fun" },
]

/* GA4 + lightweight server beacon. Never blocks the UI. */
function track(event: string, payload: Record<string, unknown>) {
  try {
    window.gtag?.("event", event, payload)
  } catch {
    /* noop */
  }
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, ...payload }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* noop */
  }
}

export default function OffersExperience({ data }: { data: MailerData }) {
  const [revealed, setRevealed] = useState(false)
  const [dissolving, setDissolving] = useState(false)
  const [zip, setZip] = useState("")
  const [zipError, setZipError] = useState<string | null>(null)
  const [areaLabel, setAreaLabel] = useState<string>(data.area)

  /* Skip the gate for returning visitors who already entered a ZIP. */
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(ZIP_KEY)
      if (saved) {
        setRevealed(true)
        setAreaLabel(areaLabelForZip(saved))
      }
    } catch {
      /* noop */
    }
  }, [])

  /* scroll-reveal (matches the home) */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    if (!("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.14 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [revealed])

  const handleZipSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      setZipError(null)
      const clean = zip.trim()
      // Valid-format Hawaii ZIP: 5 digits, ideally starting 967/968.
      if (!/^\d{5}$/.test(clean)) {
        setZipError("Please enter a 5-digit ZIP code.")
        return
      }
      if (!/^96[78]\d{2}$/.test(clean)) {
        setZipError("That doesn't look like a Hawaii ZIP. Double-check and try again.")
        return
      }

      const label = areaLabelForZip(clean)
      setAreaLabel(label)

      // Persist so returning visitors skip the gate.
      try {
        window.localStorage.setItem(ZIP_KEY, clean)
      } catch {
        /* noop */
      }

      // Log + track every ZIP input.
      track("zip_lookup", { zip: clean, area: label })
      fetch("/api/zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zip: clean, area: label, ts: Date.now() }),
        keepalive: true,
      }).catch(() => {})

      // Dissolve the gate, then reveal (respect reduced motion via CSS).
      setDissolving(true)
      window.setTimeout(() => setRevealed(true), 620)
    },
    [zip],
  )

  return (
    <div className="min-h-screen home-resident offers-page" style={{ background: "var(--navy)" }}>
      {/* HERO */}
      <div className="hero" id="top">
        <div className="overlay" />
        <div className="content">
          <div className="logo-lockup">
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." />
            <span className="tag-fix" />
          </div>
          <p className="crumb" style={{ marginTop: 24 }}>
            <a href="/">Island Mailer</a> · Local Offers
          </p>
          <span className="month-pill" style={{ marginTop: 8 }}>
            {revealed ? `${areaLabel} · ` : ""}
            {data.monthLabel}
          </span>
          <h1>
            <span className="accent">{revealed ? `${areaLabel} ` : "Your area's "}</span>local offers,{" "}
            <span className="h1b">scan the mailer QR, save your favorites, redeem around {data.island}</span>
          </h1>
          <p className="subhead">
            Every offer from the local businesses on your Island Mailer — gathered in one spot. Save the ones you love,
            then show your phone to redeem.
          </p>
          <div className="ctas">
            <a className="btn" href="#offers">See the Offers</a>
            <a className="btn ghost" href="#optin">August mailer coming up next →</a>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS (animated flow) */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">From mailbox to your favorite spots</h2>
          <div className="flow">
            <div className="flowline" aria-hidden />
            <div className="fstep reveal">
              <div className="fic">📬</div>
              <span className="fn">Step 1</span>
              <h3>Get the mailer &amp; scan</h3>
              <p>Scan the QR on your Island Mailer postcard — every offer opens right on your phone.</p>
            </div>
            <div className="fstep reveal">
              <div className="fic">🔖</div>
              <span className="fn">Step 2</span>
              <h3>Browse &amp; save</h3>
              <p>Tap the star to save the deals you want. They stay here, ready when you need them.</p>
            </div>
            <div className="fstep reveal">
              <div className="fic">🤝</div>
              <span className="fn">Step 3</span>
              <h3>Show &amp; redeem</h3>
              <p>Get the code, show your phone at the local business, and enjoy — while supporting local.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFERS GRID — gated by ZIP */}
      <section className="shimmer" id="offers">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">{revealed ? `${areaLabel} offers` : "This area's offers"}</h2>
          <p className="lead reveal">
            {revealed
              ? "These ad slots mirror your printed Island Mailer — one business per category, in print order."
              : "Enter your home ZIP code to see the offers for your area."}
          </p>

          {revealed && (
            <p className="offers-note reveal">
              Offers for your area drop with the August mailer —{" "}
              <a href="#optin">get notified</a>.
            </p>
          )}

          {/* gate wrapper: grid is blurred + dimmed until a valid ZIP dissolves it */}
          <div className={`gate-wrap${revealed ? " open" : ""}${dissolving ? " dissolving" : ""}`}>
            <div className="mailer-slots" aria-hidden={!revealed}>
              {PLACEHOLDER_SLOTS.map((slot) => (
                <div className="slot-card" key={slot.n}>
                  <span className="slot-num">{slot.n}</span>
                  <span className="slot-ic" aria-hidden><CategoryIcon name={slot.cat} size={34} /></span>
                  <span className="slot-cat">{slot.cat}</span>
                  <span className="slot-status">Offer coming soon</span>
                </div>
              ))}
            </div>

            {!revealed && (
              <div className="gate-overlay" role="dialog" aria-label="Enter your ZIP code">
                <form className="gate-card" onSubmit={handleZipSubmit}>
                  <span className="gate-pill">📍 Local Offers</span>
                  <h3>Enter your home ZIP code to see this area&apos;s offers.</h3>
                  <p className="gate-sub">We&apos;ll show the ad slots for your Island Mailer area.</p>
                  <div className="gate-row">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      aria-label="Home ZIP code"
                      placeholder="e.g. 96779"
                      value={zip}
                      onChange={(e) => setZip(e.target.value.replace(/[^0-9]/g, ""))}
                    />
                    <button className="btn" type="submit">See Offers</button>
                  </div>
                  {zipError && (
                    <p className="gate-err" role="alert">{zipError}</p>
                  )}
                </form>
              </div>
            )}
          </div>

          {revealed && (
            <div className="offers-optin reveal">
              <p className="offers-optin-h">Get notified when {areaLabel} offers go live</p>
              <EmailOptin source={`local-offers-zip:${(typeof window !== "undefined" && window.localStorage.getItem(ZIP_KEY)) || ""}`} variant="footer" />
            </div>
          )}
        </div>
      </section>

      {/* EMAIL OPT-IN */}
      <section className="bg-navy2" id="optin">
        <div className="container">
          <div className="optin reveal">
            <span className="im-pill">August mailer coming up next</span>
            <h2>Never miss the next drop</h2>
            <p className="lead">
              Get a heads-up the moment fresh offers land in your area each month — free for residents, always.
            </p>
            <EmailOptin source="local-offers" />
            <p className="fine">No spam, just local deals. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* FOR BUSINESSES cross-link */}
      <section className="bizband" id="business">
        <div className="container">
          <div className="bizwrap reveal">
            <p className="bizeyebrow">For Local Business Owners</p>
            <h2>Want your offer in here?</h2>
            <p className="bz">
              Get in front of thousands of local households on your island&apos;s community mailer — and right here in
              Local Offers, where locals are already looking.
            </p>
            <a className="btn" href="/advertise">Get Your Business Featured →</a>
          </div>
        </div>
      </section>

      <Footer variant="simple" />
      <FloatingMenu />
    </div>
  )
}
