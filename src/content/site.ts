import type { SiteInfo } from "@/types/content";

// Placeholder Delhi NCR address — client to confirm exact location before launch.
export const site: SiteInfo = {
  name: "GrowViaSphere",
  legalName: "GrowViaSphere Lifestyle Private Limited",
  tagline: "One membership. Fitness, work, food, and meetings — all in one place.",
  description:
    "GrowViaSphere is a premium integrated membership in Delhi NCR combining fitness, co-working, a specialty café, and meeting rooms for founders, professionals, and growing teams.",
  url: "https://growviasphere.com",
  phone: "+91 98XXX XXXXX",
  email: "hello@growviasphere.com",
  address: {
    street: "Plot 14, Cyber Hub Extension Road",
    area: "Sector 44",
    city: "Gurugram",
    state: "Haryana",
    postalCode: "122003",
    country: "India",
  },
  geo: { lat: 28.4595, lng: 77.0724 },
  hours: [
    { day: "Monday – Friday", open: "06:00", close: "22:00" },
    { day: "Saturday – Sunday", open: "07:00", close: "20:00" },
  ],
  socials: [
    { platform: "Instagram", url: "https://instagram.com/growviasphere" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/growviasphere" },
    { platform: "YouTube", url: "https://youtube.com/@growviasphere" },
  ],
  nav: [
    { label: "Fitness", href: "/fitness" },
    { label: "Co-Working", href: "/co-working" },
    { label: "Café", href: "/cafe-nutrition" },
    { label: "Meeting Rooms", href: "/meeting-rooms" },
    { label: "Membership", href: "/membership" },
    { label: "Corporate", href: "/corporate" },
    { label: "Blog", href: "/blog" },
  ],
  footerLinks: [
    {
      title: "Explore",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Fitness", href: "/fitness" },
        { label: "Co-Working", href: "/co-working" },
        { label: "Café & Nutrition", href: "/cafe-nutrition" },
        { label: "Meeting Rooms", href: "/meeting-rooms" },
      ],
    },
    {
      title: "Membership",
      links: [
        { label: "Plans & Pricing", href: "/membership" },
        { label: "Corporate Partnerships", href: "/corporate" },
        { label: "Community & Events", href: "/community-events" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Locations", href: "/locations" },
        { label: "Blog & Insights", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Terms of Service", href: "/legal/terms-of-service" },
        { label: "Refund & Cancellation", href: "/legal/refund-cancellation" },
        { label: "Cookie Policy", href: "/legal/cookie-policy" },
      ],
    },
  ],
};
