import type { ClassSchedule } from "@/types/content";

export const classes: ClassSchedule[] = [
  {
    id: "c1",
    name: "Sunrise Yoga",
    description: "A slow-flow session to start the day before work — all levels welcome.",
    level: "All levels",
    days: ["Mon", "Wed", "Fri"],
    time: "6:30 – 7:15 AM",
  },
  {
    id: "c2",
    name: "HIIT Circuit",
    description: "High-intensity interval training across strength and cardio stations.",
    level: "Intermediate",
    days: ["Tue", "Thu"],
    time: "7:00 – 7:45 AM",
  },
  {
    id: "c3",
    name: "Lunch-Break Strength",
    description: "A 40-minute strength session designed to fit inside a lunch hour.",
    level: "All levels",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    time: "1:00 – 1:40 PM",
  },
  {
    id: "c4",
    name: "Evening Zumba",
    description: "A high-energy dance-cardio class to close out the workday.",
    level: "All levels",
    days: ["Mon", "Wed"],
    time: "6:30 – 7:15 PM",
  },
  {
    id: "c5",
    name: "Mobility & Recovery",
    description: "Guided stretching and mobility work to offset long hours at a desk.",
    level: "All levels",
    days: ["Tue", "Thu", "Sat"],
    time: "7:00 – 7:40 PM",
  },
];

export const fitnessAssessment = {
  title: "Complimentary Fitness Assessment",
  description:
    "Every new member gets a one-on-one assessment covering movement screening, baseline strength and cardio benchmarks, and a 90-day plan — included with every membership tier.",
};

export const personalTraining = {
  title: "Personal Training",
  description:
    "Book 1:1 sessions with a coach for strength, mobility, or sport-specific programming. Founder Access includes two sessions a month; all other tiers can book sessions individually.",
  priceLabel: "₹1,499 / session",
};
