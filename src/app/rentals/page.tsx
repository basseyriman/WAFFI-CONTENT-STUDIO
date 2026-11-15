import type { Metadata } from "next";
import Link from "next/link";
import { rentals } from "@/lib/rentals";
import { RentalCard } from "@/components/rental-card";

export const metadata: Metadata = {
  title: "Rentals",
  description: "Rent costumes and styling pieces for your WAFFI Content Studio shoot.",
};

export default function RentalsPage() {
  return (
    <div className="section-pad mx-auto max-w-7xl py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Shoot essentials</p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl text-ink md:text-6xl">Rent items for your shoot</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        Request costumes and styling pieces through the website. We prepare them for your booking day at WAFFI.
      </p>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-6 md:flex md:items-center md:justify-between md:gap-6">
        <p className="max-w-xl text-sm text-muted">
          Select what you need, then submit a rental or combined space + rental inquiry. Availability is confirmed by the studio team.
        </p>
        <Link href="/book" className="btn-primary mt-4 shrink-0 md:mt-0">
          Start rental request
        </Link>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rentals.map((item) => (
          <RentalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
