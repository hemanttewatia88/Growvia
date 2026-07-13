"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Autoplaying looped background video, falling back to a static poster under reduced motion. */
export function HeroBackgroundMedia({
  videoSrc,
  posterSrc,
  alt,
  className,
}: {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  className: string;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <Image src={posterSrc} alt={alt} fill priority sizes="100vw" className={className} />;
  }

  return (
    <video autoPlay muted loop playsInline preload="none" poster={posterSrc} aria-label={alt} className={className}>
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
