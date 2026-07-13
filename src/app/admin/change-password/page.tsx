import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/admin-session";
import { AdminChangePasswordForm } from "@/app/admin/change-password/AdminChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password",
  robots: { index: false, follow: false },
};

// Deliberately outside the src/app/admin/(protected) route group — this page must stay
// reachable while an admin's mustChangePassword flag is still true, which is exactly
// the state the (protected) layout redirects away from.
export default async function AdminChangePasswordPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return <AdminChangePasswordForm forced={admin.mustChangePassword} />;
}
