import type { Booking } from "@prisma/client";
import { CalendarDays, Dumbbell, DoorClosed, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_ICON: Record<string, typeof CalendarDays> = {
  class: Dumbbell,
  "meeting-room": DoorClosed,
  "day-pass": Ticket,
};

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-gold/10 text-bronze",
  completed: "bg-success/10 text-success",
  cancelled: "bg-error/10 text-error",
};

function formatRange(start: Date, end: Date) {
  const date = start.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const startTime = start.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  const endTime = end.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  return `${date} · ${startTime} – ${endTime}`;
}

export function BookingList({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return <p className="text-sm text-ink-muted">No bookings yet.</p>;
  }

  return (
    <div className="flex flex-col divide-y divide-border-brand rounded-2xl border border-border-brand bg-surface">
      {bookings.map((booking) => {
        const Icon = TYPE_ICON[booking.type] ?? CalendarDays;
        return (
          <div key={booking.id} className="flex items-center gap-4 p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/10 text-bronze">
              <Icon className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-ink">{booking.label}</p>
              <p className="text-xs text-ink-muted">{formatRange(booking.startsAt, booking.endsAt)}</p>
            </div>
            <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_STYLES[booking.status])}>
              {booking.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
