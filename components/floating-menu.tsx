"use client"

import { useEffect, useState } from "react"

const AREA_LINKS = [
  { label: "North Shore - Maui", href: "/north-shore-maui-advertising" },
  { label: "Central - Maui", href: "/central-maui-advertising" },
  { label: "West Side - Maui", href: "/west-maui-advertising" },
  { label: "South Side - Maui", href: "/south-maui-advertising" },
  { label: "Upcountry - Maui", href: "/upcountry-maui-advertising" },
]

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [mauiOpen, setMauiOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("nav-locked", isOpen)
    return () => document.body.classList.remove("nav-locked")
  }, [isOpen])

  const close = () => setIsOpen(false)

  return (
    <>
      <button className="fab" onClick={() => setIsOpen(true)} aria-label="Open menu">
        <svg viewBox="0 0 24 24">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      <div
        className={`nav-overlay${isOpen ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <button className="nav-close" onClick={close} aria-label="Close menu">
          ✕
        </button>
        <div className="nav-panel">
          <a href="/" onClick={close}>Home</a>
          <a href="/#pricing" onClick={close}>Pricing</a>
          <a href="/#faq" onClick={close}>FAQ</a>
          <a href="/#contact" onClick={close}>Apply</a>
          <div className="nav-sub">Areas We Serve</div>
          <div className="maui-row">
            <a href="/maui" onClick={close}>MAUI</a>
            <button
              className={`maui-caret${mauiOpen ? " open" : ""}`}
              onClick={() => setMauiOpen((o) => !o)}
              aria-label="Show Maui areas"
            >
              ⌄
            </button>
          </div>
          <div className={`areas-links${mauiOpen ? " open" : ""}`}>
            {AREA_LINKS.map((a) => (
              <a key={a.href} href={a.href} onClick={close}>
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
