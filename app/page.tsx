"use client"

import { useEffect, useRef, useState } from "react"
import ContactForm from "@/components/contact-form"
import SMSContactForm from "@/components/SMSContactForm"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import SiteHeader from "@/components/site-header"
import { homeJsonLd, jsonLdScript } from "@/lib/jsonld"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

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

/* ── FAQ with Expand All / Collapse All ── */
const FAQ_ITEMS: { q: string; a: string[] }[] = [
  {
    q: "What is Island Mailer?",
    a: [
      "Island Mailer is a local advertising mailer that helps Hawaiʻi businesses get directly in front of nearby residents through a professionally designed 9x12 postcard delivered to homes in selected communities.",
      "Each mailer features a limited number of local businesses, giving residents an easy way to discover and support trusted businesses in their area.",
    ],
  },
  {
    q: "How much does it cost?",
    a: [
      "Island Mailer uses a simple flat-rate price of $800 per ad spot for each mailer campaign.",
      "This gives your business exposure to thousands of local households without the cost of mailing your own individual postcard.",
    ],
  },
  {
    q: "What is included?",
    a: [
      "Your ad spot includes placement on the Island Mailer postcard, professional ad layout support, print production, and direct-mail delivery to the selected local mailing area.",
      "We handle the design, printing, and mailing process so you can focus on running your business.",
    ],
  },
  {
    q: "Do you design my ad?",
    a: [
      "Yes. We design your ad so it looks clean, professional, and on-brand.",
      "You can provide your logo, photos, offer, contact info, website, social media, or anything else you have for our consideration. We'll help organize it into a strong, simple ad that is clear and easy for residents to respond to.",
    ],
  },
  {
    q: "Can I choose my mailing area?",
    a: [
      "In most cases, yes. Island Mailer is organized by local market areas, such as North Shore Maui, Central Maui, West Maui, South Maui, and Upcountry Maui.",
      "Available mailing areas may depend on the current campaign schedule and available routes. We'll help you choose the best fit based on your business, service area, and target customers.",
    ],
  },
  {
    q: "What happens if my industry is already taken?",
    a: [
      "Island Mailer limits competing businesses in the same category whenever possible.",
      "If your industry is already reserved for a specific mailer, we can place you on the waitlist, offer you a future campaign spot, or help find another available market area that makes sense for your business.",
    ],
  },
  {
    q: "How do I reserve a spot?",
    a: [
      "You can reserve a spot by filling out the contact form on our website or contacting us directly.",
      "Once we confirm availability, we'll review your business category, mailing area, ad materials, and campaign timing. Your spot is reserved once availability is confirmed and payment is completed.",
    ],
  },
  {
    q: "How many homes will receive the mailer?",
    a: [
      "Each campaign is designed to reach thousands of local households within the selected mailing area. Some campaigns may reach up to 10,000 homes depending on the market and mailing route.",
      "We'll confirm the estimated household count before each campaign.",
    ],
  },
  {
    q: "What kind of businesses are a good fit?",
    a: [
      "Island Mailer is a great fit for local restaurants, cafés, service businesses, contractors, health and wellness providers, retail shops, family services, home services, auto services, and other businesses that want more local visibility.",
      "The goal is to help residents discover and support businesses in their own community.",
    ],
  },
  {
    q: "Can I advertise in more than one area?",
    a: [
      "Yes, depending on availability.",
      "If your business serves multiple parts of Maui or multiple islands, we can discuss options for placing your ad in more than one market area or future campaign.",
    ],
  },
  {
    q: "When will the mailer go out?",
    a: [
      "Mailer dates depend on the campaign schedule, design deadlines, print production, and mailing route timing.",
      "Once your spot is reserved, we'll let you know the expected timeline and any important deadlines for submitting your business information, logo, photos, and offer.",
    ],
  },
]

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

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* video autoplay hardening (ported from static site app.js) */
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const tryPlay = () => {
      const p = vid.play()
      if (p) p.catch(() => {})
    }
    tryPlay()
    const onVis = () => {
      if (!document.hidden) tryPlay()
    }
    document.addEventListener("visibilitychange", onVis)
    const evs: (keyof WindowEventMap)[] = ["touchstart", "click", "scroll"]
    evs.forEach((ev) => window.addEventListener(ev, tryPlay, { once: true, passive: true }))
    return () => {
      document.removeEventListener("visibilitychange", onVis)
      evs.forEach((ev) => window.removeEventListener(ev, tryPlay))
    }
  }, [])

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--navy)" }}>
      <SiteHeader onReserve={scrollToContact} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(homeJsonLd(FAQ_ITEMS))} />

      {/* ================= HERO ================= */}
      <div className="hero" id="top">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto">
          <source src="/videos/IM%20Website%20Background%20video%20of%20Hawaii%20Waterfall.mp4" type="video/mp4" />
        </video>
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
          <h1>Island Mailer – Local Postcard Advertising Across Maui</h1>
          <p className="subhead">
            Your business on a premium 9&quot;x12&quot; mailbox billboard mailed up to 10,000 local homes — reach Maui
            residents for just cents per household.
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

      {/* ================= PRICING ================= */}
      <section className="bg-navy2 shimmer" id="pricing">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2>Choose your mailer</h2>
          <p className="sec-sub">Two ways to land in local mailboxes — both premium, both with up to 16 ad spaces (8 per side). Start hyper-local, or cover the whole community.</p>
          <div className="sec-body">
            <div className="mailer-grid">

              <div className="mailer-card">
                <div className="mailer-name">Hyper-Local Mailer</div>
                <div className="mailer-size">6.5″ × 12″ · one neighborhood</div>
                <div className="mini-card hl"><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H</span></div>
                <p className="mini-cap">8 ad spaces per side — 16 total (front + back)</p>
                <div className="mailer-stats">
                  <div className="ms"><b>2,500</b><span>local homes</span></div>
                  <div className="ms"><b>up to 16</b><span>ad spaces</span></div>
                  <div className="ms"><b>~10¢</b><span>per home</span></div>
                </div>
                <p className="mailer-best"><b>Best for:</b> testing a new offer, tighter budgets, and reaching one specific neighborhood.</p>
                <div className="mailer-price"><span className="amt">$250</span><span className="per">per ad space, per mailing</span></div>
                <a className="btn" href="#contact">Check Availability</a>
              </div>

              <div className="mailer-card flagship">
                <div className="mailer-badge">Most reach</div>
                <div className="mailer-name">Signature Mailer</div>
                <div className="mailer-size">9″ × 12″ · whole community</div>
                <div className="mini-card sig"><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span><span>G</span><span>H</span></div>
                <p className="mini-cap">8 ad spaces per side — 16 total (front + back)</p>
                <div className="mailer-stats">
                  <div className="ms"><b>10,000</b><span>local homes</span></div>
                  <div className="ms"><b>up to 16</b><span>ad spaces</span></div>
                  <div className="ms"><b>~8¢</b><span>per home</span></div>
                </div>
                <p className="mailer-best"><b>Best for:</b> maximum visibility, established businesses, and the lowest cost per home.</p>
                <div className="mailer-price"><span className="amt">$800</span><span className="per">per ad space, per mailing</span></div>
                <a className="btn" href="#contact">Check Availability</a>
              </div>

            </div>
            <p className="sec-sub" style={{ marginTop: "var(--gap-s)" }}>Every mailer includes custom ad design, print, postage &amp; USPS delivery — one business per industry, no long-term contracts. <a href="/products" style={{ color: "var(--gold-bright)", fontWeight: 800 }}>Compare all products &amp; services →</a></p>
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
      <section className="about-blend shimmer">
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
