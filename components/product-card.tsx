'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product, formatPriceEUR } from '@/lib/products'
import { useCart } from '@/components/cart/cart-context'

function truncate(str: string, maxLen: number) {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen).trimEnd().replace(/\s+\S*$/, '') + '…'
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const imageSrc = product.images[0] ?? '/images/hero.png'

  return (
    <div className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-soft">
      <Link href={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/3]">
          {product.isSoldOut && (
            <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-white shadow">
              Esaurito
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
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="mt-1 text-sm text-black/65">{truncate(product.description, 72)}</p>
            </div>
            <p className="whitespace-nowrap text-sm font-semibold">{formatPriceEUR(product.priceCents)}</p>
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
      <div className="px-5 pb-5">
        <button
          onClick={() => !product.isSoldOut && add(product)}
          disabled={product.isSoldOut}
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-soft hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {product.isSoldOut ? 'Esaurito' : 'Aggiungi al carrello'}
        </button>
      </div>
    </div>
  )
}
