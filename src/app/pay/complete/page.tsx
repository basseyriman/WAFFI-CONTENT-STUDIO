import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment complete",
  description: "WAFFI Content Studio payment confirmation.",
};

export default async function PayCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const params = await searchParams;
  const reference = params.reference?.trim() || "";

  return (
    <div className="section-pad mx-auto max-w-xl py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Payment</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">Thank you</h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        If your payment went through, WAFFI Content Studio will confirm your booking shortly. You can also reply on
        WhatsApp with your payment confirmation.
      </p>
      {reference ? (
        <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted">
          Reference: <span className="font-medium text-foreground">{reference}</span>
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/book" className="btn-ghost">
          Book another shoot
        </Link>
      </div>
    </div>
  );
}
