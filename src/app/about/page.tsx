import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "WAFFI Content Studio — a premium multi-set house for creators and brands.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative min-h-[48vh] overflow-hidden">
        <Image src="/spaces/lounge.jpg" alt="WAFFI Lounge" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="section-pad relative mx-auto flex min-h-[42svh] max-w-7xl items-end pb-10 pt-24 sm:min-h-[48vh] sm:pb-12 sm:pt-28">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-accent-soft sm:text-xs">
              Our house
            </p>
            <h1 className="font-display mt-3 text-3xl leading-tight text-white sm:text-5xl md:text-7xl">
              Built for content that feels premium
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-3xl py-12 sm:py-16 md:py-24">
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          WAFFI Content Studio is a multi-partition creative house for everyone who wants a ready-made content set. From traditional storytelling in{" "}
          <span className="text-foreground">Waffi Heritage</span> to soft beginnings in <span className="text-foreground">Waffi Drape</span>, clean commercial work in{" "}
          <span className="text-foreground">Waffi Cloud</span>, and golden-hour moments on <span className="text-foreground">Waffi Balcony</span> — every space carries the WAFFI name.
        </p>
        <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
          Beyond the sets, clients can rent costumes through the website so a shoot arrives with the wardrobe ready.
        </p>
        <div className="cta-row mt-8 sm:mt-10">
          <Link href="/spaces" className="btn-primary">
            Tour the spaces
          </Link>
          <Link href="/book" className="btn-ghost">
            Book a day
          </Link>
          <Link href="/reviews" className="btn-ghost">
            Leave a review
          </Link>
        </div>
      </section>
    </div>
  );
}
