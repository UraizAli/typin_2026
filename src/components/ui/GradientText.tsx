import type { ReactNode } from "react";

export function GradientText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-[linear-gradient(135deg,#16A34A_0%,#34D399_50%,#A3E635_100%)] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
