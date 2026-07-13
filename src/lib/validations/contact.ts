import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)"),
  company: z.string().max(0).optional(), // honeypot — must stay empty
});

export type ContactInput = z.infer<typeof contactSchema>;
