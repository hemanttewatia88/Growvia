import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

// TODO(persistence-phase): wire to Prisma + Resend. Currently returns a mock success
// response and logs the submission server-side only.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.company) {
    // Honeypot tripped — pretend success without processing.
    return NextResponse.json({ ok: true, message: "Thanks — we'll be in touch shortly." });
  }

  console.info("[contact] inquiry received", { name: parsed.data.name, email: parsed.data.email });

  return NextResponse.json({ ok: true, message: "Thanks — we'll be in touch within one business day." });
}
