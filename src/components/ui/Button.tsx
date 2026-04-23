import type { ReactNode } from "react";
import { AppLink } from "./AppLink";

export function PrimaryButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const classes = `group relative inline-flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#16A34A_0%,#15803D_50%,#166534_100%)] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_4px_25px_rgba(22,163,74,0.35)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(22,163,74,0.5)] hover:-translate-y-1 active:scale-[0.98] ${className}`;

  if (href) {
    return <AppLink href={href} className={classes}>{children}</AppLink>;
  }
  return <button className={classes}>{children}</button>;
}

export function SecondaryButton({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#16A34A]/20 bg-white px-8 py-4 text-[15px] font-semibold text-[#16A34A] transition-all duration-300 hover:border-[#16A34A]/40 hover:bg-[#16A34A]/[0.04] hover:-translate-y-1 ${className}`;

  if (href) {
    return <AppLink href={href} className={classes}>{children}</AppLink>;
  }
  return <button className={classes}>{children}</button>;
}
