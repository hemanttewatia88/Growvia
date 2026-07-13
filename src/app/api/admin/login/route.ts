import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminLoginSchema } from "@/lib/validations/admin";
import { verifyPassword } from "@/lib/auth/password";
import { verifyTotpCode } from "@/lib/auth/totp";
import { createAdminSession } from "@/lib/auth/admin-session";
import { getSessionMeta } from "@/lib/auth/request-meta";
import { checkRateLimit, rateLimitKey } from "@/lib/auth/rate-limit";
import { logAudit } from "@/lib/audit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { email, password, totpCode } = parsed.data;

  const limit = checkRateLimit(rateLimitKey(request, email, "admin_login"), 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Try again shortly." }, { status: 429 });
  }

  const genericError = NextResponse.json({ ok: false, message: "Incorrect email or password." }, { status: 401 });

  const admin = await db.adminUser.findUnique({ where: { email } });
  if (!admin) return genericError;

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) return genericError;

  if (admin.twoFactorEnabled) {
    if (!totpCode) {
      return NextResponse.json({ ok: false, reason: "totp_required", message: "Enter your 2FA code." }, { status: 400 });
    }
    if (!admin.twoFactorSecret || !verifyTotpCode(admin.twoFactorSecret, totpCode)) {
      return NextResponse.json({ ok: false, message: "Incorrect 2FA code." }, { status: 401 });
    }
  }

  await createAdminSession(admin.id, getSessionMeta(request));
  await logAudit({ adminId: admin.id, action: "admin_login" });

  return NextResponse.json({ ok: true, mustChangePassword: admin.mustChangePassword });
}
