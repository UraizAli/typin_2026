import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, Sparkles } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { staggerContainer, staggerItem } from "../lib/animations";

const benefits = [
  {
    icon: Mail,
    title: "Weekly Insights",
    description: "Industry trends, automation tips, and case studies every week",
  },
  {
    icon: Sparkles,
    title: "Exclusive Offers",
    description: "Special discounts and early access to new features",
  },
  {
    icon: CheckCircle,
    title: "Best Practices",
    description: "Learn how other companies are saving 10-20 hours per week",
  },
  {
    icon: Mail,
    title: "Expert Tips",
    description: "Automation strategies from our team of specialists",
  },
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate email submission
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setEmail("");
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="flex min-h-[calc(100vh-160px)] items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="max-w-2xl p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4ADE80]/10 mb-6">
                <CheckCircle className="h-8 w-8 text-[#16A34A]" />
              </div>
              <h2 className="text-3xl font-bold text-[#111827] mb-4">
                Subscription Confirmed!
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                Check your email for a welcome message. Expect our first newsletter next week.
              </p>
              <a
                href="/"
                className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-colors hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
              >
                Back to Home
              </a>
            </GlassCard>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <Mail className="h-4 w-4" />,
            text: "Newsletter",
          }}
          title={
            <>
              Stay <GradientText>Ahead of the Curve</GradientText>
            </>
          }
          subtitle="Get the latest automation insights, tips, and exclusive offers delivered to your inbox every week. Join 500+ automation leaders."
        />

        {/* Newsletter Content */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Benefits */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {benefits.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div key={benefit.title} variants={staggerItem}>
                      <GlassCard className="p-6">
                        <div className="flex gap-4">
                          <div className="inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-[#4ADE80]/10">
                            <Icon className="h-6 w-6 text-[#16A34A]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#111827] mb-1">
                              {benefit.title}
                            </h3>
                            <p className="text-sm text-[#6B7280]">
                              {benefit.description}
                            </p>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Signup Form */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-8 h-fit sticky top-24">
                  <h3 className="text-2xl font-bold text-[#111827] mb-2">
                    Join 500+ Automation Leaders
                  </h3>
                  <p className="text-[#6B7280] mb-8">
                    Be the first to learn how to scale your business without hiring.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="your@email.com"
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] placeholder-[#9CA3AF] focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/30"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)] disabled:opacity-70"
                    >
                      {loading ? "Subscribing..." : "Subscribe Now"}
                    </button>

                    <p className="text-xs text-[#6B7280] text-center">
                      No spam. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </form>

                  <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                    <p className="text-sm text-[#6B7280] mb-4">
                      What past subscribers say:
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm text-[#6B7280] italic">
                        "The insights are game-changing. Already implemented 3 automations from one newsletter issue."
                      </p>
                      <p className="text-xs text-[#6B7280]">— Sarah, Operations Manager</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
