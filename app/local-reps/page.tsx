import type { Metadata } from "next"
import Footer from "@/components/footer"
import FloatingMenu from "@/components/floating-menu"
import AmbassadorForm from "@/components/ambassador-form"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"
const KIHEI = "https://commons.wikimedia.org/wiki/Special:FilePath/Kihei_coast.jpg?width=1800"

export const metadata: Metadata = {
  title: "Become a Local Island Mailer Ambassador | Island Mailer",
  description:
    "Be the friendly local face of Island Mailer in your area — build relationships with local businesses, help them get featured, and support your community. Apply to become a Local Ambassador.",
  alternates: { canonical: "/local-reps" },
}

const WHAT_REPS_DO = [
  {
    icon: "🤝",
    title: "Build relationships",
    body: "Connect with local businesses in your area and get to know the owners behind them.",
  },
  {
    icon: "🌟",
    title: "Help them get featured",
    body: "Show businesses how Island Mailer works, help them get on a mailer, and help them renew.",
  },
  {
    icon: "🌴",
    title: "Be the local face",
    body: "Be the friendly, trusted face of Island Mailer in your community — a real local, not a call center.",
  },
]

const GREAT_AMBASSADOR = [
  { b: "Well-connected locals", rest: " who genuinely love their community and know the people in it." },
  { b: "Outgoing & friendly", rest: " — you enjoy meeting people and starting conversations." },
  { b: "Know the local business scene", rest: " — you already shop, eat, and hire local." },
  { b: "Reliable & organized", rest: " — businesses can count on you to follow through." },
  { b: "A little entrepreneurial", rest: " — you like the idea of building something in your own area." },
]

export default function LocalRepsPage() {
  return (
    <div className="min-h-screen home-resident reps-page" style={{ background: "var(--navy)" }}>
      {/* HERO */}
      <div className="hero" id="top">
        <div className="bgi" style={{ position: "absolute", inset: 0, backgroundImage: `url('${KIHEI}')`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div className="overlay" />
        <div className="content">
          <div className="logo-lockup">
            <img src={LOGO} alt="Island Mailer — Support Local. Live Hawaii." />
            <span className="tag-fix" />
          </div>
          <p className="crumb" style={{ marginTop: 24 }}>
            <a href="/">Island Mailer</a> · Local Ambassadors
          </p>
          <h1>
            <span className="accent">Become a</span> Local Island Mailer Ambassador
            <span className="h1b">be the friendly local face of Island Mailer in your area</span>
          </h1>
          <p className="subhead">
            Love your community and know the local businesses that make it special? Help them get seen — and be the
            local connection between Island Mailer and the place you call home.
          </p>
          <div className="ctas">
            <a className="btn" href="#apply">I&apos;m Interested</a>
          </div>
        </div>
      </div>

      {/* WHAT A REP DOES */}
      <section>
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">What a Local Rep does</h2>
          <p className="lead reveal">
            It&apos;s simple, local, and people-first — you&apos;re the bridge between great local businesses and the
            community that loves them.
          </p>
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

      {/* WHO MAKES A GREAT AMBASSADOR */}
      <section className="shimmer">
        <div className="container">
          <div className="sec-divider">◆</div>
          <h2 className="reveal">Who makes a great ambassador</h2>
          <div className="rep-bullets">
            {GREAT_AMBASSADOR.map((g, i) => (
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

      {/* APPLY */}
      <section className="bg-navy2" id="apply">
        <div className="container">
          <div className="nominate reveal">
            <div className="sec-divider">◆</div>
            <h2 style={{ textAlign: "center" }}>Tell us a little about you</h2>
            <p className="lead">
              If you&apos;d love to represent Island Mailer in your area, drop your details below. We&apos;ll send more
              details if it&apos;s a fit.
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
