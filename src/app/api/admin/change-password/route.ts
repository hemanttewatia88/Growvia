import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth/admin-session";
import { adminChangePasswordSchema } from "@/lib/validations/admin";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

// Deliberately does NOT use requireAdmin() — that helper blocks access while
// mustChangePassword is true, which is exactly the state this route exists to clear.
export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = adminChangePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const fullAdmin = await db.adminUser.findUnique({ where: { id: admin.id } });
  if (!fullAdmin) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const valid = await verifyPassword(parsed.data.currentPassword, fullAdmin.passwordHash);
  if (!valid) {
    return NextResponse.json({ ok: false, message: "Current password is incorrect." }, { status: 400 });
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await db.adminUser.update({
    where: { id: admin.id },
    data: { passwordHash, mustChangePassword: false },
  });

  return NextResponse.json({ ok: true, message: "Password updated." });
}
