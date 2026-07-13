import type { Invoice } from "@prisma/client";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  failed: "bg-error/10 text-error",
};

export function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return <p className="text-sm text-ink-muted">No invoices yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border-brand">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-brand bg-muted">
            <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Date</th>
            <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Description</th>
            <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Amount</th>
            <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Status</th>
            <th scope="col" className="px-4 py-3 text-right font-display font-semibold text-ink">Receipt</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-border-brand last:border-0">
              <td className="px-4 py-3 text-ink-secondary">{formatDate(invoice.issuedAt)}</td>
              <td className="px-4 py-3 text-ink-secondary">{invoice.description}</td>
              <td className="px-4 py-3 font-medium text-ink">{formatAmount(invoice.amount, invoice.currency)}</td>
              <td className="px-4 py-3">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_STYLES[invoice.status])}>
                  {invoice.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                {invoice.receiptUrl ? (
                  <a href={invoice.receiptUrl} className="inline-flex items-center gap-1 text-bronze hover:underline">
                    <Download className="size-3.5" /> Download
                  </a>
                ) : (
                  <span className="text-ink-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
