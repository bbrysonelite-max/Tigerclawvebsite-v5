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
const FOOTER_DISCLAIMER =
  "Independent software tool. Not produced, approved, sponsored, endorsed, or recommended by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company. Results are not guaranteed. Users are responsible for their own company, program, privacy, advertising, do-not-contact, and communication compliance.";

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
    { label: "The Problem", href: "#problem" },
    { label: "What It Does", href: "#how" },
    { label: "Handoff", href: "#what-you-get" },
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
      <div className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-4">
        <nav className="flex items-center gap-1 px-2 py-2 rounded-full bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40">
          <a href="#" className="flex items-center gap-2 pl-3 pr-4">
            <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-7 h-7 rounded-full" />
          </a>
          <div className="w-px h-5 bg-white/10" />
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-4 py-1.5 text-white/85 hover:text-white hover:bg-white/5 text-sm font-semibold transition-all duration-200 rounded-full">
              {l.label}
            </a>
          ))}
          <div className="w-px h-5 bg-white/10" />
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

      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5">
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

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_TIGER} alt="" className="w-full h-full object-cover object-[70%_20%] sm:object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/35 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/85 via-[#0A0A0A]/25 to-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-left w-full pt-24 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <div className="w-2 h-2 rounded-full" style={{ background: GREEN }} />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: GREEN }}>Telegram-first follow-up</span>
          </div>
          <h1 className="mb-4">
            <span className="block text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95]" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em", color: ORANGE }}>
              The fortune is in the follow-up.
            </span>
            <span className="block mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
              AI follow-up agent for prospect conversations.
            </span>
          </h1>
          <p className="text-white/90 text-2xl sm:text-3xl max-w-2xl mb-4 leading-tight font-semibold">
            Keep the conversation alive without chasing.
          </p>
          <p className="text-white/75 text-lg sm:text-xl max-w-2xl mb-8 leading-relaxed">
            Tiger Claw gives relationship-driven operators a helpful messaging assistant that remembers context, listens for real interest, follows up with timing, and moves qualified conversations toward the right next step. Every Tiger starts with Telegram; LINE can be added from the dashboard after hatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WIZARD_URL} className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-black rounded-lg transition-all duration-300 hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5" style={{ background: ORANGE }}>
              Start setup <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#how" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white/80 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 hover:scale-[1.03] hover:-translate-y-0.5 transition-all duration-300">
              See what it does
            </a>
          </div>
          <p className="text-white/55 text-xs sm:text-sm max-w-3xl mt-5 leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Independent software tool. Not produced, approved, sponsored, endorsed, or recommended by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company.
          </p>
        </motion.div>
      </div>

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
          ["Telegram first", "Add LINE from dashboard"],
          ["Setup", "Prep before checkout"],
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
            Follow-up gets <span style={{ color: ORANGE }}>messy fast.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
            Good conversations get buried. Follow-ups slip. People go quiet. You lose track of who was curious, who had an objection, and who was actually ready for a next step. Tiger Claw keeps the thread clear so serious conversations do not die from delay.
          </p>
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
    { icon: <MessageSquare className="w-5 h-5" />, title: "Talk naturally", body: "One question at a time, with replies that feel like a real conversation." },
    { icon: <NotebookTabs className="w-5 h-5" />, title: "Remember the thread", body: "Pain points, objections, timing, and what the prospect already said." },
    { icon: <Clock className="w-5 h-5" />, title: "Follow up without chasing", body: "Context-aware follow-up instead of generic just-checking-in messages." },
    { icon: <Target className="w-5 h-5" />, title: "Spot qualified movement", body: "Curiosity, seriousness, hesitation, and readiness are not treated the same." },
    { icon: <Shield className="w-5 h-5" />, title: "Protect your time", body: "Tiger keeps casual interest separate from conversations worth human attention." },
    { icon: <Calendar className="w-5 h-5" />, title: "Offer the next step when earned", body: "A booking link belongs after context, not as a reflex." },
  ];

  return (
    <section id="how" className="py-24 sm:py-32 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
            WHAT TIGER CLAW DOES
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            It keeps follow-up <span style={{ color: ORANGE }}>useful.</span>
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
            THE HANDOFF
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            A clear reason to <span style={{ color: ORANGE }}>step in.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10">
            A booking is not proof by itself. Tiger Claw is built around qualified movement: what the person said, what they care about, why now, and what the operator should do next.
          </p>
        </FadeSection>
        <FadeSection delay={0.25}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Telegram setup starts with BotFather, a calendar link, and an AI key",
              "LINE can be added from the dashboard after Telegram signup",
              "Prospect context, notes, objections, and timing stay attached to the thread",
              "Qualified movement is judged before a handoff or booking matters",
              "Tiger Card-style context tells you why the next step deserves attention",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 rounded-lg border border-white/5 bg-white/[0.03]">
                <UserRoundCheck className="w-5 h-5 flex-shrink-0" style={{ color: GREEN }} />
                <span className="text-white/80 text-sm">{item}</span>
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
            "Independent distributors who need follow-up discipline without turning every conversation into pressure.",
            "Affiliates and social sellers who manage prospect conversations across busy days.",
            "Relationship-driven operators who want Tiger to help sort, remember, and hand off without replacing human judgment.",
          ].map((text, i) => (
            <FadeSection key={text} delay={i * 0.12}>
              <div className="flex gap-4 items-start p-5 rounded-lg border border-white/5 bg-white/[0.02]">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: GREEN }}>
                  <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/80 text-base sm:text-lg leading-relaxed">{text}</p>
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
            One assistant. <span style={{ color: ORANGE }}>One simple price.</span>
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
              <p className="text-white/70 text-sm mb-8" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                Cancel anytime. No contracts. No setup fees.
              </p>
              <p className="text-white/65 text-sm leading-relaxed mb-8 max-w-2xl">
                Start setup opens the preparation page before checkout. You
                will need a Telegram bot token, a public calendar link, and an
                AI key before a Tiger can be hatched cleanly.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  "Telegram-first AI follow-up assistant with LINE dashboard add-on support",
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

function FAQSection() {
  const faqs = [
    {
      q: "Does Tiger Claw auto-send everywhere?",
      a: "No. Tiger Claw is not an auto-send-everywhere tool. Every Tiger starts with Telegram. LINE can be added from the dashboard when the tenant has the right LINE channel credentials.",
    },
    {
      q: "What about LINE?",
      a: "LINE is a dashboard add-on after Telegram signup. Once the tenant connects the right LINE channel credentials, Tiger should be able to continue the conversation there; each tenant still needs real conversation evidence before LINE is treated as proven for that tenant.",
    },
    {
      q: "What do I need before checkout?",
      a: "The setup page helps you prepare a Telegram BotFather token, a public calendar link, and an AI key. Getting those ready first makes the hatch cleaner.",
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
      a: "Yes. You can request export or deletion by contacting help@tigerclaw.io. Cancellation does not trap you or remove your ability to request export or deletion of eligible data.",
    },
  ];

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
        <div className="space-y-4">
          {faqs.map((item, i) => (
            <FadeSection key={item.q} delay={i * 0.1}>
              <div className="p-6 rounded-lg border border-white/5 bg-white/[0.02]">
                <h3 className="text-white font-semibold text-lg mb-3">{item.q}</h3>
                <p className="text-white/70 text-base leading-relaxed">{item.a}</p>
              </div>
            </FadeSection>
          ))}
        </div>
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
            Keep the next step <span style={{ color: ORANGE }}>in view.</span>
          </p>
        </FadeSection>
        <FadeSection delay={0.15}>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Start with the setup checklist. Then hatch the assistant, connect the messaging path, and keep real prospect conversations moving.
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

function Footer({ onOpenLegal }: { onOpenLegal: (section: string) => void }) {
  const siteLinks = [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/#faq" },
    { label: "Support Promise", href: "/contact#support-promise" },
  ];
  const legalLinks = [
    { label: "Privacy Policy", id: "privacy" },
    { label: "Terms of Service", id: "terms" },
    { label: "Acceptable Use", id: "aup" },
    { label: "Cookie Policy", id: "cookies" },
    { label: "DMCA", id: "dmca" },
    { label: "Cancellation", id: "refund" },
    { label: "Results Disclaimer", id: "earnings" },
    { label: "Accessibility", id: "accessibility" },
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
              BotCraft Works LLC (DBA Tiger Claw)<br />
              <a href="mailto:help@tigerclaw.io" className="hover:text-white transition-colors" style={{ color: ORANGE }}>help@tigerclaw.io</a>
            </p>
            <FooterSocialLinks />
          </div>
          <p className="text-white/70 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            &copy; {new Date().getFullYear()} BotCraft Works LLC. All rights reserved.
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
              <button key={link.id} type="button" onClick={() => onOpenLegal(link.id)} className="text-white/60 hover:text-white text-sm transition-colors duration-200 cursor-pointer" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {link.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => onOpenLegal("do-not-sell")} className="inline-block mt-3 text-white/60 hover:text-white text-sm transition-colors duration-200 underline underline-offset-2 cursor-pointer" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            Do Not Sell or Share My Personal Information
          </button>
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
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<string>("privacy");
  const openLegal = (section: string) => {
    setLegalSection(section);
    setLegalOpen(true);
  };

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
      <OfferSection />
      <Footer onOpenLegal={openLegal} />
      <LegalDrawer open={legalOpen} onClose={() => setLegalOpen(false)} initialSection={legalSection} />
    </div>
  );
}
