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
    title: "North Shore Maui Advertising for Local Businesses | Island Mailer",
    description:
      "Reach up to 10,000 North Shore Maui homes with a premium 9×12 postcard. Island Mailer puts your Pā'ia or Haʻikū business in front of local residents - design, print & postage included for $800.",
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
    title: "Central Maui Advertising for Local Businesses | Island Mailer",
    description:
      "Advertise your Central Maui business to thousands of local homes. Island Mailer delivers a premium 9×12 postcard to Kahului and Wailuku residents - $800 flat, design and postage included.",
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
    title: "West Maui Advertising for Local Businesses | Island Mailer",
    description:
      "Advertise your West Maui business to local residents in Lahaina, Kāʻanapali, and Nāpili. Island Mailer's 9×12 postcard reaches up to 10,000 homes - $800 flat, everything included.",
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
    title: "South Maui Advertising for Local Businesses | Island Mailer",
    description:
      "Reach Kīhei, Wailea, and Mākena residents with your ad on a premium 9×12 postcard. Island Mailer delivers direct mail advertising for South Maui businesses - $800 flat, everything included.",
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
    title: "Upcountry Maui Advertising for Local Businesses | Island Mailer",
    description:
      "Reach Makawao, Kula, and Pukalani residents with Island Mailer's premium 9×12 postcard. Local advertising for Upcountry Maui businesses - $800 flat, design, print & postage included.",
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
