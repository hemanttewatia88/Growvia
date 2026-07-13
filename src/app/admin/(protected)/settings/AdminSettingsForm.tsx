"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SafeAdmin } from "@/lib/auth/admin-session";

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-brand bg-surface p-6">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-secondary">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function AdminSettingsForm({ admin }: { admin: SafeAdmin }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(admin.twoFactorEnabled);
  const [setupData, setSetupData] = useState<{ qrCodeDataUrl: string; secretBase32: string } | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [twoFactorStatus, setTwoFactorStatus] = useState<string | null>(null);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordStatus(null);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      setPasswordStatus(data.message ?? (res.ok ? "Saved." : "Something went wrong."));
      if (res.ok) {
        setCurrentPassword("");
        setNewPassword("");
      }
    } finally {
      setPasswordLoading(false);
    }
  }

  async function handleStartSetup() {
    setTwoFactorLoading(true);
    setTwoFactorStatus(null);
    try {
      const res = await fetch("/api/admin/2fa/setup", { method: "POST" });
      const data = await res.json();
      if (res.ok) setSetupData(data);
      else setTwoFactorStatus(data.message ?? "Something went wrong.");
    } finally {
      setTwoFactorLoading(false);
    }
  }

  async function handleConfirmSetup(e: React.FormEvent) {
    e.preventDefault();
    setTwoFactorLoading(true);
    setTwoFactorStatus(null);
    try {
      const res = await fetch("/api/admin/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: totpCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setTwoFactorEnabled(true);
        setSetupData(null);
        setTotpCode("");
      }
      setTwoFactorStatus(data.message ?? null);
    } finally {
      setTwoFactorLoading(false);
    }
  }

  async function handleDisable() {
    setTwoFactorLoading(true);
    setTwoFactorStatus(null);
    try {
      const res = await fetch("/api/admin/2fa/verify", { method: "DELETE" });
      const data = await res.json();
      if (res.ok) setTwoFactorEnabled(false);
      setTwoFactorStatus(data.message ?? null);
    } finally {
      setTwoFactorLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Profile" description="Your account details.">
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-muted">Name</dt>
            <dd className="text-ink">{admin.name}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Email</dt>
            <dd className="text-ink">{admin.email}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Role</dt>
            <dd className="text-ink capitalize">{admin.role.replace("_", " ")}</dd>
          </div>
        </dl>
      </SectionCard>

      <SectionCard title="Password" description="Change your admin password.">
        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
          </div>
          {passwordStatus && <p className="text-sm text-ink-secondary">{passwordStatus}</p>}
          <Button type="submit" disabled={passwordLoading} className="self-start rounded-full">
            {passwordLoading ? "Saving…" : "Update Password"}
          </Button>
        </form>
      </SectionCard>

      <SectionCard title="Two-factor authentication" description="Add an extra layer of security to your admin account.">
        {twoFactorEnabled ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-success">2FA is enabled on this account.</p>
            <Button variant="outline" onClick={handleDisable} disabled={twoFactorLoading} className="w-fit rounded-full">
              {twoFactorLoading ? "Disabling…" : "Disable 2FA"}
            </Button>
          </div>
        ) : setupData ? (
          <form onSubmit={handleConfirmSetup} className="flex flex-col gap-4">
            <p className="text-sm text-ink-secondary">Scan this code in an authenticator app, then enter the 6-digit code to confirm.</p>
            <Image src={setupData.qrCodeDataUrl} alt="2FA setup QR code" width={180} height={180} unoptimized />
            <p className="text-xs text-ink-muted">
              Can&apos;t scan? Enter this key manually: <span className="font-mono">{setupData.secretBase32}</span>
            </p>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="totpCode">6-digit code</Label>
              <Input
                id="totpCode"
                inputMode="numeric"
                maxLength={6}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                className="w-32 text-center tracking-[0.3em]"
              />
            </div>
            {twoFactorStatus && <p className="text-sm text-error">{twoFactorStatus}</p>}
            <Button type="submit" disabled={twoFactorLoading || totpCode.length !== 6} className="w-fit rounded-full">
              {twoFactorLoading ? "Confirming…" : "Confirm & Enable"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            {twoFactorStatus && <p className="text-sm text-ink-secondary">{twoFactorStatus}</p>}
            <Button onClick={handleStartSetup} disabled={twoFactorLoading} className="w-fit rounded-full">
              {twoFactorLoading ? "Starting…" : "Enable 2FA"}
            </Button>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
