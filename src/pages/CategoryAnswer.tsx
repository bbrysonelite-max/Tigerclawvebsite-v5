import { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  categoryAnswers,
  categoryBySlug,
  PULL_QUOTE_PARTS,
} from "./categoryAnswers";

/* ─── DESIGN: Category answer pages (GEO / LLM retrieval)
   Dark background (#0A0A0A), Space Grotesk headings, orange accents —
   matches Legal.tsx. Plain <a> tags throughout so the same component
   renders cleanly through renderToStaticMarkup in the prerender script.
─── */

const ORANGE = "#E8722A";
const START_URL = "/start";

function Heading2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl sm:text-3xl font-bold text-white mt-14 mb-4"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-white/90 text-[15px] leading-relaxed mb-4">{children}</p>;
}

const WARM_BULLET_DEFAULT_LEAD = "Keeps prospects warm";

const WHAT_IT_DOES: { lead: string; rest: string }[] = [
  { lead: "A follow-up agent", rest: " — it works your follow-up so conversations keep moving." },
  { lead: "Acts on your behalf", rest: " — drafting replies and check-ins in your voice." },
  { lead: WARM_BULLET_DEFAULT_LEAD, rest: " — timely check-ins so nobody slips through the cracks." },
  { lead: "Remembers the relationship", rest: " — context, details, objections, and timing for every person." },
  { lead: "Moves people toward the next conversation", rest: " — when the conversation earns it." },
  { lead: "Books appointments", rest: " — so serious conversations land on your calendar." },
  { lead: "Extends the operator", rest: " — it extends you; your judgment stays in charge." },
];

export default function CategoryAnswer({ slug }: { slug: string }) {
  const category = categoryBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) return;
    document.title = `Best AI Agent for ${category.titleTerm} | Tiger Claw`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", category.metaDescription);
  }, [category]);

  if (!category) return null;
  const others = categoryAnswers.filter((c) => c.slug !== category.slug);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2.5">
              <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-8 h-8 rounded-full" />
              <span className="text-white font-bold text-lg tracking-tight">TIGER CLAW</span>
            </a>
            <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {category.question}
        </h1>

        <p className="text-white text-lg sm:text-xl leading-relaxed mb-10">{category.answer}</p>

        <blockquote
          className="border-l-4 pl-6 py-4 my-10 bg-white/[0.03] rounded-r-lg"
          style={{ borderColor: ORANGE }}
        >
          <p className="text-white/95 text-base sm:text-lg leading-relaxed italic">
            &ldquo;{PULL_QUOTE_PARTS.before}
            <em className="not-italic font-bold" style={{ color: ORANGE }}>
              {PULL_QUOTE_PARTS.emphasis}
            </em>
            {PULL_QUOTE_PARTS.after}&rdquo;
          </p>
        </blockquote>

        <Heading2>What Tiger Claw does</Heading2>
        <ul className="mb-4">
          {WHAT_IT_DOES.map((item) => {
            const lead =
              item.lead === WARM_BULLET_DEFAULT_LEAD && category.warmBulletLead
                ? category.warmBulletLead
                : item.lead;
            return (
              <li
                key={item.lead}
                className="text-white/90 text-[15px] leading-relaxed mb-2 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/60"
              >
                <strong className="text-white font-semibold">{lead}</strong>
                {item.rest}
              </li>
            );
          })}
        </ul>

        <Heading2>The honest version</Heading2>
        <P>
          Tiger Claw starts with Telegram. LINE is available as an add-on from your customer
          dashboard after signup.
        </P>
        <P>
          You — the operator — stay responsible for compliance, consent, privacy,
          do-not-contact rules, your company&rsquo;s policies, and your own business judgment.
          Tiger Claw helps you follow up; it does not replace your judgment.
        </P>
        <P>
          Tiger Claw {category.guaranteeDisclaimer}.{" "}
          <a
            href="/legal/results"
            className="underline underline-offset-2 hover:text-white transition-colors"
            style={{ color: ORANGE }}
          >
            Read the Results Disclaimer
          </a>
          .
        </P>

        <Heading2>Frequently asked questions</Heading2>
        <div className="space-y-6">
          {category.faqs.map((faq) => (
            <div key={faq.q} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <h3
                className="text-base font-semibold text-white mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {faq.q}
              </h3>
              <p className="text-white/90 text-[15px] leading-relaxed">
                {faq.a}
                {faq.linkHref && faq.linkLabel ? (
                  <>
                    {" "}
                    <a
                      href={faq.linkHref}
                      className="underline underline-offset-2 hover:text-white transition-colors"
                      style={{ color: ORANGE }}
                    >
                      {faq.linkLabel}
                    </a>
                    .
                  </>
                ) : null}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href={START_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-black rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5"
            style={{ background: ORANGE }}
          >
            Get Your Tiger <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        <nav className="mt-16 pt-8 border-t border-white/10" aria-label="Related questions">
          <p className="text-white/50 text-sm mb-3">More answers:</p>
          <ul>
            {others.map((c) => (
              <li key={c.slug} className="mb-2">
                <a
                  href={`/${c.slug}`}
                  className="text-white/85 hover:text-white text-sm underline underline-offset-2 transition-colors"
                >
                  {c.question}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="border-t border-white/5 bg-[#050505] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} BotCraft Works LLC (DBA Tiger Claw). All rights
            reserved. Tiger Claw is not affiliated with, endorsed by, or connected to any company.
          </p>
        </div>
      </footer>
    </div>
  );
}
