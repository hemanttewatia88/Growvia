"use client";

import { useState } from "react";
import { useForm, type FieldValues, type Path, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface InquiryFieldOption {
  label: string;
  value: string;
}

export interface InquiryFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: "text" | "email" | "tel" | "date" | "textarea" | "select";
  placeholder?: string;
  options?: InquiryFieldOption[];
}

interface InquiryFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  fields: InquiryFieldConfig<T>[];
  endpoint: string;
  submitLabel: string;
  successMessage: string;
  honeypotName: Path<T>;
}

export function InquiryForm<T extends FieldValues>({
  schema,
  fields,
  endpoint,
  submitLabel,
  successMessage,
  honeypotName,
}: InquiryFormProps<T>) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<T>({
    // zodResolver's generics don't bridge cleanly through a user-supplied `T extends
    // FieldValues` here; the cast is safe because callers always pass a schema whose
    // inferred type matches T (enforced at each call site via InquiryForm<T>).
    resolver: zodResolver(schema as never) as unknown as Resolver<T>,
  });

  async function onSubmit(values: T) {
    setStatus("submitting");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl border border-sage/40 bg-sage-light/30 px-5 py-4 text-sm text-ink">
        {successMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register(honeypotName)}
      />
      {fields.map((field) => {
        const fieldId = String(field.name);
        const fieldError = errors[field.name];
        return (
          <div key={fieldId} className="flex flex-col gap-1.5">
            <Label htmlFor={fieldId}>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={fieldId}
                placeholder={field.placeholder}
                aria-invalid={Boolean(fieldError)}
                {...register(field.name)}
              />
            ) : field.type === "select" ? (
              <select
                id={fieldId}
                aria-invalid={Boolean(fieldError)}
                defaultValue=""
                className={cn(
                  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none",
                  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
                )}
                {...register(field.name)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={fieldId}
                type={field.type}
                placeholder={field.placeholder}
                aria-invalid={Boolean(fieldError)}
                {...register(field.name)}
              />
            )}
            {fieldError && <p className="text-xs text-error">{String(fieldError.message)}</p>}
          </div>
        );
      })}
      <Button type="submit" size="lg" disabled={status === "submitting"} className="mt-1 rounded-full">
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
      {status === "error" && (
        <p className="text-sm text-error">Something went wrong — please try again or email us directly.</p>
      )}
    </form>
  );
}
