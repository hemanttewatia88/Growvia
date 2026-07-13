"use client";

import { useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export interface RotatingClip {
  src: string;
  poster: string;
  alt: string;
  label: string;
}

/**
 * Cycles through one background video per service, playing each to completion before
 * advancing (remounting the <video> via `key` so the browser honors autoplay on the new
 * source). Falls back to the first clip's poster, no rotation, under reduced motion.
 */
export function HeroVideoRotator({ clips, className }: { clips: RotatingClip[]; className: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const clip = clips[index] ?? clips[0];

  if (prefersReducedMotion || !clip) {
    const first = clips[0];
    if (!first) return null;
    return <Image src={first.poster} alt={first.alt} fill priority sizes="100vw" className={className} />;
  }

  return (
    <>
      <video
        key={clip.src}
        autoPlay
        muted
        playsInline
        preload="none"
        poster={clip.poster}
        aria-label={clip.alt}
        onEnded={() => setIndex((i) => (i + 1) % clips.length)}
        className={cn(className, "motion-safe:animate-in motion-safe:fade-in duration-1000")}
      >
        <source src={clip.src} type="video/mp4" />
      </video>
      <div
        className="absolute right-6 bottom-6 z-10 flex items-center gap-3 rounded-full bg-navy/60 px-4 py-2 backdrop-blur-sm"
        aria-hidden="true"
      >
        <span className="text-xs font-semibold tracking-wide text-ink-on-dark uppercase">{clip.label}</span>
        <div className="flex gap-1.5">
          {clips.map((c, i) => (
            <span
              key={c.label}
              className={cn("h-1.5 rounded-full transition-all duration-500", i === index ? "w-6 bg-gold" : "w-1.5 bg-white/40")}
            />
          ))}
        </div>
      </div>
    </>
  );
}
