import Image from "next/image";
import Link from "next/link";
import { formatNaira, type RentalItem } from "@/lib/rentals";

export function RentalCard({ item }: { item: RentalItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-accent/40">
      <div className="relative aspect-[4/3] bg-surface-2">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{item.category}</p>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted">
            {item.available ? "Available" : "Booked"}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl text-ink">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">
            {formatNaira(item.pricePerDay)}
            <span className="font-normal text-muted"> / day</span>
          </p>
          <Link href={`/book?rental=${item.id}`} className="btn-ghost !px-3 !py-2 text-xs">
            Request
          </Link>
        </div>
      </div>
    </article>
  );
}
