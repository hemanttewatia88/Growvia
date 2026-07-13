import type { ReactNode } from "react";

// Tasteful, section-level caption flagging illustrative content (testimonials, team
// bios, pricing, address) for the client to replace with real data before launch.
export function PlaceholderNotice({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-center text-xs italic text-ink-muted">{children}</p>;
}
