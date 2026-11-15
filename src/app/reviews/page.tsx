import type { Metadata } from "next";
import { ReviewForm } from "@/components/review-form";

export const metadata: Metadata = {
  title: "Leave a review",
  description: "Share your WAFFI Content Studio experience. Reviews are sent to the studio on WhatsApp.",
};

export default function ReviewsPage() {
  return (
    <div className="section-pad mx-auto max-w-4xl py-12 sm:py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Reviews</p>
      <h1 className="font-display mt-3 text-3xl leading-tight text-ink sm:text-4xl md:text-6xl">Leave a review</h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
        Tell us how the shoot felt. Sending the form opens WhatsApp so the studio team receives your review in the chat they already use.
      </p>
      <div className="mt-8 sm:mt-10">
        <ReviewForm />
      </div>
    </div>
  );
}
