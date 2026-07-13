import type { Metadata } from "next";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getOpenRoles, getCultureStatement, getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description: "Open roles at GrowViaSphere across fitness, operations, member experience, and corporate sales.",
  path: "/careers",
  imageKey: "about-facility",
});

export default function CareersPage() {
  const roles = getOpenRoles();
  const culture = getCultureStatement();
  const site = getSiteInfo();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the membership you'd actually use"
        subtitle="We're a small team building a category that doesn't exist elsewhere in Delhi NCR yet."
        imageKey="about-facility"
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Culture</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">How we work</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">{culture}</p>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Open roles</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Current openings</h2>
        </div>
        <div className="mt-10 flex flex-col divide-y divide-border-brand rounded-2xl border border-border-brand bg-surface">
          {roles.map((role) => (
            <div key={role.id} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <Briefcase className="mt-1 size-5 shrink-0 text-bronze" />
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{role.title}</p>
                  <p className="text-sm text-ink-secondary">
                    {role.department} · {role.location} · {role.type}
                  </p>
                </div>
              </div>
              <a
                href={`mailto:${site.email}?subject=Application: ${encodeURIComponent(role.title)}`}
                className="shrink-0 text-sm font-semibold text-bronze hover:underline"
              >
                Apply →
              </a>
            </div>
          ))}
        </div>
      </Section>

      <CTABand
        title="Don't see the right role?"
        body="We're always open to hearing from people who'd genuinely use the membership."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
