import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="rounded-[var(--radius)] bg-white p-10 text-center shadow-soft">
        <h1 className="font-serif text-4xl tracking-tight">Pagina non trovata</h1>
        <p className="mt-4 text-sm text-black/65">La pagina che cerchi non esiste o è stata spostata.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-soft">
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
