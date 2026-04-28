import { motion } from "framer-motion";
import { Award, TrendingUp, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { CaseStudyModal } from "../components/ui/CaseStudyModal";
import { staggerContainer, staggerItem } from "../lib/animations";

const caseStudies = [
  {
    title: "E-commerce Brand Saves 40 Hours/Week",
    industry: "E-commerce",
    tag: "E-commerce",
    challenge: "Manual order processing and customer follow-ups consuming entire team's time",
    solution: "Automated order workflows, CRM integration, and AI chatbot for customer support",
    description: "Complete automation of order processing, customer support, and follow-up workflows that transformed operations and freed the team to focus on growth.",
    results: [
      "40 hours saved per week",
      "95% faster order processing",
      "Customer satisfaction up 35%",
      "$50K annual savings",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    color: "#16A34A",
    result: "40 hrs/week saved",
    metrics: [
      { label: "Time Saved Weekly", value: "40 hrs" },
      { label: "Processing Speed", value: "95% faster" },
      { label: "Annual Savings", value: "$50K" },
    ],
    testimonial: {
      quote: "This automation transformed our business. We're processing 3x more orders with the same team size.",
      author: "Michael Torres",
      role: "Operations Manager, StyleHub",
    },
    fullStory: "StyleHub was drowning in manual order processing. Every order required multiple manual steps, customer inquiries flooded their inbox, and follow-ups were inconsistent.\n\nWe built a complete automation system that handles orders from placement to fulfillment, integrated an AI chatbot for instant customer support, and automated all follow-up sequences.\n\nThe result? 40 hours saved weekly, 95% faster processing, and happier customers. The team now focuses on growth instead of admin work.",
  },
  {
    title: "Real Estate Agency 3x Lead Conversion",
    industry: "Real Estate",
    tag: "Real Estate",
    challenge: "Leads falling through cracks, slow follow-up times, manual scheduling",
    solution: "AI voice calling for lead qualification, automated scheduling, CRM pipeline automation",
    description: "AI-powered lead qualification and automated follow-up system that tripled conversion rates and eliminated missed opportunities.",
    results: [
      "300% increase in conversions",
      "Lead response time under 2 minutes",
      "25 hours saved weekly",
      "Zero missed follow-ups",
    ],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    color: "#059669",
    result: "3x conversions",
    metrics: [
      { label: "Conversion Rate", value: "+300%" },
      { label: "Response Time", value: "<2 min" },
      { label: "Time Saved", value: "25 hrs/wk" },
    ],
    testimonial: {
      quote: "We're closing more deals than ever. The AI qualification is incredibly accurate, and we never miss a hot lead.",
      author: "Jennifer Park",
      role: "Sales Director, Elite Properties",
    },
    fullStory: "Elite Properties was losing deals due to slow response times and inconsistent follow-up. High-value leads weren't getting the attention they deserved.\n\nWe implemented an AI-powered system that qualifies leads instantly, schedules appointments automatically, and ensures perfect follow-up timing. Every interaction is logged to their CRM.\n\nConversions tripled, response times dropped to under 2 minutes, and the sales team now focuses only on qualified, ready-to-buy prospects.",
  },
  {
    title: "SaaS Startup Scales Without Hiring",
    industry: "SaaS",
    tag: "SaaS",
    challenge: "Growing customer base but can't afford to hire more support staff",
    solution: "24/7 AI chatbot, automated onboarding sequences, self-service knowledge base",
    description: "Intelligent automation that enabled 10x growth in customer base without adding support staff, while improving satisfaction scores.",
    results: [
      "Handled 10x more inquiries",
      "Support costs reduced 60%",
      "Customer onboarding automated",
      "Team focused on product",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "#0D9488",
    result: "10x scale achieved",
    metrics: [
      { label: "Inquiry Capacity", value: "10x" },
      { label: "Cost Reduction", value: "60%" },
      { label: "Onboarding Time", value: "-75%" },
    ],
    testimonial: {
      quote: "We scaled from 100 to 1,000 customers without hiring a single support person. The automation is flawless.",
      author: "Alex Kumar",
      role: "CEO, CloudSync",
    },
    fullStory: "CloudSync was growing fast but couldn't afford to scale their support team proportionally. Customer inquiries were overwhelming their small team.\n\nWe built a 24/7 AI chatbot that handles common inquiries, automated their entire onboarding process, and created a self-service knowledge base.\n\nThey now handle 10x more customers with the same team size, support costs dropped 60%, and customer satisfaction actually improved.",
  },
  {
    title: "Marketing Agency Automates Reporting",
    industry: "Marketing",
    tag: "Marketing",
    challenge: "Spending 15+ hours weekly creating client reports manually",
    solution: "Automated dashboards, real-time reporting, client portal with live metrics",
    description: "Real-time reporting automation that eliminated manual report creation and gave clients instant access to their metrics.",
    results: [
      "15 hours saved per week",
      "Real-time client access",
      "100% accurate reporting",
      "Clients love transparency",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "#CA8A04",
    result: "15 hrs/week saved",
    metrics: [
      { label: "Time Saved", value: "15 hrs/wk" },
      { label: "Report Accuracy", value: "100%" },
      { label: "Client Satisfaction", value: "+50%" },
    ],
    testimonial: {
      quote: "Our team finally has time for strategy instead of spreadsheets. Clients love the real-time dashboards.",
      author: "Rachel Green",
      role: "Agency Director, Growth Labs",
    },
    fullStory: "Growth Labs was spending 15+ hours every week manually compiling client reports from multiple data sources. It was tedious, error-prone, and took time away from strategic work.\n\nWe built automated dashboards that pull data in real-time from all their tools, generate beautiful reports automatically, and give clients 24/7 access to their metrics.\n\nThe agency now saves 15 hours weekly, reports are 100% accurate, and clients love the transparency and instant access.",
  },
 
  {
    title: "Healthcare Clinic Eliminates No-Shows",
    industry: "Healthcare",
    tag: "Healthcare",
    challenge: "30% no-show rate costing thousands in lost revenue monthly",
    solution: "Automated appointment reminders, AI calling for confirmations, easy rescheduling",
    description: "Intelligent reminder and confirmation system that reduced no-shows by 83% and recovered $30K monthly in lost revenue.",
    results: [
      "No-shows reduced to 5%",
      "$30K monthly revenue recovered",
      "Patient satisfaction up 40%",
      "Staff time freed up",
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    color: "#DC2626",
    result: "83% fewer no-shows",
    metrics: [
      { label: "No-Show Reduction", value: "83%" },
      { label: "Monthly Revenue Recovered", value: "$30K" },
      { label: "Patient Satisfaction", value: "+40%" },
    ],
    testimonial: {
      quote: "We recovered $30K monthly in lost revenue. The automated reminders and confirmations work perfectly.",
      author: "Dr. Lisa Martinez",
      role: "Practice Manager, HealthFirst Clinic",
    },
    fullStory: "HealthFirst Clinic was losing $30K monthly due to a 30% no-show rate. Manual reminder calls weren't working, and staff time was being wasted.\n\nWe implemented an automated system with SMS and email reminders, AI voice calling for confirmations, and easy one-click rescheduling.\n\nNo-shows dropped from 30% to 5%, recovering $30K in monthly revenue. Patient satisfaction increased 40%, and staff time was freed for patient care.",
  },
    {
    title: "Manufacturing Firm Streamlines Operations",
    industry: "Manufacturing",
    tag: "Manufacturing",
    challenge: "Disconnected systems causing delays and errors in production scheduling",
    solution: "Integrated ERP, automated inventory management, real-time production tracking",
    description: "Complete operational integration that eliminated errors, improved efficiency, and provided real-time visibility across the entire production process.",
    results: [
      "50% reduction in errors",
      "Production efficiency up 35%",
      "Inventory costs down 25%",
      "Real-time visibility",
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    color: "#7C3AED",
    result: "35% efficiency gain",
    metrics: [
      { label: "Error Reduction", value: "50%" },
      { label: "Efficiency Gain", value: "35%" },
      { label: "Cost Savings", value: "25%" },
    ],
    testimonial: {
      quote: "We finally have real-time visibility into our entire operation. Errors are down, efficiency is up, and we're saving thousands monthly.",
      author: "Robert Chen",
      role: "Operations Director, PrecisionTech Manufacturing",
    },
    fullStory: "PrecisionTech was struggling with disconnected systems that caused production delays, inventory errors, and lack of visibility.\n\nWe integrated their ERP system, automated inventory management, and implemented real-time production tracking across all facilities.\n\nErrors dropped 50%, production efficiency increased 35%, inventory costs decreased 25%, and management now has real-time visibility into every aspect of operations.",
  },
 
];

export default function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);

  // Group case studies into rows of 3 (like services)
  const rows = [];
  for (let i = 0; i < caseStudies.length; i += 3) {
    rows.push(caseStudies.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <Award className="h-4 w-4" />,
            text: "Success Stories",
          }}
          title={
            <>
              Real Results from <GradientText>Real Businesses</GradientText>
            </>
          }
          subtitle="See how businesses like yours are saving time, cutting costs, and scaling faster with our automation solutions."
        >
          {/* Empty children */}
          <></>
        </AnimatedHeroBackground>

        {/* Case Studies Grid */}
        <section className="relative bg-[#EEF0F4] px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-5">
              {rows.map((row, rowIdx) => {
                // Check if this is the last row and it has only 1 item (the big card)
                const isLastRowWithOneItem = rowIdx === rows.length - 1 && row.length === 1;
                // Alternate big card position: even rows on right, odd rows on left
                const shouldShiftToLeft = rowIdx % 2 === 1;
                
                return (
                  <motion.div
                    key={rowIdx}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className={`${
                      isLastRowWithOneItem 
                        ? "flex justify-center" 
                        : "grid gap-5 md:grid-cols-2 lg:grid-cols-4"
                    }`}
                  >
                    {/* Reorder row items if needed to alternate big card position */}
                    {(shouldShiftToLeft && row.length === 3 ? [row[2], row[0], row[1]] : row).map((study, idx) => {
                      // Find original index to determine if it's a big card
                      const originalIndex = rowIdx * 3 + (shouldShiftToLeft && row.length === 3 ? (idx === 0 ? 2 : idx - 1) : idx);
                      const isBig = (originalIndex + 1) % 3 === 0;
                      
                      return (
                        <motion.article 
                          key={study.title} 
                          variants={staggerItem}
                          className={`group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${
                            isBig && !isLastRowWithOneItem ? "md:col-span-2" : ""
                          } ${
                            // If it's the last row with only one big card, limit its width
                            isLastRowWithOneItem && isBig ? "w-full max-w-3xl" : ""
                          }`}
                        >
                        {isBig ? (
                          // Big Card Layout (2 columns)
                          <div className="grid h-full md:grid-cols-2">
                            {/* Image Section */}
                            <div className="relative h-56 overflow-hidden md:h-full md:min-h-[320px]">
                              <div className="absolute inset-0">
                                <img
                                  src={study.image}
                                  alt={study.title}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                  loading="lazy"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-l" />
                              
                              {/* Industry badge */}
                              <span 
                                className="absolute top-4 left-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md"
                                style={{
                                  backgroundColor: `${study.color}12`,
                                  color: study.color,
                                  borderColor: `${study.color}25`,
                                }}
                              >
                                {study.industry}
                              </span>
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col justify-center p-7 md:p-9">
                              <h3 className="text-xl font-bold text-[#0F172A] leading-tight mb-4">
                                {study.title}
                              </h3>
                              
                              <p className="text-[15px] leading-relaxed text-[#64748B] mb-5">
                                {study.description}
                              </p>

                              {/* Result Badge */}
                              <div className="mb-5">
                                <div
                                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 backdrop-blur-md shadow-md"
                                  style={{ backgroundColor: `${study.color}DD` }}
                                >
                                  <TrendingUp className="h-4 w-4 text-white" />
                                  <span className="text-sm font-bold text-white">{study.result}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedCase(study)}
                                className="inline-flex w-fit items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                                style={{ color: study.color }}
                              >
                                Learn more
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Small Card Layout (1 column)
                          <>
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                              <div className="absolute inset-0">
                                <img
                                  src={study.image}
                                  alt={study.title}
                                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                  loading="lazy"
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
                              
                              {/* Industry badge */}
                              <span 
                                className="absolute top-4 left-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md"
                                style={{
                                  backgroundColor: `${study.color}12`,
                                  color: study.color,
                                  borderColor: `${study.color}25`,
                                }}
                              >
                                {study.industry}
                              </span>
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                              <h3 className="text-lg font-bold text-[#0F172A] mb-3 line-clamp-2">
                                {study.title}
                              </h3>
                              
                              <p className="text-sm leading-relaxed text-[#64748B] mb-4 line-clamp-3">
                                {study.description}
                              </p>

                              {/* Result Badge */}
                              <div className="mb-4">
                                <div
                                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 shadow-sm"
                                  style={{ backgroundColor: `${study.color}DD` }}
                                >
                                  <TrendingUp className="h-3.5 w-3.5 text-white" />
                                  <span className="text-xs font-bold text-white">{study.result}</span>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setSelectedCase(study)}
                                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                                style={{ color: study.color }}
                              >
                                Learn more
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </button>
                            </div>
                          </>
                        )}
                      </motion.article>
                    );
                  })}
                </motion.div>
              );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex justify-center"
            >
              <div className="w-full max-w-4xl rounded-3xl border border-[#E5E7EB] bg-white p-10 shadow-lg text-center">
                <h3 className="text-3xl font-bold text-[#111827] mb-4">
                  Ready to Write Your Success Story?
                </h3>
                <p className="text-lg text-[#6B7280] mb-8 mx-auto max-w-2xl">
                  Join these businesses and start saving time, reducing costs, and scaling faster with automation.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-10 py-4 text-lg font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)] hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal */}
      <CaseStudyModal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        caseStudy={selectedCase}
      />
    </div>
  );
}
