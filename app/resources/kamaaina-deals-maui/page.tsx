import type { Metadata } from "next"
import ArticleLayout, { type ArticleMeta } from "@/components/article-layout"

const meta: ArticleMeta = {
  slug: "kamaaina-deals-maui",
  tag: "For Residents",
  h1: "Kamaʻāina Deals on Maui: Free Local Offers, Delivered to Your Mailbox",
  hook: "Living on Maui shouldn't mean paying visitor prices. Here's how kamaʻāina find real local deals — and how Island Mailer brings them straight to your home.",
  headline: "Kamaʻāina Deals on Maui: Free Local Offers in Your Mailbox (2026)",
  description:
    "Where kamaʻāina find real local deals on Maui in 2026 — restaurants, salons, services and more. Island Mailer delivers exclusive local offers free to resident mailboxes every month.",
  faq: [
    {
      q: "What does kamaʻāina mean?",
      a: "Kamaʻāina literally means 'child of the land' in ʻōlelo Hawaiʻi, and it refers to the people who live in Hawaiʻi — long-time residents and locals. Many Hawaiʻi businesses offer special kamaʻāina pricing or deals to residents as a way of taking care of the community that supports them year-round.",
    },
    {
      q: "How do I find kamaʻāina deals on Maui?",
      a: "Common ways include asking businesses directly if they offer a kamaʻāina rate (usually with a Hawaiʻi ID), checking programs like Kamaʻāina First, and watching for local promotions. Island Mailer adds the easiest way of all: exclusive offers from local Maui businesses delivered free to resident mailboxes every month — scan the QR code to save and redeem them from your phone.",
    },
    {
      q: "Is Island Mailer free for Maui residents?",
      a: "Yes. Island Mailer is completely free for residents. The 9×12 postcard arrives in your mailbox, and every offer on it can be browsed, saved, and redeemed from your phone at no cost.",
    },
    {
      q: "Do I need a Hawaiʻi ID for Island Mailer offers?",
      a: "No. Traditional kamaʻāina discounts often require showing a Hawaiʻi state ID. Island Mailer offers are simpler — they're delivered directly to local resident mailboxes, so the deals are already made for the people who live here. Just show the offer on your phone to redeem.",
    },
  ],
}

export const metadata: Metadata = {
  title: `${meta.headline} | Island Mailer`,
  description: meta.description,
  alternates: { canonical: `/resources/${meta.slug}` },
  openGraph: {
    type: "article",
    url: `https://islandmailer.com/resources/${meta.slug}`,
    title: meta.headline,
    description: meta.description,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Island Mailer – Support Local. Live Hawaii." }],
  },
}

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p className="lede">
        Anyone who lives on Maui knows the feeling: the island runs on a visitor economy, and prices often
        reflect it. But there's a long, proud tradition here of businesses taking care of their own —
        kamaʻāina pricing, locals' nights, and neighbor-to-neighbor deals that never make it onto a tourist
        brochure. The trick has always been finding them.
      </p>

      <h2>What "kamaʻāina" really means</h2>
      <p>
        Kamaʻāina translates from ʻōlelo Hawaiʻi as "child of the land." It describes the people who live
        here — the families, workers, and neighbors who call Hawaiʻi home year-round. When a business offers
        a kamaʻāina deal, it's more than a discount. It's a way of saying: you support us all year, so we
        take care of you.
      </p>
      <p>
        On Maui you'll find kamaʻāina rates at restaurants, activities, hotels, and shops — usually by
        showing a Hawaiʻi state ID. Programs like Kamaʻāina First have helped organize hundreds of these
        offers. But most everyday deals from small neighborhood businesses still spread the old way: word of
        mouth, if they spread at all.
      </p>

      <h2>The problem: the best local deals are the hardest to find</h2>
      <p>
        The plate lunch spot with a locals' special, the salon offering $25 off a first visit, the
        landscaper with a neighborhood rate — these are the deals kamaʻāina actually want, and they're
        almost never advertised anywhere residents will reliably see them. Social media posts vanish in the
        feed. Tourist magazines don't carry them. And no one has time to ask every business "do you have a
        kamaʻāina rate?"
      </p>

      <h2>A simpler way: local deals delivered to your mailbox</h2>
      <p>
        That's exactly why Island Mailer exists. Each month, a premium 9×12 postcard lands free in Maui
        resident mailboxes, featuring exclusive offers from up to 16 locally loved businesses — one per
        category, so it's the neighborhood's best pizza spot, café, salon, or home-service pro, not a wall
        of ads.
      </p>
      <p>
        Scan the QR code and every offer opens on your phone: browse them, save your favorites, and redeem
        by simply showing your screen at the business. No Hawaiʻi ID required, no coupon clipping, no
        hunting — the deals come to you, because they were made for the people who live here.
      </p>

      <h2>Deals made for locals, by locals</h2>
      <p>
        Every offer on an Island Mailer comes from a Maui business choosing to invest in its own community
        — real incentives designed to welcome neighbors in the door: buy-one-get-one meals, first-visit
        discounts, free add-ons, and locals-only specials. When you redeem one, your money stays on island,
        circulating through the local economy instead of leaving for the mainland.
      </p>
      <p>
        Want in? It's free, always. <a href="/#optin">Join the mailing list</a> to hear the moment new
        offers land in your area, browse the current <a href="/local-offers">Local Offers</a>, or{" "}
        <a href="/#nominate">nominate a favorite local business</a> you'd love to see on a future mailer.
      </p>
    </ArticleLayout>
  )
}
