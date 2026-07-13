/**
 * Seeds one demo account with sample membership/billing/booking/message data so
 * the dashboard has content to review. Real self-registered accounts start from
 * empty states — this seed is for local development/demo only.
 *
 * Also seeds: the initial super-admin account (random one-time password, printed
 * once below — never a hardcoded value, see Phase 3 plan for why), and the
 * Testimonial/Event rows that used to live in static content files before the
 * Phase 3 CMS migration.
 *
 * Run: npm run db:seed
 * Demo login: demo@growviasphere.com / phone 9876543210 / password "Member@123"
 */
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { generateRandomPassword } from "@/lib/auth/tokens";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const prisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url }) });

async function main() {
  const email = "demo@growviasphere.com";
  const passwordHash = await bcrypt.hash("Member@123", 10);

  await prisma.user.deleteMany({ where: { email } });

  const now = new Date();
  const renewalDate = new Date(now);
  renewalDate.setMonth(renewalDate.getMonth() + 1);

  const user = await prisma.user.create({
    data: {
      name: "Demo Member",
      email,
      phone: "9876543210",
      passwordHash,
      emailVerifiedAt: now,
      phoneVerifiedAt: now,
      membership: {
        create: {
          tierId: "work-wellness",
          status: "active",
          renewalDate,
          meetingHoursIncluded: 4,
          meetingHoursUsed: 1.5,
          ptSessionsIncluded: 0,
          ptSessionsUsed: 0,
          guestPassesIncluded: 1,
          guestPassesUsed: 0,
        },
      },
      notifications: {
        create: {},
      },
      invoices: {
        create: [
          {
            amount: 7499,
            status: "paid",
            description: "Work + Wellness — monthly membership",
            issuedAt: new Date(now.getFullYear(), now.getMonth() - 1, 3),
          },
          {
            amount: 7499,
            status: "paid",
            description: "Work + Wellness — monthly membership",
            issuedAt: new Date(now.getFullYear(), now.getMonth(), 3),
          },
        ],
      },
      bookings: {
        create: [
          {
            type: "class",
            label: "Sunrise Yoga",
            status: "upcoming",
            startsAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
            endsAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
          },
          {
            type: "meeting-room",
            label: "Meeting Room — Client Presentation",
            status: "upcoming",
            startsAt: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000),
            endsAt: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000),
          },
          {
            type: "class",
            label: "Lunch-Break Strength",
            status: "completed",
            startsAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            endsAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000),
          },
        ],
      },
      messages: {
        create: [
          {
            sender: "member",
            channel: "chat",
            body: "Hi — can I get an extra guest pass this month for a client visit?",
            createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          },
          {
            sender: "staff",
            channel: "chat",
            body: "Of course — I've added one guest pass to your account for this month.",
            readAt: now,
            createdAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000),
          },
        ],
      },
    },
  });

  console.log(`Seeded demo user: ${user.email} (id: ${user.id})`);

  // --- Testimonials & Events (Phase 3 CMS — replaces the old static content files) ---
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: [
      {
        quote:
          "I used to lose an hour a day driving between a gym, a coffee shop with bad WiFi, and a rented meeting room for client calls. Now it's one address and one membership.",
        name: "Ananya R.",
        role: "Founder, D2C brand",
        segment: "member",
        rating: 5,
      },
      {
        quote:
          "The meeting rooms alone would justify the membership — but having a proper workout between back-to-back calls is what actually changed my week.",
        name: "Karan M.",
        role: "Product Lead, fintech startup",
        segment: "member",
        rating: 5,
      },
      {
        quote:
          "We moved our Delhi NCR team's wellness benefit here because it's the only option that covers fitness and a real workspace, not just a gym discount nobody used.",
        name: "Priya S.",
        role: "Head of HR, mid-size SaaS company",
        segment: "corporate",
        rating: 5,
      },
      {
        quote: "The trainers actually adjust programming around my travel schedule instead of expecting me to fit theirs. That's rare.",
        name: "Rohit V.",
        role: "Regional Sales Director",
        segment: "member",
        rating: 4,
      },
    ],
  });
  console.log("Seeded 4 testimonials");

  await prisma.event.deleteMany();
  await prisma.event.createMany({
    data: [
      {
        title: "Founders' Networking Breakfast",
        description:
          "A monthly sit-down breakfast connecting founders and senior operators who share the membership — informal, no pitch decks required.",
        cadence: "First Thursday of the month",
        nextDate: new Date("2026-08-06"),
        category: "Networking",
      },
      {
        title: "Workplace Wellness Workshop",
        description:
          "A dietitian- or physiotherapist-led session on a rotating topic: desk ergonomics, nutrition for long work weeks, or sleep and recovery.",
        cadence: "Every third Saturday",
        nextDate: new Date("2026-08-15"),
        category: "Wellness",
      },
      {
        title: "Member Fitness Challenge",
        description:
          "A light-touch, opt-in monthly fitness challenge with a leaderboard in the app — new format each month, from step counts to strength benchmarks.",
        cadence: "Monthly",
        nextDate: new Date("2026-08-01"),
        category: "Fitness",
      },
      {
        title: "Corporate Wellness Roundtable",
        description:
          "A quarterly session for HR and People teams from corporate accounts to compare notes on workplace wellness benefits.",
        cadence: "Quarterly",
        nextDate: new Date("2026-09-10"),
        category: "Corporate",
      },
    ],
  });
  console.log("Seeded 4 events");

  // --- Initial super-admin account ---
  const adminEmail = "admin@growviasphere.com";
  const adminPassword = generateRandomPassword();
  const adminPasswordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.deleteMany({ where: { email: adminEmail } });
  const admin = await prisma.adminUser.create({
    data: {
      name: "Super Admin",
      email: adminEmail,
      passwordHash: adminPasswordHash,
      role: "super_admin",
      mustChangePassword: true,
    },
  });

  console.log("\n=== Initial admin account ===");
  console.log(`Email:    ${admin.email}`);
  console.log(`Password: ${adminPassword}`);
  console.log("This password is shown once and must be changed on first login.");
  console.log("Replace admin@growviasphere.com with a real operational email before launch.\n");
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
