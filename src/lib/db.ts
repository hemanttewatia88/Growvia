/**
 * Prisma 7 client singleton — lazy initialisation.
 *
 * Uses @prisma/adapter-pg (standard PostgreSQL driver) — compatible with
 * Neon's pooled connection string and any standard Postgres instance.
 *
 * DATABASE_URL must be set in .env for local dev and in Vercel env vars for
 * production. Run `npx prisma db push` to sync schema to the database.
 *
 * The client is created on first use (not at import time) so that
 * `next build` can complete without a live database connection.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("[db] DATABASE_URL is not set. Add it to .env for local dev.");
  }
  const adapter = new PrismaPg(url);
  return new PrismaClient({ adapter });
}

function getClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createClient();
  }
  return globalForPrisma.prisma;
}

/**
 * Proxy-based lazy singleton. Defers `createClient()` until the first
 * property access so the module can be imported safely at build time.
 */
export const db: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    return getClient()[prop as keyof PrismaClient];
  },
});
