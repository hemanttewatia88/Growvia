import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const membership = await db.membership.findUnique({ where: { userId: user.id } });

  return NextResponse.json({ ok: true, user, membership });
}
