import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { testimonialInputSchema } from "@/lib/validations/admin-content";
import { logAudit } from "@/lib/audit";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = testimonialInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const testimonial = await db.testimonial.update({ where: { id }, data: parsed.data }).catch(() => null);
  if (!testimonial) return NextResponse.json({ ok: false, message: "Testimonial not found." }, { status: 404 });

  await logAudit({ adminId: check.admin.id, action: "content_updated", targetType: "Testimonial", targetId: id });
  revalidatePath("/testimonials");
  revalidatePath("/");
  return NextResponse.json({ ok: true, testimonial });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { id } = await params;
  await db.testimonial.delete({ where: { id } }).catch(() => null);
  await logAudit({ adminId: check.admin.id, action: "content_deleted", targetType: "Testimonial", targetId: id });
  revalidatePath("/testimonials");
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
