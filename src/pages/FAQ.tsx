import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        q: "How long does it take to set up automation?",
        a: "Most projects are deployed within 2-4 weeks. We start with a discovery phase to understand your processes, then build and test your workflows before going live.",
      },
      {
        q: "Do I need technical knowledge to use Typin?",
        a: "No. Our team handles the technical setup and integration. We provide training so your team can manage and monitor the automation without coding skills.",
      },
      {
        q: "What if we already use automation tools?",
        a: "Perfect. We integrate with your existing tools (Zapier, Make, n8n, etc.) or build custom solutions. We work with what you have.",
      },
    ],
  },
  {
    title: "Pricing & Plans",
    questions: [
      {
        q: "Can I cancel anytime?",
        a: "Yes. All plans are month-to-month with no long-term contracts. You can cancel anytime with 30 days notice.",
      },
      {
        q: "Is there a setup fee?",
        a: "The Growth and Enterprise plans include setup and implementation. Starter plan has a one-time $999 setup fee.",
      },
      {
        q: "What's included in the free trial?",
        a: "Full access to the Growth plan features for 14 days. Build unlimited workflows, test integrations, and see the value before committing.",
      },
    ],
  },
  {
    title: "Integrations",
    questions: [
      {
        q: "Which apps can you integrate with?",
        a: "We support 500+ apps including CRM, email, calendars, accounting, project management, and more. If your tool has an API, we can integrate it.",
      },
      {
        q: "Can you build custom integrations?",
        a: "Yes. Our Enterprise plan includes custom integrations for internal systems or specialized software.",
      },
      {
        q: "What about data security with integrations?",
        a: "All integrations are encrypted and secure. We follow SOC 2 compliance standards and your data stays protected.",
      },
    ],
  },
  {
    title: "Support & Success",
    questions: [
      {
        q: "What kind of support do you offer?",
        a: "Starter: Email support (24h response). Growth: Priority support (4h response) + weekly calls. Enterprise: Dedicated account manager + on-site training.",
      },
      {
        q: "Do you provide training?",
        a: "Yes. All plans include training for your team. We offer onboarding calls, documentation, and video tutorials.",
      },
      {
        q: "Can you help optimize our workflows?",
        a: "Absolutely. Regular strategy calls with Growth/Enterprise plans review your workflows, identify optimizations, and suggest new automation opportunities.",
      },
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                <GradientText>Frequently Asked</GradientText> Questions
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                Everything you need to know about Typin AI automation. Can't find what you're looking for? Contact our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIdx) => (
                <motion.div
                  key={category.title}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: categoryIdx * 0.1 }}
                >
                  <h3 className="text-2xl font-bold text-[#111827] mb-6 pb-4 border-b-2 border-[#4ADE80]">
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.questions.map((item, qIdx) => {
                      const itemIndex = categoryIdx * 10 + qIdx;
                      const isOpen = openIndex === itemIndex;

                      return (
                        <motion.div
                          key={qIdx}
                          variants={staggerItem}
                        >
                          <GlassCard className="overflow-hidden">
                            <button
                              onClick={() =>
                                setOpenIndex(isOpen ? null : itemIndex)
                              }
                              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-[#F9FAFB]"
                            >
                              <span className="font-semibold text-[#111827] pr-4">
                                {item.q}
                              </span>
                              <ChevronDown
                                className={`h-5 w-5 shrink-0 text-[#16A34A] transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="border-t border-[#E5E7EB] px-6 py-4 text-[#6B7280] bg-[#F9FAFB]">
                                    {item.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </GlassCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <GlassCard className="p-8 text-center border-2 border-[#4ADE80]/30">
                <h3 className="text-2xl font-bold text-[#111827] mb-3">
                  Still have questions?
                </h3>
                <p className="text-[#6B7280] mb-6">
                  Reach out to our team. We're here to help with any questions.
                </p>
                <a
                  href="/contact"
                  className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                >
                  Contact Us
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
