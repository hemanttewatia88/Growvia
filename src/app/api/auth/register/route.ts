import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validations/auth";
import { hashPassword } from "@/lib/auth/password";
import { requestOtp } from "@/lib/auth/otp";
import { sendOtpNotification } from "@/lib/notifications/send-otp";
import { checkRateLimit, rateLimitKey } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: "Check your email for a verification code." });
  }

  const { name, email, phone, password } = parsed.data;

  const limit = checkRateLimit(rateLimitKey(request, email, "register"), 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const existing = await db.user.findFirst({ where: { OR: [{ email }, { phone }] } });
  if (existing) {
    return NextResponse.json(
      { ok: false, message: "An account with that email or phone already exists." },
      { status: 409 },
    );
  }

  const passwordHash = password ? await hashPassword(password) : null;

  const user = await db.user.create({
    data: { name, email, phone, passwordHash, consentGivenAt: new Date() },
  });

  const otp = await requestOtp({ destination: email, channel: "email", purpose: "register", userId: user.id });
  if (!otp.ok) {
    return NextResponse.json({ ok: false, message: "Please wait before requesting another code." }, { status: 429 });
  }
  await sendOtpNotification({ destination: email, channel: "email", code: otp.code, purpose: "register" });

  return NextResponse.json({
    ok: true,
    message: "Check your email for a verification code.",
    ...(process.env.NODE_ENV !== "production" ? { devCode: otp.code } : {}),
  });
}
