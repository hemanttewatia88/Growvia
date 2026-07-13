"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const darkInput = "border-white/20 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40";

type Mode = "password" | "otp";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [mode, setMode] = useState<Mode>("password");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devHint, setDevHint] = useState<string | null>(null);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.reason === "no_password") {
          setMode("otp");
          setError("This account uses OTP login — request a code below.");
        } else {
          setError(data.message ?? "Something went wrong.");
        }
        return;
      }
      window.location.assign(next);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpRequest(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDevHint(null);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, purpose: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      setOtpSent(true);
      if (data.devCode) setDevHint(`Dev mode — your code is ${data.devCode}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOtpVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, code: otpCode, purpose: "login" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      window.location.assign(next);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Member Login"
      title="Welcome back"
      subtitle="Sign in with your password or a one-time code."
      footer={
        <div className="flex flex-col gap-2 text-ink-on-dark/70">
          <p>
            New here?{" "}
            <Link href="/register" className="font-medium text-gold-light hover:underline">
              Create an account
            </Link>
          </p>
          <p>
            <Link href="/forgot-password" className="font-medium text-gold-light hover:underline">
              Forgot your password?
            </Link>
          </p>
        </div>
      }
    >
      <div className="mb-5 flex gap-1 rounded-full bg-white/5 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("password");
            setError(null);
          }}
          className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
            mode === "password" ? "bg-gold text-navy" : "text-ink-on-dark/70"
          }`}
        >
          Password
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("otp");
            setError(null);
          }}
          className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
            mode === "otp" ? "bg-gold text-navy" : "text-ink-on-dark/70"
          }`}
        >
          One-time code
        </button>
      </div>

      {mode === "password" ? (
        <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="identifier" className="text-ink-on-dark/90">
              Email or phone
            </Label>
            <Input
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@company.com"
              className={darkInput}
              required
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
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" size="lg" disabled={loading} className="rounded-full">
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      ) : !otpSent ? (
        <form onSubmit={handleOtpRequest} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="otp-identifier" className="text-ink-on-dark/90">
              Email or phone
            </Label>
            <Input
              id="otp-identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="you@company.com"
              className={darkInput}
              required
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" size="lg" disabled={loading} className="rounded-full">
            {loading ? "Sending…" : "Send Code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerify} noValidate className="flex flex-col gap-4">
          <p className="text-sm text-ink-on-dark/70">Enter the 6-digit code sent to {identifier}.</p>
          {devHint && <p className="rounded-lg bg-gold/10 px-3 py-2 text-xs text-gold-light">{devHint}</p>}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="otp-code" className="text-ink-on-dark/90">
              Verification code
            </Label>
            <Input
              id="otp-code"
              inputMode="numeric"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              className={`${darkInput} text-center text-lg tracking-[0.3em]`}
              required
            />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <Button type="submit" size="lg" disabled={loading || otpCode.length !== 6} className="rounded-full">
            {loading ? "Verifying…" : "Verify & Sign In"}
          </Button>
          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setOtpCode("");
              setError(null);
            }}
            className="text-xs text-ink-on-dark/60 hover:underline"
          >
            Use a different email or phone
          </button>
        </form>
      )}
    </AuthCard>
  );
}
