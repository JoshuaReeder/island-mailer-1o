"use client"

import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/primary-20vertical-20island-20mailer-20logo-20gold-20on-20transparent.png"
              alt="Island Mailer"
              width={140}
              height={140}
              className="h-28 w-auto mb-4"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sand mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
                { label: "Apply", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-cream/70 hover:text-gold transition-smooth text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-sand mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/islandmailer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-gold transition-smooth text-sm inline-flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" />
                  @islandmailer
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/islandmailer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/70 hover:text-gold transition-smooth text-sm inline-flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  Island Mailer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-cream/10 pt-8">
          <p className="text-center text-sm text-cream/50">© Island Mailer 2026 | Support Local. Live Hawaii.</p>
        </div>
      </div>
    </footer>
  )
}
