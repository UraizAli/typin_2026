import { motion } from "framer-motion";
import { Award, TrendingUp, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";

const caseStudies = [
  {
    title: "E-commerce Brand Saves 40 Hours/Week",
    industry: "E-commerce",
    challenge: "Manual order processing and customer follow-ups consuming entire team's time",
    solution: "Automated order workflows, CRM integration, and AI chatbot for customer support",
    results: [
      "40 hours saved per week",
      "95% faster order processing",
      "Customer satisfaction up 35%",
      "$50K annual savings",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    color: "#16A34A",
  },
  {
    title: "Real Estate Agency 3x Lead Conversion",
    industry: "Real Estate",
    challenge: "Leads falling through cracks, slow follow-up times, manual scheduling",
    solution: "AI voice calling for lead qualification, automated scheduling, CRM pipeline automation",
    results: [
      "300% increase in conversions",
      "Lead response time under 2 minutes",
      "25 hours saved weekly",
      "Zero missed follow-ups",
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    color: "#059669",
  },
  {
    title: "SaaS Startup Scales Without Hiring",
    industry: "SaaS",
    challenge: "Growing customer base but can't afford to hire more support staff",
    solution: "24/7 AI chatbot, automated onboarding sequences, self-service knowledge base",
    results: [
      "Handled 10x more inquiries",
      "Support costs reduced 60%",
      "Customer onboarding automated",
      "Team focused on product",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "#0D9488",
  },
  {
    title: "Marketing Agency Automates Reporting",
    industry: "Marketing",
    challenge: "Spending 15+ hours weekly creating client reports manually",
    solution: "Automated dashboards, real-time reporting, client portal with live metrics",
    results: [
      "15 hours saved per week",
      "Real-time client access",
      "100% accurate reporting",
      "Clients love transparency",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "#CA8A04",
  },
  {
    title: "Healthcare Clinic Eliminates No-Shows",
    industry: "Healthcare",
    challenge: "30% no-show rate costing thousands in lost revenue monthly",
    solution: "Automated appointment reminders, AI calling for confirmations, easy rescheduling",
    results: [
      "No-shows reduced to 5%",
      "$30K monthly revenue recovered",
      "Patient satisfaction up 40%",
      "Staff time freed up",
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    color: "#DC2626",
  },
  {
    title: "Manufacturing Firm Streamlines Operations",
    industry: "Manufacturing",
    challenge: "Disconnected systems causing delays and errors in production scheduling",
    solution: "Integrated ERP, automated inventory management, real-time production tracking",
    results: [
      "50% reduction in errors",
      "Production efficiency up 35%",
      "Inventory costs down 25%",
      "Real-time visibility",
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    color: "#7C3AED",
  },
];

export default function CaseStudiesPage() {
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
                  <Award className="h-4 w-4" />
                  Success Stories
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Real Results from <GradientText>Real Businesses</GradientText>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                See how businesses like yours are saving time, cutting costs, and scaling faster with our automation solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2"
            >
              {caseStudies.map((study, idx) => (
                <motion.article key={study.title} variants={staggerItem}>
                  <GlassCard className="h-full overflow-hidden group cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <span 
                        className="absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                        style={{ backgroundColor: `${study.color}90` }}
                      >
                        {study.industry}
                      </span>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white">
                          {study.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-[#6B7280] mb-1">Challenge</p>
                        <p className="text-sm text-[#374151]">{study.challenge}</p>
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-[#6B7280] mb-1">Solution</p>
                        <p className="text-sm text-[#374151]">{study.solution}</p>
                      </div>
                      
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#16A34A]" />
                          Results
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          {study.results.map((result) => (
                            <div key={result} className="rounded-lg bg-[#F0FDF4] p-3 border border-[#4ADE80]/20">
                              <p className="text-xs font-semibold text-[#16A34A]">{result}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#16A34A] group-hover:gap-3 transition-all">
                        Read Full Case Study
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <GlassCard className="p-12 border-2 border-[#4ADE80]/30">
                <h3 className="text-2xl font-bold text-[#111827] mb-4">
                  Ready to Write Your Success Story?
                </h3>
                <p className="text-[#6B7280] mb-6 max-w-2xl mx-auto">
                  Join these businesses and start saving time, reducing costs, and scaling faster with automation.
                </p>
                <a
                  href="/contact"
                  className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                >
                  Get Started Today
                </a>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
