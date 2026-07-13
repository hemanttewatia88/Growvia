/**
 * Prisma 7 configuration file.
 * Connection URL is defined here (not in schema.prisma) per Prisma 7 conventions.
 * Used by CLI commands: `prisma db push`, `prisma migrate dev`, `prisma studio`.
 *
 * Runtime client reads DATABASE_URL via @prisma/adapter-pg in src/lib/db.ts.
 */
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
});
