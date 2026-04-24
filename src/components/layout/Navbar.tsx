import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { AppLink } from "../ui/AppLink";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { 
    label: "About", 
    path: "/about",
    dropdown: [
      { label: "About Us", path: "/about" },
      { label: "Our Story", path: "/about-us" },
      { label: "Case Studies", path: "/case-studies" },
    ]
  },
  { 
    label: "Resources", 
    path: "#",
    dropdown: [
      { label: "Blog", path: "/blog" },
      { label: "FAQ", path: "/faq" },
      { label: "ROI Calculator", path: "/roi-calculator" },
      { label: "Service Selector", path: "/service-selector" },
      { label: "Automation Audit", path: "/automation-audit" },
      { label: "Newsletter", path: "/newsletter" },
    ]
  },
];

function BrandMark({ mobile = false }: { mobile?: boolean }) {
  const wrapperClasses = mobile
    ? "px-2 py-1"
    : "px-2 py-1 transition-all duration-300 group-hover:-translate-y-0.5";
  const titleClasses = mobile
    ? "text-[33px] tracking-[-0.03em]"
    : "text-[19px] tracking-[-0.02em] lg:text-[21px]";
  const gradientClasses = mobile
    ? "text-[42px] tracking-[-0.07em]"
    : "text-[25px] tracking-[-0.06em] lg:text-[28px]";
  const trailingClasses = mobile
    ? "text-[33px] tracking-[-0.03em]"
    : "text-[19px] tracking-[-0.02em] lg:text-[21px]";
  const dotClasses = mobile ? "ml-2 h-2.5 w-2.5" : "ml-2 h-2 w-2";

  return (
    <span className={`inline-flex items-center ${wrapperClasses}`}>
      <span className={`${titleClasses} font-black text-black`}>T</span>
      <span className={`ml-[1px] font-black italic text-[#4ADE80] ${gradientClasses}`}>
        Y
      </span>
      <span className={`font-black text-black ${trailingClasses}`}>pin</span>
    </span>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-5 pt-5">
        <motion.nav
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className={`relative flex w-full max-w-[980px] items-center rounded-full border px-2.5 py-1.5 transition-all duration-500 lg:px-3 lg:py-2 ${
            scrolled
              ? "border-gray-200/60 bg-white/80 shadow-[0_4px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] backdrop-blur-2xl"
              : "border-white/30 bg-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)] backdrop-blur-xl"
          }`}
        >
          <Link to="#" className="group flex shrink-0 items-center pl-3">
            <BrandMark />
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-1 px-4 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className="relative flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium text-[#4B5563] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:text-[#111827] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-[calc(100%+8px)] z-[100] min-w-[200px] rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.path}
                              className="block rounded-xl px-4 py-2.5 text-[13px] font-medium text-[#4B5563] transition-all duration-200 hover:bg-[#F0FDF4] hover:text-[#16A34A]"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium text-[#4B5563] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:text-[#111827] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden shrink-0 pr-1 lg:flex">
            <AppLink
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-[#4ADE80] px-8 py-4 text-[15px] font-bold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
            >
              Book a Call
              <ChevronDown className="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1" />
            </AppLink>
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

              <Link
                to="/"
                className="mb-6 flex flex-col items-center leading-none"
                onClick={() => setMobileOpen(false)}
              >
                <BrandMark mobile />
              </Link>

              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="flex flex-col items-center gap-2"
                >
                  {item.dropdown ? (
                    <>
                      <span className="text-xl font-semibold text-[#374151]">
                        {item.label}
                      </span>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.path}
                          className="text-base font-medium text-[#6B7280] transition-colors hover:text-[#16A34A]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-xl font-semibold text-[#374151] transition-colors hover:text-[#16A34A]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AppLink
                  href="#contact"
                  className="mt-6 rounded-full bg-[#111827] px-8 py-4 text-[15px] font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Call
                </AppLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
