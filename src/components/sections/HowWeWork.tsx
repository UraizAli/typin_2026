import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { staggerContainer, staggerItem } from "../../lib/animations";

const steps = [
  {
    title: "We find what's eating your time",
    description:
      "Before building anything, we map your daily operations — from first customer enquiry to final delivery. We identify every bottleneck, every manual handoff, and every repetitive task that's costing you money and slowing your team down.",
    quote:
      "Most SMEs we audit have 3-5 processes that silently eat 15-20 hours a week. Teams just accept it as normal.",
    person: "Typin Strategy Team",
    role: "Automation Audit",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    title: "We build systems your team will actually use",
    description:
      "We don't rip and replace your tools. We automate around what your team already knows — your CRM, your inbox, your WhatsApp. That means zero learning curve and results from week one.",
    quote:
      "Good automation isn't flashy tech demos — it's the stuff your team trusts enough to rely on every single day.",
    person: "Delivery Leads",
    role: "Implementation",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80",
  },
  {
    title: "We keep improving it after launch",
    description:
      "Once live, we monitor performance, tune the AI, and scale what works. Your automations get smarter over time — saving more hours, catching more edge cases, and driving more revenue.",
    quote:
      "If the automations stop saving your team time, we change the flow. That's the deal.",
    person: "Performance Team",
    role: "Optimization",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
];

export function HowWeWork() {
  return (
    <section className="relative bg-[#F3F4F6] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              How we turn{" "}
              <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                manual chaos into automated efficiency
              </span>
            </>
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative mt-16 space-y-20 lg:mt-20"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={`${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <motion.div
                  className="overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.05]"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="h-64 w-full object-cover lg:h-80"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#16A34A]/20 bg-[#16A34A]/10 text-lg font-bold text-[#16A34A]">
                    {i + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F172A]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-base leading-relaxed text-[#64748B]">
                  {step.description}
                </p>
                <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
                  <p className="text-sm italic leading-relaxed text-[#64748B]">
                    "{step.quote}"
                  </p>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-[#0F172A]">{step.person}</p>
                    <p className="text-xs text-[#94A3B8]">{step.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
