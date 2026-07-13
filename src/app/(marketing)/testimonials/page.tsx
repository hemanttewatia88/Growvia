import type { Metadata } from "next";
import { Star } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { PlaceholderNotice } from "@/components/sections/PlaceholderNotice";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, aggregateRatingSchema } from "@/lib/seo";
import { getTestimonials, getAggregateRating } from "@/lib/content-cms";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials & Success Stories",
  description: "What members and corporate clients say about training, working, and meeting at GrowViaSphere.",
  path: "/testimonials",
  imageKey: "community-events",
});

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  const { ratingValue, reviewCount } = await getAggregateRating();

  return (
    <>
      <JsonLd schema={aggregateRatingSchema(ratingValue, reviewCount)} />
      <PageHero
        eyebrow="Testimonials"
        title="What members and clients say"
        subtitle="Real feedback from individual members and corporate accounts using GrowViaSphere."
        imageKey="community-events"
      />

      <Section tone="paper">
        <div className="mb-10 flex items-center justify-center gap-2 text-ink">
          <div className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={i < Math.round(ratingValue) ? "size-5 fill-gold text-gold" : "size-5 fill-transparent text-border-brand"} />
            ))}
          </div>
          <span className="text-sm font-medium">
            {ratingValue.toFixed(1)} average from {reviewCount} reviews
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-border-brand bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={i < t.rating ? "size-4 fill-gold text-gold" : "size-4 fill-transparent text-border-brand"} />
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
              <p className="mt-4 text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-ink-muted">
                {t.role} · {t.segment === "corporate" ? "Corporate account" : "Member"}
              </p>
            </div>
          ))}
        </div>
        <PlaceholderNotice>
          Illustrative example testimonials — to be replaced with verified member and corporate reviews before
          launch.
        </PlaceholderNotice>
      </Section>

      <CTABand
        title="Want to be next?"
        body="Join today and tell us about your experience — we feature real member stories here."
        primaryCta={{ label: "Join Now", href: "/membership#join" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
