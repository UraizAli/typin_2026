import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { staggerContainer, staggerItem, fadeUp } from "../lib/animations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Contact Form" }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to connect. Please try again later.");
    } finally {
      setLoading(false);
    }
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
                <svg className="h-8 w-8 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#111827] mb-4">
                Thank you for reaching out!
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                We've received your message and will get back to you within 24 hours.
              </p>
              <a
                href="/"
                className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 text-base font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-colors hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
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
            icon: <Send className="h-4 w-4" />,
            text: "Get In Touch",
          }}
          title={
            <>
              Let's Build Your <GradientText>Automation Strategy</GradientText>
            </>
          }
          subtitle="Have questions? Ready to automate? Our team is here to help you transform your business operations."
        />

        {/* Contact Section */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info Cards */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div variants={staggerItem}>
                  <GlassCard className="p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4ADE80]/10 mb-4">
                      <Mail className="h-6 w-6 text-[#16A34A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">Email</h3>
                    <p className="text-[#6B7280]">hello@typin.ai</p>
                  </GlassCard>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <GlassCard className="p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4ADE80]/10 mb-4">
                      <Phone className="h-6 w-6 text-[#16A34A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">Phone</h3>
                    <p className="text-[#6B7280]">+92 318 356 1921</p>
                  </GlassCard>
                </motion.div>

                <motion.div variants={staggerItem}>
                  <GlassCard className="p-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4ADE80]/10 mb-4">
                      <MapPin className="h-6 w-6 text-[#16A34A]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#111827] mb-2">Location</h3>
                    <p className="text-[#6B7280]">Pakistan</p>
                  </GlassCard>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2"
              >
                <GlassCard className="p-8">
                  <h3 className="text-2xl font-bold text-[#111827] mb-8">Send us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] placeholder-[#9CA3AF] focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/30"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] placeholder-[#9CA3AF] focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/30"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] placeholder-[#9CA3AF] focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/30"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#374151] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] placeholder-[#9CA3AF] focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/30"
                          placeholder="+92 XXX XXXXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#111827] placeholder-[#9CA3AF] focus:border-[#4ADE80] focus:outline-none focus:ring-2 focus:ring-[#4ADE80]/30"
                        placeholder="Tell us about your automation needs..."
                      />
                    </div>

                    {error && (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)] disabled:opacity-70"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
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
