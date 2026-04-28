import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Target, CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface CaseStudy {
  tag: string;
  title: string;
  description: string;
  image: string;
  result: string;
  color: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  metrics?: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  fullStory?: string;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
}

export function CaseStudyModal({ isOpen, onClose, caseStudy }: CaseStudyModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-6xl my-8"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-[#64748B] transition-all hover:bg-white hover:text-[#0F172A] shadow-lg"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid lg:grid-cols-2">
                  {/* Left Side - Image */}
                  <div className="relative h-[300px] lg:h-auto lg:min-h-[600px]">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r" />
                    
                    {/* Tag on Image */}
                    <span
                      className="absolute top-6 left-6 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md"
                      style={{
                        backgroundColor: `${caseStudy.color}90`,
                        border: `1px solid ${caseStudy.color}`,
                      }}
                    >
                      {caseStudy.tag}
                    </span>

                    {/* Result Badge on Image */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white backdrop-blur-md"
                        style={{
                          backgroundColor: `${caseStudy.color}CC`,
                          border: `1px solid ${caseStudy.color}`,
                        }}
                      >
                        <TrendingUp className="h-5 w-5" />
                        {caseStudy.result}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex flex-col max-h-[600px] overflow-y-auto">
                    <div className="p-8 md:p-10 lg:p-12">
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-[#0F172A] mb-6">
                        {caseStudy.title}
                      </h2>

                      <p className="text-lg leading-relaxed text-[#64748B] mb-8">
                        {caseStudy.description}
                      </p>

                      {/* Challenge Section */}
                      {caseStudy.challenge && (
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-3">
                            <Target className="h-5 w-5 text-[#EF4444]" />
                            <h3 className="text-lg font-bold text-[#0F172A]">The Challenge</h3>
                          </div>
                          <p className="text-[#64748B] leading-relaxed pl-7">
                            {caseStudy.challenge}
                          </p>
                        </div>
                      )}

                      {/* Solution Section */}
                      {caseStudy.solution && (
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="h-5 w-5 text-[#16A34A]" />
                            <h3 className="text-lg font-bold text-[#0F172A]">Our Solution</h3>
                          </div>
                          <p className="text-[#64748B] leading-relaxed pl-7">
                            {caseStudy.solution}
                          </p>
                        </div>
                      )}

                      {/* Results Grid */}
                      {caseStudy.results && caseStudy.results.length > 0 && (
                        <div className="mb-8">
                          <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="h-5 w-5" style={{ color: caseStudy.color }} />
                            <h3 className="text-lg font-bold text-[#0F172A]">Key Results</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3 pl-7">
                            {caseStudy.results.map((result, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="rounded-xl p-4 border-2 transition-all hover:shadow-md"
                                style={{
                                  backgroundColor: `${caseStudy.color}08`,
                                  borderColor: `${caseStudy.color}30`,
                                }}
                              >
                                <p className="text-sm font-semibold" style={{ color: caseStudy.color }}>
                                  {result}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Metrics */}
                      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-4">Impact Metrics</h3>
                          <div className="space-y-3">
                            {caseStudy.metrics.map((metric, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]"
                              >
                                <span className="text-sm text-[#64748B]">{metric.label}</span>
                                <span className="text-lg font-bold" style={{ color: caseStudy.color }}>
                                  {metric.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Full Story */}
                      {caseStudy.fullStory && (
                        <div className="mb-8">
                          <h3 className="text-lg font-bold text-[#0F172A] mb-3">Full Story</h3>
                          <p className="text-[#64748B] leading-relaxed whitespace-pre-line">
                            {caseStudy.fullStory}
                          </p>
                        </div>
                      )}

                      {/* Testimonial */}
                      {caseStudy.testimonial && (
                        <div
                          className="rounded-2xl p-6 mb-8 border-l-4"
                          style={{
                            backgroundColor: `${caseStudy.color}08`,
                            borderColor: caseStudy.color,
                          }}
                        >
                          <p className="text-[#0F172A] italic mb-4 text-lg leading-relaxed">
                            "{caseStudy.testimonial.quote}"
                          </p>
                          <div>
                            <p className="font-bold text-[#0F172A]">{caseStudy.testimonial.author}</p>
                            <p className="text-sm text-[#64748B]">{caseStudy.testimonial.role}</p>
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-6 border-t border-[#E2E8F0]">
                        <a
                          href="/contact"
                          onClick={onClose}
                          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all hover:gap-3 shadow-lg hover:shadow-xl"
                          style={{
                            background: `linear-gradient(135deg, ${caseStudy.color} 0%, ${caseStudy.color}DD 100%)`,
                          }}
                        >
                          Get Similar Results
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
