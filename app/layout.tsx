import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Island Mailer | Maui Local Deals & Direct Mail Advertising Hawaii",
  description:
    "Island Mailer delivers local deals and direct mail advertising across Maui, Hawaii. Residents find exclusive local offers. Businesses reach every household. Support Local. Live Hawaii.",
  formatDetection: {
    telephone: false,
  },
  generator: "v0.app",
  metadataBase: new URL("https://islandmailer.com"),
  openGraph: {
    type: "website",
    url: "https://islandmailer.com",
    title: "Island Mailer | Maui Local Deals & Direct Mail Advertising Hawaii",
    description:
      "Island Mailer delivers local deals and direct mail advertising across Maui, Hawaii. Residents find exclusive local offers. Businesses reach every household.",
    siteName: "Island Mailer",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Island Mailer – Support Local. Live Hawaii.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Island Mailer | Maui Local Deals & Direct Mail Advertising Hawaii",
    description:
      "Island Mailer delivers local deals and direct mail advertising across Maui, Hawaii. Residents find exclusive local offers. Businesses reach every household.",
    images: ["/images/og-image.png"],
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
        {/* A2P-STRIP 2026-07-15 (temporary) — hide all lead-capture fields site-wide during A2P review; the GHL chat widget (iframe) is unaffected. Remove this style block to restore forms. */}
        <style dangerouslySetInnerHTML={{ __html: `form,input[type="tel"],input[type="email"],input[type="text"],input[type="number"],textarea,select{display:none!important}` }} />
        {children}
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TQFPZ3K0JK"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-TQFPZ3K0JK');
`}
        </Script>
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/246430880.js"
        />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a5865d4c9f31412b25eb897"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
