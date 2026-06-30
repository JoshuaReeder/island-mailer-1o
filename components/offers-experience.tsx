"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import EmailOptin from "@/components/email-optin"
import type { MailerData, Offer } from "@/lib/offers-data"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/* GA4 event + lightweight server beacon. Never blocks the UI. */
function track(event: string, offerId: string, area: string) {
  try {
    window.gtag?.("event", event, { offer_id: offerId, area })
  } catch {
    /* noop */
  }
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, offerId, area }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* noop */
  }
}

const SAVED_KEY = "im_saved_offers"
const REDEEMED_KEY = "im_redeemed_offers"

function loadSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = window.localStorage.getItem(key)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

function saveSet(key: string, set: Set<string>) {
  try {
    window.localStorage.setItem(key, JSON.stringify([...set]))
  } catch {
    /* noop */
  }
}

interface OfferCardProps {
  offer: Offer
  area: string
  saved: boolean
  redeemed: boolean
  onToggleSave: (offer: Offer) => void
  onRedeem: (offer: Offer) => void
  onWallet: (offer: Offer) => void
}

function OfferCard({ offer, area, saved, redeemed, onToggleSave, onRedeem, onWallet }: OfferCardProps) {
  const [showCode, setShowCode] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const viewedRef = useRef(false)

  /* fire offer_view once when the card scrolls into view */
  useEffect(() => {
    const el = ref.current
    if (!el || viewedRef.current) return
    if (!("IntersectionObserver" in window)) {
      viewedRef.current = true
      track("offer_view", offer.id, area)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !viewedRef.current) {
            viewedRef.current = true
            track("offer_view", offer.id, area)
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [offer.id, area])

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.mapsQuery)}`

  return (
    <div className={`offer-card${redeemed ? " redeemed" : ""}`} ref={ref}>
      <div className="oc-top">
        <span className="oc-cat">
          <span aria-hidden>{offer.icon}</span> {offer.category}
        </span>
        <button
          className={`oc-save${saved ? " on" : ""}`}
          aria-label={saved ? "Remove from saved" : "Save offer"}
          aria-pressed={saved}
          onClick={() => onToggleSave(offer)}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      <div className="oc-biz">{offer.business}</div>
      <div className="oc-offer">{offer.offer}</div>
      <p className="oc-fine">{offer.finePrint}</p>

      {redeemed && <span className="oc-redeemed-tag">✓ Marked as used</span>}

      <div className="oc-code">
        {!showCode ? (
          <button
            className="oc-code-btn"
            onClick={() => {
              setShowCode(true)
              track("offer_redeem", offer.id, area)
            }}
          >
            🎟️ Get code
          </button>
        ) : (
          <div className="oc-code-show">
            <div className="ccode">{offer.code}</div>
            <button className="cused" onClick={() => onRedeem(offer)}>
              {redeemed ? "Used ✓" : "Mark as used"}
            </button>
          </div>
        )}
      </div>

      <div className="oc-actions">
        <a className="oc-act" href={`tel:${offer.phone}`}>📞 Call</a>
        <a className="oc-act" href={mapsHref} target="_blank" rel="noopener noreferrer">📍 Directions</a>
        <a className="oc-act" href={offer.website} target="_blank" rel="noopener noreferrer">🔗 Website</a>
      </div>

      {/* Wallet stub — see note in OffersExperience: real passes require an
          Apple Wallet pass-type cert + Google Wallet API + a signing backend. */}
      <button className="oc-wallet" onClick={() => onWallet(offer)}>
        👛 Add to Apple / Google Wallet
      </button>
    </div>
  )
}

export default function OffersExperience({ data }: { data: MailerData }) {
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [redeemed, setRedeemed] = useState<Set<string>>(new Set())
  const [filterSaved, setFilterSaved] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setSaved(loadSet(SAVED_KEY))
    setRedeemed(loadSet(REDEEMED_KEY))
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
  }, [])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const toggleSave = useCallback(
    (offer: Offer) => {
      setSaved((prev) => {
        const next = new Set(prev)
        if (next.has(offer.id)) {
          next.delete(offer.id)
          showToast("Removed from saved")
        } else {
          next.add(offer.id)
          track("offer_save", offer.id, data.area)
          showToast("Saved ★")
        }
        saveSet(SAVED_KEY, next)
        return next
      })
    },
    [data.area, showToast],
  )

  const markRedeemed = useCallback((offer: Offer) => {
    setRedeemed((prev) => {
      const next = new Set(prev)
      if (next.has(offer.id)) next.delete(offer.id)
      else next.add(offer.id)
      saveSet(REDEEMED_KEY, next)
      return next
    })
  }, [])

  const handleWallet = useCallback(
    (offer: Offer) => {
      // Wallet passes are deferred — save the offer and explain.
      setSaved((prev) => {
        const next = new Set(prev)
        next.add(offer.id)
        saveSet(SAVED_KEY, next)
        return next
      })
      showToast("Wallet passes coming soon — saved it here for now ★")
    },
    [showToast],
  )

  const visible = filterSaved ? data.offers.filter((o) => saved.has(o.id)) : data.offers

  return (
    <div className="min-h-screen home-resident offers-page" style={{ background: "var(--navy)" }}>
      {/* SAVED BAR */}
      <div className="saved-bar">
        <span className="sb-count">
          Saved <b>({saved.size})</b>
        </span>
        <button
          className={`saved-toggle${filterSaved ? " active" : ""}`}
          onClick={() => setFilterSaved((v) => !v)}
        >
          {filterSaved ? "Show all offers" : "View saved"}
        </button>
      </div>

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
            {data.area} · {data.monthLabel}
          </span>
          <h1>
            <span className="accent">This month&apos;s</span> local offers
            <span className="h1b">save your favorites, redeem around {data.island}</span>
          </h1>
          <p className="subhead">
            Every offer from the local businesses on this Island Mailer — gathered in one spot. Save the ones you love,
            then show your phone to redeem.
          </p>
          <div className="ctas">
            <a className="btn" href="#offers">Browse the Offers</a>
            <a className="btn ghost" href="#optin">July mailer coming up next →</a>
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

      {/* OFFERS GRID */}
      <section className="shimmer" id="offers">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">{filterSaved ? "Your saved offers" : `${data.area} offers`}</h2>
          <p className="lead reveal">
            {filterSaved
              ? "Everything you've saved, ready to redeem."
              : "Tap a star to save. Get the code, then show your phone at the business."}
          </p>

          {visible.length === 0 ? (
            <div className="offers-empty">
              <p>You haven&apos;t saved any offers yet. Browse all the offers and tap the star to save your favorites.</p>
              <a className="btn" href="#offers" onClick={() => setFilterSaved(false)}>
                Show all offers
              </a>
            </div>
          ) : (
            <div className="offers-grid">
              {visible.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  area={data.area}
                  saved={saved.has(offer.id)}
                  redeemed={redeemed.has(offer.id)}
                  onToggleSave={toggleSave}
                  onRedeem={markRedeemed}
                  onWallet={handleWallet}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EMAIL OPT-IN */}
      <section className="bg-navy2" id="optin">
        <div className="container">
          <div className="optin reveal">
            <span className="im-pill">July mailer coming up next</span>
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

      <div className={`im-toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  )
}
