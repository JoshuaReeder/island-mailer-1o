"use client"

import { useState, type CSSProperties } from "react"

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

const ISLAND_LINKS = [
  { label: "Maui — All Areas", href: "/maui" },
  { label: "Kauai — All Areas", href: "/kauai" },
  { label: "Oahu — All Areas", href: "/oahu" },
  { label: "Big Island — All Areas", href: "/hawaii" },
]

/* 808-808-MAIL ⇄ 808-808-6245 vanity flip */
function Vanity({ style }: { style?: CSSProperties }) {
  return (
    <div className="vanity" style={style}>
      <span className="numwrap">
        808-808-
        <span className="flip"><b>M</b><i>6</i></span>
        <span className="flip"><b>A</b><i>2</i></span>
        <span className="flip"><b>I</b><i>4</i></span>
        <span className="flip"><b>L</b><i>5</i></span>
      </span>
      <small>808-808-MAIL · Call or Text</small>
    </div>
  )
}

function LogoLockupSmall() {
  return (
    <div className="logo-lockup small">
      <img src={LOGO} alt="Island Mailer" />
      <span className="tag-fix" />
    </div>
  )
}

interface FooterProps {
  variant?: "full" | "simple"
  showMauiAreasLink?: boolean
}

export default function Footer({ variant = "full", showMauiAreasLink = false }: FooterProps) {
  const [areasOpen, setAreasOpen] = useState(false)

  if (variant === "simple") {
    return (
      <footer>
        <div className="container" style={{ textAlign: "center" }}>
          <LogoLockupSmall />
          <Vanity style={{ marginTop: 24 }} />
          <p className="copyright">
            © Island Mailer 2026 | Support Local. Live Hawaii. ·{" "}
            <a href="/" style={{ color: "var(--gold-bright)", textDecoration: "none" }}>Home</a>
            {showMauiAreasLink && (
              <>
                {" "}·{" "}
                <a href="/maui" style={{ color: "var(--gold-bright)", textDecoration: "none" }}>Maui Areas</a>
              </>
            )}
            {" "}·{" "}
            <a href="/waitlist" style={{ color: "var(--gold-bright)", textDecoration: "none" }}>Waitlist</a>
            {" "}·{" "}
            <a href="/resources" style={{ color: "var(--gold-bright)", textDecoration: "none" }}>Resources</a>
          </p>
        </div>
      </footer>
    )
  }

  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div>
            <LogoLockupSmall />
            <Vanity />
          </div>
          <div>
            <h4>Navigation</h4>
            <a href="/">Home</a>
            <a href="/local-offers">Local Offers</a>
            <a href="/products">Products &amp; Services</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
            <a href="/#contact">Apply</a>
            <a href="/waitlist">Waitlist</a>
            <a href="/resources">Resources</a>
          </div>
          <div>
            <h4>Areas We Serve</h4>
            <div className="foot-maui-row">
              <a href="/maui">ISLANDS</a>
              <button
                className={`foot-caret${areasOpen ? " open" : ""}`}
                onClick={() => setAreasOpen((o) => !o)}
                aria-label="Show island hubs"
              >
                ⌄
              </button>
            </div>
            <div className={`foot-areas${areasOpen ? " open" : ""}`}>
              {ISLAND_LINKS.map((a) => (
                <a key={a.href} href={a.href}>
                  {a.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="https://instagram.com/islandmailer" target="_blank" rel="noopener noreferrer">
              @islandmailer
            </a>
            <a href="mailto:aloha@islandmailer.com">aloha@islandmailer.com</a>
          </div>
        </div>
        <p className="copyright">© Island Mailer 2026 | Support Local. Live Hawaii.</p>
      </div>
    </footer>
  )
}
