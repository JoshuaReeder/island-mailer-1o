export interface AreaData {
  slug: string
  title: string
  description: string
  /** Short value used for /?area=<query>#contact and the form chip pre-select */
  query: string
  /** Human region name used for schema.org areaServed (e.g. "North Shore Maui") */
  region: string
  heroImg: string
  heroAlt: string
  tag: string
  h1: string
  hooks: [string, string]
  /** Area-specific final "What's Included" bullet */
  includedFinal: { bold: string; rest: string }
  fitHeading: string
  fitList: string[]
  hoodsHeading: string
  hoodPhoto: { src: string; alt: string }
  hoods: string[]
  reserveHeading: string
  ctaBig: { pre: string; bold: string; post: string }
  crossLinks: { label: string; href: string }[]
  /** Island this area belongs to. Defaults to "Maui" for existing records. */
  island?: "Maui" | "Kauai" | "Oahu" | "Big Island"
  /** Island hub slug: "maui" | "kauai" | "oahu" | "hawaii" */
  islandSlug?: string
  /** Estimated households for "up to X local homes" copy. */
  homesEstimate?: number
  /** B1 scarcity — total ad spaces per mailing (16 = 8 front + 8 back). */
  spotsTotal?: number
  /** B1 scarcity — spaces already reserved for the NEXT mailer. Update as spots sell. */
  spotsReserved?: number
}

/*
 * Public-facing availability status (v18): we NEVER show counts publicly —
 * only a status word. Thresholds: 0 open = "full", 1–3 open = "almost-full",
 * otherwise "available".
 */
export type SpotStatus = "available" | "almost-full" | "full"

export function spotStatus(area: AreaData): SpotStatus {
  const total = area.spotsTotal ?? 0
  if (total === 0) return "available"
  const open = Math.max(0, total - (area.spotsReserved ?? 0))
  if (open === 0) return "full"
  if (open <= 3) return "almost-full"
  return "available"
}

export const SPOT_STATUS_LABEL: Record<SpotStatus, string> = {
  available: "Available",
  "almost-full": "Almost full",
  full: "Full — waitlist",
}

const PAIA_IMG = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-giDBybwI37gwn0qdjSDN7dZhdT7yvC.png"

const LINKS = {
  northShore: { label: "North Shore - Maui", href: "/north-shore-maui-advertising" },
  central: { label: "Central - Maui", href: "/central-maui-advertising" },
  west: { label: "West Side - Maui", href: "/west-maui-advertising" },
  south: { label: "South Side - Maui", href: "/south-maui-advertising" },
  upcountry: { label: "Upcountry - Maui", href: "/upcountry-maui-advertising" },
}

export const areas: Record<string, AreaData> = {
  "north-shore": {
    slug: "north-shore-maui-advertising",
    homesEstimate: 9471,
    spotsTotal: 16,
    spotsReserved: 0,
    title: "North Shore Maui Direct Mail Advertising | Island Mailer Hawaii",
    description:
      "Reach up to 10,000 North Shore Maui homes with a premium 9×12 postcard. Island Mailer puts your Pā'ia or Haʻikū business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "North Shore",
    region: "North Shore Maui",
    heroImg: PAIA_IMG,
    heroAlt: "North Shore - Maui",
    tag: "North Shore - Maui",
    h1: "Get Your North Shore Business in Front of Local Residents",
    hooks: [
      "North Shore Maui runs on word of mouth and community loyalty. But even the best businesses get overlooked when locals don't know you exist.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Pā'ia, Haʻikū, Kuʻau, Kahului's North Shore corridor, and surrounding neighborhoods. No algorithms. No ad spend that evaporates overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to North Shore residents",
      rest: " - the locals who shop, eat, and hire local",
    },
    fitHeading: "Perfect for North Shore Maui Businesses Like:",
    fitList: [
      "Restaurants, food trucks, and coffee shops in Pā'ia and Haʻikū",
      "Surf schools, yoga studios, and wellness practitioners",
      "Landscapers, contractors, and home service providers",
      "Salons, massage therapists, and body workers",
      "Boutiques, art galleries, and specialty retailers",
      "Health practitioners, chiropractors, and therapists",
    ],
    hoodsHeading: "Neighborhoods We Reach on the North Shore",
    hoodPhoto: { src: PAIA_IMG, alt: "Pā'ia Town from above — the heart of the North Shore." },
    hoods: ["Pā'ia", "Haʻikū", "Kuʻau", "Spreckelsville", "Huelo", "Peʻahi", "Maliko", "Baldwin Beach corridor"],
    reserveHeading: "Reserve Your North Shore Ad Space",
    ctaBig: {
      pre: "Spots are limited to ",
      bold: "16 businesses per mailing",
      post: " - and only one per industry.",
    },
    crossLinks: [LINKS.central, LINKS.west, LINKS.south, LINKS.upcountry],
  },
  central: {
    slug: "central-maui-advertising",
    homesEstimate: 10000,
    spotsTotal: 16,
    spotsReserved: 0,
    title: "Central Maui Direct Mail Advertising | Island Mailer Hawaii",
    description:
      "Advertise your Central Maui business to thousands of local homes. Island Mailer delivers a premium 9×12 postcard to Kahului and Wailuku residents - everything included — far less than a solo mailer.",
    query: "Central",
    region: "Central Maui",
    heroImg: "https://images.unsplash.com/photo-1636760475389-5ddb8253095f?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Central - Maui",
    tag: "Central - Maui",
    h1: "Reach Kahului & Wailuku Residents With Your Ad in Every Mailbox",
    hooks: [
      "Central Maui is the heart of the island. It's where residents live, shop, eat, and hire the people they trust. But with so much competition, getting noticed takes more than a Facebook post.",
      "Island Mailer delivers your business directly to Kahului and Wailuku homes on a massive 9×12 postcard - the most impossible-to-ignore piece of mail in the mailbox. No scrolling past it. No algorithm deciding who sees it. Just your business, front and center, in the hands of local residents.",
    ],
    includedFinal: {
      bold: "Targeted to Central Maui households",
      rest: " - Kahului, Wailuku, and surrounding areas",
    },
    fitHeading: "Perfect for Central Maui Businesses Like:",
    fitList: [
      "Restaurants and plate lunch spots serving the local workforce",
      "Auto repair, tire shops, and detailing services",
      "Medical, dental, chiropractic, and vision care providers",
      "Real estate agents, mortgage brokers, and insurance professionals",
      "Gyms, martial arts studios, and fitness centers",
      "Cleaning services, handymen, and home contractors",
    ],
    hoodsHeading: "Neighborhoods We Reach in Central Maui",
    hoodPhoto: {
      src: "https://images.unsplash.com/photo-1636760475389-5ddb8253095f?auto=format&fit=crop&w=1600&q=70",
      alt: "ʻĪao Valley — the green heart of Central Maui.",
    },
    hoods: ["Kahului", "Wailuku", "Puʻunēnē", "Waikapū", "Lower Pā'ia corridor", "Waiheʻe", "Waiehu"],
    reserveHeading: "Reserve Your Central Maui Ad Space",
    ctaBig: {
      pre: "Only ",
      bold: "16 spots per mailing",
      post: ". One per industry. First come, first served.",
    },
    crossLinks: [LINKS.northShore, LINKS.west, LINKS.south, LINKS.upcountry],
  },
  west: {
    slug: "west-maui-advertising",
    homesEstimate: 8000,
    spotsTotal: 16,
    spotsReserved: 0,
    title: "West Maui Direct Mail Advertising | Island Mailer Hawaii",
    description:
      "Advertise your West Maui business to local residents in Lahaina, Kāʻanapali, and Nāpili. Island Mailer's 9×12 postcard reaches up to 10,000 homes - one flat per-ad-space rate, everything included.",
    query: "West",
    region: "West Maui",
    heroImg: "https://images.unsplash.com/photo-1563121625-969780a24e77?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "West Side - Maui",
    tag: "West Side - Maui",
    h1: "Put Your West Maui Business in Local Mailboxes - Not Just Tourist Feeds",
    hooks: [
      "West Maui is rebuilding, resilient, and more community-focused than ever. Local residents want to support businesses that are part of the ʻohana - but first, they need to know you're there.",
      "Island Mailer reaches West Maui households directly, from Lahaina to Kāʻanapali to Nāpili, with a premium 9×12 postcard that carries your offer straight to their door. Physical. Tangible. Impossible to scroll past.",
    ],
    includedFinal: {
      bold: "Focused on West Maui residents",
      rest: " - the people who live here, work here, and spend here",
    },
    fitHeading: "Perfect for West Maui Businesses Like:",
    fitList: [
      "Local restaurants, delis, and grocery stores serving the community",
      "Contractors, electricians, plumbers, and builders (especially critical post-2023)",
      "Hair salons, spas, and wellness services",
      "Childcare, tutoring, and family services",
      "Fitness studios, yoga, and personal trainers",
      "Real estate professionals working in the Lahaina recovery market",
    ],
    hoodsHeading: "Neighborhoods We Reach in West Maui",
    hoodPhoto: {
      src: "https://images.unsplash.com/photo-1664486755049-a5f82a4a0ae0?auto=format&fit=crop&w=1600&q=70",
      alt: "Swimming at Puʻu Kekaʻa (Black Rock), Kāʻanapali — West Side waters.",
    },
    hoods: ["Lahaina", "Kāʻanapali", "Nāpili", "Honokowai", "Kapalua", "Olowalu", "Māʻalaea corridor"],
    reserveHeading: "Reserve Your West Maui Ad Space",
    ctaBig: {
      pre: "Limited to ",
      bold: "16 businesses per mailing",
      post: ", one per industry.",
    },
    crossLinks: [LINKS.northShore, LINKS.central, LINKS.south, LINKS.upcountry],
  },
  south: {
    slug: "south-maui-advertising",
    homesEstimate: 9000,
    spotsTotal: 16,
    spotsReserved: 0,
    title: "South Maui Direct Mail Advertising | Island Mailer Hawaii",
    description:
      "Reach Kīhei, Wailea, and Mākena residents with your ad on a premium 9×12 postcard. Island Mailer delivers direct mail advertising for South Maui businesses - one flat per-ad-space rate, everything included.",
    query: "South",
    region: "South Maui",
    heroImg: "https://images.unsplash.com/photo-1678156913491-d9a6b5f33db1?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "South Side - Maui",
    tag: "South Side - Maui",
    h1: "Reach Kīhei & Wailea Residents With a Mailbox Billboard They Can't Ignore",
    hooks: [
      "South Maui has one of the most densely populated residential corridors on the island. Kīhei alone is packed with local families, long-term residents, and working professionals who support their community - they just need to know your business exists.",
      "Island Mailer puts your ad directly in their hands with a massive 9×12 postcard delivered to South Maui homes. It's the highest-impact local advertising on the market - no digital noise, no pay-per-click, no guessing.",
    ],
    includedFinal: {
      bold: "Targeted South Maui delivery",
      rest: " - Kīhei, Wailea, and surrounding neighborhoods",
    },
    fitHeading: "Perfect for South Maui Businesses Like:",
    fitList: [
      "Kīhei restaurants, cafés, shave ice, and food trucks",
      "Gyms, yoga studios, pilates, and personal trainers",
      "Cleaning services, pool maintenance, and landscapers",
      "Salons, aestheticians, and massage therapists",
      "Medical, dental, and chiropractic offices",
      "Insurance, financial planning, and real estate professionals",
    ],
    hoodsHeading: "Neighborhoods We Reach in South Maui",
    hoodPhoto: {
      src: "https://images.unsplash.com/photo-1757999090827-da0f5856222b?auto=format&fit=crop&w=1600&q=70",
      alt: "South Side sunset — palms over a golden Pacific.",
    },
    hoods: ["Kīhei", "Wailea", "Mākena", "Kenolio", "Kamaʻole", "North Kīhei corridor", "Waiʻakoa"],
    reserveHeading: "Reserve Your South Maui Ad Space",
    ctaBig: {
      pre: "Only ",
      bold: "16 spots per mailing",
      post: ". One per industry. Reserve yours before your category is taken.",
    },
    crossLinks: [LINKS.northShore, LINKS.central, LINKS.west, LINKS.upcountry],
  },
  upcountry: {
    slug: "upcountry-maui-advertising",
    homesEstimate: 7000,
    spotsTotal: 16,
    spotsReserved: 0,
    title: "Upcountry Maui Direct Mail Advertising | Island Mailer Hawaii",
    description:
      "Reach Makawao, Kula, and Pukalani residents with Island Mailer's premium 9×12 postcard. Local advertising for Upcountry Maui businesses - design, print & postage included — a fraction of a solo mailer.",
    query: "Upcountry",
    region: "Upcountry Maui",
    heroImg: "https://images.unsplash.com/photo-1507032336878-13f159192baa?auto=format&fit=crop&w=1600&q=70",
    heroAlt: "Upcountry - Maui",
    tag: "Upcountry - Maui",
    h1: "Upcountry Maui Businesses: Reach Your Neighbors Directly",
    hooks: [
      "Upcountry has a tight-knit community that runs on trust, reputation, and local loyalty. Residents up here are intentional about where they spend - they support businesses that feel like theirs. But they can't support you if they don't know you're there.",
      "Island Mailer delivers your business to Upcountry Maui mailboxes - Makawao, Kula, Pukalani, Haiku foothills, and surrounding communities - on a premium 9×12 postcard that stands out in every mailbox it lands in. No algorithms. No tourist traffic. Just direct, local reach to the people who live on this mountainside with you.",
    ],
    includedFinal: {
      bold: "Upcountry-focused delivery",
      rest: " - the people who actually live in your community",
    },
    fitHeading: "Perfect for Upcountry Maui Businesses Like:",
    fitList: [
      "Farm stands, ranches, and locally grown food businesses",
      "Makawao boutiques, art galleries, and specialty shops",
      "Veterinarians, farriers, and equine services",
      "Landscapers, contractors, and property maintenance",
      "Yoga studios, wellness practitioners, and therapists",
      "Schools, tutors, and family services",
    ],
    hoodsHeading: "Neighborhoods We Reach Upcountry",
    hoodPhoto: {
      src: "https://images.unsplash.com/photo-1522193641451-c2a16403adca?auto=format&fit=crop&w=1600&q=70",
      alt: "Upcountry roads above the clouds — Haleakalā country.",
    },
    hoods: ["Makawao", "Kula", "Pukalani", "Keokea", "Waiakoa", "ʻUlupalakua", "Haʻikū foothills", "Olinda"],
    reserveHeading: "Reserve Your Upcountry Ad Space",
    ctaBig: {
      pre: "",
      bold: "16 spots per mailing.",
      post: " One per industry. Upcountry businesses move fast - don't wait.",
    },
    crossLinks: [LINKS.northShore, LINKS.central, LINKS.west, LINKS.south],
  },
}

/* ============================================================
   MULTI-ISLAND EXPANSION — Kauai, Oahu, Big Island
   ============================================================ */

const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=70`
// Real, accurate place photos via Wikimedia Commons (stable, hotlink-friendly, auto-resized)
const WIKI = (file: string) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=1600`

export interface IslandConfig {
  islandName: string
  /** "Kauai" | "Oahu" | "Big Island" — value used for waitlist prefill + tags */
  islandKey: "Maui" | "Kauai" | "Oahu" | "Big Island"
  islandSlug: string
  navLabel: string
  hubTitle: string
  hubMetaDesc: string
  hubH1: string
  hubHook: string
  hubHeroImg: string
  totalHomesLabel: string
  /** ordered area slugs belonging to this island */
  areaSlugs: string[]
}

/* Helper to build a "We Serve All of {Island}" cross-link list for an island.
   Given the current area's slug, returns the sibling areas + adds nothing else
   (hub/pricing/waitlist links are added by the component). */
export function siblingLinks(islandAreas: AreaData[], currentSlug: string) {
  return islandAreas
    .filter((a) => a.slug !== currentSlug)
    .map((a) => ({ label: a.tag, href: `/${a.slug}` }))
}

/* ---------- shared "What's Included" + "Reserve" boilerplate ---------- */
const RESERVE_CTA = {
  pre: "Spots are limited to ",
  bold: "16 businesses per mailing",
  post: " — and only one per industry.",
}

/* =====================  KAUAI  ===================== */
export const kauaiAreas: Record<string, AreaData> = {
  "east-side": {
    slug: "east-side-kauai-advertising",
    title: "East Side Kauai Advertising (Coconut Coast) | Island Mailer",
    description:
      "Reach up to 8,000 East Side Kauai homes with a premium 9×12 postcard. Island Mailer puts your Kapaa or Wailua business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "East Side",
    region: "East Side Kauai",
    island: "Kauai",
    islandSlug: "kauai",
    homesEstimate: 8000,
    heroImg: WIKI("Kapaa_Kauai_Hawaii.jpg"),
    heroAlt: "East Side - Kauai (Coconut Coast)",
    tag: "East Side - Kauai",
    h1: "Get Your East Side Business in Front of Local Residents",
    hooks: [
      "East Side Kauai runs on daily foot traffic, word of mouth, and community loyalty. But even the best businesses get overlooked when locals don't know you exist.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Kapaa, Wailua, Anahola, and surrounding neighborhoods. No algorithms. No ad spend that evaporates overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to East Side residents",
      rest: " — the locals who shop, eat, hire, and support local",
    },
    fitHeading: "Perfect for East Side Kauai Businesses Like:",
    fitList: [
      "Restaurants, food trucks, and coffee shops in Kapaa and Wailua",
      "Retail boutiques, surf shops, and specialty retailers",
      "Salons, spas, massage therapy, and wellness services",
      "Contractors, handymen, plumbers, electricians, and home service providers",
      "Yoga studios, fitness centers, and personal trainers",
      "Tour operators, activity businesses, and hospitality services",
    ],
    hoodsHeading: "Neighborhoods We Reach on the East Side",
    hoodPhoto: { src: WIKI("NaPali_overlook_Kalalau_Valley.jpg"), alt: "Kapaa and the Coconut Coast — the East Side of Kauai." },
    hoods: ["Kapaa", "Wailua", "Anahola", "Kealia", "Waipouli", "Kuamoo", "Kaumakani", "Moikeha", "Kapaaia"],
    reserveHeading: "Reserve Your East Side Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  "north-shore": {
    slug: "north-shore-kauai-advertising",
    title: "North Shore Kauai Advertising | Island Mailer",
    description:
      "Reach up to 3,300 North Shore Kauai homes with a premium 9×12 postcard. Island Mailer puts your Hanalei or Princeville business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "North Shore",
    region: "North Shore Kauai",
    island: "Kauai",
    islandSlug: "kauai",
    homesEstimate: 3300,
    heroImg: WIKI("Hanalei%2C_Kauai_HI.JPG"),
    heroAlt: "North Shore - Kauai",
    tag: "North Shore - Kauai",
    h1: "Get Your North Shore Business in Front of Premium Local Residents",
    hooks: [
      "North Shore Kauai runs on creativity, wellness, and conscious spending. It's lush. It's beautiful. And it's a tight-knit community of people who value local businesses. But even exceptional businesses can get overlooked when residents don't know you exist.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Hanalei, Princeville, Kilauea, and surrounding neighborhoods. No algorithms. No ad spend that evaporates overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to North Shore residents",
      rest: " — the affluent, creative locals who invest in quality",
    },
    fitHeading: "Perfect for North Shore Kauai Businesses Like:",
    fitList: [
      "Art galleries, studios, and creative services",
      "Wellness practitioners, yoga studios, and meditation retreats",
      "Upscale boutiques, artisan shops, and specialty retailers",
      "Farm-to-table restaurants and organic food businesses",
      "Vacation rentals, luxury lodging, and hospitality",
      "Outdoor activity operators and guided tours",
    ],
    hoodsHeading: "Neighborhoods We Reach on the North Shore",
    hoodPhoto: { src: WIKI("NaPali_overlook_Kalalau_Valley.jpg"), alt: "Hanalei Bay and the lush North Shore cliffs of Kauai." },
    hoods: ["Hanalei", "Princeville", "Kilauea", "Ha'ena", "Anini Beach", "Haeae", "Moloaa", "Kalihiwai", "Lumahai"],
    reserveHeading: "Reserve Your North Shore Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  "south-shore": {
    slug: "south-shore-kauai-advertising",
    title: "South Shore Kauai Advertising | Island Mailer",
    description:
      "Reach up to 5,000 South Shore Kauai homes with a premium 9×12 postcard. Island Mailer puts your Poipu or Koloa business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "South Shore",
    region: "South Shore Kauai",
    island: "Kauai",
    islandSlug: "kauai",
    homesEstimate: 5000,
    heroImg: WIKI("Aerial-Poipu-Beach-Park-Kauai.jpg"),
    heroAlt: "South Shore - Kauai",
    tag: "South Shore - Kauai",
    h1: "Get Your South Shore Business in Front of Local & Tourist Residents",
    hooks: [
      "South Shore Kauai is the sunniest side of the island. Year-round good weather, families, resorts, and a thriving mix of locals and repeat visitors. It's the perfect place to build a business — but only if locals know you're there.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Poipu, Koloa, Kalaheo, and surrounding neighborhoods. No algorithms. No ad spend that evaporates overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to South Shore residents",
      rest: " — families, resorts, and active locals",
    },
    fitHeading: "Perfect for South Shore Kauai Businesses Like:",
    fitList: [
      "Restaurants, bars, and dining establishments",
      "Resort and hospitality services",
      "Golf courses and recreation facilities",
      "Real estate and property management",
      "Retail shops and specialty boutiques",
      "Home services, contractors, and maintenance",
    ],
    hoodsHeading: "Neighborhoods We Reach on the South Shore",
    hoodPhoto: { src: WIKI("NaPali_overlook_Kalalau_Valley.jpg"), alt: "Sunny Poipu Beach — the South Shore of Kauai." },
    hoods: ["Poipu", "Koloa", "Kalaheo", "Lawai", "Omao", "Mawali", "Waihou", "Kukuiolono"],
    reserveHeading: "Reserve Your South Shore Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  "west-side": {
    slug: "west-side-kauai-advertising",
    title: "West Side Kauai Advertising | Island Mailer",
    description:
      "Reach up to 4,100 West Side Kauai homes with a premium 9×12 postcard. Island Mailer puts your Waimea or Hanapepe business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "West Side",
    region: "West Side Kauai",
    island: "Kauai",
    islandSlug: "kauai",
    homesEstimate: 4100,
    heroImg: WIKI("Waimea_Canyon_mar_2010.jpg"),
    heroAlt: "West Side - Kauai",
    tag: "West Side - Kauai",
    h1: "Get Your West Side Business in Front of Fiercely Local Residents",
    hooks: [
      "West Side Kauai is where island authenticity lives. Waimea. Hanapepe. Kekaha. These are tight-knit communities built on trust, history, and genuine support for local business. It's one of the most underestimated business markets on Kauai. And it's ready.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Waimea, Hanapepe, Kekaha, and surrounding neighborhoods. No algorithms. No ad spend that evaporates overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to West Side residents",
      rest: " — authentic, grounded, loyal customers",
    },
    fitHeading: "Perfect for West Side Kauai Businesses Like:",
    fitList: [
      "Local restaurants, cafes, and food services",
      "Art galleries, craft businesses, and artisans",
      "Contractors, handymen, and home services",
      "Retail shops and general stores",
      "Tour operators and guide services",
      "Farm stands and agricultural businesses",
    ],
    hoodsHeading: "Neighborhoods We Reach on the West Side",
    hoodPhoto: { src: WIKI("NaPali_overlook_Kalalau_Valley.jpg"), alt: "Waimea Canyon overlook — the West Side of Kauai." },
    hoods: ["Waimea", "Hanapepe", "Kekaha", "Kaumakani", "Mana", "Kokee", "Polihale", "Milolii"],
    reserveHeading: "Reserve Your West Side Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  lihue: {
    slug: "lihue-kauai-advertising",
    title: "Lihue Kauai Advertising | Island Mailer",
    description:
      "Reach up to 6,800 Lihue Kauai homes with a premium 9×12 postcard. Island Mailer puts your Lihue business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Lihue",
    region: "Lihue Kauai",
    island: "Kauai",
    islandSlug: "kauai",
    homesEstimate: 6800,
    heroImg: WIKI("Lihue-hawaii-aerial.jpg"),
    heroAlt: "Lihue - Kauai",
    tag: "Lihue - Kauai",
    h1: "Get Your Lihue Business in Front of the Island's Most Active Residents",
    hooks: [
      "Lihue is Kauai's working heart. Government offices. Schools. Hospital. Shopping. Banks. Every day, thousands of islanders pass through Lihue to work, shop, and live. But many local businesses get buried in the noise. Island Mailer cuts through.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Lihue, Hanamaulu, Kapaaia, and surrounding neighborhoods. No algorithms. No ad spend that evaporates overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Lihue residents",
      rest: " — the island's most active workforce",
    },
    fitHeading: "Perfect for Lihue Kauai Businesses Like:",
    fitList: [
      "Grocery stores, pharmacies, and retail shops",
      "Banks, insurance, and professional services",
      "Medical offices, dentists, and health services",
      "Restaurants, cafes, and food services",
      "Auto services, repair, and maintenance",
      "Home improvement and contractor services",
    ],
    hoodsHeading: "Neighborhoods We Reach in Lihue",
    hoodPhoto: { src: WIKI("NaPali_overlook_Kalalau_Valley.jpg"), alt: "Lihue town and Nawiliwili Harbor — the hub of Kauai." },
    hoods: ["Lihue Town Center", "Kapaaia", "Hanamaulu", "Nawiliwili", "Niumalu", "Hanamalu Valley", "Puhi"],
    reserveHeading: "Reserve Your Lihue Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
}

/* =====================  OAHU  ===================== */
export const oahuAreas: Record<string, AreaData> = {
  "north-shore": {
    slug: "north-shore-oahu-advertising",
    title: "North Shore Oahu Advertising | Island Mailer",
    description:
      "Reach up to 7,500 North Shore Oahu homes with a premium 9×12 postcard. Island Mailer puts your Haleiwa or Kahuku business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "North Shore",
    region: "North Shore Oahu",
    island: "Oahu",
    islandSlug: "oahu",
    homesEstimate: 7500,
    heroImg: WIKI("WaimeaBay.jpg"),
    heroAlt: "North Shore - Oahu",
    tag: "North Shore - Oahu",
    h1: "Get Your North Shore Business in Front of the Locals Who Live Here",
    hooks: [
      "The North Shore is country — rural, surf-soaked, and proudly tight-knit. From Haleiwa to Kahuku, residents look out for their own and spend with businesses that feel like neighbors. But even a beloved shop gets passed by when locals simply don't know it's there.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Haleiwa, Waialua, Sunset Beach, Kahuku, and the surrounding country towns. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to North Shore residents",
      rest: " — the country locals who keep their dollars close to home",
    },
    fitHeading: "Perfect for North Shore Oahu Businesses Like:",
    fitList: [
      "Surf shops, board makers, and ocean-sport schools",
      "Food trucks, shrimp trucks, cafes, and casual eateries",
      "Salons, barbers, massage, and wellness practitioners",
      "Contractors, handymen, landscapers, and home services",
      "Boutiques, art studios, and local makers",
      "Farm stands, agritourism, and activity operators",
    ],
    hoodsHeading: "Neighborhoods We Reach on the North Shore",
    hoodPhoto: { src: WIKI("2022_Views_from_Diamond_Head_02.jpg"), alt: "Haleiwa and the North Shore country towns of Oahu." },
    hoods: ["Haleiwa", "Waialua", "Sunset Beach", "Pupukea", "Kahuku", "Mokuleia", "Laie corridor"],
    reserveHeading: "Reserve Your North Shore Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  windward: {
    slug: "windward-oahu-advertising",
    title: "Windward Oahu Advertising | Island Mailer",
    description:
      "Reach up to 24,800 Windward Oahu homes with a premium 9×12 postcard. Island Mailer puts your Kailua or Kaneohe business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Windward",
    region: "Windward Oahu",
    island: "Oahu",
    islandSlug: "oahu",
    homesEstimate: 24800,
    heroImg: WIKI("Lanikai_Beach%2C_Hawaii.JPG"),
    heroAlt: "Windward - Oahu",
    tag: "Windward - Oahu",
    h1: "Get Your Windward Business in Front of Family Households",
    hooks: [
      "The Windward side is lush, scenic, and family-first. Kailua and Kaneohe are full of long-term residents, growing families, and locals who shop close to home rather than fight traffic into town. It's one of the most loyal residential markets on Oahu.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Kailua, Kaneohe, Waimanalo, and the Koolaupoko neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Windward households",
      rest: " — the families and long-term residents who shop their own side",
    },
    fitHeading: "Perfect for Windward Oahu Businesses Like:",
    fitList: [
      "Restaurants, cafes, bakeries, and plate-lunch spots",
      "Family services, childcare, tutoring, and schools",
      "Salons, spas, gyms, and wellness studios",
      "Contractors, plumbers, electricians, and home services",
      "Boutiques, pet care, and specialty retail",
      "Medical, dental, and chiropractic offices",
    ],
    hoodsHeading: "Neighborhoods We Reach on the Windward Side",
    hoodPhoto: { src: WIKI("2022_Views_from_Diamond_Head_02.jpg"), alt: "The lush Koolau cliffs over Windward Oahu." },
    hoods: ["Kailua", "Kaneohe", "Waimanalo", "Kahaluu", "Heeia", "Maunawili", "Enchanted Lake"],
    reserveHeading: "Reserve Your Windward Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  central: {
    slug: "central-oahu-advertising",
    title: "Central Oahu Advertising | Island Mailer",
    description:
      "Reach up to 25,200 Central Oahu homes with a premium 9×12 postcard. Island Mailer puts your Mililani or Wahiawa business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Central",
    region: "Central Oahu",
    island: "Oahu",
    islandSlug: "oahu",
    homesEstimate: 25200,
    heroImg: WIKI("Rainbow_in_Wahiawa%2C_Hawaii.jpg"),
    heroAlt: "Central - Oahu",
    tag: "Central - Oahu",
    h1: "Get Your Central Oahu Business in Front of Steady Local Households",
    hooks: [
      "Central Oahu is the island's residential backbone — Mililani, Wahiawa, and the military corridor around Schofield. It's a dependable, working-family market where households put down roots and look for trusted businesses close to home.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Mililani, Wahiawa, Waipio, and the surrounding Central neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Central Oahu households",
      rest: " — the working families who anchor the island's core",
    },
    fitHeading: "Perfect for Central Oahu Businesses Like:",
    fitList: [
      "Restaurants, takeout, and plate-lunch spots",
      "Auto repair, tires, and detailing services",
      "Gyms, martial arts, and youth sports programs",
      "Tutoring, childcare, and family services",
      "Salons, barbers, and personal care",
      "Home services, cleaning, and contractors",
    ],
    hoodsHeading: "Neighborhoods We Reach in Central Oahu",
    hoodPhoto: { src: WIKI("2022_Views_from_Diamond_Head_02.jpg"), alt: "The red-earth pineapple fields of Central Oahu." },
    hoods: ["Mililani", "Wahiawa", "Waipio", "Waikele", "Royal Kunia", "Whitmore Village", "Schofield corridor"],
    reserveHeading: "Reserve Your Central Oahu Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  leeward: {
    slug: "leeward-oahu-advertising",
    title: "Leeward Oahu Advertising | Island Mailer",
    description:
      "Reach up to 40,000 Leeward Oahu homes with a premium 9×12 postcard. Island Mailer puts your Kapolei or Ewa Beach business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Leeward",
    region: "Leeward Oahu",
    island: "Oahu",
    islandSlug: "oahu",
    homesEstimate: 40000,
    heroImg: WIKI("Kapolei_Oahu_Aerial.jpg"),
    heroAlt: "Leeward - Oahu",
    tag: "Leeward - Oahu",
    h1: "Get Your Leeward Business in Front of Oahu's Fastest-Growing Communities",
    hooks: [
      "The Leeward side is where Oahu is growing. Kapolei, Ewa Beach, and Makakilo are filling with new homes and young families, while Waianae and Koolina hold deep local roots. It's a wide-open, mixed-income market hungry for businesses that show up for the community.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Kapolei, Ewa Beach, Makakilo, Waianae, and the surrounding Leeward neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Leeward households",
      rest: " — the growing, mixed-income communities of West Oahu",
    },
    fitHeading: "Perfect for Leeward Oahu Businesses Like:",
    fitList: [
      "Restaurants, food trucks, and family dining",
      "Home builders, contractors, and renovation services",
      "Real estate, mortgage, and insurance professionals",
      "Gyms, fitness studios, and youth programs",
      "Salons, spas, and personal care",
      "Auto services, cleaning, and home maintenance",
    ],
    hoodsHeading: "Neighborhoods We Reach on the Leeward Side",
    hoodPhoto: { src: WIKI("2022_Views_from_Diamond_Head_02.jpg"), alt: "The sunny Leeward coast of West Oahu." },
    hoods: ["Kapolei", "Ewa Beach", "Makakilo", "Waianae", "Koolina", "Nanakuli", "Maili", "Waipahu corridor"],
    reserveHeading: "Reserve Your Leeward Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  honolulu: {
    slug: "honolulu-oahu-advertising",
    title: "Honolulu Advertising | Island Mailer",
    description:
      "Reach up to 60,000 Honolulu homes with a premium 9×12 postcard. Island Mailer puts your Honolulu business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Honolulu",
    region: "Honolulu Urban Oahu",
    island: "Oahu",
    islandSlug: "oahu",
    homesEstimate: 60000,
    heroImg: WIKI("City_of_Waikiki_view.jpg"),
    heroAlt: "Honolulu - Oahu",
    tag: "Honolulu - Oahu",
    h1: "Get Your Honolulu Business in Front of the People Who Live in the City",
    hooks: [
      "Honolulu is dense, fast, and full of options — which is exactly why local residents tune most of it out. Behind the tourist hubs are real neighborhoods like Kaimuki, Kahala, and Diamond Head where residents quietly look for businesses worth their loyalty.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Honolulu's residential neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in the hands of the people who actually live here.",
    ],
    includedFinal: {
      bold: "Targeted to Honolulu residents",
      rest: " — the neighbors behind the tourist hubs, not the visitors",
    },
    fitHeading: "Perfect for Honolulu Businesses Like:",
    fitList: [
      "Neighborhood restaurants, cafes, and bakeries",
      "Boutique retail, services, and specialty shops",
      "Medical, dental, and wellness providers",
      "Gyms, studios, and personal trainers",
      "Real estate, financial, and professional services",
      "Home services, cleaning, and contractors",
    ],
    hoodsHeading: "Neighborhoods We Reach in Honolulu",
    hoodPhoto: { src: WIKI("2022_Views_from_Diamond_Head_02.jpg"), alt: "Honolulu and Diamond Head from above." },
    hoods: ["Kaimuki", "Kahala", "Diamond Head", "Manoa", "Nuuanu", "Kakaako", "Moiliili", "Palolo"],
    reserveHeading: "Reserve Your Honolulu Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
}

/* =====================  BIG ISLAND (HAWAII)  ===================== */
export const bigIslandAreas: Record<string, AreaData> = {
  hilo: {
    slug: "hilo-hawaii-advertising",
    title: "Hilo Big Island Advertising | Island Mailer",
    description:
      "Reach up to 17,200 Hilo homes with a premium 9×12 postcard. Island Mailer puts your Hilo or Keaau business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Hilo",
    region: "Hilo Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 17200,
    heroImg: WIKI("Hilo.jpg"),
    heroAlt: "Hilo - Big Island",
    tag: "Hilo - Big Island",
    h1: "Get Your Hilo Business in Front of the Island's Largest Local Market",
    hooks: [
      "Hilo is the working heart of the Big Island — historic, rooted, and refreshingly local. Residents here favor the businesses that have earned their trust over the years. But with a busy daily rhythm, even a great shop can slip out of mind when nothing reminds people it's there.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Hilo, Keaau, and the surrounding East Hawaii neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Hilo-area residents",
      rest: " — the working-class families who anchor East Hawaii",
    },
    fitHeading: "Perfect for Hilo Businesses Like:",
    fitList: [
      "Restaurants, plate-lunch spots, and bakeries",
      "Auto repair, tires, and detailing services",
      "Medical, dental, and health providers",
      "Retail shops, hardware, and specialty stores",
      "Salons, barbers, and personal care",
      "Contractors, plumbers, and home services",
    ],
    hoodsHeading: "Neighborhoods We Reach in Hilo",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "Historic Hilo Bay on the Big Island." },
    hoods: ["Hilo Town", "Keaau", "Kaumana", "Waiakea", "Keaukaha", "Panaewa", "Pepeekeo corridor"],
    reserveHeading: "Reserve Your Hilo Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  hamakua: {
    slug: "hamakua-hawaii-advertising",
    title: "Hamakua Big Island Advertising | Island Mailer",
    description:
      "Reach up to 2,600 Hamakua Coast homes with a premium 9×12 postcard. Island Mailer puts your Honokaa or Waipio business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Hamakua",
    region: "Hamakua Coast Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 2600,
    heroImg: WIKI("Waipio_Lookout_View.jpg"),
    heroAlt: "Hamakua Coast - Big Island",
    tag: "Hamakua - Big Island",
    h1: "Get Your Hamakua Business in Front of a Tight-Knit Country Market",
    hooks: [
      "The Hamakua Coast is scenic, rural, and deeply local. Honokaa, Laupahoehoe, and the Waipio Valley towns are small, but the community loyalty runs deep — people here genuinely root for the businesses that serve their stretch of coast.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Honokaa, Laupahoehoe, and the Hamakua Coast neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Hamakua residents",
      rest: " — the close-knit country households of the coast",
    },
    fitHeading: "Perfect for Hamakua Businesses Like:",
    fitList: [
      "Country restaurants, cafes, and bakeries",
      "Farm stands, ranches, and agricultural businesses",
      "General stores and specialty retail",
      "Contractors, handymen, and home services",
      "Artisans, makers, and creative services",
      "Tour operators and activity businesses",
    ],
    hoodsHeading: "Neighborhoods We Reach on the Hamakua Coast",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "The green cliffs of the Hamakua Coast." },
    hoods: ["Honokaa", "Laupahoehoe", "Waipio", "Paauilo", "Ookala", "Kukuihaele", "Honomu"],
    reserveHeading: "Reserve Your Hamakua Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  "south-kohala": {
    slug: "south-kohala-hawaii-advertising",
    title: "South Kohala Big Island Advertising | Island Mailer",
    description:
      "Reach up to 7,000 South Kohala homes with a premium 9×12 postcard. Island Mailer puts your Waimea or Kohala Coast business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "South Kohala",
    region: "South Kohala Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 7000,
    heroImg: WIKI("Skimboarder_at_hapuna_beach.jpg"),
    heroAlt: "South Kohala - Big Island",
    tag: "South Kohala - Big Island",
    h1: "Get Your South Kohala Business in Front of an Affluent Local Market",
    hooks: [
      "South Kohala is cowboy country and luxury coast in one — Waimea ranchlands meeting the resort belt along the Kohala Coast. It draws affluent, discerning residents who happily support quality businesses that earn their attention.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Waimea, the Kohala Coast, and the surrounding South Kohala neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to South Kohala residents",
      rest: " — the affluent ranch and coast households of West Hawaii",
    },
    fitHeading: "Perfect for South Kohala Businesses Like:",
    fitList: [
      "Upscale restaurants, cafes, and caterers",
      "Home services, contractors, and property management",
      "Real estate, insurance, and professional services",
      "Wellness, spa, fitness, and personal trainers",
      "Boutiques, galleries, and specialty retail",
      "Ranch, equine, and agricultural services",
    ],
    hoodsHeading: "Neighborhoods We Reach in South Kohala",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "Waimea ranchlands of South Kohala." },
    hoods: ["Waimea", "Waikoloa", "Mauna Lani", "Puako", "Kawaihae", "Kohala Coast resorts"],
    reserveHeading: "Reserve Your South Kohala Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  "north-kona": {
    slug: "north-kona-hawaii-advertising",
    title: "North Kona Big Island Advertising | Island Mailer",
    description:
      "Reach up to 15,300 North Kona homes with a premium 9×12 postcard. Island Mailer puts your Kailua-Kona business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "North Kona",
    region: "North Kona Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 15300,
    heroImg: WIKI("Kona_Mauka.jpg"),
    heroAlt: "North Kona - Big Island",
    tag: "North Kona - Big Island",
    h1: "Get Your North Kona Business in Front of the West Side's Busiest Market",
    hooks: [
      "North Kona is the commercial hub of West Hawaii. Kailua-Kona and Holualoa buzz with residents, businesses, and a steady tourist crossover — which means real opportunity and real competition for local attention.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Kailua-Kona, Holualoa, and the surrounding North Kona neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to North Kona residents",
      rest: " — the locals behind West Hawaii's busiest town",
    },
    fitHeading: "Perfect for North Kona Businesses Like:",
    fitList: [
      "Restaurants, cafes, coffee shops, and food trucks",
      "Retail, boutiques, and specialty shops",
      "Real estate, insurance, and professional services",
      "Medical, dental, and wellness providers",
      "Gyms, studios, and fitness businesses",
      "Auto, home services, and contractors",
    ],
    hoodsHeading: "Neighborhoods We Reach in North Kona",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "Kailua-Kona on the West Hawaii coast." },
    hoods: ["Kailua-Kona", "Holualoa", "Kalaoa", "Honokohau", "Keauhou", "Kahaluu", "Kona Palisades"],
    reserveHeading: "Reserve Your North Kona Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  "south-kona": {
    slug: "south-kona-hawaii-advertising",
    title: "South Kona Big Island Advertising | Island Mailer",
    description:
      "Reach up to 4,000 South Kona homes with a premium 9×12 postcard. Island Mailer puts your Kealakekua or Captain Cook business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "South Kona",
    region: "South Kona Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 4000,
    heroImg: WIKI("Kealakekua_Bay_in_the_morning.jpg"),
    heroAlt: "South Kona - Big Island",
    tag: "South Kona - Big Island",
    h1: "Get Your South Kona Business in Front of Coffee-Country Locals",
    hooks: [
      "South Kona is quiet, scenic coffee country — Kealakekua, Honaunau, and the upcountry farms that put Kona coffee on the map. It's a calm, loyal market of residents who value the businesses woven into their slower pace of life.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Kealakekua, Captain Cook, Honaunau, and the surrounding South Kona neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to South Kona residents",
      rest: " — the coffee-country households of the quiet coast",
    },
    fitHeading: "Perfect for South Kona Businesses Like:",
    fitList: [
      "Cafes, restaurants, and coffee businesses",
      "Farm stands, agriculture, and coffee farms",
      "Artisans, galleries, and makers",
      "Home services, contractors, and handymen",
      "Wellness, bodywork, and personal care",
      "Tour operators and activity businesses",
    ],
    hoodsHeading: "Neighborhoods We Reach in South Kona",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "Coffee country above the South Kona coast." },
    hoods: ["Kealakekua", "Captain Cook", "Honaunau", "Kainaliu", "Honalo", "Hookena", "Milolii"],
    reserveHeading: "Reserve Your South Kona Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  puna: {
    slug: "puna-hawaii-advertising",
    title: "Puna Big Island Advertising | Island Mailer",
    description:
      "Reach up to 18,100 Puna homes with a premium 9×12 postcard. Island Mailer puts your Pahoa or Keaau business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Puna",
    region: "Puna Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 18100,
    heroImg: WIKI("P%C4%81hoehoe_and_Aa_flows_at_Hawaii.jpg"),
    heroAlt: "Puna - Big Island",
    tag: "Puna - Big Island",
    h1: "Get Your Puna Business in Front of the Island's Fastest-Growing District",
    hooks: [
      "Puna is the Big Island's wild, fast-growing east — Pahoa, the Volcano gateway, and a patchwork of independent, resourceful residents spread across the district. It's diverse, it's growing, and it's wide open for businesses ready to reach it.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Pahoa, Keaau, the Volcano area, and the surrounding Puna neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Puna residents",
      rest: " — the independent, growing households of East Hawaii",
    },
    fitHeading: "Perfect for Puna Businesses Like:",
    fitList: [
      "Restaurants, food trucks, and markets",
      "Hardware, building supply, and home services",
      "Contractors, solar, and off-grid services",
      "Farm stands, nurseries, and agriculture",
      "Wellness, bodywork, and personal care",
      "Auto repair, towing, and transport",
    ],
    hoodsHeading: "Neighborhoods We Reach in Puna",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "The volcanic landscape of the Puna district." },
    hoods: ["Pahoa", "Keaau", "Volcano", "Hawaiian Paradise Park", "Orchidland", "Ainaloa", "Leilani Estates"],
    reserveHeading: "Reserve Your Puna Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
  kaau: {
    slug: "kaau-hawaii-advertising",
    title: "Ka'u Big Island Advertising | Island Mailer",
    description:
      "Reach up to 3,400 Ka'u homes with a premium 9×12 postcard. Island Mailer puts your Naalehu or Pahala business in front of local residents - design, print & postage included — a fraction of a solo direct-mail campaign.",
    query: "Ka'u",
    region: "Ka'u Hawaii Island",
    island: "Big Island",
    islandSlug: "hawaii",
    homesEstimate: 3400,
    heroImg: WIKI("Punaluu_Black_Sand_Beach%2C_Hawaii%2C_USA8.jpg"),
    heroAlt: "Ka'u - Big Island",
    tag: "Ka'u - Big Island",
    h1: "Get Your Ka'u Business in Front of the Island's Most Tight-Knit Communities",
    hooks: [
      "Ka'u is the Big Island's remote, wide-open south — Naalehu, Pahala, and the road to South Point. It's the least crowded district on the island, which makes the loyalty of its residents all the more valuable to the businesses that serve them.",
      "Island Mailer puts your business on a giant 9×12 postcard - a real, physical mailbox billboard - delivered directly to homes across Naalehu, Pahala, and the surrounding Ka'u neighborhoods. No algorithms. No ad spend that disappears overnight. Just your business, in every mailbox.",
    ],
    includedFinal: {
      bold: "Targeted to Ka'u residents",
      rest: " — the close-knit households of the island's quiet south",
    },
    fitHeading: "Perfect for Ka'u Businesses Like:",
    fitList: [
      "Local restaurants, cafes, and markets",
      "Farm stands, ranches, and coffee farms",
      "General stores and specialty retail",
      "Contractors, handymen, and home services",
      "Tour operators and activity businesses",
      "Auto repair and transport services",
    ],
    hoodsHeading: "Neighborhoods We Reach in Ka'u",
    hoodPhoto: { src: WIKI("Mauna_Kea_from_the_ocean.jpg"), alt: "The remote south coast of the Ka'u district." },
    hoods: ["Naalehu", "Pahala", "Ocean View", "Waiohinu", "Discovery Harbour", "South Point", "Punaluu"],
    reserveHeading: "Reserve Your Ka'u Ad Space",
    ctaBig: RESERVE_CTA,
    crossLinks: [],
  },
}

/* ---------- assemble cross-links (sibling areas) per island ---------- */
function wireCrossLinks(map: Record<string, AreaData>) {
  const list = Object.values(map)
  for (const a of list) {
    a.crossLinks = list.filter((s) => s.slug !== a.slug).map((s) => ({ label: s.tag, href: `/${s.slug}` }))
  }
}
wireCrossLinks(kauaiAreas)
wireCrossLinks(oahuAreas)
wireCrossLinks(bigIslandAreas)

/* ---------- island hub configs ---------- */
export const islandConfigs: Record<string, IslandConfig> = {
  kauai: {
    islandName: "Kauai",
    islandKey: "Kauai",
    islandSlug: "kauai",
    navLabel: "KAUAI",
    hubTitle: "Kauai Advertising Areas | Island Mailer — Support Local. Live Hawaii.",
    hubMetaDesc:
      "Island Mailer serves all of Kauai: East Side, North Shore, South Shore, West Side, and Lihue. See the island map, explore each area, and join the waitlist to reserve your 9×12 postcard ad space.",
    hubH1: "One Island. Five Local Markets. Your Mailbox Billboard.",
    hubHook:
      "Island Mailer divides Kauai into five local market areas so your ad lands in the neighborhoods that matter most to your business. Pick your home area — or reach more than one.",
    hubHeroImg: WIKI("NaPali_overlook_Kalalau_Valley.jpg"),
    totalHomesLabel: "up to 9,000 Kauai households",
    areaSlugs: ["east-side", "north-shore", "south-shore", "west-side", "lihue"],
  },
  oahu: {
    islandName: "Oahu",
    islandKey: "Oahu",
    islandSlug: "oahu",
    navLabel: "OAHU",
    hubTitle: "Oahu Advertising Areas | Island Mailer — Support Local. Live Hawaii.",
    hubMetaDesc:
      "Island Mailer serves all of Oahu: North Shore, Windward, Central, Leeward, and Honolulu. See the island map, explore each area, and join the waitlist to reserve your 9×12 postcard ad space.",
    hubH1: "One Island. Five Local Markets. Your Mailbox Billboard.",
    hubHook:
      "Island Mailer divides Oahu into five local market areas so your ad lands in the neighborhoods that matter most to your business. Pick your home area — or reach more than one.",
    hubHeroImg: WIKI("2022_Views_from_Diamond_Head_02.jpg"),
    totalHomesLabel: "Oahu's local households",
    areaSlugs: ["north-shore", "windward", "central", "leeward", "honolulu"],
  },
  hawaii: {
    islandName: "Big Island",
    islandKey: "Big Island",
    islandSlug: "hawaii",
    navLabel: "BIG ISLAND",
    hubTitle: "Big Island Advertising Areas | Island Mailer — Support Local. Live Hawaii.",
    hubMetaDesc:
      "Island Mailer serves all of the Big Island: Hilo, Hamakua, South Kohala, North Kona, South Kona, Puna, and Ka'u. See the island map, explore each area, and join the waitlist to reserve your 9×12 postcard ad space.",
    hubH1: "One Island. Seven Local Markets. Your Mailbox Billboard.",
    hubHook:
      "Island Mailer divides the Big Island into seven local market areas so your ad lands in the neighborhoods that matter most to your business. Pick your home area — or reach more than one.",
    hubHeroImg: WIKI("Mauna_Kea_from_the_ocean.jpg"),
    totalHomesLabel: "the Big Island's local households",
    areaSlugs: ["hilo", "hamakua", "south-kohala", "north-kona", "south-kona", "puna", "kaau"],
  },
}

/* convenience: map an islandSlug to its area record map */
export const islandAreaMaps: Record<string, Record<string, AreaData>> = {
  kauai: kauaiAreas,
  oahu: oahuAreas,
  hawaii: bigIslandAreas,
}

/* every non-Maui area, keyed by slug — handy for sitemap + routes */
export const allExpansionAreas: AreaData[] = [
  ...Object.values(kauaiAreas),
  ...Object.values(oahuAreas),
  ...Object.values(bigIslandAreas),
]
