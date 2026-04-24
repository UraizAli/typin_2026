import { useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { TrendingUp, DollarSign, Clock, Target, Calculator, Users, Download } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
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
                          Ongoing Monthly Cost (SaaS/Maintenance)
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
