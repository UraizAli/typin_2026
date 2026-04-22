import { motion } from "framer-motion";
import {
  Search,
  FileText,
  UserCheck,
  Shield,
  Lock,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { staggerContainer } from "../../lib/animations";

const cards = [
  {
    icon: Search,
    title: "Business goals first, always",
    description:
      "We don't automate everything — we find the workflows that directly impact your revenue and your team's time, then build there first.",
    color: "#16A34A",
  },
  {
    icon: FileText,
    title: "Clear, documented systems",
    description:
      "Every workflow, trigger, and escalation path is documented clearly. Your team stays in control — no black boxes, no mystery.",
    color: "#3B82F6",
  },
  {
    icon: UserCheck,
    title: "Your people stay in the loop",
    description:
      "AI handles the volume and speed. Your team handles the judgment calls. High-stakes decisions always stay reviewable by humans.",
    color: "#10B981",
  },
  {
    icon: Shield,
    title: "Compliance from day one",
    description:
      "Permissions, data privacy, and role-based access are designed into every system — not bolted on as an afterthought.",
    color: "#F59E0B",
  },
  {
    icon: Lock,
    title: "Rock-solid integrations",
    description:
      "We connect your CRM, WhatsApp, portals, and tools properly — no fragile workarounds that break when you need them most.",
    color: "#A3E635",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI, always",
    description:
      "Every system we build is tied to a clear number — hours saved, costs reduced, response times cut, or revenue increased.",
    color: "#34D399",
  },
];

export function Approach() {
  return (
    <section className="px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              Our approach to{" "}
              <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                building systems that last
              </span>
            </>
          }
          subtitle="We're not here to sell you shiny tech. We're here to save your team time, reduce headcount needs, and make your operations bulletproof."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:mt-20"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <GlassCard key={card.title} className="group p-7">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${card.color}10` }}
                >
                  <Icon className="h-6 w-6" style={{ color: card.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  {card.description}
                </p>
              </GlassCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
