"use client"

import { useEffect, useState } from "react"

const REVERSED_LOGO = "/images/island-mailer-logo-vertical-light.png"

type NavLink = { label: string; href: string; primary?: boolean }
type NavGroup = { label: string; links: NavLink[] }

const GROUPS: NavGroup[] = [
  {
    label: "For Locals",
    links: [
      { label: "Local Offers", href: "/local-offers", primary: true },
      { label: "Join the Mailing List", href: "/#optin" },
      { label: "Nominate a Favorite", href: "/#nominate" },
    ],
  },
  {
    label: "For Business Owners",
    links: [
      { label: "Get Featured", href: "/advertise" },
      { label: "Pricing & Products", href: "/products" },
      { label: "Areas We Serve", href: "/maui" },
    ],
  },
  {
    label: "Island Mailer",
    links: [
      { label: "About", href: "/advertise#about" },
      { label: "Contact", href: "/advertise#contact" },
    ],
  },
]

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("nav-locked", isOpen)
    return () => document.body.classList.remove("nav-locked")
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <button
        className={`fab${isOpen ? " on" : ""}`}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <span className="fab-bars">
          <i />
          <i />
          <i />
        </span>
      </button>
      <div
        className={`nav-overlay grouped${isOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <button className="nav-close" onClick={close} aria-label="Close menu">
          ✕
        </button>
        <div className="nav-inner">
          <a className="nav-logo-link" href="/" onClick={close} aria-label="Go to Island Mailer home">
            <img className="nav-logo" src={REVERSED_LOGO} alt="Island Mailer" />
          </a>
          {GROUPS.map((g) => (
            <div className="nav-group" key={g.label}>
              <div className="nav-label">{g.label}</div>
              {g.links.map((l) => (
                <a
                  key={l.href + l.label}
                  className={`nlink${l.primary ? " primary" : ""}`}
                  href={l.href}
                  onClick={close}
                >
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
