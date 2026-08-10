"use client"

import { useEffect, useRef, useState, type ReactElement } from "react"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import EmailOptin from "@/components/email-optin"
import NominateForm from "@/components/nominate-form"
import CategoryIcon from "@/components/icons"
import LatestDrop from "@/components/latest-drop"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

/* Self-hosted (v17) — was a Wikimedia hotlink; see PHOTO-CREDITS.md */
const IAO = "/images/iao-valley-panorama.jpg"

/* UI pass (Aug 3): gold line icons replace the emoji in "Three steps" and
   "Community" (locked rule: no emoji in UI — gold line icons only).
   Same 48×48 thin-stroke style as components/icons.tsx. */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
const GOLD_IC: Record<string, ReactElement> = {
  mailbox: (
    <svg viewBox="0 0 48 48" {...P}><path d="M9 30 V21 a 10 10 0 0 1 10-10 h10 a 10 10 0 0 1 10 10 v9 H9 Z" /><path d="M24 30 v10 M17 40 h14" /><path d="M32 11 V4 h7 v7" /><path d="M16 21 h8" /></svg>
  ),
  scan: (
    <svg viewBox="0 0 48 48" {...P}><rect x="15" y="5" width="18" height="38" rx="4" /><path d="M22 9 h4" /><rect x="20" y="17" width="4" height="4" /><rect x="26" y="17" width="4" height="4" /><rect x="20" y="25" width="4" height="4" /><path d="M26 27 h4 M28 25 v4" /><path d="M22 37 h4" /></svg>
  ),
  ticket: (
    <svg viewBox="0 0 48 48" {...P}><path d="M6 16 H42 V22 a 4 4 0 0 0 0 8 V36 H6 V30 a 4 4 0 0 0 0-8 Z" /><path d="M29 16 v20" strokeDasharray="2.5 4" /></svg>
  ),
  palm: (
    <svg viewBox="0 0 48 48" {...P}><path d="M22 44 c1-9 1-16 3-22" /><path d="M25 20 C 18 13, 10 13, 6 19" /><path d="M25 20 C 20 11, 12 9, 8 12" /><path d="M25 20 C 32 13, 40 13, 43 19" /><path d="M25 20 C 30 11, 38 9, 42 12" /><circle cx="23" cy="23" r="2" /><circle cx="27.5" cy="22" r="2" /><path d="M14 44 h17" /></svg>
  ),
  neighbors: (
    <svg viewBox="0 0 48 48" {...P}><circle cx="17" cy="17" r="5" /><circle cx="31" cy="17" r="5" /><path d="M7 39 c0-7 4.5-12 10-12 c3 0 5.5 1.5 7 4" /><path d="M24 39 c0-7 4.5-12 10-12 s10 5 10 12" /></svg>
  ),
  flower: (
    <svg viewBox="0 0 48 48" {...P}><path d="M24 20 c-4-4-4-10 0-13 c4 3 4 9 0 13 Z" /><path d="M24 20 c-4-4-4-10 0-13 c4 3 4 9 0 13 Z" transform="rotate(72 24 24)" /><path d="M24 20 c-4-4-4-10 0-13 c4 3 4 9 0 13 Z" transform="rotate(144 24 24)" /><path d="M24 20 c-4-4-4-10 0-13 c4 3 4 9 0 13 Z" transform="rotate(216 24 24)" /><path d="M24 20 c-4-4-4-10 0-13 c4 3 4 9 0 13 Z" transform="rotate(288 24 24)" /><circle cx="24" cy="24" r="3.5" /></svg>
  ),
}
function GoldIcon({ name, size = 34 }: { name: keyof typeof GOLD_IC; size?: number }) {
  return (
    <span aria-hidden style={{ display: "inline-flex", width: size, height: size, color: "var(--gold-bright, #c9a06a)" }}>
      {GOLD_IC[name]}
    </span>
  )
}

const AD_TILES: { icon: string; cat: string; offer: string }[] = [
  { icon: "🍕", cat: "Local Pizza", offer: "Buy 1 get 1" },
  { icon: "🍦", cat: "Ice Cream", offer: "Free scoop" },
  { icon: "☕", cat: "Local Café", offer: "Free pastry" },
  { icon: "✂️", cat: "Hair Salon", offer: "$25 off 1st" },
  { icon: "🛍️", cat: "Boutique", offer: "20% off" },
  { icon: "🔧", cat: "Home Services", offer: "$75 off job" },
  { icon: "🌮", cat: "Food Truck", offer: "Free side" },
]

const CATEGORIES: { icon: string; label: string }[] = [
  { icon: "🍕", label: "Pizza" },
  { icon: "🍦", label: "Ice Cream" },
  { icon: "☕", label: "Coffee" },
  { icon: "🥐", label: "Café" },
  { icon: "🍰", label: "Bakery" },
  { icon: "🍣", label: "Sushi Bar" },
  { icon: "🍹", label: "Happy Hour" },
  { icon: "🌿", label: "Health" },
  { icon: "💆", label: "Spa" },
  { icon: "✂️", label: "Salon" },
  { icon: "🏋️", label: "Fitness" },
  { icon: "🛍️", label: "Boutique" },
  { icon: "🔧", label: "Home Services" },
  { icon: "🚗", label: "Auto" },
  { icon: "🤿", label: "Activities" },
  { icon: "🐾", label: "Pet" },
]

export default function HomeResident() {
  const videoRef = useRef<HTMLVideoElement>(null)
  /* Perf: only load the background video on larger screens that aren't asking
     for reduced motion. Mobile gets the lightweight poster image instead. */
  const [showVideo, setShowVideo] = useState(false)
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (wide.matches && !reduced.matches) setShowVideo(true)
  }, [])

  /* video autoplay hardening (ported from the existing home) */
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const tryPlay = () => {
      try {
        vid.playbackRate = 0.55
      } catch {
        /* noop */
      }
      const p = vid.play()
      if (p) p.catch(() => {})
    }
    const onMeta = () => {
      try {
        vid.playbackRate = 0.55
      } catch {
        /* noop */
      }
    }
    vid.addEventListener("loadedmetadata", onMeta)
    tryPlay()
    const onVis = () => {
      if (!document.hidden) tryPlay()
    }
    document.addEventListener("visibilitychange", onVis)
    const evs: (keyof WindowEventMap)[] = ["touchstart", "click", "scroll"]
    evs.forEach((ev) => window.addEventListener(ev, tryPlay, { once: true, passive: true }))
    return () => {
      vid.removeEventListener("loadedmetadata", onMeta)
      document.removeEventListener("visibilitychange", onVis)
      evs.forEach((ev) => window.removeEventListener(ev, tryPlay))
    }
  }, [showVideo])

  /* scroll-reveal via IntersectionObserver (respects reduced motion via CSS) */
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

  return (
    <div className="min-h-screen home-resident" style={{ background: "var(--navy)" }}>
      {/* ================= TOP BAR (v24: logo + vanity phone pill) ================= */}
      <div className="home-topbar">
        <a className="tb-logo" href="/" aria-label="Island Mailer home">
          <img src="/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png" alt="Island Mailer" />
        </a>
        <a className="tb-bizlink" href="/advertise">Feature Your Business →</a>
      </div>

      {/* ================= HERO (resident) ================= */}
      <div className="hero" id="top">
        <img
          className="hero-poster"
          src="/images/hero-waterfall-poster.jpg"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-waterfall-poster.jpg"
          >
            <source src="/videos/hero-waterfall-720.mp4" type="video/mp4" />
          </video>
        )}
        <div className="overlay" />
        <div className="content">
          <div className="logo-lockup">
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." />
            <span className="tag-fix" />
          </div>
          <h1>
            <span className="accent">Hawaii&apos;s Largest</span>
            <span className="h1line2">Exclusive Offers</span>
          </h1>
          <p className="hero-eyebrow">— Flowing right to your mailbox —</p>
          <p className="subhead">
            The best local deals for kamaʻāina — from the businesses you love, in your mailbox each month, and saved
            right on your phone. Discover new spots, save money, and support local.
          </p>
          <div className="ctas">
            <a className="btn" href="/local-offers">See Local Offers</a>
            <a className="btn ghost" href="#optin">Join the Mailing List</a>
          </div>
          <p className="micro">
            Free for residents, always. Own a local business?{" "}
            <a className="biz-link" href="/advertise">Get featured →</a>
          </p>
          <div className="bottom-pad" />
        </div>
        <div className="scroll-cue resident-cue">↓</div>
        <div className="hero-fade" aria-hidden />
      </div>

      {/* ================= EMAIL OPT-IN (light, airy — rests the eye after the dark video) ================= */}
      <section className="lightband" id="optin">
        <div className="container">
          <div className="optin dark reveal">
            <span className="im-pill">Fall local deals — coming soon</span>
            <h2>Be first to the local deals</h2>
            <p className="lead">
              Join the Island Mailer list and you&apos;ll be the first to know the moment a new mailer lands in your
              area — fresh offers from locally loved businesses, all season long.
            </p>
            <EmailOptin source="home-hero" />
            <p className="fine">No spam, just local deals. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ================= WHAT IS ISLAND MAILER ================= */}
      <section>
        <div className="container">
          <div className="im-txt reveal">
            <div className="sec-divider">◆</div>
            <h2>What is Island Mailer?</h2>
            <p className="cat-lead">
              It&apos;s your island&apos;s community mailer — a big, beautiful postcard packed with exclusive offers from
              local businesses, delivered right to your mailbox. Scan the QR code and it all comes to life on your phone:
              browse every offer, save your favorites, and redeem them around the islands.
            </p>
            <p className="cat-lead" style={{ marginTop: 22 }}>
              Think of all your favorite local spots — in one place:
            </p>
          </div>
          <div className="cat-grid reveal">
            {CATEGORIES.map((c) => (
              <div className="cat-chip" key={c.label}>
                <span className="cat-ic" aria-hidden><CategoryIcon name={c.label} size={28} /></span>
                <span className="cat-lbl">{c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE LATEST DROP (v24 interactive lookbook — replaces the static showcase) ================= */}
      <LatestDrop />

      {/* ================= HOW IT WORKS ================= */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">Three steps. That&apos;s it.</h2>
          <div className="flow">
            <div className="flowline" aria-hidden />
            <div className="fstep reveal">
              <div className="fic"><GoldIcon name="mailbox" /></div>
              <span className="fn">Step 1</span>
              <h3>Open mailbox</h3>
              <p>Your Island Mailer is waiting — packed with exclusive local offers.</p>
            </div>
            <div className="fstep reveal">
              <div className="fic"><GoldIcon name="scan" /></div>
              <span className="fn">Step 2</span>
              <h3>Scan &amp; save</h3>
              <p>Scan the QR to see every offer and save your favorites.</p>
            </div>
            <div className="fstep reveal">
              <div className="fic"><GoldIcon name="ticket" /></div>
              <span className="fn">Step 3</span>
              <h3>Show &amp; redeem</h3>
              <p>Show your phone at the business and enjoy — while supporting local.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PHOTO BAND (parallax) ================= */}
      <div className="photoband" style={{ backgroundImage: `url('${IAO}')` }}>
        <div className="pov" />
        <div className="pc reveal">
          <h2>Real shops. Real neighbors. Real aloha.</h2>
          <p>Behind every offer is a local business that makes our islands feel like home.</p>
        </div>
      </div>

      {/* ================= COMMUNITY ================= */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">More than deals — it&apos;s for our community</h2>
          <p className="lead reveal">Every time you choose local, you&apos;re investing in the place we call home.</p>
          <div className="cards">
            <div className="card reveal">
              <div className="ic"><GoldIcon name="palm" size={30} /></div>
              <h3>Keep it on-island</h3>
              <p>Your dollars stay here in the islands, circulating through Hawaii&apos;s local economy instead of leaving for the mainland.</p>
            </div>
            <div className="card reveal">
              <div className="ic"><GoldIcon name="neighbors" size={30} /></div>
              <h3>Help your neighbors thrive</h3>
              <p>Behind every offer is a local family, a dream, and jobs for people in your community.</p>
            </div>
            <div className="card reveal">
              <div className="ic"><GoldIcon name="flower" size={30} /></div>
              <h3>Discover your town&apos;s gems</h3>
              <p>Find the small spots with the most aloha — the ones that make our neighborhoods special.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOMINATE ================= */}
      <section className="shimmer" id="nominate">
        <div className="container">
          <div className="nominate reveal">
            <div className="sec-divider">◆</div>
            <h2 style={{ textAlign: "center" }}>Know a local spot that deserves the spotlight?</h2>
            <p className="lead">
              Tell us the local businesses you&apos;d love to see featured — especially the ones you wish offered an
              exclusive deal. We&apos;ll reach out and try to bring your favorites onto a future mailer.
            </p>
            <NominateForm />
          </div>
        </div>
      </section>

      {/* ================= RESIDENT CTA ================= */}
      <section className="rcta">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">Your local deals, all in one place</h2>
          <p className="lead reveal">
            Browse the offers, save your favorites, and redeem them around the islands — all free, all local.
          </p>
          <a className="btn reveal" href="/local-offers">See Local Offers</a>
        </div>
      </section>

      {/* ================= BUSINESS BAND ================= */}
      <section className="bizband" id="business">
        <div className="container">
          <div className="bizwrap reveal">
            <p className="bizeyebrow">For Local Business Owners</p>
            <h2>Looking to feature your local business?</h2>
            <p className="bz">
              The card above is shared by a small circle of local businesses — and <b style={{ color: "var(--gold-bright)" }}>only
              one per category</b> makes each issue. When the spot is yours, your competitor&apos;s isn&apos;t.
            </p>
            <details className="acc">
              <summary>
                How featuring works <span className="chev">⌄</span>
              </summary>
              <ul>
                <li>One business per category — your spot is exclusively yours</li>
                <li>Design, printing &amp; postage all included</li>
                <li>Choose your reach and area — no long-term contracts</li>
              </ul>
            </details>
            <a className="btn" href="/advertise">See How It Works →</a>
            <p style={{ marginTop: 18, color: "var(--sand)", fontSize: 16 }}>
              Or just call or text us — <a href="tel:8088086245" style={{ color: "var(--gold-bright)", fontWeight: 800, textDecoration: "none" }}>808-808-MAIL</a>
            </p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER OPT-IN + FOOTER ================= */}
      <section className="foot-optin-band">
        <div className="container">
          <div className="foot-optin reveal">
            <p className="foot-optin-h">Get the deals in your inbox</p>
            <EmailOptin source="home-footer" variant="footer" />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingMenu />
    </div>
  )
}
