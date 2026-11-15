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
    <div className="section-pad mx-auto max-w-7xl py-12 sm:py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Shoot essentials</p>
      <h1 className="font-display mt-3 max-w-3xl text-3xl leading-tight text-ink sm:text-4xl md:text-6xl">
        Rent items for your shoot
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
        Request costumes and styling pieces through the website. We prepare them for your booking day at WAFFI.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 sm:mt-10 sm:p-6 md:flex md:items-center md:justify-between md:gap-6">
        <p className="max-w-xl text-sm text-muted">
          Select what you need, then submit a rental or combined space + rental inquiry. Availability is confirmed by the studio team.
        </p>
        <Link href="/book" className="btn-primary mt-4 w-full shrink-0 sm:w-auto md:mt-0">
          Start rental request
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {rentals.map((item) => (
          <RentalCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
