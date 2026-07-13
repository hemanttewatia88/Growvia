import type { Metadata } from "next";
import { db } from "@/lib/db";
import { ContentTabs } from "@/components/admin/ContentTabs";
import { TestimonialManager } from "@/app/admin/(protected)/content/testimonials/TestimonialManager";

export const metadata: Metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Content</h1>
        <p className="mt-1 text-sm text-ink-secondary">Manage what appears on the public site.</p>
      </div>
      <ContentTabs active="testimonials" />
      <TestimonialManager initial={testimonials} />
    </div>
  );
}
