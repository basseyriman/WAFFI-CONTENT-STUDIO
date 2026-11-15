import { rentals } from "@/lib/rentals";
import {
  defaultStayMode,
  formatNairaAmount,
  hasHourRate,
  isPayableStay,
  spaces,
  type StayMode,
  type StudioSpace,
} from "@/lib/spaces";
import { formatTimeSlot, timeSlots } from "@/lib/time-slots";

export type BookingPaymentInput = {
  fullName: string;
  email: string;
  phone: string;
  shootDate: string;
  spaceSlugs: string[];
  /** Per-space hour vs night choice (Lounge, Suite, etc.). */
  spaceModes: Record<string, StayMode>;
  /** Per-space time slot — only used when that space is hourly. */
  spaceTimeSlots: Record<string, string>;
  rentalId: string;
  message: string;
};

export type BookingQuote = {
  payable: boolean;
  reason?: string;
  amountNaira: number;
  amountKobo: number;
  billableHours: number;
  hourlyTotal: number;
  overnightTotal: number;
  rentalTotal: number;
  spaceLabels: string[];
  scheduleLabels: string[];
  dateLabel: string;
  rentalLabel: string;
  hasOnRequest: boolean;
};

function formatDateLabel(shootDate: string) {
  if (!shootDate) return "Not specified";
  return new Date(`${shootDate}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function resolveMode(space: StudioSpace, modes: Record<string, StayMode>): StayMode | null {
  const chosen = modes[space.slug];
  if (chosen === "hour" || chosen === "night") return chosen;
  return defaultStayMode(space);
}

function spaceLabel(space: StudioSpace, mode: StayMode | null) {
  if (!mode) return `${space.petName} (on request)`;
  if (mode === "night") {
    if (typeof space.priceNight === "number") {
      const rate = `${formatNairaAmount(space.priceNight)}/night`;
      return space.onRequest || space.nightOnRequest
        ? `${space.petName} (${rate} · on request)`
        : `${space.petName} (${rate})`;
    }
    if (space.nightOnRequest) return `${space.petName} (overnight · on request)`;
  }
  if (mode === "hour" && typeof space.priceHour === "number") {
    const rate = `${formatNairaAmount(space.priceHour)}/hr`;
    return space.onRequest ? `${space.petName} (${rate} · on request)` : `${space.petName} (${rate})`;
  }
  return `${space.petName} (on request)`;
}

function scheduleLabel(space: StudioSpace, mode: StayMode | null, slotId?: string) {
  if (mode === "night") {
    return space.nightOnRequest || space.onRequest
      ? `${space.petName}: overnight (on request)`
      : `${space.petName}: overnight`;
  }
  if (mode === "hour") {
    const slot = timeSlots.find((item) => item.id === slotId);
    return slot
      ? `${space.petName}: ${formatTimeSlot(slot)}`
      : `${space.petName}: time slot not selected`;
  }
  return `${space.petName}: not specified`;
}

export function quoteBooking(input: BookingPaymentInput): BookingQuote {
  const chosenSpaces = spaces.filter((space) => input.spaceSlugs.includes(space.slug));
  const rental = rentals.find((item) => item.id === input.rentalId);
  const spaceTimeSlots = input.spaceTimeSlots || {};

  const resolved = chosenSpaces.map((space) => {
    const mode = resolveMode(space, input.spaceModes || {});
    const slotId = mode === "hour" ? spaceTimeSlots[space.slug] || "" : "";
    const slot = slotId ? timeSlots.find((item) => item.id === slotId) : undefined;
    return { space, mode, slotId, slot };
  });

  const hourlyItems = resolved.filter((item) => item.mode === "hour" && hasHourRate(item.space));
  const payableHourlyItems = hourlyItems.filter(
    (item) => isPayableStay(item.space, "hour") && item.slot && !item.slot.onRequest,
  );
  const overnightItems = resolved.filter(
    (item) => item.mode === "night" && item.mode && isPayableStay(item.space, "night"),
  );
  const onRequestItems = resolved.filter((item) => {
    if (!item.mode) return true;
    if (item.mode === "hour" && item.slot?.onRequest) return true;
    return !isPayableStay(item.space, item.mode);
  });

  const hourlyTotal = payableHourlyItems.reduce((sum, item) => {
    const hours = item.slot?.hours ?? 0;
    return sum + (item.space.priceHour || 0) * hours;
  }, 0);
  const billableHours = payableHourlyItems.reduce((sum, item) => sum + (item.slot?.hours ?? 0), 0);
  const overnightTotal = overnightItems.reduce((sum, item) => sum + (item.space.priceNight || 0), 0);
  const rentalTotal = rental ? rental.pricePerDay : 0;
  const amountNaira = hourlyTotal + overnightTotal + rentalTotal;

  const spaceLabels = resolved.map((item) => spaceLabel(item.space, item.mode));
  const scheduleLabels = resolved.map((item) => scheduleLabel(item.space, item.mode, item.slotId));

  const rentalLabel =
    input.rentalId === "other"
      ? "Other — see message"
      : rental
        ? `${rental.name} (${formatNairaAmount(rental.pricePerDay)})`
        : "None";

  const missingHourlySlot = hourlyItems.some((item) => !item.slot);

  const base = {
    billableHours,
    hourlyTotal,
    overnightTotal,
    rentalTotal,
    spaceLabels,
    scheduleLabels,
    dateLabel: formatDateLabel(input.shootDate),
    rentalLabel,
    hasOnRequest: onRequestItems.length > 0,
  };

  if (!input.email || !input.fullName || !input.phone) {
    return {
      payable: false,
      reason: "Name, email, and phone are required before payment.",
      amountNaira: 0,
      amountKobo: 0,
      ...base,
    };
  }

  if (!chosenSpaces.length) {
    return {
      payable: false,
      reason: "Select at least one studio space to pay.",
      amountNaira: 0,
      amountKobo: 0,
      ...base,
    };
  }

  const dualMissingMode = chosenSpaces.some((space) => {
    const mode = resolveMode(space, input.spaceModes || {});
    return !mode && (hasHourRate(space) || typeof space.priceNight === "number" || space.nightOnRequest);
  });
  if (dualMissingMode) {
    return {
      payable: false,
      reason: "Choose hourly or overnight for each dual-rate space.",
      amountNaira: 0,
      amountKobo: 0,
      ...base,
    };
  }

  if (missingHourlySlot) {
    return {
      payable: false,
      reason: "Choose a time slot for each hourly space.",
      amountNaira: 0,
      amountKobo: 0,
      ...base,
    };
  }

  if (input.rentalId === "other") {
    return {
      payable: false,
      reason: "Custom rentals are priced by the studio. Remove “Other” or inquire on WhatsApp first.",
      amountNaira: 0,
      amountKobo: 0,
      ...base,
      hasOnRequest: true,
    };
  }

  if (amountNaira <= 0) {
    return {
      payable: false,
      reason: onRequestItems.length
        ? "This selection is on request — send an inquiry on WhatsApp."
        : "This selection is price on request. Inquire with the studio before paying.",
      amountNaira: 0,
      amountKobo: 0,
      ...base,
    };
  }

  return {
    payable: true,
    amountNaira,
    amountKobo: amountNaira * 100,
    ...base,
  };
}

/** Form is complete enough to inquire, even when nothing is Paystack-payable yet. */
export function isInquiryReady(input: BookingPaymentInput): { ready: boolean; reason?: string } {
  if (!input.spaceSlugs.length) return { ready: false, reason: "Select at least one studio space." };
  if (!input.shootDate) return { ready: false, reason: "Choose a preferred date." };
  if (!input.fullName || !input.email || !input.phone) {
    return { ready: false, reason: "Name, email, and phone are required." };
  }
  if (!input.message.trim()) {
    return { ready: false, reason: "Add a short message for the studio." };
  }

  const quote = quoteBooking(input);
  if (
    quote.reason === "Choose a time slot for each hourly space." ||
    quote.reason === "Choose hourly or overnight for each dual-rate space."
  ) {
    return { ready: false, reason: quote.reason };
  }

  return { ready: true };
}

export function buildBookingWhatsAppMessage(
  input: BookingPaymentInput,
  quote: BookingQuote,
  options?: { paymentRef?: string; inquiryOnly?: boolean },
) {
  const paymentRef = options?.paymentRef;
  const inquiryOnly = Boolean(options?.inquiryOnly);
  const totalLine =
    inquiryOnly || quote.amountNaira <= 0
      ? quote.hasOnRequest
        ? "Total: On request — please confirm pricing"
        : "Total: To be confirmed"
      : quote.hasOnRequest
        ? `Total: ${formatNairaAmount(quote.amountNaira)} + items on request`
        : `Total: ${formatNairaAmount(quote.amountNaira)}`;

  return [
    paymentRef
      ? "New WAFFI paid booking"
      : inquiryOnly
        ? "New WAFFI booking inquiry (on request)"
        : "New WAFFI shoot booking",
    "",
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Preferred date: ${quote.dateLabel}`,
    "Schedule:",
    ...quote.scheduleLabels.map((label) => `- ${label}`),
    "Spaces:",
    ...quote.spaceLabels.map((label) => `- ${label}`),
    `Rentals: ${quote.rentalLabel}`,
    totalLine,
    quote.hasOnRequest ? "Note: Includes on-request items — please confirm availability and final price." : null,
    paymentRef ? `Paystack reference: ${paymentRef}` : null,
    paymentRef ? "Payment: verified" : null,
    "",
    "Message:",
    input.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function hourlySpaceSlugs(spaceSlugs: string[], spaceModes: Record<string, StayMode>) {
  return spaceSlugs.filter((slug) => {
    const space = spaces.find((item) => item.slug === slug);
    if (!space) return false;
    const mode = resolveMode(space, spaceModes);
    return mode === "hour" && hasHourRate(space);
  });
}
