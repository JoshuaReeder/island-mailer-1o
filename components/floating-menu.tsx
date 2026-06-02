"use client"

import { useState } from "react"
import { Menu, X, Home, HelpCircle, DollarSign, MessageCircle } from "lucide-react"

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Home", href: "#" },
    { icon: DollarSign, label: "Pricing", href: "#pricing" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
    { icon: MessageCircle, label: "Apply", href: "#contact" },
  ]

  const handleMenuClick = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Items - Accordion Style */}
      <div
        className={`fixed bottom-32 right-6 z-50 flex flex-col gap-3 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleMenuClick(item.href)}
            className="flex items-center gap-3 px-6 py-4 rounded-full gradient-gold-shine text-white font-semibold shadow-2xl shadow-gold/40 hover:shadow-gold/60 hover:-translate-y-1 transition-smooth min-h-[56px] group"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-base">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full gradient-gold-shine text-white shadow-2xl shadow-gold/50 hover:shadow-gold/70 hover:-translate-y-1 transition-smooth flex items-center justify-center"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>
    </>
  )
}
