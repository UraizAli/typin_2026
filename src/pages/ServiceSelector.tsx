import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, TrendingUp, Zap } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";

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
  {
    id: 5,
    question: "What's your monthly budget for automation?",
    options: [
      { value: "under-500", label: "Under $500" },
      { value: "500-2000", label: "$500-$2,000" },
      { value: "2000-5000", label: "$2,000-$5,000" },
      { value: "5000+", label: "$5,000+" },
    ],
  },
  {
    id: 6,
    question: "How soon do you need results?",
    options: [
      { value: "asap", label: "ASAP (1-2 weeks)" },
      { value: "month", label: "Within a month" },
      { value: "quarter", label: "Within a quarter" },
      { value: "no-rush", label: "No rush" },
    ],
  },
];

const recommendations = {
  "data-entry": {
    service: "Workflow Automation",
    description:
      "Eliminate repetitive data entry with intelligent automation across your systems.",
    features: ["Auto data capture", "System sync", "Error reduction", "Real-time updates"],
    secondary: "dashboards",
  },
  "follow-ups": {
    service: "CRM & Sales Automation",
    description:
      "Never miss a follow-up. Automated sequences keep your pipeline moving 24/7.",
    features: ["Smart follow-ups", "Lead scoring", "Nurture sequences", "Pipeline tracking"],
    secondary: "ai-calling",
  },
  "scheduling": {
    service: "AI Calling & Scheduling",
    description:
      "AI assistants that handle scheduling and qualification automatically.",
    features: ["Voice AI agents", "Smart scheduling", "Qualification", "Calendar sync"],
    secondary: "crm-automation",
  },
  "reporting": {
    service: "Dashboards & Reporting",
    description:
      "Live dashboards and automated reports so you see everything at a glance.",
    features: ["Real-time dashboards", "Auto reports", "Custom metrics", "Data viz"],
    secondary: "workflow",
  },
};

const secondaryRecommendations: Record<string, { service: string; description: string }> = {
  "dashboards": {
    service: "Dashboards & Reporting",
    description: "Visualize your automated workflows with real-time dashboards.",
  },
  "ai-calling": {
    service: "AI Calling & Scheduling",
    description: "Add voice AI to qualify and schedule leads automatically.",
  },
  "crm-automation": {
    service: "CRM & Sales Automation",
    description: "Integrate with your CRM for seamless lead management.",
  },
  "workflow": {
    service: "Workflow Automation",
    description: "Connect your reporting tools to other business systems.",
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
    const teamSize = answers[2] as string;
    const tools = answers[3] as string;
    const goal = answers[4] as string;
    const budget = answers[5] as string;
    const timeline = answers[6] as string;

    const primary = recommendations[painPoint as keyof typeof recommendations];
    const secondary = secondaryRecommendations[primary.secondary];

    // Calculate fit score based on all answers
    let fitScore = 40; // Base score from pain point match
    
    // Team size scoring (20%)
    if (teamSize === "20+" && painPoint === "data-entry") fitScore += 20;
    else if (teamSize === "6-20") fitScore += 15;
    else fitScore += 10;
    
    // Tools scoring (20%)
    if (tools === "multiple" && painPoint === "data-entry") fitScore += 20;
    else if (tools === "crm" && painPoint === "follow-ups") fitScore += 20;
    else if (tools === "spreadsheets") fitScore += 15;
    else fitScore += 10;
    
    // Goal alignment (20%)
    if ((goal === "efficiency" && painPoint === "data-entry") ||
        (goal === "growth" && painPoint === "follow-ups") ||
        (goal === "scaling" && painPoint === "scheduling")) {
      fitScore += 20;
    } else {
      fitScore += 10;
    }

    // Get timeline estimate
    let timelineEstimate = "2-4 weeks";
    if (timeline === "asap") timelineEstimate = "1-2 weeks";
    else if (timeline === "month") timelineEstimate = "2-4 weeks";
    else if (timeline === "quarter") timelineEstimate = "4-8 weeks";
    else timelineEstimate = "6-12 weeks";

    // Get cost estimate based on team size and budget
    let costRange = "$500-$2,000/month";
    if (teamSize === "20+") costRange = "$2,000-$5,000/month";
    else if (teamSize === "6-20") costRange = "$1,000-$3,000/month";
    else if (budget === "under-500") costRange = "$300-$800/month";
    else if (budget === "5000+") costRange = "$3,000-$8,000/month";

    // Get tool integration info
    let integrationInfo = "";
    if (tools === "crm") integrationInfo = "We'll integrate directly with your CRM (HubSpot, Salesforce) for seamless data flow.";
    else if (tools === "email") integrationInfo = "We'll connect to your email platform (Gmail, Outlook) for automated workflows.";
    else if (tools === "spreadsheets") integrationInfo = "We'll migrate your spreadsheet data into automated systems with real-time sync.";
    else if (tools === "multiple") integrationInfo = "We'll unify your disconnected tools into one cohesive automated system.";

    // Get personalized description
    const teamSizeText = teamSize === "20+" ? "team of 20+ people" : teamSize === "6-20" ? "team of 6-20 people" : "small team";
    const toolsText = tools === "multiple" ? "multiple disconnected tools" : tools === "crm" ? "CRM system" : tools === "spreadsheets" ? "spreadsheets" : "email platform";
    
    return {
      primary,
      secondary,
      fitScore: Math.min(100, fitScore),
      timelineEstimate,
      costRange,
      integrationInfo,
      personalizedIntro: `Since your ${teamSizeText} currently uses ${toolsText}, this solution is specifically designed to address your ${painPoint.replace('-', ' ')} challenges.`,
      teamSize,
      tools,
      goal,
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const recommendation = getRecommendation();

    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="pt-24">
          <section className="px-6 py-24 lg:py-32">
            <div className="mx-auto max-w-3xl">
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
                  {recommendation.personalizedIntro}
                </p>
              </motion.div>

              {/* Primary Recommendation */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-3xl border-2 border-[#4ADE80] bg-white p-8 shadow-lg mb-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#4ADE80]/10 text-[#16A34A] text-xs font-semibold uppercase tracking-wider mb-3">
                      Best Match
                    </span>
                    <h2 className="text-2xl font-bold text-[#111827] mb-2">
                      {recommendation.primary?.service}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#16A34A]">
                      {recommendation.fitScore}%
                    </div>
                    <div className="text-xs text-[#6B7280]">Fit Score</div>
                  </div>
                </div>
                
                <p className="text-[#6B7280] mb-6">{recommendation.primary?.description}</p>

                <div className="grid gap-3 md:grid-cols-2 mb-6">
                  {recommendation.primary?.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[#4ADE80] shrink-0" />
                      <span className="text-[#6B7280]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Key Details */}
                <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-[#F9FAFB] rounded-xl">
                  <div>
                    <div className="text-xs text-[#6B7280] mb-1">Timeline</div>
                    <div className="font-semibold text-[#111827]">{recommendation.timelineEstimate}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280] mb-1">Investment</div>
                    <div className="font-semibold text-[#111827]">{recommendation.costRange}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#6B7280] mb-1">Team Size</div>
                    <div className="font-semibold text-[#111827]">{recommendation.teamSize}</div>
                  </div>
                </div>

                {/* Integration Info */}
                <div className="p-4 bg-[#F0FDF4] border border-[#4ADE80]/20 rounded-xl mb-6">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-[#111827] mb-1">Integration Plan</div>
                      <p className="text-sm text-[#6B7280]">{recommendation.integrationInfo}</p>
                    </div>
                  </div>
                </div>

                {/* Before vs After */}
                <div className="mb-6">
                  <h3 className="font-bold text-[#111827] mb-3">Before vs After</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#FEF2F2] border border-[#FCA5A5]/20 rounded-xl">
                      <div className="text-sm font-semibold text-[#DC2626] mb-2">Before</div>
                      <ul className="text-sm text-[#6B7280] space-y-1">
                        <li>• Manual, time-consuming tasks</li>
                        <li>• Frequent errors and delays</li>
                        <li>• Disconnected systems</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-[#F0FDF4] border border-[#4ADE80]/20 rounded-xl">
                      <div className="text-sm font-semibold text-[#16A34A] mb-2">After</div>
                      <ul className="text-sm text-[#6B7280] space-y-1">
                        <li>• Automated, instant workflows</li>
                        <li>• 95%+ accuracy guaranteed</li>
                        <li>• Unified, seamless systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4ADE80] px-8 py-3 font-semibold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:bg-[#34D399] hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                >
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              {/* Secondary Recommendation */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm mb-8"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[#6B7280]/10 text-[#6B7280] text-xs font-semibold uppercase tracking-wider mb-3">
                  Also Consider
                </span>
                <h3 className="text-xl font-bold text-[#111827] mb-2">
                  {recommendation.secondary?.service}
                </h3>
                <p className="text-[#6B7280] mb-4">{recommendation.secondary?.description}</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#16A34A] hover:text-[#15803D] font-medium transition-colors"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
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
                  <CheckCircle className="h-4 w-4" />
                  Service Selector
                </span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                Find Your <GradientText>Perfect Solution</GradientText>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
                Answer 6 quick questions and get personalized automation recommendations tailored to your business needs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-2xl">
            <SectionHeading
              title="Let's Find What Works for You"
              subtitle="This will only take 2 minutes"
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
