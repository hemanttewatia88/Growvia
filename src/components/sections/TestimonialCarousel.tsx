"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@prisma/client";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  if (!current) return null;

  function go(delta: number) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="flex justify-center gap-1" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("size-4", i < current.rating ? "fill-gold text-gold" : "fill-transparent text-border-brand")}
          />
        ))}
      </div>
      <blockquote
        key={current.id}
        className="motion-safe:animate-in motion-safe:fade-in mt-5 font-display text-xl font-medium text-ink duration-500 sm:text-2xl"
      >
        &ldquo;{current.quote}&rdquo;
      </blockquote>
      <p key={`${current.id}-name`} className="motion-safe:animate-in motion-safe:fade-in mt-5 text-sm font-semibold text-ink duration-500">
        {current.name}
      </p>
      <p className="text-sm text-ink-muted">{current.role}</p>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full transition-transform hover:scale-110"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="flex gap-1.5" role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "size-2 rounded-full transition-all",
                i === index ? "w-5 bg-gold" : "bg-border-brand hover:bg-gold/50",
              )}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full transition-transform hover:scale-110"
          onClick={() => go(1)}
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
