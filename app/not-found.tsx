import type { Metadata } from "next"

/*
 * Custom 404 — v25 (site audit polish).
 * A dead-end default 404 was the only page with no way back in.
 * Warm, branded, and points to the three main journeys.
 */

export const metadata: Metadata = {
  title: "Page Not Found | Island Mailer — Support Local. Live Hawaii.",
}

const LOGO = "/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <img
          src={LOGO}
          alt="Island Mailer — Support Local. Live Hawaii."
          style={{ width: 170, margin: "0 auto 36px" }}
        />
        <div className="sec-divider">◆</div>
        <h1 style={{ marginTop: 18 }}>Looks like this page drifted out to sea</h1>
        <p style={{ marginTop: 16, opacity: 0.85 }}>
          The page you&apos;re looking for isn&apos;t here — but the good stuff is just a step away.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 36, alignItems: "center" }}>
          <a className="btn" href="/">
            Back to Home
          </a>
          <a className="btn ghost" href="/local-offers">
            See Local Offers
          </a>
          <a className="btn ghost" href="/advertise">
            Feature Your Business
          </a>
        </div>
      </div>
    </div>
  )
}
