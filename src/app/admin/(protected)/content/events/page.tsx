import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ContentTabs } from "@/components/admin/ContentTabs";
import { EventManager } from "@/app/admin/(protected)/content/events/EventManager";

export const metadata: Metadata = { title: "Events" };

export default async function AdminEventsPage() {
  const events = await db.event.findMany({ orderBy: { nextDate: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Content</h1>
        <p className="mt-1 text-sm text-ink-secondary">Manage what appears on the public site.</p>
      </div>
      <ContentTabs active="events" />
      <EventManager initial={events} />
    </div>
  );
}
