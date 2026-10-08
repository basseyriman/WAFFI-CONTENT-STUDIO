"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { spaces } from "@/lib/spaces";
import { rentals } from "@/lib/rentals";
import { studioWhatsAppUrl } from "@/lib/contact";
import { CheckCircle2 } from "lucide-react";

export function BookingForm() {
  const params = useSearchParams();
  const initialSpace = params.get("space") ?? "";
  const initialRental = params.get("rental") ?? "";

  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [selectedRentals, setSelectedRentals] = useState<string[]>(initialRental ? [initialRental] : []);

  function toggleRental(id: string) {
    setSelectedRentals((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("full_name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const shootDate = String(form.get("shoot_date") || "").trim();
    const spaceSlug = String(form.get("space_slug") || "").trim();
    const note = String(form.get("message") || "").trim();

    const space = spaces.find((item) => item.slug === spaceSlug);
    const spaceLabel = space ? `${space.petName} — ${space.category}` : "Not specified";
    const rentalLabel =
      selectedRentals
        .map((id) => rentals.find((item) => item.id === id)?.name)
        .filter(Boolean)
        .join(", ") || "None";
    const dateLabel = shootDate
      ? new Date(`${shootDate}T00:00:00`).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not specified";

    const message = [
      "New WAFFI shoot booking",
      "",
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Preferred date: ${dateLabel}`,
      `Space: ${spaceLabel}`,
      `Rentals: ${rentalLabel}`,
      "",
      "Message:",
      note,
    ].join("\n");

    const url = studioWhatsAppUrl(message);
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="font-display mt-4 text-3xl text-ink">WhatsApp is ready</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Tap send in WhatsApp so the studio receives this booking. The team replies in that same chat.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open WhatsApp again
          </a>
          <button type="button" className="btn-ghost" onClick={() => setStatus("idle")}>
            Send another booking
          </button>
        </div>
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

      <button type="submit" className="btn-primary w-full">
        Send booking on WhatsApp
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
