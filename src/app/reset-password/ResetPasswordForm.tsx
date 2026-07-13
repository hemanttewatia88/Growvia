"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const darkInput = "border-white/20 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <AuthCard eyebrow="Reset Password" title="Missing reset token">
        <p className="text-sm text-ink-on-dark/70">
          This link is missing its reset token. Request a new one from{" "}
          <Link href="/forgot-password" className="font-medium text-gold-light hover:underline">
            the forgot password page
          </Link>
          .
        </p>
      </AuthCard>
    );
  }

  if (success) {
    return (
      <AuthCard eyebrow="Reset Password" title="Password updated">
        <p className="text-sm text-ink-on-dark/70">
          Your password has been changed.{" "}
          <Link href="/login" className="font-medium text-gold-light hover:underline">
            Sign in now
          </Link>
          .
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard eyebrow="Reset Password" title="Set a new password">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-ink-on-dark/90">
            New password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={darkInput}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm" className="text-ink-on-dark/90">
            Confirm password
          </Label>
          <Input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={darkInput}
            required
          />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" size="lg" disabled={loading} className="rounded-full">
          {loading ? "Updating…" : "Update Password"}
        </Button>
      </form>
    </AuthCard>
  );
}
