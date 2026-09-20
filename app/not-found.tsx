import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-2 pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-2 font-display text-4xl uppercase">Página no encontrada</h1>
      <p className="mt-3 text-sm text-paper-muted">Vuelve a Hoy e intenta de nuevo.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-2xl bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-ink"
      >
        Ir a Hoy
      </Link>
    </div>
  );
}
