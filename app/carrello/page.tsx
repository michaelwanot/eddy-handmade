'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/cart-context'
import { formatPriceEUR } from '@/lib/products'


export default function CartPage() {
  const { items, subtotalCents, setQty, remove, clear } = useCart()

  async function checkout() {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items.map((i) => ({ id: i.product.id, qty: i.qty })) }),
    })

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      alert(err.error ?? 'Checkout non disponibile. Controlla STRIPE_SECRET_KEY in .env.local')
      return
    }

    const data = (await res.json()) as { url: string }
    window.location.href = data.url
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight">Carrello</h1>
          <p className="mt-2 text-sm text-black/65">Controlla i tuoi articoli e procedi al pagamento.</p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="rounded-full border border-black/10 bg-white/60 px-5 py-2 text-sm shadow-soft hover:bg-white"
          >
            Svuota
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-[var(--radius)] bg-white p-10 text-center shadow-soft">
          <p className="text-sm text-black/65">Il carrello è vuoto.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-soft"
          >
            Vai allo shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-4 rounded-[var(--radius)] bg-white p-4 shadow-soft">
                <div className="relative h-24 w-32 overflow-hidden rounded-2xl">
                  <Image src={product.images[0] ?? '/images/hero.png'} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="mt-1 text-sm text-black/65">{formatPriceEUR(product.priceCents)}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <label className="text-xs text-black/55">Qtà</label>
                      <input
                        value={qty}
                        onChange={(e) => setQty(product.id, Number(e.target.value || 1))}
                        type="number"
                        min={1}
                        max={99}
                        className="w-20 rounded-full border border-black/10 bg-sand-50 px-3 py-1.5 text-sm outline-none"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60"
                    aria-label="Rimuovi"
                  >
                    <i className="pi pi-trash text-base" aria-hidden />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-[var(--radius)] bg-white p-6 shadow-soft">
            <p className="text-sm font-medium">Riepilogo</p>
            <div className="mt-4 flex items-center justify-between text-sm text-black/65">
              <span>Subtotale</span>
              <span className="font-semibold text-black">{formatPriceEUR(subtotalCents)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-black/65">
              <span>Spedizione</span>
              <span className="font-semibold text-black">Inclusa</span>
            </div>
            <div className="mt-5 border-t border-black/5 pt-5">
              <button
                onClick={checkout}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-soft hover:opacity-95"
              >
                Paga con Stripe
              </button>
              <p className="mt-3 text-xs text-black/50">
                Verrai reindirizzato a Stripe Checkout per completare il pagamento.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
