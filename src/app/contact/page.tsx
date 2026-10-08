import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import { studioContact } from "@/lib/contact";

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
        Message the studio on WhatsApp to chat, reserve a set, or ask about rentals and partnerships.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={studioContact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Chat on WhatsApp
        </a>
        <Link href="/reviews" className="btn-ghost">
          Leave a review
        </Link>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <a
          href={studioContact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
        >
          <Phone className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">{studioContact.phoneInternational}</p>
        </a>
        <a
          href={`mailto:${studioContact.email}`}
          className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50"
        >
          <Mail className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">Email</h2>
          <p className="mt-2 text-sm text-muted">{studioContact.email}</p>
        </a>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <MapPin className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">Address</h2>
          <p className="mt-2 text-sm text-muted">{studioContact.address}</p>
        </div>
        <Link href="/book" className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent/50">
          <CalendarDays className="h-5 w-5 text-accent" />
          <h2 className="font-display mt-4 text-2xl text-ink">Book online</h2>
          <p className="mt-2 text-sm text-muted">Send your shoot details to the studio WhatsApp.</p>
        </Link>
      </div>
    </div>
  );
}
