import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { generateToken, hashToken } from "@/lib/auth/tokens";
import { SESSION_MAX_AGE_MS, IDLE_SESSION_TIMEOUT_MS } from "@/lib/auth/constants";

export const ADMIN_SESSION_COOKIE_NAME = "gvs_admin_session";

interface CreateAdminSessionMeta {
  userAgent?: string;
  ipAddress?: string;
}

export interface SafeAdmin {
  id: string;
  name: string;
  email: string;
  role: string;
  mustChangePassword: boolean;
  twoFactorEnabled: boolean;
  createdAt: Date;
}

const SAFE_ADMIN_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  mustChangePassword: true,
  twoFactorEnabled: true,
  createdAt: true,
} as const;

/** Creates a DB-backed admin session and sets the admin session cookie. Route Handler/Server Action only. */
export async function createAdminSession(adminId: string, meta: CreateAdminSessionMeta = {}): Promise<void> {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + IDLE_SESSION_TIMEOUT_MS);

  await db.adminSession.create({
    data: { adminId, tokenHash, expiresAt, ...meta },
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MAX_AGE_MS / 1000),
  });
}

/** Reads the admin session cookie and returns the current admin, or null. Safe to call from Server Components. */
export async function getCurrentAdmin(): Promise<SafeAdmin | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await db.adminSession.findUnique({
    where: { tokenHash },
    include: { admin: { select: SAFE_ADMIN_SELECT } },
  });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await db.adminSession.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  // Sliding idle timeout: every authenticated request pushes the deadline forward, so an
  // active admin is never logged out — only IDLE_SESSION_TIMEOUT_MS of no requests expires it.
  await db.adminSession
    .update({ where: { id: session.id }, data: { expiresAt: new Date(Date.now() + IDLE_SESSION_TIMEOUT_MS) } })
    .catch(() => {});

  return session.admin;
}

/** Deletes the current admin session (DB row + cookie). Route Handler/Server Action only. */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  if (token) {
    await db.adminSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
}
