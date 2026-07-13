# Placeholder Content — Replace Before Launch

This is a working list of everything in the codebase that is illustrative/example content, not
real GrowViaSphere business data. The live site reads as polished, professional copy throughout —
this manifest exists so nothing placeholder accidentally ships to production.

## Photography

All images under `public/images/**` are self-hosted, royalty-free stock photography (Unsplash),
standing in for real GrowViaSphere brand photography. Every image is referenced through a single
registry at `src/content/images.ts` — swap the `src` paths there (and the files in `public/images/`)
to replace every instance across the site in one place.

## Pricing (`src/content/tiers.ts`)

All membership tier pricing (Wellness Only ₹4,999, Work + Wellness ₹7,499, Founder Access ₹11,999,
Day Pass ₹799) and Corporate Team's "Custom" positioning are **invented illustrative figures** for
demonstration only. Confirm real pricing with the client before launch.

Room hourly rates (`src/content/rooms.ts`) and co-working workspace pricing
(`src/content/coworking.ts`) are illustrative for the same reason.

## Testimonials (`src/content/testimonials.ts`)

All four member/corporate quotes are invented examples, flagged `isPlaceholder: true` in the data
and captioned in-page ("Illustrative example testimonials…") on the Home and Testimonials pages.
Replace with verified, permissioned real member/corporate reviews before launch.

## Team & trainer bios (`src/content/team.ts`)

Leadership (`leadership`) and trainer (`trainers`) profiles use generic role-based placeholder
names, bios, and stock portraits, flagged `isPlaceholder: true` and captioned in-page on the About
and Fitness pages. Replace with real names, bios, and photography.

## Address & contact details (`src/content/site.ts`)

The Gurugram address, phone number, and email are placeholders, captioned on the Locations page.
Confirm the real centre address, phone line, and support email before launch.

## Events (`src/content/events.ts`)

Recurring event descriptions and `nextDate` values are illustrative — wire to a real events
calendar (or update manually) before launch.

## Blog articles (`src/content/blog/posts.ts`)

The four starter articles are original, ready-to-publish editorial content (not placeholders) —
review for tone/voice fit, but they don't need to be replaced.

## Legal pages (`src/app/legal/**`)

Privacy Policy, Terms of Service, Refund & Cancellation Policy, and Cookie Policy use standard
template language. Each page renders a visible "pending legal review" banner
(`src/components/sections/LegalReviewNotice.tsx`). **Do not launch without qualified legal review.**

## Demo account (`prisma/seed.ts`)

`demo@growviasphere.com` / phone `9876543210` / password `Member@123` with a seeded active
membership, two invoices, three bookings, and a short chat thread — for reviewing the dashboard
without registering a fresh account. Not a real customer; safe to delete before launch.

## Database (`prisma/schema.prisma`, `src/lib/db.ts`)

Postgres via `@prisma/adapter-pg` — set `DATABASE_URL` to a real connection string (Neon, Vercel
Postgres, Supabase, etc. — a dedicated database for this project, not growvia-web's) both locally
and in Vercel's environment variables. Run `npm run db:push` then `npm run db:seed` against it.

## Backend seams (not placeholders, but incomplete by design)

- `/api/contact`, `/api/corporate`, `/api/meeting-room-inquiry`, `/api/newsletter` (Phase 1) still
  validate input and return a mock success response without persisting — each has a
  `// TODO(persistence-phase)` marker.
- Real email delivery needs `RESEND_API_KEY` (see `.env.example`) — until set, OTP codes, password
  resets, welcome emails, and support notifications all log to the console instead of sending.
- Real SMS delivery needs Twilio wiring — no account is provisioned yet; SMS OTP currently logs to
  the console (`src/lib/sms/console.ts`, `// TODO(twilio)`).
- Rate limiting (`src/lib/auth/rate-limit.ts`) is in-memory — resets on restart and doesn't share
  state across instances. Move to a persistent store (e.g. Upstash Redis) before a multi-instance
  production deployment.
- `LiveChatStub` (floating chat button on marketing pages) explains real-time chat is coming with
  a future admin-portal phase instead of offering it now — the dashboard's Messages page already
  has a working async chat thread, just not live/real-time.
- Analytics (`NEXT_PUBLIC_GA4_ID`) and Search Console verification (`NEXT_PUBLIC_GSC_VERIFICATION`)
  are wired but inactive until real IDs are set in environment variables (see `.env.example`).
- The admin portal (customer directory, report builder, admin-triggered password resets, content
  management) is a separate, not-yet-started phase.
