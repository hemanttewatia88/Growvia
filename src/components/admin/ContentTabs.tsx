import Link from "next/link";
import { cn } from "@/lib/utils";

export function ContentTabs({ active }: { active: "testimonials" | "events" }) {
  return (
    <div className="flex gap-1 self-start rounded-full bg-muted p-1 text-sm">
      <Link
        href="/admin/content/testimonials"
        className={cn("rounded-full px-4 py-1.5 font-medium", active === "testimonials" ? "bg-surface text-ink shadow-sm" : "text-ink-muted")}
      >
        Testimonials
      </Link>
      <Link
        href="/admin/content/events"
        className={cn("rounded-full px-4 py-1.5 font-medium", active === "events" ? "bg-surface text-ink shadow-sm" : "text-ink-muted")}
      >
        Events
      </Link>
    </div>
  );
}
