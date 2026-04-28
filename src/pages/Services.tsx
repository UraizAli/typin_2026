import { motion } from "framer-motion";
import { Zap, Sparkles, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Services } from "../components/sections/Services";
import { GradientText } from "../components/ui/GradientText";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <Zap className="h-4 w-4" />,
            text: "Our Services",
          }}
          title={
            <>
              We Automate the Work <br className="hidden md:block" />
              <GradientText>Your Team Shouldn't Be Doing</GradientText>
            </>
          }
          subtitle="From workflow automation to AI assistants, we build systems that eliminate busywork and let your team focus on what actually grows your business."
        >
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 md:gap-8"
          >
            {[
              { value: "50+", label: "Happy Clients" },
              { value: "30+", label: "Hours Saved/Week" },
              { value: "500+", label: "Apps Integrated" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-[#4ADE80] md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-white/60 md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
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
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              Find Your Solution
            </a>
          </motion.div>
        </AnimatedHeroBackground>

        <Services />
      </main>
      <Footer />
    </div>
  );
}
