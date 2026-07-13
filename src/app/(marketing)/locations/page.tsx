import type { Metadata } from "next";
import { MapPin, Clock, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Locations",
  description: "Visit GrowViaSphere in Gurugram, Delhi NCR — address, hours, and directions.",
  path: "/locations",
  imageKey: "locations-exterior",
});

export default function LocationsPage() {
  const site = getSiteInfo();
  const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <PageHero
        eyebrow="Locations"
        title="Visit us in Gurugram"
        subtitle="One address, four verticals — come see the space before you join."
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

      <CTABand
        title="Planning a visit?"
        body="Book a tour and we'll walk you through the fitness floor, co-working desks, café, and meeting rooms."
        primaryCta={{ label: "Book a Tour", href: "/contact" }}
        secondaryCta={{ label: "See Membership Plans", href: "/membership" }}
      />
    </>
  );
}
