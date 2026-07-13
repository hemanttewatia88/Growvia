import { Check, Minus } from "lucide-react";
import type { FeatureMatrixRow, MembershipTier } from "@/types/content";

interface ComparisonTableProps {
  tiers: MembershipTier[];
  featureRows: FeatureMatrixRow[];
}

function renderValue(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-4 text-sage-deep" aria-label="Included" />
    ) : (
      <Minus className="mx-auto size-4 text-ink-muted" aria-label="Not included" />
    );
  }
  return <span className="text-sm text-ink-secondary">{value}</span>;
}

export function ComparisonTable({ tiers, featureRows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-brand">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <caption className="sr-only">Membership tier feature comparison</caption>
        <thead>
          <tr className="border-b border-border-brand bg-muted">
            <th scope="col" className="px-4 py-3.5 text-left font-display font-semibold text-ink">
              Feature
            </th>
            {tiers.map((tier) => (
              <th key={tier.id} scope="col" className="px-4 py-3.5 text-center font-display font-semibold text-ink">
                {tier.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureRows.map((row) => (
            <tr key={row.feature} className="border-b border-border-brand last:border-0">
              <th scope="row" className="px-4 py-3.5 text-left font-medium text-ink-secondary">
                {row.feature}
              </th>
              {tiers.map((tier) => (
                <td key={tier.id} className="px-4 py-3.5 text-center">
                  {renderValue(row.values[tier.id] ?? false)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
