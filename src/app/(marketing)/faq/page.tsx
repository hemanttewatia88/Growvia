import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, faqPageSchema } from "@/lib/seo";
import { getFaqs, getFaqsByCategory } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about GrowViaSphere membership, billing, guest policy, cancellation, and corporate plans.",
  path: "/faq",
  imageKey: "hero-home",
});

export default function FaqPage() {
  const faqs = getFaqs();
  const groups = getFaqsByCategory();

  return (
    <>
      <JsonLd schema={faqPageSchema(faqs)} />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="Membership, billing, guest policy, cancellation, and corporate plans — everything in one place."
        imageKey="hero-home"
      />

      <Section tone="paper" containerSize="narrow">
        <FaqAccordion groups={groups} />
      </Section>

      <CTABand
        title="Still have a question?"
        body="Our team responds within one business day."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        secondaryCta={{ label: "See Membership Tiers", href: "/membership" }}
      />
    </>
  );
}
