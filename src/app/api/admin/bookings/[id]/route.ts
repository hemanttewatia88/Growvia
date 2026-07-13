import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { updateBookingStatusSchema } from "@/lib/validations/admin-booking";
import { logAudit } from "@/lib/audit";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = updateBookingStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const booking = await db.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ ok: false, message: "Booking not found." }, { status: 404 });

  const updated = await db.booking.update({ where: { id }, data: { status: parsed.data.status } });

  await logAudit({
    adminId: check.admin.id,
    action: "booking_status_changed",
    targetType: "Booking",
    targetId: id,
    metadata: { from: booking.status, to: parsed.data.status },
  });

  return NextResponse.json({ ok: true, booking: updated });
}
