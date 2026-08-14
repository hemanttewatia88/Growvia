"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Next's `template.tsx` convention re-mounts on every navigation (unlike `layout.tsx`,
 * which persists) — so wrapping `children` here gives every route change a brief fade +
 * rise-in transition instead of an abrupt content swap. Mirrors Reveal's skip-under-
 * reduced-motion behavior, checked once on mount since matchMedia isn't available in SSR.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [skipAnimation] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(skipAnimation);

  useEffect(() => {
    if (skipAnimation) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [skipAnimation]);

  return (
    <div
      className={cn(
        !skipAnimation && "transition-all duration-500 ease-out",
        !skipAnimation && (visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"),
      )}
    >
      {children}
    </div>
  );
}
