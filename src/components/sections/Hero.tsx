import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_BG =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1800&q=80";

const rotatingWords = [
  "Manual Tasks",
  "Repetitive Admin",
  "Slow Follow-ups",
  "Data Entry",
  "Scattered Tools",
];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  const nextWord = useCallback(() => {
    setWordIndex((prev) => (prev + 1) % rotatingWords.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextWord, 2800);
    return () => clearInterval(interval);
  }, [nextWord]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden" id="top">
      {/* Full background image — busy office / manual work */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt="Busy office team overwhelmed with manual work — automation can help"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/75 via-[#1F2937]/65 to-[#111827]/85" />
        {/* Subtle green tint overlay */}
        <div className="absolute inset-0 bg-[#16A34A]/[0.04]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glowing green accent orbs */}
      <div className="pointer-events-none absolute left-[10%] top-[30%] h-[300px] w-[300px] rounded-full bg-[#4ADE80]/[0.06] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[20%] right-[15%] h-[250px] w-[250px] rounded-full bg-[#34D399]/[0.05] blur-[100px]" />

      {/* Content — centered */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center lg:py-40">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.08] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#4ADE80] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
            </span>
            Smart Automation for SMEs
          </span>
        </motion.div>

        {/* Headline with rotating text */}
        <motion.h1
          className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We replace your
          <br />
          <span className="relative inline-block h-[1.15em] w-full overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 60, opacity: 0, rotateX: -45 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -60, opacity: 0, rotateX: 45 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-x-0 bg-[linear-gradient(135deg,#4ADE80_0%,#34D399_40%,#A3E635_100%)] bg-clip-text text-transparent"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          with smart automation.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          We help small and mid-size businesses cut manpower costs, eliminate
          repetitive work, and run 3x faster — with AI systems that work 24/7 while
          your team focuses on growth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-[#4ADE80] px-8 py-4 text-[15px] font-bold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
          >
            Get a Free Audit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/15 bg-white/[0.06] px-8 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 flex flex-wrap items-center justify-center gap-10 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {[
            { value: "70%", label: "Less manual work" },
            { value: "50+", label: "SMEs automated" },
            { value: "3x", label: "Faster operations" },
            { value: "24/7", label: "Always running" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
            >
              <p className="text-2xl font-extrabold text-[#4ADE80] md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-medium text-white/40">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom edge — seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D3748]" />
    </section>
  );
}
