import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-role";
import { reportRequestSchema, REPORT_LABELS } from "@/lib/validations/admin-report";
import { getTiers } from "@/lib/content";
import { logAudit } from "@/lib/audit";

interface ReportResult {
  label: string;
  columns: string[];
  rows: (string | number)[][];
}

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

async function membershipGrowth(from: Date, to: Date): Promise<ReportResult> {
  const users = await db.user.findMany({
    where: { createdAt: { gte: from, lte: to } },
    select: { createdAt: true },
  });
  const counts = new Map<string, number>();
  for (const u of users) {
    const key = monthKey(u.createdAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const rows = Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, count]) => [month, count]);
  return { label: REPORT_LABELS["membership-growth"], columns: ["Month", "New Signups"], rows };
}

async function activeByTier(): Promise<ReportResult> {
  const memberships = await db.membership.findMany({ where: { status: "active" }, select: { tierId: true } });
  const tiers = getTiers();
  const counts = new Map<string, number>();
  for (const m of memberships) counts.set(m.tierId, (counts.get(m.tierId) ?? 0) + 1);
  const rows = Array.from(counts.entries()).map(([tierId, count]) => [
    tiers.find((t) => t.id === tierId)?.name ?? tierId,
    count,
  ]);
  return { label: REPORT_LABELS["active-by-tier"], columns: ["Tier", "Active Members"], rows };
}

async function revenueByTier(from: Date, to: Date): Promise<ReportResult> {
  const invoices = await db.invoice.findMany({
    where: { status: "paid", issuedAt: { gte: from, lte: to } },
    include: { user: { include: { membership: true } } },
  });
  const tiers = getTiers();
  const totals = new Map<string, number>();
  for (const inv of invoices) {
    const tierId = inv.user.membership?.tierId ?? "unknown";
    totals.set(tierId, (totals.get(tierId) ?? 0) + inv.amount);
  }
  const rows = Array.from(totals.entries()).map(([tierId, total]) => [
    tiers.find((t) => t.id === tierId)?.name ?? tierId,
    Math.round(total),
  ]);
  return { label: REPORT_LABELS["revenue-by-tier"], columns: ["Tier", "Revenue (₹)"], rows };
}

async function bookingVolume(from: Date, to: Date): Promise<ReportResult> {
  const bookings = await db.booking.findMany({
    where: { startsAt: { gte: from, lte: to } },
    select: { type: true },
  });
  const counts = new Map<string, number>();
  for (const b of bookings) counts.set(b.type, (counts.get(b.type) ?? 0) + 1);
  const rows = Array.from(counts.entries()).map(([type, count]) => [type, count]);
  return { label: REPORT_LABELS["booking-volume"], columns: ["Booking Type", "Count"], rows };
}

export async function POST(request: Request) {
  const check = await requireAdmin();
  if (!check.ok) return check.response;

  const body = await request.json().catch(() => null);
  const parsed = reportRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const from = new Date(parsed.data.from);
  const to = new Date(parsed.data.to);
  to.setHours(23, 59, 59, 999);

  let result: ReportResult;
  switch (parsed.data.type) {
    case "membership-growth":
      result = await membershipGrowth(from, to);
      break;
    case "active-by-tier":
      result = await activeByTier();
      break;
    case "revenue-by-tier":
      result = await revenueByTier(from, to);
      break;
    case "booking-volume":
      result = await bookingVolume(from, to);
      break;
  }

  await logAudit({
    adminId: check.admin.id,
    action: "report_generated",
    targetType: "Report",
    metadata: { type: parsed.data.type, from: parsed.data.from, to: parsed.data.to },
  });

  return NextResponse.json({ ok: true, ...result });
}
