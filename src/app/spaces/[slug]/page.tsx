import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatSpaceRate, getSpace, spaces } from "@/lib/spaces";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return spaces.map((space) => ({ slug: space.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const space = getSpace(slug);
  if (!space) return { title: "Space" };
  return {
    title: space.petName,
    description: space.description,
  };
}

export default async function SpaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const space = getSpace(slug);
  if (!space) notFound();

  const related = spaces.filter((s) => s.slug !== space.slug).slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[58vh] overflow-hidden">
        <Image src={space.image} alt={space.petName} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
        <div className="section-pad relative mx-auto flex min-h-[48svh] max-w-7xl items-end pb-10 pt-24 sm:min-h-[58vh] sm:pb-12 sm:pt-28">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-accent-soft sm:text-xs">
              {space.category}
            </p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-white sm:text-5xl md:text-7xl">
              {space.petName}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-white/80 sm:mt-4 sm:text-lg">{space.tagline}</p>
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto grid max-w-7xl gap-10 py-12 sm:gap-12 sm:py-16 md:grid-cols-[1.4fr_0.8fr] md:py-24">
        <div className="min-w-0">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">About this set</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">{space.description}</p>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {space.highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
                <p className="text-sm text-foreground">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-10">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Ideal for</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {space.idealFor.map((item) => (
                <li key={item} className="rounded-full border border-border bg-surface px-3 py-2 text-sm text-muted sm:px-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="font-display text-xl text-ink sm:text-2xl">Book {space.petName}</p>
          <p className="mt-3 break-words text-base font-semibold text-accent sm:text-lg">{formatSpaceRate(space)}</p>
          <p className="mt-3 text-sm text-muted">
            {typeof space.priceHour === "number" && typeof space.priceNight === "number"
              ? "Book hourly for shoots, or overnight as a night stay — not 24 × the hourly rate."
              : "Reserve this partition for your next content shoot. Add rentals if you need gear or props."}
          </p>
          <Link href={`/book?space=${space.slug}`} className="btn-primary mt-6 w-full">
            Request this space
          </Link>
          <Link href="/rentals" className="btn-ghost mt-3 w-full text-sm">
            Add rentals
          </Link>
        </aside>
      </section>

      <section className="section-pad mx-auto max-w-7xl pb-16 sm:pb-24">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">More WAFFI spaces</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/spaces/${item.slug}`} className="group overflow-hidden rounded-2xl border border-border">
              <div className="relative aspect-[16/10]">
                <Image
                  src={item.image}
                  alt={item.petName}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>
              <div className="bg-surface p-4">
                <p className="font-display text-xl text-ink">{item.petName}</p>
                <p className="text-xs text-muted">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
