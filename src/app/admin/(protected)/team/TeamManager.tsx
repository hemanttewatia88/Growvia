"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamMemberRow {
  id: string;
  name: string;
  email: string;
  role: string;
  mustChangePassword: boolean;
  twoFactorEnabled: boolean;
}

export function TeamManager({ initial }: { initial: TeamMemberRow[] }) {
  const [team, setTeam] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"support_staff" | "super_admin">("support_staff");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<{ email: string; password: string } | null>(null);

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTempPassword(null);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      setTeam((prev) => [...prev, data.admin]);
      setTempPassword({ email: data.admin.email, password: data.temporaryPassword });
      setShowForm(false);
      setName("");
      setEmail("");
      setRole("support_staff");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {tempPassword && (
        <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
          <p className="font-semibold">
            Account created for {tempPassword.email} — share this one-time password securely (it won&apos;t be shown again):
          </p>
          <p className="mt-2 font-mono text-base">{tempPassword.password}</p>
        </div>
      )}

      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="w-fit rounded-full">
          Invite Admin
        </Button>
      )}

      {showForm && (
        <form onSubmit={handleInvite} className="flex flex-col gap-3 rounded-2xl border border-border-brand bg-surface p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as typeof role)}
                className="h-8 rounded-lg border border-border-brand bg-transparent px-2 text-sm outline-none"
              >
                <option value="support_staff">Support Staff</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="rounded-full">
              {loading ? "Creating…" : "Create Account"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="rounded-full">
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-2xl border border-border-brand">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-brand bg-muted">
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Name</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Email</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Role</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">2FA</th>
              <th scope="col" className="px-4 py-3 text-left font-display font-semibold text-ink">Status</th>
            </tr>
          </thead>
          <tbody>
            {team.map((t) => (
              <tr key={t.id} className="border-b border-border-brand last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{t.name}</td>
                <td className="px-4 py-3 text-ink-secondary">{t.email}</td>
                <td className="px-4 py-3 text-ink-secondary capitalize">{t.role.replace("_", " ")}</td>
                <td className="px-4 py-3 text-ink-secondary">{t.twoFactorEnabled ? "Enabled" : "Off"}</td>
                <td className="px-4 py-3 text-ink-secondary">{t.mustChangePassword ? "Pending first login" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
