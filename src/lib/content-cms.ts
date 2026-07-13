// DB-backed content accessors (Phase 3 CMS) — Testimonials and Events. Kept out of
// lib/content.ts deliberately: that module is imported by Client Components (e.g.
// LiveChatStub calls getSiteInfo()), and pulling in src/lib/db.ts's pg dependency
// there breaks the client bundle. Only import this file from Server Components /
// route handlers.
import { db } from "@/lib/db";

export async function getTestimonials() {
  return db.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getAggregateRating() {
  const testimonials = await getTestimonials();
  const count = testimonials.length;
  const average = testimonials.reduce((sum, t) => sum + t.rating, 0) / Math.max(count, 1);
  return { ratingValue: Math.round(average * 10) / 10, reviewCount: count };
}

export async function getEvents() {
  return db.event.findMany({ orderBy: { nextDate: "asc" } });
}
