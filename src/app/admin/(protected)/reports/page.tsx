import type { Metadata } from "next";
import { ReportBuilder } from "@/app/admin/(protected)/reports/ReportBuilder";

export const metadata: Metadata = { title: "Reports" };

export default function AdminReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Reports</h1>
        <p className="mt-1 text-sm text-ink-secondary">Run a report, then export the results as CSV.</p>
      </div>
      <ReportBuilder />
    </div>
  );
}
