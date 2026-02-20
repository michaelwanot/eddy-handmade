import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/5 bg-sand-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">Eddy Handmade</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/65">
            Borse all’uncinetto create una alla volta. Pezzi unici, fatti a mano in Italia.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-medium">Navigazione</p>
          <ul className="mt-3 space-y-2 text-black/65">
            <li><Link className="hover:text-black" href="/shop">Shop</Link></li>
            <li><Link className="hover:text-black" href="/chi-sono">Chi sono</Link></li>
            <li><Link className="hover:text-black" href="/contatti">Contatti</Link></li>
            <li><Link className="hover:text-black" href="/carrello">Carrello</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-medium">Info</p>
          <ul className="mt-3 space-y-2 text-black/65">
            <li>Spedizione inclusa</li>
            <li>Resi entro 14 giorni</li>
            <li>Pagamenti sicuri con Stripe</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/5 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-black/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Eddy Handmade. Tutti i diritti riservati.</p>
          <p>Made with Next.js + Tailwind.</p>
        </div>
      </div>
    </footer>
  )
}
