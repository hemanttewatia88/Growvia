import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { MenuHighlights } from "@/components/sections/MenuHighlights";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getMenu, getCafeHours } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Café & Nutrition",
  description:
    "A specialty café with dietitian-curated, performance-oriented menu options alongside all-day coffee-shop classics.",
  path: "/cafe-nutrition",
  imageKey: "vertical-cafe",
});

export default function CafeNutritionPage() {
  const menu = getMenu();
  const hours = getCafeHours();

  return (
    <>
      <PageHero
        eyebrow="Café & Nutrition"
        title="Food that fits the way you train and work"
        subtitle="A specialty café with dietitian-curated, performance-oriented options alongside the coffee-and-conversation classics."
        imageKey="vertical-cafe"
        video={{
          src: "/videos/hero-cafe.mp4",
          poster: "/videos/hero-cafe-poster.jpg",
          alt: "An espresso being pulled at the café counter",
        }}
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Menu highlights</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Fuel for training days and workdays</h2>
        </div>
        <div className="mt-10">
          <MenuHighlights groups={menu} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border-brand bg-surface p-8 text-center">
          <Clock className="size-6 text-bronze" />
          <p className="font-display text-lg font-semibold text-ink">Café hours</p>
          <div className="flex flex-col gap-1 text-sm text-ink-secondary">
            {hours.map((h) => (
              <p key={h.day}>
                {h.day}: {h.open} – {h.close}
              </p>
            ))}
          </div>
          <p className="text-xs text-ink-muted">Members get ordering priority during peak hours.</p>
        </div>
      </Section>

      <CTABand
        title="Skip the coffee-shop detour"
        body="Order from your desk and pick it up between meetings — it's all in the same building."
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "Explore Co-Working", href: "/co-working" }}
      />
    </>
  );
}
