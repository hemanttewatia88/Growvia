import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { HeroBackgroundMedia } from "@/components/sections/HeroBackgroundMedia";
import { HeroVideoRotator, type RotatingClip } from "@/components/sections/HeroVideoRotator";
import { getImage } from "@/lib/content";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroVideo {
  src: string;
  poster: string;
  alt: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageKey: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  variant?: "home" | "inner";
  video?: HeroVideo;
  videos?: RotatingClip[];
}

const MEDIA_CLASSES = "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 h-full w-full object-cover opacity-40 duration-1000";

export function PageHero({ eyebrow, title, subtitle, imageKey, primaryCta, secondaryCta, variant = "inner", video, videos }: PageHeroProps) {
  const image = getImage(imageKey);
  const isHome = variant === "home";

  return (
    <section className="relative overflow-hidden bg-navy text-ink-on-dark">
      {videos && videos.length > 0 ? (
        <HeroVideoRotator clips={videos} className={cn("absolute inset-0", MEDIA_CLASSES)} />
      ) : video ? (
        <HeroBackgroundMedia videoSrc={video.src} posterSrc={video.poster} alt={video.alt} className={cn("absolute inset-0", MEDIA_CLASSES)} />
      ) : (
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className={MEDIA_CLASSES} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/55" />
      <Container className={cn("relative", isHome ? "py-28 sm:py-36" : "py-20 sm:py-28")}>
        <div className={cn("flex flex-col gap-5", isHome ? "max-w-2xl" : "max-w-2xl")}>
          {eyebrow && (
            <span className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light duration-500">
              {eyebrow}
            </span>
          )}
          <h1
            className={cn(
              "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 font-display font-semibold drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] delay-100 duration-700",
              isHome ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 max-w-xl text-base text-ink-on-dark/90 delay-200 duration-700 sm:text-lg">
              {subtitle}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 mt-2 flex flex-wrap gap-3 delay-300 duration-700">
              {primaryCta && (
                <Button asChild size="lg" className="rounded-full px-6 transition-transform hover:scale-105">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 bg-transparent px-6 text-ink-on-dark transition-transform hover:scale-105 hover:bg-white/10 hover:text-ink-on-dark"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
