import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { profileUpdateSchema } from "@/lib/validations/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const notifications = await db.notificationPreference.findUnique({ where: { userId: user.id } });

  return NextResponse.json({ ok: true, user, notifications });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = profileUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { name, email, phone } = parsed.data;

  const conflict = await db.user.findFirst({
    where: { id: { not: user.id }, OR: [{ email }, { phone }] },
  });
  if (conflict) {
    return NextResponse.json(
      { ok: false, message: "Another account already uses that email or phone." },
      { status: 409 },
    );
  }

  const emailChanged = email !== user.email;
  const phoneChanged = phone !== user.phone;

  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      name,
      email,
      phone,
      ...(emailChanged ? { emailVerifiedAt: null } : {}),
      ...(phoneChanged ? { phoneVerifiedAt: null } : {}),
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Profile updated.",
    user: updated,
    reverificationNeeded: { email: emailChanged, phone: phoneChanged },
  });
}
