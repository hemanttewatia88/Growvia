"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const REPORT_TYPES = [
  { value: "membership-growth", label: "Membership Growth" },
  { value: "active-by-tier", label: "Active Members by Tier" },
  { value: "revenue-by-tier", label: "Revenue by Tier" },
  { value: "booking-volume", label: "Booking Volume by Type" },
] as const;

function defaultFrom() {
  const d = new Date();
  d.setMonth(d.getMonth() - 6);
  return d.toISOString().slice(0, 10);
}
function defaultTo() {
  return new Date().toISOString().slice(0, 10);
}

interface ReportResult {
  label: string;
  columns: string[];
  rows: (string | number)[][];
}

function downloadCsv(result: ReportResult) {
  const lines = [result.columns.join(","), ...result.rows.map((r) => r.join(","))];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${result.label.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function ReportBuilder() {
  const [type, setType] = useState<(typeof REPORT_TYPES)[number]["value"]>("membership-growth");
  const [from, setFrom] = useState(defaultFrom());
  const [to, setTo] = useState(defaultTo());
  const [result, setResult] = useState<ReportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRun(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, from, to }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleRun} className="flex flex-wrap items-end gap-3 rounded-2xl border border-border-brand bg-surface p-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="type">Report</Label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as typeof type)}
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none"
          >
            {REPORT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="from">From</Label>
          <input
            id="from"
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="to">To</Label>
          <input
            id="to"
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-9 rounded-lg border border-border-brand bg-transparent px-3 text-sm outline-none"
          />
        </div>
        <Button type="submit" disabled={loading} className="rounded-full">
          {loading ? "Running…" : "Run Report"}
        </Button>
        {result && (
          <Button type="button" variant="outline" onClick={() => downloadCsv(result)} className="rounded-full">
            Export CSV
          </Button>
        )}
      </form>

      {error && <p className="text-sm text-error">{error}</p>}

      {result && (
        <div className="overflow-x-auto rounded-2xl border border-border-brand">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-brand bg-muted">
                {result.columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i} className="border-b border-border-brand last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 text-ink-secondary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
              {result.rows.length === 0 && (
                <tr>
                  <td colSpan={result.columns.length} className="px-4 py-8 text-center text-ink-muted">
                    No data in this range.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
