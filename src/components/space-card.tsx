import Image from "next/image";
import Link from "next/link";
import type { StudioSpace } from "@/lib/spaces";

export function SpaceCard({ space, priority = false }: { space: StudioSpace; priority?: boolean }) {
  return (
    <Link
      href={`/spaces/${space.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={space.image}
          alt={space.petName}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-soft">{space.category}</p>
          <h3 className="font-display mt-1 text-xl text-white sm:text-2xl">{space.petName}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/75">{space.tagline}</p>
        </div>
      </div>
    </Link>
  );
}
