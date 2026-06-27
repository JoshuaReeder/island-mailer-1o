import type { Metadata } from "next"
import AreaPage from "@/components/area-page"
import { bigIslandAreas } from "@/lib/area-data"

const area = bigIslandAreas["south-kohala"]

export const metadata: Metadata = {
  title: area.title,
  description: area.description,
}

export default function Page() {
  return <AreaPage area={area} />
}
