import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/admin-session";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Audit Log" };

function formatTime(date: Date) {
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
}

const ACTION_LABELS: Record<string, string> = {
  admin_login: "Logged in",
  admin_invited: "Invited an admin",
  password_reset_sent: "Sent a password reset",
  message_replied: "Replied to a message",
  message_resolved: "Resolved a message thread",
  message_assigned: "Assigned a message thread",
  booking_status_changed: "Changed a booking status",
  content_created: "Created content",
  content_updated: "Updated content",
  content_deleted: "Deleted content",
  report_generated: "Generated a report",
};

export default async function AdminAuditLogPage() {
  const admin = await getCurrentAdmin();
  if (admin?.role !== "super_admin") notFound();

  const entries = await db.auditLog.findMany({
    include: { admin: true },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Audit Log</h1>
        <p className="mt-1 text-sm text-ink-secondary">Recent admin actions, most recent first.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border-brand">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-brand bg-muted">
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">When</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Admin</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Action</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Target</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b border-border-brand last:border-0">
                <td className="px-4 py-3 text-ink-secondary">{formatTime(e.createdAt)}</td>
                <td className="px-4 py-3 text-ink-secondary">{e.admin.name}</td>
                <td className="px-4 py-3 text-ink">{ACTION_LABELS[e.action] ?? e.action}</td>
                <td className="px-4 py-3 text-ink-muted">
                  {e.targetType ? `${e.targetType}${e.targetId ? ` · ${e.targetId.slice(0, 8)}…` : ""}` : "—"}
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-muted">
                  No activity yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
