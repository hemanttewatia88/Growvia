import type { Metadata } from "next";
import { site } from "@/content/site";
import { getImage } from "@/content/images";
import type { BlogPost, FaqItem } from "@/types/content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://growviasphere.com").replace(/\/$/, "");
export const SITE_NAME = site.name;

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  imageKey?: string;
  type?: "website" | "article";
}

export function buildMetadata({ title, description, path, imageKey, type = "website" }: BuildMetadataArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = getImage(imageKey ?? "default-og");
  const absoluteImage = `${SITE_URL}${image.src}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_IN",
      type,
      images: [{ url: absoluteImage, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.area}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: site.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: site.socials.map((s) => s.url),
    image: `${SITE_URL}${getImage("hero-home").src}`,
    priceRange: "₹₹₹",
  };
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function aggregateRatingSchema(ratingValue: number, reviewCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount,
    },
  };
}

export function blogPostingSchema(post: BlogPost) {
  const image = getImage(post.imageKey);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    image: `${SITE_URL}${image.src}`,
    publisher: {
      "@type": "Organization",
      name: site.name,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}
