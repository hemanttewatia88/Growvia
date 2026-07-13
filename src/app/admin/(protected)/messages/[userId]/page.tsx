import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { AdminMessageThread } from "@/app/admin/(protected)/messages/[userId]/AdminMessageThread";

export const metadata: Metadata = { title: "Message Thread" };

export default async function AdminMessageThreadPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  const customer = await db.user.findUnique({ where: { id: userId } });
  if (!customer) notFound();

  const [messages, admins] = await Promise.all([
    db.message.findMany({ where: { userId }, orderBy: { createdAt: "asc" } }),
    db.adminUser.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  const assignedToId = messages.find((m) => m.assignedToAdminId)?.assignedToAdminId ?? null;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">{customer.name}</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          {customer.email} · {customer.phone}
        </p>
      </div>
      <AdminMessageThread userId={userId} initialMessages={messages} admins={admins} assignedToId={assignedToId} />
    </div>
  );
}
