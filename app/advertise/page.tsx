import type { Metadata } from "next"
import AdvertiseContent from "@/components/advertise-content"
import { FAQ_ITEMS } from "@/lib/advertise-faq"
import { homeJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Advertise on Island Mailer — Get Your Business Featured | Hawaii Direct Mail",
  description:
    "Get your business featured on Island Mailer's premium 9×12 postcard, mailed to up to 10,000 local Hawaii homes. One business per industry. Design, print & postage included for $800.",
  alternates: { canonical: "/advertise" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/advertise",
    title: "Advertise on Island Mailer — Get Your Business Featured",
    description:
      "Reach up to 10,000 local Hawaii homes with a premium 9×12 postcard mailer. One local business per industry. Design, print & postage included.",
  },
}

export default function AdvertisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(homeJsonLd(FAQ_ITEMS))} />
      <AdvertiseContent />
    </>
  )
}
