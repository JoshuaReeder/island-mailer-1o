import type { Metadata } from "next"
import AreaPage from "@/components/area-page"
import { areas } from "@/lib/area-data"

const area = areas["north-shore"]

export const metadata: Metadata = {
  title: area.title,
  description: area.description,
}

export default function Page() {
  return <AreaPage area={area} />
}
