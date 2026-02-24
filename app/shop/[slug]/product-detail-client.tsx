'use client'

import { useState, useRef, useCallback, createContext, useContext, type ReactNode } from 'react'
import Image from 'next/image'
import { Product, ProductVariant, formatPriceEUR, getEffectivePrice, getProductDisplayName } from '@/lib/products'
import { useCart } from '@/components/cart/cart-context'
import { useToast } from '@/components/toast'

const ProductVariantContext = createContext<{
  selectedVariant: ProductVariant | null
  setSelectedVariant: (v: ProductVariant | null) => void
} | null>(null)

function useProductVariant() {
  const ctx = useContext(ProductVariantContext)
  return ctx ?? { selectedVariant: null, setSelectedVariant: () => {} }
}

type ProductGalleryProps = {
  images: string[]
  name: string
  imageAlt: string
  selectedVariant?: ProductVariant | null
}

function ProductGallery({ images, name, imageAlt, selectedVariant }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0)
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0, y: 0 })
  const [isZoomActive, setIsZoomActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mainSrc =
    selectedVariant?.image ?? images[selected] ?? images[0]

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setZoomOrigin({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    },
    []
  )

  const handlePointerEnter = useCallback(() => {
    setIsZoomActive(true)
  }, [])

  const handlePointerLeave = useCallback(() => {
    setIsZoomActive(false)
  }, [])

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-sand-50 cursor-zoom-in"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <Image
          src={mainSrc}
          alt={selectedVariant ? `${imageAlt} - ${selectedVariant.label}` : imageAlt}
          fill
          className="object-cover"
          style={{
            transformOrigin: `${zoomOrigin.x}px ${zoomOrigin.y}px`,
            transform: isZoomActive ? 'scale(2)' : 'scale(1)',
            transition: 'transform 0.2s ease-out',
          }}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => {
            const isSelected =
              selectedVariant?.image === src || (!selectedVariant?.image && selected === i)
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setSelected(i)}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                style={{
                  borderColor: isSelected ? 'var(--color-ink, #2b2420)' : 'transparent',
                }}
              >
                <Image src={src} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ProductDetailClient({
  images,
  name,
  imageAlt,
}: {
  images: string[]
  name: string
  imageAlt: string
}) {
  const { selectedVariant } = useProductVariant()
  return (
    <ProductGallery
      images={images}
      name={name}
      imageAlt={imageAlt}
      selectedVariant={selectedVariant}
    />
  )
}

export function ProductVariantProvider({ children }: { children: ReactNode }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  return (
    <ProductVariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
      {children}
    </ProductVariantContext.Provider>
  )
}

function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart()
  const { toast } = useToast()
  const { selectedVariant, setSelectedVariant } = useProductVariant()
  const hasVariants = product.variants && product.variants.length > 0

  const handleAddToCart = () => {
    add(product, 1, selectedVariant ?? undefined)
    toast(`${getProductDisplayName(product, selectedVariant)} aggiunto al carrello`)
  }

  const effectivePrice = getEffectivePrice(product, selectedVariant)
  const isVariantSoldOut = selectedVariant?.isSoldOut ?? false
  const isDisabled =
    product.isSoldOut || isVariantSoldOut || (hasVariants && !selectedVariant)

  return (
    <div className="space-y-4">
      {hasVariants && (
        <div>
          <label className="mb-2 block text-sm font-medium text-black/80">Modello</label>
          <div className="flex flex-wrap gap-2">
            {product.variants!.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                disabled={v.isSoldOut}
                className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  selectedVariant?.id === v.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-black/15 bg-white/80 text-black hover:border-black/30'
                } ${v.isSoldOut ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {v.label}
                {v.priceCents != null && v.priceCents !== product.priceCents && (
                  <span className="ml-1.5 text-black/70">
                    ({formatPriceEUR(getEffectivePrice(product, v))})
                  </span>
                )}
                {v.isSoldOut && ' · Esaurito'}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isDisabled}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-white shadow-soft transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
        >
          {product.isSoldOut || isVariantSoldOut
            ? 'Esaurito'
            : hasVariants && !selectedVariant
              ? 'Seleziona un modello'
              : 'Aggiungi al carrello'}
        </button>
        <span className="text-lg font-semibold">{formatPriceEUR(effectivePrice)}</span>
      </div>
    </div>
  )
}

export { AddToCartButton }
