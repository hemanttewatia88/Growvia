import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { InvoiceTable } from "@/components/dashboard/InvoiceTable";

export const metadata: Metadata = { title: "Billing" };

export default async function DashboardBillingPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const invoices = await db.invoice.findMany({ where: { userId: user.id }, orderBy: { issuedAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Billing</h1>
        <p className="mt-1 text-sm text-ink-secondary">Your past invoices and receipts.</p>
      </div>
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
