import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ICON_SIZES = {
  sm: { box: "h-12 w-12", px: 48 },
  md: { box: "h-16 w-16", px: 64 },
  lg: { box: "h-20 w-20", px: 80 },
} as const;

/** Compact icon-only mark for headers and sidebars — links back to the public site. */
export function Logo({
  size = "sm",
  className,
}: {
  size?: keyof typeof ICON_SIZES;
  className?: string;
}) {
  const { box, px } = ICON_SIZES[size];
  return (
    <Link
      href="/"
      aria-label="GrowViaSphere — go to homepage"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl bg-[#0b0d10] p-1 transition-transform hover:scale-105",
        box,
        className,
      )}
    >
      <Image
        src="/images/logo-icon.png"
        alt="GrowViaSphere"
        width={294}
        height={168}
        sizes={`${px}px`}
        priority
        className="h-full w-full object-contain"
      />
    </Link>
  );
}

/** Full lockup (icon + wordmark + tagline) for spacious contexts like auth cards. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GrowViaSphere — go to homepage"
      className={cn("inline-flex w-40 shrink-0 items-center justify-center rounded-2xl bg-[#0b0d10] p-3", className)}
    >
      <Image
        src="/images/logo.png"
        alt="GrowViaSphere — Train. Work. Connect. Grow."
        width={294}
        height={274}
        sizes="160px"
        priority
        className="h-full w-full object-contain"
      />
    </Link>
  );
}
