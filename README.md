# GrowViaSphere — Public Site + Customer Portal (Phases 1–2)

Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui + Prisma. Phase 1 is the 16-page
public marketing site with SEO and structured data. Phase 2 adds the customer portal: self-service
registration/login (password or OTP) and a member dashboard (membership, billing, bookings,
messages, settings). The admin portal is a later phase — see `PLACEHOLDER-CONTENT.md` for exactly
what's stubbed vs. real.

## Getting started

```bash
npm install
cp .env.example .env       # fill in DATABASE_URL with a Postgres connection string
npm run db:push            # sync prisma/schema.prisma to that database
npm run db:seed            # seed a demo account (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Demo login: `demo@growviasphere.com` /
password `Member@123` (or use the OTP tab — see the dev-mode note below).

> **Note:** `dev` runs `next dev --webpack` rather than the Turbopack default. Turbopack's dev
> server panics on Windows when any ancestor directory name contains a space (e.g. a
> `C:\Users\Firstname Lastname\...` path) — see `FileSystemPath(...) leaves the filesystem root`
> in its error output. Production builds (`next build`) are unaffected and still use Turbopack.
> **This dev server has also been observed crashing intermittently under `next dev` in constrained
> sandboxes** (works fine on a normal machine) — if that happens, `npm run build && npm run start`
> is a stable fallback for manual testing (note: `NODE_ENV=production` there disables the dev-mode
> OTP/reset-link echoing described below).

## Scripts

- `npm run dev` — local dev server (webpack, see note above)
- `npm run build` — production build (Turbopack)
- `npm run start` — serve the production build
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run db:push` — sync `prisma/schema.prisma` to the local database
- `npm run db:seed` — (re)seed the demo account
- `npm run db:studio` — browse the local database

## Environment variables

Copy `.env.example` to `.env` (not `.env.local` — the Prisma CLI only reads `.env`) and fill in
real values before enabling analytics, Search Console verification, real email/SMS delivery, or a
production Postgres database. Everything works with these unset:

- `DATABASE_URL` is required — a Postgres connection string (Neon, Vercel Postgres, Supabase, or
  any standard Postgres instance).
- No `RESEND_API_KEY` → emails (OTP codes, password resets, welcome, support) log to the console
  instead of sending. In development (`NODE_ENV !== 'production'`) the OTP code and password-reset
  link are also returned directly in the relevant API responses (`devCode` / `devResetUrl`), so the
  full flow is testable without reading server logs.
- No `TWILIO_*` → SMS OTP logs to the console instead of sending (Twilio isn't wired up yet — no
  account provisioned).

## Structure

- `prisma/schema.prisma` — User/Session/OtpCode/PasswordResetToken/Membership/Invoice/Booking/
  Message/NotificationPreference models (Postgres). Status/enum-like fields are plain `String`
  (not Prisma `enum`) with TypeScript union types in `src/types/auth.ts`.
- `src/lib/db.ts` — lazy Prisma Client singleton using `@prisma/adapter-pg`.
- `src/lib/auth/` — password hashing, token/OTP generation, DB-backed sessions, in-memory rate
  limiting (`TODO`: move to Redis before a multi-instance production deploy).
- `src/proxy.ts` — Next.js 16's `middleware.ts` replacement; fast cookie-presence check protecting
  `/dashboard/*` (the authoritative check is `getCurrentUser()` in `dashboard/layout.tsx`).
- `src/app/(marketing)/` — all 16 public pages, sharing one layout with the site header/footer.
- `src/app/{login,register,forgot-password,reset-password}/` — standalone auth pages (no
  marketing chrome).
- `src/app/dashboard/` — protected member portal.
- `src/content/*.ts` — typed content modules, consumed only through `src/lib/content.ts`.
- `PLACEHOLDER-CONTENT.md` — everything that must be replaced with real data before launch.
