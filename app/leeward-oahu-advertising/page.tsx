import type { Metadata } from "next"
import AreaPage from "@/components/area-page"
import { oahuAreas } from "@/lib/area-data"

const area = oahuAreas["leeward"]

export const metadata: Metadata = {
  title: area.title,
  description: area.description,
  alternates: { canonical: `/${area.slug}` },
  openGraph: {
    type: "website",
    url: `https://islandmailer.com/${area.slug}`,
    title: area.title,
    description: area.description,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

export default function Page() {
  return <AreaPage area={area} />
}
