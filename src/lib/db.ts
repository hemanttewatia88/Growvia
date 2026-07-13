/**
 * Prisma 7 client singleton — lazy initialisation.
 *
 * Uses @prisma/adapter-better-sqlite3 for local dev (no native compile step —
 * better-sqlite3 ships prebuilt binaries). DATABASE_URL points at a local file.
 *
 * TODO(production): swap to @prisma/adapter-pg + a real Postgres DATABASE_URL
 * (see growvia-web's src/lib/db.ts for the exact pattern) before deploying —
 * SQLite's file storage doesn't survive on serverless/ephemeral filesystems.
 *
 * The client is created on first use (not at import time) so that
 * `next build` can complete without a live database connection.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("[db] DATABASE_URL is not set. Add it to .env for local dev.");
  }
  const adapter = new PrismaBetterSqlite3({ url });
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
