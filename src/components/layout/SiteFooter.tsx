import Link from "next/link";
import { getSiteInfo } from "@/lib/content";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SocialIcon } from "@/components/layout/SocialIcon";

export function SiteFooter() {
  const site = getSiteInfo();

  return (
    <footer className="border-t border-navy-mid bg-navy text-ink-on-dark">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-semibold">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm text-ink-on-dark/70">{site.tagline}</p>
            <div className="mt-5 flex gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 text-ink-on-dark/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon platform={s.platform} />
                </a>
              ))}
            </div>
          </div>

          {site.footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-on-dark/50">{group.title}</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-on-dark/80 hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-on-dark/50">Stay in the loop</p>
            <p className="mt-3 text-sm text-ink-on-dark/70">Workplace wellness insights, monthly.</p>
            <NewsletterForm variant="dark" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ink-on-dark/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>
            {site.address.street}, {site.address.area}, {site.address.city}, {site.address.state}{" "}
            {site.address.postalCode}
          </p>
        </div>
      </Container>
    </footer>
  );
}
