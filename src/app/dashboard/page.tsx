import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { getTiers } from "@/lib/content";
import { StatCard } from "@/components/dashboard/StatCard";
import { CreditBar } from "@/components/dashboard/CreditBar";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Overview" };

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function DashboardOverviewPage() {
  const user = await getCurrentUser();
  if (!user) return null; // layout already redirects; guards for type-narrowing

  const membership = await db.membership.findUnique({ where: { userId: user.id } });
  const tier = membership ? getTiers().find((t) => t.id === membership.tierId) : undefined;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-ink-secondary">Here&apos;s where your membership stands.</p>
      </div>

      {!membership ? (
        <div className="rounded-2xl border border-border-brand bg-surface p-8 text-center">
          <p className="font-display text-lg font-semibold text-ink">No active membership yet</p>
          <p className="mt-2 text-sm text-ink-secondary">Choose a plan to unlock fitness, co-working, and more.</p>
          <Button asChild size="lg" className="mt-5 rounded-full">
            <Link href="/membership">View Membership Plans</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Plan" value={tier?.name ?? membership.tierId} sub={tier?.audience} />
            <StatCard label="Status" value={membership.status} sub="Current membership status" />
            <StatCard label="Renews" value={formatDate(membership.renewalDate)} sub="Next billing date" />
          </div>

          <div className="rounded-2xl border border-border-brand bg-surface p-6">
            <p className="font-display text-lg font-semibold text-ink">This month&apos;s usage</p>
            <div className="mt-5 flex flex-col gap-5">
              <CreditBar
                label="Meeting room hours"
                used={membership.meetingHoursUsed}
                included={membership.meetingHoursIncluded}
                unit="hrs"
              />
              <CreditBar
                label="Personal training sessions"
                used={membership.ptSessionsUsed}
                included={membership.ptSessionsIncluded}
                unit="sessions"
              />
              <CreditBar
                label="Guest passes"
                used={membership.guestPassesUsed}
                included={membership.guestPassesIncluded}
                unit="passes"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
