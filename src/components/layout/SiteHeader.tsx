"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getSiteInfo } from "@/lib/content";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const site = getSiteInfo();
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border-brand bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <Logo />
          <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
            {site.name}
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-[1px] after:left-0 after:h-0.5 after:rounded-full after:bg-gold after:transition-all",
                  active ? "text-ink after:w-full" : "text-ink-secondary after:w-0 hover:text-ink hover:after:w-full",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/login" className="text-sm font-medium text-ink-secondary hover:text-ink">
            Login
          </Link>
          <Button asChild size="lg" className="h-9 rounded-full px-5">
            <Link href="/membership#join">Join Now</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col gap-6 px-5 pt-14">
            <SheetHeader className="p-0">
              <SheetTitle className="font-display text-lg">{site.name}</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {site.nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-md px-2 py-2.5 text-base font-medium transition-colors",
                        active ? "bg-gold/15 text-bronze" : "text-ink hover:bg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-3 border-t border-border-brand pt-5">
              <SheetClose asChild>
                <Link href="/login" className="text-center text-sm font-medium text-ink-secondary">
                  Login
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/membership#join">Join Now</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
