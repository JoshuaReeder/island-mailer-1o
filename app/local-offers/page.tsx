import type { Metadata } from "next"
import OffersExperience from "@/components/offers-experience"
import { currentMailer } from "@/lib/offers-data"

export const metadata: Metadata = {
  title: "Local Offers | Island Mailer — Support Local. Live Hawaii.",
  description:
    "Browse and save the local deals from the businesses on your Island Mailer postcard, then redeem them around Maui. July mailer coming up next — get notified.",
  alternates: { canonical: "/local-offers" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/local-offers",
    title: "Local Offers | Island Mailer — Support Local. Live Hawaii.",
    description:
      "Browse and save the local deals from the businesses on your Island Mailer postcard, then redeem them around Maui.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

export default function LocalOffersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Local Offers | Island Mailer",
            description:
              "Browse and save local deals from the businesses on your Island Mailer postcard, then redeem them around Maui.",
            url: "https://islandmailer.com/local-offers",
          }),
        }}
      />
      <OffersExperience data={currentMailer} />
    </>
  )
}
