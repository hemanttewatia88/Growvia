"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SendResetLinkButton({ customerId }: { customerId: string }) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/admin/customers/${customerId}/reset-password`, { method: "POST" });
      const data = await res.json();
      setStatus(data.message ?? (res.ok ? "Sent." : "Something went wrong."));
    } catch {
      setStatus("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" onClick={handleClick} disabled={loading} className="w-fit rounded-full">
        {loading ? "Sending…" : "Send Password Reset Link"}
      </Button>
      {status && <p className="text-xs text-ink-muted">{status}</p>}
    </div>
  );
}
