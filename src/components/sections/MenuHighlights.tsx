import type { MenuGroup } from "@/types/content";

export function MenuHighlights({ groups }: { groups: MenuGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.id}>
          <p className="font-display text-lg font-semibold text-ink">{group.name}</p>
          <p className="mt-1 text-sm text-ink-secondary">{group.description}</p>
          <ul className="mt-4 flex flex-col gap-4">
            {group.items.map((item) => (
              <li key={item.name} className="border-t border-border-brand pt-3 first:border-0 first:pt-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{item.name}</p>
                  {item.tag && (
                    <span className="shrink-0 rounded-full bg-sage-light/50 px-2.5 py-0.5 text-xs font-medium text-sage-deep">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ink-secondary">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
