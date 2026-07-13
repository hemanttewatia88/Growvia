import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { adminInviteSchema } from "@/lib/validations/admin";
import { hashPassword } from "@/lib/auth/password";
import { generateRandomPassword } from "@/lib/auth/tokens";
import { logAudit } from "@/lib/audit";

export async function GET() {
  const check = await requireAdmin("super_admin");
  if (!check.ok) return check.response;

  const team = await db.adminUser.findMany({
    select: { id: true, name: true, email: true, role: true, mustChangePassword: true, twoFactorEnabled: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ ok: true, team });
}

// TODO(production): email the invitee their one-time password via Resend instead of
// returning it in the API response — acceptable for now since no email provider is
// configured yet (see src/lib/email/resend.ts dev-mode fallback).
export async function POST(request: Request) {
  const check = await requireAdmin("super_admin");
  if (!check.ok) return check.response;

  const body = await request.json().catch(() => null);
  const parsed = adminInviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await db.adminUser.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    return NextResponse.json({ ok: false, message: "An admin with that email already exists." }, { status: 409 });
  }

  const temporaryPassword = generateRandomPassword();
  const passwordHash = await hashPassword(temporaryPassword);

  const admin = await db.adminUser.create({
    data: { ...parsed.data, passwordHash, mustChangePassword: true },
    select: { id: true, name: true, email: true, role: true, mustChangePassword: true, twoFactorEnabled: true, createdAt: true },
  });

  await logAudit({
    adminId: check.admin.id,
    action: "admin_invited",
    targetType: "AdminUser",
    targetId: admin.id,
    metadata: { email: admin.email, role: admin.role },
  });

  return NextResponse.json({ ok: true, admin, temporaryPassword });
}
