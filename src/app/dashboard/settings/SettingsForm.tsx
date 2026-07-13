"use client";

import { useState } from "react";
import type { NotificationPreference } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { SafeUser } from "@/types/auth";

type NotificationFields = Pick<
  NotificationPreference,
  "emailBookingReminders" | "emailBilling" | "emailMarketing" | "smsBookingReminders"
>;

function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-brand bg-surface p-6">
      <p className="font-display text-lg font-semibold text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-secondary">{description}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function SettingsForm({ user, notifications }: { user: SafeUser; notifications: NotificationFields }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [profileStatus, setProfileStatus] = useState<string | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [prefs, setPrefs] = useState<NotificationFields>(notifications);
  const [prefsStatus, setPrefsStatus] = useState<string | null>(null);
  const [prefsLoading, setPrefsLoading] = useState(false);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setProfileLoading(true);
    setProfileStatus(null);
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      setProfileStatus(data.message ?? (res.ok ? "Saved." : "Something went wrong."));
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordStatus(null);
    try {
      const res = await fetch("/api/dashboard/password", {
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

  async function savePrefs(next: NotificationFields) {
    setPrefs(next);
    setPrefsLoading(true);
    setPrefsStatus(null);
    try {
      const res = await fetch("/api/dashboard/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await res.json();
      setPrefsStatus(data.message ?? (res.ok ? "Saved." : "Something went wrong."));
    } finally {
      setPrefsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionCard title="Profile" description="Your name, email, and phone number.">
        <form onSubmit={handleProfileSubmit} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>
          {profileStatus && <p className="text-sm text-ink-secondary">{profileStatus}</p>}
          <Button type="submit" disabled={profileLoading} className="self-start rounded-full">
            {profileLoading ? "Saving…" : "Save Profile"}
          </Button>
        </form>
      </SectionCard>

      <SectionCard title="Password" description="Change your account password.">
        <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <p className="text-xs text-ink-muted">Leave blank if you&apos;ve never set a password.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {passwordStatus && <p className="text-sm text-ink-secondary">{passwordStatus}</p>}
          <Button type="submit" disabled={passwordLoading || !newPassword} className="self-start rounded-full">
            {passwordLoading ? "Saving…" : "Update Password"}
          </Button>
        </form>
      </SectionCard>

      <SectionCard title="Notifications" description="Choose what we contact you about.">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 text-sm text-ink">
            <Checkbox
              checked={prefs.emailBookingReminders}
              onCheckedChange={(v) => savePrefs({ ...prefs, emailBookingReminders: v === true })}
            />
            Email booking reminders
          </label>
          <label className="flex items-center gap-3 text-sm text-ink">
            <Checkbox
              checked={prefs.emailBilling}
              onCheckedChange={(v) => savePrefs({ ...prefs, emailBilling: v === true })}
            />
            Email billing receipts
          </label>
          <label className="flex items-center gap-3 text-sm text-ink">
            <Checkbox
              checked={prefs.emailMarketing}
              onCheckedChange={(v) => savePrefs({ ...prefs, emailMarketing: v === true })}
            />
            Marketing emails &amp; offers
          </label>
          <label className="flex items-center gap-3 text-sm text-ink">
            <Checkbox
              checked={prefs.smsBookingReminders}
              onCheckedChange={(v) => savePrefs({ ...prefs, smsBookingReminders: v === true })}
            />
            SMS booking reminders
          </label>
        </div>
        {prefsLoading && <p className="mt-3 text-xs text-ink-muted">Saving…</p>}
        {prefsStatus && !prefsLoading && <p className="mt-3 text-xs text-ink-muted">{prefsStatus}</p>}
      </SectionCard>

      <SectionCard title="Your data" description="Download a copy of your account data, or request deletion.">
        <div className="flex flex-col gap-4">
          <div>
            <Button asChild variant="outline" className="rounded-full">
              <a href="/api/dashboard/export" download>
                Download My Data
              </a>
            </Button>
          </div>
          <DeleteAccountSection />
        </div>
      </SectionCard>
    </div>
  );
}

function DeleteAccountSection() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleRequest() {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/delete-request", { method: "POST" });
      const data = await res.json();
      setStatus(data.message ?? "Something went wrong.");
      setConfirming(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-border-brand pt-4">
      {confirming ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm text-ink-secondary">
            This sends your deletion request to our support team, who will follow up by email before removing
            anything. Continue?
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full text-error" onClick={handleRequest} disabled={loading}>
              {loading ? "Sending…" : "Yes, request deletion"}
            </Button>
            <Button variant="ghost" className="rounded-full" onClick={() => setConfirming(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button variant="outline" className="rounded-full text-error" onClick={() => setConfirming(true)}>
          Request Account Deletion
        </Button>
      )}
      {status && <p className="mt-2 text-xs text-ink-muted">{status}</p>}
    </div>
  );
}
