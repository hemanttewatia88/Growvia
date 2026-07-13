import { NextResponse } from "next/server";
import { corporateInquirySchema } from "@/lib/validations/corporate";

// TODO(persistence-phase): wire to Prisma + Resend + assign to sales inbox.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = corporateInquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: "Thanks — our corporate partnerships team will reach out shortly." });
  }

  console.info("[corporate] inquiry received", { companyName: parsed.data.companyName, workEmail: parsed.data.workEmail });

  return NextResponse.json({
    ok: true,
    message: "Thanks — our corporate partnerships team will reach out within one business day.",
  });
}
