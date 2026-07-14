/*
 * offers-data.ts — SAMPLE "current mailer" dataset for the Local Offers
 * experience and the per-mailer QR target (/m/[code]).
 *
 * ⚠️ THIS IS SAMPLE DATA. Business names are generic/plausible placeholders,
 * NOT real businesses. Real advertiser offers replace this each month once the
 * advertiser intake + data spine are wired up (see CHANGES.md DEFERRED).
 */

export interface Offer {
  id: string
  business: string
  category: string
  /** Emoji icon for the category chip */
  icon: string
  /** The headline offer — keep it punchy */
  offer: string
  finePrint: string
  /** Redeem code revealed on tap */
  code: string
  phone: string
  website: string
  /** Google Maps query string */
  mapsQuery: string
}

export interface MailerData {
  code: string
  island: string
  area: string
  monthLabel: string
  offers: Offer[]
}

const NORTH_SHORE_OFFERS: Offer[] = [
  {
    id: "ns-pizza",
    business: "North Shore Pizza Co.",
    category: "Pizza",
    icon: "🍕",
    offer: "Buy one large pizza, get one free",
    finePrint: "Dine-in or takeout. One per table. Not valid with other offers.",
    code: "ALOHA2FOR1",
    phone: "8085550101",
    website: "https://example.com/north-shore-pizza",
    mapsQuery: "Pizza Paia Maui",
  },
  {
    id: "ns-bowls",
    business: "Pā'ia Bowls",
    category: "Café",
    icon: "🥐",
    offer: "$3 off any açaí or smoothie bowl",
    finePrint: "Valid before 11am. One per customer per visit.",
    code: "BOWL3OFF",
    phone: "8085550102",
    website: "https://example.com/paia-bowls",
    mapsQuery: "Acai bowls Paia Maui",
  },
  {
    id: "ns-shaveice",
    business: "Hāʻiku Shave Ice",
    category: "Ice Cream",
    icon: "🍦",
    offer: "Free scoop of ice cream with any shave ice",
    finePrint: "While supplies last. One per customer.",
    code: "FREESCOOP",
    phone: "8085550103",
    website: "https://example.com/haiku-shave-ice",
    mapsQuery: "Shave ice Haiku Maui",
  },
  {
    id: "ns-coffee",
    business: "Upcountry Coffee Roasters",
    category: "Coffee",
    icon: "☕",
    offer: "Free pastry with any large coffee",
    finePrint: "Mon–Fri only. One per customer per day.",
    code: "FREEPASTRY",
    phone: "8085550104",
    website: "https://example.com/upcountry-coffee",
    mapsQuery: "Coffee roasters Makawao Maui",
  },
  {
    id: "ns-spa",
    business: "Upcountry Spa",
    category: "Spa",
    icon: "💆",
    offer: "$25 off your first 60-minute massage",
    finePrint: "New clients only. By appointment. Mention Island Mailer.",
    code: "RELAX25",
    phone: "8085550105",
    website: "https://example.com/upcountry-spa",
    mapsQuery: "Spa Makawao Maui",
  },
  {
    id: "ns-salon",
    business: "Maliko Hair Studio",
    category: "Salon",
    icon: "✂️",
    offer: "20% off your first cut & color",
    finePrint: "New clients only. By appointment.",
    code: "NEWLOOK20",
    phone: "8085550106",
    website: "https://example.com/maliko-hair",
    mapsQuery: "Hair salon Haiku Maui",
  },
  {
    id: "ns-gym",
    business: "North Shore Fitness",
    category: "Fitness",
    icon: "🏋️",
    offer: "First month free with any membership",
    finePrint: "New members only. 3-month minimum.",
    code: "MOVEFREE",
    phone: "8085550107",
    website: "https://example.com/north-shore-fitness",
    mapsQuery: "Gym Paia Maui",
  },
  {
    id: "ns-sushi",
    business: "Kuʻau Sushi Bar",
    category: "Sushi Bar",
    icon: "🍣",
    offer: "Free miso soup & edamame with any roll",
    finePrint: "Dine-in only. One per table.",
    code: "SUSHISTART",
    phone: "8085550108",
    website: "https://example.com/kuau-sushi",
    mapsQuery: "Sushi Kuau Maui",
  },
  {
    id: "ns-boutique",
    business: "Aloha Threads Boutique",
    category: "Boutique",
    icon: "🛍️",
    offer: "20% off any one item",
    finePrint: "In-store only. Excludes sale items.",
    code: "STYLE20",
    phone: "8085550109",
    website: "https://example.com/aloha-threads",
    mapsQuery: "Boutique Paia Maui",
  },
  {
    id: "ns-home",
    business: "Island Home Services",
    category: "Home Services",
    icon: "🔧",
    offer: "$75 off any job over $500",
    finePrint: "New customers. One per household. Mention Island Mailer.",
    code: "HOME75",
    phone: "8085550110",
    website: "https://example.com/island-home-services",
    mapsQuery: "Home services Haiku Maui",
  },
  {
    id: "ns-auto",
    business: "North Shore Auto Care",
    category: "Auto",
    icon: "🚗",
    offer: "$20 off any oil change & inspection",
    finePrint: "By appointment. One per vehicle.",
    code: "AUTO20",
    phone: "8085550111",
    website: "https://example.com/north-shore-auto",
    mapsQuery: "Auto repair Paia Maui",
  },
  {
    id: "ns-bakery",
    business: "Country Town Bakery",
    category: "Bakery",
    icon: "🍰",
    offer: "Free malasada with any dozen",
    finePrint: "While supplies last. One per customer.",
    code: "SWEETDOZEN",
    phone: "8085550112",
    website: "https://example.com/country-town-bakery",
    mapsQuery: "Bakery Makawao Maui",
  },
  {
    id: "ns-foodtruck",
    business: "Garlic Shrimp Truck",
    category: "Food Truck",
    icon: "🌮",
    offer: "Free side with any plate",
    finePrint: "Cash or card. One per order.",
    code: "FREESIDE",
    phone: "8085550113",
    website: "https://example.com/garlic-shrimp-truck",
    mapsQuery: "Shrimp truck Paia Maui",
  },
  {
    id: "ns-pet",
    business: "Aloha Pet Grooming",
    category: "Pet",
    icon: "🐾",
    offer: "$15 off your first full groom",
    finePrint: "New clients. By appointment.",
    code: "PET15",
    phone: "8085550114",
    website: "https://example.com/aloha-pet",
    mapsQuery: "Pet grooming Haiku Maui",
  },
  {
    id: "ns-activities",
    business: "North Shore Surf School",
    category: "Activities",
    icon: "🤿",
    offer: "Bring a friend free on any group lesson",
    finePrint: "Reservation required. Subject to availability.",
    code: "SURF2GO",
    phone: "8085550115",
    website: "https://example.com/north-shore-surf",
    mapsQuery: "Surf lessons Paia Maui",
  },
  {
    id: "ns-happyhour",
    business: "Baldwin Beach Grill",
    category: "Happy Hour",
    icon: "🍹",
    offer: "Half-off pūpū platters, 3–5pm daily",
    finePrint: "Dine-in only. Not valid on holidays.",
    code: "PUPU50",
    phone: "8085550116",
    website: "https://example.com/baldwin-beach-grill",
    mapsQuery: "Restaurant Paia Maui",
  },
]

import { currentIssueMonth } from "@/lib/issue-month"

/* The "current mailer" shown by default on /local-offers */
export const currentMailer: MailerData = {
  code: "maui-north-shore-2026-07",
  island: "Maui",
  area: "North Shore",
  monthLabel: currentIssueMonth().label,
  offers: NORTH_SHORE_OFFERS,
}

/* All mailers, keyed by QR code (the printed QR points to /m/<code>). */
export const mailers: Record<string, MailerData> = {
  "maui-north-shore-2026-07": currentMailer,
  // A second sample code resolving to the same area for demo/QA.
  "maui-south-2026-07": {
    code: "maui-south-2026-07",
    island: "Maui",
    area: "South Maui",
    monthLabel: currentIssueMonth().label,
    offers: NORTH_SHORE_OFFERS,
  },
}

export function getMailer(code: string): MailerData | null {
  return mailers[code] ?? null
}
