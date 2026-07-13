import type { Metadata } from "next";
import Image from "next/image";
import { HeartPulse, Users2, Sparkles } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getVerticals, getLeadership, getImage } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "GrowViaSphere combines fitness, co-working, café, and meeting rooms under one membership in Delhi NCR. Learn our story, mission, and the team behind it.",
  path: "/about",
  imageKey: "about-story",
});

export default function AboutPage() {
  const verticals = getVerticals();
  const leadership = getLeadership();
  const storyImage = getImage("about-story");
  const facilityImage = getImage("about-facility");

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="We built the membership we couldn't find"
        subtitle="GrowViaSphere started with a simple frustration: fitness, work, food, and meetings were scattered across four unrelated vendors. We put them under one roof instead."
        imageKey="about-story"
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Our story</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Built for professionals whose day doesn&apos;t fit one category
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              Delhi NCR has excellent gyms, excellent co-working spaces, and excellent cafés — separately. For a
              founder or senior professional trying to fit a workout, a full workday, and a client meeting into one
              day, that separation is the actual problem. GrowViaSphere exists to close that gap: one membership,
              one address, four things you already needed.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={storyImage.src} alt={storyImage.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Mission &amp; vision</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
            Infrastructure for a working life that doesn&apos;t happen in one place anymore
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Our mission is to give professionals back the time lost to fragmented logistics. Our vision is a network
            of GrowViaSphere centres across India&apos;s major business hubs, each built around the same four
            verticals and the same standard of quality.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">The four-vertical concept</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Fitness, co-working, café, meeting rooms</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Each vertical works well on its own — together, under one membership, they remove the travel time
            between the parts of your day that already matter to you.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verticals.map((v) => (
            <div key={v.id} className="rounded-2xl border border-border-brand bg-surface p-5">
              <p className="font-display text-lg font-semibold text-ink">{v.name}</p>
              <p className="mt-1.5 text-sm text-ink-secondary">{v.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Community values</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">What we hold ourselves to</h2>
        </div>
        <div className="mt-10">
          <FeatureGrid
            columns={3}
            items={[
              {
                icon: HeartPulse,
                title: "Health as infrastructure",
                body: "Fitness isn't a perk bolted onto a workspace — it's designed in as a daily, usable part of the membership.",
              },
              {
                icon: Users2,
                title: "Community over crowd",
                body: "We invest in recurring, small-scale events over one-off launches, because relationships compound with repetition.",
              },
              {
                icon: Sparkles,
                title: "Premium, used daily",
                body: "Every space is built to be used every day by real members, not just to photograph well once.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:order-2">
            <Image src={facilityImage.src} alt={facilityImage.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:order-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Facility highlights</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Designed to be used, not just seen</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              A dedicated strength and functional training floor, a studio for daily classes, an open co-working
              floor with private pods, a specialty café, and soundproofed meeting rooms sized from a 4-person huddle
              room to a 12-person boardroom.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Leadership</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">The team behind GrowViaSphere</h2>
        </div>
        <div className="mt-10">
          <TeamGrid people={leadership} />
        </div>
        <PlaceholderNotice>Illustrative placeholder bios — to be replaced with real leadership profiles before launch.</PlaceholderNotice>
      </Section>

      <CTABand
        title="Come see the space for yourself"
        body="Book a tour and walk through the fitness floor, co-working desks, café, and meeting rooms in person."
        primaryCta={{ label: "Book a Tour", href: "/contact" }}
        secondaryCta={{ label: "View Membership Plans", href: "/membership" }}
      />
    </>
  );
}
