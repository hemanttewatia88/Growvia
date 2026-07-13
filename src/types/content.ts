export interface Vertical {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageKey: string;
  href: string;
  highlights: string[];
}

export interface MembershipTier {
  id: string;
  name: string;
  audience: string;
  priceLabel: string;
  priceNote?: string;
  billingCycle: string;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  inclusions: string[];
}

export interface FeatureMatrixRow {
  feature: string;
  values: Record<string, boolean | string>;
}

// Testimonial shape lives in the Prisma schema now (Phase 3 CMS) — see @prisma/client's
// generated `Testimonial` type.

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageKey: string;
  isPlaceholder: true;
}

// Event shape lives in the Prisma schema now (Phase 3 CMS) — see @prisma/client's
// generated `Event` type.

export interface MenuItem {
  name: string;
  description: string;
  tag?: string;
}

export interface MenuGroup {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface RoomType {
  id: string;
  name: string;
  capacity: string;
  description: string;
  hourlyRateLabel: string;
  amenities: string[];
  imageKey: string;
}

export interface WorkspaceType {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  billingCycle: string;
  amenities: string[];
}

export interface ClassSchedule {
  id: string;
  name: string;
  description: string;
  level: string;
  days: string[];
  time: string;
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
  imageKey: string;
  readingMinutes: number;
  body: BlogBlock[];
}

export interface Address {
  street: string;
  area: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface SiteInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: Address;
  geo: { lat: number; lng: number };
  hours: OpeningHours[];
  socials: SocialLink[];
  nav: NavLink[];
  footerLinks: FooterLinkGroup[];
}
