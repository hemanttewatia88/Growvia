import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations/newsletter";

// TODO(persistence-phase): wire to Resend audience / mailing-list provider.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: "Subscribed." });
  }

  console.info("[newsletter] signup received", { email: parsed.data.email });

  return NextResponse.json({ ok: true, message: "You're subscribed — welcome aboard." });
}
