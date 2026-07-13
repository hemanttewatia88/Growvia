import type { Vertical } from "@/types/content";

export const verticals: Vertical[] = [
  {
    id: "fitness",
    name: "Fitness",
    tagline: "Train with intent, not just intensity",
    description:
      "A full-equipment strength floor, functional training zone, and a studio running yoga, HIIT, and mobility classes daily — programmed for people who train around a packed calendar, not instead of one.",
    imageKey: "vertical-fitness",
    href: "/fitness",
    highlights: ["Strength & functional floor", "Daily group classes", "1:1 personal training"],
  },
  {
    id: "coworking",
    name: "Co-Working",
    tagline: "A desk that keeps up with your day",
    description:
      "Hot desks, dedicated desks, and private pods with enterprise-grade WiFi, printing, and direct meeting-room access — built for founders and teams who need focus without a long lease.",
    imageKey: "vertical-coworking",
    href: "/co-working",
    highlights: ["Hot desk to private pod", "Meeting-room credits included", "Day passes available"],
  },
  {
    id: "cafe",
    name: "Café & Nutrition",
    tagline: "Food that fits the way you train and work",
    description:
      "A specialty café with dietitian-curated, performance-oriented options alongside the coffee-and-conversation classics — because the best workday fuel shouldn't be an afterthought.",
    imageKey: "vertical-cafe",
    href: "/cafe-nutrition",
    highlights: ["Dietitian-curated menu", "All-day café hours", "Member ordering priority"],
  },
  {
    id: "meeting-rooms",
    name: "Meeting Rooms",
    tagline: "Client-ready rooms, booked in minutes",
    description:
      "Soundproofed meeting and conference rooms with video-conferencing AV, sized from a 4-person huddle room to a 12-person boardroom — available by the hour or the day.",
    imageKey: "vertical-meeting-rooms",
    href: "/meeting-rooms",
    highlights: ["4 to 12-person rooms", "Video-conferencing AV built in", "Hourly or day-rate booking"],
  },
];
