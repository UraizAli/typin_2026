import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight, ArrowLeft, TrendingUp, Zap } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { GradientText } from "../components/ui/GradientText";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";

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
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (qId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.email || !contactInfo.phone) return;
    
    setIsSubmitting(true);
    
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.email.split("@")[0],
          email: contactInfo.email,
          phone: contactInfo.phone,
          company: "",
          message: `Service Selector Results Request - Answers: ${JSON.stringify(answers)}`,
          source: "Service Selector",
        }),
      });
    } catch (error) {
      console.error("Failed to submit contact info:", error);
    }
    
    setIsSubmitting(false);
    setShowContactForm(false);
    setShowResults(true);
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
                backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.5) 2px, transparent 2px)",
                backgroundSize: "50px 50px"
              }} 
            />
            
            {/* Animated Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[650px] h-[650px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -60, 0],
                y: [0, 40, 0],
                scale: [1, 1.25, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
            />
            
            <div className="mx-auto max-w-2xl relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#4ADE80]/10 mb-6">
                  <CheckCircle className="h-8 w-8 text-[#16A34A]" />
                </div>
                <h1 className="text-3xl font-bold text-[#111827] mb-4">
                  Almost There! Get Your Results
                </h1>
                <p className="text-lg text-[#6B7280]">
                  Enter your contact information to receive your personalized automation recommendations.
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
                        <p className="font-semibold text-[#111827] mb-1">Why we need this:</p>
                        <ul className="space-y-1">
                          <li>• Deliver your personalized recommendations</li>
                          <li>• Schedule a free consultation if needed</li>
                          <li>• Send you relevant automation insights</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowContactForm(false);
                        setCurrentQuestion(questions.length - 1);
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
                      {isSubmitting ? "Submitting..." : "View My Results"}
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

  if (showResults) {
    const recommendation = getRecommendation();

    return (
      <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
        <Navbar />
        <main className="pt-24">
          <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
            {/* Attractive Hexagon Pattern Background */}
            <div 
              className="absolute inset-0 opacity-[0.06]" 
              style={{
                backgroundImage: `
                  linear-gradient(30deg, rgba(74,222,128,0.25) 12%, transparent 12.5%, transparent 87%, rgba(74,222,128,0.25) 87.5%),
                  linear-gradient(150deg, rgba(74,222,128,0.25) 12%, transparent 12.5%, transparent 87%, rgba(74,222,128,0.25) 87.5%),
                  linear-gradient(30deg, rgba(52,211,153,0.25) 12%, transparent 12.5%, transparent 87%, rgba(52,211,153,0.25) 87.5%),
                  linear-gradient(150deg, rgba(52,211,153,0.25) 12%, transparent 12.5%, transparent 87%, rgba(52,211,153,0.25) 87.5%)
                `,
                backgroundSize: "80px 140px",
                backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px"
              }} 
            />
            
            {/* Large Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Top Left - Trophy */}
              <svg className="absolute top-10 left-10 w-[280px] h-[280px] opacity-[0.12]" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.6"/>
                  </linearGradient>
                  <filter id="trophyGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M25,20 L25,35 Q25,50 40,50 L60,50 Q75,50 75,35 L75,20" fill="url(#trophyGradient)" stroke="#4ADE80" strokeWidth="3" filter="url(#trophyGlow)"/>
                <rect x="35" y="15" width="30" height="35" rx="3" fill="url(#trophyGradient)" stroke="#4ADE80" strokeWidth="3" filter="url(#trophyGlow)"/>
                <path d="M42,50 L42,65 L58,65 L58,50" fill="url(#trophyGradient)" stroke="#4ADE80" strokeWidth="3" filter="url(#trophyGlow)"/>
                <rect x="32" y="65" width="36" height="10" rx="3" fill="url(#trophyGradient)" stroke="#4ADE80" strokeWidth="3" filter="url(#trophyGlow)"/>
                <text x="50" y="38" textAnchor="middle" fill="#fff" fontSize="20" fontWeight="bold">1</text>
              </svg>
              
              {/* Top Right - Star Rating */}
              <svg className="absolute top-20 right-20 w-[320px] h-[320px] opacity-[0.1]" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="starGlow">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="45" fill="url(#starGlow)"/>
                <path d="M50,15 L58,38 L82,38 L63,52 L71,75 L50,61 L29,75 L37,52 L18,38 L42,38 Z" 
                  fill="#4ADE80" stroke="#34D399" strokeWidth="2" opacity="0.8" 
                  filter="drop-shadow(0 0 20px rgba(74,222,128,0.6))"/>
              </svg>
              
              {/* Middle - Percentage Circle */}
              <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.06]" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="percentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4ADE80"/>
                    <stop offset="100%" stopColor="#34D399"/>
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="url(#percentGradient)" strokeWidth="3" strokeDasharray="8,4"/>
                <text x="50" y="65" textAnchor="middle" fill="url(#percentGradient)" fontSize="45" fontWeight="black">%</text>
              </svg>
              
              {/* Bottom Left - Gauge */}
              <svg className="absolute bottom-10 left-10 w-[300px] h-[300px] opacity-[0.12]" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#DC2626"/>
                    <stop offset="50%" stopColor="#F59E0B"/>
                    <stop offset="100%" stopColor="#4ADE80"/>
                  </linearGradient>
                </defs>
                <path d="M15,75 A35,35 0 1,1 85,75" fill="none" stroke="url(#gaugeGradient)" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="50" cy="75" r="6" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
                <line x1="50" y1="75" x2="70" y2="50" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" 
                  filter="drop-shadow(0 0 8px rgba(74,222,128,0.6))"/>
              </svg>
              
              {/* Bottom Right - Checkmark Badge */}
              <svg className="absolute bottom-20 right-20 w-[260px] h-[260px] opacity-[0.1]" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="badgeGlow">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#badgeGlow)"/>
                <circle cx="50" cy="50" r="35" fill="#4ADE80" opacity="0.6"/>
                <path d="M30,50 L44,64 L70,38" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Large Animated Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 70, 0],
                y: [0, -35, 0],
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.18, 0.12]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -70, 0],
                y: [0, 35, 0],
                scale: [1, 1.25, 1],
                opacity: [0.12, 0.18, 0.12]
              }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 right-0 w-[750px] h-[750px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
            />
            
            <div className="mx-auto max-w-3xl relative z-10">
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
                    setShowContactForm(false);
                    setContactInfo({ email: "", phone: "" });
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
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <CheckCircle className="h-4 w-4" />,
            text: "Service Selector",
          }}
          title={
            <>
              Find Your <GradientText>Perfect Solution</GradientText>
            </>
          }
          subtitle="Answer 6 quick questions and get personalized automation recommendations tailored to your business needs."
        >
          <></>
        </AnimatedHeroBackground>

        {/* Quiz Section */}
        <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
          {/* Attractive Dot Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.1]" 
            style={{
              backgroundImage: "radial-gradient(circle, rgba(74,222,128,0.5) 2px, transparent 2px)",
              backgroundSize: "50px 50px"
            }} 
          />
          
          {/* Large Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Top Left - Large Checkmark Circle */}
            <svg className="absolute top-10 left-10 w-[300px] h-[300px] opacity-[0.12]" viewBox="0 0 100 100">
              <defs>
                <filter id="checkGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4ADE80" strokeWidth="4" filter="url(#checkGlow)"/>
              <path d="M25,50 L42,67 L75,34" fill="none" stroke="#4ADE80" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" filter="url(#checkGlow)"/>
            </svg>
            
            {/* Top Right - Large Question Mark */}
            <div className="absolute top-20 right-20 text-[#4ADE80] opacity-[0.15] text-[220px] font-black leading-none" style={{
              textShadow: "0 0 100px rgba(74,222,128,0.4)"
            }}>
              ?
            </div>
            
            {/* Middle Left - Service Grid */}
            <svg className="absolute top-1/3 left-10 w-[280px] h-[280px] opacity-[0.1]" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.6"/>
                </linearGradient>
              </defs>
              <rect x="5" y="5" width="40" height="40" rx="8" fill="url(#gridGradient)" stroke="#4ADE80" strokeWidth="2"/>
              <rect x="55" y="5" width="40" height="40" rx="8" fill="url(#gridGradient)" stroke="#4ADE80" strokeWidth="2"/>
              <rect x="5" y="55" width="40" height="40" rx="8" fill="url(#gridGradient)" stroke="#4ADE80" strokeWidth="2"/>
              <rect x="55" y="55" width="40" height="40" rx="8" fill="url(#gridGradient)" stroke="#4ADE80" strokeWidth="2"/>
              <circle cx="25" cy="25" r="8" fill="#fff" opacity="0.8"/>
              <circle cx="75" cy="25" r="8" fill="#fff" opacity="0.8"/>
              <circle cx="25" cy="75" r="8" fill="#fff" opacity="0.8"/>
              <circle cx="75" cy="75" r="8" fill="#fff" opacity="0.8"/>
            </svg>
            
            {/* Bottom Right - Large Target/Bullseye */}
            <svg className="absolute bottom-10 right-10 w-[350px] h-[350px] opacity-[0.1]" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="targetGradient">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#targetGradient)"/>
              <circle cx="50" cy="50" r="45" fill="none" stroke="#4ADE80" strokeWidth="2"/>
              <circle cx="50" cy="50" r="35" fill="none" stroke="#34D399" strokeWidth="2"/>
              <circle cx="50" cy="50" r="25" fill="none" stroke="#4ADE80" strokeWidth="2"/>
              <circle cx="50" cy="50" r="15" fill="none" stroke="#34D399" strokeWidth="2"/>
              <circle cx="50" cy="50" r="8" fill="#4ADE80" filter="drop-shadow(0 0 15px rgba(74,222,128,0.8))"/>
            </svg>
            
            {/* Center - Arrow Path */}
            <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] opacity-[0.08]" viewBox="0 0 200 100">
              <defs>
                <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <path d="M10,50 Q60,20 100,50 T190,50" fill="none" stroke="url(#arrowGradient)" strokeWidth="6" strokeLinecap="round"/>
              <polygon points="190,50 175,42 175,58" fill="#34D399" opacity="0.8"/>
            </svg>
            
            {/* Bottom Left - Lightbulb */}
            <svg className="absolute bottom-20 left-20 w-[200px] h-[200px] opacity-[0.12]" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="bulbGlow">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="50" cy="35" r="30" fill="url(#bulbGlow)"/>
              <circle cx="50" cy="35" r="22" fill="none" stroke="#4ADE80" strokeWidth="3"/>
              <path d="M38,57 L38,72 L62,72 L62,57" fill="none" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
              <line x1="32" y1="78" x2="68" y2="78" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
              <line x1="35" y1="84" x2="65" y2="84" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Large Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[650px] h-[650px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 1.25, 1],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
          />
          
          <div className="mx-auto max-w-2xl relative z-10">
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
