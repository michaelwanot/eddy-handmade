import ProductCard from '@/components/product-card'
import { products } from '@/lib/products'

export const metadata = { title: 'Shop' }

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl tracking-tight">Shop</h1>
        <p className="text-sm text-black/65">
          Pezzi unici, fatti a mano in Italia.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
