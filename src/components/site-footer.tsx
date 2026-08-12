import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="section-pad mx-auto grid max-w-7xl gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-ink">WAFFI</p>
          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted">Content Studio</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            A premium multi-set content studio for creators, brands, and teams who want beautiful spaces — and optional gear rentals — in one place.
          </p>
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
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Studio</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-muted">
            <a href="mailto:hello@wafficontentstudio.com" className="hover:text-accent">
              hello@wafficontentstudio.com
            </a>
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
