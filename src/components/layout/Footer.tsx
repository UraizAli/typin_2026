import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, staggerItem } from "../../lib/animations";
import { AnimatedSection } from "../ui/AnimatedSection";
import { AppLink } from "../ui/AppLink";

const footerLinks = [
  { label: "Services", path: "/services" },
  { label: "Pricing", path: "/pricing" },
  { label: "About Us", path: "/about-us" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
  { label: "Case Studies", path: "/case-studies" },
];

const toolsLinks = [
  { label: "ROI Calculator", path: "/roi-calculator" },
  { label: "Service Selector", path: "/service-selector" },
  { label: "Automation Audit", path: "/automation-audit" },
  { label: "Newsletter", path: "/newsletter" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#1F2937] px-6 pb-10 pt-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={staggerItem} className="space-y-6">
          <Link to="/" className="flex shrink-0 flex-col leading-none">
            <span className="font-['Inspiration',cursive] text-[34px] text-white">
              Typin
            </span>
            <span className="-mt-1.5 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#4ADE80]">
              AI Automation
            </span>
          </Link>
          <p className="max-w-[300px] text-[15px] leading-7 text-[#9CA3AF]">
            We help SMEs replace manual busywork with AI-powered automation so your
            team can do more with fewer people and zero wasted hours.
          </p>
        </motion.div>

        <motion.div variants={staggerItem} className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              link.path.startsWith("/") ? (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-[15px] text-[#9CA3AF] transition-colors duration-200 hover:text-[#4ADE80]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.path}
                  className="text-[15px] text-[#9CA3AF] transition-colors duration-200 hover:text-[#4ADE80]"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Contact
          </h3>
          <div className="flex flex-col gap-3 text-[15px] text-[#9CA3AF]">
            <p>Automation strategy, deployment, and ongoing optimization.</p>
            <a href="tel:+923183561921" className="transition-colors hover:text-[#4ADE80]">
              +92 318 356 1921
            </a>
            <a href="mailto:hello@typin.ai" className="transition-colors hover:text-[#4ADE80]">
              hello@typin.ai
            </a>
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="space-y-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {["instagram", "twitter", "linkedin"].map((social) => (
              <a
                key={social}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#374151] bg-[#374151]/50 text-[#9CA3AF] transition-all duration-300 hover:border-[#4ADE80] hover:bg-[#4ADE80] hover:text-[#111827]"
              >
                {social === "instagram" && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                )}
                {social === "twitter" && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {social === "linkedin" && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatedSection className="mx-auto max-w-7xl">
        <div className="mt-12 border-t border-[#374151] pt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            &copy; 2026 Typin AI. All rights reserved.
          </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}
