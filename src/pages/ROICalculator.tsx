import { useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { TrendingUp, DollarSign, Clock, Target, Calculator, Users, Download } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { fadeUp } from "../lib/animations";
import jsPDF from "jspdf";

// Animated counter component
function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { duration: 800 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());
  
  return <motion.span>{display}</motion.span>;
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    teamSize: 5,
    hoursPerWeek: 20,
    hourlyRate: 50,
    automationCost: 10000,
    monthlyCost: 500,
  });

  const calculateROI = () => {
    const automationEfficiency = 0.70; // 70% of manual work can be automated
    const annualHoursSaved = inputs.hoursPerWeek * inputs.teamSize * 52 * automationEfficiency;
    const hourlyRate = inputs.hourlyRate;
    const annualSavings = annualHoursSaved * hourlyRate;
    
    // Error reduction savings: ~2 hours/month per person saved from fixing errors
    const errorReductionSavings = inputs.teamSize * hourlyRate * 2 * 12;
    const totalAnnualSavings = annualSavings + errorReductionSavings;
    
    // Year 1 calculations
    const totalYear1Cost = inputs.automationCost + (inputs.monthlyCost * 12);
    const netSavingsYear1 = totalAnnualSavings - totalYear1Cost;
    const roi = totalYear1Cost > 0 ? (netSavingsYear1 / totalYear1Cost) * 100 : 0;
    const monthlySavings = totalAnnualSavings / 12;
    const paybackMonths = monthlySavings > 0 ? Math.max(1, Math.round(totalYear1Cost / monthlySavings)) : 999;
    
    // Multi-year projections (no setup cost in years 2+)
    const annualOngoingCost = inputs.monthlyCost * 12;
    const netSavingsYear2 = totalAnnualSavings - annualOngoingCost;
    const netSavingsYear3 = totalAnnualSavings - annualOngoingCost;
    const netSavingsYear5 = totalAnnualSavings - annualOngoingCost;
    
    const cumulativeSavings3Year = netSavingsYear1 + netSavingsYear2 + netSavingsYear3;
    const cumulativeSavings5Year = cumulativeSavings3Year + (netSavingsYear5 * 2);
    
    // FTE calculation (2080 hours = 1 FTE per year)
    const fteFreedUp = annualHoursSaved / 2080;

    return {
      annualHoursSaved: Math.round(annualHoursSaved),
      annualSavings: Math.round(totalAnnualSavings),
      errorReductionSavings: Math.round(errorReductionSavings),
      netSavingsYear1: Math.round(netSavingsYear1),
      netSavingsYear2: Math.round(netSavingsYear2),
      netSavingsYear3: Math.round(netSavingsYear3),
      cumulativeSavings3Year: Math.round(cumulativeSavings3Year),
      cumulativeSavings5Year: Math.round(cumulativeSavings5Year),
      roi: Math.round(roi),
      paybackMonths: paybackMonths,
      fteFreedUp: fteFreedUp,
    };
  };

  const results = calculateROI();

  const handleInputChange = (field: string, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const downloadPDFReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPos = 20;

    // Header
    doc.setFillColor(31, 41, 55);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Automation ROI Report', margin, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, 33);

    yPos = 55;

    // Your Current Setup Section
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Current Setup', margin, yPos);
    yPos += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const setupData = [
      `Team Size: ${inputs.teamSize} people`,
      `Hours on Manual Tasks: ${inputs.hoursPerWeek} hours/week per person`,
      `Average Hourly Rate: $${inputs.hourlyRate}`,
      `Automation Setup Cost: $${inputs.automationCost.toLocaleString()}`,
      `Ongoing Monthly Cost: $${inputs.monthlyCost.toLocaleString()}`,
    ];

    setupData.forEach((line) => {
      doc.text(line, margin + 5, yPos);
      yPos += 7;
    });

    yPos += 5;

    // Key Results Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Key Results', margin, yPos);
    yPos += 10;

    // Results boxes
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const resultsData = [
      { label: 'Hours Saved per Year', value: `${results.annualHoursSaved.toLocaleString()} hours` },
      { label: 'FTE Freed Up', value: `${results.fteFreedUp.toFixed(1)} FTE` },
      { label: 'Annual Savings', value: `$${results.annualSavings.toLocaleString()}` },
      { label: 'Net Savings (Year 1)', value: `$${Math.abs(results.netSavingsYear1).toLocaleString()}${results.netSavingsYear1 < 0 ? ' loss' : ''}` },
      { label: 'ROI', value: `${results.roi}%` },
      { label: 'Payback Period', value: `${results.paybackMonths > 99 ? '99+' : results.paybackMonths} months` },
    ];

    resultsData.forEach((item) => {
      doc.setFillColor(240, 253, 244);
      doc.roundedRect(margin, yPos - 5, pageWidth - 2 * margin, 12, 2, 2, 'F');
      
      doc.setFont('helvetica', 'normal');
      doc.text(item.label, margin + 3, yPos + 2);
      
      doc.setFont('helvetica', 'bold');
      doc.text(item.value, pageWidth - margin - 3, yPos + 2, { align: 'right' });
      
      yPos += 15;
    });

    yPos += 5;

    // Multi-Year Projection
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Multi-Year Projection', margin, yPos);
    yPos += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    // Table header
    doc.setFillColor(240, 253, 244);
    doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');
    doc.text('Year', margin + 3, yPos + 2);
    doc.text('Savings', margin + 50, yPos + 2);
    doc.text('Costs', margin + 90, yPos + 2);
    doc.text('Net', pageWidth - margin - 3, yPos + 2, { align: 'right' });
    yPos += 10;

    // Table rows
    doc.setFont('helvetica', 'normal');
    const tableData = [
      { year: 'Year 1', savings: results.annualSavings, costs: inputs.automationCost + inputs.monthlyCost * 12, net: results.netSavingsYear1 },
      { year: 'Year 2', savings: results.annualSavings, costs: inputs.monthlyCost * 12, net: results.netSavingsYear2 },
      { year: 'Year 3', savings: results.annualSavings, costs: inputs.monthlyCost * 12, net: results.netSavingsYear3 },
    ];

    tableData.forEach((row) => {
      doc.text(row.year, margin + 3, yPos);
      doc.text(`$${row.savings.toLocaleString()}`, margin + 50, yPos);
      doc.text(`$${row.costs.toLocaleString()}`, margin + 90, yPos);
      doc.text(`$${Math.abs(row.net).toLocaleString()}`, pageWidth - margin - 3, yPos, { align: 'right' });
      yPos += 8;
    });

    yPos += 3;

    // Totals
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(236, 253, 245);
    doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');
    doc.text('3-Year Total', margin + 3, yPos + 2);
    doc.text(`$${results.cumulativeSavings3Year.toLocaleString()}`, pageWidth - margin - 3, yPos + 2, { align: 'right' });
    yPos += 12;

    doc.setFillColor(209, 250, 229);
    doc.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');
    doc.text('5-Year Total', margin + 3, yPos + 2);
    doc.text(`$${results.cumulativeSavings5Year.toLocaleString()}`, pageWidth - margin - 3, yPos + 2, { align: 'right' });
    yPos += 15;

    // Footer
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(107, 114, 128);
    doc.text('This report assumes 70% automation efficiency and includes error reduction savings.', margin, yPos);
    yPos += 5;
    doc.text('Results may vary based on specific implementation and business processes.', margin, yPos);

    // Company footer
    yPos = doc.internal.pageSize.getHeight() - 20;
    doc.setFillColor(31, 41, 55);
    doc.rect(0, yPos - 5, pageWidth, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Typin', margin, yPos + 5);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Ready to achieve these results? Contact us for a consultation.', margin, yPos + 11);

    // Save the PDF
    doc.save(`ROI-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <Calculator className="h-4 w-4" />,
            text: "ROI Calculator",
          }}
          title={
            <>
              Calculate Your <GradientText>Automation ROI</GradientText>
            </>
          }
          subtitle="See exactly how much time and money you'll save with AI automation. Most clients see 300%+ ROI in the first year."
        />

        {/* Calculator Section */}
        <section className="relative px-6 py-24 lg:py-32 overflow-hidden">
          {/* Attractive Grid Pattern Background */}
          <div 
            className="absolute inset-0 opacity-[0.08]" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(74,222,128,0.3) 2px, transparent 2px),
                linear-gradient(90deg, rgba(74,222,128,0.3) 2px, transparent 2px),
                linear-gradient(rgba(52,211,153,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(52,211,153,0.2) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px"
            }} 
          />
          
          {/* Large Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {/* Top Left - Large Dollar Sign with Glow */}
            <div className="absolute top-10 left-10 text-[#4ADE80] opacity-[0.12] text-[200px] font-bold leading-none" style={{
              textShadow: "0 0 80px rgba(74,222,128,0.3)"
            }}>
              $
            </div>
            
            {/* Top Right - Percentage with Glow */}
            <div className="absolute top-20 right-20 text-[#34D399] opacity-[0.12] text-[180px] font-bold leading-none" style={{
              textShadow: "0 0 80px rgba(52,211,153,0.3)"
            }}>
              %
            </div>
            
            {/* Bottom Left - Large Chart/Graph */}
            <svg className="absolute bottom-10 left-10 w-[400px] h-[300px] opacity-[0.1]" viewBox="0 0 400 300">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polyline points="20,250 80,180 140,200 200,120 260,140 320,80 380,100" 
                fill="none" stroke="#4ADE80" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <polygon points="20,250 80,180 140,200 200,120 260,140 320,80 380,100 380,280 20,280" 
                fill="url(#chartGradient)"/>
              <circle cx="20" cy="250" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
              <circle cx="80" cy="180" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
              <circle cx="140" cy="200" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
              <circle cx="200" cy="120" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
              <circle cx="260" cy="140" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
              <circle cx="320" cy="80" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
              <circle cx="380" cy="100" r="8" fill="#4ADE80" filter="drop-shadow(0 0 10px rgba(74,222,128,0.8))"/>
            </svg>
            
            {/* Bottom Right - Large Calculator */}
            <svg className="absolute bottom-20 right-20 w-[280px] h-[350px] opacity-[0.08]" viewBox="0 0 100 120">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <rect x="15" y="10" width="70" height="100" rx="8" fill="none" stroke="#4ADE80" strokeWidth="3" filter="url(#glow)"/>
              <rect x="22" y="18" width="56" height="20" rx="4" fill="#4ADE80" opacity="0.4"/>
              <rect x="22" y="45" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="38" y="45" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="54" y="45" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="70" y="45" width="12" height="12" rx="2" fill="#34D399" opacity="0.6"/>
              <rect x="22" y="62" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="38" y="62" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="54" y="62" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="70" y="62" width="12" height="12" rx="2" fill="#34D399" opacity="0.6"/>
              <rect x="22" y="79" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="38" y="79" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="54" y="79" width="12" height="12" rx="2" fill="#4ADE80" opacity="0.6"/>
              <rect x="70" y="79" width="12" height="29" rx="2" fill="#10B981" opacity="0.7"/>
            </svg>
            
            {/* Center - ROI Text */}
            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 text-[#4ADE80] opacity-[0.06] text-[160px] font-black leading-none tracking-tighter" style={{
              textShadow: "0 0 100px rgba(74,222,128,0.4)"
            }}>
              ROI
            </div>
          </div>
          
          {/* Large Animated Gradient Orbs */}
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.08, 0.12, 0.08]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#4ADE80] via-[#34D399] to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.12, 0.08]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-[#34D399] via-[#10B981] to-transparent rounded-full blur-3xl"
          />
          
          <div className="mx-auto max-w-7xl relative z-10">
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
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#374151]">
                          Team Size
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={inputs.teamSize}
                          onChange={(e) =>
                            handleInputChange("teamSize", Number(e.target.value))
                          }
                          className="w-20 rounded-lg border border-[#E5E7EB] px-3 py-1 text-right text-sm font-semibold text-[#111827] focus:border-[#4ADE80] focus:outline-none"
                        />
                      </div>
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
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#374151]">
                          Hours on Manual Tasks/Week (per person)
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="100"
                          value={inputs.hoursPerWeek}
                          onChange={(e) =>
                            handleInputChange("hoursPerWeek", Number(e.target.value))
                          }
                          className="w-20 rounded-lg border border-[#E5E7EB] px-3 py-1 text-right text-sm font-semibold text-[#111827] focus:border-[#4ADE80] focus:outline-none"
                        />
                      </div>
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
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#374151]">
                          Average Hourly Rate
                        </label>
                        <input
                          type="number"
                          min="15"
                          max="200"
                          step="5"
                          value={inputs.hourlyRate}
                          onChange={(e) =>
                            handleInputChange("hourlyRate", Number(e.target.value))
                          }
                          className="w-20 rounded-lg border border-[#E5E7EB] px-3 py-1 text-right text-sm font-semibold text-[#111827] focus:border-[#4ADE80] focus:outline-none"
                        />
                      </div>
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
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#374151]">
                          Automation Setup Cost
                        </label>
                        <input
                          type="number"
                          min="5000"
                          max="50000"
                          step="1000"
                          value={inputs.automationCost}
                          onChange={(e) =>
                            handleInputChange("automationCost", Number(e.target.value))
                          }
                          className="w-24 rounded-lg border border-[#E5E7EB] px-3 py-1 text-right text-sm font-semibold text-[#111827] focus:border-[#4ADE80] focus:outline-none"
                        />
                      </div>
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

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#374151]">
                          Ongoing Monthly Cost (SaaS)
                        </label>
                        <input
                          type="number"
                          min="200"
                          max="5000"
                          step="100"
                          value={inputs.monthlyCost}
                          onChange={(e) =>
                            handleInputChange("monthlyCost", Number(e.target.value))
                          }
                          className="w-24 rounded-lg border border-[#E5E7EB] px-3 py-1 text-right text-sm font-semibold text-[#111827] focus:border-[#4ADE80] focus:outline-none"
                        />
                      </div>
                      <input
                        type="range"
                        min="200"
                        max="5000"
                        step="100"
                        value={inputs.monthlyCost}
                        onChange={(e) =>
                          handleInputChange("monthlyCost", Number(e.target.value))
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
                        <Clock className="h-5 w-5 text-[#16A34A]" />
                        <span className="text-sm font-medium text-[#16A34A]">
                          Hours Saved/Year
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        <AnimatedNumber value={results.annualHoursSaved} />
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-6 border border-[#4ADE80]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-[#16A34A]" />
                        <span className="text-sm font-medium text-[#16A34A]">
                          FTE Freed Up
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        {results.fteFreedUp.toFixed(1)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] p-6 border border-[#4ADE80]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-5 w-5 text-[#16A34A]" />
                        <span className="text-sm font-medium text-[#16A34A]">
                          Annual Savings
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        $<AnimatedNumber value={results.annualSavings} />
                      </p>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Includes ${results.errorReductionSavings.toLocaleString()} from error reduction
                      </p>
                    </div>

                    <div className={`rounded-2xl bg-gradient-to-br p-6 border ${
                      results.netSavingsYear1 >= 0 
                        ? 'from-[#F0FDF4] to-[#ECFDF5] border-[#4ADE80]/20' 
                        : 'from-[#FEF2F2] to-[#FEE2E2] border-[#FCA5A5]/20'
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Target className={`h-5 w-5 ${results.netSavingsYear1 >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`} />
                        <span className={`text-sm font-medium ${results.netSavingsYear1 >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                          Net Savings (Year 1)
                        </span>
                      </div>
                      <p className={`text-3xl font-bold ${results.netSavingsYear1 >= 0 ? 'text-[#111827]' : 'text-[#DC2626]'}`}>
                        ${Math.abs(results.netSavingsYear1).toLocaleString()}
                        {results.netSavingsYear1 < 0 && ' loss'}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-6 border border-[#34D399]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-[#059669]" />
                        <span className="text-sm font-medium text-[#059669]">
                          ROI
                        </span>
                      </div>
                      <p className={`text-3xl font-bold ${results.roi >= 0 ? 'text-[#111827]' : 'text-[#DC2626]'}`}>
                        {results.roi}%
                      </p>
                      {results.roi < 0 && (
                        <p className="text-xs text-[#DC2626] mt-1">
                          Consider a smaller initial investment
                        </p>
                      )}
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] p-6 border border-[#34D399]/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-[#059669]" />
                        <span className="text-sm font-medium text-[#059669]">
                          Payback Period
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#111827]">
                        {results.paybackMonths > 99 ? '99+' : results.paybackMonths} months
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Multi-Year Projections */}
                <GlassCard className="p-8">
                  <h4 className="text-lg font-bold text-[#111827] mb-4">
                    Multi-Year Projection
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#E5E7EB]">
                          <th className="text-left py-3 px-2 font-semibold text-[#374151]">Year</th>
                          <th className="text-right py-3 px-2 font-semibold text-[#374151]">Savings</th>
                          <th className="text-right py-3 px-2 font-semibold text-[#374151]">Costs</th>
                          <th className="text-right py-3 px-2 font-semibold text-[#374151]">Net</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#E5E7EB]">
                          <td className="py-3 px-2 text-[#6B7280]">Year 1</td>
                          <td className="text-right py-3 px-2 text-[#16A34A] font-semibold">
                            ${results.annualSavings.toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 text-[#DC2626]">
                            ${(inputs.automationCost + inputs.monthlyCost * 12).toLocaleString()}
                          </td>
                          <td className={`text-right py-3 px-2 font-bold ${results.netSavingsYear1 >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                            ${Math.abs(results.netSavingsYear1).toLocaleString()}
                          </td>
                        </tr>
                        <tr className="border-b border-[#E5E7EB]">
                          <td className="py-3 px-2 text-[#6B7280]">Year 2</td>
                          <td className="text-right py-3 px-2 text-[#16A34A] font-semibold">
                            ${results.annualSavings.toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 text-[#DC2626]">
                            ${(inputs.monthlyCost * 12).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 font-bold text-[#16A34A]">
                            ${results.netSavingsYear2.toLocaleString()}
                          </td>
                        </tr>
                        <tr className="border-b border-[#E5E7EB]">
                          <td className="py-3 px-2 text-[#6B7280]">Year 3</td>
                          <td className="text-right py-3 px-2 text-[#16A34A] font-semibold">
                            ${results.annualSavings.toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 text-[#DC2626]">
                            ${(inputs.monthlyCost * 12).toLocaleString()}
                          </td>
                          <td className="text-right py-3 px-2 font-bold text-[#16A34A]">
                            ${results.netSavingsYear3.toLocaleString()}
                          </td>
                        </tr>
                        <tr className="bg-[#F0FDF4]">
                          <td className="py-3 px-2 font-bold text-[#111827]">3-Year Total</td>
                          <td className="text-right py-3 px-2"></td>
                          <td className="text-right py-3 px-2"></td>
                          <td className="text-right py-3 px-2 font-bold text-[#16A34A] text-lg">
                            ${results.cumulativeSavings3Year.toLocaleString()}
                          </td>
                        </tr>
                        <tr className="bg-[#ECFDF5]">
                          <td className="py-3 px-2 font-bold text-[#111827]">5-Year Total</td>
                          <td className="text-right py-3 px-2"></td>
                          <td className="text-right py-3 px-2"></td>
                          <td className="text-right py-3 px-2 font-bold text-[#059669] text-lg">
                            ${results.cumulativeSavings5Year.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </GlassCard>

                <GlassCard className="p-8 border-2 border-[#4ADE80]/30">
                  <h4 className="text-lg font-bold text-[#111827] mb-3">
                    Ready to achieve these results?
                  </h4>
                  <p className="text-[#6B7280] mb-6">
                    Most clients see these exact savings within 30 days of implementation.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                    >
                      Book a Consultation
                    </a>
                    <button
                      onClick={downloadPDFReport}
                      className="inline-flex items-center gap-2 rounded-full border-2 border-[#4ADE80] px-8 py-3 font-semibold text-[#16A34A] transition-all duration-300 hover:bg-[#4ADE80]/10"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF Report
                    </button>
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
