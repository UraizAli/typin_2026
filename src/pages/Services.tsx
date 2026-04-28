import { motion } from "framer-motion";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Services } from "../components/sections/Services";
import { GradientText } from "../components/ui/GradientText";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#1F2937] px-6 py-24 lg:py-32 min-h-screen flex items-center">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#4ADE80]/[0.08] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[#34D399]/[0.06] blur-[120px]" />
          <div className="pointer-events-none absolute right-[20%] top-[40%] h-[250px] w-[250px] rounded-full bg-[#A3E635]/[0.04] blur-[100px]" />
          
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Badge */}
              <div className="mb-8 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.08] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#4ADE80] backdrop-blur-sm shadow-[0_8px_32px_rgba(74,222,128,0.15)]">
                  <Zap className="h-4 w-4" />
                  Our Services
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-7xl">
                We Automate the Work <br className="hidden md:block" />
                <GradientText>Your Team Shouldn't Be Doing</GradientText>
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl lg:text-2xl">
                From workflow automation to AI assistants, we build systems that eliminate busywork and let your team focus on what actually grows your business.
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 grid grid-cols-3 gap-6 md:gap-8"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#4ADE80] md:text-4xl">50+</div>
                  <div className="mt-2 text-sm text-white/60 md:text-base">Happy Clients</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#4ADE80] md:text-4xl">30+</div>
                  <div className="mt-2 text-sm text-white/60 md:text-base">Hours Saved/Week</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="text-3xl font-bold text-[#4ADE80] md:text-4xl">500+</div>
                  <div className="mt-2 text-sm text-white/60 md:text-base">Apps Integrated</div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-4 text-base font-bold text-white shadow-[0_10px_40px_rgba(22,163,74,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(22,163,74,0.4)]"
                >
                  Book a Free Consultation
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/service-selector"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/70 bg-white px-8 py-4 text-[15px] font-bold text-[#111827] shadow-[0_4px_24px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_8px_50px_rgba(255,255,255,0.35)]"
                >
                  <Sparkles className="h-5 w-5" />
                  Find Your Solution
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Services />
      </main>
      <Footer />
    </div>
  );
}
