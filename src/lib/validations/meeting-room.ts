import { z } from "zod";

export const meetingRoomInquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  roomType: z.enum(["huddle", "meeting", "boardroom"], { message: "Select a room type" }),
  preferredDate: z.string().trim().min(1, "Select a preferred date"),
  message: z.string().trim().max(500).optional(),
  company: z.string().max(0).optional(),
});

export type MeetingRoomInquiryInput = z.infer<typeof meetingRoomInquirySchema>;
