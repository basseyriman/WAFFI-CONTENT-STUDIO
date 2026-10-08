import Link from "next/link";
import { studioContact } from "@/lib/contact";
import { StudioLogo } from "./studio-logo";

const socials = [
  {
    label: "WhatsApp",
    href: studioContact.whatsappUrl,
    icon: WhatsAppIcon,
  },
  {
    label: `Instagram @${studioContact.socialHandle}`,
    href: studioContact.instagramUrl,
    icon: InstagramIcon,
  },
  {
    label: `TikTok @${studioContact.socialHandle}`,
    href: studioContact.tiktokUrl,
    icon: TikTokIcon,
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="section-pad mx-auto grid max-w-7xl gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <StudioLogo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            A premium multi-set content studio for creators, brands, and teams who want beautiful spaces — and optional gear rentals — in one place.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Explore</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <Link href="/spaces" className="hover:text-accent">
              Studio spaces
            </Link>
            <Link href="/rentals" className="hover:text-accent">
              Rentals
            </Link>
            <Link href="/book" className="hover:text-accent">
              Book a shoot
            </Link>
            <Link href="/about" className="hover:text-accent">
              About
            </Link>
            <Link href="/reviews" className="hover:text-accent">
              Leave a review
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Studio</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <a href={studioContact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              WhatsApp {studioContact.phoneDisplay}
            </a>
            <a href={`mailto:${studioContact.email}`} className="hover:text-accent">
              {studioContact.email}
            </a>
            <p>{studioContact.address}</p>
            <p>By appointment</p>
            <p>15 curated sets. One studio.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} WAFFI Content Studio. All rights reserved.
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.89c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.27.64-.4 1.02-.4.13 0 .24 0 .35.01.31.01.47.03.68.52.24.58.83 2 .9 2.15.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.16-.3.37-.42.49-.14.14-.28.29-.12.56.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.23.6-.14.24.09 1.54.73 1.8.86.27.13.44.2.51.31.06.11.06.65-.18 1.33z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}
