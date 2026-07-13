import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Messages" };

function formatTime(date: Date) {
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const showAll = filter === "all";

  const messages = await db.message.findMany({
    include: { user: true, assignedToAdmin: true },
    orderBy: { createdAt: "desc" },
  });

  const byUser = new Map<string, typeof messages>();
  for (const m of messages) {
    const list = byUser.get(m.userId);
    if (list) list.push(m);
    else byUser.set(m.userId, [m]);
  }

  const threads = Array.from(byUser.values())
    .map((thread) => ({
      user: thread[0]!.user,
      latest: thread[0]!,
      unresolvedCount: thread.filter((m) => m.sender === "member" && !m.resolvedAt).length,
      assignedTo: thread.find((m) => m.assignedToAdmin)?.assignedToAdmin ?? null,
    }))
    .filter((t) => showAll || t.unresolvedCount > 0)
    .sort((a, b) => b.latest.createdAt.getTime() - a.latest.createdAt.getTime());

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Messages</h1>
          <p className="mt-1 text-sm text-ink-secondary">Customer chat and support email threads.</p>
        </div>
        <div className="flex gap-1 rounded-full bg-muted p-1 text-sm">
          <Link
            href="/admin/messages"
            className={cn("rounded-full px-3 py-1.5 font-medium", !showAll ? "bg-surface text-ink shadow-sm" : "text-ink-muted")}
          >
            Unresolved
          </Link>
          <Link
            href="/admin/messages?filter=all"
            className={cn("rounded-full px-3 py-1.5 font-medium", showAll ? "bg-surface text-ink shadow-sm" : "text-ink-muted")}
          >
            All
          </Link>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-border-brand rounded-2xl border border-border-brand bg-surface">
        {threads.length === 0 && <p className="p-6 text-sm text-ink-muted">Nothing here.</p>}
        {threads.map((t) => (
          <Link
            key={t.user.id}
            href={`/admin/messages/${t.user.id}`}
            className="flex flex-col gap-1 p-5 hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-ink">{t.user.name}</p>
                {t.unresolvedCount > 0 && (
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning">
                    {t.unresolvedCount} open
                  </span>
                )}
                {t.assignedTo && (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-ink-muted">→ {t.assignedTo.name}</span>
                )}
              </div>
              <p className="mt-0.5 truncate text-sm text-ink-secondary">
                {t.latest.sender === "member" ? "" : "You: "}
                {t.latest.body}
              </p>
            </div>
            <p className="shrink-0 text-xs text-ink-muted">{formatTime(t.latest.createdAt)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
