import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles, Rocket, Heart, Code2, Lightbulb, Shield, TrendingUp, Cpu, Smartphone, Cloud, Database, Palette, Search } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { SectionHeading } from "../components/ui/SectionHeading";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { staggerContainer, staggerItem } from "../lib/animations";

const ABOUT_IMAGE = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80";
const TEAM_IMAGE_1 = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80";
const TEAM_IMAGE_2 = "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80";
const TEAM_IMAGE_3 = "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We leverage AI and cutting-edge tech to give clients a competitive edge in their market.",
    color: "#16A34A",
  },
  {
    icon: Heart,
    title: "Partnership, Not Vendor",
    description: "We embed as your technical co-founder, invested in your success for the long haul.",
    color: "#34D399",
  },
  {
    icon: Rocket,
    title: "Ship Fast, Scale Smart",
    description: "Rapid MVP delivery with architecture built for growth from day one.",
    color: "#4ADE80",
  },
  {
    icon: Code2,
    title: "Excellence in Craft",
    description: "Every line of code, every pixel, every interaction is intentional and polished.",
    color: "#22C55E",
  },
];

const expertise = [
  {
    icon: Code2,
    title: "React & Next.js",
    description: "Modern web apps with blazing performance",
  },
  {
    icon: Database,
    title: "Node.js & Python",
    description: "Scalable backend systems and APIs",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "Intelligent features that drive value",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native iOS and Android experiences",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "AWS, Azure, and GCP deployment",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful interfaces users love",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "Deep dive into your vision, users, and market",
  },
  {
    step: "02",
    title: "Design",
    description: "Wireframes, prototypes, and user flows",
  },
  {
    step: "03",
    title: "Develop",
    description: "Agile sprints with weekly demos",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Launch to production with monitoring",
  },
  {
    step: "05",
    title: "Support",
    description: "Ongoing maintenance and iteration",
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Elite Engineers",
    description: "Senior developers with 10+ years building production systems at scale",
    image: TEAM_IMAGE_1,
  },
  {
    icon: Palette,
    title: "Creative Designers",
    description: "Award-winning UI/UX experts who craft experiences users love",
    image: TEAM_IMAGE_2,
  },
  {
    icon: TrendingUp,
    title: "Strategic Advisors",
    description: "Former founders who understand the startup journey inside and out",
    image: TEAM_IMAGE_3,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <Users className="h-4 w-4" />,
            text: "About Us",
          }}
          title={
            <>
              Your <GradientText>Technical Co-Founder</GradientText> for the AI Era
            </>
          }
          subtitle="TYPIN is an AI-powered development agency that builds cutting-edge web and mobile applications. We help startups go from MVP to market leader with world-class engineering, stunning design, and strategic guidance."
        />

        {/* Story Section */}
        <section className="relative px-6 py-24 lg:py-32">
          {/* Background decoration */}
          <div className="pointer-events-none absolute left-0 top-[30%] h-[250px] w-[250px] rounded-full bg-[#4ADE80]/[0.03] blur-[100px]" />
          
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] border-4 border-white"
              >
                <img
                  src={ABOUT_IMAGE}
                  alt="Typin AI Team"
                  className="h-full w-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4ADE80]/10 to-[#34D399]/10">
                  <Sparkles className="h-6 w-6 text-[#16A34A]" />
                </div>
                <h2 className="text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl">
                  Our Origin Story
                </h2>
                <div className="space-y-4 text-[#6B7280] leading-relaxed">
                  <p>
                    TYPIN was founded by a team of passionate engineers who spent years watching talented founders struggle to find reliable technical partners. Too many great ideas died because of bad code, missed deadlines, and vendors who disappeared after launch.
                  </p>
                  <p>
                    We knew there was a better way. Startups don't need just developers—they need a technical co-founder who understands the business, cares about the outcome, and has the expertise to execute flawlessly.
                  </p>
                  <p>
                    So we built TYPIN to bridge the gap between ambitious visions and world-class execution. We're not a vendor. We're your technical partner, embedded in your journey from MVP to market leader.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-base font-bold text-[#16A34A] transition-all duration-300 hover:gap-3"
                >
                  Start your journey with us
                  <ArrowRight className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 py-24 lg:py-32 bg-gradient-to-b from-[#FAFBFC] to-white">
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
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="group rounded-3xl border border-[#E5E7EB] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#4ADE80]/30 hover:shadow-[0_20px_60px_rgba(22,163,74,0.12)]"
                  >
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${value.color}15` }}
                    >
                      <Icon className="h-7 w-7" style={{ color: value.color }} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#111827]">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-[#6B7280] leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Why Choose TYPIN"
              subtitle="World-class talent dedicated to your success"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-8 md:grid-cols-3"
            >
              {whyChooseUs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="group text-center"
                  >
                    <div className="relative mx-auto mb-6 h-52 w-52 overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-4 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-[#111827]/20 to-transparent" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4ADE80]/90 backdrop-blur-sm">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[#6B7280] leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="px-6 py-24 lg:py-32 bg-gradient-to-b from-white to-[#FAFBFC]">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Our Expertise"
              subtitle="Cutting-edge technologies that power modern applications"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {expertise.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="group rounded-3xl border border-[#E5E7EB] bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#4ADE80]/30 hover:shadow-[0_20px_60px_rgba(22,163,74,0.12)]"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4ADE80]/10 to-[#34D399]/10 transition-all duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7 text-[#16A34A]" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[#6B7280] leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Our Process"
              subtitle="A proven methodology that delivers results"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 relative"
            >
              {/* Timeline line */}
              <div className="absolute left-0 right-0 top-12 h-1 bg-gradient-to-r from-[#4ADE80]/20 via-[#4ADE80]/40 to-[#4ADE80]/20 hidden lg:block" />
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                {process.map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#4ADE80] to-[#16A34A] shadow-[0_10px_40px_rgba(22,163,74,0.3)] transition-all duration-300 hover:scale-110">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-[#111827]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[#6B7280] leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-24 lg:py-32 bg-[#111827]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-12 md:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "98%", label: "Client Satisfaction" },
                { value: "$7M+", label: "Value Created" },
                { value: "5+", label: "Years of Innovation" },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={staggerItem} className="text-center">
                  <p className="text-4xl font-bold text-[#4ADE80] md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[#9CA3AF]">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden px-6 py-24 lg:py-32">
          {/* Background decoration */}
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
                <Rocket className="h-7 w-7 text-[#16A34A]" />
              </div>
              <h2 className="text-3xl font-extrabold leading-tight text-[#111827] md:text-4xl lg:text-5xl">
                Ready to Build Something <GradientText>Amazing?</GradientText>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6B7280]">
                Let's turn your vision into reality. Schedule a free consultation and discover how TYPIN can be your technical co-founder.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#4ADE80] to-[#16A34A] px-8 py-4 text-base font-bold text-white shadow-[0_10px_40px_rgba(22,163,74,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_50px_rgba(22,163,74,0.4)]"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E5E7EB] bg-white px-8 py-4 text-base font-bold text-[#111827] transition-all duration-300 hover:border-[#4ADE80]/30 hover:shadow-[0_10px_40px_rgba(22,163,74,0.1)]"
                >
                  <Search className="h-5 w-5" />
                  View Case Studies
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
