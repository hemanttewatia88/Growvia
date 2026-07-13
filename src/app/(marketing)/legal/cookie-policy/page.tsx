import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { LegalReviewNotice } from "@/components/sections/LegalReviewNotice";
import { buildMetadata } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy",
  description: `How ${getSiteInfo().name} uses cookies and similar technologies on this website.`,
  path: "/legal/cookie-policy",
});

export default function CookiePolicyPage() {
  const site = getSiteInfo();

  return (
    <Section tone="paper" containerSize="narrow">
      <LegalReviewNotice />
      <article>
        <h1 className="font-display text-3xl font-semibold text-ink">Cookie Policy</h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: [date to be confirmed at launch]</p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">1. What are cookies</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Cookies are small text files stored on your device that help websites function and remember your
          preferences. {site.name} uses cookies and similar technologies for the purposes described below.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">2. Types of cookies we use</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          <strong className="font-semibold text-ink">Essential cookies</strong> keep the website and member
          dashboard functioning (e.g., keeping you signed in). <strong className="font-semibold text-ink">
            Analytics cookies
          </strong>{" "}
          (such as Google Analytics, where enabled) help us understand how visitors use our site so we can improve
          it. We do not use cookies for third-party advertising.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">3. Managing cookies</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Most browsers let you control or disable cookies through their settings. Disabling essential cookies may
          affect the functionality of the member dashboard and booking tools.
        </p>

        <h2 className="mt-8 font-display text-xl font-semibold text-ink">4. Contact us</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Questions about this policy can be sent to {site.email}.
        </p>
      </article>
    </Section>
  );
}
