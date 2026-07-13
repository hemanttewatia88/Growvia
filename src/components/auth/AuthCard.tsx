import type { ReactNode } from "react";
import { LogoLockup } from "@/components/layout/Logo";

export function AuthCard({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string | undefined;
  children: ReactNode;
  footer?: ReactNode | undefined;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navy-mid p-8 text-ink-on-dark shadow-xl">
        <LogoLockup />
        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-gold-light">{eyebrow}</p>
        <h1 className="mt-2 font-display text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink-on-dark/70">{subtitle}</p>}
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 border-t border-white/10 pt-5 text-sm">{footer}</div>}
      </div>
    </div>
  );
}
