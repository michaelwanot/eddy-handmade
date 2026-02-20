'use client'

import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/components/cart/cart-context'

function SuccessContent() {
  const { clear } = useCart()
  const params = useSearchParams()
  const sessionId = params.get('session_id')

  useEffect(() => {
    clear()
    // Run once on mount to clear cart after successful payment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="mx-auto max-w-3xl px-4 py-14">
      <div className="rounded-[var(--radius)] bg-white p-10 text-center shadow-soft">
        <h1 className="font-serif text-4xl tracking-tight">Pagamento completato</h1>
        <p className="mt-4 text-sm leading-relaxed text-black/65">
          Grazie! Il tuo ordine è stato ricevuto.
          {sessionId ? (
            <>
              <br />
              <span className="text-black/45">Sessione: {sessionId}</span>
            </>
          ) : null}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-soft">
            Torna allo shop
          </Link>
          <Link href="/" className="rounded-full border border-black/10 bg-white/60 px-6 py-3 text-sm shadow-soft">
            Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-14 text-center text-black/65">Caricamento…</div>}>
      <SuccessContent />
    </Suspense>
  )
}
