import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { totpVerifySchema } from "@/lib/validations/admin";
import { verifyTotpCode } from "@/lib/auth/totp";

export async function POST(request: Request) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const body = await request.json().catch(() => null);
  const parsed = totpVerifySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const admin = await db.adminUser.findUnique({ where: { id: check.admin.id } });
  if (!admin?.twoFactorSecret) {
    return NextResponse.json({ ok: false, message: "Start 2FA setup first." }, { status: 400 });
  }

  if (!verifyTotpCode(admin.twoFactorSecret, parsed.data.token)) {
    return NextResponse.json({ ok: false, message: "Incorrect code." }, { status: 400 });
  }

  await db.adminUser.update({ where: { id: admin.id }, data: { twoFactorEnabled: true } });

  return NextResponse.json({ ok: true, message: "Two-factor authentication enabled." });
}

export async function DELETE() {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  await db.adminUser.update({
    where: { id: check.admin.id },
    data: { twoFactorEnabled: false, twoFactorSecret: null },
  });

  return NextResponse.json({ ok: true, message: "Two-factor authentication disabled." });
}
