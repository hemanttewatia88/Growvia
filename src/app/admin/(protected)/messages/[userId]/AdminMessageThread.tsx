"use client";

import { useState } from "react";
import type { Message } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface AdminOption {
  id: string;
  name: string;
}

function formatTime(date: Date) {
  return new Date(date).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export function AdminMessageThread({
  userId,
  initialMessages,
  admins,
  assignedToId,
}: {
  userId: string;
  initialMessages: Message[];
  admins: AdminOption[];
  assignedToId: string | null;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [assignee, setAssignee] = useState(assignedToId ?? "");

  async function callAction(action: object) {
    const res = await fetch(`/api/admin/messages/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action),
    });
    return res.json();
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      const data = await callAction({ action: "reply", body });
      if (data.ok) {
        setMessages((prev) => [...prev, data.message]);
        setBody("");
      } else {
        setStatus(data.message ?? "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve() {
    setLoading(true);
    setStatus(null);
    try {
      const data = await callAction({ action: "resolve" });
      setStatus(data.message ?? "Marked resolved.");
      setMessages((prev) => prev.map((m) => (m.sender === "member" ? { ...m, resolvedAt: new Date() } : m)));
    } finally {
      setLoading(false);
    }
  }

  async function handleAssign(adminId: string) {
    setAssignee(adminId);
    setStatus(null);
    const data = await callAction({ action: "assign", adminId });
    setStatus(data.message ?? "Something went wrong.");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border-brand bg-surface p-4">
        <Button variant="outline" size="sm" onClick={handleResolve} disabled={loading} className="rounded-full">
          Mark Resolved
        </Button>
        <label className="flex items-center gap-2 text-sm text-ink-secondary">
          Assign to
          <select
            value={assignee}
            onChange={(e) => handleAssign(e.target.value)}
            className="h-8 rounded-lg border border-border-brand bg-transparent px-2 text-sm outline-none"
          >
            <option value="">Unassigned</option>
            {admins.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        {status && <span className="text-xs text-ink-muted">{status}</span>}
      </div>

      <div className="flex max-h-[480px] flex-col gap-3 overflow-y-auto rounded-2xl border border-border-brand bg-surface p-5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
              m.sender === "staff" ? "self-end bg-gold/15 text-ink" : "self-start bg-muted text-ink",
            )}
          >
            {m.subject && <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-bronze">{m.subject}</p>}
            <p>{m.body}</p>
            <p className="mt-1 text-[11px] text-ink-muted">
              {m.channel} · {formatTime(m.createdAt)}
              {m.resolvedAt && " · resolved"}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleReply} className="flex flex-col gap-3 rounded-2xl border border-border-brand bg-surface p-4">
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Reply to this customer…" rows={3} />
        <Button type="submit" disabled={loading || !body.trim()} className="self-end rounded-full">
          {loading ? "Sending…" : "Reply"}
        </Button>
      </form>
    </div>
  );
}
