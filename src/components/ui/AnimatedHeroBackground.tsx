import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedHeroBackgroundProps {
  children?: ReactNode;
  badge?: {
    icon: ReactNode;
    text: string;
  };
  title: ReactNode;
  subtitle: string;
}

export function AnimatedHeroBackground({
  children,
  badge,
  title,
  subtitle,
}: AnimatedHeroBackgroundProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#1F2937] px-6 py-24 lg:py-32 min-h-screen flex items-center">
      {/* Large animated glowing orbs - smooth background animation */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#4ADE80] blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.3, 1],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute bottom-[10%] right-[15%] h-[300px] w-[300px] rounded-full bg-[#34D399] blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="pointer-events-none absolute right-[20%] top-[40%] h-[250px] w-[250px] rounded-full bg-[#A3E635] blur-[100px]"
      />

      {/* Animated grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Tech-themed floating particles/dots - Professional colors */}
      {[...Array(30)].map((_, i) => {
        // Vary dot colors for visual interest
        const colors = [
          { bg: "bg-[#4ADE80]", shadow: "shadow-[0_0_12px_rgba(74,222,128,0.8)]" }, // Bright green
          { bg: "bg-[#34D399]", shadow: "shadow-[0_0_12px_rgba(52,211,153,0.8)]" }, // Medium green
          { bg: "bg-[#10B981]", shadow: "shadow-[0_0_12px_rgba(16,185,129,0.8)]" }, // Emerald
          { bg: "bg-[#6EE7B7]", shadow: "shadow-[0_0_12px_rgba(110,231,183,0.8)]" }, // Light green
        ];
        const color = colors[i % colors.length];
        const size = Math.random() > 0.7 ? "h-1.5 w-1.5" : "h-1 w-1"; // Vary sizes
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="pointer-events-none absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            <div className={`${size} rounded-full ${color.bg} ${color.shadow}`} />
          </motion.div>
        );
      })}

      {/* Code brackets and tech symbols */}
      {["{ }", "< />", "( )", "[ ]", "=>", "//", "/**/", "&&"].map((symbol, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="pointer-events-none absolute font-mono text-xs text-[#4ADE80]/30"
          style={{
            left: `${(i * 100) / 8 + Math.random() * 10}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Network connection lines */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-10">
        {[...Array(5)].map((_, i) => {
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = Math.random() * 100;
          const y2 = Math.random() * 100;
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="rgba(74, 222, 128, 0.3)"
              strokeWidth="1"
              animate={{
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
              }}
            />
          );
        })}
      </svg>

      {/* Glowing network nodes - Enhanced professional look */}
      {[...Array(12)].map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        // Vary node colors
        const nodeColors = [
          { main: "bg-[#4ADE80]", shadow: "shadow-[0_0_15px_rgba(74,222,128,1)]" },
          { main: "bg-[#34D399]", shadow: "shadow-[0_0_15px_rgba(52,211,153,1)]" },
          { main: "bg-[#10B981]", shadow: "shadow-[0_0_15px_rgba(16,185,129,1)]" },
        ];
        const nodeColor = nodeColors[i % nodeColors.length];
        
        return (
          <motion.div
            key={`node-${i}`}
            className="pointer-events-none absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <div className="relative">
              <div className={`h-2 w-2 rounded-full ${nodeColor.main} ${nodeColor.shadow}`} />
              <motion.div
                animate={{
                  scale: [1, 2.5, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className={`absolute inset-0 h-2 w-2 rounded-full ${nodeColor.main}`}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Scanning line effect */}
      <motion.div
        animate={{
          y: ["-100%", "200%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ADE80]/50 to-transparent shadow-[0_0_10px_rgba(74,222,128,0.5)]"
      />

      {/* Content - NO initial animation, appears immediately */}
      <div className="relative mx-auto max-w-4xl text-center z-10">
        <div>
          {/* Badge */}
          {badge && (
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4ADE80]/25 bg-[#4ADE80]/[0.08] px-5 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#4ADE80] backdrop-blur-sm shadow-[0_8px_32px_rgba(74,222,128,0.15)]">
                {badge.icon}
                {badge.text}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            {subtitle}
          </p>

          {/* Additional content */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
