import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  const fullUser = await db.user.findUnique({
    where: { id: user.id },
    include: {
      membership: true,
      invoices: true,
      bookings: true,
      messages: true,
      notifications: true,
    },
  });
  if (!fullUser) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  // Never include the password hash in a self-service data export.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...exportable } = fullUser;

  return new NextResponse(JSON.stringify(exportable, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="growviasphere-account-data-${user.id}.json"`,
    },
  });
}
