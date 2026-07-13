import { z } from "zod";

export const adminMessageActionSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("reply"), body: z.string().trim().min(1, "Write a reply first").max(2000) }),
  z.object({ action: z.literal("resolve") }),
  z.object({ action: z.literal("assign"), adminId: z.string().min(1) }),
]);
export type AdminMessageActionInput = z.infer<typeof adminMessageActionSchema>;
