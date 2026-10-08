import type { Metadata } from "next";
import { ReviewForm } from "@/components/review-form";

export const metadata: Metadata = {
  title: "Leave a review",
  description: "Share your WAFFI Content Studio experience. Reviews are sent to the studio on WhatsApp.",
};

export default function ReviewsPage() {
  return (
    <div className="section-pad mx-auto max-w-4xl py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Reviews</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-6xl">Leave a review</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        Tell us how the shoot felt. Sending the form opens WhatsApp so the studio team receives your review in the chat they already use.
      </p>
      <div className="mt-10">
        <ReviewForm />
      </div>
    </div>
  );
}
