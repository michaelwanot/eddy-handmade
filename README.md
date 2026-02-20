# Eddy Handmade (Next.js + Tailwind + Stripe)

## Setup
1. Install deps
```bash
npm i
```

2. Add env vars (create `.env.local`):
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # optional (only if you add webhooks)
```

3. Run:
```bash
npm run dev
```

## Stripe
This template uses **Stripe Checkout**. The API route `POST /api/checkout` creates a Checkout Session and redirects you.

Update product prices + Stripe price IDs in `lib/products.ts`.
