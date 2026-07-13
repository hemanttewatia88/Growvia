import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/admin-session";
import { db } from "@/lib/db";
import { TeamManager } from "@/app/admin/(protected)/team/TeamManager";

export const metadata: Metadata = { title: "Team" };

export default async function AdminTeamPage() {
  const admin = await getCurrentAdmin();
  if (admin?.role !== "super_admin") notFound();

  const team = await db.adminUser.findMany({
    select: { id: true, name: true, email: true, role: true, mustChangePassword: true, twoFactorEnabled: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Team</h1>
        <p className="mt-1 text-sm text-ink-secondary">Manage admin accounts and roles.</p>
      </div>
      <TeamManager initial={team} />
    </div>
  );
}
