import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { MessageSquare, ArrowLeft, Menu, X, Check } from "lucide-react";
import { Link } from "wouter";
import FooterSocialLinks from "@/components/FooterSocialLinks";

/* ─── SMS OPT-IN PAGE ───
   Web opt-in form for A2P 10DLC compliance.
   Collects mobile number + explicit (NOT pre-checked) consent, states message
   type, frequency, rates, STOP/HELP, and links to Terms + Privacy.
   Design matches the Tiger Claw dark theme. Submit emails the opt-in to
   support@tigerclaw.io (same no-backend mailto pattern as Contact).
─── */

const ORANGE = "#E8722A";
const GREEN = "#22C55E";
const EYEBROW_GREEN = "#4ADE80";
const FOOTER_DISCLAIMER =
  "Independent software tool. Not produced, approved, sponsored, endorsed, or recommended by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company. No results are promised. Users are responsible for their own company, program, privacy, advertising, do-not-contact, and communication compliance.";

/* ─── CURSOR FOLLOWER ─── */
function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 200 });
  const springY = useSpring(y, { damping: 25, stiffness: 200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if ("ontouchstart" in window) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseleave", leave); };
  }, [x, y]);

  if (!visible) return null;
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <div
        className="rounded-full"
        style={{
          width: 12,
          height: 12,
          background: ORANGE,
          boxShadow: `0 0 8px ${ORANGE}, 0 0 18px ${ORANGE}cc, 0 0 36px ${ORANGE}66`,
        }}
      />
    </motion.div>
  );
}

/* ─── NAV ─── */
function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "The Problem", href: "/#problem" },
    { label: "How It Works", href: "/#how" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      {/* Desktop floating pill nav */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block">
        <div
          className="flex items-center gap-1 px-2 py-2 rounded-full border border-white/10"
          style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)" }}
        >
          <Link href="/" className="flex items-center justify-center w-9 h-9 rounded-full mr-1">
            <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-9 h-9 rounded-full" />
          </Link>
          <div className="w-px h-5 bg-white/10" />
          {links.map((l, i) => (
            <a key={i} href={l.href} className="px-4 py-1.5 text-white/85 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {l.label}
            </a>
          ))}
          <a href="https://wizard.tigerclaw.io/dashboard" className="px-4 py-1.5 text-white/85 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Log In
          </a>
          <div className="w-px h-5 bg-white/10" />
          <Link href="/contact" className="px-4 py-1.5 text-white/85 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contact
          </Link>
        </div>
      </nav>

      {/* Mobile nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex items-center justify-between px-4 py-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(20px)" }}>
          <Link href="/" className="flex items-center gap-2">
            <img src="/favicon-64x64.png" alt="Tiger Claw" className="w-8 h-8 rounded-full" />
            <span className="text-white font-bold text-sm">TIGER CLAW</span>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white/80 p-2">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-4 pt-2 border-t border-white/10"
            style={{ background: "rgba(10,10,10,0.98)" }}
          >
            {links.map((l, i) => (
              <a key={i} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-white/70 hover:text-white text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {l.label}
              </a>
            ))}
            <a href="https://wizard.tigerclaw.io/dashboard" onClick={() => setMobileOpen(false)} className="block py-2.5 text-white/70 hover:text-white text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Log In
            </a>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2.5 text-white/70 hover:text-white text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Contact
            </Link>
          </motion.div>
        )}
      </nav>
    </>
  );
}

/* ─── OPT-IN FORM ─── */
function OptInForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    const subject = encodeURIComponent("SMS Opt-In");
    const body = encodeURIComponent(
      `New SMS opt-in via tigerclaw.io/sms\n\n` +
      `Name: ${name}\n` +
      `Mobile number: ${phone}\n` +
      `Consent: YES — agreed to receive recurring automated follow-up text messages from Tiger Claw.\n` +
      `Submitted: ${new Date().toISOString()}`
    );
    window.location.href = `mailto:support@tigerclaw.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${GREEN}20` }}>
          <Check className="w-7 h-7" style={{ color: GREEN }} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>You're opted in</h3>
        <p className="text-white/70 text-sm max-w-sm">
          Thanks for confirming. You'll receive follow-up text messages at the number you provided.
          Reply STOP at any time to cancel, or HELP for help.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-white/85 text-sm font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />
      </div>
      <div>
        <label className="block text-white/85 text-sm font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Mobile Phone Number<span style={{ color: ORANGE }}> *</span>
        </label>
        <input
          type="tel"
          placeholder="(555) 123-4567"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />
      </div>

      {/* Consent — explicit, NOT pre-checked */}
      <label className="flex items-start gap-3 cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-white/20 transition-colors">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 accent-[#E8722A]"
        />
        <span className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          I agree to receive recurring automated text messages (follow-ups, reminders,
          scheduling confirmations, and occasional updates) from Tiger Claw at the number
          provided. Consent is not a condition of any purchase. Message and data rates may
          apply. Message frequency varies. Reply STOP to cancel, HELP for help.
        </span>
      </label>

      <button
        type="submit"
        disabled={!consent}
        className="w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 enabled:hover:brightness-110 enabled:hover:scale-[1.02] enabled:hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] enabled:hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: ORANGE, color: "#000", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Yes, sign me up! <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
      </button>

      <p className="text-white/55 text-xs leading-relaxed text-center" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        By submitting, you agree to our{" "}
        <a href="/legal/terms" className="underline underline-offset-2 hover:text-white" style={{ color: ORANGE }}>Terms of Service</a>{" "}
        and{" "}
        <a href="/legal/privacy" className="underline underline-offset-2 hover:text-white" style={{ color: ORANGE }}>Privacy Policy</a>.
        We never sell or share your mobile information.
      </p>
    </form>
  );
}

/* ─── FOOTER ─── */
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
            <FooterSocialLinks />
          </div>
          <div className="text-left sm:text-right">
            <p className="text-white/70 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              &copy; {new Date().getFullYear()} Mariah Marketing LLC, doing business as Bot Craft Works. Tiger Claw is a product of Mariah Marketing LLC.
            </p>
          </div>
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
        <div className="border-t border-white/10 pt-6 space-y-3">
          <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {FOOTER_DISCLAIMER}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── SMS OPT-IN PAGE ─── */
export default function SmsOptIn() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <CursorFollower />
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-10 sm:pt-40 sm:pb-12" ref={heroRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
              TEXT MESSAGE SIGN-UP
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
              GET TEXT FOLLOW-UPS
            </h1>
            <p className="text-white/80 text-lg leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Opt in to receive follow-up text messages from Tiger Claw &mdash; reminders,
              scheduling confirmations, and answers to your questions. You choose to be here,
              and you can opt out any time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form card + program details */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10"
          >
            <OptInForm />
          </motion.div>

          {/* What to expect — the carrier-required disclosures, in plain sight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}>
                <MessageSquare className="w-5 h-5" style={{ color: ORANGE }} />
              </div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                What to expect
              </h2>
            </div>
            <ul className="space-y-3 text-white/75 text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <li><span className="text-white font-semibold">Message type:</span> One-to-one follow-up texts &mdash; replies to prior conversations, appointment and video-call reminders, scheduling confirmations, and occasional product or business updates.</li>
              <li><span className="text-white font-semibold">Message frequency:</span> Varies by your conversation. There is no fixed number.</li>
              <li><span className="text-white font-semibold">Cost:</span> Message and data rates may apply, depending on your mobile plan.</li>
              <li><span className="text-white font-semibold">Opt out:</span> Reply <span className="font-mono">STOP</span> at any time to stop receiving messages.</li>
              <li><span className="text-white font-semibold">Help:</span> Reply <span className="font-mono">HELP</span> for help, or email <a href="mailto:support@tigerclaw.io" className="underline underline-offset-2" style={{ color: ORANGE }}>support@tigerclaw.io</a>.</li>
              <li><span className="text-white font-semibold">Privacy:</span> We never sell or share your mobile information or opt-in consent with third parties for their marketing. See our <a href="/legal/privacy" className="underline underline-offset-2" style={{ color: ORANGE }}>Privacy Policy</a>.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
