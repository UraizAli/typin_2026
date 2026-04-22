import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp } from "../../lib/animations";

const caseStudies = [
  {
    tag: "Real Estate",
    title: "A broker network replaced 3 admin roles with one automation system",
    description:
      "Listing enquiries, agent assignments, call scheduling, and follow-ups all run automatically now. Response time dropped from 4 hours to 30 seconds — and not a single lead gets missed.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    result: "3 roles automated",
    color: "#16A34A",
  },
  {
    tag: "SME Operations",
    title: "A finance team saved 20 hours per week by automating their back-office",
    description:
      "Invoice checks, internal approvals, reporting, and customer updates moved from spreadsheets and inboxes into one reliable automation layer — freeing the team to focus on revenue.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    result: "20 hrs/week saved",
    color: "#34D399",
  },
  {
    tag: "Growth Systems",
    title: "A property marketplace doubled their conversion rate with AI follow-up",
    description:
      "We built a qualification engine that scores enquiries, triggers the next best action, and syncs every conversation into the CRM — all without a human touching it.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    result: "2x conversions",
    color: "#A3E635",
  },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="overflow-hidden rounded-3xl lg:rounded-none">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-full min-h-[280px] w-full scale-110 object-cover lg:min-h-[400px]"
        loading="lazy"
      />
    </div>
  );
}

export function CaseStudies() {
  return (
    <section className="px-6 py-24 lg:py-32" id="case-studies">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              Real results for{" "}
              <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                real businesses
              </span>
            </>
          }
          subtitle="These aren't demos — they're live systems that replaced manual work and saved real hours for teams like yours."
        />

        <div className="mt-16 space-y-8 lg:mt-20">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group grid overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_20px_60px_rgba(22,163,74,0.1)] lg:grid-cols-2"
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <ParallaxImage src={study.image} alt={study.title} />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <span
                  className="mb-4 inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{
                    backgroundColor: `${study.color}10`,
                    color: study.color,
                    border: `1px solid ${study.color}20`,
                  }}
                >
                  {study.tag}
                </span>
                <h3 className="text-2xl font-bold leading-tight text-[#0F172A] md:text-3xl">
                  {study.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#64748B]">
                  {study.description}
                </p>
                <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-[#10B981]/20 bg-[#10B981]/[0.06] px-4 py-2 text-sm font-bold text-[#10B981]">
                  {study.result}
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A] transition-all hover:gap-3"
                >
                  Read full story <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
