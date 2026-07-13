import { z } from "zod";

export const sendMessageSchema = z.object({
  body: z.string().trim().min(1, "Write a message before sending").max(2000, "Message is too long"),
  channel: z.enum(["chat", "email"]).default("chat"),
  subject: z.string().trim().max(120).optional(),
});
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
