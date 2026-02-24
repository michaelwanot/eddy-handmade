'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product, formatPriceEUR, getProductDisplayName, getEffectivePrice, isOnSale } from '@/lib/products'
import { useCart } from '@/components/cart/cart-context'
import { useToast } from '@/components/toast'

function truncate(str: string, maxLen: number) {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd().replace(/\s+\S*$/, '') + '…'
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const { toast } = useToast()
  const imageSrc = product.images[0] ?? '/images/hero.png'

  const handleAddToCart = () => {
    if (product.isSoldOut) return
    add(product)
    toast(`${getProductDisplayName(product)} aggiunto al carrello`)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
      <Link href={`/shop/${product.slug}`} className="flex min-h-0 flex-1 flex-col">
        <div className="relative aspect-[4/3] shrink-0">
          {product.isSoldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white shadow">
              Esaurito
            </span>
          )}
          {isOnSale(product) && !product.isSoldOut && product.saleDiscountPercent != null && (
            <span className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              Saldi -{product.saleDiscountPercent}%
            </span>
          )}
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="min-h-0 flex-1 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="mt-1 text-sm text-black/65">{truncate(product.description, 72)}</p>
            </div>
            <div className="whitespace-nowrap text-right text-sm">
              {isOnSale(product) ? (
                <>
                  <span className="font-semibold text-red-600">{formatPriceEUR(getEffectivePrice(product, null))}</span>
                  <span className="ml-1.5 text-black/50 line-through">{formatPriceEUR(product.priceCents)}</span>
                </>
              ) : (
                <p className="font-semibold">{formatPriceEUR(product.priceCents)}</p>
              )}
            </div>
          </div>

          {product.details?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {product.details.map((t) => (
                <span key={t} className="rounded-full bg-black/5 px-3 py-1 text-[11px] text-black/70">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
      <div className="mt-auto shrink-0 px-5 pb-5">
        {product.variants && product.variants.length > 0 ? (
          <Link
            href={`/shop/${product.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-soft hover:opacity-95"
          >
            Scegli modello
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={product.isSoldOut}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-soft hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {product.isSoldOut ? 'Esaurito' : 'Aggiungi al carrello'}
          </button>
        )}
      </div>
    </div>
  )
}
