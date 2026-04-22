import type { ReactNode } from "react";
import { AnimatedSection } from "./AnimatedSection";

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: {
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <AnimatedSection
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "items-start text-left"}`}
    >
      <div className="h-[4px] w-16 rounded-full bg-gradient-to-r from-[#16A34A] via-[#34D399] to-[#A3E635]" />
      <div className={`max-w-2xl space-y-4 ${centered ? "text-center" : "text-left"}`}>
        <h2 className="text-3xl font-bold leading-tight text-[#111827] md:text-4xl lg:text-[44px] lg:leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg leading-relaxed text-[#6B7280]">{subtitle}</p>
        )}
      </div>
    </AnimatedSection>
  );
}
