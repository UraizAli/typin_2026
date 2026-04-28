import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
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
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <HelpCircle className="h-4 w-4" />,
            text: "FAQ",
          }}
          title={
            <>
              <GradientText>Frequently Asked</GradientText> Questions
            </>
          }
          subtitle="Everything you need to know about Typin AI automation. Can't find what you're looking for? Contact our team."
        />

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
