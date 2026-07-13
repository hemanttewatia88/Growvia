import type { ImageAsset } from "@/types/content";

// Central image registry — every image referenced on the site keys through here,
// so a bulk swap to real GrowViaSphere photography before launch touches only this file.
// Filenames ending in -placeholder mark self-hosted royalty-free stock photography
// standing in for real brand photography.
export const images: Record<string, ImageAsset> = {
  "hero-home": {
    src: "/images/hero/hero-home-placeholder.jpg",
    alt: "A premium shared workspace desk with a laptop and plant beside floor-to-ceiling windows",
    width: 1600,
    height: 1000,
  },
  "vertical-fitness": {
    src: "/images/fitness/fitness-floor-placeholder.jpg",
    alt: "A well-equipped strength and functional training floor",
    width: 1200,
    height: 900,
  },
  "vertical-coworking": {
    src: "/images/coworking/coworking-floor-placeholder.jpg",
    alt: "An open co-working floor with professionals at hot desks",
    width: 1200,
    height: 900,
  },
  "vertical-cafe": {
    src: "/images/cafe/cafe-interior-placeholder.jpg",
    alt: "Hand pouring water over a specialty pour-over coffee at a café counter",
    width: 1200,
    height: 900,
  },
  "vertical-meeting-rooms": {
    src: "/images/rooms/meeting-room-placeholder.jpg",
    alt: "Professionals gesturing and discussing during a meeting, laptop open on the table",
    width: 1200,
    height: 900,
  },
  "room-huddle": {
    src: "/images/rooms/huddle-room-placeholder.jpg",
    alt: "A small team gathered around a whiteboard for a focused discussion",
    width: 1000,
    height: 750,
  },
  "room-meeting": {
    src: "/images/rooms/meeting-room-placeholder.jpg",
    alt: "Professionals gesturing and discussing during a meeting, laptop open on the table",
    width: 1000,
    height: 750,
  },
  "room-boardroom": {
    src: "/images/rooms/boardroom-placeholder.jpg",
    alt: "A spacious modern boardroom with a long wood table and glass walls",
    width: 1000,
    height: 750,
  },
  "about-story": {
    src: "/images/about/about-story-placeholder.jpg",
    alt: "Two colleagues collaborating together at a computer screen",
    width: 1200,
    height: 900,
  },
  "about-facility": {
    src: "/images/about/about-facility-placeholder.jpg",
    alt: "A clean, modern office interior with a lounge and pantry area",
    width: 1200,
    height: 900,
  },
  "community-events": {
    src: "/images/community/community-event-placeholder.jpg",
    alt: "A presenter speaking to a small seated group in a casual lounge space",
    width: 1200,
    height: 900,
  },
  "locations-exterior": {
    src: "/images/locations/location-exterior-placeholder.jpg",
    alt: "Looking up at modern glass office towers in a Delhi NCR business district",
    width: 1200,
    height: 900,
  },
  "team-founder": {
    src: "/images/team/team-portrait-1-placeholder.jpg",
    alt: "Portrait of the GrowViaSphere founder and CEO",
    width: 600,
    height: 600,
  },
  "team-fitness-head": {
    src: "/images/team/team-portrait-2-placeholder.jpg",
    alt: "Portrait of the Head of Fitness & Training",
    width: 600,
    height: 600,
  },
  "team-workspace-head": {
    src: "/images/team/team-portrait-3-placeholder.jpg",
    alt: "Portrait of the Head of Co-Working & Member Experience",
    width: 600,
    height: 600,
  },
  "team-trainer-1": {
    src: "/images/team/team-portrait-4-placeholder.jpg",
    alt: "Portrait of a strength and conditioning coach",
    width: 600,
    height: 600,
  },
  "team-trainer-2": {
    src: "/images/team/team-portrait-5-placeholder.jpg",
    alt: "Portrait of a yoga and mobility instructor",
    width: 600,
    height: 600,
  },
  "team-trainer-3": {
    src: "/images/team/team-portrait-6-placeholder.jpg",
    alt: "Portrait of a HIIT and group fitness coach",
    width: 600,
    height: 600,
  },
  "blog-hidden-cost": {
    src: "/images/blog/blog-hidden-cost-placeholder.jpg",
    alt: "Three professionals working together at a café table with laptops",
    width: 1200,
    height: 800,
  },
  "blog-hybrid-desk": {
    src: "/images/blog/blog-hybrid-desk-placeholder.jpg",
    alt: "A team collaborating around a table with laptops and sticky notes on the wall",
    width: 1200,
    height: 800,
  },
  "blog-founder-fitness": {
    src: "/images/blog/blog-founder-fitness-placeholder.jpg",
    alt: "Silhouette of a person in a yoga pose at sunset by the sea",
    width: 1200,
    height: 800,
  },
  "blog-community": {
    src: "/images/blog/blog-community-placeholder.jpg",
    alt: "A group of friends laughing together at a café table",
    width: 1200,
    height: 800,
  },
  "default-og": {
    src: "/images/og/default-og-placeholder.jpg",
    alt: "GrowViaSphere — fitness, co-working, café, and meeting rooms in one membership",
    width: 1200,
    height: 630,
  },
};

export function getImage(key: string): ImageAsset {
  const image = images[key];
  if (!image) {
    throw new Error(`Unknown image key: ${key}`);
  }
  return image;
}
