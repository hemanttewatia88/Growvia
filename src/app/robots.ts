import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/login", "/register", "/forgot-password", "/reset-password", "/dashboard"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
