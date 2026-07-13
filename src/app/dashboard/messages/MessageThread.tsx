"use client";

import { useState } from "react";
import type { Message } from "@prisma/client";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function formatTime(date: Date) {
  return new Date(date).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export function MessageThread({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [mode, setMode] = useState<"chat" | "email">("chat");
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSent(false);
    try {
      const res = await fetch("/api/dashboard/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, channel: mode, ...(mode === "email" && subject ? { subject } : {}) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      if (mode === "chat") {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setSent(true);
      }
      setBody("");
      setSubject("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 self-start rounded-full bg-muted p-1">
        <button
          type="button"
          onClick={() => setMode("chat")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            mode === "chat" ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
          )}
        >
          Chat
        </button>
        <button
          type="button"
          onClick={() => setMode("email")}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            mode === "email" ? "bg-surface text-ink shadow-sm" : "text-ink-muted",
          )}
        >
          Email Us
        </button>
      </div>

      {mode === "chat" && (
        <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto rounded-2xl border border-border-brand bg-surface p-5">
          {messages.length === 0 && <p className="text-sm text-ink-muted">No messages yet — say hello.</p>}
          {messages.map((m) => (
            <div key={m.id} className={cn("max-w-[75%] rounded-2xl px-4 py-2.5 text-sm", m.sender === "member" ? "self-end bg-gold/15 text-ink" : "self-start bg-muted text-ink")}>
              <p>{m.body}</p>
              <p className="mt-1 text-[11px] text-ink-muted">{formatTime(m.createdAt)}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 rounded-2xl border border-border-brand bg-surface p-5">
        {mode === "email" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" />
          </div>
        )}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="body">{mode === "chat" ? "Message" : "Details"}</Label>
          <Textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={mode === "chat" ? "Type a message…" : "Tell us what you need help with…"}
            rows={mode === "chat" ? 2 : 4}
            required
          />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        {sent && <p className="text-sm text-success">Sent — our team will reply by email.</p>}
        <Button type="submit" disabled={loading || !body.trim()} className="self-end rounded-full">
          <Send className="size-4" data-icon="inline-start" />
          {loading ? "Sending…" : mode === "chat" ? "Send" : "Send Email"}
        </Button>
      </form>
    </div>
  );
}
