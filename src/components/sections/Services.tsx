import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { services } from "../../data/services";
import { staggerContainer, staggerItem } from "../../lib/animations";
import { SectionHeading } from "../ui/SectionHeading";

function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof services)[number];
  onClose: () => void;
}) {
  const Icon = service.icon;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-[#0F172A]/72 px-4 py-8 backdrop-blur-md md:px-6 md:py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#F8FAFC] shadow-[0_32px_120px_rgba(15,23,42,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close service details"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#0F172A] shadow-sm transition-transform hover:scale-105"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[280px] overflow-hidden bg-[#0F172A] lg:min-h-full">
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.86)_88%)]" />
            <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
              <span
                className="inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
                style={{
                  backgroundColor: `${service.color}18`,
                  color: "#FFFFFF",
                  borderColor: `${service.color}35`,
                }}
              >
                {service.tag}
              </span>
              <h3 className="mt-5 text-3xl font-black leading-tight text-white md:text-4xl">
                {service.heroTitle}
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/72 md:text-base">
                {service.heroSummary}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {service.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md"
                  >
                    <p className="text-2xl font-black text-white">{metric.value}</p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-h-[85vh] overflow-y-auto p-6 md:p-8">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${service.color}14` }}
              >
                <Icon className="h-5 w-5" style={{ color: service.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#166534]">
                  Service overview
                </p>
                <h4 className="text-2xl font-bold text-[#0F172A]">{service.title}</h4>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-[#475569]">
              {service.description}
            </p>

            <div className="mt-8">
              <h5 className="text-lg font-bold text-[#0F172A]">Problems this solves</h5>
              <div className="mt-4 space-y-3">
                {service.challenges.map((challenge) => (
                  <div
                    key={challenge}
                    className="flex gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: service.color }}
                    />
                    <p className="text-sm leading-relaxed text-[#475569]">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h5 className="text-lg font-bold text-[#0F172A]">What’s included</h5>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {service.deliverables.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#DCFCE7] bg-[linear-gradient(180deg,#F0FDF4_0%,#FFFFFF_100%)] p-4 text-sm leading-relaxed text-[#475569]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h5 className="text-lg font-bold text-[#0F172A]">How we deliver it</h5>
              <div className="mt-4 space-y-4">
                {service.process.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-white"
                        style={{ backgroundColor: service.color }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <h6 className="text-base font-bold text-[#0F172A]">{step.title}</h6>
                        <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h5 className="text-lg font-bold text-[#0F172A]">Quick answers</h5>
              <div className="mt-4 space-y-3">
                {service.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-[#E2E8F0] bg-white p-5"
                  >
                    <h6 className="text-base font-bold text-[#0F172A]">{faq.question}</h6>
                    <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-[#E2E8F0] pt-6 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex min-h-[56px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-emerald px-7 py-4 text-base font-bold tracking-[-0.01em] text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)] transition-transform duration-300 hover:-translate-y-1"
                onClick={onClose}
              >
                Book a strategy call
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-full border border-[#CBD5E1] bg-white px-6 py-4 text-sm font-semibold text-[#0F172A] transition-transform duration-300 hover:-translate-y-1"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  onOpen,
}: {
  service: (typeof services)[number];
  onOpen: (service: (typeof services)[number]) => void;
}) {
  const Icon = service.icon;
  const isBig = service.size === "big";

  return (
    <motion.div
      variants={staggerItem}
      className={`group overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${
        isBig ? "md:col-span-2" : ""
      }`}
    >
      {isBig ? (
        <div className="grid h-full md:grid-cols-2">
          <div className="relative h-56 overflow-hidden md:h-full md:min-h-[320px]">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-l" />
            <span
              className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md"
              style={{
                backgroundColor: `${service.color}12`,
                color: service.color,
                borderColor: `${service.color}25`,
              }}
            >
              {service.tag}
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-9">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}10` }}
              >
                <Icon className="h-5 w-5" style={{ color: service.color }} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A]">{service.title}</h3>
            </div>
            <p className="text-[15px] leading-relaxed text-[#64748B]">
              {service.description}
            </p>
            <button
              type="button"
              onClick={() => onOpen(service)}
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color: service.color }}
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative h-40 overflow-hidden">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
            <span
              className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-md"
              style={{
                backgroundColor: `${service.color}12`,
                color: service.color,
                borderColor: `${service.color}25`,
              }}
            >
              {service.tag}
            </span>
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${service.color}10` }}
              >
                <Icon className="h-5 w-5" style={{ color: service.color }} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">{service.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#64748B]">
              {service.description}
            </p>
            <button
              type="button"
              onClick={() => onOpen(service)}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{ color: service.color }}
            >
              Learn more
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export function Services() {
  const [activeService, setActiveService] = useState<(typeof services)[number] | null>(null);

  const rows = [];
  for (let i = 0; i < services.length; i += 3) {
    rows.push(services.slice(i, i + 3));
  }

  return (
    <>
      <section className="relative bg-[#EEF0F4] px-6 py-24 lg:py-32" id="services">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title={
              <>
                We automate the work{" "}
                <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                  your team shouldn't be doing
                </span>
              </>
            }
            subtitle="Every hour your team spends on repetitive tasks is an hour they're not spending on growth. We fix that."
          />

          <div className="mt-16 space-y-5 lg:mt-20">
            {rows.map((row, rowIdx) => (
              <motion.div
                key={rowIdx}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
              >
                {(rowIdx % 2 === 1 ? [...row.slice(1), row[0]] : row).map((service) => (
                  <ServiceCard
                    key={service.title}
                    service={service}
                    onOpen={setActiveService}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeService && (
          <ServiceModal
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
