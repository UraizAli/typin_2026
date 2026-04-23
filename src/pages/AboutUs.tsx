import { motion } from "framer-motion";
import { Users, Sparkles, Target, Rocket, Heart, Lightbulb } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem, fadeUp } from "../lib/animations";

const companyValues = [
  {
    icon: Target,
    title: "Precision",
    description: "We get the details right. Your automation is built on solid foundations.",
    color: "#16A34A",
  },
  {
    icon: Rocket,
    title: "Speed",
    description: "Time matters. We deploy solutions fast without cutting corners.",
    color: "#34D399",
  },
  {
    icon: Heart,
    title: "Support",
    description: "You're never alone. Dedicated team backing your success every step.",
    color: "#4ADE80",
  },
  {
    icon: Lightbulb,
    title: "Scalability",
    description: "Start small, grow big. Our systems scale with your ambitions.",
    color: "#22C55E",
  },
];

const milestones = [
  { year: "2021", title: "Founded", description: "Started with a vision to democratize automation" },
  { year: "2022", title: "First 10 Clients", description: "Helped SMEs save 1000+ hours collectively" },
  { year: "2023", title: "50+ Projects", description: "Expanded team and service offerings" },
  { year: "2024", title: "Industry Leader", description: "Recognized as top automation partner for SMEs" },
];

const team = [
  {
    name: "Ahmed Hassan",
    role: "Founder & CEO",
    bio: "10+ years in business automation and AI integration.",
  },
  {
    name: "Fatima Khan",
    role: "Head of Implementation",
    bio: "Expert in workflow optimization and team training.",
  },
  {
    name: "Ali Raza",
    role: "Lead Solutions Architect",
    bio: "Specializes in complex integrations and custom automation.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#1F2937] px-6 py-24 lg:py-32 min-h-screen flex items-center">
          {/* Decorative elements */}
          <div className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#4ADE80]/[0.08] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[#34D399]/[0.06] blur-[120px]" />
          
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Badge */}
              <div className="mb-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.08] px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#4ADE80] backdrop-blur-sm">
                  <Users className="h-4 w-4" />
                  Our Story
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Building the Future of <GradientText>Business Automation</GradientText>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                We're on a mission to help every SME eliminate busywork and focus on what truly matters—growing their business and serving their customers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="relative px-6 py-24 lg:py-32">
          <div className="pointer-events-none absolute left-0 top-[30%] h-[250px] w-[250px] rounded-full bg-[#4ADE80]/[0.03] blur-[100px]" />
          
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="How It All Started"
              subtitle="From frustration to innovation"
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 max-w-3xl mx-auto"
            >
              <GlassCard className="p-12">
                <div className="space-y-6 text-lg leading-relaxed text-[#6B7280]">
                  <p>
                    Typin AI was born from a simple observation: small and medium-sized businesses waste countless hours on manual, repetitive tasks while their teams could be doing high-value work.
                  </p>
                  <p>
                    We watched entrepreneurs struggle with scattered tools, broken workflows, and lost time. We knew there had to be a better way—an easy way to connect all their business apps and automate the busywork.
                  </p>
                  <p>
                    That's why we built Typin. We don't just provide software; we build automation strategies tailored to your business. Our team of experts partners with you to identify opportunities, implement solutions, and train your team.
                  </p>
                  <p>
                    Today, dozens of SMEs trust Typin to handle their automation. They're saving thousands of hours per year, reducing errors, and finally having time to focus on growing their business.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* Company Values */}
        <section className="px-6 py-24 bg-[#F3F4F6] lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Our Core Values"
              subtitle="What drives every decision we make"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              {companyValues.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div key={value.title} variants={staggerItem}>
                    <GlassCard className="p-8 h-full">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 mb-5"
                        style={{ backgroundColor: `${value.color}15` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: value.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-[#111827] mb-3">
                        {value.title}
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed">{value.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Milestones */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Our Journey"
              subtitle="Key milestones that shaped Typin"
            />

            <div className="mt-16 relative">
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-[#4ADE80]/20 via-[#4ADE80]/40 to-[#4ADE80]/20 hidden lg:block" />
              
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              >
                {milestones.map((milestone, idx) => (
                  <motion.div key={milestone.year} variants={staggerItem} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#4ADE80] to-[#16A34A] shadow-[0_10px_40px_rgba(22,163,74,0.3)] transition-all duration-300 hover:scale-110 mb-6">
                      <span className="text-2xl font-bold text-white">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">{milestone.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-6 py-24 bg-[#F3F4F6] lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Meet the Team"
              subtitle="The people behind your automation success"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-8 md:grid-cols-3"
            >
              {team.map((member, idx) => (
                <motion.div key={member.name} variants={staggerItem}>
                  <GlassCard className="p-8 text-center h-full">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#4ADE80] to-[#16A34A] mb-6">
                      <span className="text-3xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#4ADE80] mb-4">
                      {member.role}
                    </p>
                    <p className="text-sm text-[#6B7280]">{member.bio}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden px-6 py-24 lg:py-32">
          <div className="pointer-events-none absolute left-[20%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#4ADE80]/[0.05] blur-[100px]" />
          <div className="pointer-events-none absolute bottom-[20%] right-[20%] h-[250px] w-[250px] rounded-full bg-[#34D399]/[0.04] blur-[100px]" />
          
          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4ADE80]/10 to-[#34D399]/10 mb-6">
                <Sparkles className="h-7 w-7 text-[#16A34A]" />
              </div>
              <h2 className="text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl lg:text-5xl">
                Ready to Join Our <GradientText>Success Stories?</GradientText>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
                Let's build your automation strategy together. Book a free consultation and see how we can transform your business.
              </p>
              <div className="mt-10">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-4 text-base font-bold text-white shadow-[0_10px_40px_rgba(22,163,74,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(22,163,74,0.4)]"
                >
                  Get Started Today
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
