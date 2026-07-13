export type OtpChannel = "email" | "sms";
export type OtpPurpose = "login" | "register" | "verify_email" | "verify_phone";

export type MembershipStatus = "active" | "paused" | "cancelled" | "expired";
export type InvoiceStatus = "paid" | "pending" | "failed";
export type BookingType = "class" | "meeting-room" | "day-pass";
export type BookingStatus = "upcoming" | "completed" | "cancelled";
export type MessageSender = "member" | "staff";
export type MessageChannel = "chat" | "email";

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  emailVerifiedAt: Date | null;
  phoneVerifiedAt: Date | null;
  createdAt: Date;
}
