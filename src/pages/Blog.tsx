import { motion } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { GradientText } from "../components/ui/GradientText";
import { GlassCard } from "../components/ui/GlassCard";
import { AnimatedHeroBackground } from "../components/ui/AnimatedHeroBackground";
import { staggerContainer, staggerItem } from "../lib/animations";

const blogPosts = [
  {
    title: "10 Automation Workflows Every SME Should Have",
    excerpt: "Discover the essential automation workflows that can save your team 20+ hours per week and eliminate repetitive tasks.",
    category: "Automation Tips",
    readTime: "5 min read",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    title: "How AI Voice Calling Transformed Our Client's Sales",
    excerpt: "A case study on how implementing AI voice agents increased lead qualification by 300% and saved 15 hours per week.",
    category: "Case Study",
    readTime: "8 min read",
    date: "March 10, 2024",
    image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80",
  },
  {
    title: "CRM Automation: Beyond Basic Email Sequences",
    excerpt: "Learn advanced CRM automation strategies that go beyond simple email drips to create truly personalized customer journeys.",
    category: "CRM",
    readTime: "6 min read",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "The ROI of Business Automation: Real Numbers",
    excerpt: "We analyzed 50+ automation projects to show you the actual ROI you can expect from different types of automation.",
    category: "ROI & Metrics",
    readTime: "7 min read",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  },
  {
    title: "Integrating 50+ Apps: A Complete Guide",
    excerpt: "Step-by-step guide to connecting all your business tools into one seamless automated workflow.",
    category: "Integrations",
    readTime: "10 min read",
    date: "February 20, 2024",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  },
  {
    title: "AI Chatbots That Actually Convert",
    excerpt: "How to design and deploy AI chatbots that don't just answer questions but actively drive conversions and bookings.",
    category: "AI & Chatbots",
    readTime: "6 min read",
    date: "February 15, 2024",
    image: "https://unsplash.com/photos/BlWbfrQrI5k/download?force=true&w=600",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        {/* Hero Section with Animated Background */}
        <AnimatedHeroBackground
          badge={{
            icon: <BookOpen className="h-4 w-4" />,
            text: "Blog & Resources",
          }}
          title={
            <>
              <GradientText>Insights & Resources</GradientText> for Automation
            </>
          }
          subtitle="Learn automation strategies, best practices, and real-world case studies from our team of experts. Stay ahead of the curve."
        />

        {/* Blog Grid */}
        <section className="px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {blogPosts.map((post, idx) => (
                <motion.article key={post.title} variants={staggerItem}>
                  <GlassCard className="h-full overflow-hidden group cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-4 left-4 rounded-full bg-[#4ADE80]/90 px-3 py-1 text-xs font-semibold text-[#111827] backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#16A34A] transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-[#6B7280] mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#16A34A] group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </GlassCard>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <GlassCard className="p-8 border-2 border-[#4ADE80]/30 inline-block">
                <p className="text-[#6B7280] mb-4">
                  Want automation insights delivered to your inbox?
                </p>
                <a
                  href="/newsletter"
                  className="inline-flex rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#4ADE80] px-8 py-3 font-semibold text-white shadow-[0_4px_30px_rgba(74,222,128,0.35)] transition-all duration-300 hover:shadow-[0_8px_50px_rgba(74,222,128,0.5)]"
                >
                  Subscribe to Newsletter
                </a>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
