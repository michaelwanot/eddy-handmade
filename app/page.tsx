import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div>
      <section className="w-full">
        <div className="relative w-full min-h-[70vh] md:min-h-[85vh]">
          <Image
            src="/images/hero.png"
            alt="Borsa Eddy Handmade"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="max-w-6xl px-6 py-12 md:px-12">
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-white drop-shadow-md md:text-5xl lg:text-6xl">
                Morbidezza<br className="hidden sm:block" /> che si fa stile
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/90 drop-shadow-sm">
                Borse all’uncinetto create una alla volta.
                <br />
                Pezzi unici, fatti a mano in Italia.
              </p>
              <div className="mt-8">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-white/95 px-7 py-3 text-sm font-medium text-ink shadow-soft transition hover:bg-white"
                >
                  Scopri la collezione
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-0 border-t border-black/5 bg-sand-50 px-4 py-5 sm:grid-cols-3">
          <Feature icon={<i className="pi pi-flag text-xl" aria-hidden />} title="Fatto a mano in Italia" />
          <Feature icon={<i className="pi pi-gem text-xl" aria-hidden />} title="Pezzi unici" />
          <Feature icon={<i className="pi pi-truck text-xl" aria-hidden />} title="Spedizione inclusa" />
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="grid gap-10 rounded-[var(--radius)] bg-white p-8 shadow-soft md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-serif text-3xl tracking-tight">Ogni borsa nasce lentamente</h2>
            <p className="mt-4 text-sm leading-relaxed text-black/65">
              Seleziono filati e dettagli con cura, intreccio punto dopo punto e rifinisco ogni pezzo
              a mano. Il risultato è una borsa morbida, resistente e con un carattere tutto suo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/chi-sono"
                className="rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm shadow-soft hover:bg-white"
              >
                La mia storia
              </Link>
              <Link
                href="/shop"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:opacity-95"
              >
                Vai allo shop
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/hero.png"
              alt="Dettaglio borsa"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function Feature({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="flex items-center justify-center gap-3 py-2 text-sm text-black/70">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 shadow-soft">
        {icon}
      </span>
      <span>{title}</span>
    </div>
  )
}
