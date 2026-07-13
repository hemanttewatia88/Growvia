import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const bookings = await db.booking.findMany({
    where: { userId: user.id },
    orderBy: { startsAt: "desc" },
  });

  return NextResponse.json({ ok: true, bookings });
}
