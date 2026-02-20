import Image from 'next/image'

export const metadata = { title: 'Chi sono' }

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="font-serif text-4xl tracking-tight">Chi sono</h1>
          <p className="mt-5 text-sm leading-relaxed text-black/65">
            Ciao! Sono Eddy e creo borse all’uncinetto una alla volta, con amore per i dettagli.
            Ogni borsa nasce da un’idea, si trasforma in punti e texture, e diventa un pezzo unico
            pensato per accompagnarti ogni giorno.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/65">
            Mi piace lavorare con palette calde e materiali morbidi: voglio che la borsa sia bella
            da vedere e piacevole da toccare. Tutto è realizzato a mano in Italia.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] shadow-soft">
          <Image src="/images/hero.png" alt="Eddy Handmade" fill className="object-cover" />
        </div>
      </div>

      <div className="mt-12 rounded-[var(--radius)] bg-white p-8 shadow-soft">
        <h2 className="font-serif text-2xl">Cura & materiali</h2>
        <ul className="mt-4 space-y-3 text-sm text-black/65">
          <li>• Ogni borsa è realizzata a mano: piccole variazioni rendono ogni pezzo unico.</li>
          <li>• Pulizia: spazzola morbida e panno leggermente umido. Evita calore diretto.</li>
          <li>• Spedizione inclusa e imballo curato.</li>
        </ul>
      </div>
    </section>
  )
}
