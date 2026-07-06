/**
 * Centralized JSON-LD builders for Island Mailer.
 * Each returned object is stringified into a <script type="application/ld+json"> tag.
 * @id values are unique per node so graphs can be safely combined without collisions.
 */

const BASE = "https://islandmailer.com"

const MAUI_REGIONS = [
  "North Shore Maui",
  "Central Maui",
  "West Maui",
  "South Maui",
  "Upcountry Maui",
]

const areaServedMaui = [
  { "@type": "AdministrativeArea", name: "Maui, Hawaii" },
  ...MAUI_REGIONS.map((r) => ({ "@type": "Place", name: r })),
]

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Island Mailer",
  url: BASE,
  email: "aloha@islandmailer.com",
  telephone: "+1-808-808-6245",
  slogan: "Support Local. Live Hawaii.",
  sameAs: ["https://www.instagram.com/islandmailer"],
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png`,
  },
  areaServed: { "@type": "AdministrativeArea", name: "Maui, Hawaii" },
}

const localBusinessService = () => ({
  "@type": ["LocalBusiness", "Service"],
  "@id": `${BASE}/#service`,
  name: "Island Mailer",
  description:
    "Island Mailer puts local businesses on a premium 9×12 shared postcard mailed to up to 10,000 Maui homes. One business per industry. Design, print & postage included — a fraction of a solo direct-mail campaign.",
  url: BASE,
  telephone: "+1-808-808-6245",
  email: "aloha@islandmailer.com",
  priceRange: "$$",
  serviceType: "Local direct mail advertising",
  provider: { "@id": `${BASE}/#organization` },
  areaServed: areaServedMaui,
  offers: {
    "@type": "Offer",
    description: "One ad space on the Island Mailer 9×12 postcard — design, print & postage included.",
    availability: "https://schema.org/InStock",
  },
})

/* Resident-first home: Organization + WebSite (with search action). */
export function residentHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "Island Mailer",
        description:
          "Hawaii's best local deals — delivered to your mailbox and inbox. Browse and save offers from locally loved businesses, then redeem them around the islands.",
        publisher: { "@id": `${BASE}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${BASE}/local-offers?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE}/#resident-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Island Mailer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Island Mailer is your island's community mailer — a premium 9×12 postcard packed with exclusive offers from locally loved businesses, delivered free to Maui mailboxes each month. Scan the QR code to browse every offer, save your favorites, and redeem them around the island.",
            },
          },
          {
            "@type": "Question",
            name: "Is Island Mailer free for residents?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes — Island Mailer is always free for residents. The mailer arrives in your mailbox at no cost, and joining the email list for early access to new offers is free too.",
            },
          },
          {
            "@type": "Question",
            name: "How do I redeem the local offers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Scan the QR code on your Island Mailer postcard, browse the offers for your area, save the ones you love, and show your phone at the business to redeem.",
            },
          },
          {
            "@type": "Question",
            name: "Are these kamaʻāina deals?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Island Mailer offers are made for kamaʻāina — the people who live here. Local Maui businesses share exclusive offers delivered straight to resident mailboxes, so locals can discover trusted neighborhood spots and save money while supporting the local economy.",
            },
          },
          {
            "@type": "Question",
            name: "Which areas of Maui get the Island Mailer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Island Mailer serves all five Maui market areas: North Shore (Pāʻia, Haʻikū), Central (Kahului, Wailuku), West Side (Lahaina, Kāʻanapali), South Side (Kīhei, Wailea), and Upcountry (Makawao, Kula, Pukalani). Kauai, Oahu, and Big Island are coming soon.",
            },
          },
        ],
      },
    ],
  }
}

export function homeJsonLd(faq: { q: string; a: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      localBusinessService(),
      {
        "@type": "FAQPage",
        "@id": `${BASE}/#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
        })),
      },
    ],
  }
}

export function mauiJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "Service",
        "@id": `${BASE}/maui#service`,
        name: "Island Mailer — Maui Direct Mail Advertising",
        description:
          "Local direct-mail advertising across all of Maui: North Shore, Central, West Side, South Side, and Upcountry. Premium 9×12 shared postcard, one flat per-ad-space rate.",
        url: `${BASE}/maui`,
        serviceType: "Local direct mail advertising",
        provider: { "@id": `${BASE}/#organization` },
        areaServed: areaServedMaui,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  }
}

export function areaJsonLd(opts: {
  slug: string
  region: string
  title: string
  description: string
}) {
  const url = `${BASE}/${opts.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.title,
        description: opts.description,
        url,
        serviceType: "Local direct mail advertising",
        provider: { "@id": `${BASE}/#organization` },
        areaServed: { "@type": "Place", name: opts.region },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Maui", item: `${BASE}/maui` },
          { "@type": "ListItem", position: 3, name: opts.region, item: url },
        ],
      },
    ],
  }
}

export function articleJsonLd(opts: {
  slug: string
  headline: string
  description: string
  faq?: { q: string; a: string }[]
}) {
  const url = `${BASE}/resources/${opts.slug}`
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: opts.headline,
      description: opts.description,
      url,
      author: { "@id": `${BASE}/#organization` },
      publisher: { "@id": `${BASE}/#organization` },
      mainEntityOfPage: url,
      about: "Local direct mail advertising on Maui, Hawaii",
    },
  ]
  if (opts.faq && opts.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: opts.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    })
  }
  return { "@context": "https://schema.org", "@graph": [ORGANIZATION, ...graph] }
}


/* ============================================================
   MULTI-ISLAND EXPANSION JSON-LD (Kauai, Oahu, Big Island)
   ============================================================ */

export function expansionAreaJsonLd(opts: {
  slug: string
  region: string
  title: string
  description: string
  islandName: string
  islandSlug: string
}) {
  const url = `${BASE}/${opts.slug}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.title,
        description: opts.description,
        url,
        serviceType: "Local direct mail advertising",
        provider: { "@id": `${BASE}/#organization` },
        areaServed: { "@type": "Place", name: opts.region },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/PreOrder",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: opts.title,
        description: opts.description,
        isPartOf: { "@type": "WebSite", name: "Island Mailer", url: BASE },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: opts.islandName, item: `${BASE}/${opts.islandSlug}` },
          { "@type": "ListItem", position: 3, name: opts.region, item: url },
        ],
      },
    ],
  }
}

export function islandHubJsonLd(opts: {
  islandName: string
  islandSlug: string
  title: string
  description: string
  regions: string[]
}) {
  const url = `${BASE}/${opts.islandSlug}`
  const areaServed = [
    { "@type": "AdministrativeArea", name: `${opts.islandName}, Hawaii` },
    ...opts.regions.map((r) => ({ "@type": "Place", name: r })),
  ]
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: opts.title,
        description: opts.description,
        url,
        serviceType: "Local direct mail advertising",
        provider: { "@id": `${BASE}/#organization` },
        areaServed,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/PreOrder",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: opts.title,
        description: opts.description,
        isPartOf: { "@type": "WebSite", name: "Island Mailer", url: BASE },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${BASE}/maui` },
          { "@type": "ListItem", position: 3, name: opts.islandName, item: url },
        ],
      },
    ],
  }
}

export function productsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": ["Service", "Product"],
        "@id": `${BASE}/products#service`,
        name: "Island Mailer Community Mailers",
        description:
          "Two shared community mailers in Hawaii: the 9×12 Signature Mailer reaches up to 10,000 local homes and the 6.5×12 Hyper-Local Mailer reaches ~2,500 homes. Design, print & postage included, one business per category.",
        url: `${BASE}/products`,
        serviceType: "Local direct mail advertising",
        provider: { "@id": `${BASE}/#organization` },
        areaServed: areaServedMaui,
        offers: [
          {
            "@type": "Offer",
            name: "Signature Mailer (9×12)",
            description: "9×12 shared postcard mailed to up to 10,000 local homes — one ad space.",
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            name: "Hyper-Local Mailer (6.5×12)",
            description: "6.5×12 shared postcard mailed to ~2,500 nearby homes — one ad space.",
            price: "250",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/products#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Products & Services", item: `${BASE}/products` },
        ],
      },
    ],
  }
}

export function localRepsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "JobPosting",
        "@id": `${BASE}/local-reps#role`,
        title: "Local Island Mailer Rep",
        description:
          "Be the friendly local face of Island Mailer in your Hawaii town — introduce Island Mailer to local business owners, help them get featured and supported, and be the local point of contact. A compensated, people-first role.",
        employmentType: "CONTRACTOR",
        hiringOrganization: { "@id": `${BASE}/#organization` },
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: { "@type": "AdministrativeArea", name: "Hawaii" },
        url: `${BASE}/local-reps`,
      },
      {
        "@type": "WebPage",
        "@id": `${BASE}/local-reps#webpage`,
        name: "Become a Local Island Mailer Rep",
        url: `${BASE}/local-reps`,
        isPartOf: { "@type": "WebSite", name: "Island Mailer", url: BASE },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/local-reps#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Local Reps", item: `${BASE}/local-reps` },
        ],
      },
    ],
  }
}

export function resourcesJsonLd(articles: { href: string; h: string; p: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "CollectionPage",
        "@id": `${BASE}/resources#webpage`,
        name: "Resources & Local Advertising Guides",
        url: `${BASE}/resources`,
        isPartOf: { "@type": "WebSite", name: "Island Mailer", url: BASE },
        about:
          "Local advertising and direct-mail guides for Maui small businesses and residents.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${BASE}${a.href}`,
            name: a.h,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE}/resources#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${BASE}/resources` },
        ],
      },
    ],
  }
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) }
}
