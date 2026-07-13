import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { generateToken, hashToken } from "@/lib/auth/tokens";
import { PASSWORD_RESET_EXPIRY_MS } from "@/lib/auth/constants";
import { sendEmail } from "@/lib/email/resend";
import { PasswordResetEmail } from "@/lib/email/templates/PasswordResetEmail";
import { SITE_URL } from "@/lib/seo";
import { logAudit } from "@/lib/audit";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { id } = await params;
  const user = await db.user.findUnique({ where: { id } });
  if (!user) return NextResponse.json({ ok: false, message: "Customer not found." }, { status: 404 });

  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_EXPIRY_MS);
  await db.passwordResetToken.create({ data: { userId: user.id, tokenHash, expiresAt, requestedByAdmin: true } });

  const resetUrl = `${SITE_URL}/reset-password?token=${token}`;
  if (process.env.NODE_ENV !== "production") {
    console.log(`[admin-password-reset] link for ${user.email}: ${resetUrl}`);
  }
  await sendEmail({
    to: user.email,
    subject: "Reset your GrowViaSphere password",
    react: PasswordResetEmail({ resetUrl }),
  });

  await logAudit({
    adminId: check.admin.id,
    action: "password_reset_sent",
    targetType: "User",
    targetId: user.id,
    metadata: { email: user.email },
  });

  return NextResponse.json({
    ok: true,
    message: `Reset link sent to ${user.email}.`,
    ...(process.env.NODE_ENV !== "production" ? { devResetUrl: resetUrl } : {}),
  });
}
