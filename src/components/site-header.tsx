"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { clsx } from "clsx";

const links = [
  { href: "/spaces", label: "Spaces" },
  { href: "/rentals", label: "Rentals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="section-pad mx-auto flex max-w-7xl items-center justify-between py-4">
        <Link href="/" className="group flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-display text-xl tracking-tight text-ink md:text-2xl">WAFFI</span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-muted group-hover:text-accent">
            Content Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
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
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/book" className="btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex">
            Book a shoot
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2 text-sm text-foreground hover:bg-surface-2"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" onClick={() => setOpen(false)} className="btn-primary mt-2 text-center text-sm">
              Book a shoot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
