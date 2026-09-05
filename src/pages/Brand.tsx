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

        {/* Product UI — Mission Control (operator dashboard) */}
        <Section id="product-ui" title="Product UI">
          <style>{`
            @keyframes tc-pulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
              50% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0); }
            }
            .tc-pulse { animation: tc-pulse 2s ease-in-out infinite; }
            @keyframes tc-blink {
              0%, 92%, 100% { opacity: 1; }
              94%, 96% { opacity: 0.15; }
            }
            .tc-eye { animation: tc-blink 4.5s steps(1) infinite; }
            .tc-small { font-size: 13px; color: #a1a1aa; transition: color 0.18s ease; }
            .tc-small:hover { color: #d4d4d8; }
            .tc-prowl-track { position: relative; height: 3px; background: #1a1a1a; border-radius: 2px; overflow: hidden; width: 100%; }
            .tc-prowl-cat {
              position: absolute; top: 0; left: -30%; height: 100%; width: 30%; border-radius: 2px;
              background: linear-gradient(90deg, transparent, #E8722A 60%, #ffb380);
              animation: tc-prowl 2.2s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            }
            @keyframes tc-prowl { 0% { left: -30%; } 100% { left: 100%; } }
          `}</style>
          <p className="text-white/60 text-sm mb-6 max-w-2xl">
            The operator dashboard (Mission Control) speaks this system. Two laws govern it:
            <span className="text-white"> motion never lies</span> — every animation rides on a stored
            event or a passing check, an idle Tiger is a still screen — and
            <span className="text-white"> benefits, never tech</span> — the product says what Tiger did
            for the operator, not what the system did.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Element label="Tiger-eye mark" snippet="rounded-[50%_50%_50%_0] bg-orange-500 rotate(-45deg) + .tc-eye slow blink">
              <span className="tc-eye inline-block h-[11px] w-[11px] rounded-[50%_50%_50%_0]" style={{ background: ORANGE, transform: "rotate(-45deg)" }} />
            </Element>

            <Element label="LIVE chip" snippet="rounded-full border px-3 py-1 mono 11px uppercase + .tc-pulse dot — green only when health passes; any worse state shows the readiness word in orange as a doorway">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                <span className="tc-pulse w-2 h-2 rounded-full" style={{ background: GREEN }} />
                <span className="text-[11px] uppercase tracking-[0.08em] text-white/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>LIVE</span>
              </span>
            </Element>

            <Element label="Prowl-line" snippet=".tc-prowl-track + .tc-prowl-cat — 3px orange sweep; fires ONCE per real event batch (looped here as a specimen)">
              <div className="w-full px-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/60 mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>ON THE PROWL</p>
                <div className="tc-prowl-track"><span className="tc-prowl-cat" /></div>
              </div>
            </Element>

            <Element label="Text law" snippet=".tc-small — gray #a1a1aa at 13px minimum (bigger, not brighter), hover-brightens to #d4d4d8; white is emphasis only; orange + green are signals">
              <div className="text-left w-full px-2">
                <p className="tc-small">Tiger replied to <span className="text-white">Sarah Lopez</span> — hover this line</p>
                <p className="tc-small mt-1">2 booked this week · <span style={{ color: GREEN }}>ready</span></p>
              </div>
            </Element>

            <Element label="Benefit voice" snippet="map every internal state to operator words or hide it — an unmapped value never renders">
              <div className="text-left w-full px-2 space-y-1.5">
                <p className="text-sm"><span style={{ color: GREEN }}>✓</span> <span className="text-white/80">A prospect wrote back</span></p>
                <p className="text-sm line-through decoration-white/30 text-white/40">turn_inbound</p>
                <p className="text-sm"><span style={{ color: GREEN }}>✓</span> <span className="text-white/80">Tiger knows the moment someone books.</span></p>
                <p className="text-sm line-through decoration-white/30 text-white/40">webhook verified ✓</p>
              </div>
            </Element>

            <Element label="Feed entry" snippet="rows slide in with a ~2.4s orange flash, then go calm — flash fires only on the poll diff">
              <div className="w-full rounded-lg border px-3 py-2 text-left" style={{ borderColor: ORANGE, background: "rgba(232, 114, 42, 0.1)" }}>
                <p className="text-sm text-white/90">Draft written for <span className="text-white">Todd</span> — ready for your review</p>
                <p className="text-[11px] text-white/40 mt-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>2m ago</p>
              </div>
            </Element>

            {/* ◆ Operator Command primitives (spec §10) — static specimens of the
                shipped admin components. Sources: web-onboarding/src/app/admin/
                components/*.tsx + api/src/services/attention_queue.ts. */}
            <Element label="Gate banner ◆" snippet="GO: border-emerald-500/35 bg-emerald-500/10 + pulsing dot, mono 13px. DEGRADED (amber) / DOWN (red) swap to a 5xl verdict with the business consequence line first">
              <div className="flex w-full items-center gap-3 rounded-lg border border-emerald-500/35 bg-emerald-500/10 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[13px] font-bold uppercase tracking-widest text-emerald-300">GO</span>
                <span className="font-mono text-[13px] text-emerald-300/70">all systems nominal</span>
              </div>
            </Element>

            <Element label="Gauge tile ◆" snippet="rounded-lg border-zinc-700 bg-zinc-900 px-3 py-3 mono 13px — always five gauges, fixed order; border turns amber/red only when the value IS the problem (motion never lies)">
              <div className="flex w-full max-w-[200px] flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3 font-mono">
                <span className="text-[13px] font-bold uppercase tracking-widest text-zinc-400">Tigers</span>
                <span className="text-[13px] text-white">14 today · 31 24h</span>
              </div>
            </Element>

            <Element label="Attention card ◆" snippet="border-red-500/60 bg-red-500/10 (amber: border-amber-500/50) — headline leads with the consequence, never the subsystem (benefits, never tech); mono 13px action row">
              <div className="w-full rounded-lg border border-red-500/60 bg-red-500/10 p-3 text-left">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-[15px] font-bold text-white">✗ Dana's tiger — webhook — prospects are talking to a dead bot</p>
                    <p className="font-mono text-[13px] text-zinc-400">fires ×3</p>
                  </div>
                  <button type="button" className="shrink-0 rounded border border-zinc-600 bg-zinc-800 px-2 py-1 font-mono text-[13px] text-zinc-300 hover:bg-zinc-700">Acknowledge</button>
                </div>
              </div>
            </Element>

            <Element label="Green manifest line ◆" snippet="✓ N watchers green — quiet emerald mono 13px row; 90-day uptime strip below: emerald ok / red down / gray no-data — never green without a stored rollup (motion never lies)">
              <div className="w-full text-left">
                <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 font-mono text-[13px] text-emerald-400">✓ 7 watchers green: postgres · redis · telegram · gemini · stripe</div>
                <div className="mt-2 px-1">
                  <div className="text-[13px] text-white/60">telegram</div>
                  <div className="mt-1 flex w-full gap-px">
                    {"--ggggggggggggxggggggggggggggg".split("").map((c, i) => (
                      <span key={i} className={`h-2 min-w-0 flex-1 ${c === "g" ? "bg-emerald-500/60" : c === "x" ? "bg-red-500/80" : "bg-white/10"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Element>

            <Element label="Heartbeat chip ◆" snippet="'proven Nmin ago' in emerald — the platform proves itself out loud; flips to red 'never proven' when stale past 35min, never fakes freshness">
              <div className="flex w-full max-w-[200px] flex-col gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-3 font-mono">
                <span className="text-[13px] font-bold uppercase tracking-widest text-zinc-400">Heartbeat</span>
                <span className="text-[13px] text-emerald-400">proven 7min ago</span>
              </div>
            </Element>

            <Element label="Superseded-check card ◆" snippet="border-zinc-700 bg-zinc-900/40 opacity-60 — a stale alarm the live verdict has outrun stays honest but steps back; Dismiss, not Acknowledge">
              <div className="w-full rounded-lg border border-zinc-700 bg-zinc-900/40 p-3 text-left opacity-60">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-[15px] font-bold text-white">⚠ Daily check flagged telegram — live status GREEN since</p>
                    <p className="font-mono text-[13px] text-zinc-500">superseded — resolved since this check ran</p>
                  </div>
                  <button type="button" className="shrink-0 rounded border border-zinc-600 bg-zinc-800 px-2 py-1 font-mono text-[13px] text-zinc-300 hover:bg-zinc-700">Dismiss</button>
                </div>
              </div>
            </Element>

            <Element label="Bulk-ack control ◆" snippet="header counts reconcile: open − affecting = noise; the button appears only when noise > 0 and clears it in one stroke">
              <div className="flex w-full flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[13px] font-bold uppercase tracking-widest text-white">NEEDS YOUR HAND — 2</span>
                <button type="button" className="ml-auto rounded border border-zinc-600 bg-zinc-800 px-3 py-1 font-mono text-[13px] text-zinc-300 hover:bg-zinc-700">Acknowledge all noise (4)</button>
              </div>
            </Element>

            <Element label="Self-healed card ◆" snippet="info severity: border-zinc-700 bg-zinc-900/60 — the platform fixed it and says so honestly; escalates to ⚠ amber at ×3 heals in a week">
              <div className="w-full rounded-lg border border-zinc-700 bg-zinc-900/60 p-3 text-left">
                <p className="text-[15px] font-bold text-white">✓ self-healed — webhook re-registered for Dana</p>
              </div>
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
          Tiger Claw Brand Book · Mariah Marketing LLC, doing business as Bot Craft Works
        </div>
      </footer>

      <LegalDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
