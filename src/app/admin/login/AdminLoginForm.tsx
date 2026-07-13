"use client";

import { useState } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const darkInput = "border-white/20 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [needsTotp, setNeedsTotp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...(needsTotp ? { totpCode } : {}) }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.reason === "totp_required") {
          setNeedsTotp(true);
        } else {
          setError(data.message ?? "Something went wrong.");
        }
        return;
      }
      window.location.assign(data.mustChangePassword ? "/admin/change-password" : "/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard eyebrow="Admin" title="Admin Login" subtitle="Restricted access.">
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
            disabled={needsTotp}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-ink-on-dark/90">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={darkInput}
            required
            disabled={needsTotp}
          />
        </div>
        {needsTotp && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="totp" className="text-ink-on-dark/90">
              2FA code
            </Label>
            <Input
              id="totp"
              inputMode="numeric"
              maxLength={6}
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
              className={`${darkInput} text-center text-lg tracking-[0.3em]`}
              required
              autoFocus
            />
          </div>
        )}
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" size="lg" disabled={loading} className="rounded-full">
          {loading ? "Signing in…" : needsTotp ? "Verify & Sign In" : "Sign In"}
        </Button>
      </form>
    </AuthCard>
  );
}
