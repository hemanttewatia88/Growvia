import type { Metadata } from "next";
import { MapPin, Clock, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessSchema, breadcrumbSchema } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Locations",
  description:
    "Visit GrowViaSphere's flagship centre in Sector 44, Gurugram, Delhi NCR — address, hours, parking, and directions.",
  path: "/locations",
  imageKey: "locations-exterior",
});

export default function LocationsPage() {
  const site = getSiteInfo();
  const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }])} />
      <PageHero
        eyebrow="Locations"
        title="Visit our flagship centre in Gurugram"
        subtitle="One address, four verticals — come see the space before you join. It's the first of a planned network of GrowViaSphere centres across Delhi NCR."
        imageKey="locations-exterior"
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 shrink-0 text-bronze" />
              <div>
                <p className="font-display text-lg font-semibold text-ink">{site.name} — Gurugram</p>
                <p className="mt-1 text-sm text-ink-secondary">{fullAddress}</p>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3">
              <Clock className="mt-1 size-5 shrink-0 text-bronze" />
              <div className="text-sm text-ink-secondary">
                {site.hours.map((h) => (
                  <p key={h.day}>
                    {h.day}: {h.open} – {h.close}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3">
              <Phone className="mt-1 size-5 shrink-0 text-bronze" />
              <div className="text-sm text-ink-secondary">
                <p>{site.phone}</p>
                <p>{site.email}</p>
              </div>
            </div>
            <PlaceholderNotice>Placeholder address for demonstration — to be confirmed before launch.</PlaceholderNotice>
          </div>
          <MapEmbed query={fullAddress} title={`Map showing ${site.name} location`} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Getting here</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">By metro, car, or on foot</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              The centre sits a short walk from the nearest Rapid Metro station, making it an easy add-on to a
              commute rather than a detour from it. If you&apos;re driving in, on-site basement parking is available
              for both members and guests — no need to circle the block or hunt for a paid lot nearby.
            </p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">More centres coming</span>
            <h2 className="mt-3 font-display text-2xl font-semibold text-ink">Gurugram is the first, not the only</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              This Sector 44 centre is GrowViaSphere&apos;s flagship — the model we&apos;re refining before expanding
              to more addresses across Delhi NCR&apos;s other business hubs. Members who join early get first access
              as new centres come online.
            </p>
          </div>
        </div>
      </Section>

      <CTABand
        title="Planning a visit?"
        body="Book a tour and we'll walk you through the fitness floor, co-working desks, café, and meeting rooms."
        primaryCta={{ label: "Book a Tour", href: "/contact" }}
        secondaryCta={{ label: "See Membership Plans", href: "/membership" }}
      />
    </>
  );
}
