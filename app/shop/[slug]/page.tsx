import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, formatPriceEUR } from '@/lib/products'
import ProductDetailClient, { AddToCartButton } from './product-detail-client'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const { products } = await import('@/lib/products')
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Prodotto non trovato' }
  return { title: `${product.name} | Eddy Handmade` }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const images = product.images.length > 0 ? product.images : ['/images/hero.png']

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-2 text-sm text-black/65 transition hover:text-black"
      >
        <i className="pi pi-arrow-left text-base" aria-hidden />
        Torna allo shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Gallery: main image + many images */}
        <div className="space-y-4">
          <ProductDetailClient images={images} name={product.name} />
        </div>

        <div>
          <h1 className="font-serif text-3xl tracking-tight md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold">{formatPriceEUR(product.priceCents)}</p>
          <p className="mt-6 text-sm leading-relaxed text-black/75">{product.description}</p>

          {product.details?.length ? (
            <ul className="mt-6 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-black/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  {d}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  )
}
