"use client";

import { useState } from "react";
import type { Testimonial } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = { quote: string; name: string; role: string; segment: string; rating: number };

const EMPTY_FORM: FormState = { quote: "", name: "", role: "", segment: "member", rating: 5 };

export function TestimonialManager({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showNewForm, setShowNewForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function startEdit(t: Testimonial) {
    setEditingId(t.id);
    setShowNewForm(false);
    setForm({ quote: t.quote, name: t.name, role: t.role, segment: t.segment, rating: t.rating });
  }

  function startNew() {
    setEditingId(null);
    setShowNewForm(true);
    setForm(EMPTY_FORM);
  }

  function cancel() {
    setEditingId(null);
    setShowNewForm(false);
    setError(null);
  }

  async function handleSave() {
    setLoading(true);
    setError(null);
    try {
      const isNew = showNewForm;
      const res = await fetch(isNew ? "/api/admin/content/testimonials" : `/api/admin/content/testimonials/${editingId}`, {
        method: isNew ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Something went wrong.");
        return;
      }
      if (isNew) {
        setItems((prev) => [data.testimonial, ...prev]);
      } else {
        setItems((prev) => prev.map((t) => (t.id === editingId ? data.testimonial : t)));
      }
      cancel();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await fetch(`/api/admin/content/testimonials/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((t) => t.id !== id));
    } finally {
      setLoading(false);
    }
  }

  const formVisible = showNewForm || editingId !== null;

  return (
    <div className="flex flex-col gap-4">
      {!formVisible && (
        <Button onClick={startNew} className="w-fit rounded-full">
          Add Testimonial
        </Button>
      )}

      {formVisible && (
        <div className="flex flex-col gap-3 rounded-2xl border border-border-brand bg-surface p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="segment">Segment</Label>
              <select
                id="segment"
                value={form.segment}
                onChange={(e) => setForm({ ...form, segment: e.target.value })}
                className="h-8 rounded-lg border border-border-brand bg-transparent px-2 text-sm outline-none"
              >
                <option value="member">Member</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="quote">Quote</Label>
            <Textarea id="quote" rows={3} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
          </div>
          {error && <p className="text-sm text-error">{error}</p>}
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={loading} className="rounded-full">
              {loading ? "Saving…" : "Save"}
            </Button>
            <Button variant="outline" onClick={cancel} className="rounded-full">
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl border border-border-brand bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-ink">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-2 text-xs font-medium text-ink-secondary">
                  {t.name} · {t.role} · {t.segment} · {t.rating}★
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(t)} className="rounded-full">
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(t.id)} className="rounded-full text-error">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
