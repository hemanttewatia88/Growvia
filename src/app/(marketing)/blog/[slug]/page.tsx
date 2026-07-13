import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { CTABand } from "@/components/sections/CTABand";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, blogPostingSchema } from "@/lib/seo";
import { getAllPosts, getPostBySlug, getImage } from "@/lib/content";
import type { BlogBlock } from "@/types/content";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    imageKey: post.imageKey,
    type: "article",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="mt-10 mb-3 font-display text-2xl font-semibold text-ink">{block.text}</h2>;
    case "paragraph":
      return <p className="mb-5 text-base leading-relaxed text-ink-secondary">{block.text}</p>;
    case "list":
      return (
        <ul className="mb-5 flex flex-col gap-2">
          {block.items.map((item) => (
            <li key={item} className="text-base leading-relaxed text-ink-secondary before:mr-2 before:text-gold before:content-['—']">
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-6 border-l-2 border-gold pl-5 font-display text-xl font-medium italic text-ink">
          {block.text}
        </blockquote>
      );
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const image = getImage(post.imageKey);

  return (
    <>
      <JsonLd schema={blogPostingSchema(post)} />
      <PageHero eyebrow={post.category} title={post.title} subtitle={post.description} imageKey={post.imageKey} />

      <Section tone="paper" containerSize="narrow">
        <div className="mb-8 flex items-center gap-3 text-sm text-ink-muted">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.publishedAt)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>
        <article>
          {post.body.map((block, i) => (
            <BlockRenderer key={i} block={block} />
          ))}
        </article>
      </Section>

      <CTABand
        title="See how GrowViaSphere puts this into practice"
        body="Fitness, co-working, café, and meeting rooms — all under one membership."
        primaryCta={{ label: "Explore Membership", href: "/membership" }}
        secondaryCta={{ label: "More from the Blog", href: "/blog" }}
      />
    </>
  );
}
