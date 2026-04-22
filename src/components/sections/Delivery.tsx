import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer } from "../../lib/animations";

const steps = [
  {
    number: "01",
    title: "Audit your workflow",
    description:
      "We study your live process, map out the tools involved, and pinpoint exactly where time, data, and opportunities are being lost.",
    color: "#16A34A",
  },
  {
    number: "02",
    title: "Set clear targets",
    description:
      "Together we define what success looks like — hours saved, response times cut, headcount avoided, or revenue increased.",
    color: "#0D9488",
  },
  {
    number: "03",
    title: "Design the system",
    description:
      "Every trigger, action, edge case, and human override is planned and documented before we build a single thing.",
    color: "#34D399",
  },
  {
    number: "04",
    title: "Ship in tight sprints",
    description:
      "We deploy in stages so your team tests each flow in real conditions — no risky big-bang launches.",
    color: "#10B981",
  },
  {
    number: "05",
    title: "Train your team",
    description:
      "Clear guides, walkthroughs, and escalation playbooks ensure your team owns the system from day one.",
    color: "#F59E0B",
  },
  {
    number: "06",
    title: "Improve continuously",
    description:
      "After go-live, we refine AI logic, integrations, and workflows based on real-world usage data.",
    color: "#A3E635",
  },
];

export function Delivery() {
  return (
    <section className="px-6 py-24 lg:py-32" id="delivery">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              From audit to live in{" "}
              <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                weeks, not months
              </span>
            </>
          }
          subtitle="Here's exactly how we take your business from manual chaos to automated efficiency."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        >
          {steps.map((step) => (
            <GlassCard key={step.number} className="group relative overflow-hidden p-7">
              <div
                className="absolute right-4 top-4 text-[60px] font-black leading-none opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.08]"
                style={{ color: step.color }}
              >
                {step.number}
              </div>
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-bold text-[#0F172A]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                {step.description}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
