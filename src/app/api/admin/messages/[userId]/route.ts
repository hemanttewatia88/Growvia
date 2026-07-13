import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { adminMessageActionSchema } from "@/lib/validations/admin-message";
import { logAudit } from "@/lib/audit";

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { userId } = await params;
  const customer = await db.user.findUnique({ where: { id: userId } });
  if (!customer) return NextResponse.json({ ok: false, message: "Customer not found." }, { status: 404 });

  const body = await request.json().catch(() => null);
  const parsed = adminMessageActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.action === "reply") {
    const message = await db.message.create({
      data: { userId, sender: "staff", channel: "chat", body: parsed.data.body },
    });
    await logAudit({ adminId: check.admin.id, action: "message_replied", targetType: "User", targetId: userId });
    return NextResponse.json({ ok: true, message });
  }

  if (parsed.data.action === "resolve") {
    await db.message.updateMany({ where: { userId, resolvedAt: null }, data: { resolvedAt: new Date() } });
    await logAudit({ adminId: check.admin.id, action: "message_resolved", targetType: "User", targetId: userId });
    return NextResponse.json({ ok: true, message: "Marked resolved." });
  }

  // assign
  const assignee = await db.adminUser.findUnique({ where: { id: parsed.data.adminId } });
  if (!assignee) return NextResponse.json({ ok: false, message: "Admin not found." }, { status: 404 });

  await db.message.updateMany({ where: { userId }, data: { assignedToAdminId: assignee.id } });
  await logAudit({
    adminId: check.admin.id,
    action: "message_assigned",
    targetType: "User",
    targetId: userId,
    metadata: { assignedTo: assignee.email },
  });
  return NextResponse.json({ ok: true, message: `Assigned to ${assignee.name}.` });
}
