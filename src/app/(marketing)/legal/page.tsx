import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { buildMetadata } from "@/lib/seo";
import { getSiteInfo } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Legal",
  description: "GrowViaSphere's Privacy Policy, Terms of Service, Refund & Cancellation Policy, and Cookie Policy.",
  path: "/legal",
});

const pages = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-of-service", label: "Terms of Service" },
  { href: "/legal/refund-cancellation", label: "Refund & Cancellation Policy" },
  { href: "/legal/cookie-policy", label: "Cookie Policy" },
];

export default function LegalIndexPage() {
  const site = getSiteInfo();

  return (
    <Section tone="paper">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink">Legal</h1>
        <p className="mt-3 text-sm text-ink-secondary">
          Policies governing your use of {site.name}&apos;s website and membership.
        </p>
        <ul className="mt-8 flex flex-col gap-3">
          {pages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="font-medium text-bronze hover:underline">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
