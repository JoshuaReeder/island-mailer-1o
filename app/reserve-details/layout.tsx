import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add Your Business Details | Island Mailer",
  description:
    "Already reached out to Island Mailer? Add your business details here so we can prep your 9×12 postcard ad space and get you in the next Maui mailer faster.",
  robots: { index: false, follow: false },
}

export default function ReserveDetailsLayout({ children }: { children: React.ReactNode }) {
  return children
}
