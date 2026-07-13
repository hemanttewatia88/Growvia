import { NextResponse } from "next/server";
import { getCurrentAdmin, type SafeAdmin } from "@/lib/auth/admin-session";

type RequireAdminResult = { ok: true; admin: SafeAdmin } | { ok: false; response: NextResponse };

/**
 * Guards an admin API route. Pass `"super_admin"` for routes only the super admin role may use
 * (e.g. team management). Also blocks access while a forced password change is pending, so a
 * freshly seeded/invited admin can't use the API before completing that step.
 */
export async function requireAdmin(requiredRole?: "super_admin"): Promise<RequireAdminResult> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { ok: false, response: NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 }) };
  }
  if (admin.mustChangePassword) {
    return {
      ok: false,
      response: NextResponse.json({ ok: false, message: "Password change required" }, { status: 403 }),
    };
  }
  if (requiredRole && admin.role !== requiredRole) {
    return { ok: false, response: NextResponse.json({ ok: false, message: "Forbidden" }, { status: 403 }) };
  }
  return { ok: true, admin };
}
