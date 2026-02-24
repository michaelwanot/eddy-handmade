import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, formatPriceEUR, productCareCopy, getEffectivePrice, isOnSale } from '@/lib/products'
import ProductDetailClient, { AddToCartButton, ProductVariantProvider } from './product-detail-client'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

export async function generateStaticParams() {
  const { products } = await import('@/lib/products')
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Prodotto non trovato' }

  const canonical = `${SITE_URL}/shop/${product.slug}`
  const title = `${product.seo?.title ?? product.name} | Eddy Handmade`
  const description = product.seo?.description ?? product.description

  const ogImage = product.images?.[0]
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : `${SITE_URL}${product.images[0]}`
    : `${SITE_URL}/images/hero.png`

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      locale: 'it_IT',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const images = product.images?.length ? product.images : ['/images/hero.png']
  const canonical = `${SITE_URL}/shop/${product.slug}`

  // JSON-LD Product
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.seo?.description ?? product.description,
    image: images.map((src) => (src.startsWith('http') ? src : `${SITE_URL}${src}`)),
    brand: { '@type': 'Brand', name: 'Eddy Handmade' },
    offers: {
      '@type': 'Offer',
      url: canonical,
      priceCurrency: 'EUR',
      price: (getEffectivePrice(product, null) / 100).toFixed(2),
      availability: product.isSoldOut === true ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    additionalProperty: [
      ...(product.dimensions?.heightCm
        ? [{ '@type': 'PropertyValue', name: 'Altezza', value: `${product.dimensions.heightCm} cm` }]
        : []),
      ...(product.dimensions?.widthCm
        ? [{ '@type': 'PropertyValue', name: 'Larghezza', value: `${product.dimensions.widthCm} cm` }]
        : []),
      ...(product.materials?.length
        ? [{ '@type': 'PropertyValue', name: 'Materiali', value: product.materials.join(', ') }]
        : []),
      // ...(product.giftIncluded
      //   ? [{ '@type': 'PropertyValue', name: 'Incluso', value: 'Braccialetto all’uncinetto in regalo' }]
      //   : []),
    ],
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-2 text-sm text-black/65 transition hover:text-black"
      >
        <i className="pi pi-arrow-left text-base" aria-hidden />
        Torna allo shop
      </Link>

      <ProductVariantProvider>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div className="space-y-4">
            <ProductDetailClient
              images={images}
              name={product.name}
              imageAlt={product.seo?.imageAlt ?? ''}
            />
          </div>

          <div>
          <h1 className="font-serif text-3xl tracking-tight md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {isOnSale(product) ? (
              <>
                <span className="text-xl font-semibold text-red-600">{formatPriceEUR(getEffectivePrice(product, null))}</span>
                <span className="text-lg text-black/50 line-through">{formatPriceEUR(product.priceCents)}</span>
                <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">Saldi</span>
              </>
            ) : (
              <p className="text-xl font-semibold">{formatPriceEUR(product.priceCents)}</p>
            )}
          </div>

          {/* Long description (HTML from seo.longCopy) */}
          {product.seo?.longCopy ? (
            <div
              className="mt-6 rounded-2xl bg-white/60 p-5 text-sm leading-relaxed text-black/75 [&_p]:mt-2 [&_p:first]:mt-0 [&_ul]:mt-2 [&_li]:mt-0.5"
              dangerouslySetInnerHTML={{ __html: product.seo.longCopy.trim() }}
            />
          ) : null}

          {/* Cura del prodotto (testo condiviso per tutti i prodotti) */}
          <div
            className="mt-6 rounded-2xl bg-white/60 p-5 text-sm leading-relaxed text-black/75 [&_h3]:mt-0 [&_p]:mt-2 [&_ul]:mt-2 [&_li]:mt-0.5"
            dangerouslySetInnerHTML={{ __html: productCareCopy.trim() }}
          />

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

          {/* ✅ Piccolo trust snippet SEO */}
          <p className="mt-4 text-xs text-black/60">
            Pagamento sicuro con Stripe • Prodotto artigianale fatto a mano in Italia
          </p>
        </div>
        </div>
      </ProductVariantProvider>
    </section>
  )
}