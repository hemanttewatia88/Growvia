import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { generateTotpSecret, getQrCodeDataUrl } from "@/lib/auth/totp";

// Generates and stores a new TOTP secret with twoFactorEnabled left false — it only takes
// effect once confirmed via /api/admin/2fa/verify, so an abandoned setup attempt never
// silently enables 2FA the admin doesn't have configured in an authenticator app.
export async function POST() {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const { secretBase32, otpauthUri } = generateTotpSecret(check.admin.email);
  await db.adminUser.update({ where: { id: check.admin.id }, data: { twoFactorSecret: secretBase32 } });

  const qrCodeDataUrl = await getQrCodeDataUrl(otpauthUri);

  return NextResponse.json({ ok: true, qrCodeDataUrl, secretBase32 });
}
