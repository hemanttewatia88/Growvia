import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { eventInputSchema } from "@/lib/validations/admin-content";
import { logAudit } from "@/lib/audit";

export async function POST(request: Request) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const body = await request.json().catch(() => null);
  const parsed = eventInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { nextDate, ...rest } = parsed.data;
  const event = await db.event.create({ data: { ...rest, nextDate: new Date(nextDate) } });
  await logAudit({ adminId: check.admin.id, action: "content_created", targetType: "Event", targetId: event.id });
  revalidatePath("/community-events");

  return NextResponse.json({ ok: true, event });
}
