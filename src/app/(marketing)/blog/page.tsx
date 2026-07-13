import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, getImage } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Insights",
  description:
    "Insights on fitness, hybrid work, and workplace wellness from the GrowViaSphere team — for founders and professionals building a sustainable working life.",
  path: "/blog",
  imageKey: "blog-hidden-cost",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog & Insights"
        title="Ideas on fitness, hybrid work, and workplace wellness"
        subtitle="Practical thinking for founders and professionals building a working life that doesn't run on willpower alone."
        imageKey="blog-hidden-cost"
      />

      <Section tone="paper">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {posts.map((post) => {
            const image = getImage(post.imageKey);
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border-brand bg-surface"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-bronze">{post.category}</p>
                  <p className="mt-2 font-display text-xl font-semibold text-ink">{post.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-ink-muted">
                    {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
