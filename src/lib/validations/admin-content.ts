import { z } from "zod";

export const testimonialInputSchema = z.object({
  quote: z.string().trim().min(10, "Quote is too short").max(600),
  name: z.string().trim().min(2, "Enter a name"),
  role: z.string().trim().min(2, "Enter a role"),
  segment: z.enum(["member", "corporate"]),
  rating: z.coerce.number().int().min(1).max(5),
});
export type TestimonialInput = z.infer<typeof testimonialInputSchema>;

export const eventInputSchema = z.object({
  title: z.string().trim().min(2, "Enter a title"),
  description: z.string().trim().min(10, "Description is too short").max(600),
  cadence: z.string().trim().min(2, "Enter a cadence, e.g. \"Monthly\""),
  nextDate: z.string().trim().min(1, "Pick a date"),
  category: z.string().trim().min(2, "Enter a category"),
});
export type EventInput = z.infer<typeof eventInputSchema>;
