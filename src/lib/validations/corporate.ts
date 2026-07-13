import { z } from "zod";

export const corporateInquirySchema = z.object({
  contactName: z.string().trim().min(2, "Enter your full name"),
  workEmail: z.string().trim().email("Enter a valid work email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  companyName: z.string().trim().min(2, "Enter your company name"),
  teamSize: z.enum(["1-10", "11-50", "51-200", "200+"], { message: "Select a team size" }),
  message: z.string().trim().min(10, "Tell us a little about what you need"),
  company: z.string().max(0).optional(),
});

export type CorporateInquiryInput = z.infer<typeof corporateInquirySchema>;
