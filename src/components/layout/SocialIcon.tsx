import { cn } from "@/lib/utils";

// lucide-react no longer ships trademarked brand glyphs, so social links use
// simple monogram badges instead — swap for real brand SVGs if desired.
const MONOGRAMS: Record<string, string> = {
  Instagram: "IG",
  LinkedIn: "in",
  YouTube: "YT",
};

export function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  return (
    <span className={cn("text-[10px] font-bold leading-none", className)}>
      {MONOGRAMS[platform] ?? platform.slice(0, 2).toUpperCase()}
    </span>
  );
}
