import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  BarChart3,
  MessageSquare,
  Phone,
  PieChart,
  Link2,
  Bot,
  Code2,
  Mail,
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { staggerContainer, staggerItem } from "../../lib/animations";

const services = [
  {
    icon: Zap,
    tag: "Workflow Automation",
    title: "Eliminate Repetitive Tasks",
    description:
      "Stop your team from doing the same thing over and over. We automate data entry, follow-ups, approvals, and handoffs — so your people focus on the work that actually grows your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "#16A34A",
    size: "big",
  },
  {
    icon: BarChart3,
    tag: "CRM & Pipeline",
    title: "Your CRM Runs Itself",
    description:
      "We connect your CRM, inbox, and pipeline so deals move forward and nothing gets lost.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    color: "#0D9488",
    size: "small",
  },
  {
    icon: MessageSquare,
    tag: "AI Chatbots",
    title: "Handle 10x More Enquiries",
    description:
      "AI chatbots for sales, support, and bookings that work 24/7 without hiring more people.",
    image: "https://images.unsplash.com/photo-1531746790095-e5995da25a78?w=500&q=80",
    color: "#059669",
    size: "small",
  },
  {
    icon: Phone,
    tag: "Voice AI",
    title: "AI Calling That Works",
    description:
      "Automated voice agents that qualify enquiries, capture intent, and book meetings into your calendar — without a receptionist on the clock.",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80",
    color: "#CA8A04",
    size: "big",
  },
  {
    icon: PieChart,
    tag: "Dashboards & Reporting",
    title: "See Everything at a Glance",
    description:
      "Live dashboards that show pipeline health, team performance, and campaign ROI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
    color: "#0891B2",
    size: "small",
  },
  {
    icon: Link2,
    tag: "System Integrations",
    title: "All Your Tools, One Flow",
    description:
      "Connect your forms, calendars, email, CRM, and tools into one smooth automated process.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
    color: "#15803D",
    size: "small",
  },
  {
    icon: Bot,
    tag: "AI Assistants",
    title: "Your 24/7 Digital Employee",
    description:
      "Deploy AI assistants that handle qualification, appointment booking, FAQs, and client nurture — around the clock, without breaks or sick days.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    color: "#D97706",
    size: "big",
  },
  {
    icon: Code2,
    tag: "Custom Solutions",
    title: "Built Around Your Workflow",
    description:
      "Tailored portals, dashboards, and apps designed specifically for how your team works.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80",
    color: "#DC2626",
    size: "small",
  },
  {
    icon: Mail,
    tag: "Email & Outreach",
    title: "Automated Outreach That Converts",
    description:
      "Smart email sequences and drip campaigns that nurture leads on autopilot.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=500&q=80",
    color: "#7C3AED",
    size: "small",
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = service.icon;
  const isBig = service.size === "big";

  return (
    <motion.div
      variants={staggerItem}
      className={`group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${
        isBig ? "md:col-span-2" : ""
      }`}
    >
      {isBig ? (
        <div className="grid h-full md:grid-cols-2">
          <div className="relative h-56 overflow-hidden md:h-full md:min-h-[320px]">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-l" />
            <span
              className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md"
              style={{
                backgroundColor: `${service.color}12`,
                color: service.color,
                borderColor: `${service.color}25`,
              }}
            >
              {service.tag}
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-9">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}10` }}
              >
                <Icon className="h-5 w-5" style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">{service.title}</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-[#64748B]">
              {service.description}
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color: service.color }}
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-40 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
            <span
              className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md"
              style={{
                backgroundColor: `${service.color}12`,
                color: service.color,
                borderColor: `${service.color}25`,
              }}
            >
              {service.tag}
            </span>
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}10` }}
              >
                <Icon className="h-5 w-5" style={{ color: service.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">{service.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              {service.description}
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color: service.color }}
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </>
      )}
    </motion.div>
  );
}

export function Services() {
  const rows = [];
  for (let i = 0; i < services.length; i += 3) {
    rows.push(services.slice(i, i + 3));
  }

  return (
    <section className="relative bg-[#EEF0F4] px-6 py-24 lg:py-32" id="services">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              We automate the work{" "}
              <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                your team shouldn't be doing
              </span>
            </>
          }
          subtitle="Every hour your team spends on repetitive tasks is an hour they're not spending on growth. We fix that."
        />

        <div className="mt-16 space-y-5 lg:mt-20">
          {rows.map((row, rowIdx) => (
            <motion.div
              key={rowIdx}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
            >
              {row.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
