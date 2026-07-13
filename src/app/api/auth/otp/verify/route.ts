import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { otpVerifySchema, identifierChannel } from "@/lib/validations/auth";
import { verifyOtp } from "@/lib/auth/otp";
import { createSession, getCurrentUser } from "@/lib/auth/session";
import { getSessionMeta } from "@/lib/auth/request-meta";
import { checkRateLimit, rateLimitKey } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { WelcomeEmail } from "@/lib/email/templates/WelcomeEmail";

const REASON_MESSAGES: Record<string, string> = {
  not_found: "We couldn't find a pending code for that request. Ask for a new one.",
  expired: "That code has expired. Ask for a new one.",
  too_many_attempts: "Too many incorrect attempts. Ask for a new code.",
  incorrect: "That code isn't right — check and try again.",
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = otpVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { identifier, code, purpose } = parsed.data;
  const channel = identifierChannel(identifier);

  const limit = checkRateLimit(rateLimitKey(request, identifier, "otp_verify"), 10, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const result = await verifyOtp({ destination: identifier, purpose, code });
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: REASON_MESSAGES[result.reason] }, { status: 400 });
  }

  if (purpose === "verify_email" || purpose === "verify_phone") {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ ok: false, message: "Please log in and try again." }, { status: 401 });
    }
    await db.user.update({
      where: { id: currentUser.id },
      data: purpose === "verify_email" ? { emailVerifiedAt: new Date() } : { phoneVerifiedAt: new Date() },
    });
    return NextResponse.json({ ok: true, message: "Verified." });
  }

  const user = await db.user.findFirst({
    where: channel === "email" ? { email: identifier } : { phone: identifier },
  });
  if (!user) {
    return NextResponse.json({ ok: false, message: "Account not found." }, { status: 404 });
  }

  if (purpose === "register" && !user.emailVerifiedAt && !user.phoneVerifiedAt) {
    await db.user.update({
      where: { id: user.id },
      data: channel === "email" ? { emailVerifiedAt: new Date() } : { phoneVerifiedAt: new Date() },
    });
    await sendEmail({ to: user.email, subject: "Welcome to GrowViaSphere", react: WelcomeEmail({ name: user.name }) });
  }

  await createSession(user.id, getSessionMeta(request));

  return NextResponse.json({ ok: true, message: "You're in." });
}
