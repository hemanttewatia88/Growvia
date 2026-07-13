import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { LegalReviewNotice } from "@/components/sections/LegalReviewNotice";
import { buildMetadata } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: `The terms governing your use of ${getSiteInfo().name}'s website and membership.`,
  path: "/legal/terms-of-service",
});

export default function TermsOfServicePage() {
  const site = getSiteInfo();

  return (
    <Section tone="paper" containerSize="narrow">
      <LegalReviewNotice />
      <article>
        <h1 className="font-display text-3xl font-semibold text-ink">Terms of Service</h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: [date to be confirmed at launch]</p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">1. Acceptance of terms</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          By accessing this website or purchasing a {site.name} membership, you agree to be bound by these Terms of
          Service. If you do not agree, please do not use our website or services.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">2. Membership</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Membership tiers, inclusions, and pricing are described on our Membership &amp; Pricing page and may be
          updated from time to time. Individual memberships are billed monthly and may be paused or cancelled as
          described in our Refund &amp; Cancellation Policy.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">3. Facility use and conduct</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Members agree to use the fitness, co-working, café, and meeting-room facilities responsibly, to follow
          posted guidelines and staff instructions, and to treat other members and staff with respect. We reserve
          the right to suspend or terminate membership for conduct that violates these terms.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">4. Assumption of risk</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Physical activity carries inherent risk of injury. Members participate in fitness activities, classes,
          and personal training at their own risk and are encouraged to consult a physician before beginning any
          new exercise program.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">5. Payments</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Membership fees are billed in advance on a monthly basis (or per the terms of a Corporate Team agreement)
          via the payment method on file. Failed payments may result in suspension of access until resolved.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">6. Limitation of liability</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          To the fullest extent permitted by law, {site.name} is not liable for indirect, incidental, or
          consequential damages arising from your use of our facilities or website.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">7. Changes to these terms</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          We may update these Terms of Service from time to time. Continued use of our services after changes take
          effect constitutes acceptance of the revised terms.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">8. Contact us</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Questions about these terms can be sent to {site.email}.
        </p>
      </article>
    </Section>
  );
}
