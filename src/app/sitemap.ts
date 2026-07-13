import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getAllPosts } from "@/lib/content";

const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: NOW, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/fitness`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/co-working`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/cafe-nutrition`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/meeting-rooms`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/membership`, lastModified: NOW, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/corporate`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/community-events`, lastModified: NOW, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/locations`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: NOW, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/testimonials`, lastModified: NOW, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/faq`, lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: NOW, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/careers`, lastModified: NOW, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/legal`, lastModified: NOW, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/privacy-policy`, lastModified: NOW, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/terms-of-service`, lastModified: NOW, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/refund-cancellation`, lastModified: NOW, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/legal/cookie-policy`, lastModified: NOW, changeFrequency: "yearly", priority: 0.2 },
  ];

  return [...staticRoutes, ...blogRoutes];
}
