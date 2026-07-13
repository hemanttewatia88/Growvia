import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { MessageThread } from "@/app/dashboard/messages/MessageThread";

export const metadata: Metadata = { title: "Messages" };

export default async function DashboardMessagesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const messages = await db.message.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Messages</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Chat with our team, or send a structured email to support.
        </p>
      </div>
      <MessageThread initialMessages={messages} />
    </div>
  );
}
