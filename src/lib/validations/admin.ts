import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Enter your password"),
  totpCode: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code").optional(),
});
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const adminChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: z.string().min(10, "Password must be at least 10 characters"),
});
export type AdminChangePasswordInput = z.infer<typeof adminChangePasswordSchema>;

export const adminInviteSchema = z.object({
  name: z.string().trim().min(2, "Enter a full name"),
  email: z.string().trim().email("Enter a valid email address"),
  role: z.enum(["super_admin", "support_staff"]),
});
export type AdminInviteInput = z.infer<typeof adminInviteSchema>;

export const totpVerifySchema = z.object({
  token: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
});
export type TotpVerifyInput = z.infer<typeof totpVerifySchema>;
