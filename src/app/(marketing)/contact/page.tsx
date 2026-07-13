import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapEmbed } from "@/components/sections/MapEmbed";
import { buildMetadata } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: "Get in touch with GrowViaSphere — book a tour, ask a question, or reach our team directly.",
  path: "/contact",
  imageKey: "hero-home",
});

export default function ContactPage() {
  const site = getSiteInfo();
  const fullAddress = `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk"
        subtitle="Book a tour, ask about membership, or get in touch with our team directly."
        imageKey="hero-home"
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Send us a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">Other ways to reach us</h2>
            <div className="mt-6 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 size-5 shrink-0 text-bronze" />
                <div>
                  <p className="text-sm font-medium text-ink">Phone</p>
                  <p className="text-sm text-ink-secondary">{site.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-5 shrink-0 text-bronze" />
                <div>
                  <p className="text-sm font-medium text-ink">Email</p>
                  <p className="text-sm text-ink-secondary">{site.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-bronze" />
                <div>
                  <p className="text-sm font-medium text-ink">Address</p>
                  <p className="text-sm text-ink-secondary">{fullAddress}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-1 size-5 shrink-0 text-bronze" />
                <div>
                  <p className="text-sm font-medium text-ink">Live chat</p>
                  <p className="text-sm text-ink-secondary">
                    Use the chat button in the corner of any page for a quick response.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <MapEmbed query={fullAddress} title={`Map showing ${site.name} location`} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
