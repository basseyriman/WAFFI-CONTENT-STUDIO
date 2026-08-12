import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WAFFI Content Studio for bookings, rentals, and partnerships.",
};

export default function ContactPage() {
  return (
    <div className="section-pad mx-auto max-w-5xl py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Contact</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-6xl">Let’s plan your shoot</h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        Reach the WAFFI team for space bookings, rental requests, brand days, and partnerships.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        <a href="mailto:hello@wafficontentstudio.com" className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
          <Mail className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">Email</h2>
          <p className="mt-2 text-sm text-muted">hello@wafficontentstudio.com</p>
        </a>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <MessageCircle className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">Share your preferred number in the booking form and we’ll reply on WhatsApp.</p>
        </div>
        <Link href="/book" className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
          <CalendarDays className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">Book online</h2>
          <p className="mt-2 text-sm text-muted">Submit a space + rental inquiry in under two minutes.</p>
        </Link>
      </div>
    </div>
  );
}
