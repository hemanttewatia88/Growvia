import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { generateToken, hashToken } from "@/lib/auth/tokens";
import { SESSION_MAX_AGE_MS, IDLE_SESSION_TIMEOUT_MS, SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import type { SafeUser } from "@/types/auth";

interface CreateSessionMeta {
  userAgent?: string;
  ipAddress?: string;
}

const SAFE_USER_SELECT = {
  id: true,
  name: true,
  email: true,
  phone: true,
  emailVerifiedAt: true,
  phoneVerifiedAt: true,
  createdAt: true,
} as const;

/** Creates a DB-backed session and sets the session cookie. Must be called from a Route Handler or Server Action. */
export async function createSession(userId: string, meta: CreateSessionMeta = {}): Promise<void> {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + IDLE_SESSION_TIMEOUT_MS);

  await db.session.create({
    data: { userId, tokenHash, expiresAt, ...meta },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MAX_AGE_MS / 1000),
  });
}

/** Reads the session cookie and returns the current user, or null. Safe to call from Server Components (read-only). */
export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await db.session.findUnique({
    where: { tokenHash },
    include: { user: { select: SAFE_USER_SELECT } },
  });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    // DB cleanup is fine anywhere; cookie mutation is not (only allowed in
    // Route Handlers/Server Actions), so we don't clear the cookie here.
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  // Sliding idle timeout: every authenticated request pushes the deadline forward, so an
  // active user is never logged out — only IDLE_SESSION_TIMEOUT_MS of no requests expires it.
  await db.session
    .update({ where: { id: session.id }, data: { expiresAt: new Date(Date.now() + IDLE_SESSION_TIMEOUT_MS) } })
    .catch(() => {});

  return session.user;
}

/** Deletes the current session (DB row + cookie). Must be called from a Route Handler or Server Action. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}
