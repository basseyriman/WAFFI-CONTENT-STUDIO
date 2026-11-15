import type { Metadata } from "next";
import { PaymentLinkTool } from "@/components/payment-link-tool";

export const metadata: Metadata = {
  title: "Studio payment link",
  description: "Generate a Paystack payment link for an agreed WAFFI booking.",
  robots: { index: false, follow: false },
};

export default function StudioPaymentLinkPage() {
  return (
    <div className="section-pad mx-auto max-w-2xl py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Studio tools</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">Payment link</h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        After you agree a special-request total on WhatsApp, create a Paystack link here and send it to the client.
      </p>
      <div className="mt-10">
        <PaymentLinkTool />
      </div>
    </div>
  );
}
