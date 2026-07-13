import { db } from "@/lib/db";
import { generateOtpCode, hashToken } from "@/lib/auth/tokens";
import { OTP_EXPIRY_MS, OTP_MAX_ATTEMPTS, OTP_RESEND_COOLDOWN_MS } from "@/lib/auth/constants";
import type { OtpChannel, OtpPurpose } from "@/types/auth";

interface RequestOtpArgs {
  destination: string;
  channel: OtpChannel;
  purpose: OtpPurpose;
  userId?: string;
}

type RequestOtpResult =
  | { ok: true; code: string }
  | { ok: false; reason: "cooldown"; retryAfterMs: number };

export async function requestOtp({ destination, channel, purpose, userId }: RequestOtpArgs): Promise<RequestOtpResult> {
  const recent = await db.otpCode.findFirst({
    where: { destination, purpose, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (recent) {
    const elapsed = Date.now() - recent.createdAt.getTime();
    if (elapsed < OTP_RESEND_COOLDOWN_MS) {
      return { ok: false, reason: "cooldown", retryAfterMs: OTP_RESEND_COOLDOWN_MS - elapsed };
    }
  }

  const code = generateOtpCode();
  const codeHash = hashToken(code);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  await db.otpCode.create({
    data: { destination, channel, purpose, codeHash, expiresAt, ...(userId ? { userId } : {}) },
  });

  return { ok: true, code };
}

type VerifyOtpResult =
  | { ok: true; userId: string | null }
  | { ok: false; reason: "not_found" | "expired" | "too_many_attempts" | "incorrect" };

export async function verifyOtp({
  destination,
  purpose,
  code,
}: {
  destination: string;
  purpose: OtpPurpose;
  code: string;
}): Promise<VerifyOtpResult> {
  const record = await db.otpCode.findFirst({
    where: { destination, purpose, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return { ok: false, reason: "not_found" };
  if (record.expiresAt.getTime() < Date.now()) return { ok: false, reason: "expired" };
  if (record.attempts >= OTP_MAX_ATTEMPTS) return { ok: false, reason: "too_many_attempts" };

  const codeHash = hashToken(code);
  if (codeHash !== record.codeHash) {
    await db.otpCode.update({ where: { id: record.id }, data: { attempts: { increment: 1 } } });
    return { ok: false, reason: "incorrect" };
  }

  await db.otpCode.update({ where: { id: record.id }, data: { consumedAt: new Date() } });
  return { ok: true, userId: record.userId };
}
