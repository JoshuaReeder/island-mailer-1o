"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import EmailOptin from "@/components/email-optin"
import type { MailerData } from "@/lib/offers-data"
import CategoryIcon from "@/components/icons"

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
const PLACEHOLDER_SLOTS: { n: number; cat: string }[] = [
  { n: 1, cat: "Restaurant" },
  { n: 2, cat: "Café & Coffee" },
  { n: 3, cat: "Sweets & Treats" },
  { n: 4, cat: "Spa & Wellness" },
  { n: 5, cat: "Salon & Beauty" },
  { n: 6, cat: "Shop & Boutique" },
  { n: 7, cat: "Home Services" },
  { n: 8, cat: "Activities & Fun" },
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
    <div className="min-h-screen home-resident offers-page" id="top" style={{ background: "var(--navy)" }}>
      {/* HOW IT WORKS (animated flow) */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">From mailbox to your favorite spots</h2>
          <div className="flow">
            <div className="flowline" aria-hidden />
            <div className="fstep reveal">
              <div className="fic" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M4 10c0-3 2.5-5 6-5h4c3.5 0 6 2 6 5v8H4ZM4 18h16M8 21v-3M16 21v-3M20 8l1.5-.5" /></svg>
              </div>
              <span className="fn">Step 1</span>
              <h3>Get the mailer &amp; scan</h3>
              <p>Scan the QR on your Island Mailer postcard — every offer opens right on your phone.</p>
            </div>
            <div className="fstep reveal">
              <div className="fic" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4Z" /></svg>
              </div>
              <span className="fn">Step 2</span>
              <h3>Browse &amp; save</h3>
              <p>Tap the star to save the deals you want. They stay here, ready when you need them.</p>
            </div>
            <div className="fstep reveal">
              <div className="fic" aria-hidden>
                <svg viewBox="0 0 24 24"><path d="M12 21C7 17 4 13.5 4 9.8 4 7 6 5 8.5 5c1.4 0 2.7.7 3.5 1.8C12.8 5.7 14.1 5 15.5 5 18 5 20 7 20 9.8c0 3.7-3 7.2-8 11.2Z" /></svg>
              </div>
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
              Offers for your area drop with the fall mailers —{" "}
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
                  <span className="gate-pill">Local Offers</span>
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

      {/* AREAS — five local markets (fall series) */}
      <section className="bg-navy2" id="areas">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">One island. Five local markets.</h2>
          <p className="lead reveal">
            Seasonal mailers featuring trusted local businesses and offers for Maui households — starting North Shore,
            then rolling across the island. Sign up and we&apos;ll tell you when yours is next.
          </p>
          <div className="fallgrid">
            <div className="fallcard live reveal">
              <h3>North Shore</h3>
              <p>PĀʻIA · HAʻIKŪ · KUʻAU</p>
              <span className="falllbl">FALL MAILERS</span>
              <span className="fallmonths">September ~ October ~ November</span>
              <span className="fallst">Coming Soon</span>
            </div>
            <div className="fallcard reveal">
              <h3>Central</h3>
              <p>KAHULUI · WAILUKU</p>
              <a className="fallst" href="#optin">Sign Up Now</a>
            </div>
            <div className="fallcard reveal">
              <h3>Upcountry</h3>
              <p>MAKAWAO · KULA · PUKALANI</p>
              <a className="fallst" href="#optin">Sign Up Now</a>
            </div>
            <div className="fallcard reveal">
              <h3>South Side</h3>
              <p>KĪHEI · WAILEA · MĀKENA</p>
              <a className="fallst" href="#optin">Sign Up Now</a>
            </div>
            <div className="fallcard reveal">
              <h3>West Side</h3>
              <p>LAHAINA · KĀʻANAPALI</p>
              <a className="fallst" href="#optin">Sign Up Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* INSIDE EVERY MAILER */}
      <section id="inside">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">Why neighbors keep it on the counter</h2>
          <div className="insgrid">
            <div className="inscard reveal">
              <span className="insbig">16</span>
              <h3>Hand-picked local businesses</h3>
              <p>One per category — restaurants, salons, home services, activities and more. The good ones.</p>
            </div>
            <div className="inscard reveal">
              <span className="insbig">100%</span>
              <h3>Real-value offers</h3>
              <p>Every spot on the card carries a genuine offer — not filler. If it&apos;s on the mailer, it&apos;s worth your time.</p>
            </div>
            <div className="inscard reveal">
              <span className="insbig">1</span>
              <h3>QR to everything</h3>
              <p>Scan once and every offer is on your phone — save your favorites, show &amp; redeem around Maui.</p>
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
            <a className="btn" href="#optin">Get the Offers</a>
          </div>
        </div>
      </section>

      {/* EMAIL OPT-IN */}
      <section className="bg-navy2" id="optin">
        <div className="container">
          <div className="optin reveal">
            <span className="im-pill">Fall Local Deals — Coming Soon</span>
            <h2>Never miss the deals</h2>
            <p className="lead">
              Island Mailer is preparing our next series of local deals, offers, and featured Maui businesses for
              households across the island. Sign up and we&apos;ll tell you the moment fall mailers land in (or near)
              your area.
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
