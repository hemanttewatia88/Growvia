import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { BookingList } from "@/components/dashboard/BookingList";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Bookings" };

export default async function DashboardBookingsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const bookings = await db.booking.findMany({ where: { userId: user.id }, orderBy: { startsAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Bookings</h1>
          <p className="mt-1 text-sm text-ink-secondary">Your classes, meeting rooms, and day passes.</p>
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/meeting-rooms">Book a Meeting Room</Link>
        </Button>
      </div>
      <BookingList bookings={bookings} />
    </div>
  );
}
