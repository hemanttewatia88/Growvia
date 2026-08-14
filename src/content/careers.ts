import type { CareerRole } from "@/types/content";

export const openRoles: CareerRole[] = [
  {
    id: "r1",
    title: "General Manager, Centre Operations",
    department: "Operations",
    location: "Gurugram, Delhi NCR",
    type: "Full-time",
    description:
      "Own day-to-day operations across all four verticals — staffing, vendor relationships, facility upkeep, and the member experience end to end.",
    postedAt: "2026-07-01",
  },
  {
    id: "r2",
    title: "Fitness Coach — Strength & Conditioning",
    department: "Fitness",
    location: "Gurugram, Delhi NCR",
    type: "Full-time",
    description:
      "Run small-group and 1:1 strength sessions, lead the fitness assessment program for new members, and help shape the class schedule.",
    postedAt: "2026-07-15",
  },
  {
    id: "r3",
    title: "Community & Events Executive",
    department: "Member Experience",
    location: "Gurugram, Delhi NCR",
    type: "Full-time",
    description:
      "Plan and host recurring networking breakfasts, wellness workshops, and member challenges — the calendar that turns a facility into a community.",
    postedAt: "2026-07-22",
  },
  {
    id: "r4",
    title: "Corporate Partnerships Manager",
    department: "Sales",
    location: "Delhi NCR (hybrid)",
    type: "Full-time",
    description:
      "Sell and manage bulk-seat Corporate Team accounts — from the first pitch through GST invoicing and renewal conversations with HR and admin teams.",
    postedAt: "2026-08-01",
  },
];

export const cultureStatement =
  "We hire people who'd actually use the membership — trainers who train, community leads who show up to the events they run, and salespeople who can walk a prospect through the space because they know it firsthand. Small team, high ownership, no tolerance for corporate-gym mediocrity.";

export interface CareerBenefit {
  title: string;
  body: string;
}

export const careerBenefits: CareerBenefit[] = [
  {
    title: "Full membership, on us",
    body: "Every team member gets a Founder Access membership — the fitness floor, co-working desks, café, and meeting rooms are your workplace, not a perk you have to opt into.",
  },
  {
    title: "Real ownership, small team",
    body: "No layers of approval between an idea and shipping it. You'll see the direct result of your work in the space within weeks, not quarters.",
  },
  {
    title: "Ground floor of a new category",
    body: "GrowViaSphere is building toward a multi-centre network across India's business hubs — early team members shape the playbook other centres will follow.",
  },
  {
    title: "Health-first work culture",
    body: "Training sessions and recovery time are treated as part of the workday, not something you squeeze in around it.",
  },
];
