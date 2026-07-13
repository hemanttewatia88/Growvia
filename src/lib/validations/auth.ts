import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/;

export const identifierSchema = z
  .string()
  .trim()
  .min(3, "Enter your email or phone number")
  .refine((v) => v.includes("@") || phoneRegex.test(v), {
    message: "Enter a valid email address or 10-digit Indian mobile number",
  });

export function identifierChannel(identifier: string): "email" | "sms" {
  return identifier.includes("@") ? "email" : "sms";
}

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  password: z.union([z.string().min(8, "Password must be at least 8 characters"), z.literal("")]).optional(),
  consent: z.literal(true, { message: "You must agree to the Privacy Policy and Terms of Service" }),
  company: z.string().max(0).optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginPasswordSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(1, "Enter your password"),
});
export type LoginPasswordInput = z.infer<typeof loginPasswordSchema>;

export const otpRequestSchema = z.object({
  identifier: identifierSchema,
  purpose: z.enum(["login", "register", "verify_email", "verify_phone"]),
});
export type OtpRequestInput = z.infer<typeof otpRequestSchema>;

export const otpVerifySchema = z.object({
  identifier: identifierSchema,
  code: z.string().trim().regex(/^\d{6}$/, "Enter the 6-digit code"),
  purpose: z.enum(["login", "register", "verify_email", "verify_phone"]),
});
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(10, "Missing reset token"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
});
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;

export const notificationPreferenceSchema = z.object({
  emailBookingReminders: z.boolean(),
  emailBilling: z.boolean(),
  emailMarketing: z.boolean(),
  smsBookingReminders: z.boolean(),
});
export type NotificationPreferenceInput = z.infer<typeof notificationPreferenceSchema>;
