import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureGridItem {
  icon?: LucideIcon;
  title: string;
  body: string;
  href?: string;
}

interface FeatureGridProps {
  items: FeatureGridItem[];
  columns?: 2 | 3 | 4;
}

const COLUMN_CLASSES: Record<NonNullable<FeatureGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGrid({ items, columns = 3 }: FeatureGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-5", COLUMN_CLASSES[columns])}>
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <>
            {Icon && (
              <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-bronze">
                <Icon className="size-5" />
              </span>
            )}
            <p className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{item.body}</p>
          </>
        );

        if (item.href) {
          return (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-border-brand bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-border-brand bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
