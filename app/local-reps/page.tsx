import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import AmbassadorForm from "@/components/ambassador-form"
import { localRepsJsonLd, jsonLdScript } from "@/lib/jsonld"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"
/* Maui scenes proven to render live on the site (same Wikimedia Special:FilePath
   URLs used on the home page + products page — Iao Valley + Kihei coast).
   The earlier Paia/Makawao filenames 404'd, so we reuse the known-good ones. */
const HERO_IMG = "https://commons.wikimedia.org/wiki/Special:FilePath/Iao_Valley_panorama_cropped.jpg?width=2200"
const SUPPORT_IMG = "https://commons.wikimedia.org/wiki/Special:FilePath/Kihei_coast.jpg?width=1800"

export const metadata: Metadata = {
  title: "Become a Local Island Mailer Rep | Island Mailer",
  description:
    "Be the friendly local face of Island Mailer in your area — build genuine rapport with local business owners, help them get featured and supported, and represent your town. A compensated, people-first role. Apply today.",
  alternates: { canonical: "/local-reps" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/local-reps",
    title: "Become a Local Island Mailer Rep | Island Mailer",
    description:
      "Be the friendly local face of Island Mailer in your town — help local businesses get featured and supported. A compensated, people-first role.",
  },
}

const WHAT_REPS_DO = [
  {
    icon: "🤝",
    title: "Introduce Island Mailer",
    body: "Be the warm first hello — show local business owners what Island Mailer is and how it helps them reach the neighborhood.",
  },
  {
    icon: "🌟",
    title: "Help them get featured & supported",
    body: "Help businesses make the most of Island Mailer's resources — getting on a mailer, looking their best, and renewing.",
  },
  {
    icon: "🌴",
    title: "Be the local point of contact",
    body: "Stay the friendly, trusted face in your community — a real local who builds genuine rapport, not a call center.",
  },
]

const GREAT_FIT = [
  { b: "Honest & reputable", rest: " — people in town already know and trust you." },
  { b: "Likeable & personable", rest: " — you genuinely enjoy meeting people and talking story." },
  { b: "Well-connected locals", rest: " who love their town and its small businesses." },
  { b: "Reliable", rest: " — business owners can count on you to follow through." },
  { b: "Rooted in your community", rest: " — you already shop, eat, and hire local." },
]

export default function LocalRepsPage() {
  return (
    <div className="min-h-screen home-resident reps-page" style={{ background: "var(--navy)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localRepsJsonLd())} />
      {/* HERO — warm, light, community feel */}
      <div className="hero reps-hero" id="top">
        <div className="bgi" style={{ position: "absolute", inset: 0, backgroundImage: `url('${HERO_IMG}')`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div className="overlay reps-overlay" />
        <div className="content">
          <div className="logo-lockup">
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." />
            <span className="tag-fix" />
          </div>
          <p className="crumb" style={{ marginTop: 24 }}>
            <a href="/">Island Mailer</a> · Local Reps
          </p>
          <h1>
            <span className="accent">Become a</span> Local Island Mailer Rep
            <span className="h1b">be the friendly local face of Island Mailer in your town</span>
          </h1>
          <p className="subhead">
            Love your community and the local businesses that make it special? Help them get seen — and be the local
            connection between Island Mailer and the place you call home. It&apos;s a compensated, people-first role.
          </p>
          <div className="ctas">
            <a className="btn" href="#apply">I&apos;m Interested</a>
          </div>
        </div>
      </div>

      {/* WHAT A LOCAL REP IS */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">What a Local Rep is</h2>
          <p className="lead reveal">
            A Local Rep is a friendly, trusted local face for Island Mailer in their own community — someone who enjoys
            connecting with local business owners, helps them make the most of Island Mailer&apos;s resources, and
            builds genuine rapport around town. It&apos;s simple, local, and people-first.
          </p>
        </div>
      </section>

      {/* WHAT THEY DO */}
      <section className="shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">What a Local Rep does</h2>
          <div className="rep-do">
            {WHAT_REPS_DO.map((r) => (
              <div className="card reveal" key={r.title}>
                <div className="ic">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORTING PHOTO BAND */}
      <div className="photoband" style={{ backgroundImage: `url('${SUPPORT_IMG}')` }}>
        <div className="pov" />
        <div className="pc reveal">
          <h2>Your town. Your people. Your local businesses.</h2>
          <p>The best Local Reps already know the shop owners by name — and love seeing them thrive.</p>
        </div>
      </div>

      {/* WHO'S A GREAT FIT */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">Who&apos;s a great fit</h2>
          <p className="lead reveal">
            Honest, reputable, likeable, well-connected locals who love their town and its small businesses.
          </p>
          <div className="rep-bullets">
            {GREAT_FIT.map((g, i) => (
              <div className="rep-bullet reveal" key={i}>
                <span className="rb-ic" aria-hidden>🌺</span>
                <p>
                  <b>{g.b}</b>
                  {g.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPENSATION */}
      <section className="bg-navy2">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">This is a compensated role</h2>
          <p className="lead reveal">
            Being a Local Rep is a compensated position — we value your time, your relationships, and your local
            knowledge. We&apos;ll walk through the specifics together once you&apos;re qualified and it&apos;s clear the
            role is a good fit for both of us.
          </p>
        </div>
      </section>

      {/* APPLY */}
      <section className="shimmer" id="apply">
        <div className="container">
          <div className="nominate reveal">
            <div className="sec-divider">◆</div>
            <h2 style={{ textAlign: "center" }}>Tell us a little about you</h2>
            <p className="lead">
              If you&apos;d love to represent Island Mailer in your area, drop your details below. We&apos;ll reach out
              with details if it&apos;s a good fit.
            </p>
            <AmbassadorForm />
          </div>
        </div>
      </section>

      <Footer variant="simple" />
      <FloatingMenu />
    </div>
  )
}
