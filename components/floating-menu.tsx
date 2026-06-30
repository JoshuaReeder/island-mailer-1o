"use client"

import { useEffect, useState } from "react"

type NavArea = { label: string; href: string }
type NavIsland = { key: string; label: string; hub: string; areas: NavArea[] }

const ISLANDS: NavIsland[] = [
  {
    key: "maui",
    label: "MAUI",
    hub: "/maui",
    areas: [
      { label: "North Shore - Maui", href: "/north-shore-maui-advertising" },
      { label: "Central - Maui", href: "/central-maui-advertising" },
      { label: "West Side - Maui", href: "/west-maui-advertising" },
      { label: "South Side - Maui", href: "/south-maui-advertising" },
      { label: "Upcountry - Maui", href: "/upcountry-maui-advertising" },
    ],
  },
  {
    key: "kauai",
    label: "KAUAI",
    hub: "/kauai",
    areas: [
      { label: "East Side - Kauai", href: "/east-side-kauai-advertising" },
      { label: "North Shore - Kauai", href: "/north-shore-kauai-advertising" },
      { label: "South Shore - Kauai", href: "/south-shore-kauai-advertising" },
      { label: "West Side - Kauai", href: "/west-side-kauai-advertising" },
      { label: "Lihue - Kauai", href: "/lihue-kauai-advertising" },
    ],
  },
  {
    key: "oahu",
    label: "OAHU",
    hub: "/oahu",
    areas: [
      { label: "North Shore - Oahu", href: "/north-shore-oahu-advertising" },
      { label: "Windward - Oahu", href: "/windward-oahu-advertising" },
      { label: "Central - Oahu", href: "/central-oahu-advertising" },
      { label: "Leeward - Oahu", href: "/leeward-oahu-advertising" },
      { label: "Honolulu - Oahu", href: "/honolulu-oahu-advertising" },
    ],
  },
  {
    key: "hawaii",
    label: "BIG ISLAND",
    hub: "/hawaii",
    areas: [
      { label: "Hilo - Big Island", href: "/hilo-hawaii-advertising" },
      { label: "Hamakua - Big Island", href: "/hamakua-hawaii-advertising" },
      { label: "South Kohala - Big Island", href: "/south-kohala-hawaii-advertising" },
      { label: "North Kona - Big Island", href: "/north-kona-hawaii-advertising" },
      { label: "South Kona - Big Island", href: "/south-kona-hawaii-advertising" },
      { label: "Puna - Big Island", href: "/puna-hawaii-advertising" },
      { label: "Ka'u - Big Island", href: "/kaau-hawaii-advertising" },
    ],
  },
]

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [openIsland, setOpenIsland] = useState<string | null>(null)

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
          <a href="/local-offers" onClick={close}>Local Offers</a>
          <a href="/products" onClick={close}>Products &amp; Services</a>
          <a href="/#pricing" onClick={close}>Pricing</a>
          <a href="/#faq" onClick={close}>FAQ</a>
          <a href="/#contact" onClick={close}>Apply</a>
          <a href="/waitlist" onClick={close}>Waitlist</a>
          <a href="/resources" onClick={close}>Resources</a>
          <div className="nav-sub">Areas We Serve</div>
          {ISLANDS.map((isl) => (
            <div key={isl.key}>
              <div className="maui-row">
                <a href={isl.hub} onClick={close}>{isl.label}</a>
                <button
                  className={`maui-caret${openIsland === isl.key ? " open" : ""}`}
                  onClick={() => setOpenIsland((o) => (o === isl.key ? null : isl.key))}
                  aria-label={`Show ${isl.label} areas`}
                >
                  ⌄
                </button>
              </div>
              <div className={`areas-links${openIsland === isl.key ? " open" : ""}`}>
                {isl.areas.map((a) => (
                  <a key={a.href} href={a.href} onClick={close}>
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
