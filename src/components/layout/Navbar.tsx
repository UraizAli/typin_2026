import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Process", href: "#delivery" },
  { label: "Insights", href: "#insights" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-5 pt-5">
        <motion.nav
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className={`relative flex w-full max-w-[1100px] items-center justify-between overflow-hidden rounded-full border px-3 py-1.5 transition-all duration-500 lg:px-4 lg:py-2 ${
            scrolled
              ? "border-gray-200/60 bg-white/80 shadow-[0_4px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] backdrop-blur-2xl"
              : "border-white/30 bg-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl"
          }`}
        >
          {/* Brand */}
          <a href="#top" className="flex shrink-0 items-center gap-2 pl-3">
            <div className="flex flex-col leading-none">
              <span className="font-['Inspiration',cursive] text-[26px] text-[#111827] lg:text-[32px]">
                Typin
              </span>
              <span className="-mt-1 text-[7px] font-bold uppercase tracking-[0.28em] text-[#16A34A] lg:text-[8px]">
                AI Automation
              </span>
            </div>
          </a>

          {/* Center links — enterprise pill cluster */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-0.5 rounded-full bg-[#F3F4F6]/70 p-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-[13px] font-medium text-[#4B5563] transition-all duration-250 hover:bg-white hover:text-[#111827] hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right side — CTA + status */}
          <div className="flex items-center gap-2 pr-1">
            <div className="mr-2 hidden items-center gap-1.5 xl:flex">
              <span className="h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_6px_rgba(74,222,128,0.5)]" />
              <span className="text-[11px] font-medium text-[#6B7280]">Available</span>
            </div>
            <a
              href="#contact"
              className="hidden items-center gap-1.5 rounded-full bg-[#111827] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#1F2937] hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)] lg:inline-flex"
            >
              Book a Call
              <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
            </a>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#374151] lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Scroll progress — thin line at bottom of pill */}
          <motion.div
            className="absolute bottom-0 left-6 right-6 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#16A34A] via-[#4ADE80] to-[#A3E635]"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-[#FAFBFC]/98 backdrop-blur-2xl"
          >
            <div className="flex h-full flex-col items-center justify-center gap-5">
              <button
                className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#F3F4F6] text-[#374151]"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              <a href="#top" className="mb-6 flex flex-col items-center leading-none" onClick={() => setMobileOpen(false)}>
                <span className="font-['Inspiration',cursive] text-[48px] text-[#111827]">
                  Typin
                </span>
                <span className="-mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#16A34A]">
                  AI Automation
                </span>
              </a>

              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="text-xl font-semibold text-[#374151] transition-colors hover:text-[#16A34A]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 rounded-full bg-[#111827] px-8 py-4 text-[15px] font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
