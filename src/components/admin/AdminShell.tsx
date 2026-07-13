"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageCircle,
  CalendarClock,
  Newspaper,
  BarChart3,
  Settings,
  UserCog,
  ScrollText,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/Logo";
import type { SafeAdmin } from "@/lib/auth/admin-session";

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: MessageCircle },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarClock },
  { href: "/admin/content/testimonials", label: "Content", icon: Newspaper },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const SUPER_ADMIN_ITEMS = [
  { href: "/admin/team", label: "Team", icon: UserCog },
  { href: "/admin/audit-log", label: "Audit Log", icon: ScrollText },
];

export function AdminShell({ admin, children }: { admin: SafeAdmin; children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = admin.role === "super_admin" ? [...NAV_ITEMS, ...SUPER_ADMIN_ITEMS] : NAV_ITEMS;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.assign("/admin/login");
  }

  const nav = (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
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
      <header className="flex h-16 items-center justify-between border-b border-border-brand bg-navy px-5 lg:hidden">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-display text-lg font-semibold text-ink-on-dark">GrowViaSphere Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="rounded-md p-2 text-ink-on-dark hover:bg-white/10"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {mobileOpen && <div className="border-b border-border-brand bg-surface px-5 py-4 lg:hidden">{nav}</div>}

      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-8 sm:px-8 lg:py-10">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="mb-2 flex items-center gap-3">
            <Logo size="md" />
            <span className="font-display text-lg font-semibold text-ink">GrowViaSphere</span>
          </div>
          <p className="mb-4 text-xs uppercase tracking-wide text-bronze">Admin</p>
          <p className="mb-4 truncate text-xs text-ink-muted">
            {admin.name} · {admin.role === "super_admin" ? "Super Admin" : "Support Staff"}
          </p>
          {nav}
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
