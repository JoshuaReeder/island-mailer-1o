"use client"

import { useRef, useState } from "react"
import ContactForm from "@/components/contact-form"
import SMSContactForm from "@/components/SMSContactForm"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import SiteHeader from "@/components/site-header"
import { FAQ_ITEMS } from "@/lib/advertise-faq"
import PricingReveal from "@/components/pricing-reveal"
import { areas } from "@/lib/area-data"

/* ── B1: per-area availability (spots data lives in lib/area-data.ts) ── */
const MAUI_AREA_KEYS = ["north-shore", "central", "west", "south", "upcountry"] as const
const AVAILABILITY = MAUI_AREA_KEYS.map((k) => {
  const a = areas[k]
  const total = a?.spotsTotal ?? 0
  const open = Math.max(0, total - (a?.spotsReserved ?? 0))
  return { label: a?.tag ?? k, href: `/${a?.slug ?? ""}`, open, total }
}).filter((a) => a.total > 0)

/* Booking link (Cal.com etc). Hidden until NEXT_PUBLIC_BOOKING_URL is set in Vercel. */
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL

/* ── Postcard front/back tabs ── */
function PostcardTabs() {
  const [side, setSide] = useState<"front" | "back">("front")
  return (
    <>
      <div className="tabs">
        <button className={`tab${side === "front" ? " active" : ""}`} onClick={() => setSide("front")}>
          Front (A–H)
        </button>
        <button className={`tab${side === "back" ? " active" : ""}`} onClick={() => setSide("back")}>
          Back (I–P)
        </button>
      </div>
      <div className="postcard-stage">
        <div className="postcard-3d">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FRONT%208%20Gold%20on%20Navy-EdKtbmAI0oK519d63uOWFOq9Unh3bw.png"
            alt="Island Mailer 9×12 postcard front — navy background"
            style={{ display: side === "front" ? "block" : "none" }}
          />
          <div className="postcard-back" style={{ display: side === "back" ? "grid" : "none" }}>
            <div>I</div><div>J</div><div>K</div><div>L</div><div>M</div><div>N</div><div>O</div><div>P</div>
          </div>
        </div>
      </div>
    </>
  )
}

function FAQ() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const setAll = (open: boolean) => {
    wrapRef.current?.querySelectorAll("details").forEach((d) => {
      d.open = open
    })
  }
  return (
    <div className="sec-body" ref={wrapRef}>
      <div className="faq-controls">
        <button onClick={() => setAll(true)}>Expand All</button>
        <button onClick={() => setAll(false)}>Collapse All</button>
      </div>
      {FAQ_ITEMS.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <div className="a">
            {item.a.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}

/* ── Feature icons (custom gold-line SVG set) ── */
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M24 4 L40 10 V23 C40 33 33 40.5 24 44 C15 40.5 8 33 8 23 V10 Z" /><path d="M21 18 L24 15 V31 M20 31 H28" /></svg>
    ),
    h: "One Business Per Industry",
    p: "your category gets one exclusive ad space.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M8 33 V24 a9 9 0 0 1 9-9 h13 a9 9 0 0 1 9 9 v9 Z" /><path d="M30 15 a9 9 0 0 1 9 9 v9 M19 33 v9 M13 42 h12" /><path d="M36 15 V7 h7 v5 h-7" /></svg>
    ),
    h: "Mailbox Billboard",
    p: "A huge 9×12 postcard that lands in every home in your surrounding area.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><rect x="9" y="11" width="30" height="26" rx="4" /><path d="M15 19 h12 M15 25 h18 M15 31 h9" /><path d="M33 28 l1.8 3.6 4 .6 -2.9 2.8 .7 4 -3.6-1.9 -3.6 1.9 .7-4 -2.9-2.8 4-.6 Z" strokeWidth="1.4" /></svg>
    ),
    h: "No Pages to Flip Through",
    p: "No coupon book, no envelope; just one big, premium card with your offer front and center.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M14 8 H34 L42 19 L24 42 L6 19 Z" /><path d="M6 19 H42 M24 42 L15 19 L20 8 M24 42 L33 19 L28 8" /></svg>
    ),
    h: "Premium Designs",
    p: "Customized to enhance your business and exclusive offer",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><circle cx="17" cy="19" r="8" /><circle cx="31" cy="19" r="8" /><circle cx="24" cy="31" r="8" /></svg>
    ),
    h: "Affordable Co-Op Pricing",
    p: "Share printing and postage with other local businesses—get mass-mail reach at a fraction of running your own solo mailer.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M26 44 C26 34 26 27 24 20" /><path d="M24 20 C19 13 12 11 6 13 C12 15 17 17 24 20 Z" /><path d="M24 20 C21 11 15 7 9 7 C14 10 19 14 24 20 Z" /><path d="M24 20 C27 11 33 7 39 7 C34 10 29 14 24 20 Z" /><path d="M24 20 C29 13 36 11 42 13 C36 15 31 17 24 20 Z" /><path d="M14 44 h20" /></svg>
    ),
    h: "Locals Supporting Locals",
    p: "Focused on keeping our local economy circulating right here.",
  },
]

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

export default function AdvertiseContent() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <SiteHeader onReserve={scrollToContact} />

      {/* ================= HERO ================= */}
      <div className="hero" id="top">
        <div className="overlay" />
        <div className="content">
          <div className="logo-lockup">
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." />
            <span className="tag-fix" />
          </div>
          <div className="reserve-wrap container">
            <a className="btn" href="#contact">Reserve Your Spot</a>
            <div className="scroll-cue">↓</div>
          </div>
          <h1>Advertise on Island Mailer — Local Postcard Advertising Across Maui</h1>
          <p className="subhead">
            Get your business featured on a premium 9&quot;x12&quot; mailbox billboard mailed up to 10,000 local homes —
            reach Maui residents for just cents per household.
          </p>
          <div className="stats">
            <div className="stat"><b>16 premium ad spaces</b><span>(8 front, 8 back)</span></div>
            <div className="stat"><b>Up to 10,000 local homes</b><span>per mailing</span></div>
            <div className="stat"><b>One local business</b><span>per industry</span></div>
            <div className="stat"><b>Design, printing &amp; postage</b><span>all included</span></div>
          </div>
          <div className="ctas">
            <a className="btn" href="#contact">Claim Your Spot</a>
            <a className="btn ghost" href="#pricing">View Pricing and Details</a>
          </div>
          <p className="micro">No long-term contracts. First-come, first-served by industry.</p>
          <div className="bottom-pad" />
        </div>
      </div>

      {/* ================= THE 9x12 POSTCARD ================= */}
      <section className="bg-navy2 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>The 9×12 Postcard</h2>
          <div className="sec-body narrow container">
            <PostcardTabs />
            <div className="next-mailer plain">
              <div className="month-deck" aria-label="Upcoming Island Mailer campaigns">
                <div className="deck-card peek c3"><span className="deck-month">September</span></div>
                <div className="deck-card peek c2"><span className="deck-month">August</span></div>
                <div className="deck-card front c1">
                  <div className="label">Next Mailer</div>
                  <div className="date">July</div>
                  <div className="deck-when">Reserving now — in mailboxes late July</div>
                </div>
              </div>
              <p className="deck-cadence">A fresh Island Mailer every month.</p>
              <p>Limited spots available. Reserve your space on the most visible mail in local neighborhoods.</p>
              <a className="btn" href="#contact">Reserve Your Spot</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RIGHT FOR YOUR BUSINESS ================= */}
      <section className="bg-navy">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Is Island Mailer right for your business?</h2>
          <div className="sec-body split">
            <div className="panel-card">
              <h3>Perfect for businesses like:</h3>
              <ul className="check-list">
                <li><span>Restaurants, food trucks, shave ice, coffee, and plate lunch spots</span></li>
                <li><span>Salons, spas, gyms, yoga, massage, and wellness studios</span></li>
                <li><span>Trades and services – plumbers, electricians, landscapers, cleaners</span></li>
                <li><span>Auto repair, car wash, tire shops, detailing, towing</span></li>
                <li><span>Real estate, mortgage, insurance, and financial professionals</span></li>
                <li><span>Medical, dental, chiropractic, optometry, and pet care</span></li>
              </ul>
            </div>
            <div className="panel-card">
              <h3>If this sounds familiar, we can help:</h3>
              <ul className="quote-list">
                <li>“We're spending on ads, but locals still say, 'We didn't know you were here.'”</li>
                <li>“Social posts vanish in the algorithm, and boosts burn cash fast.”</li>
                <li>“Solo mailers quote us thousands we just don't have.”</li>
                <li>“We want more local 'regulars,' not tourists who never come back.”</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY LOVE ================= */}
      <section className="bg-cream5 shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Why local businesses love Island Mailer</h2>
          <div className="sec-body features">
            {FEATURES.map((f) => (
              <div className="feature" key={f.h}>
                <div className="icon">{f.icon}</div>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
          <div className="see-how">
            <a className="btn ghost" href="#how-it-works">See How It Works</a>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-navy" id="how-it-works">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>How It Works</h2>
          <p className="sec-sub">A simple, streamlined process with real results</p>
          <div className="sec-body steps">
            <div className="step"><div className="num">1</div><div className="stage">Step 1</div><h3>Apply</h3><p>Tell us about your business</p></div>
            <div className="step"><div className="num">2</div><div className="stage">Step 2</div><h3>Design</h3><p>We create premium, custom mailer designs</p></div>
            <div className="step"><div className="num">3</div><div className="stage">Step 3</div><h3>Print</h3><p>High-quality printing with attention to detail</p></div>
            <div className="step"><div className="num">4</div><div className="stage">Step 4</div><h3>Deliver</h3><p>Postcards reach your local community</p></div>
          </div>
        </div>
      </section>

      {/* ================= PRICING (value-forward + gated reveal) ================= */}
      <section className="bg-navy2 shimmer" id="pricing">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>A fraction of what a solo mailer costs</h2>
          <p className="sec-sub">
            Running your own direct-mail campaign often costs $5,000&ndash;$10,000+ once you add design, print and
            postage. On Island Mailer you share that cost with other local businesses &mdash; reaching up to 10,000 local
            homes (or ~2,500 with the Hyper-Local) for less than the cost of a postage stamp per home.
          </p>
          <div className="sec-body">
            <div className="home-resident">
              <div className="value-grid">
                <div className="value-card">
                  <div className="vbig">Up to 10,000</div>
                  <div className="vlbl">local homes per mailing &mdash; or ~2,500 with the Hyper-Local</div>
                </div>
                <div className="value-card">
                  <div className="vbig">All included</div>
                  <div className="vlbl">design, print &amp; postage &mdash; nothing hidden</div>
                </div>
                <div className="value-card">
                  <div className="vbig">1 per category</div>
                  <div className="vlbl">your industry is exclusively yours &mdash; no long-term contracts</div>
                </div>
              </div>
              {/* ── B1: live availability by area ── */}
              {AVAILABILITY.length > 0 && (
                <div style={{ marginTop: 44 }}>
                  <p className="sec-sub" style={{ marginBottom: 18 }}>
                    <b style={{ color: "var(--gold-bright)" }}>Current availability</b> — first-come, first-served, one
                    business per category:
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                    {AVAILABILITY.map((a) => (
                      <a
                        key={a.label}
                        href={a.href}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          background: "rgba(163,124,79,0.12)",
                          border: "1px solid rgba(163,124,79,0.4)",
                          borderRadius: 999,
                          padding: "12px 22px",
                          color: "var(--cream)",
                          textDecoration: "none",
                          fontWeight: 700,
                        }}
                      >
                        {a.label}
                        <span style={{ color: "var(--gold-bright)", fontWeight: 800 }}>
                          {a.open}/{a.total} open
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              <div style={{ marginTop: 44 }}>
                <PricingReveal source="pricing-interest-advertise" />
              </div>
              <p className="sec-sub" style={{ marginTop: "var(--gap-s)" }}>
                Two ways to land in local mailboxes &mdash; both premium, both with up to 16 ad spaces (8 per side).{" "}
                <a href="/products" style={{ color: "var(--gold-bright)", fontWeight: 800 }}>Compare all products &amp; services &rarr;</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-navy" id="faq">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about-blend shimmer" id="about">
        <div className="container narrow">
          <div className="sec-divider">◆</div>
          <h2>About Island Mailer</h2>
          <div className="sec-body about-body">
            <p>
              Island Mailer was created on Maui with one simple belief: local businesses are the heart of island life,
              and marketing shouldn't be what holds them back.
            </p>
            <div className="about-photo">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-giDBybwI37gwn0qdjSDN7dZhdT7yvC.png"
                alt="Aerial view of Pā'ia Town, Maui — colorful rooftops and turquoise ocean"
              />
              <div className="photo-caption">Pā'ia Town, North Shore Maui — where Island Mailer begins.</div>
            </div>
            <p>
              After years of seeing Maui shops, services, and ʻohana-owned businesses struggle to afford effective
              advertising, we set out to build something better - a way to share the cost of a big, beautiful postcard
              so everyone could reach more local homes without burning their entire budget.
            </p>
            <p>
              Island Mailer connects Maui businesses with Maui residents - no guessing with online algorithms, no
              fighting for attention in an endless feed. Just a giant &quot;mailbox billboard&quot; that lands in every
              hale that makes it easy for locals to find and support you.
            </p>
            <p>
              When you join Island Mailer, you're not just buying ad space. You're joining a local movement to support
              small businesses while discovering the people and places that make this island special.
            </p>
            <div className="giveback">
              <h3>Island Mailer Gives-Back</h3>
              <p>
                A portion of profits from each Island Mailer is set aside to support local Maui causes. As we grow, so
                does the impact we can make together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-navy" id="contact">
        <div className="container narrow">
          {BOOKING_URL && (
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <a className="btn ghost" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Prefer to talk it through? Book a quick intro call →
              </a>
            </div>
          )}
          <ContactForm />
        </div>
      </section>

      {/* ================= TEXT ME STRIP ================= */}
      <SMSContactForm />

      <Footer />
      <FloatingMenu />
    </div>
  )
}
