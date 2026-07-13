import type { WorkspaceType } from "@/types/content";

export const workspaceTypes: WorkspaceType[] = [
  {
    id: "hot-desk",
    name: "Hot Desk",
    description: "Any open seat in the co-working floor, first come first served.",
    priceLabel: "Included from Work + Wellness",
    billingCycle: "or ₹499 / day pass",
    amenities: ["Enterprise WiFi", "Power at every seat", "Printing credits"],
  },
  {
    id: "dedicated-desk",
    name: "Dedicated Desk",
    description: "The same desk, every day, with storage — for people who want a fixed spot.",
    priceLabel: "Included with Founder Access",
    billingCycle: "or ₹6,999 / month standalone",
    amenities: ["Reserved desk & drawer", "Enterprise WiFi", "Printing credits", "Locker"],
  },
  {
    id: "private-pod",
    name: "Private Pod",
    description: "A single-occupant enclosed pod for calls or deep-focus work.",
    priceLabel: "₹249 / hour",
    billingCycle: "or bundled hours on request",
    amenities: ["Soundproofed", "Power & WiFi", "Small worksurface"],
  },
  {
    id: "phone-booth",
    name: "Phone Booth",
    description: "A quick-access booth for a call between meetings — no booking required.",
    priceLabel: "Included with any membership",
    billingCycle: "unlimited use",
    amenities: ["Soundproofed", "Power outlet", "Standing height"],
  },
];

export const coworkingAmenities = [
  "Enterprise-grade WiFi across every space",
  "Black & white and colour printing",
  "Direct meeting-room booking from the member app",
  "Café ordering from your desk",
];
