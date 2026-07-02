/*
 * icons.tsx — Island Mailer gold line-icon set (v17).
 * Replaces the emoji placeholders across the resident experience.
 * All icons are thin-stroke line art drawn on a 48×48 grid, stroke = currentColor
 * (so they render gold wherever the text color is gold).
 *
 * Usage: <CategoryIcon name="Pizza" />  — falls back to a generic offer-tag icon.
 */

import type { ReactElement } from "react"

const P = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

const ICONS: Record<string, ReactElement> = {
  pizza: (
    <svg viewBox="0 0 48 48" {...P}><path d="M24 6 A 20 20 0 0 1 42 34 L24 24 Z" transform="rotate(100 24 24)" /><path d="M8 14 A 22 22 0 0 1 40 14" /><path d="M10 17 L24 42 L38 17" /><circle cx="20" cy="24" r="2.2" /><circle cx="28" cy="22" r="2.2" /><circle cx="24" cy="31" r="2.2" /></svg>
  ),
  icecream: (
    <svg viewBox="0 0 48 48" {...P}><path d="M15 22 L24 44 L33 22" /><path d="M14 15 a 5.5 5.5 0 0 1 8-6 a 6 6 0 0 1 10 2 a 5.5 5.5 0 0 1 2 11 H 15 a 5.5 5.5 0 0 1-1-7 Z" /><path d="M21 27 L24 34" /></svg>
  ),
  coffee: (
    <svg viewBox="0 0 48 48" {...P}><path d="M10 18 H34 V32 a 8 8 0 0 1-8 8 H18 a 8 8 0 0 1-8-8 Z" /><path d="M34 21 h3 a 5 5 0 0 1 0 10 h-3" /><path d="M17 12 c0-2.5 2-2.5 2-5 M25 12 c0-2.5 2-2.5 2-5" /></svg>
  ),
  cafe: (
    <svg viewBox="0 0 48 48" {...P}><path d="M12 16 H32 V26 a 7 7 0 0 1-7 7 H19 a 7 7 0 0 1-7-7 Z" /><path d="M32 18 h2.5 a 4 4 0 0 1 0 8 H32" /><path d="M8 39 H36" /><path d="M18 10 c0-2 1.6-2 1.6-4 M24 10 c0-2 1.6-2 1.6-4" /></svg>
  ),
  bakery: (
    <svg viewBox="0 0 48 48" {...P}><path d="M10 26 a 14 8 0 0 1 28 0" /><path d="M10 26 H38 V32 a 4 4 0 0 1-4 4 H14 a 4 4 0 0 1-4-4 Z" /><path d="M18 22 c1-2 3-2 4 0 M26 22 c1-2 3-2 4 0" /></svg>
  ),
  sushi: (
    <svg viewBox="0 0 48 48" {...P}><ellipse cx="22" cy="28" rx="13" ry="10" /><ellipse cx="22" cy="28" rx="5.5" ry="4" /><path d="M36 8 L28 19 M42 12 L33 21" /></svg>
  ),
  happyhour: (
    <svg viewBox="0 0 48 48" {...P}><path d="M10 8 H38 L24 26 Z" /><path d="M24 26 V38 M16 42 H32" /><path d="M28 8 L33 3" /><circle cx="19" cy="13" r="1.6" /></svg>
  ),
  health: (
    <svg viewBox="0 0 48 48" {...P}><path d="M24 42 C 24 30 26 22 38 12 C 40 26 34 38 24 42 Z" /><path d="M24 42 C 24 32 20 24 10 20 C 10 32 16 40 24 42 Z" /><path d="M24 42 C 26 32 30 24 36 18" /></svg>
  ),
  spa: (
    <svg viewBox="0 0 48 48" {...P}><path d="M24 10 c4 5 4 11 0 15 c-4-4-4-10 0-15 Z" /><path d="M10 22 c6 0 10 3 12 8 c-6 1-10-2-12-8 Z" /><path d="M38 22 c-6 0-10 3-12 8 c6 1 10-2 12-8 Z" /><path d="M14 36 c6 3 14 3 20 0" /></svg>
  ),
  salon: (
    <svg viewBox="0 0 48 48" {...P}><circle cx="12" cy="14" r="5" /><circle cx="12" cy="34" r="5" /><path d="M16 17 L40 38 M16 31 L40 10" /></svg>
  ),
  fitness: (
    <svg viewBox="0 0 48 48" {...P}><path d="M16 24 H32" /><rect x="9" y="15" width="5" height="18" rx="1.5" /><rect x="34" y="15" width="5" height="18" rx="1.5" /><path d="M4 20 v8 M44 20 v8" /></svg>
  ),
  boutique: (
    <svg viewBox="0 0 48 48" {...P}><path d="M11 16 H37 L40 40 H8 Z" /><path d="M17 21 v-6 a 7 7 0 0 1 14 0 v6" /></svg>
  ),
  homeservices: (
    <svg viewBox="0 0 48 48" {...P}><path d="M8 24 L24 9 L40 24" /><path d="M13 21 V39 H35 V21" /><path d="M21 39 v-8 h6 v8" /></svg>
  ),
  auto: (
    <svg viewBox="0 0 48 48" {...P}><path d="M8 30 L11 19 a 3 3 0 0 1 3-2 H33 a 3 3 0 0 1 3 2 L39 30" /><path d="M6 30 H42 V37 H38 M6 30 V37 H10" /><circle cx="14" cy="37" r="3.6" /><circle cx="34" cy="37" r="3.6" /><path d="M18 37 H30" /></svg>
  ),
  activities: (
    <svg viewBox="0 0 48 48" {...P}><circle cx="30" cy="12" r="5" /><path d="M4 40 c4-3 8-3 12 0 c4-3 8-3 12 0 c4-3 8-3 12 0" /><path d="M6 30 C14 24 24 24 34 27" /></svg>
  ),
  pet: (
    <svg viewBox="0 0 48 48" {...P}><circle cx="13" cy="18" r="4" /><circle cx="35" cy="18" r="4" /><circle cx="22" cy="11" r="4" /><circle cx="26" cy="11" r="4" transform="translate(4 0)" /><path d="M24 22 c6 0 10 4 10 9 a 5 5 0 0 1-5 5 c-2 0-3.5-1-5-1 s-3 1-5 1 a 5 5 0 0 1-5-5 c0-5 4-9 10-9 Z" /></svg>
  ),
  foodtruck: (
    <svg viewBox="0 0 48 48" {...P}><rect x="4" y="14" width="26" height="18" rx="2" /><path d="M30 20 H39 L44 26 V32 H30" /><circle cx="12" cy="34" r="3.6" /><circle cx="36" cy="34" r="3.6" /><path d="M9 20 H21 M9 25 H17" /></svg>
  ),
  restaurant: (
    <svg viewBox="0 0 48 48" {...P}><path d="M14 6 V20 M10 6 V14 M18 6 V14 M14 20 V42" /><path d="M10 14 a 4 4 0 0 0 8 0" /><path d="M32 6 C 28 12 28 20 32 24 V42" /><path d="M32 6 C 36 12 36 20 32 24" /></svg>
  ),
  sweets: (
    <svg viewBox="0 0 48 48" {...P}><path d="M14 26 a 10 10 0 0 1 20 0" /><path d="M12 26 H36 L33 42 H15 Z" /><path d="M20 26 c0-3 2-3 2-6 M27 26 c0-3 2-3 2-6" /></svg>
  ),
  offer: (
    <svg viewBox="0 0 48 48" {...P}><path d="M6 24 L24 6 H42 V24 L24 42 Z" /><circle cx="33" cy="15" r="3" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 48 48" {...P}><path d="M24 44 C 15 33 10 26 10 19 a 14 14 0 0 1 28 0 c0 7-5 14-14 25 Z" /><circle cx="24" cy="19" r="5" /></svg>
  ),
}

/** Alias map: human category names → icon keys */
const ALIASES: Record<string, string> = {
  "pizza": "pizza", "local pizza": "pizza",
  "ice cream": "icecream", "shave ice": "icecream",
  "coffee": "coffee", "café & coffee": "coffee", "cafe & coffee": "coffee",
  "café": "cafe", "cafe": "cafe", "local café": "cafe", "local cafe": "cafe",
  "bakery": "bakery",
  "sushi bar": "sushi", "sushi": "sushi",
  "happy hour": "happyhour",
  "health": "health", "health & wellness": "health",
  "spa": "spa", "spa & wellness": "spa",
  "salon": "salon", "hair salon": "salon", "salon & beauty": "salon",
  "fitness": "fitness",
  "boutique": "boutique", "shop & boutique": "boutique", "shop": "boutique",
  "home services": "homeservices",
  "auto": "auto",
  "activities": "activities", "activities & fun": "activities",
  "pet": "pet", "pets": "pet",
  "food truck": "foodtruck",
  "restaurant": "restaurant",
  "sweets & treats": "sweets", "sweets": "sweets",
}

export function CategoryIcon({ name, size = 28 }: { name: string; size?: number }) {
  const key = ALIASES[name.trim().toLowerCase()] ?? "offer"
  const icon = ICONS[key] ?? ICONS.offer
  return (
    <span
      className="im-ic"
      aria-hidden
      style={{ display: "inline-flex", width: size, height: size, color: "var(--gold-bright, #c9a06a)" }}
    >
      {icon}
    </span>
  )
}

export default CategoryIcon
