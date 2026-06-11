import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { fadeUp } from "../../lib/animations";
import { CaseStudyModal } from "../ui/CaseStudyModal";

const caseStudies = [
  {
    tag: "Real Estate",
    title: "A broker network replaced 3 admin roles with one automation system",
    description:
      "Listing enquiries, agent assignments, call scheduling, and follow-ups all run automatically now. Response time dropped from 4 hours to 30 seconds — and not a single lead gets missed.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    result: "3 roles automated",
    color: "#16A34A",
    challenge:
      "The broker network was drowning in manual admin work. Every listing enquiry required manual assignment to agents, scheduling calls, and tracking follow-ups across spreadsheets. With 3 full-time admin staff struggling to keep up, leads were being missed and response times were unacceptable.",
    solution:
      "We built a complete automation system that handles the entire workflow: enquiries are automatically captured, qualified, and assigned to the right agent based on availability and expertise. Call scheduling happens automatically with calendar integration, and follow-ups are triggered based on lead behavior. Everything syncs to their CRM in real-time.",
    results: [
      "3 admin roles eliminated",
      "30-second response time",
      "Zero missed leads",
      "4-hour to 30-sec turnaround",
    ],
    metrics: [
      { label: "Response Time Improvement", value: "99.8%" },
      { label: "Annual Cost Savings", value: "$180K" },
      { label: "Lead Conversion Rate", value: "+45%" },
    ],
    testimonial: {
      quote:
        "We went from chaos to complete control. Our agents now focus on closing deals instead of chasing paperwork. Best investment we've made.",
      author: "Sarah Mitchell",
      role: "Operations Director, Premier Realty Network",
    },
    fullStory:
      "Premier Realty Network was growing fast, but their operations couldn't keep up. With 50+ agents and hundreds of enquiries weekly, their 3-person admin team was overwhelmed.\n\nWe started by mapping their entire workflow, identifying bottlenecks and manual touchpoints. Then we built a custom automation layer that integrated with their existing tools.\n\nThe system now handles everything: web enquiries are captured and qualified instantly, matched to the best-fit agent, and scheduled automatically. Follow-ups happen based on triggers, and nothing falls through the cracks.\n\nWithin 60 days, they eliminated 3 admin positions, cut response times from 4 hours to 30 seconds, and increased conversions by 45%. The ROI was immediate and substantial.",
  },
  {
    tag: "SME Operations",
    title: "A finance team saved 20 hours per week by automating their back-office",
    description:
      "Invoice checks, internal approvals, reporting, and customer updates moved from spreadsheets and inboxes into one reliable automation layer — freeing the team to focus on revenue.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    result: "20 hrs/week saved",
    color: "#34D399",
    challenge:
      "The finance team was spending 20+ hours weekly on repetitive back-office tasks: checking invoices against purchase orders, chasing approvals via email, generating reports manually, and sending customer updates. This left little time for strategic work.",
    solution:
      "We automated their entire back-office workflow: invoices are now automatically matched to POs and flagged for exceptions, approvals flow through a structured system with automatic reminders, reports generate and distribute themselves, and customers receive automated updates at key milestones.",
    results: [
      "20 hours saved weekly",
      "100% invoice accuracy",
      "Zero approval delays",
      "Real-time reporting",
    ],
    metrics: [
      { label: "Time Saved Per Week", value: "20 hrs" },
      { label: "Error Reduction", value: "95%" },
      { label: "Approval Speed", value: "10x faster" },
    ],
    testimonial: {
      quote:
        "Our finance team finally has time to think strategically instead of drowning in admin. The automation just works, every single day.",
      author: "David Chen",
      role: "CFO, TechFlow Solutions",
    },
    fullStory:
      "TechFlow Solutions' finance team was stuck in a cycle of manual work. Every invoice required manual checking, approvals got lost in email chains, and reports took hours to compile.\n\nWe built an automation layer that sits on top of their existing systems. Invoices are automatically matched to purchase orders using AI, with exceptions flagged for human review. Approvals flow through a structured workflow with automatic escalation. Reports generate themselves and distribute to stakeholders.\n\nThe result? 20 hours saved every week, zero approval bottlenecks, and a finance team that can finally focus on strategic initiatives instead of data entry.",
  },
  {
    tag: "Growth Systems",
    title: "A property marketplace doubled their conversion rate with AI follow-up",
    description:
      "We built a qualification engine that scores enquiries, triggers the next best action, and syncs every conversation into the CRM — all without a human touching it.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
    result: "2x conversions",
    color: "#A3E635",
    challenge:
      "The property marketplace was generating thousands of enquiries but converting less than 5%. Leads weren't being qualified properly, follow-ups were inconsistent, and the sales team was overwhelmed with low-quality prospects.",
    solution:
      "We built an AI-powered qualification engine that scores every enquiry based on behavior, demographics, and intent signals. High-value leads get immediate human attention, while others enter automated nurture sequences. Every interaction is logged to the CRM automatically, and the system triggers the next best action based on lead behavior.",
    results: [
      "2x conversion rate",
      "5x more qualified leads",
      "80% faster follow-up",
      "100% CRM accuracy",
    ],
    metrics: [
      { label: "Conversion Rate Increase", value: "+112%" },
      { label: "Lead Quality Score", value: "+340%" },
      { label: "Sales Team Efficiency", value: "+85%" },
    ],
    testimonial: {
      quote:
        "We're closing twice as many deals with the same team size. The AI qualification is scary accurate, and our sales team loves only talking to serious buyers.",
      author: "Emma Rodriguez",
      role: "Head of Sales, PropertyHub",
    },
    fullStory:
      "PropertyHub was drowning in leads but starving for conversions. Their sales team spent 80% of their time on unqualified prospects, and high-value leads weren't getting the attention they deserved.\n\nWe built an intelligent qualification system that analyzes every enquiry in real-time. The AI scores leads based on dozens of signals: browsing behavior, property preferences, budget indicators, and engagement patterns.\n\nHigh-scoring leads get instant human contact. Medium-scoring leads enter targeted nurture sequences. Low-scoring leads get educational content until they show buying signals.\n\nThe result? Conversions doubled, sales team efficiency increased 85%, and lead quality improved by 340%. The system paid for itself in the first month.",
  },
];

export function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);

  return (
    <>
      <section className="relative bg-[#EEF0F4] px-6 py-24 lg:py-32" id="case-studies">
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
                className="group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
              >
                <div className="grid h-full lg:grid-cols-2">
                  {/* Image Section - Alternate sides */}
                  <div className={`relative h-64 overflow-hidden lg:h-full lg:min-h-[400px] ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10" />
                    
                    {/* Tag Badge */}
                    <span
                      className="absolute left-6 top-6 rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md shadow-lg"
                      style={{
                        backgroundColor: `${study.color}E6`,
                        color: 'white',
                        borderColor: `${study.color}`,
                      }}
                    >
                      {study.tag}
                    </span>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <h3 className="text-2xl font-bold leading-tight text-[#0F172A] mb-5 md:text-3xl lg:text-4xl">
                      {study.title}
                    </h3>
                    
                    <p className="text-base leading-relaxed text-[#64748B] mb-6 md:text-lg">
                      {study.description}
                    </p>

                    {/* Result Badge */}
                    <div className="mb-6">
                      <div
                        className="inline-flex items-center gap-2 rounded-xl px-5 py-3 shadow-md"
                        style={{ backgroundColor: `${study.color}` }}
                      >
                        <TrendingUp className="h-5 w-5 text-white" />
                        <span className="text-sm font-bold text-white">{study.result}</span>
                      </div>
                    </div>

                    {/* Quick Results Preview */}
                    {study.results && (
                      <div className="mb-6 grid grid-cols-2 gap-3">
                        {study.results.slice(0, 2).map((result, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg p-3 border"
                            style={{
                              backgroundColor: `${study.color}08`,
                              borderColor: `${study.color}20`,
                            }}
                          >
                            <p className="text-xs font-semibold leading-tight" style={{ color: study.color }}>
                              {result}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => setSelectedCase(study)}
                      className="inline-flex w-fit items-center gap-2 text-base font-semibold transition-all duration-300 group-hover:gap-3"
                      style={{ color: study.color }}
                    >
                      Learn more
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <CaseStudyModal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        caseStudy={selectedCase}
      />
    </>
  );
}
