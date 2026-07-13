import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { passwordChangeSchema } from "@/lib/validations/auth";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = passwordChangeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const fullUser = await db.user.findUnique({ where: { id: user.id } });
  if (!fullUser) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  if (fullUser.passwordHash) {
    const valid = await verifyPassword(parsed.data.currentPassword, fullUser.passwordHash);
    if (!valid) {
      return NextResponse.json({ ok: false, message: "Current password is incorrect." }, { status: 400 });
    }
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await db.user.update({ where: { id: user.id }, data: { passwordHash } });

  return NextResponse.json({ ok: true, message: "Password updated." });
}
