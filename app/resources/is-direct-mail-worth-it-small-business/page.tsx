import type { Metadata } from "next"
import ArticleLayout, { type ArticleMeta } from "@/components/article-layout"

const meta: ArticleMeta = {
  slug: "is-direct-mail-worth-it-small-business",
  tag: "Direct Mail",
  h1: "Is Direct Mail Still Worth It for Small Businesses? (Maui Edition)",
  hook: "Everyone assumes marketing went fully digital. So why are smart local businesses still mailing postcards? Here's the honest answer for a Maui small business.",
  headline: "Is Direct Mail Still Worth It for Small Businesses? (Maui Edition)",
  description:
    "An honest look at whether direct mail still works for small businesses in 2026 — with a Maui-specific take on cost, reach, and why a physical postcard cuts through.",
  faq: [
    {
      q: "Does direct mail still work in 2026?",
      a: "Yes — for the right business and offer. A physical mail piece is tangible, hard to ignore, and isn't subject to digital ad fatigue or algorithm changes. For local, resident-driven businesses it remains one of the most reliable ways to reach nearby households.",
    },
    {
      q: "Is direct mail too expensive for a small business?",
      a: "Running your own solo mailer can be costly once you add design, printing, and postage. A shared postcard like Island Mailer spreads those costs across multiple businesses — one flat per-ad-space rate for up to 10,000 local Maui homes, everything included.",
    },
    {
      q: "How do I know if direct mail is right for my Maui business?",
      a: "It's a strong fit if your customers are local residents, you have a clear offer, and you can commit to showing up more than once. It's a weaker fit if you depend entirely on tourists or have no compelling reason for someone to respond.",
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
        It's a fair question. In a world of endless feeds, targeted ads, and email automation, mailing a
        physical postcard can feel almost old-fashioned. So let's answer it honestly: yes, direct mail is
        still worth it for small businesses — but only when it's done with intention.
      </p>

      <h2>Why physical mail still cuts through</h2>
      <p>
        The reason direct mail keeps working is almost the opposite of what you'd expect. Because so much
        marketing moved online, the mailbox got quieter and the inbox got louder. A well-designed postcard
        now stands out precisely because it's tangible. You hold it. It sits on the counter. It doesn't
        vanish in three seconds the way a social post does, and no algorithm gets to decide whether your
        customer sees it.
      </p>
      <p>
        For a local business, that physical permanence matters. A postcard with a clear offer can live on
        the fridge for a week. That's a week of gentle reminders you simply can't buy with a digital ad
        that disappears the moment the budget runs dry.
      </p>

      <div className="rule">◆</div>

      <h2>The real objection: cost</h2>
      <p>
        When business owners say direct mail "isn't worth it," they usually mean one thing — running it
        solo is expensive. And they're right. If you design, print, and mail your own postcard to thousands
        of homes, the costs stack up quickly: professional design, full-color printing, and postage on
        every single piece. For many small Maui businesses, a solo mailer is quoted in the thousands before
        a single card lands.
      </p>
      <p>
        That price tag is what kills most direct-mail plans before they start. But it's a cost problem, not
        a channel problem — and it's exactly the problem a shared mailer solves.
      </p>

      <h2>How sharing the postcard changes the math</h2>
      <p>
        A shared mailer puts several local businesses on one large postcard and splits the design, print,
        and postage across all of them. You get the reach of a big mailing for a fraction of the solo cost.
        With Island Mailer, that's one flat per-ad-space rate for up to 10,000 local Maui homes — design, printing, and
        postage all included, with one business per industry so you're never sharing the card with a
        competitor.
      </p>
      <p>
        Suddenly the question changes. It's no longer "can I afford to mail thousands of homes?" It's "can
        I afford to keep being the business my neighbors forget about?" For a deeper comparison, see{" "}
        <a href="/resources/eddm-vs-shared-mailer-maui">EDDM vs. Shared Mailer</a>.
      </p>

      <div className="rule">◆</div>

      <h2>When direct mail is — and isn't — worth it</h2>
      <p>Direct mail tends to pay off when:</p>
      <ul>
        <li>Your customers are local residents within a defined area.</li>
        <li>You have one clear, compelling offer to lead with.</li>
        <li>You can show up more than once, so people start recognizing your name.</li>
        <li>You want reach you control, not reach an algorithm rations out.</li>
      </ul>
      <p>It's a weaker fit when:</p>
      <ul>
        <li>Your business runs entirely on tourist traffic.</li>
        <li>You have no offer or reason for someone to respond.</li>
        <li>You're hoping a single mailing will transform your business overnight.</li>
      </ul>

      <h2>The bottom line for Maui</h2>
      <p>
        Direct mail still works — and on Maui, where the economy leans heavily toward visitors, a
        resident-targeted postcard is one of the cleanest ways to reach the locals who become regulars. The
        trick is making it affordable enough to do consistently. That's the whole idea behind Island
        Mailer. If your customers live here,{" "}
        <a href="/advertise#contact">check availability for your area</a> — or if Island Mailer isn't in your
        neighborhood yet, <a href="/waitlist">join the waitlist</a> and we'll let you know when it is.
      </p>
      <p>
        New to local advertising on Maui? Start with our{" "}
        <a href="/resources/advertise-to-locals-on-maui">2026 guide to advertising to local residents</a>.
      </p>
    </ArticleLayout>
  )
}
