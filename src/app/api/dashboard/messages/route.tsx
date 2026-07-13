import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { sendMessageSchema } from "@/lib/validations/dashboard";
import { sendEmail, SUPPORT_EMAIL } from "@/lib/email/resend";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const messages = await db.message.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ ok: true, messages });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = sendMessageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const message = await db.message.create({
    data: {
      userId: user.id,
      sender: "member",
      channel: parsed.data.channel,
      body: parsed.data.body,
      ...(parsed.data.subject ? { subject: parsed.data.subject } : {}),
    },
  });

  if (parsed.data.channel === "email") {
    await sendEmail({
      to: SUPPORT_EMAIL,
      subject: parsed.data.subject ? `[Member support] ${parsed.data.subject}` : "[Member support] New message",
      react: (
        <div>
          <p>
            From: {user.name} ({user.email}, {user.phone})
          </p>
          <p>{parsed.data.body}</p>
        </div>
      ),
    });
  }

  return NextResponse.json({ ok: true, message });
}
