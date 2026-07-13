import type { Metadata } from "next";
import { FileCheck, Handshake, BarChart3 } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CorporateInquiryForm } from "@/components/forms/CorporateInquiryForm";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getTiers } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Corporate Partnerships",
  description:
    "Bulk memberships for your team across fitness, co-working, and meeting rooms — GST invoicing, a dedicated account manager, and usage reporting for HR and wellness budgets.",
  path: "/corporate",
  imageKey: "about-facility",
});

export default function CorporatePage() {
  const corporateTier = getTiers().find((t) => t.id === "corporate-team");

  return (
    <>
      <PageHero
        eyebrow="Corporate Partnerships"
        title="A wellness-and-workspace benefit your team will actually use"
        subtitle="Bulk memberships across fitness, co-working, and meeting rooms, consolidated into one GST invoice with a dedicated account manager."
        imageKey="about-facility"
        primaryCta={{ label: "Get a Quote", href: "#quote" }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">For HR & People teams</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            One benefit line instead of three underused ones
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Most corporate wellness benefits are a discount code for a gym nobody visits. GrowViaSphere gives your
            team fitness, a real workspace, and meeting rooms for client and internal meetings — under one account
            you can actually track usage on.
          </p>
        </div>
        <div className="mt-12">
          <FeatureGrid
            columns={3}
            items={[
              {
                icon: Handshake,
                title: "Bulk seats, one contract",
                body: "Provision memberships across fitness, co-working, and meeting rooms for your whole team under a single agreement.",
              },
              {
                icon: FileCheck,
                title: "Consolidated GST invoicing",
                body: "One monthly invoice for finance, instead of reconciling individual employee reimbursements.",
              },
              {
                icon: BarChart3,
                title: "Usage reporting",
                body: "See utilization across your team to justify and optimize the wellness budget line.",
              },
            ]}
          />
        </div>
      </Section>

      {corporateTier && (
        <Section tone="surface">
          <div className="mx-auto max-w-xl rounded-2xl border border-gold/40 bg-navy p-8 text-center text-ink-on-dark">
            <p className="font-display text-2xl font-semibold">{corporateTier.name}</p>
            <p className="mt-2 text-sm text-ink-on-dark/70">{corporateTier.audience}</p>
            <ul className="mt-5 flex flex-col gap-2 text-left text-sm">
              {corporateTier.inclusions.map((inclusion) => (
                <li key={inclusion} className="before:mr-2 before:text-gold-light before:content-['—']">
                  {inclusion}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      <Section tone="paper" id="quote">
        <div className="mx-auto max-w-lg">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Request a quote</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Tell us about your team</h2>
            <p className="mt-3 text-sm text-ink-secondary">
              Our corporate partnerships team will follow up with volume pricing based on your team size and needs.
            </p>
          </div>
          <div className="mt-8">
            <CorporateInquiryForm />
          </div>
        </div>
      </Section>

      <CTABand
        title="Questions about billing or onboarding?"
        body="Check the FAQ for common corporate billing and cancellation questions."
        primaryCta={{ label: "Read the FAQ", href: "/faq" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
