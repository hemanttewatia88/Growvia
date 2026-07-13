import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loginPasswordSchema, identifierChannel } from "@/lib/validations/auth";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { getSessionMeta } from "@/lib/auth/request-meta";
import { checkRateLimit, rateLimitKey } from "@/lib/auth/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { identifier, password } = parsed.data;
  const channel = identifierChannel(identifier);

  const limit = checkRateLimit(rateLimitKey(request, identifier, "login"), 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const user = await db.user.findFirst({
    where: channel === "email" ? { email: identifier } : { phone: identifier },
  });

  const genericError = NextResponse.json(
    { ok: false, message: "Incorrect email/phone or password." },
    { status: 401 },
  );

  if (!user) return genericError;

  if (!user.passwordHash) {
    return NextResponse.json(
      { ok: false, reason: "no_password", message: "This account uses OTP login — request a code instead." },
      { status: 400 },
    );
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return genericError;

  await createSession(user.id, getSessionMeta(request));

  return NextResponse.json({ ok: true, message: "You're in." });
}
