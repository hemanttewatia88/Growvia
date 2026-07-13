import { Camera } from "lucide-react";
import { getSiteInfo } from "@/lib/content";

// Static stand-in for a live Instagram feed — wire to the Instagram Graph API
// (or an embed provider) before launch.
export function SocialFeedPlaceholder() {
  const site = getSiteInfo();
  const instagram = site.socials.find((s) => s.platform === "Instagram");

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-navy-mid to-navy text-ink-on-dark/40"
        >
          <Camera className="size-6" />
        </div>
      ))}
      {instagram && (
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-3 mt-1 text-center text-sm font-medium text-bronze hover:underline sm:col-span-6"
        >
          Follow @growviasphere on Instagram
        </a>
      )}
    </div>
  );
}
