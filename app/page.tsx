import type { Metadata } from "next"
import HomeResident from "@/components/home-resident"
import { residentHomeJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Hawaii's Best Local Deals — Delivered to Your Mailbox & Inbox | Island Mailer",
  description:
    "Kamaʻāina deals from the local Hawaii businesses you love — free in your Maui mailbox each month, saved on your phone. Support local and save.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/",
    title: "Hawaii's Best Local Deals — Delivered to Your Mailbox & Inbox",
    description:
      "Kamaʻāina deals from the local businesses you love, in your mailbox and on your phone. Free for residents.",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(residentHomeJsonLd())} />
      <HomeResident />
    </>
  )
}
