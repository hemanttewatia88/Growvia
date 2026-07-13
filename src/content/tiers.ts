// ILLUSTRATIVE PLACEHOLDER PRICING — invented example figures for demonstration only.
// Do not treat as final; client must confirm real pricing before launch.
import type { FeatureMatrixRow, MembershipTier } from "@/types/content";

export const tiers: MembershipTier[] = [
  {
    id: "wellness-only",
    name: "Wellness Only",
    audience: "For members who just want the fitness floor and classes",
    priceLabel: "₹4,999",
    billingCycle: "per month",
    ctaLabel: "Join Now",
    ctaHref: "/membership#join",
    inclusions: [
      "Full gym & strength floor access",
      "Unlimited group classes",
      "1 guest pass per month",
      "Locker & shower access",
    ],
  },
  {
    id: "work-wellness",
    name: "Work + Wellness",
    audience: "For professionals who want a desk and a workout in one membership",
    priceLabel: "₹7,499",
    billingCycle: "per month",
    ctaLabel: "Join Now",
    ctaHref: "/membership#join",
    highlighted: true,
    inclusions: [
      "Everything in Wellness Only",
      "Hot-desk co-working access",
      "4 meeting-room hours / month",
      "Café ordering priority",
    ],
  },
  {
    id: "founder-access",
    name: "Founder Access",
    audience: "For founders and senior professionals who want priority on everything",
    priceLabel: "₹11,999",
    priceNote: "limited seats per location",
    billingCycle: "per month",
    ctaLabel: "Join Now",
    ctaHref: "/membership#join",
    inclusions: [
      "Everything in Work + Wellness",
      "Dedicated desk option",
      "10 meeting-room hours / month",
      "2 personal-training sessions / month",
      "Priority event & workshop access",
    ],
  },
  {
    id: "corporate-team",
    name: "Corporate Team",
    audience: "For HR teams provisioning memberships across a company",
    priceLabel: "Custom",
    priceNote: "volume pricing per seat",
    billingCycle: "billed to company",
    ctaLabel: "Get a Quote",
    ctaHref: "/corporate#quote",
    inclusions: [
      "Bulk seats across fitness, co-working & meeting rooms",
      "Consolidated GST invoicing",
      "Dedicated account manager",
      "Usage reporting for HR/wellness budgets",
    ],
  },
  {
    id: "day-pass",
    name: "Day Pass",
    audience: "For a single visit — no commitment",
    priceLabel: "₹799",
    billingCycle: "per day",
    ctaLabel: "Join Now",
    ctaHref: "/membership#join",
    inclusions: [
      "Full-day fitness floor & class access",
      "Full-day co-working access",
      "Café access at member rates",
    ],
  },
];

export const featureMatrix: FeatureMatrixRow[] = [
  {
    feature: "Fitness floor & classes",
    values: {
      "wellness-only": true,
      "work-wellness": true,
      "founder-access": true,
      "corporate-team": true,
      "day-pass": true,
    },
  },
  {
    feature: "Co-working access",
    values: {
      "wellness-only": false,
      "work-wellness": "Hot desk",
      "founder-access": "Dedicated desk",
      "corporate-team": "Per plan",
      "day-pass": "Hot desk",
    },
  },
  {
    feature: "Meeting-room hours / month",
    values: {
      "wellness-only": "—",
      "work-wellness": "4",
      "founder-access": "10",
      "corporate-team": "Custom",
      "day-pass": "—",
    },
  },
  {
    feature: "Personal training sessions",
    values: {
      "wellness-only": "Pay per session",
      "work-wellness": "Pay per session",
      "founder-access": "2 / month",
      "corporate-team": "Add-on",
      "day-pass": "Pay per session",
    },
  },
  {
    feature: "GST invoicing",
    values: {
      "wellness-only": false,
      "work-wellness": false,
      "founder-access": false,
      "corporate-team": true,
      "day-pass": false,
    },
  },
];
