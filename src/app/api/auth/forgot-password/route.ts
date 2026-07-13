import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { generateToken, hashToken } from "@/lib/auth/tokens";
import { PASSWORD_RESET_EXPIRY_MS } from "@/lib/auth/constants";
import { checkRateLimit, rateLimitKey } from "@/lib/auth/rate-limit";
import { sendEmail } from "@/lib/email/resend";
import { PasswordResetEmail } from "@/lib/email/templates/PasswordResetEmail";
import { SITE_URL } from "@/lib/seo";

const GENERIC_MESSAGE = "If an account exists for that email, we've sent a password reset link.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = forgotPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { email } = parsed.data;

  const limit = checkRateLimit(rateLimitKey(request, email, "forgot_password"), 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const user = await db.user.findUnique({ where: { email } });

  if (user) {
    const token = generateToken();
    const tokenHash = hashToken(token);
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);
    await db.passwordResetToken.create({ data: { userId: user.id, tokenHash, expiresAt } });

    const resetUrl = `${SITE_URL}/reset-password?token=${token}`;
    if (process.env.NODE_ENV !== "production") {
      console.log(`[password-reset] link for ${user.email}: ${resetUrl}`);
    }
    await sendEmail({
      to: user.email,
      subject: "Reset your GrowViaSphere password",
      react: PasswordResetEmail({ resetUrl }),
    });

    return NextResponse.json({
      ok: true,
      message: GENERIC_MESSAGE,
      ...(process.env.NODE_ENV !== "production" ? { devResetUrl: resetUrl } : {}),
    });
  }

  return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
}
