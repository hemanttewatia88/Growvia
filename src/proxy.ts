import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth/admin-session";

// Fast presence-only checks (no DB call here — see Next's own guidance to avoid relying on
// Proxy as the sole guard). The authoritative checks live in the relevant layout:
// src/app/dashboard/layout.tsx (getCurrentUser) and
// src/app/admin/(protected)/layout.tsx (getCurrentAdmin + mustChangePassword redirect) —
// both also catch expired/invalid sessions that still have a cookie present.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    if (!request.cookies.has(ADMIN_SESSION_COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  if (!request.cookies.has(SESSION_COOKIE_NAME)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
