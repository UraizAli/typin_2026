import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { AnimatedSection } from "../ui/AnimatedSection";
import { AppLink } from "../ui/AppLink";

const ABOUT_VIDEO =
  "https://www.pexels.com/download/video/3202364/";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section className="relative px-6 py-24 lg:py-32" id="about">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#34D399]/[0.04] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="space-y-10">
          <SectionHeading
            align="left"
            title={
              <>
                Your team is too small to waste time on{" "}
                <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                  work a machine can do
                </span>
              </>
            }
            subtitle="Most SMEs lose 20-30 hours every week on manual tasks — data entry, follow-ups, reporting, approvals. We replace that with AI systems that run on autopilot, so your team focuses on growth instead of admin."
          />

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: 70, suffix: "%", label: "Reduction in manual work" },
                { value: 20, suffix: "+", label: "Hours saved per week" },
                { value: 3, suffix: "x", label: "Faster operations" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-extrabold text-[#16A34A] md:text-4xl">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-[#64748B]">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <AppLink
              href="#contact"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#16A34A] transition-all duration-300 hover:gap-3"
            >
              See how we can help your business
              <ArrowRight className="h-4 w-4" />
            </AppLink>
          </AnimatedSection>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.06),transparent_60%)]" />
          <div className="overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.05]">
            <video
              src={ABOUT_VIDEO}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
