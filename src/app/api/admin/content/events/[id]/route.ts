import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { eventInputSchema } from "@/lib/validations/admin-content";
import { logAudit } from "@/lib/audit";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = eventInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { nextDate, ...rest } = parsed.data;
  const event = await db.event.update({ where: { id }, data: { ...rest, nextDate: new Date(nextDate) } }).catch(() => null);
  if (!event) return NextResponse.json({ ok: false, message: "Event not found." }, { status: 404 });

  await logAudit({ adminId: check.admin.id, action: "content_updated", targetType: "Event", targetId: id });
  revalidatePath("/community-events");
  return NextResponse.json({ ok: true, event });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { id } = await params;
  await db.event.delete({ where: { id } }).catch(() => null);
  await logAudit({ adminId: check.admin.id, action: "content_deleted", targetType: "Event", targetId: id });
  revalidatePath("/community-events");

  return NextResponse.json({ ok: true });
}
