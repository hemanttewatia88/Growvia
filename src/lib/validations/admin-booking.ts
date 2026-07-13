import { z } from "zod";

export const updateBookingStatusSchema = z.object({
  status: z.enum(["upcoming", "completed", "cancelled"]),
});
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
