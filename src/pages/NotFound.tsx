import { motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Full-screen 404 Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#1F2937] px-6 py-24 lg:py-32 min-h-screen flex items-center">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#4ADE80]/[0.08] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[#34D399]/[0.06] blur-[120px]" />
          
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.08] px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#4ADE80] backdrop-blur-sm">
                  <HelpCircle className="h-4 w-4" />
                  Page Not Found
                </span>
              </div>

              <h1 className="text-8xl font-extrabold leading-tight tracking-tight md:text-9xl">
                <GradientText>404</GradientText>
              </h1>
              <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
                Oops! This Page Doesn't Exist
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                The page you're looking for might have been moved, deleted, or never existed. Let's get you back on track.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-4 text-base font-bold text-white shadow-[0_10px_40px_rgba(22,163,74,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(22,163,74,0.4)]"
                >
                  Back to Home
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  Contact Support
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
