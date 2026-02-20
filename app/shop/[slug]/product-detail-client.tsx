'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product, formatPriceEUR } from '@/lib/products'
import { useCart } from '@/components/cart/cart-context'

type ProductGalleryProps = { images: string[]; name: string }

export default function ProductDetailClient({ images, name }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const mainSrc = images[selected] ?? images[0]

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand-50">
        <Image
          src={mainSrc}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setSelected(i)}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              style={{ borderColor: selected === i ? 'var(--color-ink, #2b2420)' : 'transparent' }}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => add(product)}
        disabled={product.isSoldOut}
        className="inline-flex flex-1 items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-white shadow-soft transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
      >
        {product.isSoldOut ? 'Esaurito' : 'Aggiungi al carrello'}
      </button>
      <span className="text-lg font-semibold">{formatPriceEUR(product.priceCents)}</span>
    </div>
  )
}

export { AddToCartButton }
