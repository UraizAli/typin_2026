import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { staggerItem } from "../../lib/animations";

export function GlassCard({
  children,
  className = "",
  hover = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      variants={staggerItem}
      style={style}
      className={`rounded-3xl border border-gray-200/50 bg-white/70 backdrop-blur-xl transition-all duration-500 ${
        hover
          ? "hover:-translate-y-2 hover:border-[#4ADE80]/30 hover:shadow-[0_20px_60px_rgba(22,163,74,0.1)]"
          : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
