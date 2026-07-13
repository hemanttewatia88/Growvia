import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { testimonialInputSchema } from "@/lib/validations/admin-content";
import { logAudit } from "@/lib/audit";

export async function POST(request: Request) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const body = await request.json().catch(() => null);
  const parsed = testimonialInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const testimonial = await db.testimonial.create({ data: parsed.data });
  await logAudit({ adminId: check.admin.id, action: "content_created", targetType: "Testimonial", targetId: testimonial.id });
  revalidatePath("/testimonials");
  revalidatePath("/");

  return NextResponse.json({ ok: true, testimonial });
}
