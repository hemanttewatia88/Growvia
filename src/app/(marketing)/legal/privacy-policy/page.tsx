import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { LegalReviewNotice } from "@/components/sections/LegalReviewNotice";
import { buildMetadata } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${getSiteInfo().name} collects, uses, and protects your personal data.`,
  path: "/legal/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const site = getSiteInfo();

  return (
    <Section tone="paper" containerSize="narrow">
      <LegalReviewNotice />
      <article className="prose-legal">
        <h1 className="font-display text-3xl font-semibold text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: [date to be confirmed at launch]</p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">1. Introduction</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          {site.legalName} (&quot;{site.name}&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy and is
          committed to protecting the personal data you share with us through our website, membership application,
          and member services. This policy explains what we collect, why, and the choices you have, in line with
          India&apos;s Digital Personal Data Protection Act (DPDP Act) and applicable data protection principles.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">2. Information we collect</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          We collect information you provide directly (name, email, phone number, billing details, membership
          preferences) and information collected automatically (device information, usage data, cookies — see our{" "}
          <a href="/legal/cookie-policy" className="text-bronze hover:underline">
            Cookie Policy
          </a>
          ).
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">3. How we use your information</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          We use your information to provide and manage your membership, process payments, communicate with you
          about your account and bookings, improve our services, and meet legal and regulatory obligations. We do
          not sell your personal data.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">4. Consent</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          By registering for a {site.name} account or membership, you consent to the collection and processing of
          your personal data as described in this policy. You may withdraw consent at any time, subject to legal
          and contractual limitations, by contacting us.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">5. Your rights</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          You may request access to, correction of, or deletion of your personal data, and may request an export of
          your data, by writing to {site.email}. We will respond within a reasonable timeframe as required by
          applicable law.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">6. Data security</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          We use industry-standard safeguards, including encrypted connections and hashed password storage, to
          protect your personal data against unauthorized access, alteration, or disclosure.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">7. Contact us</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Questions about this policy or your data can be sent to {site.email} or {site.phone}.
        </p>
      </article>
    </Section>
  );
}
