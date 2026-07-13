"use client";

import { useState } from "react";
import type { Event } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = { title: string; description: string; cadence: string; nextDate: string; category: string };

const EMPTY_FORM: FormState = { title: "", description: "", cadence: "", nextDate: "", category: "" };

function toDateInputValue(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

export function EventManager({ initial }: { initial: Event[] }) {
  const [items, setItems] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showNewForm, setShowNewForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function startEdit(ev: Event) {
    setEditingId(ev.id);
    setShowNewForm(false);
    setForm({
      title: ev.title,
      description: ev.description,
      cadence: ev.cadence,
      nextDate: toDateInputValue(ev.nextDate),
      category: ev.category,
    });
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
      const res = await fetch(isNew ? "/api/admin/content/events" : `/api/admin/content/events/${editingId}`, {
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
        setItems((prev) => [data.event, ...prev]);
      } else {
        setItems((prev) => prev.map((ev) => (ev.id === editingId ? data.event : ev)));
      }
      cancel();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    setLoading(true);
    try {
      await fetch(`/api/admin/content/events/${id}`, { method: "DELETE" });
      setItems((prev) => prev.filter((ev) => ev.id !== id));
    } finally {
      setLoading(false);
    }
  }

  const formVisible = showNewForm || editingId !== null;

  return (
    <div className="flex flex-col gap-4">
      {!formVisible && (
        <Button onClick={startNew} className="w-fit rounded-full">
          Add Event
        </Button>
      )}

      {formVisible && (
        <div className="flex flex-col gap-3 rounded-2xl border border-border-brand bg-surface p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="category">Category</Label>
              <Input id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cadence">Cadence</Label>
              <Input
                id="cadence"
                placeholder="e.g. Monthly"
                value={form.cadence}
                onChange={(e) => setForm({ ...form, cadence: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="nextDate">Next date</Label>
              <Input id="nextDate" type="date" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
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
        {items.map((ev) => (
          <div key={ev.id} className="rounded-2xl border border-border-brand bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-bronze">{ev.category}</p>
                <p className="mt-1 font-medium text-ink">{ev.title}</p>
                <p className="mt-1 text-sm text-ink-secondary">{ev.description}</p>
                <p className="mt-2 text-xs text-ink-muted">
                  {ev.cadence} · Next: {toDateInputValue(ev.nextDate)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(ev)} className="rounded-full">
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(ev.id)} className="rounded-full text-error">
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
