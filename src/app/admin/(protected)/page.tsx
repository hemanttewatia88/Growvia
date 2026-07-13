import type { Metadata } from "next";
import { db } from "@/lib/db";
import { StatCard } from "@/components/dashboard/StatCard";

export const metadata: Metadata = { title: "Overview" };

export default async function AdminOverviewPage() {
  const [totalCustomers, activeMemberships, openMessages, upcomingBookings] = await Promise.all([
    db.user.count(),
    db.membership.count({ where: { status: "active" } }),
    db.message.count({ where: { resolvedAt: null, sender: "member" } }),
    db.booking.count({ where: { status: "upcoming" } }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Overview</h1>
        <p className="mt-1 text-sm text-ink-secondary">A snapshot of the business right now.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total customers" value={String(totalCustomers)} />
        <StatCard label="Active memberships" value={String(activeMemberships)} />
        <StatCard label="Open messages" value={String(openMessages)} sub="Awaiting a reply" />
        <StatCard label="Upcoming bookings" value={String(upcomingBookings)} />
      </div>
    </div>
  );
}
