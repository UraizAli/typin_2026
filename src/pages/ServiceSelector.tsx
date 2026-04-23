import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";

const questions = [
  {
    id: 1,
    question: "What's your biggest time-waster right now?",
    options: [
      { value: "data-entry", label: "Manual data entry and spreadsheets" },
      { value: "follow-ups", label: "Following up with leads and customers" },
      { value: "scheduling", label: "Scheduling meetings and appointments" },
      { value: "reporting", label: "Creating reports and analytics" },
    ],
  },
  {
    id: 2,
    question: "How many team members handle these tasks?",
    options: [
      { value: "1-5", label: "Just me or 1-5 people" },
      { value: "6-20", label: "6-20 people" },
      { value: "20+", label: "20+ people" },
    ],
  },
  {
    id: 3,
    question: "Which tools do you use?",
    options: [
      { value: "crm", label: "CRM (HubSpot, Salesforce)" },
      { value: "email", label: "Email (Gmail, Outlook)" },
      { value: "spreadsheets", label: "Spreadsheets (Excel, Google Sheets)" },
      { value: "multiple", label: "Multiple disconnected tools" },
    ],
  },
  {
    id: 4,
    question: "What's your main business goal?",
    options: [
      { value: "growth", label: "Grow revenue and customers" },
      { value: "efficiency", label: "Improve team efficiency" },
      { value: "costs", label: "Reduce operational costs" },
      { value: "scaling", label: "Scale without hiring more" },
    ],
  },
];

const recommendations = {
  "data-entry": {
    service: "Workflow Automation",
    description:
      "Eliminate repetitive data entry with intelligent automation across your systems.",
    features: ["Auto data capture", "System sync", "Error reduction", "Real-time updates"],
  },
  "follow-ups": {
    service: "CRM & Sales Automation",
    description:
      "Never miss a follow-up. Automated sequences keep your pipeline moving 24/7.",
    features: ["Smart follow-ups", "Lead scoring", "Nurture sequences", "Pipeline tracking"],
  },
  "scheduling": {
    service: "AI Calling & Scheduling",
    description:
      "AI assistants that handle scheduling and qualification automatically.",
    features: ["Voice AI agents", "Smart scheduling", "Qualification", "Calendar sync"],
  },
  "reporting": {
    service: "Dashboards & Reporting",
    description:
      "Live dashboards and automated reports so you see everything at a glance.",
    features: ["Real-time dashboards", "Auto reports", "Custom metrics", "Data viz"],
  },
};

export default function ServiceSelector() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (qId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getRecommendation = () => {
    const painPoint = answers[1] as string;
    return recommendations[painPoint as keyof typeof recommendations];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const recommendation = getRecommendation();

    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="pt-24">
          <section className="px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4ADE80]/10 mb-6">
                  <CheckCircle className="h-8 w-8 text-[#16A34A]" />
                </div>
                <h1 className="text-3xl font-bold text-[#111827] mb-4">
                  Your Perfect Automation Solution
                </h1>
                <p className="text-lg text-[#6B7280]">
                  Based on your answers, here's what we recommend
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm mb-8"
              >
                <h2 className="text-2xl font-bold text-[#111827] mb-4">
                  {recommendation?.service}
                </h2>
                <p className="text-[#6B7280] mb-6">{recommendation?.description}</p>

                <div className="grid gap-3 md:grid-cols-2 mb-8">
                  {recommendation?.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#4ADE80] shrink-0" />
                      <span className="text-[#6B7280]">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4ADE80] px-8 py-3 font-semibold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="text-[#16A34A] hover:text-[#15803D] font-medium transition-colors"
                >
                  Take the quiz again →
                </button>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const answered = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main className="pt-24">
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              title="Find Your Perfect Automation"
              subtitle="Answer 4 quick questions and get personalized recommendations"
            />

            <div className="mt-16 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#6B7280]">
                    Question {currentQuestion + 1} of {questions.length}
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

                  <div className="space-y-3 mb-8">
                    {currentQ.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(currentQ.id, option.value)}
                        className={`w-full rounded-lg border-2 p-4 text-left font-medium transition-all ${
                          answered === option.value
                            ? "border-[#4ADE80] bg-[#4ADE80]/5 text-[#16A34A]"
                            : "border-[#E5E7EB] text-[#374151] hover:border-[#4ADE80]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex-1 rounded-full border-2 border-[#E5E7EB] py-3 font-semibold text-[#111827] transition-all hover:border-[#4ADE80] disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 inline mr-2" />
                  Back
                </button>
                <button
                  onClick={nextQuestion}
                  disabled={!answered}
                  className="flex-1 rounded-full bg-[#4ADE80] py-3 font-semibold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all hover:bg-[#34D399] disabled:opacity-50"
                >
                  {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="h-4 w-4 inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
