import type { Metadata } from "next"
import AreaPage from "@/components/area-page"
import { kauaiAreas } from "@/lib/area-data"

const area = kauaiAreas["east-side"]

export const metadata: Metadata = {
  title: area.title,
  description: area.description,
}

export default function Page() {
  return <AreaPage area={area} />
}
