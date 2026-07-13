import { AlertTriangle } from "lucide-react";

export function LegalReviewNotice() {
  return (
    <div className="mb-8 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/10 px-5 py-4 text-sm text-ink">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
      <p>
        <strong className="font-semibold">Draft template — pending legal review.</strong> This page uses standard
        placeholder language and must be reviewed by qualified legal counsel before the site goes live.
      </p>
    </div>
  );
}
