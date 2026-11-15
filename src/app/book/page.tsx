import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";

export const metadata: Metadata = {
  title: "Book a shoot",
  description: "Book a WAFFI Content Studio space. Your details are sent to the studio on WhatsApp.",
};

export default function BookPage() {
  return (
    <div className="section-pad mx-auto max-w-4xl py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Bookings</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-6xl">Book your WAFFI shoot</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        Choose your spaces, date, and time. The total is charged through Paystack, then WhatsApp opens so the studio receives your paid booking details.
      </p>
      <div className="mt-10">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface" />}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
