"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const darkInput = "border-white/20 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40";

export function RegisterForm() {
  const [step, setStep] = useState<"details" | "verify">("details");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [devHint, setDevHint] = useState<string | null>(null);

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDevHint(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      setStep("verify");
      if (data.devCode) setDevHint(`Dev mode — your code is ${data.devCode}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, code: otpCode, purpose: "register" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      window.location.assign("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, purpose: "register" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      if (data.devCode) setDevHint(`Dev mode — your code is ${data.devCode}`);
    } finally {
      setLoading(false);
    }
  }

  if (step === "verify") {
    return (
      <AuthCard eyebrow="Verify Your Email" title="Check your inbox" subtitle={`We sent a 6-digit code to ${email}.`}>
        <form onSubmit={handleVerify} noValidate className="flex flex-col gap-4">
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
            {loading ? "Verifying…" : "Verify & Continue"}
          </Button>
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="text-xs text-ink-on-dark/60 hover:underline"
          >
            Resend code
          </button>
        </form>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      eyebrow="Create an Account"
      title="Join GrowViaSphere"
      subtitle="Fitness, co-working, café, and meeting rooms — one membership."
      footer={
        <p className="text-ink-on-dark/70">
          Already a member?{" "}
          <Link href="/login" className="font-medium text-gold-light hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleDetailsSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="text-ink-on-dark/90">
            Full name
          </Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className={darkInput} required />
        </div>
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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" className="text-ink-on-dark/90">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98XXXXXXXX"
            className={darkInput}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="text-ink-on-dark/90">
            Password <span className="font-normal text-ink-on-dark/50">(optional)</span>
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={darkInput}
          />
          <p className="text-xs text-ink-on-dark/50">
            Leave blank to sign in with a one-time code every time instead.
          </p>
        </div>
        <label className="flex items-start gap-2.5 text-xs text-ink-on-dark/70">
          <Checkbox
            checked={consent}
            onCheckedChange={(v) => setConsent(v === true)}
            className="mt-0.5 border-white/30 data-checked:border-gold data-checked:bg-gold"
          />
          <span>
            I agree to the{" "}
            <Link href="/legal/privacy-policy" className="text-gold-light hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/legal/terms-of-service" className="text-gold-light hover:underline">
              Terms of Service
            </Link>
            .
          </span>
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <Button type="submit" size="lg" disabled={loading || !consent} className="rounded-full">
          {loading ? "Creating account…" : "Create Account"}
        </Button>
      </form>
    </AuthCard>
  );
}
