'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-context'
import clsx from 'clsx'

const leftNav = [
  { href: '/shop', label: 'Shop' },
  { href: '/chi-sono', label: 'Chi sono' },
]
const rightNav = [{ href: '/contatti', label: 'Contatti' }]
const nav = [...leftNav, ...rightNav]

export default function SiteHeader() {
  const pathname = usePathname()
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-sand-50/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-3 items-center gap-4 px-4 py-3 md:justify-items-stretch">
        {/* Left: hamburger on mobile, left nav on desktop */}
        <div className="flex items-center justify-start md:justify-end">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60 shadow-soft md:hidden"
            aria-label="Apri menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden items-center justify-end gap-8 text-sm md:flex">
            {leftNav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={clsx(
                  'transition hover:text-black',
                  pathname === i.href ? 'text-black' : 'text-black/65'
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: logo (centered on mobile and desktop) */}
        <div className="flex justify-center md:justify-self-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-24 w-32">
              <Image
                src="/images/logo.png"
                alt="Eddy Handmade"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Right: Contatti + Carrello */}
        <div className="flex items-center justify-end gap-8 md:justify-self-start">
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {rightNav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className={clsx(
                  'transition hover:text-black',
                  pathname === i.href ? 'text-black' : 'text-black/65'
                )}
              >
                {i.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/carrello"
            className="relative inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 text-sm shadow-soft"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrello</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-sm bg-sand-50 shadow-soft">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
              <span className="text-sm font-medium">Menu</span>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60"
                aria-label="Chiudi menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-2 bg-amber-50">
              {nav.map((i) => (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'rounded-xl px-3 py-3 text-sm',
                    pathname === i.href ? 'bg-black/5 text-black' : 'text-black/70'
                  )}
                >
                  {i.label}
                </Link>
              ))}
              <Link
                href="/carrello"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl px-3 py-3 text-sm text-black/70"
              >
                Carrello ({count})
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
