import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Aperture, Sparkles, Clapperboard } from "lucide-react";
import { spaces } from "@/lib/spaces";
import { SpaceCard } from "@/components/space-card";

const featured = spaces.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden grain">
        <Image
          src="/brand/hero.jpg"
          alt="WAFFI Content Studio interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-veil)" }} />
        <div className="section-pad relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24">
          <p className="animate-float-in text-xs font-semibold uppercase tracking-[0.35em] text-accent-soft">
            Content studio for every story
          </p>
          <h1 className="animate-float-in-delay font-display mt-4 max-w-4xl text-5xl leading-[1.05] text-white md:text-7xl lg:text-8xl">
            WAFFI
            <span className="mt-2 block text-3xl font-normal tracking-[0.12em] text-white/80 md:text-4xl">
              CONTENT STUDIO
            </span>
          </h1>
          <p className="animate-float-in-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Fifteen named sets. One premium house of content. Book the space that fits your shoot — and rent the extras you need.
          </p>
          <div className="animate-float-in-delay-2 mt-8 flex flex-wrap gap-3">
            <Link href="/spaces" className="btn-primary">
              Explore spaces <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/rentals" className="btn-ghost btn-ghost-on-dark">
              Browse rentals
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              icon: Aperture,
              title: "15 curated sets",
              copy: "From Waffi Heritage to Waffi Balcony — every partition has a pet name and a purpose.",
            },
            {
              icon: Sparkles,
              title: "Shoot-ready polish",
              copy: "Lighting, textures, and styling designed to look premium on camera from the first frame.",
            },
            {
              icon: Clapperboard,
              title: "Rent what you need",
              copy: "Christmas pyjamas in every size, and maternity long gowns, ready for your shoot day.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-surface p-7">
              <item.icon className="h-6 w-6 text-accent" />
              <h2 className="font-display mt-5 text-2xl text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl pb-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Signature sets</p>
            <h2 className="font-display mt-3 text-4xl text-ink md:text-5xl">Find your frame</h2>
          </div>
          <Link href="/spaces" className="btn-ghost text-sm">
            View all spaces
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((space, i) => (
            <SpaceCard key={space.slug} space={space} priority={i < 3} />
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl py-20 md:py-28">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-surface-2">
          <div className="grid md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-full">
              <Image src="/spaces/canvas.jpg" alt="Backdrop Studio" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Rentals</p>
              <h2 className="font-display mt-3 text-4xl text-ink">Wardrobe for the shoot</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                Rent Christmas pyjamas in every size, or a set of maternity long gowns. Request them when you book — we prepare them for your shoot day.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/rentals" className="btn-primary">
                  See rental catalog
                </Link>
                <Link href="/book" className="btn-ghost">
                  Book now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
