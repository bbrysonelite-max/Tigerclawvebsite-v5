import { ArrowLeft, CheckCircle2, Shield, Workflow } from "lucide-react";
import { Link } from "wouter";

const ORANGE = "#E8722A";
const GREEN = "#22C55E";
const EYEBROW_GREEN = "#4ADE80";

const facts = [
  {
    title: "What Tiger Claw is",
    body: "Tiger Claw is a stateless multi-tenant agent-hosting platform. The current flagship product is an AI follow-up assistant for independent distributors, affiliates, social sellers, and relationship-driven operators.",
  },
  {
    title: "What it does today",
    body: "Tiger Claw helps operators remember prospect details, draft human-reviewed replies, handle common objections, organize follow-up, and move serious conversations toward a booked call.",
  },
  {
    title: "What setup requires",
    body: "A customer starts through Stripe checkout or an approved promotion code, completes the wizard, supplies their own BotFather token, supplies their own AI key, and provides a public calendar booking link.",
  },
  {
    title: "What it does not claim",
    body: "Tiger Claw does not guarantee sales, commissions, signups, rank, income, recruiting results, or any specific business outcome. It is not affiliated with any network marketing, direct selling, MLM, affiliate marketing, or social-selling company.",
  },
];

const machineLinks = [
  { label: "LLM instructions", href: "/llms.txt" },
  { label: "Capability JSON", href: "/agent-facts.json" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Contact", href: "/contact" },
];

function Nav() {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block">
      <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-white/10 bg-[#0A0A0A]/85 backdrop-blur-xl">
        <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full mr-1">
          <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-9 h-9 rounded-full" />
        </Link>
        <div className="w-px h-5 bg-white/10" />
        <Link href="/" className="px-4 py-1.5 text-white/85 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap">
          Home
        </Link>
        <a href="/#pricing" className="px-4 py-1.5 text-white/85 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap">
          Pricing
        </a>
        <Link href="/contact" className="px-4 py-1.5 text-white/85 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap">
          Contact
        </Link>
        <span className="px-4 py-1.5 text-sm font-semibold rounded-full" style={{ background: ORANGE, color: "#000" }}>
          Agent Facts
        </span>
      </div>
    </nav>
  );
}

export default function AgentFacts() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-10 transition-colors"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tiger Claw
        </Link>

        <section className="mb-16">
          <p
            className="text-sm font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}
          >
            AGENT-READABLE TRUTH
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
          >
            Tiger Claw facts for <span style={{ color: ORANGE }}>agents and crawlers.</span>
          </h1>
          <p className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-3xl">
            This page is the public, conservative source for machines and humans
            that need to understand what Tiger Claw is, what it supports today,
            how a customer starts, and which claims must not be inferred.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-4 mb-16">
          {facts.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.03] p-6">
              <CheckCircle2 className="w-6 h-6 mb-4" style={{ color: GREEN }} />
              <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {item.title}
              </h2>
              <p className="text-white/70 text-base leading-relaxed">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-16">
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <Workflow className="w-7 h-7 mb-4" style={{ color: ORANGE }} />
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Current customer path
            </h2>
            <ol className="space-y-3 text-white/75 leading-relaxed">
              <li>1. Customer starts at www.tigerclaw.io.</li>
              <li>2. Stripe checkout or an approved promotion code creates the payment proof.</li>
              <li>3. The setup wizard collects the BotFather token, AI key, and calendar link.</li>
              <li>4. Tiger Claw provisions the Telegram agent and sends setup/live emails.</li>
              <li>5. The agent holds prospect conversations and can send a booking link when the prospect is qualified.</li>
            </ol>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <Shield className="w-7 h-7 mb-4" style={{ color: GREEN }} />
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Boundaries
            </h2>
            <ul className="space-y-3 text-white/75 leading-relaxed">
              <li>No guaranteed outcomes or income claims.</li>
              <li>No hidden affiliation with direct-selling companies.</li>
              <li>No automated promise that every prospect should be booked.</li>
              <li>No claim that unsupported messaging surfaces are live.</li>
              <li>No claim that agentic checkout protocols are active yet.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Machine-readable artifacts
          </h2>
          <div className="flex flex-wrap gap-3">
            {machineLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center justify-center rounded-md border border-white/10 px-4 py-2 text-sm text-white/75 hover:text-white hover:bg-white/5 transition-colors"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
