"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const darkInput = "border-white/20 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setDevResetUrl(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.devResetUrl) setDevResetUrl(data.devResetUrl);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Forgot Password"
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <p className="text-ink-on-dark/70">
          Remembered it?{" "}
          <Link href="/login" className="font-medium text-gold-light hover:underline">
            Back to login
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-ink-on-dark/90">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={darkInput}
            required
          />
        </div>
        {message && <p className="text-sm text-ink-on-dark/80">{message}</p>}
        {devResetUrl && (
          <a href={devResetUrl} className="break-all text-xs text-gold-light hover:underline">
            Dev mode — reset link: {devResetUrl}
          </a>
        )}
        <Button type="submit" size="lg" disabled={loading} className="rounded-full">
          {loading ? "Sending…" : "Send Reset Link"}
        </Button>
      </form>
    </AuthCard>
  );
}
