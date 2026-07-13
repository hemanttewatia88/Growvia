"use client";

import { useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const darkInput = "border-white/20 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40";

export function AdminChangePasswordForm({ forced }: { forced: boolean }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (newPassword !== confirm) {
      setError("New passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Admin"
      title={forced ? "Set a new password" : "Change your password"}
      subtitle={forced ? "You're using a one-time password — set a permanent one to continue." : undefined}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="currentPassword" className="text-ink-on-dark/90">
            {forced ? "One-time password" : "Current password"}
          </Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={darkInput}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="newPassword" className="text-ink-on-dark/90">
            New password
          </Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={darkInput}
            required
          />
          <p className="text-xs text-ink-on-dark/50">At least 10 characters.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm" className="text-ink-on-dark/90">
            Confirm new password
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
          {loading ? "Saving…" : "Set Password"}
        </Button>
      </form>
    </AuthCard>
  );
}
