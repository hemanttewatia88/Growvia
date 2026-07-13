import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getTiers } from "@/lib/content";
import { InvoiceTable } from "@/components/dashboard/InvoiceTable";
import { BookingList } from "@/components/dashboard/BookingList";
import { SendResetLinkButton } from "@/app/admin/(protected)/customers/[id]/SendResetLinkButton";

export const metadata: Metadata = { title: "Customer" };

export default async function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const customer = await db.user.findUnique({
    where: { id },
    include: {
      membership: true,
      invoices: { orderBy: { issuedAt: "desc" } },
      bookings: { orderBy: { startsAt: "desc" } },
      messages: { orderBy: { createdAt: "desc" }, take: 20 },
    },
  });
  if (!customer) notFound();

  const tierName = customer.membership ? getTiers().find((t) => t.id === customer.membership!.tierId)?.name : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">{customer.name}</h1>
          <p className="mt-1 text-sm text-ink-secondary">
            {customer.email} · {customer.phone}
          </p>
        </div>
        <SendResetLinkButton customerId={customer.id} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border-brand bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Membership</p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">{tierName ?? "None"}</p>
          {customer.membership && <p className="mt-1 text-xs text-ink-muted capitalize">{customer.membership.status}</p>}
        </div>
        <div className="rounded-2xl border border-border-brand bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Email verified</p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">{customer.emailVerifiedAt ? "Yes" : "No"}</p>
        </div>
        <div className="rounded-2xl border border-border-brand bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Phone verified</p>
          <p className="mt-2 font-display text-xl font-semibold text-ink">{customer.phoneVerifiedAt ? "Yes" : "No"}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">Billing history</h2>
        <InvoiceTable invoices={customer.invoices} />
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">Bookings</h2>
        <BookingList bookings={customer.bookings} />
      </div>

      <div>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">Recent messages</h2>
        {customer.messages.length === 0 ? (
          <p className="text-sm text-ink-muted">No messages yet.</p>
        ) : (
          <div className="flex flex-col divide-y divide-border-brand rounded-2xl border border-border-brand bg-surface">
            {customer.messages.map((m) => (
              <div key={m.id} className="p-4 text-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                  {m.sender === "member" ? "Customer" : "Staff"} · {m.channel} · {m.createdAt.toLocaleString("en-IN")}
                  {m.resolvedAt && " · Resolved"}
                </p>
                <p className="mt-1 text-ink">{m.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
