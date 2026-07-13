import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface CtaAction {
  label: string;
  href: string;
}

interface CTABandProps {
  title: string;
  body?: string;
  primaryCta: CtaAction;
  secondaryCta?: CtaAction;
  tone?: "navy" | "gold";
}

export function CTABand({ title, body, primaryCta, secondaryCta, tone = "navy" }: CTABandProps) {
  const isGold = tone === "gold";

  return (
    <section className={cn("relative overflow-hidden py-16 sm:py-20", isGold ? "bg-gold text-navy" : "bg-navy text-ink-on-dark")}>
      <div
        aria-hidden="true"
        className={cn(
          "motion-safe:animate-pulse pointer-events-none absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
          isGold ? "bg-white/25" : "bg-gold/20",
        )}
        style={{ animationDuration: "4s" }}
      />
      <Container size="narrow" className="relative flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
        {body && <p className={cn("max-w-xl text-sm sm:text-base", isGold ? "text-navy/80" : "text-ink-on-dark/80")}>{body}</p>}
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className={cn(
              "rounded-full px-6 transition-transform hover:scale-105",
              isGold && "bg-navy text-ink-on-dark hover:bg-navy/85",
            )}
          >
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {secondaryCta && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "rounded-full px-6 transition-transform hover:scale-105",
                isGold
                  ? "border-navy/30 bg-transparent text-navy hover:bg-navy/10"
                  : "border-white/30 bg-transparent text-ink-on-dark hover:bg-white/10 hover:text-ink-on-dark",
              )}
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
