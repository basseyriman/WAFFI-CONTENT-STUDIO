import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-pad mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">404</p>
      <h1 className="font-display mt-3 text-4xl text-ink md:text-5xl">This set isn’t on the floorplan</h1>
      <p className="mt-4 text-muted">The page you’re looking for doesn’t exist in the WAFFI house.</p>
      <Link href="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
