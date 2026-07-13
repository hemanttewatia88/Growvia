"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades + slides content in the first time it scrolls into view. Renders immediately visible
 * (no observer, no transition) under prefers-reduced-motion — checked once on mount since this
 * is a client component and matchMedia isn't available during SSR.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [skipAnimation] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skipAnimation]);

  return (
    <div
      ref={ref}
      className={cn(
        !skipAnimation && "transition-all duration-700 ease-out",
        !skipAnimation && (visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"),
        className,
      )}
      style={!skipAnimation && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
