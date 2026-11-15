import type { Metadata } from "next";
import { spaces } from "@/lib/spaces";
import { SpaceCard } from "@/components/space-card";

export const metadata: Metadata = {
  title: "Studio Spaces",
  description: "Explore all WAFFI Content Studio partitions — each with a signature pet name.",
};

export default function SpacesPage() {
  return (
    <div className="section-pad mx-auto max-w-7xl py-12 sm:py-16 md:py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Studio partitions</p>
      <h1 className="font-display mt-3 max-w-3xl text-3xl leading-tight text-ink sm:text-4xl md:text-6xl">
        Fifteen spaces. Fifteen pet names.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
        Every set under the WAFFI roof is named for how it feels on camera. Choose the partition that matches your story.
      </p>

      <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((space, i) => (
          <SpaceCard key={space.slug} space={space} priority={i < 3} />
        ))}
      </div>
    </div>
  );
}
