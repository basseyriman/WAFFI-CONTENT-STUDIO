import { NextResponse } from "next/server";
import { buildBookingWhatsAppMessage, quoteBooking, type BookingPaymentInput } from "@/lib/booking-total";
import { initializePaystackTransaction } from "@/lib/paystack";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingPaymentInput;
    const spaceModes =
      body.spaceModes && typeof body.spaceModes === "object"
        ? (body.spaceModes as BookingPaymentInput["spaceModes"])
        : {};
    const spaceTimeSlots =
      body.spaceTimeSlots && typeof body.spaceTimeSlots === "object"
        ? (body.spaceTimeSlots as BookingPaymentInput["spaceTimeSlots"])
        : {};
    const input: BookingPaymentInput = {
      fullName: String(body.fullName || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      phone: String(body.phone || "").trim(),
      shootDate: String(body.shootDate || "").trim(),
      spaceSlugs: Array.isArray(body.spaceSlugs) ? body.spaceSlugs.map(String) : [],
      spaceModes,
      spaceTimeSlots,
      rentalId: String(body.rentalId || "").trim(),
      message: String(body.message || "").trim(),
    };
    const quote = quoteBooking(input);

    if (!quote.payable) {
      return NextResponse.json({ error: quote.reason || "Booking is not payable yet." }, { status: 400 });
    }

    const origin = new URL(request.url).origin;
    const reference = `WAFFI-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const tx = await initializePaystackTransaction({
      email: input.email,
      amountKobo: quote.amountKobo,
      reference,
      callbackUrl: `${origin}/book?payment=success&reference=${encodeURIComponent(reference)}`,
      metadata: {
        full_name: input.fullName,
        phone: input.phone,
        shoot_date: input.shootDate,
        schedule: quote.scheduleLabels.join(" | "),
        spaces: input.spaceSlugs.join(","),
        rental: input.rentalId || "none",
        amount_naira: quote.amountNaira,
        custom_fields: [
          { display_name: "Customer", variable_name: "full_name", value: input.fullName },
          { display_name: "Phone", variable_name: "phone", value: input.phone },
          { display_name: "Schedule", variable_name: "schedule", value: quote.scheduleLabels.join("; ") },
        ],
      },
    });

    return NextResponse.json({
      accessCode: tx.access_code,
      reference: tx.reference,
      amountNaira: quote.amountNaira,
      whatsappDraft: buildBookingWhatsAppMessage(input, quote, { paymentRef: tx.reference }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start Paystack payment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
