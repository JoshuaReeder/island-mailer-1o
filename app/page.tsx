import type { Metadata } from "next"
import HomeResident from "@/components/home-resident"
import { residentHomeJsonLd, jsonLdScript } from "@/lib/jsonld"

export const metadata: Metadata = {
  title: "Hawaii's Best Local Deals — Delivered to Your Mailbox & Inbox | Island Mailer",
  description:
    "Exclusive offers from the local Hawaii businesses you love — delivered to your mailbox each month and saved right on your phone. Discover new spots, save money, and support local. Free for residents.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://islandmailer.com/",
    title: "Hawaii's Best Local Deals — Delivered to Your Mailbox & Inbox",
    description:
      "Exclusive offers from the local businesses you love, in your mailbox and on your phone. Free for residents.",
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
