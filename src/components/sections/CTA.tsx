import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GradientText } from "../ui/GradientText";

export function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-[#1F2937] px-6 py-24 lg:py-32"
      id="contact"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute left-[20%] top-[20%] h-72 w-72 rounded-full bg-[#4ADE80]/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[10%] right-[15%] h-56 w-56 rounded-full bg-[#34D399]/[0.05] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
          Ready to cut the busywork and{" "}
          <GradientText>scale smarter?</GradientText>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#9CA3AF]">
          Book a free strategy call. We'll audit your workflow and show you exactly
          where automation can save your team hours every week.
        </p>
        <div className="mt-10">
          <a
            href="mailto:hello@typin.ai"
            className="group inline-flex items-center gap-2 rounded-full bg-[#4ADE80] px-10 py-5 text-lg font-bold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
          >
            Book a Free Strategy Call
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <p className="mt-4 text-sm text-[#6B7280]">
          No commitment required. Free workflow audit included.
        </p>
      </motion.div>
    </section>
  );
}
