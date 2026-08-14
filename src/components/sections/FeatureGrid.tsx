import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/layout/Reveal";

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
      {items.map((item, i) => {
        const Icon = item.icon;
        const content = (
          <>
            {Icon && (
              <span className="flex size-10 items-center justify-center rounded-full bg-gold/15 text-bronze transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-5" />
              </span>
            )}
            <p className="mt-4 font-display text-lg font-semibold text-ink">{item.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{item.body}</p>
          </>
        );

        if (item.href) {
          return (
            <Reveal key={item.title} delay={i * 80}>
              <Link
                href={item.href}
                className="group block rounded-2xl border border-border-brand bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg"
              >
                {content}
              </Link>
            </Reveal>
          );
        }

        return (
          <Reveal key={item.title} delay={i * 80}>
            <div className="group rounded-2xl border border-border-brand bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              {content}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
