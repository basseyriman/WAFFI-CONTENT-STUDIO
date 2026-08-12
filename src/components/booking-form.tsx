"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { spaces } from "@/lib/spaces";
import { rentals } from "@/lib/rentals";
import { CheckCircle2, Loader2 } from "lucide-react";

type InquiryType = "space" | "rental" | "both" | "general";

export function BookingForm() {
  const params = useSearchParams();
  const initialSpace = params.get("space") ?? "";
  const initialRental = params.get("rental") ?? "";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [selectedRentals, setSelectedRentals] = useState<string[]>(initialRental ? [initialRental] : []);

  const inquiryType: InquiryType = useMemo(() => {
    const hasSpace = Boolean(initialSpace);
    const hasRental = selectedRentals.length > 0;
    if (hasSpace && hasRental) return "both";
    if (hasSpace) return "space";
    if (hasRental) return "rental";
    return "general";
  }, [initialSpace, selectedRentals]);

  function toggleRental(id: string) {
    setSelectedRentals((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      shoot_date: String(form.get("shoot_date") || "") || null,
      space_slug: String(form.get("space_slug") || "") || null,
      rental_ids: selectedRentals,
      message: String(form.get("message") || ""),
      inquiry_type: inquiryType,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to submit inquiry");
      setStatus("success");
      e.currentTarget.reset();
      setSelectedRentals([]);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="font-display mt-4 text-3xl text-ink">Inquiry received</h3>
        <p className="mt-3 text-sm text-muted">
          Thanks for choosing WAFFI. Our studio team will confirm availability and next steps shortly.
        </p>
        <button type="button" className="btn-primary mt-6" onClick={() => setStatus("idle")}>
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" name="full_name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone / WhatsApp" name="phone" required />
        <Field label="Preferred shoot date" name="shoot_date" type="date" />
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Studio space</span>
        <select
          name="space_slug"
          defaultValue={initialSpace}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
        >
          <option value="">Select a space (optional)</option>
          {spaces.map((space) => (
            <option key={space.slug} value={space.slug}>
              {space.petName} — {space.category}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Rent items for your shoot</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {rentals.map((item) => {
            const checked = selectedRentals.includes(item.id);
            return (
              <label
                key={item.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                  checked ? "border-accent bg-accent/10" : "border-border hover:border-accent/40"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1 accent-[var(--accent)]"
                  checked={checked}
                  onChange={() => toggleRental(item.id)}
                />
                <span>
                  <span className="block font-medium text-foreground">{item.name}</span>
                  <span className="text-xs text-muted">{item.category}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your shoot, crew size, and any special needs..."
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>

      {status === "error" && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-70">
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Submit inquiry"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
      />
    </label>
  );
}
