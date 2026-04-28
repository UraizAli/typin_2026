import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { staggerContainer, staggerItem } from "../../lib/animations";

const posts = [
  {
    title: "What SMEs should automate first (before hiring more people)",
    summary:
      "Not everything needs automation. Here's how to identify the high-leverage tasks that save the most time and give you the fastest ROI.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80",
    category: "Growth",
    date: "March 30, 2026",
  },
  {
    title: "Why slow follow-up is costing your business more than you think",
    summary:
      "The gap between enquiry and response is where most deals die. Here's how automation closes that gap and stops revenue leaking out.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    category: "Sales",
    date: "March 25, 2026",
  },
  {
    title: "AI chatbots vs. hiring: what makes more sense for small teams",
    summary:
      "A real comparison of costs, coverage, and customer satisfaction for SMEs weighing AI against traditional staffing.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
    category: "Operations",
    date: "March 20, 2026",
  },
  {
    title: "How to tell if your automation is actually delivering results",
    summary:
      "Dashboards only matter if they drive decisions. Here's what to measure and what to ignore in your automation stack.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    category: "Analytics",
    date: "March 15, 2026",
  },
  {
    title: "When to keep humans in the loop — and when to let AI handle it",
    summary:
      "Not every workflow should be fully autonomous. Here's where human oversight still protects quality and customer trust.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
    category: "Strategy",
    date: "March 10, 2026",
  },
];

export function Blog() {
  return (
    <section className="bg-[#FAFBFC] px-6 py-24 lg:py-32" id="insights">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Insights & resources"
          subtitle="Practical thinking on automation, efficiency, and growing a business without growing headcount."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 flex snap-x gap-6 overflow-x-auto pb-4 lg:mt-20"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 2%, black 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 2%, black 95%, transparent)",
          }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="min-w-[280px] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-500 hover:border-[#16A34A]/20 hover:shadow-[0_20px_60px_rgba(22,163,74,0.1)] md:min-w-[320px]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 rounded-full border border-[#16A34A]/20 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#16A34A] backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#0F172A]">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#64748B]">
                  {post.summary}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#16A34A] transition-all hover:gap-3"
                >
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <p className="mt-3 text-xs text-[#94A3B8]">{post.date}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
