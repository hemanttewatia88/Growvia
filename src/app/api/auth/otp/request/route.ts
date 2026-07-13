import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { otpRequestSchema, identifierChannel } from "@/lib/validations/auth";
import { requestOtp } from "@/lib/auth/otp";
import { sendOtpNotification } from "@/lib/notifications/send-otp";
import { checkRateLimit, rateLimitKey } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = otpRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { identifier, purpose } = parsed.data;
  const channel = identifierChannel(identifier);

  const limit = checkRateLimit(rateLimitKey(request, identifier, "otp_request"), 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  let userId: string | undefined;
  if (purpose === "login" || purpose === "register") {
    const user = await db.user.findFirst({
      where: channel === "email" ? { email: identifier } : { phone: identifier },
    });
    if (purpose === "login" && !user) {
      return NextResponse.json({ ok: false, message: "No account found with that email or phone." }, { status: 404 });
    }
    userId = user?.id;
  }

  const otp = await requestOtp({ destination: identifier, channel, purpose, ...(userId ? { userId } : {}) });
  if (!otp.ok) {
    return NextResponse.json(
      { ok: false, message: "Please wait a moment before requesting another code." },
      { status: 429 },
    );
  }

  await sendOtpNotification({ destination: identifier, channel, code: otp.code, purpose });

  return NextResponse.json({
    ok: true,
    message: `Code sent to your ${channel === "email" ? "email" : "phone"}.`,
    ...(process.env.NODE_ENV !== "production" ? { devCode: otp.code } : {}),
  });
}
