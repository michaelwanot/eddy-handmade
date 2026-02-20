import './globals.css'
import type { Metadata } from 'next'
import { CartProvider } from '@/components/cart/cart-context'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

export const metadata: Metadata = {
  title: {
    default: 'Eddy Handmade',
    template: '%s · Eddy Handmade',
  },
  description: 'Borse all’uncinetto create una alla volta. Pezzi unici, fatti a mano in Italia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="min-h-dvh antialiased">
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  )
}
