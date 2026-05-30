import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ArrowLeft } from "lucide-react";
import { sections, LEGAL_EFFECTIVE, policyComponents } from "@/pages/Legal";

interface LegalDrawerProps {
  open: boolean;
  onClose: () => void;
  initialSection?: string;
}

export default function LegalDrawer({ open, onClose, initialSection }: LegalDrawerProps) {
  // null = show the index menu; an id = show that one policy
  const [activeId, setActiveId] = useState<string | null>(initialSection ?? null);

  // When the drawer opens (or the requested section changes), reset to the
  // requested policy, or the menu if none was requested. Adjusted during
  // render (the documented prop-change pattern) rather than in an effect.
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevSection, setPrevSection] = useState(initialSection);
  if (open !== prevOpen || initialSection !== prevSection) {
    setPrevOpen(open);
    setPrevSection(initialSection);
    if (open) setActiveId(initialSection ?? null);
  }

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

  const activeSection = activeId ? sections.find((s) => s.id === activeId) : undefined;
  const Policy = activeSection ? policyComponents[activeSection.id] : undefined;

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
            className="fixed top-0 right-0 z-[101] h-full w-full sm:w-[560px] lg:w-[720px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Tray header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 sm:px-8 h-16 border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-md">
              <div className="min-w-0">
                {activeSection ? (
                  <button
                    onClick={() => setActiveId(null)}
                    className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> All policies
                  </button>
                ) : (
                  <>
                    <h2 className="text-white font-bold text-base sm:text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Legal
                    </h2>
                    <p className="text-white/50 text-xs hidden sm:block">BotCraft Works LLC (DBA Tiger Claw) · Updated {LEGAL_EFFECTIVE}</p>
                  </>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scroll area */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-5 sm:px-8 py-8">
                {activeSection && Policy ? (
                  <div className="max-w-3xl">
                    <Policy />
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveId(s.id)}
                        className="group flex items-center justify-between gap-3 px-4 py-4 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-colors text-left"
                      >
                        <span className="text-white/85 text-sm font-medium group-hover:text-white">{s.label}</span>
                        <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/70 flex-shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
