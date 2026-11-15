"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  defaultStayMode,
  formatNairaAmount,
  formatSpaceRate,
  isDualStaySpace,
  spaces,
  type StayMode,
} from "@/lib/spaces";
import { formatNaira, rentals } from "@/lib/rentals";
import { timeSlots } from "@/lib/time-slots";
import {
  buildBookingWhatsAppMessage,
  hourlySpaceSlugs,
  isInquiryReady,
  quoteBooking,
  resolveMode,
} from "@/lib/booking-total";
import { studioWhatsAppUrl } from "@/lib/contact";
import { CheckCircle2, ChevronDown } from "lucide-react";

type PayStatus = "idle" | "paying" | "paid" | "inquired" | "cancelled" | "failed";

function initialModes(slugs: string[]): Record<string, StayMode> {
  const modes: Record<string, StayMode> = {};
  for (const slug of slugs) {
    const space = spaces.find((item) => item.slug === slug);
    const mode = space ? defaultStayMode(space) : null;
    if (mode) modes[slug] = mode;
  }
  return modes;
}

export function BookingForm() {
  const params = useSearchParams();
  const initialSpace = params.get("space") ?? "";
  const initialRental = params.get("rental") ?? "";
  const hasInitialSpace = spaces.some((item) => item.slug === initialSpace);
  const startingSpaces = hasInitialSpace ? [initialSpace] : [];

  const [payStatus, setPayStatus] = useState<PayStatus>("idle");
  const [payError, setPayError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [paymentRef, setPaymentRef] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);
  const [shootDate, setShootDate] = useState("");
  const [spacesOpen, setSpacesOpen] = useState(hasInitialSpace);
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(startingSpaces);
  const [spaceModes, setSpaceModes] = useState<Record<string, StayMode>>(initialModes(startingSpaces));
  const [spaceTimeSlots, setSpaceTimeSlots] = useState<Record<string, string>>({});
  const [rentalId, setRentalId] = useState(
    initialRental === "other" || rentals.some((item) => item.id === initialRental) ? initialRental : "",
  );

  const today = new Date().toISOString().slice(0, 10);
  const chosenSpaces = spaces.filter((space) => selectedSpaces.includes(space.slug));
  const stayChoiceSpaces = chosenSpaces.filter((space) => isDualStaySpace(space));
  const rental = rentals.find((item) => item.id === rentalId);
  const hourlySlugs = hourlySpaceSlugs(selectedSpaces, spaceModes);
  const scheduledSpaces = chosenSpaces.filter((space) => {
    const mode = resolveMode(space, spaceModes);
    return mode === "hour" || mode === "night";
  });
  const showSchedule = Boolean(shootDate && scheduledSpaces.length > 0);
  const allHourlySlotted = hourlySlugs.every((slug) => Boolean(spaceTimeSlots[slug]));

  const previewQuote = quoteBooking({
    fullName: "Preview",
    email: "preview@wafficontentstudio.com",
    phone: "00000000000",
    shootDate,
    spaceSlugs: selectedSpaces,
    spaceModes,
    spaceTimeSlots,
    rentalId,
    message: "preview",
  });

  const canShowTotal = chosenSpaces.length > 0 && (!hourlySlugs.length || allHourlySlotted);
  const canPay = previewQuote.payable && previewQuote.amountNaira > 0 && rentalId !== "other";
  const inquiryOnly = canShowTotal && !canPay && previewQuote.hasOnRequest;

  let totalLabel = "Select spaces to see total";
  if (chosenSpaces.length && hourlySlugs.length && !allHourlySlotted) {
    totalLabel = "Select a time slot for each hourly space";
  } else if (canShowTotal && previewQuote.amountNaira <= 0) {
    totalLabel = "On request";
  } else if (canShowTotal) {
    totalLabel = previewQuote.hasOnRequest
      ? `${formatNaira(previewQuote.amountNaira)} + items on request`
      : formatNaira(previewQuote.amountNaira);
  }

  function pruneTimeSlots(nextSpaces: string[], nextModes: Record<string, StayMode>) {
    const keep = new Set(hourlySpaceSlugs(nextSpaces, nextModes));
    setSpaceTimeSlots((prev) => {
      const next: Record<string, string> = {};
      for (const [slug, slotId] of Object.entries(prev)) {
        if (keep.has(slug)) next[slug] = slotId;
      }
      return next;
    });
  }

  function toggleSpace(slug: string) {
    setSelectedSpaces((prev) => {
      const next = prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug];
      const updatedModes = { ...spaceModes };
      if (!next.includes(slug)) {
        delete updatedModes[slug];
      } else {
        const space = spaces.find((item) => item.slug === slug);
        const mode = space ? defaultStayMode(space) : null;
        if (mode) updatedModes[slug] = mode;
      }
      setSpaceModes(updatedModes);
      pruneTimeSlots(next, updatedModes);
      return next;
    });
  }

  function setMode(slug: string, mode: StayMode) {
    const nextModes = { ...spaceModes, [slug]: mode };
    setSpaceModes(nextModes);
    if (mode === "night") {
      setSpaceTimeSlots((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
    }
    pruneTimeSlots(selectedSpaces, nextModes);
  }

  function setSpaceSlot(slug: string, slotId: string) {
    setSpaceTimeSlots((prev) => ({ ...prev, [slug]: slotId }));
  }

  function collectInput(form: HTMLFormElement) {
    const data = new FormData(form);
    return {
      fullName: String(data.get("full_name") || "").trim(),
      email: String(data.get("email") || "").trim().toLowerCase(),
      phone: String(data.get("phone") || "").trim(),
      shootDate,
      spaceSlugs: selectedSpaces,
      spaceModes,
      spaceTimeSlots,
      rentalId,
      message: String(data.get("message") || "").trim(),
    };
  }

  function openInquiry(input: ReturnType<typeof collectInput>) {
    const localQuote = quoteBooking(input);
    const draft = buildBookingWhatsAppMessage(input, localQuote, { inquiryOnly: true });
    const url = studioWhatsAppUrl(draft);
    setWhatsappUrl(url);
    setPayStatus("inquired");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPayError("");

    const input = collectInput(e.currentTarget);
    const localQuote = quoteBooking(input);
    const inquiry = isInquiryReady(input);

    // Fully on-request → WhatsApp inquiry
    if (!localQuote.payable || localQuote.amountNaira <= 0) {
      if (!inquiry.ready) {
        setPayStatus("failed");
        setPayError(inquiry.reason || localQuote.reason || "Booking is not ready yet.");
        return;
      }
      openInquiry(input);
      return;
    }

    setPayStatus("paying");

    try {
      const initRes = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const initData = (await initRes.json()) as {
        accessCode?: string;
        reference?: string;
        amountNaira?: number;
        whatsappDraft?: string;
        error?: string;
      };

      if (!initRes.ok || !initData.accessCode || !initData.reference) {
        throw new Error(initData.error || "Could not start Paystack checkout.");
      }

      const { default: PaystackPop } = await import("@paystack/inline-js");
      const popup = new PaystackPop();

      await new Promise<void>((resolve, reject) => {
        popup.resumeTransaction(initData.accessCode!, {
          onSuccess: async (transaction: { reference?: string }) => {
            try {
              const reference = transaction.reference || initData.reference!;
              const verifyRes = await fetch("/api/paystack/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  reference,
                  expectedAmountKobo: localQuote.amountKobo,
                }),
              });
              const verifyData = (await verifyRes.json()) as {
                verified?: boolean;
                amountNaira?: number;
                error?: string;
              };

              if (!verifyRes.ok || !verifyData.verified) {
                reject(new Error(verifyData.error || "Payment verification failed."));
                return;
              }

              const draft =
                initData.whatsappDraft ||
                buildBookingWhatsAppMessage(input, localQuote, { paymentRef: reference });
              const url = studioWhatsAppUrl(draft);
              setWhatsappUrl(url);
              setPaymentRef(reference);
              setPaidAmount(verifyData.amountNaira || initData.amountNaira || localQuote.amountNaira);
              setPayStatus("paid");
              window.open(url, "_blank", "noopener,noreferrer");
              resolve();
            } catch (err) {
              reject(err);
            }
          },
          onCancel: () => {
            setPayStatus("cancelled");
            setPayError("Payment window closed. Nothing was charged.");
            resolve();
          },
          onError: (error: { message?: string }) => {
            reject(new Error(error?.message || "Paystack checkout failed."));
          },
        });
      });
    } catch (error) {
      setPayStatus("failed");
      setPayError(error instanceof Error ? error.message : "Unable to complete payment.");
    }
  }

  if (payStatus === "paid" || payStatus === "inquired") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-5 text-center sm:p-8">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="font-display mt-4 text-2xl text-ink sm:text-3xl">
          {payStatus === "paid" ? "Payment received" : "Inquiry ready"}
        </h3>
        <p className="mt-3 break-words text-sm leading-relaxed text-muted">
          {payStatus === "paid"
            ? `${formatNaira(paidAmount)} paid via Paystack${paymentRef ? ` · Ref ${paymentRef}` : ""}. WhatsApp opened so the studio gets your booking details.`
            : "WhatsApp opened with your on-request inquiry. Send the message so the studio can confirm availability and pricing."}
        </p>
        <div className="cta-row mt-6 justify-center">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Open WhatsApp again
          </a>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setPayStatus("idle");
              setPayError("");
              setPaymentRef("");
              setPaidAmount(0);
            }}
          >
            Make another booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-4 sm:p-6 md:p-8">
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <Field label="Full name" name="full_name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone / WhatsApp" name="phone" type="tel" required autoComplete="tel" />
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Preferred date
          </span>
          <input
            name="shoot_date"
            type="date"
            min={today}
            value={shootDate}
            onChange={(e) => {
              setShootDate(e.target.value);
              setSpaceTimeSlots({});
            }}
            className="w-full min-h-12 rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-accent"
          />
        </label>
      </div>

      <div className="rounded-xl border border-border bg-background">
        <button
          type="button"
          onClick={() => setSpacesOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-accent/5"
          aria-expanded={spacesOpen}
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Studio spaces
            </span>
            <span className="mt-1 block text-sm text-foreground">
              {selectedSpaces.length
                ? `${selectedSpaces.length} selected — tap to ${spacesOpen ? "hide" : "edit"}`
                : "Tap to choose one or more spaces"}
            </span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-muted transition ${spacesOpen ? "rotate-180" : ""}`}
          />
        </button>

        {spacesOpen ? (
          <fieldset className="border-t border-border px-4 pb-4 pt-3">
            <legend className="sr-only">Studio spaces</legend>
            <div className="grid max-h-[min(22rem,55vh)] gap-2 overflow-y-auto overscroll-contain sm:grid-cols-2">
              {spaces.map((space) => {
                const selected = selectedSpaces.includes(space.slug);
                return (
                  <label
                    key={space.slug}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-sm transition ${
                      selected ? "border-accent bg-accent/10" : "border-border hover:border-accent/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
                      checked={selected}
                      onChange={() => toggleSpace(space.slug)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                        <span className="font-medium leading-snug text-foreground">{space.petName}</span>
                        <span className="text-[11px] font-semibold leading-snug text-accent sm:max-w-[9.5rem] sm:shrink-0 sm:text-right">
                          {formatSpaceRate(space)}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-xs text-muted">{space.category}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}
      </div>

      {stayChoiceSpaces.map((space) => {
        const mode = spaceModes[space.slug] || defaultStayMode(space) || "hour";
        return (
          <fieldset key={`${space.slug}-mode`} className="rounded-xl border border-border bg-background p-4">
            <legend className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {space.petName} booking type
            </legend>
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setMode(space.slug, "hour")}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  mode === "hour"
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border hover:border-accent/40"
                }`}
              >
                <span className="block text-sm font-medium">Hourly</span>
                <span className="mt-1 block text-xs text-muted">
                  {formatNairaAmount(space.priceHour || 0)} / hour
                </span>
              </button>
              <button
                type="button"
                onClick={() => setMode(space.slug, "night")}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  mode === "night"
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border hover:border-accent/40"
                }`}
              >
                <span className="block text-sm font-medium">Overnight</span>
                <span className="mt-1 block text-xs text-muted">
                  {typeof space.priceNight === "number"
                    ? `${formatNairaAmount(space.priceNight)} / night${space.nightOnRequest || space.onRequest ? " · on request" : ""}`
                    : "On request"}
                </span>
              </button>
            </div>
          </fieldset>
        );
      })}

      {showSchedule ? (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Schedule per space</p>
          {scheduledSpaces.map((space) => {
            const mode = resolveMode(space, spaceModes);
            if (mode === "night") {
              return (
                <div key={`${space.slug}-schedule`} className="rounded-xl border border-border bg-background px-4 py-3">
                  <p className="text-sm font-medium text-foreground">{space.petName}</p>
                  <p className="mt-1 text-xs text-muted">
                    Overnight
                    {typeof space.priceNight === "number"
                      ? ` · ${formatNairaAmount(space.priceNight)} / night`
                      : ""}
                    {space.nightOnRequest || space.onRequest ? " · on request" : ""}
                  </p>
                </div>
              );
            }

            const selectedSlotId = spaceTimeSlots[space.slug] || "";
            return (
              <fieldset
                key={`${space.slug}-schedule`}
                className="space-y-3 rounded-xl border border-border bg-background p-4"
              >
                <legend className="px-1 text-sm font-medium text-foreground">
                  <span className="block">{space.petName}</span>
                  <span className="mt-1 block text-xs font-normal text-muted">
                    Hourly · {formatNairaAmount(space.priceHour || 0)} / hour
                  </span>
                </legend>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted">1 hour</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {timeSlots
                      .filter((slot) => slot.group === "hourly")
                      .map((slot) => {
                        const selected = selectedSlotId === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSpaceSlot(space.slug, slot.id)}
                            className={`rounded-xl border px-3 py-3 text-left transition ${
                              selected
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border hover:border-accent/40"
                            }`}
                          >
                            <span className="block text-sm font-medium">{slot.range}</span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted">Half day &amp; full day</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {timeSlots
                      .filter((slot) => slot.group === "package")
                      .map((slot) => {
                        const selected = selectedSlotId === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSpaceSlot(space.slug, slot.id)}
                            className={`rounded-xl border px-4 py-3 text-left transition ${
                              selected
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border hover:border-accent/40"
                            }`}
                          >
                            <span className="block text-sm font-medium">{slot.label}</span>
                            <span className="mt-1 block text-xs text-muted">
                              {slot.range} · {slot.hours} hrs
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-muted">Special · on request</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {timeSlots
                      .filter((slot) => slot.group === "special")
                      .map((slot) => {
                        const selected = selectedSlotId === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSpaceSlot(space.slug, slot.id)}
                            className={`rounded-xl border px-4 py-3 text-left transition ${
                              selected
                                ? "border-accent bg-accent/10 text-foreground"
                                : "border-border hover:border-accent/40"
                            }`}
                          >
                            <span className="block text-sm font-medium">{slot.label}</span>
                            <span className="mt-1 block text-xs text-muted">
                              {slot.range} · on request
                            </span>
                          </button>
                        );
                      })}
                  </div>
                </div>
              </fieldset>
            );
          })}
        </div>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Rent items for your shoot
        </span>
        <select
          name="rental_id"
          value={rentalId}
          onChange={(e) => setRentalId(e.target.value)}
          className="w-full min-h-12 rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-accent"
        >
          <option value="">No rentals needed</option>
          {rentals.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} — {formatNaira(item.pricePerDay)}
            </option>
          ))}
          <option value="other">Other — inquire before paying</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your shoot, crew size, and any special needs..."
          className="w-full min-h-28 rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-accent"
        />
      </label>

      <div className="sticky bottom-3 z-20 space-y-3 rounded-2xl border border-accent/30 bg-surface/95 p-4 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)] backdrop-blur-md sm:static sm:bg-accent/5 sm:p-4 sm:shadow-none sm:backdrop-blur-none">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {inquiryOnly ? "Pricing" : "Amount to pay"}
            </p>
            <p className="font-display mt-1 break-words text-2xl text-ink sm:text-3xl">{totalLabel}</p>
          </div>
          {canShowTotal && previewQuote.amountNaira > 0 ? (
            <p className="max-w-full text-xs text-muted sm:max-w-xs sm:text-right">
              {previewQuote.hourlyTotal > 0 ? `${formatNaira(previewQuote.hourlyTotal)} hourly` : null}
              {previewQuote.hourlyTotal > 0 && previewQuote.overnightTotal > 0 ? " + " : null}
              {previewQuote.overnightTotal > 0 ? `${formatNaira(previewQuote.overnightTotal)} overnight` : null}
              {rental ? ` + ${formatNaira(rental.pricePerDay)} rental` : null}
            </p>
          ) : null}
        </div>
        {canPay && previewQuote.hasOnRequest ? (
          <p className="text-xs text-muted">
            On-request items are included in the WhatsApp message after payment for studio confirmation.
          </p>
        ) : null}
        {inquiryOnly ? (
          <p className="text-xs text-muted">
            This selection needs studio confirmation. Send the inquiry on WhatsApp to get availability and final pricing.
          </p>
        ) : null}

        {payError ? <p className="text-sm text-red-500">{payError}</p> : null}

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={payStatus === "paying" || (!canPay && !inquiryOnly)}
        >
          {payStatus === "paying"
            ? "Opening Paystack..."
            : canPay
              ? `Pay ${formatNaira(previewQuote.amountNaira)} with Paystack`
              : inquiryOnly
                ? "Inquire on WhatsApp"
                : "Complete booking details"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full min-h-12 rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:border-accent"
      />
    </label>
  );
}
