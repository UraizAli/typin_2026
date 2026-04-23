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
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-5 pt-5">
        <motion.nav
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className={`relative flex w-full max-w-[980px] items-center overflow-hidden rounded-full border px-2.5 py-1.5 transition-all duration-500 lg:px-3 lg:py-2 ${
            scrolled
              ? "border-gray-200/60 bg-white/80 shadow-[0_4px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] backdrop-blur-2xl"
              : "border-white/30 bg-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl"
          }`}
        >
          <a href="#top" className="group flex shrink-0 items-center pl-3">
            <span className="inline-flex items-center rounded-full bg-[#111827]/92 px-4 py-2 shadow-[0_10px_32px_rgba(17,24,39,0.22)] ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_40px_rgba(22,163,74,0.2)]">
              <span className="text-[23px] font-black tracking-[-0.05em] text-white lg:text-[26px]">
                T
              </span>
              <span className="ml-[1px] bg-[linear-gradient(135deg,#4ADE80_0%,#34D399_45%,#A3E635_100%)] bg-clip-text text-[23px] font-black italic tracking-[-0.06em] text-transparent lg:text-[26px]">
                y
              </span>
              <span className="bg-[linear-gradient(135deg,#4ADE80_0%,#34D399_45%,#A3E635_100%)] bg-clip-text text-[23px] font-black tracking-[-0.055em] text-transparent lg:text-[26px]">
                pin
              </span>
              <span className="ml-2 h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_16px_rgba(74,222,128,0.75)]" />
            </span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-1 px-4 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium text-[#4B5563] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:text-[#111827] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden shrink-0 pr-1 lg:flex">
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#4ADE80] px-8 py-4 text-[15px] font-bold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
            >
              Book a Call
              <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="flex items-center gap-2 pr-1 lg:hidden">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F4F6] text-[#374151]"
              onClick={() => setMobileOpen(!mobileOpen)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <motion.div
            className="absolute bottom-0 left-6 right-6 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#16A34A] via-[#4ADE80] to-[#A3E635]"
            style={{ scaleX: scrollYProgress }}
          />
        </motion.nav>
      </div>

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
                type="button"
              >
                <X className="h-6 w-6" />
              </button>

              <a
                href="#top"
                className="mb-6 flex flex-col items-center leading-none"
                onClick={() => setMobileOpen(false)}
              >
                <span className="inline-flex items-center rounded-full bg-[#111827] px-5 py-3 shadow-[0_14px_36px_rgba(17,24,39,0.2)] ring-1 ring-white/10">
                  <span className="text-[40px] font-black tracking-[-0.06em] text-white">
                    T
                  </span>
                  <span className="ml-[1px] bg-[linear-gradient(135deg,#4ADE80_0%,#34D399_45%,#A3E635_100%)] bg-clip-text text-[40px] font-black italic tracking-[-0.065em] text-transparent">
                    y
                  </span>
                  <span className="bg-[linear-gradient(135deg,#4ADE80_0%,#34D399_45%,#A3E635_100%)] bg-clip-text text-[40px] font-black tracking-[-0.06em] text-transparent">
                    pin
                  </span>
                  <span className="ml-2 h-2.5 w-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_18px_rgba(74,222,128,0.75)]" />
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
