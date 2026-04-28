import { motion } from "framer-motion";
import { HelpCircle, Sparkles } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { staggerContainer, staggerItem } from "../lib/animations";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Full-screen 404 Hero with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <HelpCircle className="h-4 w-4" />,
            text: "Page Not Found",
          }}
          title={
            <>
              <GradientText>404</GradientText>
            </>
          }
          subtitle="Oops! This Page Doesn't Exist. The page you're looking for might have been moved, deleted, or never existed. Let's get you back on track."
        >
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
        </AnimatedHeroBackground>
      </main>
      <Footer />
    </div>
  );
}
