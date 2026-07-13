"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, CalendarDays, MessageCircle, Settings, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import type { SafeUser } from "@/types/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/billing", label: "Billing", icon: Receipt },
  { href: "/dashboard/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/dashboard/messages", label: "Messages", icon: MessageCircle },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardShell({ user, children }: { user: SafeUser; children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.assign("/login");
  }

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-gold/15 text-bronze" : "text-ink-secondary hover:bg-muted",
            )}
          >
            <Icon className="size-4.5" />
            {item.label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-ink-secondary hover:bg-muted"
      >
        <LogOut className="size-4.5" />
        Log out
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex h-16 items-center justify-between border-b border-border-brand bg-surface px-5 lg:hidden">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-semibold text-ink">GrowViaSphere</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-md p-2 hover:bg-muted"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {mobileOpen && (
        <div className="border-b border-border-brand bg-surface px-5 py-4 lg:hidden">{nav}</div>
      )}

      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:py-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="mb-6 flex items-center gap-3">
            <Logo size="md" />
            <span className="font-display text-lg font-semibold text-ink">GrowViaSphere</span>
          </div>
          <p className="mb-4 truncate text-xs text-ink-muted">{user.email}</p>
          {nav}
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
