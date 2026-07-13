import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { getTiers } from "@/lib/content";

export const metadata: Metadata = { title: "Customers" };

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

interface SearchParams {
  q?: string;
  tier?: string;
  status?: string;
}

export default async function AdminCustomersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { q, tier, status } = await searchParams;
  const tiers = getTiers();

  const customers = await db.user.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { email: { contains: q } },
              { phone: { contains: q } },
            ],
          }
        : {}),
      ...(tier || status
        ? {
            membership: {
              ...(tier ? { tierId: tier } : {}),
              ...(status ? { status } : {}),
            },
          }
        : {}),
    },
    include: { membership: true },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Customers</h1>
        <p className="mt-1 text-sm text-ink-secondary">{customers.length} result{customers.length === 1 ? "" : "s"}</p>
      </div>

      <form method="get" className="flex flex-wrap items-end gap-3 rounded-2xl border border-border-brand bg-surface p-4">
        <div className="flex min-w-[200px] flex-1 flex-col gap-1.5">
          <label htmlFor="q" className="text-xs font-medium text-ink-secondary">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Name, email, or phone"
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tier" className="text-xs font-medium text-ink-secondary">
            Tier
          </label>
          <select
            id="tier"
            name="tier"
            defaultValue={tier ?? ""}
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
          >
            <option value="">All tiers</option>
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
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
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none focus-visible:border-ring"
          >
            <option value="">Any status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <button
          type="submit"
          className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          Filter
        </button>
        {(q || tier || status) && (
          <Link href="/admin/customers" className="text-sm text-ink-muted hover:underline">
            Clear
          </Link>
        )}
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border-brand">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-brand bg-muted">
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Name</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Email</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Tier</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Status</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const tierName = c.membership ? tiers.find((t) => t.id === c.membership!.tierId)?.name : null;
              return (
                <tr key={c.id} className="border-b border-border-brand last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/customers/${c.id}`} className="font-medium text-ink hover:text-bronze">
                      {c.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-ink-secondary">{c.email}</td>
                  <td className="px-4 py-3 text-ink-secondary">{tierName ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-secondary capitalize">{c.membership?.status ?? "No membership"}</td>
                  <td className="px-4 py-3 text-ink-secondary">{formatDate(c.createdAt)}</td>
                </tr>
              );
            })}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                  No customers match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
