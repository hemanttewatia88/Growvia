import { z } from "zod";

export const reportRequestSchema = z.object({
  type: z.enum(["membership-growth", "active-by-tier", "revenue-by-tier", "booking-volume"]),
  from: z.string().trim().min(1, "Pick a start date"),
  to: z.string().trim().min(1, "Pick an end date"),
});
export type ReportRequestInput = z.infer<typeof reportRequestSchema>;

export const REPORT_LABELS: Record<ReportRequestInput["type"], string> = {
  "membership-growth": "Membership Growth (signups per month)",
  "active-by-tier": "Active Members by Tier",
  "revenue-by-tier": "Revenue by Tier",
  "booking-volume": "Booking Volume by Type",
};
