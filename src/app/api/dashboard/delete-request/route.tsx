import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { sendEmail, SUPPORT_EMAIL } from "@/lib/email/resend";

// Flags the account for admin follow-up rather than deleting immediately — an
// irreversible automated delete has too many edge cases (outstanding invoices,
// legal retention requirements) to be safe as a single self-service click.
export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const fullUser = await db.user.findUnique({ where: { id: user.id } });
  if (!fullUser) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  if (fullUser.deletionRequestedAt) {
    return NextResponse.json({ ok: true, message: "A deletion request is already pending review." });
  }

  await db.user.update({ where: { id: user.id }, data: { deletionRequestedAt: new Date() } });

  await db.message.create({
    data: {
      userId: user.id,
      sender: "member",
      channel: "email",
      subject: "Account deletion request",
      body: `${user.name} (${user.email}) has requested their account and data be deleted.`,
    },
  });

  await sendEmail({
    to: SUPPORT_EMAIL,
    subject: `[Account deletion request] ${user.email}`,
    react: (
      <p>
        {user.name} ({user.email}, {user.phone}) has requested account deletion. Review and process
        per your data-retention policy.
      </p>
    ),
  });

  return NextResponse.json({
    ok: true,
    message: "We've received your request and will follow up by email to confirm before deleting anything.",
  });
}
