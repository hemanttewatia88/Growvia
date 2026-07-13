import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/layout/Reveal";

interface SectionProps {
  children: ReactNode;
  tone?: "paper" | "navy" | "sage" | "surface";
  className?: string;
  containerSize?: "default" | "narrow" | "wide";
  id?: string;
  /** Scroll-reveal the section's content the first time it enters the viewport. Default true. */
  animate?: boolean;
}

const TONE_CLASSES: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-paper text-ink",
  navy: "bg-navy text-ink-on-dark",
  sage: "bg-sage-light/30 text-ink",
  surface: "bg-surface text-ink",
};

export function Section({ children, tone = "paper", className, containerSize = "default", id, animate = true }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", TONE_CLASSES[tone], className)}>
      <Container size={containerSize}>{animate ? <Reveal>{children}</Reveal> : children}</Container>
    </section>
  );
}
