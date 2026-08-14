import type { Metadata } from "next";
import { site } from "@/content/site";
import { getImage } from "@/content/images";
import type { BlogPost, FaqItem, CareerRole } from "@/types/content";
import type { Event as CmsEvent } from "@prisma/client";

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

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${SITE_URL}/icon.png`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.area}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: site.socials.map((s) => s.url),
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

/** Builds a BreadcrumbList schema. Pass the trail from Home to the current page. */
export function breadcrumbSchema(trail: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: `${SITE_URL}${entry.path}`,
    })),
  };
}

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  "full-time": "FULL_TIME",
  "part-time": "PART_TIME",
  contract: "CONTRACTOR",
  internship: "INTERN",
};

/** Adds 90 days to an ISO date string (YYYY-MM-DD), returned as an ISO date string. */
function addDays(isoDate: string, days: number) {
  const d = new Date(`${isoDate}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function jobPostingSchema(role: CareerRole) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.description,
    datePosted: role.postedAt,
    validThrough: addDays(role.postedAt, 90),
    employmentType: EMPLOYMENT_TYPE_MAP[role.type.toLowerCase()] ?? "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
      logo: `${SITE_URL}/icon.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: site.address.city,
        addressRegion: site.address.state,
        addressCountry: site.address.country,
      },
    },
    directApply: true,
  };
}

/** Builds schema.org Event entries for the community events list (one per upcoming event). */
export function eventsSchema(events: CmsEvent[]) {
  return {
    "@context": "https://schema.org",
    "@graph": events.map((event) => ({
      "@type": "Event",
      name: event.title,
      description: event.description,
      startDate: event.nextDate.toISOString(),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: site.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${site.address.street}, ${site.address.area}`,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
      },
      organizer: { "@type": "Organization", name: site.name, url: site.url },
    })),
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
