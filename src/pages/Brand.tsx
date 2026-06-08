/* ─── Tiger Claw Brand Book ───────────────────────────────────────────────
   The living brand reference, co-located with the brand assets in /brand.
   Route: /brand (hidden from the public nav — reachable directly).
   Voice/bios are pulled from brand/social-bios.json so they stay in sync.
   Visual identity + the UI elements live together here because the elements
   ARE part of the brand.
──────────────────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import LegalDrawer from "@/components/LegalDrawer";
import socialBios from "../../brand/social-bios.json";

const ORANGE = "#E8722A";
const GREEN = "#4ADE80";

const COLORS: { name: string; hex: string; note: string }[] = [
  { name: "Base", hex: "#0A0A0A", note: "Page background" },
  { name: "Orange", hex: "#E8722A", note: "Primary accent / CTA" },
  { name: "Signal Green", hex: "#4ADE80", note: "Status / live" },
  { name: "Green Deep", hex: "#22C55E", note: "Confirm / check" },
  { name: "Surface", hex: "#1a1a1a", note: "Nav / raised surfaces" },
  { name: "Ink", hex: "#050505", note: "Footer / deepest" },
];

const FONTS: { name: string; stack: string; sample: string; role: string }[] = [
  { name: "Bebas Neue", stack: "'Bebas Neue', sans-serif", sample: "FIND MOTIVATED PEOPLE", role: "Display headlines" },
  { name: "Space Grotesk", stack: "'Space Grotesk', sans-serif", sample: "Fortune is in the follow-up", role: "Headings / UI" },
  { name: "IBM Plex Mono", stack: "'IBM Plex Mono', monospace", sample: "SYSTEM OPERATIONAL", role: "Labels / mono accents" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/40" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{title}</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
      {children}
    </section>
  );
}

/* One element specimen: the rendered primitive + its copy-paste className. */
function Element({ label, snippet, children }: { label: string; snippet: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-center min-h-[64px]">{children}</div>
      <p className="text-white/70 text-sm font-medium mb-2">{label}</p>
      <code className="block text-[11px] leading-relaxed text-white/40 break-words" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{snippet}</code>
    </div>
  );
}

export default function Brand() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const brands = Object.values(socialBios) as {
    name: string; website: string; bios: Record<string, string>;
  }[];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-8 h-8 rounded-full" />
            <span className="font-bold text-lg tracking-tight">TIGER CLAW</span>
            <span className="text-white/30 text-sm hidden sm:inline" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>/ brand book</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Home
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* Title */}
        <div className="mb-16">
          <h1 className="leading-[0.9] text-6xl sm:text-7xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            BRAND <span style={{ color: ORANGE }}>BOOK</span>
          </h1>
          <p className="text-white/60 mt-4 max-w-2xl">
            The identity, voice, and elements of Tiger Claw — a dark, high-contrast, neo-brutalist system. One accent. Big condensed type. Predator confidence.
          </p>
        </div>

        {/* Brands */}
        <Section id="brands" title="Brands">
          <div className="grid sm:grid-cols-2 gap-4">
            {brands.map((b) => (
              <div key={b.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.name}</h2>
                <a href={b.website} className="text-sm" style={{ color: ORANGE }}>{b.website.replace("https://", "")}</a>
                <p className="text-white/70 text-sm mt-3 leading-relaxed">{b.bios?.linkedin}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Colors */}
        <Section id="colors" title="Color">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {COLORS.map((c) => (
              <div key={c.hex} className="rounded-lg border border-white/10 overflow-hidden bg-white/[0.02]">
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-white/40 text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{c.hex}</p>
                  <p className="text-white/40 text-xs mt-1">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section id="type" title="Typography">
          <div className="space-y-4">
            {FONTS.map((f) => (
              <div key={f.name} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <span className="text-white/70 text-sm font-medium">{f.name}</span>
                  <span className="text-white/40 text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{f.role}</span>
                </div>
                <p className="text-3xl sm:text-4xl text-white" style={{ fontFamily: f.stack }}>{f.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Elements */}
        <Section id="elements" title="Elements">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Element label="Primary button" snippet="px-8 py-4 rounded-full font-semibold text-black + bg #E8722A">
              <button className="px-8 py-4 rounded-full font-semibold text-black transition-transform hover:scale-[1.03]" style={{ background: ORANGE }}>Deploy your Tiger</button>
            </Element>

            <Element label="Secondary button" snippet="px-8 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10">
              <button className="px-8 py-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 text-white/80 font-semibold transition-all">Read the manifesto</button>
            </Element>

            <Element label="Status chip" snippet="rounded-full border border-white/10 bg-white/5 + pulsing dot">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
                <span className="text-xs tracking-wide text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>SYSTEM OPERATIONAL</span>
              </div>
            </Element>

            <Element label="Card" snippet="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04]">
              <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors w-full">
                <p className="font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tiger Brain</p>
                <p className="text-white/50 text-sm">Remembers every prospect detail.</p>
              </div>
            </Element>

            <Element label="Feature panel" snippet="rounded-xl border border-white/10 + orange blur glow">
              <div className="relative w-full rounded-xl border border-white/10 bg-white/[0.02] p-5 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[80px] opacity-20" style={{ background: ORANGE }} />
                <p className="relative font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Fortune is in the follow-up</p>
              </div>
            </Element>

            <Element label="Check dot" snippet="w-6 h-6 rounded-full flex items-center justify-center + green">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: GREEN }}>
                <span className="text-black text-sm font-bold">✓</span>
              </div>
            </Element>

            <Element label="Floating nav pill" snippet="rounded-full bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10">
              <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
                <span className="px-3 py-1 text-white/85 text-xs font-semibold rounded-full">Problem</span>
                <span className="px-3 py-1 text-white/85 text-xs font-semibold rounded-full bg-white/5">Pricing</span>
                <span className="px-3 py-1 text-black text-xs font-semibold rounded-full" style={{ background: ORANGE }}>Get started</span>
              </nav>
            </Element>

            <Element label="Legal drawer (live)" snippet="<LegalDrawer open onClose /> — slide-out tray">
              <button onClick={() => setDrawerOpen(true)} className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#E8722A]/40 text-white/80 text-sm font-medium transition-all">Open drawer</button>
            </Element>
          </div>
        </Section>

        {/* Voice & bios */}
        <Section id="voice" title="Voice & bios">
          <div className="space-y-4">
            {brands.map((b) => (
              <div key={b.name} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{b.name}</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {Object.entries(b.bios || {}).map(([platform, text]) => (
                    <div key={platform}>
                      <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{platform}</p>
                      <p className="text-white/70 text-sm leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-xs mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>source: brand/social-bios.json</p>
        </Section>
      </main>

      <footer className="border-t border-white/5 bg-[#050505] py-8">
        <div className="max-w-5xl mx-auto px-6 text-center text-white/40 text-sm">
          Tiger Claw Brand Book · BotCraft Works LLC
        </div>
      </footer>

      <LegalDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
