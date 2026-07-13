import type { Metadata } from "next";
import { Dumbbell, HeartPulse, Users } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getClasses, getTrainers, getFitnessAssessment, getPersonalTraining } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Fitness",
  description:
    "A full strength and functional training floor plus daily yoga, HIIT, and Zumba classes — programmed for people training around a packed calendar.",
  path: "/fitness",
  imageKey: "vertical-fitness",
});

export default function FitnessPage() {
  const classes = getClasses();
  const trainers = getTrainers();
  const assessment = getFitnessAssessment();
  const personalTraining = getPersonalTraining();

  return (
    <>
      <PageHero
        eyebrow="Fitness"
        title="Train with intent, not just intensity"
        subtitle="A full-equipment strength floor, functional training zone, and a studio running classes daily — programmed for people who train around a packed calendar."
        imageKey="vertical-fitness"
        video={{
          src: "/videos/hero-fitness.mp4",
          poster: "/videos/hero-fitness-poster.jpg",
          alt: "A member powering through a weightlifting session on the fitness floor",
        }}
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "Book a Fitness Assessment", href: "/contact" }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Facilities</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Everything on one floor</h2>
        </div>
        <div className="mt-10">
          <FeatureGrid
            columns={3}
            items={[
              {
                icon: Dumbbell,
                title: "Strength & functional floor",
                body: "Free weights, plate-loaded machines, and a functional training zone for conditioning and mobility work.",
              },
              {
                icon: Users,
                title: "Daily group classes",
                body: "Yoga, HIIT, strength circuits, and Zumba scheduled around the workday — early morning, lunch, and evening slots.",
              },
              {
                icon: HeartPulse,
                title: "Recovery & mobility",
                body: "Dedicated stretching and mobility sessions to offset long hours at a desk or on the road.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Class schedule</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">A class for every part of your day</h2>
        </div>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border-brand">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-brand bg-muted">
                <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Class</th>
                <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Level</th>
                <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Days</th>
                <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Time</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((c) => (
                <tr key={c.id} className="border-b border-border-brand last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{c.name}</p>
                    <p className="text-xs text-ink-muted">{c.description}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">{c.level}</td>
                  <td className="px-4 py-3 text-ink-secondary">{c.days.join(", ")}</td>
                  <td className="px-4 py-3 text-ink-secondary">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-border-brand bg-surface p-6">
            <p className="font-display text-lg font-semibold text-ink">{assessment.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{assessment.description}</p>
          </div>
          <div className="rounded-2xl border border-border-brand bg-surface p-6">
            <p className="font-display text-lg font-semibold text-ink">{personalTraining.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{personalTraining.description}</p>
            <p className="mt-3 text-sm font-semibold text-bronze">{personalTraining.priceLabel}</p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Trainers</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Coaches who plan around your week</h2>
        </div>
        <div className="mt-10">
          <TeamGrid people={trainers} />
        </div>
        <PlaceholderNotice>Illustrative placeholder trainer profiles — to be replaced before launch.</PlaceholderNotice>
      </Section>

      <CTABand
        title="Ready to train here?"
        body="Every membership includes a complimentary fitness assessment and unlimited group classes."
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "See Membership Tiers", href: "/membership" }}
      />
    </>
  );
}
