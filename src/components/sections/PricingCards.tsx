import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MembershipTier } from "@/types/content";

export function PricingCards({ tiers }: { tiers: MembershipTier[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className={cn(
            "flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
            tier.highlighted ? "border-gold bg-navy text-ink-on-dark shadow-lg" : "border-border-brand bg-surface text-ink",
          )}
        >
          {tier.highlighted && (
            <span className="mb-3 inline-flex w-fit items-center rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy">
              Most popular
            </span>
          )}
          <p className="font-display text-xl font-semibold">{tier.name}</p>
          <p className={cn("mt-1 text-sm", tier.highlighted ? "text-ink-on-dark/70" : "text-ink-secondary")}>
            {tier.audience}
          </p>
          <div className="mt-5 flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-semibold">{tier.priceLabel}</span>
            <span className={cn("text-sm", tier.highlighted ? "text-ink-on-dark/60" : "text-ink-muted")}>
              {tier.billingCycle}
            </span>
          </div>
          {tier.priceNote && (
            <p className={cn("mt-1 text-xs", tier.highlighted ? "text-ink-on-dark/50" : "text-ink-muted")}>
              {tier.priceNote}
            </p>
          )}
          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
            {tier.inclusions.map((inclusion) => (
              <li key={inclusion} className="flex items-start gap-2 text-sm">
                <Check className={cn("mt-0.5 size-4 shrink-0", tier.highlighted ? "text-gold-light" : "text-sage-deep")} />
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
          <Button
            asChild
            size="lg"
            variant={tier.highlighted ? "default" : "outline"}
            className="mt-6 rounded-full"
          >
            <Link href={tier.ctaHref}>{tier.ctaLabel}</Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
