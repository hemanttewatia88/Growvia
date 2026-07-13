import Image from "next/image";
import { getImage } from "@/lib/content";
import type { TeamMember } from "@/types/content";

export function TeamGrid({ people }: { people: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => {
        const image = getImage(person.imageKey);
        return (
          <div key={person.id} className="rounded-2xl border border-border-brand bg-surface p-6">
            <div className="relative size-16 overflow-hidden rounded-full">
              <Image src={image.src} alt={image.alt} fill loading="lazy" className="object-cover" sizes="64px" />
            </div>
            <p className="mt-4 font-display text-lg font-semibold text-ink">{person.name}</p>
            <p className="text-sm font-medium text-bronze">{person.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{person.bio}</p>
          </div>
        );
      })}
    </div>
  );
}
