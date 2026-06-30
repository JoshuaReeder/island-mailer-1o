import type { Metadata } from "next"
import { notFound } from "next/navigation"
import OffersExperience from "@/components/offers-experience"
import { getMailer, mailers } from "@/lib/offers-data"

/* QR scan-targets — keep them out of the index. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/* Pre-render the known sample mailer codes. */
export function generateStaticParams() {
  return Object.keys(mailers).map((code) => ({ code }))
}

export default async function MailerCodePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const data = getMailer(code)
  if (!data) notFound()
  return <OffersExperience data={data} />
}
