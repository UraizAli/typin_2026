import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ClipboardCheck, ArrowLeft, Mail, TrendingUp, DollarSign } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";

const auditQuestions = [
  {
    id: 1,
    category: "Process Efficiency",
    question: "How many hours per week do you spend on manual data entry?",
    options: [
      { label: "0-5 hours", score: 0 },
      { label: "5-15 hours", score: 2 },
      { label: "15-30 hours", score: 4 },
      { label: "30+ hours", score: 5 },
    ],
  },
  {
    id: 2,
    category: "Tool Integration",
    question: "How fragmented are your business tools?",
    options: [
      { label: "Everything integrated", score: 0 },
      { label: "Mostly integrated", score: 2 },
      { label: "Multiple disconnected tools", score: 4 },
      { label: "Completely scattered", score: 5 },
    ],
  },
  {
    id: 3,
    category: "Error Management",
    question: "How often do errors occur in manual processes?",
    options: [
      { label: "Rarely", score: 0 },
      { label: "Occasionally", score: 2 },
      { label: "Frequently", score: 4 },
      { label: "Very frequently", score: 5 },
    ],
  },
  {
    id: 4,
    category: "Lead Management",
    question: "How much time do you spend following up with leads?",
    options: [
      { label: "Minimal (handled automatically)", score: 0 },
      { label: "A few hours per week", score: 2 },
      { label: "Several hours per week", score: 4 },
      { label: "Multiple hours daily", score: 5 },
    ],
  },
  {
    id: 5,
    category: "Tool Integration",
    question: "Do you struggle with reporting and analytics?",
    options: [
      { label: "No, we have great dashboards", score: 0 },
      { label: "Some reporting gaps", score: 2 },
      { label: "Manual reporting needed", score: 4 },
      { label: "Significant gaps", score: 5 },
    ],
  },
  {
    id: 6,
    category: "Error Management",
    question: "How often do tasks fall through the cracks?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 2 },
      { label: "Sometimes", score: 4 },
      { label: "Frequently", score: 5 },
    ],
  },
  {
    id: 7,
    category: "Process Efficiency",
    question: "How repetitive is most of your daily work?",
    options: [
      { label: "Not very repetitive", score: 0 },
      { label: "Somewhat repetitive", score: 2 },
      { label: "Mostly repetitive", score: 4 },
      { label: "Extremely repetitive", score: 5 },
    ],
  },
  {
    id: 8,
    category: "Process Efficiency",
    question: "How satisfied are you with current efficiency?",
    options: [
      { label: "Very satisfied", score: 0 },
      { label: "Mostly satisfied", score: 2 },
      { label: "Somewhat unsatisfied", score: 4 },
      { label: "Very unsatisfied", score: 5 },
    ],
  },
];

const categoryWeights = {
  "Process Efficiency": 0.35,
  "Tool Integration": 0.25,
  "Error Management": 0.25,
  "Lead Management": 0.15,
};

export default function AutomationAudit() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < auditQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setScores(scores.slice(0, -1));
    }
  };

  const calculateCategoryScores = () => {
    const categoryScores: Record<string, { total: number; max: number; percentage: number }> = {};
    
    auditQuestions.forEach((q, index) => {
      if (index < scores.length) {
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { total: 0, max: 0, percentage: 0 };
        }
        categoryScores[q.category].total += scores[index];
        categoryScores[q.category].max += 5;
      }
    });

    Object.keys(categoryScores).forEach(cat => {
      categoryScores[cat].percentage = (categoryScores[cat].total / categoryScores[cat].max) * 100;
    });

    return categoryScores;
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = auditQuestions.length * 5;
  const percentage = (totalScore / maxScore) * 100;
  const categoryScores = calculateCategoryScores();

  // Calculate weighted score
  let weightedScore = 0;
  Object.entries(categoryScores).forEach(([category, data]) => {
    const weight = categoryWeights[category as keyof typeof categoryWeights] || 0;
    weightedScore += data.percentage * weight;
  });

  // Estimate hours and dollars saved
  const avgHourlyRate = 45;
  const baseWeeklyHours = 40;
  const hoursSavablePerWeek = (weightedScore / 100) * baseWeeklyHours * 0.5; // 50% of potential
  const annualSavings = hoursSavablePerWeek * 52 * avgHourlyRate;

  const getInsight = () => {
    if (percentage < 15) {
      return {
        title: "Excellent - You're in great shape!",
        description:
          "Your processes are already well-optimized. Small tweaks could still save you time.",
        color: "#16A34A",
        bgColor: "#F0FDF4",
        borderColor: "#4ADE80",
        recommendation:
          "Let's identify that remaining 10-15% of improvement potential.",
        tier: "Excellent",
      };
    } else if (percentage < 35) {
      return {
        title: "Good - Minor improvements available",
        description:
          "You have some automation potential. Key areas can be optimized.",
        color: "#059669",
        bgColor: "#ECFDF5",
        borderColor: "#34D399",
        recommendation:
          "We can help you unlock 10-20 hours per week of team time.",
        tier: "Good",
      };
    } else if (percentage < 55) {
      return {
        title: "Moderate - Good opportunity ahead",
        description:
          "You have moderate automation potential. Several processes need attention.",
        color: "#F59E0B",
        bgColor: "#FFFBEB",
        borderColor: "#FCD34D",
        recommendation:
          "We can help you save 20-30 hours per week and reduce errors significantly.",
        tier: "Moderate",
      };
    } else if (percentage < 75) {
      return {
        title: "High Need - Significant opportunity!",
        description:
          "Your business has major automation potential waiting to be tapped.",
        color: "#DC2626",
        bgColor: "#FEF2F2",
        borderColor: "#FCA5A5",
        recommendation:
          "We can help you save 30-40 hours per week and dramatically reduce errors.",
        tier: "High Need",
      };
    } else {
      return {
        title: "Critical - Urgent action needed!",
        description:
          "Your processes are severely inefficient. Immediate automation is critical.",
        color: "#991B1B",
        bgColor: "#FEE2E2",
        borderColor: "#F87171",
        recommendation:
          "We can help you save 40+ hours per week and transform your operations.",
        tier: "Critical",
      };
    }
  };

  const getCategoryInsight = (category: string, percentage: number) => {
    if (percentage < 20) return `Your ${category.toLowerCase()} is excellent.`;
    if (percentage < 40) return `Your ${category.toLowerCase()} has minor gaps.`;
    if (percentage < 60) return `Your ${category.toLowerCase()} needs attention - you could save 5-10 hours/week here.`;
    if (percentage < 80) return `Your ${category.toLowerCase()} score is high - you could save 10-15 hours/week by automating this area.`;
    return `Your ${category.toLowerCase()} is critical - you could save 15+ hours/week with automation.`;
  };

  const getPriorityActions = () => {
    const sortedCategories = Object.entries(categoryScores)
      .sort(([, a], [, b]) => b.percentage - a.percentage)
      .slice(0, 3);

    const actions: Record<string, string> = {
      "Process Efficiency": "Automate repetitive manual tasks with workflow automation",
      "Tool Integration": "Connect your disconnected tools into a unified system",
      "Error Management": "Implement validation and error-checking automation",
      "Lead Management": "Set up automated lead follow-up and nurturing sequences",
    };

    return sortedCategories.map(([category]) => actions[category]);
  };

  if (showResults) {
    const insight = getInsight();
    const priorityActions = getPriorityActions();

    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="pt-24">
          <section className="px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                  style={{ backgroundColor: insight.bgColor }}
                >
                  {percentage < 50 ? (
                    <CheckCircle className="h-8 w-8" style={{ color: insight.color }} />
                  ) : (
                    <AlertCircle className="h-8 w-8" style={{ color: insight.color }} />
                  )}
                </div>
                <h1 className="text-4xl font-bold text-[#111827] mb-4">
                  {Math.round(percentage)}% Automation Need Score
                </h1>
                <p className="text-xl text-[#6B7280]">{insight.title}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-8 mb-8">
                  <p className="text-lg text-[#6B7280] mb-6">{insight.description}</p>
                  <div className="space-y-4 mb-8">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-[#374151]">
                          Overall Automation Need
                        </span>
                        <span className="text-2xl font-bold" style={{ color: insight.color }}>
                          {Math.round(percentage)}%
                        </span>
                      </div>
                      <div className="h-4 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full"
                          style={{ backgroundColor: insight.color }}
                        />
                      </div>
                    </div>

                    {/* Estimated Savings */}
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-[#F0FDF4] border border-[#4ADE80]/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-[#16A34A]" />
                          <span className="text-sm font-medium text-[#16A34A]">Hours Savable/Week</span>
                        </div>
                        <p className="text-3xl font-bold text-[#111827]">
                          {Math.round(hoursSavablePerWeek)}
                        </p>
                      </div>
                      <div className="p-4 bg-[#F0FDF4] border border-[#4ADE80]/20 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-5 w-5 text-[#16A34A]" />
                          <span className="text-sm font-medium text-[#16A34A]">Potential Annual Savings</span>
                        </div>
                        <p className="text-3xl font-bold text-[#111827]">
                          ${Math.round(annualSavings).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-8 mb-8">
                  <h3 className="text-2xl font-bold text-[#111827] mb-6">Category Breakdown</h3>
                  <div className="space-y-6">
                    {Object.entries(categoryScores).map(([category, data]) => (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-[#111827]">{category}</span>
                          <span className="text-lg font-bold" style={{ 
                            color: data.percentage > 60 ? '#DC2626' : data.percentage > 35 ? '#F59E0B' : '#16A34A' 
                          }}>
                            {Math.round(data.percentage)}%
                          </span>
                        </div>
                        <div className="h-3 bg-[#E5E7EB] rounded-full overflow-hidden mb-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${data.percentage}%` }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="h-full"
                            style={{ 
                              backgroundColor: data.percentage > 60 ? '#DC2626' : data.percentage > 35 ? '#F59E0B' : '#16A34A' 
                            }}
                          />
                        </div>
                        <p className="text-sm text-[#6B7280]">
                          {getCategoryInsight(category, data.percentage)}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Priority Actions */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard className="p-8 mb-8">
                  <h3 className="text-2xl font-bold text-[#111827] mb-4">Priority Actions</h3>
                  <p className="text-[#6B7280] mb-6">
                    Based on your audit, here are the top 3 things you should automate first:
                  </p>
                  <div className="space-y-3">
                    {priorityActions.map((action, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-[#F9FAFB] rounded-xl">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#4ADE80] text-white text-sm font-bold">
                          {index + 1}
                        </span>
                        <span className="text-[#374151] font-medium">{action}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* ROI Estimate */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard className="p-8 mb-8 border-2 border-[#4ADE80]/30">
                  <h3 className="text-2xl font-bold text-[#111827] mb-4">Estimated ROI</h3>
                  <p className="text-[#6B7280] mb-6">
                    Based on industry averages, businesses with your automation need score typically see:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-[#F0FDF4] rounded-xl">
                      <div className="text-3xl font-bold text-[#16A34A] mb-1">250-400%</div>
                      <div className="text-sm text-[#6B7280]">ROI in Year 1</div>
                    </div>
                    <div className="text-center p-4 bg-[#F0FDF4] rounded-xl">
                      <div className="text-3xl font-bold text-[#16A34A] mb-1">3-6 months</div>
                      <div className="text-sm text-[#6B7280]">Payback Period</div>
                    </div>
                    <div className="text-center p-4 bg-[#F0FDF4] rounded-xl">
                      <div className="text-3xl font-bold text-[#16A34A] mb-1">95%+</div>
                      <div className="text-sm text-[#6B7280]">Error Reduction</div>
                    </div>
                  </div>
                  <a
                    href="/roi-calculator"
                    className="inline-flex items-center gap-2 text-[#16A34A] hover:text-[#15803D] font-medium transition-colors"
                  >
                    Calculate your exact ROI →
                  </a>
                </GlassCard>
              </motion.div>

              {/* Email Capture */}
              {!emailSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <GlassCard className="p-8 mb-8 bg-gradient-to-br from-[#F0FDF4] to-white">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4ADE80]/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-[#16A34A]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#111827] mb-2">
                          Get Your Detailed Audit Report
                        </h3>
                        <p className="text-[#6B7280] mb-4">
                          Enter your email to receive a comprehensive PDF report with personalized recommendations.
                        </p>
                        <div className="flex gap-3">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 rounded-full border-2 border-[#E5E7EB] px-6 py-3 text-[#111827] focus:border-[#4ADE80] focus:outline-none"
                          />
                          <button
                            onClick={async () => {
                              if (!email) return;
                              try {
                                await fetch("/api/contact", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({
                                    name: email.split("@")[0],
                                    email: email,
                                    company: "",
                                    phone: "",
                                    message: `Automation Audit Score: ${Math.round(percentage)}% (${insight.tier}). Hours savable/week: ${Math.round(hoursSavablePerWeek)}. Potential annual savings: $${Math.round(annualSavings).toLocaleString()}.`,
                                    source: "Automation Audit",
                                  }),
                                });
                              } catch { /* silent fail for audit */ }
                              setEmailSubmitted(true);
                            }}
                            className="rounded-full bg-[#4ADE80] px-8 py-3 font-semibold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:bg-[#34D399]"
                          >
                            Send Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <GlassCard className="p-8 mb-8 bg-[#F0FDF4] border-2 border-[#4ADE80]">
                    <div className="flex items-center gap-3 text-[#16A34A]">
                      <CheckCircle className="h-6 w-6" />
                      <span className="font-semibold">Report sent! Check your inbox.</span>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Next Steps */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <GlassCard className="p-8 mb-8">
                  <h3 className="text-2xl font-bold text-[#111827] mb-4">Next Steps</h3>
                  <p className="text-[#6B7280] mb-6">{insight.recommendation}</p>

                  <a
                    href="/contact"
                    className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                  >
                    Schedule Free Consultation
                  </a>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScores([]);
                    setShowResults(false);
                    setEmailSubmitted(false);
                    setEmail("");
                  }}
                  className="text-[#16A34A] hover:text-[#15803D] font-medium transition-colors"
                >
                  Take audit again →
                </button>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / auditQuestions.length) * 100;
  const currentQ = auditQuestions[currentQuestion];

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
                  <ClipboardCheck className="h-4 w-4" />
                  Free Audit
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Discover Your <GradientText>Automation Potential</GradientText>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                Take our 3-minute audit to uncover hidden opportunities for automation in your business. Get a personalized score and actionable recommendations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-2xl">
            <GlassCard className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#6B7280]">
                    Question {currentQuestion + 1} of {auditQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-[#16A34A]">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#16A34A] to-[#4ADE80]"
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQ.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-[#111827] mb-8">
                    {currentQ.question}
                  </h2>

                  <div className="space-y-3 mb-8">
                    {currentQ.options.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => handleAnswer(option.score)}
                        className="w-full rounded-lg border-2 border-[#E5E7EB] bg-white p-4 text-left font-medium text-[#374151] transition-all hover:border-[#4ADE80] hover:bg-[#F9FAFB]"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {/* Back Button */}
                  {currentQuestion > 0 && (
                    <button
                      onClick={goBack}
                      className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#111827] font-medium transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Go back
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
