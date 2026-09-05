import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, ChevronDown, Clock, Menu, MessageSquare, NotebookTabs, Shield, Target, UserRoundCheck, X } from "lucide-react";
import FooterSocialLinks from "@/components/FooterSocialLinks";
import LegalDrawer from "@/components/LegalDrawer";

const HERO_TIGER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663056989091/8mGGeGAbWRt2wNDPeh43Ek/tc-goods-hero-tiger-kREoKjDy7VbVLihfN3ac8E.webp";
const ORANGE_BREAK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663056989091/8mGGeGAbWRt2wNDPeh43Ek/tc-goods-orange-break-hLD5W3d5goMaak62rKQ5uW.webp";
const WINDOW_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663056989091/8mGGeGAbWRt2wNDPeh43Ek/tc-goods-window-abstract-RVUW5uXcq4G3LLM9PmxdoP.webp";

const ORANGE = "#E8722A";
const GREEN = "#22C55E";
const EYEBROW_GREEN = "#4ADE80";
const WIZARD_URL = "/start";
const DASH_URL = "https://wizard.tigerclaw.io/dashboard";
const FOOTER_DISCLAIMER =
  "Independent software tool. Not produced, approved, sponsored, endorsed, or recommended by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company. No results are promised. Users are responsible for their own company, program, privacy, advertising, do-not-contact, and communication compliance.";

function FadeSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CursorFollower() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
      style={{
        x: springX,
        y: springY,
        width: 12,
        height: 12,
        background: ORANGE,
        boxShadow: `0 0 8px ${ORANGE}, 0 0 18px ${ORANGE}cc, 0 0 36px ${ORANGE}66`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}

function Nav() {
  const [showCta, setShowCta] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { label: "Problem", href: "#problem" },
    { label: "How It Works", href: "#how" },
    { label: "What You Get", href: "#what-you-get" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setShowCta(window.scrollY > window.innerHeight * 1.5);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-5 left-0 right-0 z-50 hidden lg:flex justify-center px-4">
        <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
          <a href="#" className="flex items-center gap-2 pl-3 pr-4">
            <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-7 h-7 rounded-full" />
          </a>
          <div className="w-px h-5 bg-white/10" />
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-4 py-1.5 text-white hover:text-[#E8722A] hover:bg-white/5 text-base font-semibold transition-all duration-200 rounded-full">
              {l.label}
            </a>
          ))}
          <div className="w-px h-5 bg-white/10" />
          <a href={DASH_URL} className="px-4 py-1.5 text-white hover:text-[#E8722A] hover:bg-white/5 text-base font-semibold transition-all duration-200 rounded-full">
            Log In
          </a>
          <AnimatePresence>
            {showCta && (
              <motion.a
                href={WIZARD_URL}
                initial={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                animate={{ opacity: 1, width: "auto", paddingLeft: 14, paddingRight: 14 }}
                exit={{ opacity: 0, width: 0, paddingLeft: 0, paddingRight: 0 }}
                className="py-1.5 text-sm font-semibold text-black rounded-full whitespace-nowrap overflow-hidden"
                style={{ background: ORANGE, fontSize: "0.8rem" }}
              >
                Start setup
              </motion.a>
            )}
          </AnimatePresence>
        </nav>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between h-14 px-4">
          <a href="#" className="flex items-center gap-2">
            <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-8 h-8 rounded-full" />
            <span className="text-white font-bold text-base tracking-tight">TIGER CLAW</span>
          </a>
          <button className="text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open navigation">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="bg-[#0A0A0A]/98 backdrop-blur-md border-b border-white/5 overflow-hidden">
              <div className="px-4 py-4 space-y-3">
                {links.map((l) => (
                  <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white text-sm font-medium py-2 uppercase tracking-wider">
                    {l.label}
                  </a>
                ))}
                <a href={DASH_URL} onClick={() => setMobileOpen(false)} className="block text-white/70 hover:text-white text-sm font-medium py-2 uppercase tracking-wider">
                  Log In
                </a>
                <a href={WIZARD_URL} onClick={() => setMobileOpen(false)} className="block text-center px-5 py-3 text-sm font-semibold text-black rounded-lg mt-2" style={{ background: ORANGE }}>
                  Start setup
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function TigerChatDemo() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}>
      <div className="rounded-xl border border-white/10 bg-[#1a1a1a] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_90px_rgba(232,114,42,0.12)]">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
          <div className="w-9 h-9 flex-shrink-0 -rotate-45" style={{ background: ORANGE, borderRadius: "50% 50% 50% 0" }} />
          <div>
            <div className="text-white text-sm font-semibold">Sarah Lopez</div>
            <div className="text-[10px] uppercase tracking-[0.12em]" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>Tiger following up · Day 6</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-center text-[10px] text-white/35" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>6 days since her last reply</div>
          <div className="self-end max-w-[85%] px-4 py-3 rounded-xl rounded-br-sm border text-sm leading-relaxed text-white" style={{ background: "rgba(232,114,42,0.15)", borderColor: "rgba(232,114,42,0.4)" }}>
            No rush at all, Sarah — how did your sister's event end up going last weekend?
          </div>
          <div className="self-start max-w-[85%] px-4 py-3 rounded-xl rounded-bl-sm border border-white/10 bg-white/5 text-sm leading-relaxed text-white/70">
            omg it went great!! and honestly I've been thinking about what you said…
          </div>
          <div className="self-end max-w-[85%] px-4 py-3 rounded-xl rounded-br-sm border text-sm leading-relaxed text-white" style={{ background: "rgba(232,114,42,0.15)", borderColor: "rgba(232,114,42,0.4)" }}>
            Then let's not lose the momentum. Want me to send over the booking link for Thursday?
          </div>
          <div className="self-start max-w-[85%] px-4 py-3 rounded-xl rounded-bl-sm border border-white/10 bg-white/5 text-sm leading-relaxed text-white/70">
            yes let's do it 🙌
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-lg border" style={{ borderColor: "rgba(74,222,128,0.4)", background: "rgba(74,222,128,0.07)" }}>
          <div className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse" style={{ background: EYEBROW_GREEN }} />
          <p className="text-xs text-white/80"><span className="font-semibold" style={{ color: EYEBROW_GREEN }}>Handed to you:</span> Sarah is ready — full notes attached.</p>
        </div>
      </div>
      <p className="text-center text-[10px] uppercase tracking-[0.12em] text-white/35 mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        Tiger remembered her sister's event. <span style={{ color: ORANGE }}>You never dropped the ball.</span> · Illustrative example
      </p>
    </motion.div>
  );
}

function Hero() {
  const [legalOpen, setLegalOpen] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_TIGER} alt="" className="w-full h-full object-cover object-[70%_20%] sm:object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/75 via-[#0A0A0A]/50 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/45 to-[#0A0A0A]/65" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-28 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-left">
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
              <div className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: GREEN }}>Always-on follow-up</span>
            </div>
            <h1 className="mb-5">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
                Tiger does the follow-up.
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] mt-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em", color: ORANGE }}>
                You do the closing.
              </span>
            </h1>
            <p className="text-white/90 text-xl sm:text-2xl max-w-xl mb-3 leading-snug font-semibold">
              Tiger Claw is your AI follow-up agent for prospect conversations.
            </p>
            <p className="text-white/75 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
              It remembers every thread, follows up at the right moment, and taps you when someone is actually ready — like this.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WIZARD_URL} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-black rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5" style={{ background: ORANGE }}>
                Start setup <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#how" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white/80 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300">
                See what it does
              </a>
            </div>
            <p className="text-white/45 text-xs max-w-xl mt-5 leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Independent software tool — not affiliated with or endorsed by any company.{" "}
              <button
                onClick={() => setLegalOpen(true)}
                className="underline underline-offset-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                Full disclosure
              </button>
            </p>
          </motion.div>

          <TigerChatDemo />
        </div>
      </div>

      <LegalDrawer open={legalOpen} onClose={() => setLegalOpen(false)} initialSection="not-affiliated" />

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="border-y border-white/5 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          ["Around the clock", "Follow-up that never sleeps"],
          ["Every thread", "Context remembered"],
          ["$147", "Per month"],
        ].map(([value, label]) => (
          <div key={label}>
            <div className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", color: ORANGE }}>{value}</div>
            <div className="text-xs sm:text-sm text-white/60 uppercase tracking-widest mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="problem" className="py-24 sm:py-32 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            THE DAILY FOLLOW-UP PROBLEM
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Good conversations <span style={{ color: ORANGE }}>die from delay.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
            Follow-ups slip. Warm people go quiet. You lose track of who was curious, who had an objection, and who was actually ready.
          </p>
        </FadeSection>
        <FadeSection delay={0.25}>
          <div className="mt-14 p-10 sm:p-14 rounded-xl border border-white/10 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-[80px] opacity-20" style={{ background: ORANGE }} />
            <p className="relative text-4xl sm:text-5xl font-bold text-white leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}>
              &ldquo;The fortune is in <span style={{ color: ORANGE }}>the follow-up.</span>&rdquo;
            </p>
            <p className="relative text-xs uppercase tracking-[0.16em] text-white/40 mt-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              The oldest rule in the business — Tiger just never breaks it
            </p>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function OrangeBreak() {
  return (
    <section className="relative h-[42vh] sm:h-[52vh] overflow-hidden">
      <img src={ORANGE_BREAK} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
        <FadeSection>
          <p className="text-3xl sm:text-5xl lg:text-6xl font-bold text-black/80 text-center px-4" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}>
            QUALIFIED CONVERSATIONS, NOT NOISE
          </p>
        </FadeSection>
      </div>
    </section>
  );
}

function WhatHelpsWith() {
  const items = [
    { icon: <MessageSquare className="w-5 h-5" />, title: "Talks naturally", body: "One question at a time. Feels like a real conversation." },
    { icon: <NotebookTabs className="w-5 h-5" />, title: "Remembers everything", body: "Pain points, objections, timing — every thread." },
    { icon: <Clock className="w-5 h-5" />, title: "Follows up on time", body: "Context-aware follow-up. Never “just checking in.”" },
    { icon: <Target className="w-5 h-5" />, title: "Spots real interest", body: "Curious and serious are not the same. Tiger knows." },
    { icon: <Shield className="w-5 h-5" />, title: "Guards your time", body: "Casual interest never reaches you. Serious conversations do." },
    { icon: <Calendar className="w-5 h-5" />, title: "Earns the next step", body: "A booking link belongs after context, not as a reflex." },
  ];

  return (
    <section id="how" className="py-24 sm:py-32 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            WHAT TIGER CLAW DOES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Six jobs. <span style={{ color: ORANGE }}>Handled every day.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div key={item.title} className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${ORANGE}15`, color: ORANGE }}>
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-base">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mt-2">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function WhatYouGet() {
  return (
    <section id="what-you-get" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={WINDOW_IMG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-[#0A0A0A]/82" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            WHAT YOU GET
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            You close. <span style={{ color: ORANGE }}>Tiger does the rest.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={0.25}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              ["Save hours every week", "Tiger does the chasing so you don't have to."],
              ["Never drop the ball", "Every follow-up, note, and timing cue — remembered."],
              ["Walk in warm", "You get the full story before you say a word."],
              ["Step in to close, not to dig", "The work is done before it reaches you."],
            ].map(([title, body]) => (
              <div key={title} className="flex items-start gap-3 p-5 rounded-lg border border-white/5 bg-white/[0.03]">
                <UserRoundCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: GREEN }} />
                <div>
                  <div className="text-white font-semibold text-base">{title}</div>
                  <p className="text-white/60 text-sm leading-relaxed mt-1">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function WhoSection() {
  return (
    <section id="who" className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            WHO IT'S FOR
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Built for people who build through <span style={{ color: ORANGE }}>relationships.</span>
          </h2>
        </FadeSection>
        <div className="space-y-6">
          {[
            ["Independent distributors", "Follow-up discipline without turning conversations into pressure."],
            ["Affiliates and social sellers", "Every prospect conversation, managed across busy days."],
            ["Relationship-driven operators", "Tiger sorts, remembers, and hands off. You keep the judgment."],
          ].map(([title, body], i) => (
            <FadeSection key={title} delay={i * 0.12}>
              <div className="flex gap-4 items-start p-5 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: GREEN }}>
                  <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-base sm:text-lg">{title}</div>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed mt-1">{body}</p>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            PRICING
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            One agent. <span style={{ color: ORANGE }}>One simple price.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <div className="border border-white/10 rounded-xl p-8 sm:p-10 bg-white/[0.02] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[100px] opacity-20" style={{ background: ORANGE }} />
            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-6xl sm:text-7xl font-bold text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>$147</span>
                <span className="text-white/60 text-lg">/month</span>
              </div>
              <p className="text-white/70 text-sm mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Cancel anytime. No contracts. No setup fees.
              </p>
              <div className="p-5 rounded-lg border mb-8 max-w-2xl" style={{ borderColor: "rgba(74,222,128,0.4)", background: "rgba(74,222,128,0.07)" }}>
                <p className="text-sm leading-relaxed mb-1">
                  <span className="font-semibold" style={{ color: EYEBROW_GREEN }}>30-Day Conversation Promise</span>
                  <span className="text-white/80"> — if Tiger doesn't hold a real conversation with a prospect in your first 30 days, you get every dollar back.</span>
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  Five real exchanges with a real person. Import your people and send at least 10 Tiger Cards — Tiger does the rest.
                </p>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-2xl">
                A short setup checklist gets your Tiger ready — we walk you
                through each step before you pay, so it's working for you from
                day one.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  "An AI follow-up agent that works around the clock",
                  "Conversation memory and prospect notes",
                  "Qualified movement and next-step guidance",
                  "Common objection and timing awareness",
                  "Earned handoff or booking support",
                  "Operator remains responsible for compliance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GREEN }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <a href={WIZARD_URL} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 text-lg font-bold text-black rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5" style={{ background: ORANGE }}>
                Start setup <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function FAQItem({ q, children, defaultOpen = false }: { q: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer hover:bg-white/[0.03] transition-colors duration-200"
      >
        <h3 className="text-white font-semibold text-lg">{q}</h3>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-2xl leading-none flex-shrink-0" style={{ color: ORANGE }}>
          +
        </motion.span>
      </button>
      {/* Answer stays mounted while collapsed so crawlers always see the full FAQ text;
          inert removes the hidden region (incl. its mailto link) from tab order and the a11y tree */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
        inert={!open}
      >
        <p className="text-white/70 text-base leading-relaxed px-6 pb-6">{children}</p>
      </motion.div>
    </div>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Where does my Tiger work?",
      a: "Your Tiger starts on Telegram, and you can add LINE from your dashboard once you're set up. More channels are on the way. It follows up where your prospects actually are — not by blasting everywhere at once.",
    },
    {
      q: "What about LINE?",
      a: "LINE is an add-on you turn on from your dashboard after you're up and running on Telegram. Once it's connected, your Tiger keeps the conversation going there too.",
    },
    {
      q: "What do I need before checkout?",
      a: "Just a few quick connections. We walk you through each one on the setup page before you pay, so your Tiger is ready to go from day one.",
    },
    {
      q: "Does a booking mean Tiger worked?",
      a: "Not by itself. A booking only matters when the conversation shows qualified movement. Tiger Claw is built to value the conversation quality and handoff context before the booking.",
    },
    {
      q: "Does Tiger Claw promise business results?",
      a: "No. Tiger Claw helps with conversation memory, follow-up, objection support, notes, and next-step guidance. It does not promise a specific business outcome.",
    },
    {
      q: "Do I still have to follow my company, program, and legal rules?",
      a: "Yes. You are responsible for company policies, compensation-plan rules, advertising rules, privacy rules, do-not-contact requests, and communication requirements.",
    },
    {
      q: "Who owns my prospect conversation data?",
      a: "You own the prospect conversation data, notes, and records you provide. Tiger Claw uses that information to operate, support, secure, and improve the service.",
    },
    {
      q: "Can I export or delete my data?",
      a: "Yes. You can request export or deletion by contacting support@tigerclaw.io. Cancellation does not trap you or remove your ability to request export or deletion of eligible data.",
    },
  ];

  const renderAnswer = (text: string) => {
    const email = "support@tigerclaw.io";
    const parts = text.split(email);
    if (parts.length === 1) return text;
    return parts.flatMap((part, i) =>
      i < parts.length - 1
        ? [part, <a key={i} href={`mailto:${email}`} className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: ORANGE }}>{email}</a>]
        : [part]
    );
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Clear expectations.
          </h2>
        </FadeSection>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <FadeSection key={item.q} delay={i * 0.06}>
              <FAQItem q={item.q} defaultOpen={i === 0}>
                {renderAnswer(item.a)}
              </FAQItem>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function StakesQuote() {
  return (
    <section className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <FadeSection>
          <figure className="relative text-center">
            <span
              aria-hidden="true"
              className="block leading-none mb-2 select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "5rem", color: ORANGE, opacity: 0.5 }}
            >
              &ldquo;
            </span>
            <blockquote
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.01em" }}
            >
              In this market, the operators who follow up <span style={{ color: ORANGE }}>win.</span> The
              ones who don&rsquo;t get left behind.
            </blockquote>
          </figure>
        </FadeSection>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={WINDOW_IMG} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <FadeSection>
          <p className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Every day you wait, a warm conversation <span style={{ color: ORANGE }}>goes cold.</span>
          </p>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Quick setup, then your Tiger gets to work on every prospect thread you have.
          </p>
        </FadeSection>
        <FadeSection delay={0.3}>
          <a href={WIZARD_URL} className="inline-flex items-center justify-center gap-2 px-12 py-5 text-lg font-bold text-black rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5" style={{ background: ORANGE }}>
            Start setup <ArrowRight className="w-5 h-5" />
          </a>
        </FadeSection>
      </div>
    </section>
  );
}

function Footer() {
  const siteLinks = [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
    { label: "Support Promise", href: "/contact#support-promise" },
    { label: "Brand", href: "/brand" },
  ];
  const legalLinks = [
    { label: "Privacy Policy", slug: "privacy" },
    { label: "Terms of Service", slug: "terms" },
    { label: "Acceptable Use", slug: "acceptable-use" },
    { label: "Cookie Policy", slug: "cookies" },
    { label: "DMCA", slug: "dmca" },
    { label: "Cancellation", slug: "cancellation" },
    { label: "Results Disclaimer", slug: "results" },
    { label: "Accessibility", slug: "accessibility" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-8 h-8 rounded-full" />
              <span className="text-white font-bold text-sm tracking-tight">TIGER CLAW</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Mariah Marketing LLC, doing business as Bot Craft Works<br />
              <a href="mailto:support@tigerclaw.io" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: ORANGE }}>support@tigerclaw.io</a>
            </p>
            <p className="text-white/60 text-xs leading-relaxed mt-4 max-w-md" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Brent Bryson coined the term "flavored agents" — AI agents flavored for a specific industry — and teaches operators how to use them at Probe Academy.{" "}
              <a href="https://brentbryson.ai/flavored-agents" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: ORANGE }}>
                Flavored agents, defined
              </a>
            </p>
            <FooterSocialLinks />
          </div>
          <p className="text-white/70 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            &copy; {new Date().getFullYear()} Mariah Marketing LLC, doing business as Bot Craft Works. Tiger Claw is a product of Mariah Marketing LLC.
          </p>
        </div>
        <div className="border-t border-white/10 pt-6 mb-6">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {siteLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white/60 hover:text-white text-sm transition-colors duration-200" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {link.label}
              </a>
            ))}
            {legalLinks.map((link) => (
              <a key={link.slug} href={`/legal/${link.slug}`} className="text-white/60 hover:text-white text-sm transition-colors duration-200" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {link.label}
              </a>
            ))}
          </div>
          <a href="/legal/do-not-sell" className="inline-block mt-3 text-white/60 hover:text-white text-sm transition-colors duration-200 underline underline-offset-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Do Not Sell or Share My Personal Information
          </a>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {FOOTER_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <CursorFollower />
      <Nav />
      <Hero />
      <StatsBar />
      <ProblemSection />
      <OrangeBreak />
      <WhatHelpsWith />
      <WhatYouGet />
      <WhoSection />
      <PricingSection />
      <FAQSection />
      <StakesQuote />
      <OfferSection />
      <Footer />
    </div>
  );
}
