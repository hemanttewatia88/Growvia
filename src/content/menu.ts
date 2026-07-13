import type { MenuGroup } from "@/types/content";

export const menu: MenuGroup[] = [
  {
    id: "performance",
    name: "Performance Plates",
    description: "Dietitian-curated, macro-labelled plates built around training days.",
    items: [
      { name: "Grilled Protein Bowl", description: "Choice of chicken, paneer, or tofu with quinoa and roasted vegetables.", tag: "High protein" },
      { name: "Post-Workout Smoothie", description: "Banana, peanut butter, whey or plant protein, oats.", tag: "Recovery" },
      { name: "Overnight Oats Jar", description: "Rolled oats, chia, seasonal fruit, almond milk.", tag: "Pre-workout" },
    ],
  },
  {
    id: "cafe-classics",
    name: "Café Classics",
    description: "For the meeting-room coffee run and the mid-afternoon reset.",
    items: [
      { name: "Single-Origin Pour Over", description: "Rotating single-origin beans, brewed to order." },
      { name: "Flat White", description: "Espresso with steamed milk, our house pull." },
      { name: "Masala Chai", description: "Slow-brewed with whole spices." },
    ],
  },
  {
    id: "light-bites",
    name: "Light Bites",
    description: "Quick options for between classes or back-to-back calls.",
    items: [
      { name: "Sourdough Avocado Toast", description: "With chilli flakes and a soft egg on request.", tag: "Vegetarian option" },
      { name: "Seasonal Salad Bowl", description: "Rotating seasonal produce with a citrus dressing." },
      { name: "Energy Balls", description: "Dates, nuts, and cacao — no added sugar.", tag: "Vegan" },
    ],
  },
];

export const cafeHours = [
  { day: "Monday – Friday", open: "06:30", close: "21:00" },
  { day: "Saturday – Sunday", open: "07:30", close: "19:00" },
];
