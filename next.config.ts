import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  // Block framing — prevents clickjacking
  { key: "X-Frame-Options", value: "DENY" },
  // Stop MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Referrer policy — sends origin only on cross-site navigation
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No payments/camera/mic/geolocation surface exists yet in this phase
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Tell browsers to enforce HTTPS for 1 year (enable after SSL confirmed)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
