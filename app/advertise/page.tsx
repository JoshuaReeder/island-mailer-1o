import type { Metadata } from "next"
import AdvertiseContent from "@/components/advertise-content"
import { FAQ_ITEMS } from "@/lib/advertise-faq"
import { homeJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Advertise in Maui Hawaii | Direct Mail & EDDM Postcards | Island Mailer",
  description:
    "Reach Maui households with Island Mailer's 9x12 direct mail postcards. Hawaii's locally-owned EDDM co-op mailer for small businesses. Get your business featured today — aloha@islandmailer.com",
  alternates: { canonical: "/advertise" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/advertise",
    title: "Advertise in Maui Hawaii | Direct Mail & EDDM Postcards | Island Mailer",
    description:
      "Reach Maui households with Island Mailer's 9x12 direct mail postcards. Hawaii's locally-owned EDDM co-op mailer for small businesses.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Island Mailer",
  "description": "Hawaii's locally-owned Every Door Direct Mail postcard service connecting Maui businesses with local households.",
  "url": "https://islandmailer.com",
  "email": "aloha@islandmailer.com",
  "slogan": "Support Local. Live Hawaii.",
  "areaServed": [
    {"@type": "City", "name": "Kahului"},
    {"@type": "City", "name": "Kihei"},
    {"@type": "City", "name": "Lahaina"},
    {"@type": "City", "name": "Paia"},
    {"@type": "City", "name": "Makawao"},
    {"@type": "AdministrativeArea", "name": "Maui County"}
  ],
  "serviceType": "Direct Mail Advertising",
  "priceRange": "$$",
}

export default function AdvertisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(homeJsonLd(FAQ_ITEMS))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <AdvertiseContent />
    </>
  )
}
