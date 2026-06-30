import type { Metadata } from "next"
import ArticleLayout, { type ArticleMeta } from "@/components/article-layout"

const meta: ArticleMeta = {
  slug: "eddm-vs-shared-mailer-maui",
  tag: "How It Works",
  h1: "EDDM vs. Shared Mailer: The Affordable Way to Reach Maui Households",
  hook: "Every Door Direct Mail can blanket whole neighborhoods — but doing it alone gets pricey fast. Here's how a shared postcard changes the economics for a Maui small business.",
  headline: "EDDM vs. Shared Mailer: The Affordable Way to Reach Maui Households",
  description:
    "EDDM vs. a shared postcard mailer, explained for Maui small businesses. How each works, what each costs, and the affordable way to reach up to 10,000 local households.",
  faq: [
    {
      q: "What is EDDM?",
      a: "EDDM stands for Every Door Direct Mail, a USPS service that lets businesses mail to every address along selected postal routes without needing a mailing list. It's powerful for blanketing neighborhoods, but the business still pays for design, printing, and postage on every piece.",
    },
    {
      q: "What's the difference between EDDM and a shared mailer?",
      a: "With solo EDDM you cover the full cost of your own mailer alone. A shared mailer places several non-competing businesses on one large postcard and splits design, print, and postage across them — dramatically lowering each business's cost while keeping the same household reach.",
    },
    {
      q: "How much does a shared mailer cost on Maui?",
      a: "Island Mailer is one flat per-ad-space rate for up to 10,000 local Maui homes — a fraction of a solo mailer, with design, printing, and postage included and only one business per industry per mailer.",
    },
  ],
}

export const metadata: Metadata = {
  title: `${meta.headline} | Island Mailer`,
  description: meta.description,
}

export default function Page() {
  return (
    <ArticleLayout meta={meta}>
      <p className="lede">
        If you've looked into mailing your business to local homes, you've probably run across the term
        EDDM. It's a genuinely useful tool — but for most small Maui businesses, doing it alone is where
        the costs spiral. Here's how EDDM and a shared mailer really compare.
      </p>

      <h2>What EDDM actually is</h2>
      <p>
        EDDM stands for Every Door Direct Mail. It's a USPS program that lets a business mail to every
        address along chosen postal routes — no mailing list required. That's its superpower: you can
        blanket entire neighborhoods, reaching every household in the routes you pick.
      </p>
      <p>
        For reaching local residents, that route-based targeting is exactly what you want. The catch isn't
        the reach. It's everything you have to pay for to get there.
      </p>

      <div className="rule">◆</div>

      <h2>The hidden cost of doing EDDM solo</h2>
      <p>
        When you run EDDM on your own, you're covering the entire bill yourself. That means:
      </p>
      <ul>
        <li><strong>Design</strong> — a professional, print-ready postcard that actually looks good.</li>
        <li><strong>Printing</strong> — full-color printing on every single piece, often thousands of them.</li>
        <li><strong>Postage</strong> — the per-piece EDDM postage rate, multiplied across your whole route.</li>
        <li><strong>Prep &amp; logistics</strong> — bundling, paperwork, and drop-off at the post office.</li>
      </ul>
      <p>
        Add it up and a solo EDDM campaign to thousands of Maui homes is regularly quoted in the thousands
        of dollars. For a small business, that's often a one-and-done expense — and one mailing rarely
        moves the needle on its own.
      </p>

      <h2>How a shared mailer changes the math</h2>
      <p>
        A shared mailer keeps the route-based reach of EDDM but spreads the cost. Instead of one business
        paying for the whole postcard, several non-competing local businesses share a single large card.
        Everyone splits the design, printing, and postage, and everyone gets the same household reach.
      </p>
      <p>
        This is the model behind Island Mailer. Your business gets one ad space on a premium 9×12 shared
        postcard mailed to up to 10,000 local Maui homes — design, printing, and postage included — for
        one flat per-ad-space rate. And because we run only one business per industry per mailer, you're never sharing the
        card with a direct competitor.
      </p>

      <div className="rule">◆</div>

      <h2>EDDM vs. shared mailer, side by side</h2>
      <ul>
        <li><strong>Reach:</strong> Both target local households by area — comparable resident reach.</li>
        <li><strong>Cost to you:</strong> Solo EDDM, you pay 100%. Shared, the cost is split across businesses.</li>
        <li><strong>Design &amp; production:</strong> Solo, it's on you. Shared, it's handled and included.</li>
        <li><strong>Logistics:</strong> Solo means USPS paperwork and drop-off. Shared means we manage it.</li>
        <li><strong>Card size &amp; impact:</strong> A large 9×12 shared card is a true "mailbox billboard."</li>
        <li><strong>Repeatability:</strong> Lower per-mailing cost makes it realistic to run several in a row.</li>
      </ul>

      <h2>Which one is right for you?</h2>
      <p>
        Solo EDDM can make sense if you need a fully custom, single-advertiser piece and you have the budget
        to absorb the full cost. But for most local Maui businesses — restaurants, salons, trades, services,
        and shops that want steady, affordable visibility — a shared mailer delivers the same neighborhood
        reach at a fraction of the price, with the design and logistics done for you.
      </p>
      <p>
        Curious whether it pays off at all? Read{" "}
        <a href="/resources/is-direct-mail-worth-it-small-business">
          Is Direct Mail Still Worth It for Small Businesses?
        </a>{" "}
        Or for the bigger picture on reaching residents, see our{" "}
        <a href="/resources/advertise-to-locals-on-maui">2026 guide to advertising to locals on Maui</a>.
        When you're ready, <a href="/advertise#contact">check availability for your area</a> — or{" "}
        <a href="/waitlist">join the waitlist</a> if we haven't reached your town yet.
      </p>
    </ArticleLayout>
  )
}
