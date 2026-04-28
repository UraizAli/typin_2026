import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ClipboardCheck, ArrowLeft, ArrowRight, Mail, TrendingUp, DollarSign } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";

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
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < auditQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.email || !contactInfo.phone) return;
    
    setIsSubmitting(true);
    
    const totalScore = scores.reduce((a, b) => a + b, 0);
    const maxScore = auditQuestions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.email.split("@")[0],
          email: contactInfo.email,
          phone: contactInfo.phone,
          company: "",
          message: `Automation Audit Results Request - Score: ${Math.round(percentage)}%`,
          source: "Automation Audit",
        }),
      });
    } catch (error) {
      console.error("Failed to submit contact info:", error);
    }
    
    setIsSubmitting(false);
    setShowContactForm(false);
    setShowResults(true);
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
          <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
            {/* Attractive Circuit Pattern Background */}
            <div 
              className="absolute inset-0 opacity-[0.08]" 
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(74,222,128,0.15) 2px, transparent 2px),
                  radial-gradient(circle at 75% 75%, rgba(52,211,153,0.15) 2px, transparent 2px),
                  linear-gradient(rgba(74,222,128,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(74,222,128,0.05) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px, 50px 50px, 25px 25px, 25px 25px",
                backgroundPosition: "0 0, 25px 25px, 0 0, 0 0"
              }} 
            />
            
            {/* Large Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Top Left - Clipboard with Checkmarks */}
              <svg className="absolute top-10 left-10 w-[280px] h-[350px] opacity-[0.12]" viewBox="0 0 100 120">
                <defs>
                  <linearGradient id="clipboardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.6"/>
                  </linearGradient>
                  <filter id="clipboardGlow">
                    <feGaussianBlur stdDeviation="2"/>
                    <feMerge>
                      <feMergeNode/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <rect x="20" y="15" width="60" height="90" rx="8" fill="url(#clipboardGradient)" stroke="#4ADE80" strokeWidth="3" filter="url(#clipboardGlow)"/>
                <rect x="35" y="8" width="30" height="12" rx="4" fill="url(#clipboardGradient)" stroke="#4ADE80" strokeWidth="2"/>
                <path d="M30,35 L40,45 L55,30" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30,55 L40,65 L55,50" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30,75 L40,85 L55,70" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              
              {/* Top Right - Large Percentage Gauge */}
              <svg className="absolute top-20 right-20 w-[350px] h-[350px] opacity-[0.1]" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gaugeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8"/>
                    <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.8"/>
                    <stop offset="70%" stopColor="#34D399" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.8"/>
                  </linearGradient>
                  <radialGradient id="gaugeGlow2">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#gaugeGlow2)"/>
                <path d="M10,70 A40,40 0 1,1 90,70" fill="none" stroke="url(#gaugeGradient2)" strokeWidth="10" strokeLinecap="round"/>
                <circle cx="50" cy="70" r="8" fill="#4ADE80" filter="drop-shadow(0 0 15px rgba(74,222,128,0.8))"/>
                <line x1="50" y1="70" x2="75" y2="40" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" 
                  filter="drop-shadow(0 0 10px rgba(74,222,128,0.6))"/>
                <text x="10" y="88" fill="#DC2626" fontSize="10" fontWeight="bold">0%</text>
                <text x="80" y="88" fill="#4ADE80" fontSize="10" fontWeight="bold">100%</text>
              </svg>
              
              {/* Middle Left - Bar Chart */}
              <svg className="absolute top-1/3 left-20 w-[280px] h-[250px] opacity-[0.12]" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="barGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.8"/>
                  </linearGradient>
                  <linearGradient id="barGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#34D399" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <rect x="10" y="60" width="15" height="35" rx="3" fill="url(#barGradient1)" stroke="#4ADE80" strokeWidth="2"/>
                <rect x="30" y="40" width="15" height="55" rx="3" fill="url(#barGradient2)" stroke="#34D399" strokeWidth="2"/>
                <rect x="50" y="25" width="15" height="70" rx="3" fill="url(#barGradient1)" stroke="#4ADE80" strokeWidth="2"/>
                <rect x="70" y="45" width="15" height="50" rx="3" fill="url(#barGradient2)" stroke="#34D399" strokeWidth="2"/>
              </svg>
              
              {/* Bottom Right - Score Badge */}
              <svg className="absolute bottom-10 right-10 w-[320px] h-[320px] opacity-[0.1]" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="badgeGlow2">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#badgeGlow2)"/>
                <circle cx="50" cy="50" r="38" fill="#4ADE80" opacity="0.6" filter="drop-shadow(0 0 20px rgba(74,222,128,0.6))"/>
                <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="35" fontWeight="black">A+</text>
              </svg>
              
              {/* Center - Large Percentage */}
              <div className="absolute top-1/2 left-1/3 transform -translate-y-1/2 text-[#4ADE80] opacity-[0.08] text-[200px] font-black leading-none" style={{
                textShadow: "0 0 100px rgba(74,222,128,0.4)"
              }}>
                %
              </div>
              
              {/* Bottom Left - Trend Arrow */}
              <svg className="absolute bottom-20 left-10 w-[250px] h-[200px] opacity-[0.12]" viewBox="0 0 100 80">
                <defs>
                  <linearGradient id="arrowGradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34D399" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.8"/>
                  </linearGradient>
                </defs>
                <path d="M10,70 L30,50 L50,55 L70,30 L90,20" fill="none" stroke="url(#arrowGradient2)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <polygon points="90,20 80,15 85,25" fill="#4ADE80" opacity="0.8"/>
                <circle cx="10" cy="70" r="4" fill="#34D399"/>
                <circle cx="30" cy="50" r="4" fill="#34D399"/>
                <circle cx="50" cy="55" r="4" fill="#34D399"/>
                <circle cx="70" cy="30" r="4" fill="#4ADE80"/>
                <circle cx="90" cy="20" r="4" fill="#4ADE80"/>
              </svg>
            </div>
            
            {/* Large Animated Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 80, 0],
                y: [0, -40, 0],
                scale: [1, 1.25, 1],
                opacity: [0.12, 0.18, 0.12]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[750px] h-[750px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, 40, 0],
                scale: [1, 1.3, 1],
                opacity: [0.12, 0.18, 0.12]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
            />
            
            <div className="mx-auto max-w-4xl relative z-10">
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
                    setShowContactForm(false);
                    setContactInfo({ email: "", phone: "" });
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

  // Contact Form Screen
  if (showContactForm) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="pt-24">
          <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 opacity-[0.06]" 
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    45deg,
                    rgba(74,222,128,0.1),
                    rgba(74,222,128,0.1) 10px,
                    transparent 10px,
                    transparent 20px
                  ),
                  repeating-linear-gradient(
                    -45deg,
                    rgba(52,211,153,0.08),
                    rgba(52,211,153,0.08) 10px,
                    transparent 10px,
                    transparent 20px
                  )
                `
              }} 
            />
            
            {/* Animated Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 60, 0],
                y: [0, -35, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.16, 0.1]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[680px] h-[680px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -60, 0],
                y: [0, 35, 0],
                scale: [1, 1.25, 1],
                opacity: [0.1, 0.16, 0.1]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-0 w-[720px] h-[720px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
            />
            
            <div className="mx-auto max-w-2xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4ADE80]/10 mb-6">
                  <ClipboardCheck className="h-8 w-8 text-[#16A34A]" />
                </div>
                <h1 className="text-3xl font-bold text-[#111827] mb-4">
                  Get Your Automation Audit Results
                </h1>
                <p className="text-lg text-[#6B7280]">
                  Enter your contact information to receive your personalized audit report and recommendations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-lg"
              >
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#111827] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border-2 border-[#E5E7EB] px-4 py-3 text-[#111827] focus:border-[#4ADE80] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-[#111827] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-lg border-2 border-[#E5E7EB] px-4 py-3 text-[#111827] focus:border-[#4ADE80] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="p-4 bg-[#F0FDF4] border border-[#4ADE80]/20 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#16A34A] shrink-0 mt-0.5" />
                      <div className="text-sm text-[#6B7280]">
                        <p className="font-semibold text-[#111827] mb-1">What you'll receive:</p>
                        <ul className="space-y-1">
                          <li>• Detailed automation audit score and breakdown</li>
                          <li>• Personalized recommendations for your business</li>
                          <li>• Estimated time and cost savings</li>
                          <li>• Priority action items to implement first</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowContactForm(false);
                        setCurrentQuestion(auditQuestions.length - 1);
                      }}
                      className="flex-1 rounded-full border-2 border-[#E5E7EB] py-3 font-semibold text-[#111827] transition-all hover:border-[#4ADE80]"
                    >
                      <ArrowLeft className="h-4 w-4 inline mr-2" />
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !contactInfo.email || !contactInfo.phone}
                      className="flex-1 rounded-full bg-[#4ADE80] py-3 font-semibold text-[#111827] shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all hover:bg-[#34D399] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "View My Audit Results"}
                      <ArrowRight className="h-4 w-4 inline ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-6"
              >
                <p className="text-sm text-[#6B7280]">
                  🔒 Your information is secure and will never be shared with third parties.
                </p>
              </motion.div>
            </div>
          </section>
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
            icon: <ClipboardCheck className="h-4 w-4" />,
            text: "Free Audit",
          }}
          title={
            <>
              Discover Your <GradientText>Automation Potential</GradientText>
            </>
          }
          subtitle="Take our 3-minute audit to uncover hidden opportunities for automation in your business. Get a personalized score and actionable recommendations."
        >
          <></>
        </AnimatedHeroBackground>

        {/* Quiz Section */}
        <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
          {/* Attractive Diagonal Stripe Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.06]" 
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  45deg,
                  rgba(74,222,128,0.1),
                  rgba(74,222,128,0.1) 10px,
                  transparent 10px,
                  transparent 20px
                ),
                repeating-linear-gradient(
                  -45deg,
                  rgba(52,211,153,0.08),
                  rgba(52,211,153,0.08) 10px,
                  transparent 10px,
                  transparent 20px
                )
              `
            }} 
          />
          
          {/* Large Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Top Left - Question Mark in Circle */}
            <svg className="absolute top-10 left-10 w-[280px] h-[280px] opacity-[0.12]" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="questionGlow">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#questionGlow)"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#4ADE80" strokeWidth="4" filter="drop-shadow(0 0 15px rgba(74,222,128,0.6))"/>
              <text x="50" y="65" textAnchor="middle" fill="#4ADE80" fontSize="50" fontWeight="bold" filter="drop-shadow(0 0 10px rgba(74,222,128,0.6))">?</text>
            </svg>
            
            {/* Top Right - Progress Circles */}
            <svg className="absolute top-20 right-20 w-[300px] h-[300px] opacity-[0.1]" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80"/>
                  <stop offset="100%" stopColor="#34D399"/>
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="8" opacity="0.3"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#progressGradient)" strokeWidth="8" 
                strokeDasharray="188.4" strokeDashoffset="47.1" strokeLinecap="round" 
                filter="drop-shadow(0 0 15px rgba(74,222,128,0.6))"/>
              <text x="50" y="58" textAnchor="middle" fill="#4ADE80" fontSize="20" fontWeight="bold">75%</text>
            </svg>
            
            {/* Middle Left - Checklist */}
            <svg className="absolute top-1/3 left-20 w-[240px] h-[280px] opacity-[0.12]" viewBox="0 0 100 120">
              <defs>
                <linearGradient id="checklistGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.5"/>
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.5"/>
                </linearGradient>
              </defs>
              <rect x="20" y="10" width="60" height="100" rx="6" fill="url(#checklistGradient)" stroke="#4ADE80" strokeWidth="2"/>
              <circle cx="30" cy="30" r="5" fill="#4ADE80"/>
              <line x1="40" y1="30" x2="70" y2="30" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="30" cy="50" r="5" fill="#4ADE80"/>
              <line x1="40" y1="50" x2="70" y2="50" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="30" cy="70" r="5" fill="#4ADE80"/>
              <line x1="40" y1="70" x2="70" y2="70" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="30" cy="90" r="5" fill="#4ADE80"/>
              <line x1="40" y1="90" x2="70" y2="90" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            
            {/* Bottom Right - Analytics Dashboard */}
            <svg className="absolute bottom-10 right-10 w-[350px] h-[280px] opacity-[0.1]" viewBox="0 0 120 100">
              <defs>
                <linearGradient id="dashGradient1" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.8"/>
                </linearGradient>
                <linearGradient id="dashGradient2" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#34D399" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <rect x="10" y="10" width="100" height="80" rx="5" fill="none" stroke="#4ADE80" strokeWidth="2"/>
              <rect x="20" y="60" width="12" height="20" rx="2" fill="url(#dashGradient1)"/>
              <rect x="38" y="45" width="12" height="35" rx="2" fill="url(#dashGradient2)"/>
              <rect x="56" y="30" width="12" height="50" rx="2" fill="url(#dashGradient1)"/>
              <rect x="74" y="50" width="12" height="30" rx="2" fill="url(#dashGradient2)"/>
            </svg>
            
            {/* Center - Large Number */}
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 text-[#4ADE80] opacity-[0.08] text-[180px] font-black leading-none" style={{
              textShadow: "0 0 100px rgba(74,222,128,0.4)"
            }}>
              8
            </div>
          </div>
          
          {/* Large Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -35, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.16, 0.1]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[680px] h-[680px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -60, 0],
              y: [0, 35, 0],
              scale: [1, 1.25, 1],
              opacity: [0.1, 0.16, 0.1]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-0 w-[720px] h-[720px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
          />
          
          <div className="mx-auto max-w-2xl relative z-10">
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
