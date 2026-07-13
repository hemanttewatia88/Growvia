import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImage } from "@/lib/content";
import type { Vertical } from "@/types/content";

export function VerticalOverview({ verticals }: { verticals: Vertical[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {verticals.map((vertical) => {
        const image = getImage(vertical.imageKey);
        return (
          <Link
            key={vertical.id}
            href={vertical.href}
            className="group relative overflow-hidden rounded-2xl border border-border-brand bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                loading="lazy"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-xl font-semibold text-ink">{vertical.name}</p>
                <ArrowUpRight className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="mt-1 text-sm font-medium text-bronze">{vertical.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{vertical.description}</p>
              <ul className="mt-4 flex flex-col gap-1.5">
                {vertical.highlights.map((h) => (
                  <li key={h} className="text-sm text-ink-secondary before:mr-2 before:text-gold before:content-['—']">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
