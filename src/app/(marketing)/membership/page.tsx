import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { PricingCards } from "@/components/sections/PricingCards";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getTiers, getFeatureMatrix } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Membership & Pricing",
  description:
    "Compare GrowViaSphere membership tiers — Wellness Only, Work + Wellness, Founder Access, Corporate Team, and Day Pass — and join in minutes.",
  path: "/membership",
  imageKey: "hero-home",
});

export default function MembershipPage() {
  const tiers = getTiers();
  const featureMatrix = getFeatureMatrix();

  return (
    <>
      <PageHero
        eyebrow="Membership & Pricing"
        title="One membership, five ways to use it"
        subtitle="Pick the tier that matches your week. Every plan is month-to-month — upgrade, downgrade, or cancel any time."
        imageKey="hero-home"
      />

      <Section tone="paper" id="join">
        <PricingCards tiers={tiers} />
        <PlaceholderNotice>
          Illustrative example pricing — figures shown are for demonstration only and will be confirmed before
          launch.
        </PlaceholderNotice>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Compare in detail</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Full feature comparison</h2>
        </div>
        <div className="mt-10">
          <ComparisonTable tiers={tiers} featureRows={featureMatrix} />
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center text-sm text-ink-secondary">
          <p>
            Provisioning memberships for a team instead of yourself? See{" "}
            <Link href="/corporate" className="font-medium text-bronze hover:underline">
              Corporate Partnerships
            </Link>{" "}
            for bulk pricing and GST invoicing, or check the{" "}
            <Link href="/faq" className="font-medium text-bronze hover:underline">
              FAQ
            </Link>{" "}
            for billing and cancellation details.
          </p>
        </div>
      </Section>

      <CTABand
        title="Still deciding?"
        body="Book a tour and try the space before you commit to a tier."
        primaryCta={{ label: "Book a Tour", href: "/contact" }}
        secondaryCta={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
