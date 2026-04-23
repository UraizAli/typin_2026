import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Clock, Target, Calculator } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { fadeUp } from "../lib/animations";

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    teamSize: 5,
    hoursPerWeek: 20,
    hourlyRate: 50,
    automationCost: 10000,
  });

  const calculateROI = () => {
    const annualHoursSaved = inputs.hoursPerWeek * 52;
    const hourlyRate = inputs.hourlyRate;
    const annualSavings = annualHoursSaved * hourlyRate;
    const netSavings = annualSavings - inputs.automationCost;
    const roi = (netSavings / inputs.automationCost) * 100;

    return {
      annualSavings: Math.round(annualSavings),
      netSavings: Math.round(netSavings),
      roi: Math.round(roi),
      paybackMonths: Math.round(inputs.automationCost / (annualSavings / 12)),
    };
  };

  const results = calculateROI();

  const handleInputChange = (field: string, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

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
                  <Calculator className="h-4 w-4" />
                  ROI Calculator
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Calculate Your <GradientText>Automation ROI</GradientText>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                See exactly how much time and money you'll save with AI automation. Most clients see 300%+ ROI in the first year.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Calculator Inputs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <GlassCard className="p-8">
                  <h3 className="mb-6 text-xl font-bold text-[#111827]">
                    Your Current Setup
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Team Size: {inputs.teamSize} people
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={inputs.teamSize}
                        onChange={(e) =>
                          handleInputChange("teamSize", Number(e.target.value))
                        }
                        className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#4ADE80]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Hours on Manual Tasks/Week: {inputs.hoursPerWeek}h
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={inputs.hoursPerWeek}
                        onChange={(e) =>
                          handleInputChange("hoursPerWeek", Number(e.target.value))
                        }
                        className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#4ADE80]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Hourly Rate: ${inputs.hourlyRate}
                      </label>
                      <input
                        type="range"
                        min="15"
                        max="200"
                        step="5"
                        value={inputs.hourlyRate}
                        onChange={(e) =>
                          handleInputChange("hourlyRate", Number(e.target.value))
                        }
                        className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#4ADE80]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-2">
                        Automation Setup Cost: ${inputs.automationCost}
                      </label>
                      <input
                        type="range"
                        min="5000"
                        max="50000"
                        step="1000"
                        value={inputs.automationCost}
                        onChange={(e) =>
                          handleInputChange("automationCost", Number(e.target.value))
                        }
                        className="w-full h-2 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#4ADE80]"
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Results */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <GlassCard className="p-8">
                  <h3 className="mb-6 text-xl font-bold text-[#111827]">
                    Your ROI Results
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-6 border border-[#4ADE80]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-5 w-5 text-[#16A34A]" />
                        <span className="text-sm font-medium text-[#16A34A]">
                          Annual Savings
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        ${results.annualSavings.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-6 border border-[#4ADE80]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-[#16A34A]" />
                        <span className="text-sm font-medium text-[#16A34A]">
                          Net Savings (Year 1)
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        ${results.netSavings.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-6 border border-[#34D399]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-[#059669]" />
                        <span className="text-sm font-medium text-[#059669]">
                          ROI
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        {results.roi}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-6 border border-[#34D399]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-[#059669]" />
                        <span className="text-sm font-medium text-[#059669]">
                          Payback Period
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        {results.paybackMonths} months
                      </p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-8 border-2 border-[#4ADE80]/30">
                  <h4 className="text-lg font-bold text-[#111827] mb-3">
                    Ready to achieve these results?
                  </h4>
                  <p className="text-[#6B7280] mb-6">
                    Most clients see these exact savings within 30 days of implementation.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                  >
                    Book a Consultation
                  </a>
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
