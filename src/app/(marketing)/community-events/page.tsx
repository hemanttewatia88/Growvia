import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { EventList } from "@/components/sections/EventList";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getImage } from "@/lib/content";
import { getEvents } from "@/lib/content-cms";

export const metadata: Metadata = buildMetadata({
  title: "Community & Events",
  description:
    "Recurring networking breakfasts, wellness workshops, and member fitness challenges — the community side of a GrowViaSphere membership.",
  path: "/community-events",
  imageKey: "community-events",
});

const galleryKeys = ["community-events", "about-story", "vertical-coworking", "vertical-fitness"];

export default async function CommunityEventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHero
        eyebrow="Community & Events"
        title="A membership, not just a facility"
        subtitle="Recurring networking breakfasts, wellness workshops, and member fitness challenges designed to build real relationships over time."
        imageKey="community-events"
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Upcoming events</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">What&apos;s on</h2>
        </div>
        <div className="mt-10">
          <EventList events={events} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Gallery</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Around the centre</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {galleryKeys.map((key) => {
            const image = getImage(key);
            return (
              <div key={key} className="relative aspect-square overflow-hidden rounded-xl">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 25vw, 50vw" loading="lazy" className="object-cover" />
              </div>
            );
          })}
        </div>
      </Section>

      <CTABand
        title="Join the next event"
        body="Events are open to all members at no extra cost — check the schedule in your member dashboard once you join."
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
