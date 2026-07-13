import type { RoomType } from "@/types/content";

export const rooms: RoomType[] = [
  {
    id: "huddle",
    name: "Huddle Room",
    capacity: "2–4 people",
    description: "A quiet, soundproofed room for quick calls or a focused pair-working session.",
    hourlyRateLabel: "₹399 / hour",
    amenities: ["4K display", "Video-conferencing camera", "Whiteboard"],
    imageKey: "room-huddle",
  },
  {
    id: "meeting",
    name: "Meeting Room",
    capacity: "6–8 people",
    description: "The standard client-meeting room — presentation-ready with full AV.",
    hourlyRateLabel: "₹699 / hour",
    amenities: ["75-inch display", "Video-conferencing bar", "HDMI & wireless casting", "Whiteboard"],
    imageKey: "room-meeting",
  },
  {
    id: "boardroom",
    name: "Boardroom",
    capacity: "10–12 people",
    description: "For board meetings, investor updates, or all-hands sessions that need a bigger room.",
    hourlyRateLabel: "₹1,199 / hour",
    amenities: ["Dual displays", "Conference-grade audio", "Video-conferencing bar", "Catering on request"],
    imageKey: "room-boardroom",
  },
];

export const roomBookingNotes = [
  "Day-rate bookings (8 hours) available at a discount to the hourly rate — request on the booking form.",
  "Members get monthly meeting-room hours included depending on tier; additional hours are billed at the rates above.",
  "Non-members can book rooms directly through the inquiry form below.",
];
