import { CalendarDays } from "lucide-react";
import type { Event } from "@prisma/client";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function EventList({ events }: { events: Event[] }) {
  return (
    <div className="flex flex-col divide-y divide-border-brand rounded-2xl border border-border-brand bg-surface">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col gap-3 p-6 transition-colors duration-300 hover:bg-muted/60 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">{event.category}</span>
            <p className="mt-1 font-display text-lg font-semibold text-ink">{event.title}</p>
            <p className="mt-1.5 max-w-xl text-sm text-ink-secondary">{event.description}</p>
            <p className="mt-2 text-xs text-ink-muted">{event.cadence}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium text-ink">
            <CalendarDays className="size-4 text-bronze" />
            Next: {formatDate(event.nextDate)}
          </div>
        </div>
      ))}
    </div>
  );
}
