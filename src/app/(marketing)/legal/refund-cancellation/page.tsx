import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { LegalReviewNotice } from "@/components/sections/LegalReviewNotice";
import { buildMetadata } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Refund & Cancellation Policy",
  description: `How to pause, cancel, or request a refund on a ${getSiteInfo().name} membership.`,
  path: "/legal/refund-cancellation",
});

export default function RefundCancellationPage() {
  const site = getSiteInfo();

  return (
    <Section tone="paper" containerSize="narrow">
      <LegalReviewNotice />
      <article>
        <h1 className="font-display text-3xl font-semibold text-ink">Refund & Cancellation Policy</h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: [date to be confirmed at launch]</p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">1. Month-to-month memberships</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          All individual membership tiers are billed monthly with no minimum commitment period. You may cancel at
          any time from your account dashboard; cancellation takes effect at the end of your current billing cycle,
          and you retain access until that date.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">2. Pausing a membership</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Memberships may be paused for a limited period (details available in your account dashboard) without
          cancelling entirely — useful for travel or extended leave.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">3. Refunds</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Membership fees already billed for the current cycle are generally non-refundable, except where required
          by law or where {site.name} is unable to provide access due to a fault on our part. Day passes and
          meeting-room bookings may be refunded if cancelled with reasonable advance notice — see booking
          confirmation details for specifics.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">4. Corporate Team agreements</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Cancellation and refund terms for Corporate Team plans follow the notice period and terms set out in the
          company&apos;s signed agreement with {site.name}.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">5. How to request a cancellation or refund</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Cancel directly from your account dashboard, or contact us at {site.email} for assistance.
        </p>
      </article>
    </Section>
  );
}
