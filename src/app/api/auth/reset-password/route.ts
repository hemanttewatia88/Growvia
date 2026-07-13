import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { hashToken } from "@/lib/auth/tokens";
import { hashPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { token, password } = parsed.data;
  const tokenHash = hashToken(token);

  const record = await db.passwordResetToken.findUnique({ where: { tokenHash } });
  if (!record || record.consumedAt || record.expiresAt.getTime() < Date.now()) {
    return NextResponse.json(
      { ok: false, message: "This reset link is invalid or has expired. Request a new one." },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(password);

  await db.$transaction([
    db.user.update({ where: { id: record.userId }, data: { passwordHash } }),
    db.passwordResetToken.update({ where: { id: record.id }, data: { consumedAt: new Date() } }),
    db.session.deleteMany({ where: { userId: record.userId } }),
  ]);

  return NextResponse.json({ ok: true, message: "Password updated — you can log in now." });
}
