import type { Metadata } from "next"
import MailboxMoment from "@/components/mailbox-moment"
import OffersExperience from "@/components/offers-experience"
import { currentMailer } from "@/lib/offers-data"
import "./mailbox-moment.css"

export const metadata: Metadata = {
  title: "Local Offers | Island Mailer — Support Local. Live Hawaii.",
  description:
    "Seasonal mailers featuring trusted local businesses and offers for Maui households. Browse and save the local deals from your Island Mailer postcard, then redeem them around Maui.",
  alternates: { canonical: "/local-offers" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/local-offers",
    title: "Local Offers | Island Mailer — Support Local. Live Hawaii.",
    description:
      "Seasonal mailers featuring trusted local businesses and offers for Maui households. Browse, save and redeem local deals around Maui.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

export const revalidate = 86400

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
              "Seasonal mailers featuring trusted local businesses and offers for Maui households. Browse, save and redeem local deals around Maui.",
            url: "https://islandmailer.com/local-offers",
          }),
        }}
      />
      <MailboxMoment />
      <OffersExperience data={currentMailer} />
    </>
  )
}
