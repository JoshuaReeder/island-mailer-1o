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
    price: "800",
    priceCurrency: "USD",
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
          price: "800",
          priceCurrency: "USD",
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
          price: "800",
          priceCurrency: "USD",
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
          price: "800",
          priceCurrency: "USD",
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
          price: "800",
          priceCurrency: "USD",
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

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data) }
}
