import Link from 'next/link'
import Image from 'next/image'
import HeroCarousel from '@/components/hero-carousel'

const heroSlides = [
  {
    image: '/images/hero.png',
    imageAlt: 'Borsa Eddy Handmade',
    title: (
      <>
        Morbidezza<br className="hidden sm:block" /> che si fa stile
      </>
    ),
    subtitle: (
      <>
        Borse all’uncinetto create una alla volta.
        <br />
        Pezzi unici, fatti a mano in Italia.
      </>
    ),
  },
  {
    image: '/images/hero_2.png',
    imageAlt: 'Collezione Eddy Handmade',
    title: (
      <>
        Creazioni uniche<br className="hidden sm:block" /> per ogni giorno
      </>
    ),
    subtitle: (
      <>
        Design essenziale e materiali curati.
        <br />
        Artigianato italiano da indossare con orgoglio.
      </>
    ),
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="w-full">
        <HeroCarousel slides={heroSlides} />

        <div className="grid gap-0 border-t border-black/5 bg-sand-50 px-4 py-5 sm:grid-cols-3">
          <Feature icon={<i className="pi pi-flag text-xl" aria-hidden />} title="Fatto a mano in Italia" />
          <Feature icon={<i className="pi pi- text-xl" aria-hidden />} title="Pezzi unici" />
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
