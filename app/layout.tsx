import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Island Mailer | Support Local. Live Hawaii.",
  description:
    "Connect with your Hawaii community through beautiful postcard mailers. Reach up to 10,000 homes across Maui, Oahu, Hawaii Island, and Kauai.",
  generator: "v0.app",
  metadataBase: new URL("https://islandmailer.com"),
  openGraph: {
    type: "website",
    url: "https://islandmailer.com",
    title: "Island Mailer | Support Local. Live Hawaii.",
    description:
      "Reach up to 10,000 Maui households with a premium 9×12 postcard mailer. One local business per industry. Design, print & postage included.",
    siteName: "Island Mailer",
    images: [
      {
        url: "/images/website%20OG%20Logo%20Image%20for%20share%20preview.png",
        width: 1200,
        height: 630,
        alt: "Island Mailer – Support Local. Live Hawaii.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Island Mailer | Support Local. Live Hawaii.",
    description:
      "Reach up to 10,000 Maui households with a premium 9×12 postcard mailer. One local business per industry.",
    images: ["/images/website%20OG%20Logo%20Image%20for%20share%20preview.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1F2735",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/246430880.js"
        />
      </body>
    </html>
  )
}
