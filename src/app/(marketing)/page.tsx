import type { Metadata } from "next";
import { Sparkles, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { VerticalOverview } from "@/components/sections/VerticalOverview";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PricingCards } from "@/components/sections/PricingCards";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { SocialFeedPlaceholder } from "@/components/sections/SocialFeedPlaceholder";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessSchema } from "@/lib/seo";
import { getVerticals, getTiers, getSiteInfo } from "@/lib/content";
import { getTestimonials } from "@/lib/content-cms";

export const metadata: Metadata = buildMetadata({
  title: "Fitness, Co-Working, Café & Meeting Rooms in One Membership",
  description:
    "GrowViaSphere is a premium integrated membership in Delhi NCR combining a fitness floor, co-working desks, a specialty café, and meeting rooms — one address, one membership.",
  path: "/",
  imageKey: "hero-home",
});

export default async function HomePage() {
  const site = getSiteInfo();
  const verticals = getVerticals();
  const tiers = getTiers().slice(0, 3);
  const testimonials = await getTestimonials();

  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <PageHero
        eyebrow="Delhi NCR · One Membership"
        title="Fitness, work, food, and meetings — under one roof"
        subtitle={site.tagline}
        imageKey="hero-home"
        variant="home"
        videos={[
          {
            src: "/videos/hero-fitness.mp4",
            poster: "/videos/hero-fitness-poster.jpg",
            alt: "A member powering through a weightlifting session on the fitness floor",
            label: "Fitness",
          },
          {
            src: "/videos/hero-coworking.mp4",
            poster: "/videos/hero-coworking-poster.jpg",
            alt: "A member working on a laptop at a co-working desk surrounded by plants",
            label: "Co-Working",
          },
          {
            src: "/videos/hero-cafe.mp4",
            poster: "/videos/hero-cafe-poster.jpg",
            alt: "An espresso being pulled at the café counter",
            label: "Café",
          },
          {
            src: "/videos/hero-meeting.mp4",
            poster: "/videos/hero-meeting-poster.jpg",
            alt: "A team collaborating around the table in a meeting room",
            label: "Meeting Rooms",
          },
        ]}
        primaryCta={{ label: "Become a Member", href: "/membership#join" }}
        secondaryCta={{ label: "Book a Tour", href: "/contact" }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Why we exist</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            One membership instead of four vendors
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary">
            Most high-performing professionals assemble their workday from a gym membership, a co-working day pass,
            a café tab, and a rented meeting room — each with its own hours, its own app, and its own commute.
            GrowViaSphere puts all four under one address and one membership.
          </p>
        </div>
        <div className="mt-12">
          <VerticalOverview verticals={verticals} />
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Why GrowViaSphere</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Built for people whose day doesn&apos;t fit one category
          </h2>
        </div>
        <div className="mt-12">
          <FeatureGrid
            columns={4}
            items={[
              {
                icon: TrendingUp,
                title: "Fewer transitions",
                body: "Fitness, work, food, and meetings in one building means fewer commutes between the parts of your day that matter.",
              },
              {
                icon: ShieldCheck,
                title: "No lock-in",
                body: "Month-to-month membership with the flexibility to switch tiers or pause whenever your needs change.",
              },
              {
                icon: Users,
                title: "A real community",
                body: "Recurring networking breakfasts and wellness workshops with people who share your building, not just your industry.",
              },
              {
                icon: Sparkles,
                title: "Premium, not padded",
                body: "Every space is designed to be used daily, not just photographed once — quality where it matters.",
              },
            ]}
          />
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Membership</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Plans built around how you actually use the space
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              From fitness-only access to a fully loaded Founder Access plan with a dedicated desk and personal
              training — pick the tier that matches your week, and switch any time.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <PricingCards tiers={tiers} />
        </div>
      </Section>

      <CTABand
        tone="gold"
        title="Provisioning memberships for your team?"
        body="Bulk seats across fitness, co-working, and meeting rooms with consolidated GST invoicing and a dedicated account manager."
        primaryCta={{ label: "Explore Corporate Partnerships", href: "/corporate" }}
        secondaryCta={{ label: "See Membership Tiers", href: "/membership" }}
      />

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Testimonials</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">What members are saying</h2>
        </div>
        <div className="mt-10">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
        <PlaceholderNotice>
          Illustrative example testimonials — to be replaced with verified member and corporate reviews before launch.
        </PlaceholderNotice>
      </Section>

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Community</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Follow along</h2>
        </div>
        <div className="mt-10">
          <SocialFeedPlaceholder />
        </div>
      </Section>
    </>
  );
}
