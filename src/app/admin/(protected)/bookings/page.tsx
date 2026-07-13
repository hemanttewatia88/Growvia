import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { BookingStatusSelect } from "@/app/admin/(protected)/bookings/BookingStatusSelect";

export const metadata: Metadata = { title: "Bookings" };

function formatRange(start: Date, end: Date) {
  const date = start.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const startTime = start.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  const endTime = end.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  return `${date} · ${startTime} – ${endTime}`;
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string }>;
}) {
  const { type, status } = await searchParams;

  const bookings = await db.booking.findMany({
    where: { ...(type ? { type } : {}), ...(status ? { status } : {}) },
    include: { user: true },
    orderBy: { startsAt: "desc" },
    take: 100,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Bookings</h1>
        <p className="mt-1 text-sm text-ink-secondary">{bookings.length} result{bookings.length === 1 ? "" : "s"}</p>
      </div>

      <form method="get" className="flex flex-wrap items-end gap-3 rounded-2xl border border-border-brand bg-surface p-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="type" className="text-xs font-medium text-ink-secondary">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={type ?? ""}
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none"
          >
            <option value="">All types</option>
            <option value="class">Class</option>
            <option value="meeting-room">Meeting room</option>
            <option value="day-pass">Day pass</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status" className="text-xs font-medium text-ink-secondary">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={status ?? ""}
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none"
          >
            <option value="">Any status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button type="submit" className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80">
          Filter
        </button>
        {(type || status) && (
          <Link href="/admin/bookings" className="text-sm text-ink-muted hover:underline">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border-brand">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-brand bg-muted">
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Customer</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Booking</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">When</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-border-brand last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/customers/${b.userId}`} className="font-medium text-ink hover:text-bronze">
                    {b.user.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-secondary">{b.label}</td>
                <td className="px-4 py-3 text-ink-secondary">{formatRange(b.startsAt, b.endsAt)}</td>
                <td className="px-4 py-3">
                  <BookingStatusSelect bookingId={b.id} status={b.status} />
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-muted">
                  No bookings match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
