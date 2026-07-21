import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Island Mailer | Support Local. Live Hawaii.",
  description:
    "Island Mailer puts your business on a premium 9×12 postcard mailed to up to 10,000 Maui homes. One business per industry. Design, print & postage all included — far less than a solo mailer campaign.",
  formatDetection: {
    telephone: false,
  },
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
        {/* v30 form-guard: mint the JS-proof token and attach it to every
            same-origin /api/ fetch. Server side: verifyImToken in
            lib/form-guard.ts (djb2 + salt must stay identical). Direct-POST
            spam bots never run this script, so their submissions carry no
            x-im-tk header and are silently dropped. */}
        <Script id="im-tk" strategy="afterInteractive">
          {`(function(){var t=Date.now().toString(36);function h(s){var x=5381;for(var i=0;i<s.length;i++)x=((x<<5)+x+s.charCodeAt(i))>>>0;return x>>>0}var k=t+"."+h(t+"aloha-8083").toString(36);var f=window.fetch;window.fetch=function(u,o){try{var s=typeof u==="string"?u:((u&&u.url)||"");if(s.indexOf("/api/")===0||s.indexOf(location.origin+"/api/")===0){o=o||{};var hd=new Headers(o.headers||(typeof u!=="string"&&u.headers)||undefined);hd.set("x-im-tk",k);o.headers=hd}}catch(e){}return f.call(this,u,o)}})();`}
        </Script>
      </body>
    </html>
  )
}
