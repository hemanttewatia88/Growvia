import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { SettingsForm } from "@/app/dashboard/settings/SettingsForm";

export const metadata: Metadata = { title: "Settings" };

export default async function DashboardSettingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const notifications = await db.notificationPreference.findUnique({ where: { userId: user.id } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-secondary">Manage your profile, password, and notifications.</p>
      </div>
      <SettingsForm
        user={user}
        notifications={
          notifications ?? {
            emailBookingReminders: true,
            emailBilling: true,
            emailMarketing: false,
            smsBookingReminders: false,
          }
        }
      />
    </div>
  );
}
