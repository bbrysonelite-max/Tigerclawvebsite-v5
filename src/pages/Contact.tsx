import { useState, useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Mail, MapPin, Send, ArrowLeft, Menu, X } from "lucide-react";
import { Link } from "wouter";
import FooterSocialLinks from "@/components/FooterSocialLinks";

/* ─── CONTACT PAGE ───
   Design: Tiger Claw dark theme — true black, orange accents, Space Grotesk + IBM Plex Mono
   Layout: Two-column — contact form left, contact info right
   No personal names in headings. Production-ready.
─── */

const ORANGE = "#E8722A";
const GREEN = "#22C55E";
const EYEBROW_GREEN = "#4ADE80";
const FOOTER_DISCLAIMER =
  "Independent software tool. Not produced, approved, sponsored, endorsed, or recommended by any network marketing, direct selling, MLM, affiliate marketing, or social-selling company. Results are not guaranteed. Users are responsible for their own company, program, privacy, advertising, do-not-contact, and communication compliance.";

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
          <span className="px-4 py-1.5 text-sm font-semibold rounded-full" style={{ background: ORANGE, color: "#000" }}>
            Contact
          </span>
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
          </motion.div>
        )}
      </nav>
    </>
  );
}

/* ─── CONTACT FORM ─── */
function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link as fallback
    const subject = encodeURIComponent("Tiger Claw Inquiry");
    const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:support@tigerclaw.io?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: `${GREEN}20` }}>
          <Send className="w-7 h-7" style={{ color: GREEN }} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Message Sent</h3>
        <p className="text-white/70 text-sm">We will contact you within 24 business hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />
      </div>
      <div>
        <textarea
          placeholder="Message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors resize-none"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5"
        style={{ background: ORANGE, color: "#000", fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Submit <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
      </button>
      <p className="text-white/50 text-xs text-center" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        We will contact you within 24 business hours.
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
              BotCraft Works LLC (DBA Tiger Claw)<br />
              <a href="mailto:support@tigerclaw.io" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: ORANGE }}>support@tigerclaw.io</a>
            </p>
            <FooterSocialLinks />
          </div>
          <div className="text-left sm:text-right">
            <p className="text-white/70 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              &copy; {new Date().getFullYear()} BotCraft Works LLC. All rights reserved.
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

/* ─── CONTACT PAGE ─── */
export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  // Fail-visible: the observer does not always fire for content already on
  // screen at first paint, and the `: {}` fallback applies no properties —
  // which would pin this section at `initial` (opacity 0) forever.
  const [heroFallback, setHeroFallback] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setHeroFallback(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  const heroRevealed = heroInView || heroFallback;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <CursorFollower />
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20" ref={heroRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
              GET IN TOUCH
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
              CONTACT US
            </h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Reach out to learn how Tiger Claw can help you follow up, remember prospect details, and keep serious conversations moving.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="pb-20 sm:pb-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10"
            >
              <ContactForm />
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Contact Information
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Reach out to learn how Tiger Claw can help you follow up, remember prospect details, and keep serious conversations moving.
                </p>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}>
                      <Mail className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Email</p>
                      <a href="mailto:support@tigerclaw.io" className="underline underline-offset-2 hover:text-white text-sm transition-colors" style={{ fontFamily: "'IBM Plex Mono', monospace", color: ORANGE }}>
                        support@tigerclaw.io
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${ORANGE}15`, border: `1px solid ${ORANGE}30` }}>
                      <MapPin className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Location</p>
                      <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        Bot Craft Works<br />
                        15560 N Frank Lloyd Wright<br />
                        Suite B4-7254<br />
                        Scottsdale, AZ 85260
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Promise */}
      <section id="support-promise" className="pb-20 sm:pb-28 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
              SUPPORT PROMISE
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
              A clear next step within one business day.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Send product questions, setup questions, billing questions, or
              cancellation requests to{" "}
              <a href="mailto:support@tigerclaw.io" className="underline underline-offset-2 hover:text-white transition-colors" style={{ color: ORANGE }}>support@tigerclaw.io</a>.
              We will respond within 24 business hours and point you to the next useful step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Conversation CTA */}
      <section className="pb-20 sm:pb-28 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: EYEBROW_GREEN, fontFamily: "'IBM Plex Mono', monospace" }}>
              SEE TIGER CLAW IN ACTION
            </p>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}>
              SCHEDULE A CONVERSATION
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Product questions, setup questions, or want to see whether Tiger Claw fits your follow-up workflow? Send a note and we will help with the next step.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#111] p-8 sm:p-10 text-center"
          >
            <p className="text-white/70 text-base leading-relaxed mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Use one inbox for product questions, setup help, and conversation requests.
            </p>
            <a
              href="mailto:support@tigerclaw.io?subject=Tiger%20Claw%20Conversation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] hover:-translate-y-0.5"
              style={{ background: ORANGE, color: "#000", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Schedule a Conversation <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
