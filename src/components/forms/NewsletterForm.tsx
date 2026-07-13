"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations/newsletter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(values: NewsletterInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <p className={cn("mt-3 text-sm", isDark ? "text-sage-light" : "text-success")} role="status">
        You&apos;re subscribed — welcome aboard.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3 flex flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@company.com"
          className={cn(
            "h-10 w-full min-w-0 rounded-full border px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-gold/40",
            isDark
              ? "border-white/15 bg-white/5 text-ink-on-dark placeholder:text-ink-on-dark/40"
              : "border-border-brand bg-surface text-ink placeholder:text-ink-muted",
          )}
          {...register("email")}
        />
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("company")} />
        <Button type="submit" size="lg" disabled={status === "submitting"} className="shrink-0 rounded-full">
          {status === "submitting" ? "..." : "Subscribe"}
        </Button>
      </div>
      {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
      {status === "error" && <p className="text-xs text-error">Something went wrong — please try again.</p>}
    </form>
  );
}
