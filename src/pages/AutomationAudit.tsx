import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { fadeUp } from "../lib/animations";

const auditQuestions = [
  {
    id: 1,
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
    question: "How satisfied are you with current efficiency?",
    options: [
      { label: "Very satisfied", score: 0 },
      { label: "Mostly satisfied", score: 2 },
      { label: "Somewhat unsatisfied", score: 4 },
      { label: "Very unsatisfied", score: 5 },
    ],
  },
];

export default function AutomationAudit() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < auditQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const maxScore = auditQuestions.length * 5;
  const percentage = (totalScore / maxScore) * 100;

  const getInsight = () => {
    if (percentage < 20) {
      return {
        title: "You're in great shape!",
        description:
          "Your processes are already optimized. Small tweaks could still save you time.",
        color: "#16A34A",
        bgColor: "#F0FDF4",
        borderColor: "#4ADE80",
        recommendation:
          "Let's identify that remaining 10-15% of improvement potential.",
      };
    } else if (percentage < 50) {
      return {
        title: "Good opportunity ahead",
        description:
          "You have moderate automation potential. Key areas can be optimized.",
        color: "#059669",
        bgColor: "#ECFDF5",
        borderColor: "#34D399",
        recommendation:
          "We can help you unlock 15-30 hours per week of team time.",
      };
    } else {
      return {
        title: "Significant opportunity!",
        description:
          "Your business has major automation potential waiting to be tapped.",
        color: "#DC2626",
        bgColor: "#FEF2F2",
        borderColor: "#FCA5A5",
        recommendation:
          "We can help you save 30+ hours per week and dramatically reduce errors.",
      };
    }
  };

  if (showResults) {
    const insight = getInsight();

    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="pt-24">
          <section className="px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-2xl">
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
                  {Math.round(percentage)}% Automation Potential
                </h1>
                <p className="text-xl text-[#6B7280]">{insight.title}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl border-2 bg-white p-8 shadow-sm mb-8"
                style={{
                  borderColor: insight.borderColor,
                  backgroundColor: insight.bgColor,
                }}
              >
                <p className="text-lg text-[#6B7280] mb-6">{insight.description}</p>
                <div className="space-y-4 mb-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#374151]">
                        Automation Score
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
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm mb-8"
              >
                <h3 className="text-2xl font-bold text-[#111827] mb-4">Next Steps</h3>
                <p className="text-[#6B7280] mb-6">{insight.recommendation}</p>

                <a
                  href="/contact"
                  className="inline-flex rounded-full bg-[#4ADE80] px-8 py-3 font-semibold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                >
                  Schedule Consultation
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setScores([]);
                    setShowResults(false);
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
      <main className="pt-24">
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              title="Automation Audit"
              subtitle="Discover your automation potential in 3 minutes"
              className="text-center"
            />

            <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
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
                    className="h-full bg-[#4ADE80]"
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

                  <div className="space-y-3">
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
