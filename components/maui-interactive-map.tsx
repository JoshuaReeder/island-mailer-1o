"use client"

import { useState } from "react"
import { MAUI_OUTLINE, MAUI_VIEWBOX, MAUI_REGIONS } from "@/lib/maui-outline"

/*
 * v27 — Interactive Maui area map on the TRUE island silhouette
 * (Joshua's official outline). Click a region: it fills gold and the
 * side card swaps live. Honesty rules: real numbers only where we have
 * locked route data (North Shore); everything else shows status words.
 */

type AreaKey = "west" | "central" | "north" | "upcountry" | "south"

const AREAS: Record<
  AreaKey,
  { name: string; towns: string; homes: string; routes: string; status: string; eyebrow: string; href: string }
> = {
  west: {
    name: "West Side",
    towns: "Lahaina · Kāʻanapali · Nāpili",
    homes: "—",
    routes: "—",
    status: "Coming Soon",
    eyebrow: "Future Issue",
    href: "/west-maui-advertising",
  },
  central: {
    name: "Central",
    towns: "Kahului · Wailuku",
    homes: "—",
    routes: "—",
    status: "Coming Soon",
    eyebrow: "Future Issue",
    href: "/central-maui-advertising",
  },
  north: {
    name: "North Shore",
    towns: "Pāʻia · Haʻikū · Kuʻau · Upcountry routes",
    homes: "9,471",
    routes: "18",
    status: "Reserving Now",
    eyebrow: "August Issue",
    href: "/north-shore-maui-advertising",
  },
  upcountry: {
    name: "Upcountry",
    towns: "Makawao · Kula · Pukalani",
    homes: "—",
    routes: "—",
    status: "Coming Soon",
    eyebrow: "Future Issue",
    href: "/upcountry-maui-advertising",
  },
  south: {
    name: "South Side",
    towns: "Kīhei · Wailea · Mākena",
    homes: "—",
    routes: "—",
    status: "Coming Soon",
    eyebrow: "Future Issue",
    href: "/south-maui-advertising",
  },
}

const LABELS: { key: AreaKey; x: number; y: number; name: string; towns: string; dotX: number; dotY: number }[] = [
  { key: "west", x: 565, y: 612, name: "West Side", towns: "LAHAINA · KĀʻANAPALI", dotX: 565, dotY: 640 },
  { key: "central", x: 760, y: 684, name: "Central", towns: "KAHULUI · WAILUKU", dotX: 760, dotY: 712 },
  { key: "north", x: 905, y: 545, name: "North Shore", towns: "PĀʻIA · HAʻIKŪ · KUʻAU", dotX: 905, dotY: 600 },
  { key: "upcountry", x: 930, y: 752, name: "Upcountry", towns: "MAKAWAO · KULA · PUKALANI", dotX: 930, dotY: 778 },
  { key: "south", x: 820, y: 878, name: "South Side", towns: "KĪHEI · WAILEA · MĀKENA", dotX: 820, dotY: 905 },
]

export default function MauiInteractiveMap() {
  const [sel, setSel] = useState<AreaKey>("north")
  const [swapping, setSwapping] = useState(false)

  const pick = (k: AreaKey) => {
    if (k === sel) return
    setSwapping(true)
    setTimeout(() => {
      setSel(k)
      setSwapping(false)
    }, 200)
  }

  const a = AREAS[sel]

  return (
    <div className="mmap-wrap">
      <svg
        id="mauiSvg"
        viewBox={MAUI_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        role="group"
        aria-label="Interactive map of Maui divided into five Island Mailer areas"
      >
        <defs>
          <clipPath id="mauiClip">
            <path d={MAUI_OUTLINE} />
          </clipPath>
        </defs>
        {/* land */}
        <path className="mmap-land" d={MAUI_OUTLINE} />
        {/* clickable regions clipped to the true coastline */}
        <g clipPath="url(#mauiClip)">
          {MAUI_REGIONS.map((r) => (
            <path
              key={r.key}
              className={`mmap-region${sel === r.key ? " sel" : ""}`}
              d={r.d}
              onClick={() => pick(r.key as AreaKey)}
              role="button"
              aria-label={AREAS[r.key as AreaKey].name}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") pick(r.key as AreaKey)
              }}
            />
          ))}
        </g>
        {/* coastline on top */}
        <path className="mmap-coast" d={MAUI_OUTLINE} />
        {/* labels + pulse dots */}
        {LABELS.map((l) => (
          <g key={l.key} pointerEvents="none">
            <circle className="mmap-dot" cx={l.dotX} cy={l.dotY} r="5" />
            <circle className="mmap-dot pulse" cx={l.dotX} cy={l.dotY} r="5" />
            <text className="mmap-lbl" x={l.x} y={l.y} textAnchor="middle">
              {l.name}
            </text>
            <text className="mmap-towns" x={l.x} y={l.y + 27} textAnchor="middle">
              {l.towns}
            </text>
          </g>
        ))}
        {/* compass */}
        <g opacity=".7">
          <circle cx="1070" cy="520" r="26" fill="none" stroke="#A37C4F" strokeWidth="1.5" />
          <path d="M1070,504 L1075,525 L1070,520 L1065,525 Z" fill="#C9A36B" />
          <text x="1070" y="563" textAnchor="middle" fill="#D5C1AA" fontSize="13" fontFamily="Montserrat, sans-serif">
            N
          </text>
        </g>
      </svg>

      <div className={`mmap-card${swapping ? " swap" : ""}`}>
        <span className="mc-eyebrow">{a.eyebrow}</span>
        <h3>{a.name}</h3>
        <p className="mc-towns">{a.towns}</p>
        <div className="mc-stat">
          <div>
            <b>{a.homes}</b>
            <span>households</span>
          </div>
          <div>
            <b>{a.routes}</b>
            <span>mail routes</span>
          </div>
        </div>
        <span className="mc-status">{a.status}</span>
        <a className="btn mc-btn" href={a.href}>
          Explore {a.name} →
        </a>
      </div>
    </div>
  )
}
