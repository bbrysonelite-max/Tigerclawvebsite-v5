import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import {
  sections,
  LEGAL_EFFECTIVE,
  PrivacyPolicy,
  TermsOfService,
  AcceptableUse,
  CookiePolicy,
  DMCAPolicy,
  RefundPolicy,
  EarningsDisclaimer,
  AccessibilityStatement,
  NotAffiliated,
  DoNotSell,
} from "@/pages/Legal";

interface LegalDrawerProps {
  open: boolean;
  onClose: () => void;
  initialSection?: string;
}

export default function LegalDrawer({ open, onClose, initialSection }: LegalDrawerProps) {
  const [activeSection, setActiveSection] = useState(initialSection || "privacy");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Scroll to initial section when drawer opens
  useEffect(() => {
    if (!open || !initialSection) return;
    const t = setTimeout(() => {
      setActiveSection(initialSection);
      const root = scrollRef.current;
      if (!root) return;
      const target = root.querySelector(`#${CSS.escape(initialSection)}`) as HTMLElement | null;
      if (target) {
        root.scrollTo({ top: target.offsetTop - 24, behavior: "smooth" });
      }
    }, 320);
    return () => clearTimeout(t);
  }, [open, initialSection]);

  // Track active section while scrolling inside the drawer
  useEffect(() => {
    if (!open) return;
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root, rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = root.querySelector(`#${CSS.escape(s.id)}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [open]);

  const jumpTo = (id: string) => {
    setActiveSection(id);
    setMobileNavOpen(false);
    const root = scrollRef.current;
    if (!root) return;
    const target = root.querySelector(`#${CSS.escape(id)}`) as HTMLElement | null;
    if (target) {
      root.scrollTo({ top: target.offsetTop - 24, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="legal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Tray */}
          <motion.aside
            key="legal-tray"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.45 }}
            role="dialog"
            aria-modal="true"
            aria-label="Legal"
            className="fixed top-0 right-0 z-[101] h-full w-full sm:w-[680px] lg:w-[920px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Tray header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 sm:px-8 h-16 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md">
              <div>
                <h2 className="text-white font-bold text-base sm:text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Legal
                </h2>
                <p className="text-white/50 text-xs hidden sm:block">BotCraft Works LLC (DBA Tiger Claw) · Updated {LEGAL_EFFECTIVE}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scroll area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <div className="px-5 sm:px-8 py-8">
                {/* Mobile nav toggle */}
                <div className="lg:hidden mb-6">
                  <button
                    onClick={() => setMobileNavOpen(!mobileNavOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white text-sm"
                  >
                    <span>{sections.find((s) => s.id === activeSection)?.label || "Navigate"}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${mobileNavOpen ? "rotate-90" : ""}`} />
                  </button>
                  {mobileNavOpen && (
                    <div className="mt-2 rounded-lg border border-white/10 bg-[#111] overflow-hidden">
                      {sections.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => jumpTo(s.id)}
                          className={`w-full text-left block px-4 py-3 text-sm border-b border-white/5 last:border-0 transition-colors ${
                            activeSection === s.id ? "text-white bg-white/5" : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-10">
                  {/* Desktop sidebar */}
                  <aside className="hidden lg:block w-52 flex-shrink-0">
                    <nav className="sticky top-0 space-y-1">
                      {sections.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => jumpTo(s.id)}
                          className={`w-full text-left block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                            activeSection === s.id
                              ? "text-white bg-white/10 font-medium"
                              : "text-white/50 hover:text-white/80 hover:bg-white/5"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </nav>
                  </aside>

                  {/* Content */}
                  <main className="flex-1 min-w-0 max-w-3xl">
                    <div className="space-y-4">
                      <PrivacyPolicy />
                      <div className="border-t border-white/5 my-12" />
                      <TermsOfService />
                      <div className="border-t border-white/5 my-12" />
                      <AcceptableUse />
                      <div className="border-t border-white/5 my-12" />
                      <CookiePolicy />
                      <div className="border-t border-white/5 my-12" />
                      <DMCAPolicy />
                      <div className="border-t border-white/5 my-12" />
                      <RefundPolicy />
                      <div className="border-t border-white/5 my-12" />
                      <EarningsDisclaimer />
                      <div className="border-t border-white/5 my-12" />
                      <AccessibilityStatement />
                      <div className="border-t border-white/5 my-12" />
                      <NotAffiliated />
                      <div className="border-t border-white/5 my-12" />
                      <DoNotSell />
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
