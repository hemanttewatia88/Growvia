import { NextResponse } from "next/server";
import { meetingRoomInquirySchema } from "@/lib/validations/meeting-room";

// TODO(persistence-phase): wire to Prisma + Resend + real booking-calendar check.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = meetingRoomInquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, message: "Thanks — we'll confirm availability shortly." });
  }

  console.info("[meeting-room-inquiry] received", { roomType: parsed.data.roomType, preferredDate: parsed.data.preferredDate });

  return NextResponse.json({ ok: true, message: "Thanks — we'll confirm availability within a few hours." });
}
