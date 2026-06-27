import type { Metadata } from "next"
import AreaPage from "@/components/area-page"
import { oahuAreas } from "@/lib/area-data"

const area = oahuAreas["honolulu"]

export const metadata: Metadata = {
  title: area.title,
  description: area.description,
}

export default function Page() {
  return <AreaPage area={area} />
}
