"use client";

import { useState } from "react";
import { spaces } from "@/lib/spaces";
import { studioWhatsAppUrl } from "@/lib/contact";
import { CheckCircle2, Star } from "lucide-react";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating < 1) {
      setError("Choose a star rating before sending.");
      return;
    }

    const form = new FormData(e.currentTarget);
    const name = String(form.get("full_name") || "").trim();
    const spaceSlug = String(form.get("space_slug") || "").trim();
    const note = String(form.get("message") || "").trim();
    const space = spaces.find((item) => item.slug === spaceSlug);
    const spaceLabel = space ? `${space.petName} — ${space.category}` : "Not specified";
    const stars = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

    const message = [
      "New WAFFI review",
      "",
      `Name: ${name}`,
      `Rating: ${rating}/5 ${stars}`,
      `Space: ${spaceLabel}`,
      "",
      "Review:",
      note,
    ].join("\n");

    const url = studioWhatsAppUrl(message);
    setWhatsappUrl(url);
    setError("");
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h2 className="font-display mt-4 text-3xl text-ink">WhatsApp is ready</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Tap send in WhatsApp so the studio receives your review. The team reads it in that same chat.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open WhatsApp again
          </a>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setStatus("idle");
              setRating(0);
            }}
          >
            Write another review
          </button>
        </div>
      </div>
    );
  }

  const active = hover || rating;

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-6 md:p-8">
      <fieldset>
        <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted">Your rating</legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} star${value === 1 ? "" : "s"}`}
              aria-pressed={rating === value}
              onMouseEnter={() => setHover(value)}
              onClick={() => {
                setRating(value);
                setError("");
              }}
              className="rounded-full p-1 text-accent transition hover:scale-105"
            >
              <Star className="h-8 w-8" fill={value <= active ? "currentColor" : "none"} />
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Name</span>
          <input
            name="full_name"
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Studio space</span>
          <select
            name="space_slug"
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
      </div>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Review</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="How was the set, the light, and the shoot day?"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button type="submit" className="btn-primary w-full">
        Send review on WhatsApp
      </button>
    </form>
  );
}
