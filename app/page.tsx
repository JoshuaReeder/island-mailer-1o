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
import SMSContactForm from "@/components/SMSContactForm"
import SiteHeader from "@/components/site-header"

export default function Home() {
  const contactRef = useRef<HTMLDivElement>(null)

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-[#1F2735]">
      <SiteHeader onReserve={scrollToContact} />

      {/* Hero — full-screen video background, content pushed below tall logo */}
      <div className="relative overflow-hidden">
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
        <div className="absolute inset-0 z-[1] bg-navy/70" />
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sand/10 blur-3xl animate-float delay-500" />
        </div>

        <section className="relative z-10 min-h-[200vh] flex items-start px-6 sm:px-12">
          <div className="max-w-6xl mx-auto w-full pt-[80vh] sm:pt-380 lg:pt-450 pb-20 sm:pb-28">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-cream mb-6 sm:mb-8 animate-fade-up">
                Island Mailer – Local Postcard Advertising Across Maui
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-sand max-w-4xl mx-auto leading-relaxed mb-10 sm:mb-12 animate-fade-up delay-100">
                Your business on a premium 9&quot;x12&quot; mailbox billboard mailed up to 10,000 local homes — reach Maui residents for just cents per household.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto mb-12 sm:mb-14 animate-fade-up delay-200">
                {[
                  { label: "16 premium ad spaces", sublabel: "(8 front, 8 back)" },
                  { label: "Up to 10,000 local homes", sublabel: "per mailing" },
                  { label: "One local business", sublabel: "per industry" },
                  { label: "Design, printing & postage", sublabel: "all included" },
                ].map((stat, idx) => (
                  <div key={idx} className="gradient-navy-warm rounded-2xl p-6 sm:p-8 border-gradient-gold text-center">
                    <p className="text-lg sm:text-xl font-bold text-gold mb-1">{stat.label}</p>
                    <p className="text-base text-sand">{stat.sublabel}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 animate-fade-up delay-300">
                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl gradient-gold-shine text-white transition-smooth hover:shadow-2xl hover:shadow-gold/50 hover:-translate-y-1 active:translate-y-0 min-h-[60px]"
                >
                  Claim Your Spot
                </button>
                <button
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto px-10 sm:px-12 py-5 sm:py-6 rounded-full font-bold text-xl border-2 border-gold text-gold hover:bg-gold/10 transition-smooth min-h-[60px]"
                >
                  View Pricing and Details
                </button>
              </div>
              <p className="text-base sm:text-lg text-sand/80 animate-fade-up delay-400">
                No long-term contracts. First-come, first-served by industry.
              </p>
            </div>
          </div>
        </section>
      </div>

      <PostcardShowcase />

      <WhoItsFor />

      <BenefitsGrid />

      <section id="how-it-works" className="py-24 sm:py-32 px-6 sm:px-12 animate-section-shimmer scroll-mt-20">
        <HowItWorks />
      </section>

      <PricingSpaces onReserve={scrollToContact} />

      <section id="faq" className="py-24 sm:py-32 px-6 sm:px-12 gradient-navy-subtle scroll-mt-20">
        <FAQSection />
      </section>

      <AboutGiveBack />

      <section ref={contactRef} id="contact" className="py-24 sm:py-32 px-6 sm:px-12 gradient-navy-subtle scroll-mt-24">
        <ContactForm />
      </section>

      {/* SMS Contact Form */}
      <SMSContactForm />
      
      <Footer />
      <FloatingMenu />
    </div>
  )
}
