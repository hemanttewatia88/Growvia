import type { Metadata } from "next";
import Image from "next/image";
import { Wifi, Printer, DoorClosed } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getWorkspaceTypes, getCoworkingAmenities, getImage } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Co-Working",
  description:
    "Hot desks, dedicated desks, and private pods with enterprise-grade WiFi and direct meeting-room access — day passes and monthly memberships available.",
  path: "/co-working",
  imageKey: "vertical-coworking",
});

export default function CoWorkingPage() {
  const workspaceTypes = getWorkspaceTypes();
  const amenities = getCoworkingAmenities();
  const image = getImage("about-story");

  return (
    <>
      <PageHero
        eyebrow="Co-Working"
        title="A desk that keeps up with your day"
        subtitle="Hot desks, dedicated desks, and private pods with enterprise-grade WiFi, printing, and direct meeting-room access."
        imageKey="vertical-coworking"
        video={{
          src: "/videos/hero-coworking.mp4",
          poster: "/videos/hero-coworking-poster.jpg",
          alt: "A member working on a laptop at a co-working desk surrounded by plants",
        }}
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "Try a Day Pass", href: "/contact" }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Workspace types</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Pick the setup that fits your week</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {workspaceTypes.map((w) => (
            <div key={w.id} className="rounded-2xl border border-border-brand bg-surface p-6">
              <p className="font-display text-lg font-semibold text-ink">{w.name}</p>
              <p className="mt-1.5 text-sm text-ink-secondary">{w.description}</p>
              <p className="mt-4 text-sm font-semibold text-bronze">{w.priceLabel}</p>
              <p className="text-xs text-ink-muted">{w.billingCycle}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {w.amenities.map((a) => (
                  <li key={a} className="text-sm text-ink-secondary before:mr-2 before:text-gold before:content-['—']">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Amenities</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Built for a full workday</h2>
            <div className="mt-6">
              <FeatureGrid
                columns={2}
                items={[
                  { icon: Wifi, title: "Enterprise WiFi", body: "Dedicated bandwidth across every space, tested for video calls." },
                  { icon: Printer, title: "Printing included", body: "Black & white and colour printing credits with every plan." },
                  { icon: DoorClosed, title: "Meeting rooms on demand", body: "Book a huddle room, meeting room, or boardroom directly from the member app." },
                ]}
              />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-secondary">
          {amenities.map((a) => (
            <li key={a} className="before:mr-2 before:text-gold before:content-['—']">
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        title="Bring your laptop and see the floor"
        body="Day passes are available at member rates — no long-term commitment required to try it out."
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "Book Meeting Rooms", href: "/meeting-rooms" }}
      />
    </>
  );
}
