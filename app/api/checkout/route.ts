import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { products } from '@/lib/products'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export async function POST(req: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'Missing STRIPE_SECRET_KEY' },
      { status: 500 }
    )
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20',
  })

  const body = await req.json().catch(() => ({}))
  const items = (body?.items ?? []) as Array<{ id: string; qty: number }>

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

  for (const i of items) {
    const p = products.find((x) => x.id === i.id)
    if (!p) continue
    const quantity = Math.max(1, Math.min(99, Number(i.qty || 1)))

    if (p.stripePriceId && !p.stripePriceId.startsWith('price_REPLACE_ME')) {
      line_items.push({ price: p.stripePriceId, quantity })
    } else {
      // Works out-of-the-box without creating Stripe Prices.
      line_items.push({
        quantity,
        price_data: {
          currency: 'eur',
          unit_amount: p.priceCents,
          product_data: {
            name: p.name,
            description: p.shortDescription,
            images: [`${siteUrl}${p.image}`],
          },
        },
      })
    }
  }

  if (line_items.length === 0) {
    return NextResponse.json({ error: 'Empty cart' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/carrello?canceled=1`,
    shipping_address_collection: {
      allowed_countries: ['IT', 'FR', 'DE', 'ES', 'NL', 'BE', 'AT', 'PT'],
    },
    allow_promotion_codes: true,
  })

  if (!session.url) {
    return NextResponse.json({ error: 'No session url' }, { status: 500 })
  }

  return NextResponse.json({ url: session.url })
}
