"use client"

import { useRef } from "react"
import HowItWorks from "@/components/how-it-works"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import PostcardShowcase from "@/components/postcard-showcase"
import FloatingMenu from "@/components/floating-menu"
import WhoItsFor from "@/components/who-its-for"
import BenefitsGrid from "@/components/benefits-grid"
import PricingSpaces from "@/components/pricing-spaces"
import AboutGiveBack from "@/components/about-give-back"
import ContactForm from "@/components/contact-form"
import SiteHeader from "@/components/site-header"
import CursorGlow from "@/components/cursor-glow"

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen animate-page-gradient">
      <SiteHeader onReserve={scrollToContact} />
      <CursorGlow />

      {/* Hero Section */}
      <section className="relative min-h-[165vh] flex items-center px-6 sm:px-12 overflow-hidden animate-hero-gradient">
        {/* Background video layers on top of gradient */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          aria-hidden="true"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark navy overlay so text stays legible */}
        <div className="absolute inset-0 z-[1] bg-navy/65" />
        {/* Subtle gold accent glows */}
        <div className="absolute inset-0 z-[2] overflow-hidden">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sand/10 blur-3xl animate-float delay-500" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full py-[22rem] sm:py-[28rem] lg:py-[32rem]">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-cream mb-8 sm:mb-10 animate-fade-up">
              Island Mailer – Local Postcard Advertising Across Maui
            </h1>

            <p className="text-lg sm:text-2xl lg:text-3xl text-sand max-w-4xl mx-auto leading-relaxed mb-10 sm:mb-12 animate-fade-up delay-100">
              Your business on a premium 9&quot;×12&quot; -mailbox billboard- mailed up to 10,000 local homes, so you can reach Maui residents for just a few cents per household.
            </p>

            {/* Stat Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-5 max-w-5xl mx-auto mb-12 sm:mb-14 animate-fade-up delay-200">
              {[
                { label: "16 premium ad spaces", sublabel: "(8 front, 8 back)" },
                { label: "Up to 10,000 local homes", sublabel: "per mailing" },
                { label: "One local business", sublabel: "per industry" },
                { label: "Design, printing & postage", sublabel: "all included" },
              ].map((stat, idx) => (
                <div key={idx} className="gradient-navy-warm rounded-2xl p-8 sm:p-6 lg:p-8 border-gradient-gold text-center">
                  <p className="text-lg sm:text-xl font-bold text-cream mb-1">{stat.label}</p>
                  <p className="text-base" style={{ color: "rgb(163, 124, 79)" }}>{stat.sublabel}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6 animate-fade-up delay-300">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 active:translate-y-0 min-h-[64px]"
              >
                Claim Your Spot
              </button>
              <button
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-12 py-6 rounded-full font-bold text-xl border-2 border-gold text-gold hover:bg-gold/10 transition-smooth min-h-[64px]"
              >
                View Pricing & Details
              </button>
            </div>

            <p className="text-base sm:text-lg text-sand/80 animate-fade-up delay-400">
              No long-term contracts. First-come, first-served by industry. $800 per ad space for up to 10,000 homes.
            </p>
          </div>

        </div>
      </section>

      {/* Section 2 — 9×12 Postcard Mockup (immediately after Hero) */}
      <PostcardShowcase />

      {/* Who It's For Section */}
      <WhoItsFor />

      {/* Benefits Grid Section */}
      <BenefitsGrid />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 sm:py-36 lg:py-44 px-6 sm:px-12 bg-cream/5 scroll-mt-20">
        <HowItWorks />
      </section>

      {/* Pricing & Ad Spaces Section */}
      <PricingSpaces onReserve={scrollToContact} />

      {/* FAQ Section */}
      <section id="faq" className="py-24 sm:py-36 lg:py-44 px-6 sm:px-12 gradient-navy-subtle scroll-mt-20">
        <FAQSection />
      </section>

      {/* About & Give-Back Section */}
      <AboutGiveBack />

      {/* Contact & Reservation Form Section */}
      <section ref={contactRef} id="contact" className="py-24 sm:py-36 lg:py-44 px-6 sm:px-12 gradient-navy-subtle scroll-mt-24">
        <ContactForm />
      </section>

      {/* Footer */}
      <Footer />

      <FloatingMenu />
    </div>
  )
}
