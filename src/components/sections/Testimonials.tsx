import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const testimonials = [
  {
    quote:
      "We had two full-time staff just doing data entry and follow-ups. Typin automated 80% of that in the first month. Now those same people are closing deals instead of updating spreadsheets.",
    name: "Ayesha Khan",
    company: "Urban Keys",
    role: "Managing Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    quote:
      "I used to hire a new person every time workload increased. With Typin's automations, my team of 5 now handles the output of 15. The savings are massive.",
    name: "Daniel Morris",
    company: "Southline Realty",
    role: "Operations Lead",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    quote:
      "The AI chatbot handles enquiries, qualifies them, and books meetings — all while we sleep. We went from 2-hour response times to under 30 seconds. Game changer.",
    name: "Maria Patel",
    company: "ScaleCart",
    role: "Founder",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    quote:
      "What impressed me most is that Typin didn't just automate — they understood our business first. The systems they built feel like they were made by someone who works here.",
    name: "Omar Siddiqui",
    company: "Prime Estates",
    role: "Head of Sales",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
  {
    quote:
      "Our reporting used to take a full day every week. Now it's automatic. I open a dashboard and see everything — pipeline, revenue, team performance. Instant.",
    name: "Eva Turner",
    company: "Nexa Ops",
    role: "CEO",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  const t = testimonials[current];

  return (
    <section className="bg-[#F3F4F6] px-6 py-24 lg:py-32" id="testimonials">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title={
            <>
              SME owners{" "}
              <span className="bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent">
                love the results
              </span>
            </>
          }
          subtitle="Don't take our word for it — hear from business owners who replaced manual chaos with smart automation."
        />

        <div className="mt-16 flex items-center justify-center gap-6 lg:mt-20">
          <button
            onClick={prev}
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition-all hover:border-[#16A34A] hover:text-[#16A34A] hover:shadow-md lg:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-[0_15px_50px_rgba(0,0,0,0.06)] md:p-14"
              >
                <div className="mb-6 text-5xl font-light text-[#16A34A]/20">"</div>
                <p className="text-lg leading-relaxed text-[#334155] md:text-xl">
                  {t.quote}
                </p>
                <div className="my-6 h-px bg-[#E2E8F0]" />
                <div className="flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-[#16A34A]/20"
                  />
                  <div>
                    <p className="font-semibold text-[#0F172A]">{t.name}</p>
                    <p className="text-sm text-[#64748B]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
              <button onClick={prev} className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-gradient-to-r from-[#16A34A] to-[#34D399]"
                      : "w-2 bg-[#CBD5E1]"
                  }`}
                />
              ))}
              <button onClick={next} className="rounded-full border border-[#E2E8F0] p-2 text-[#64748B]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <button
            onClick={next}
            className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] bg-white text-[#64748B] shadow-sm transition-all hover:border-[#16A34A] hover:text-[#16A34A] hover:shadow-md lg:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 hidden justify-center gap-2 lg:flex">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-gradient-to-r from-[#16A34A] to-[#34D399]"
                  : "w-2 bg-[#CBD5E1]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
