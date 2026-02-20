import './globals.css'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { CartProvider } from '@/components/cart/cart-context'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import WhatsAppButton from '@/components/whatsapp-button'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

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
      <body className={`${cormorant.variable} ${dmSans.variable} ${dmSans.className} min-h-dvh antialiased`}>
        <CartProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
