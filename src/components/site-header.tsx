"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { StudioLogo } from "./studio-logo";
import { studioContact } from "@/lib/contact";
import { clsx } from "clsx";

const links = [
  { href: "/spaces", label: "Spaces" },
  { href: "/rentals", label: "Rentals" },
  { href: "/about", label: "About" },
  { href: studioContact.whatsappUrl, label: "Contact", external: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="section-pad mx-auto flex max-w-7xl items-center justify-between gap-3 py-1.5 sm:py-2">
        <Link href="/" aria-label="WAFFI Content Studio" className="inline-flex shrink-0" onClick={() => setOpen(false)}>
          <StudioLogo labelled={false} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide text-muted transition hover:text-accent"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm tracking-wide transition hover:text-accent",
                  pathname.startsWith(link.href) ? "text-accent" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href="/book" className="btn-primary hidden !min-h-0 !px-4 !py-2.5 text-sm sm:inline-flex">
            Book a shoot
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-border bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base text-foreground hover:bg-surface-2"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base text-foreground hover:bg-surface-2"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link href="/book" onClick={() => setOpen(false)} className="btn-primary mt-3 w-full text-center text-sm">
              Book a shoot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
