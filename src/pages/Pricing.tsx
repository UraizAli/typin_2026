import { motion } from "framer-motion";
import { Check, DollarSign, Star } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { staggerContainer, staggerItem } from "../lib/animations";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started with automation",
    price: "$2,999",
    period: "per month",
    features: [
      "Up to 3 automation workflows",
      "Email & calendar automation",
      "Basic CRM integration",
      "Email support",
      "Monthly strategy calls",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    description: "For growing teams scaling their operations",
    price: "$7,999",
    period: "per month",
    features: [
      "Unlimited automation workflows",
      "Advanced integrations (50+ apps)",
      "AI voice calling setup",
      "Priority support",
      "Weekly strategy calls",
      "Custom training",
      "API access",
    ],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "contact for pricing",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
      "On-site training",
      "SLA guarantee",
      "Priority feature requests",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
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
                  <DollarSign className="h-4 w-4" />
                  Pricing
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Simple, <GradientText>Transparent Pricing</GradientText>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                Choose the plan that fits your business size and needs. All plans include 14-day free trial with no credit card required.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-3"
            >
              {plans.map((plan, idx) => (
                <motion.div
                  key={plan.name}
                  variants={staggerItem}
                  className="relative"
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#16A34A] to-[#4ADE80] px-4 py-1 text-xs font-semibold text-white shadow-lg">
                        <Star className="h-3 w-3" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <GlassCard
                    className={`p-8 h-full ${
                      plan.highlight
                        ? "border-2 border-[#4ADE80] shadow-[0_20px_60px_rgba(74,222,128,0.15)]"
                        : ""
                    }`}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#111827]">
                        {plan.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#6B7280]">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-[#111827]">
                          {plan.price}
                        </span>
                        {plan.price !== "Custom" && (
                          <span className="text-[#6B7280]">/{plan.period.split(" ")[1]}</span>
                        )}
                      </div>
                      {plan.price === "Custom" && (
                        <p className="text-sm text-[#6B7280] mt-1">{plan.period}</p>
                      )}
                    </div>

                    <a
                      href="/contact"
                      className={`block w-full text-center rounded-full py-3 font-semibold transition-all duration-300 mb-8 ${
                        plan.highlight
                          ? "bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                          : "border-2 border-[#E5E7EB] text-[#111827] hover:border-[#4ADE80] hover:bg-[#F9FAFB]"
                      }`}
                    >
                      {plan.cta}
                    </a>

                    <div className="space-y-4 border-t border-[#E5E7EB] pt-8">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />
                          <span className="text-sm text-[#6B7280]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <GlassCard className="p-12 text-center border-2 border-[#4ADE80]/30">
                <p className="text-lg text-[#6B7280] mb-6">
                  All plans include 14-day free trial. No credit card required.
                </p>
                <p className="text-sm text-[#6B7280]">
                  Questions about pricing?{" "}
                  <a href="/contact" className="font-semibold text-[#16A34A] hover:text-[#15803D]">
                    Contact our sales team
                  </a>
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
